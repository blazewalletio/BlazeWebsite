'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Target, DollarSign, TrendingUp, Search, Download, Check, X, Loader2, Mail, Send, RefreshCw } from 'lucide-react';

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
      setCommitments(data || []);
      
      // Calculate stats
      const total = data?.length || 0;
      const totalValue = data?.reduce((sum, c) => sum + (c.intended_amount_usd || 0), 0) || 0;
      const converted = data?.filter(c => c.converted).length || 0;
      
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
    const headers = ['Email', 'Country', 'Amount USD', 'Est. Tokens', 'Tier', 'Converted', 'Created At'];
    const rows = commitments.map(c => [
      c.email,
      c.country_code || '',
      c.intended_amount_usd,
      c.intended_amount_tokens,
      c.commitment_tier,
      c.converted ? 'Yes' : 'No',
      new Date(c.created_at).toLocaleDateString(),
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
            <div className="flex gap-2">
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

