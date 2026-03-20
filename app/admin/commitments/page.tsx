'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Target, DollarSign, TrendingUp, Search, Download, Check, X, Loader2, Mail, Send, RefreshCw, HelpCircle } from 'lucide-react';

const SURVEY_CAMPAIGN_KEY = 'not_purchased_survey_v1';

interface SurveyFeedback {
  reason_key: string;
  reason_label: string;
  extra_note: string | null;
  updated_at: string;
}

interface Commitment {
  id: string;
  email: string;
  intended_amount_usd: number;
  intended_amount_tokens: number;
  commitment_tier: number;
  notes: string | null;
  reminder_sent: boolean;
  converted: boolean;
  converted_at: string | null;
  created_at: string;
  country_code?: string | null;
  survey_feedback?: SurveyFeedback | null;
}

export default function CommitmentsPage() {
  const [commitments, setCommitments] = useState<Commitment[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState({
    totalCommitments: 0,
    totalValue: 0,
    averageValue: 0,
    convertedCount: 0,
  });
  const [sendingBulk, setSendingBulk] = useState(false);
  const [bulkResult, setBulkResult] = useState<{ sent: number; failed: number } | null>(null);
  const [sendingApology, setSendingApology] = useState(false);
  const [apologyResult, setApologyResult] = useState<{ sent: number; failed: number; total: number } | null>(null);
  const [backfilling, setBackfilling] = useState(false);
  const [backfillMsg, setBackfillMsg] = useState<string | null>(null);
  const [sendingSurvey, setSendingSurvey] = useState(false);
  const [surveyResult, setSurveyResult] = useState<{
    sent: number;
    failed: number;
    total: number;
  } | null>(null);
  const [surveyTestSendingId, setSurveyTestSendingId] = useState<string | null>(null);
  const [surveyTestMsg, setSurveyTestMsg] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchCommitments();
  }, []);

  async function fetchCommitments() {
    setLoading(true);
    const { data, error } = await supabase
      .from('commitments')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching commitments:', error);
    } else {
      const { data: feedbackRows } = await supabase
        .from('commitment_purchase_feedback')
        .select('commitment_id, reason_key, reason_label, extra_note, updated_at')
        .eq('campaign_key', SURVEY_CAMPAIGN_KEY);

      const feedbackById = new Map<string, SurveyFeedback>();
      for (const row of feedbackRows || []) {
        const cid = String((row as { commitment_id: string }).commitment_id);
        feedbackById.set(cid, {
          reason_key: String((row as { reason_key: string }).reason_key),
          reason_label: String((row as { reason_label: string }).reason_label),
          extra_note: (row as { extra_note: string | null }).extra_note ?? null,
          updated_at: String((row as { updated_at: string }).updated_at),
        });
      }

      const merged = (data || []).map((c: Commitment) => ({
        ...c,
        survey_feedback: feedbackById.get(String(c.id)) ?? null,
      }));

      setCommitments(merged);
      
      // Calculate stats
      const total = merged.length;
      const totalValue = merged.reduce((sum, c) => sum + (c.intended_amount_usd || 0), 0);
      const converted = merged.filter(c => c.converted).length;
      
      setStats({
        totalCommitments: total,
        totalValue,
        averageValue: total > 0 ? totalValue / total : 0,
        convertedCount: converted,
      });
    }
    setLoading(false);
  }

  async function markAsConverted(id: string) {
    const { error } = await supabase
      .from('commitments')
      .update({ converted: true, converted_at: new Date().toISOString() })
      .eq('id', id);

    if (!error) {
      fetchCommitments();
    }
  }

  async function sendReminder(commitment: Commitment) {
    try {
      const res = await fetch('/api/reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ commitmentId: commitment.id }),
      });
      
      if (res.ok) {
        fetchCommitments();
      } else {
        console.error('Failed to send reminder');
      }
    } catch (err) {
      console.error('Error sending reminder:', err);
    }
  }

  async function sendBulkReminders() {
    setSendingBulk(true);
    setBulkResult(null);
    
    // Get all commitments that haven't received a reminder and aren't converted
    const eligibleCommitments = commitments.filter(c => !c.reminder_sent && !c.converted);
    
    let sent = 0;
    let failed = 0;
    
    for (const commitment of eligibleCommitments) {
      try {
        const res = await fetch('/api/reminder', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ commitmentId: commitment.id }),
        });
        
        if (res.ok) {
          sent++;
        } else {
          failed++;
        }
        
        // Small delay to avoid rate limiting
        await new Promise(resolve => setTimeout(resolve, 200));
      } catch {
        failed++;
      }
    }
    
    setBulkResult({ sent, failed });
    setSendingBulk(false);
    fetchCommitments();
  }

  async function sendNotPurchasedSurvey() {
    const ok = window.confirm(
      'Send the “haven’t bought yet” survey to all non-converted commitments?\n\nExcludes: sjoehl@yahoo.com, marcveltens@gmail.com\nSkips anyone who already received this survey.'
    );
    if (!ok) return;
    setSendingSurvey(true);
    setSurveyResult(null);
    try {
      const res = await fetch('/api/email/commitment-not-purchased-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({}),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        console.error('Survey blast failed:', data?.error || data);
        setSendingSurvey(false);
        return;
      }
      setSurveyResult({
        sent: data.sent || 0,
        failed: data.failed || 0,
        total: data.total || 0,
      });
      await fetchCommitments();
    } catch (e) {
      console.error(e);
    } finally {
      setSendingSurvey(false);
    }
  }

  /** QA: one survey mail to that commitment’s email; does not touch commitment_email_sends. */
  async function sendSurveyTest(commitmentId: string, skipConfirm = false) {
    if (!skipConfirm) {
      const ok = window.confirm(
        'Send ONE test survey email to this row\'s email address?\n\nThis does not mark them as "already sent" for the real blast.'
      );
      if (!ok) return;
    }
    setSurveyTestSendingId(commitmentId);
    setSurveyTestMsg(null);
    try {
      const res = await fetch('/api/email/commitment-not-purchased-survey', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ testCommitmentId: commitmentId }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        setSurveyTestMsg(data?.error || 'Test send failed');
        return;
      }
      setSurveyTestMsg(`Test survey sent to ${data.email}. Check inbox & spam; links work like production.`);
    } catch (e) {
      setSurveyTestMsg('Test send failed');
      console.error(e);
    } finally {
      setSurveyTestSendingId(null);
    }
  }

  /** Toolbar: send test to the single row matching the search box (e.g. filter info@ → 1 row). */
  async function sendSurveyTestFromSearchFilter() {
    const n = filteredCommitments.length;
    if (n === 0) {
      window.alert(
        'Geen rijen zichtbaar. Maak het zoekveld leger of pas je zoekterm aan tot er precies één commitment zichtbaar is.'
      );
      return;
    }
    if (n > 1) {
      window.alert(
        `Er zijn nu ${n} rijen zichtbaar. Typ in het zoekveld tot er precies één rij over is (bijv. je eigen e-mail), daarna klik je opnieuw op "Test survey mail".`
      );
      return;
    }
    const ok = window.confirm(
      `Test survey mail sturen naar ${filteredCommitments[0].email}?\n\nDit telt niet mee voor de grote bulk (gele knop).`
    );
    if (!ok) return;
    await sendSurveyTest(filteredCommitments[0].id, true);
  }

  async function sendApologyBlast() {
    const ok = window.confirm(
      'Send an apology email to commitment users who received countdown emails recently? This is a broadcast action.'
    );
    if (!ok) return;

    setSendingApology(true);
    setApologyResult(null);
    try {
      const res = await fetch('/api/email/commitment-apology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sinceHours: 72 }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        console.error('Failed to send apology blast:', data?.error || data);
        setSendingApology(false);
        return;
      }
      setApologyResult({ sent: data.sent || 0, failed: data.failed || 0, total: data.total || 0 });
    } catch (err) {
      console.error('Error sending apology blast:', err);
    } finally {
      setSendingApology(false);
    }
  }

  async function backfillCountries() {
    const ok = window.confirm(
      'Backfill missing country codes for existing commitments?\n\nThis will use the linked waitlist IP (if available).'
    );
    if (!ok) return;

    setBackfilling(true);
    setBackfillMsg('Backfill started...');
    try {
      const { data: sessionData } = await supabase.auth.getSession();
      const accessToken = sessionData?.session?.access_token || null;
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (accessToken) headers['Authorization'] = `Bearer ${accessToken}`;

      const res = await fetch('/api/admin/backfill-country', {
        method: 'POST',
        headers,
        body: JSON.stringify({ target: 'commitments', limit: 200 }),
      });
      const data = await res.json();
      if (!res.ok || !data?.success) {
        setBackfillMsg(data?.error || 'Backfill failed');
      } else {
        setBackfillMsg(`Backfilled: ${data.updated} updated, ${data.skipped} skipped`);
        await fetchCommitments();
      }
    } catch (e: any) {
      setBackfillMsg(e?.message || 'Backfill failed');
    } finally {
      setBackfilling(false);
    }
  }

  function exportCSV() {
    const headers = [
      'Email',
      'Country',
      'Amount USD',
      'Est. Tokens',
      'Tier',
      'Converted',
      'Created At',
      'Survey barrier',
      'Survey note',
      'Survey updated',
    ];
    const rows = commitments.map(c => [
      c.email,
      c.country_code || '',
      c.intended_amount_usd,
      c.intended_amount_tokens,
      c.commitment_tier,
      c.converted ? 'Yes' : 'No',
      new Date(c.created_at).toLocaleDateString(),
      c.survey_feedback?.reason_label || '',
      (c.survey_feedback?.extra_note || '').replace(/\n/g, ' '),
      c.survey_feedback ? new Date(c.survey_feedback.updated_at).toISOString() : '',
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `commitments-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }

  const filteredCommitments = commitments.filter(c =>
    c.email.toLowerCase().includes(search.toLowerCase())
  );

  const tierNames: Record<number, string> = {
    1: 'Founders',
    2: 'Early Birds',
    3: 'Pioneers',
    4: 'Adopters',
    5: 'Supporters',
    6: 'Public',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Purchase commitments</h1>
            <p className="text-gray-600">Manage purchase intents and track conversions</p>
            <p className="text-sm text-gray-500 mt-2 max-w-3xl">
              <strong>Survey-mail (Engels):</strong> onderwerp{' '}
              <span className="font-mono text-gray-700">Quick question: what would help you join the BLAZE presale?</span>
              <br />
              <strong className="text-gray-700">Naar iedereen:</strong> klik op de <span className="font-medium text-amber-700">gele knop</span>{' '}
              <span className="font-medium text-gray-800">Survey: why no purchase</span> — die mailt alle commitments die nog{' '}
              <em>niet</em> geconverteerd zijn en deze survey nog niet kregen (uitgezonderd 2 test-adressen). Geen cron: alleen als jij die knop gebruikt.
              <br />
              <strong className="text-gray-700">Alleen testen:</strong> zet in het zoekveld je e-mail tot er <em>precies één</em> rij zichtbaar is, daarna{' '}
              <span className="font-medium text-gray-800">Test survey mail</span> (witte knop). Of gebruik het <span className="font-medium text-gray-800">?</span>-icoon op een rij — telt niet mee voor de bulk.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Target className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-gray-600">Total commitments</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.totalCommitments}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-gray-600">Total value</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">${stats.totalValue.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-gray-600">Average</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">${Math.round(stats.averageValue).toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                  <Check className="w-5 h-5 text-sky-600" />
                </div>
                <span className="text-gray-600">Converted</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.convertedCount}</div>
            </div>
          </div>

          {/* Search & Actions */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by email..."
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={backfillCountries}
                disabled={backfilling}
                className="flex items-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
                title="Fill missing country codes for existing commitments"
              >
                {backfilling ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCw className="w-5 h-5" />}
                Backfill
              </button>
              <button
                onClick={sendBulkReminders}
                disabled={sendingBulk}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all disabled:opacity-50"
              >
                {sendingBulk ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Send className="w-5 h-5" />
                )}
                Send reminders
              </button>
              <button
                onClick={sendNotPurchasedSurvey}
                disabled={sendingSurvey}
                className="flex items-center gap-2 px-4 py-3 bg-amber-500 text-white rounded-xl hover:bg-amber-600 transition-colors disabled:opacity-50"
                title="Verstuurt de survey naar alle niet-geconverteerde commitments (bulk). Slaat over wie deze mail al kreeg + 2 test-adressen."
              >
                {sendingSurvey ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <HelpCircle className="w-5 h-5" />
                )}
                Survey: why no purchase
              </button>
              <button
                onClick={() => void sendSurveyTestFromSearchFilter()}
                disabled={surveyTestSendingId !== null || sendingSurvey}
                className="flex items-center gap-2 px-4 py-3 bg-white text-amber-900 rounded-xl border-2 border-amber-400 hover:bg-amber-50 transition-colors disabled:opacity-50"
                title="Zoek tot er precies 1 rij zichtbaar is, dan stuur je 1 testmail. Telt niet mee voor bulk."
              >
                {surveyTestSendingId ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Mail className="w-5 h-5" />
                )}
                Test survey mail
              </button>
              <button
                onClick={sendApologyBlast}
                disabled={sendingApology}
                className="flex items-center gap-2 px-4 py-3 bg-white text-gray-700 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors disabled:opacity-50"
                title="Send apology email to affected commitment users"
              >
                {sendingApology ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Mail className="w-5 h-5" />
                )}
                Apology email
              </button>
              <button
                onClick={fetchCommitments}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
              <button
                onClick={exportCSV}
                className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
              >
                <Download className="w-5 h-5" />
                Export
              </button>
            </div>
          </div>

          {/* Bulk Result Message */}
          {bulkResult && (
            <div className={`p-4 rounded-xl mb-6 ${bulkResult.failed > 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-emerald-50 border border-emerald-200'}`}>
              <p className={bulkResult.failed > 0 ? 'text-yellow-700' : 'text-emerald-700'}>
                ✅ Sent {bulkResult.sent} reminder emails
                {bulkResult.failed > 0 && ` | ⚠️ ${bulkResult.failed} failed`}
              </p>
            </div>
          )}

          {surveyResult && (
            <div className={`p-4 rounded-xl mb-6 ${surveyResult.failed > 0 ? 'bg-amber-50 border border-amber-200' : 'bg-emerald-50 border border-emerald-200'}`}>
              <p className={surveyResult.failed > 0 ? 'text-amber-800' : 'text-emerald-700'}>
                Survey emails: {surveyResult.sent} sent
                {surveyResult.failed > 0 && ` | ${surveyResult.failed} failed`}
                {` (batch size ${surveyResult.total})`}
              </p>
            </div>
          )}

          {surveyTestMsg && (
            <div className="p-4 rounded-xl mb-6 bg-sky-50 border border-sky-200 text-sky-900 text-sm">
              {surveyTestMsg}
            </div>
          )}

          {apologyResult && (
            <div className={`p-4 rounded-xl mb-6 ${apologyResult.failed > 0 ? 'bg-yellow-50 border border-yellow-200' : 'bg-emerald-50 border border-emerald-200'}`}>
              <p className={apologyResult.failed > 0 ? 'text-yellow-700' : 'text-emerald-700'}>
                ✅ Sent {apologyResult.sent} apology emails
                {apologyResult.failed > 0 && ` | ⚠️ ${apologyResult.failed} failed`}
                {` | Total: ${apologyResult.total}`}
              </p>
            </div>
          )}

          {backfillMsg && (
            <div className="p-4 rounded-xl mb-6 bg-white border border-gray-200 text-gray-700">
              {backfillMsg}
            </div>
          )}

          {/* Table */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {loading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
              </div>
            ) : filteredCommitments.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                No commitments found
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Email</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Country</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Amount</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Est. tokens</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Tier</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Status</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900 min-w-[200px]">Why no purchase</th>
                      <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Date</th>
                      <th className="text-right px-6 py-4 text-sm font-semibold text-gray-900">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredCommitments.map((commitment) => (
                      <tr key={commitment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div className="font-medium text-gray-900">{commitment.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-900 font-medium">{commitment.country_code || '-'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-emerald-600">
                            ${commitment.intended_amount_usd?.toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-gray-600">
                            {Math.round(commitment.intended_amount_tokens || 0).toLocaleString()}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-2 py-1 bg-orange-100 text-orange-700 rounded-lg text-sm font-medium">
                            {tierNames[commitment.commitment_tier] || 'Unknown'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {commitment.converted ? (
                            <span className="flex items-center gap-1 text-emerald-600">
                              <Check className="w-4 h-4" />
                              Converted
                            </span>
                          ) : (
                            <span className="text-gray-500">Pending</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm">
                          {commitment.survey_feedback ? (
                            <div>
                              <div className="font-medium text-gray-900">{commitment.survey_feedback.reason_label}</div>
                              {commitment.survey_feedback.extra_note && (
                                <div className="text-gray-600 mt-1 line-clamp-2" title={commitment.survey_feedback.extra_note}>
                                  {commitment.survey_feedback.extra_note}
                                </div>
                              )}
                            </div>
                          ) : (
                            <span className="text-gray-400">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-gray-500 text-sm">
                          {new Date(commitment.created_at).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {!commitment.converted && (
                              <button
                                onClick={() => markAsConverted(commitment.id)}
                                className="p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors"
                                title="Mark as converted"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                            )}
                            {!commitment.reminder_sent && (
                              <button
                                onClick={() => sendReminder(commitment)}
                                className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Send reminder"
                              >
                                <Mail className="w-4 h-4" />
                              </button>
                            )}
                            <button
                              onClick={() => sendSurveyTest(commitment.id)}
                              disabled={surveyTestSendingId === commitment.id}
                              className="p-2 text-amber-700 hover:bg-amber-50 rounded-lg transition-colors disabled:opacity-50"
                              title="Test survey email (QA only — not counted for real blast)"
                            >
                              {surveyTestSendingId === commitment.id ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                              ) : (
                                <HelpCircle className="w-4 h-4" />
                              )}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

