'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Mail, Send, Clock, Check, X, Loader2, Play, Pause, RefreshCw, Calendar, Users, TrendingUp, Megaphone, TestTube } from 'lucide-react';

interface Campaign {
  id: string;
  campaign_name: string;
  campaign_type: string;
  sequence_order: number;
  subject: string;
  template_key: string;
  days_after_signup: number;
  is_active: boolean;
}

interface EmailSend {
  id: string;
  email: string;
  template_key: string;
  sent_at: string;
  status: string;
}

interface CommitmentEmailSend {
  id: string;
  email: string;
  template_key: string;
  status: string;
  created_at: string;
  error?: string | null;
}

export default function CampaignsAdminPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [recentSends, setRecentSends] = useState<EmailSend[]>([]);
  const [recentCommitmentSends, setRecentCommitmentSends] = useState<CommitmentEmailSend[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalSent: 0,
    sentToday: 0,
    activeSubscribers: 0,
  });
  const [commitmentStats, setCommitmentStats] = useState({
    totalSent: 0,
    sentToday: 0,
    activeCommitments: 0,
  });
  const [runningCron, setRunningCron] = useState(false);
  const [runningCommitmentCron, setRunningCommitmentCron] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState('welcome');
  const [sendingTest, setSendingTest] = useState(false);
  const [sendingBroadcast, setSendingBroadcast] = useState(false);
  const [sendResult, setSendResult] = useState<{ success: boolean; message: string } | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);

    // Fetch campaigns
    const { data: campaignsData } = await supabase
      .from('email_campaigns')
      .select('*')
      .order('sequence_order');

    // Fetch recent sends
    const { data: sendsData } = await supabase
      .from('email_sends')
      .select('*')
      .order('sent_at', { ascending: false })
      .limit(50);

    // Fetch recent commitment sends
    const { data: commitmentSendsData } = await supabase
      .from('commitment_email_sends')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50);

    // Fetch stats
    const { count: totalSent } = await supabase
      .from('email_sends')
      .select('*', { count: 'exact', head: true });

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const { count: sentToday } = await supabase
      .from('email_sends')
      .select('*', { count: 'exact', head: true })
      .gte('sent_at', today.toISOString());

    const { count: activeSubscribers } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true })
      .eq('email_paused', false);

    // Commitment email stats
    const { count: commitmentTotalSent } = await supabase
      .from('commitment_email_sends')
      .select('*', { count: 'exact', head: true });

    const { count: commitmentSentToday } = await supabase
      .from('commitment_email_sends')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', today.toISOString());

    const { count: activeCommitments } = await supabase
      .from('commitments')
      .select('*', { count: 'exact', head: true })
      .eq('email_paused', false);

    setCampaigns(campaignsData || []);
    setRecentSends(sendsData || []);
    setRecentCommitmentSends((commitmentSendsData as CommitmentEmailSend[]) || []);
    setStats({
      totalSent: totalSent || 0,
      sentToday: sentToday || 0,
      activeSubscribers: activeSubscribers || 0,
    });
    setCommitmentStats({
      totalSent: commitmentTotalSent || 0,
      sentToday: commitmentSentToday || 0,
      activeCommitments: activeCommitments || 0,
    });
    setLoading(false);
  }

  async function toggleCampaign(campaign: Campaign) {
    const { error } = await supabase
      .from('email_campaigns')
      .update({ is_active: !campaign.is_active })
      .eq('id', campaign.id);

    if (!error) {
      fetchData();
    }
  }

  async function runDripCampaign() {
    setRunningCron(true);
    try {
      const res = await fetch('/api/cron/drip-campaign', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || 'dev-secret'}`,
        },
      });
      const data = await res.json();
      console.log('Drip campaign result:', data);
      await fetchData();
    } catch (err) {
      console.error('Failed to run drip campaign:', err);
    }
    setRunningCron(false);
  }

  async function runCommitmentCampaign() {
    setRunningCommitmentCron(true);
    try {
      const res = await fetch('/api/cron/commitment-campaign', {
        method: 'GET',
        headers: {
          // Note: this is the same approach as the waitlist drip admin trigger.
          'Authorization': `Bearer ${process.env.NEXT_PUBLIC_CRON_SECRET || 'dev-secret'}`,
        },
      });
      const data = await res.json();
      console.log('Commitment campaign result:', data);
      await fetchData();
    } catch (err) {
      console.error('Failed to run commitment campaign:', err);
    }
    setRunningCommitmentCron(false);
  }

  const templateDescriptions: Record<string, string> = {
    welcome: 'Sent immediately when user signs up',
    why_blaze: 'Explains BLAZE features and benefits',
    social_proof: 'Shows waitlist growth and social proof',
    fomo_pricing: 'Highlights tiered pricing urgency',
    exclusive_bonus: 'Promotes referral bonuses and rewards',
    presale_countdown: 'Final reminder before presale',
    commitment_apology: 'Commitment users: apology email (test-send only from here)',
    commitment_confirmation: 'Commitment users: confirmation email (sample values for test send)',
    commitment_day2_readiness: 'Commitment users: Day 2 readiness checklist',
    commitment_day5_why_blaze: 'Commitment users: Day 5 why BLAZE',
    commitment_day7_security: 'Commitment users: Day 7 security tips',
    commitment_day10_tier: 'Commitment users: Day 10 tier recap (sample values for test send)',
    commitment_day13_payment_prep: 'Commitment users: Day 13 payment preparation',
    commitment_day18_how_presale_works: 'Commitment users: Day 18 how presale works',
    commitment_tminus_48h: 'Commitment users: countdown email (48 hours)',
    commitment_tminus_24h: 'Commitment users: countdown email (24 hours)',
    commitment_tminus_12h: 'Commitment users: countdown email (12 hours)',
    commitment_tminus_6h: 'Commitment users: countdown email (6 hours)',
    commitment_tminus_3h: 'Commitment users: countdown email (3 hours)',
    commitment_tminus_1h: 'Commitment users: countdown email (1 hour)',
    commitment_live: 'Commitment users: live launch email',
  };

  const commitmentCampaignDays: { sequence: number; daysAfter: number; templateKey: string; label: string }[] = [
    { sequence: 1, daysAfter: 2, templateKey: 'commitment_day2_readiness', label: 'Readiness checklist + create your wallet account' },
    { sequence: 2, daysAfter: 5, templateKey: 'commitment_day5_why_blaze', label: 'Why BLAZE (high-intent version)' },
    { sequence: 3, daysAfter: 7, templateKey: 'commitment_day7_security', label: 'Security & staying safe before presale' },
    { sequence: 4, daysAfter: 10, templateKey: 'commitment_day10_tier', label: 'Your tier + intended amount recap' },
    { sequence: 5, daysAfter: 13, templateKey: 'commitment_day13_payment_prep', label: 'Payment preparation (ETH/BTC/USDT + BSC)' },
    { sequence: 6, daysAfter: 18, templateKey: 'commitment_day18_how_presale_works', label: 'How the presale works (full explanation)' },
  ];

  const commitmentCampaignCountdowns: { sequence: number; offsetHours: number; templateKey: string; label: string }[] = [
    { sequence: 1, offsetHours: 48, templateKey: 'commitment_tminus_48h', label: 'T-48h' },
    { sequence: 2, offsetHours: 24, templateKey: 'commitment_tminus_24h', label: 'T-24h' },
    { sequence: 3, offsetHours: 12, templateKey: 'commitment_tminus_12h', label: 'T-12h' },
    { sequence: 4, offsetHours: 6, templateKey: 'commitment_tminus_6h', label: 'T-6h' },
    { sequence: 5, offsetHours: 3, templateKey: 'commitment_tminus_3h', label: 'T-3h' },
    { sequence: 6, offsetHours: 1, templateKey: 'commitment_tminus_1h', label: 'T-1h' },
    { sequence: 7, offsetHours: 0, templateKey: 'commitment_live', label: 'LIVE' },
  ];

  const templateOptions = [
    { value: 'welcome', label: '🔥 Welcome to waitlist' },
    { value: 'why_blaze', label: '💡 Why BLAZE?' },
    { value: 'social_proof', label: '🚀 Social proof' },
    { value: 'fomo_pricing', label: '⏰ FOMO pricing' },
    { value: 'exclusive_bonus', label: '🎁 Exclusive bonus' },
    { value: 'presale_countdown', label: '📅 Presale countdown' },
    { value: 'commitment_apology', label: '🙏 Commitment: Apology (test)' },
    { value: 'commitment_confirmation', label: '✅ Commitment: Confirmation (test)' },
    { value: 'commitment_day2_readiness', label: '🎯 Commitment: Day 2 readiness' },
    { value: 'commitment_day5_why_blaze', label: '🔥 Commitment: Day 5 why BLAZE' },
    { value: 'commitment_day7_security', label: '🔒 Commitment: Day 7 security' },
    { value: 'commitment_day10_tier', label: '🏷️ Commitment: Day 10 tier recap' },
    { value: 'commitment_day13_payment_prep', label: '💳 Commitment: Day 13 payment prep' },
    { value: 'commitment_day18_how_presale_works', label: '🧭 Commitment: Day 18 how presale works' },
    { value: 'commitment_tminus_48h', label: '⏳ Commitment: T-48h countdown' },
    { value: 'commitment_tminus_24h', label: '⏳ Commitment: T-24h countdown' },
    { value: 'commitment_tminus_12h', label: '⏳ Commitment: T-12h countdown' },
    { value: 'commitment_tminus_6h', label: '⏳ Commitment: T-6h countdown' },
    { value: 'commitment_tminus_3h', label: '⏳ Commitment: T-3h countdown' },
    { value: 'commitment_tminus_1h', label: '⏳ Commitment: T-1h countdown' },
    { value: 'commitment_live', label: '🚀 Commitment: LIVE launch' },
  ];

  async function sendTestEmail() {
    if (!testEmail) return;
    setSendingTest(true);
    setSendResult(null);

    try {
      const res = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template: selectedTemplate,
          email: testEmail,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSendResult({ success: true, message: `Test email sent to ${testEmail}` });
        await fetchData();
      } else {
        setSendResult({ success: false, message: data.error || 'Failed to send' });
      }
    } catch (err) {
      setSendResult({ success: false, message: 'Network error' });
    }

    setSendingTest(false);
  }

  async function sendBroadcast() {
    if (!confirm(`Send "${templateOptions.find(t => t.value === selectedTemplate)?.label}" to ALL ${stats.activeSubscribers} subscribers?`)) {
      return;
    }

    setSendingBroadcast(true);
    setSendResult(null);

    try {
      const res = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template: selectedTemplate,
          broadcast: true,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSendResult({ success: true, message: `Broadcast sent! ${data.sent} successful, ${data.failed} failed` });
        await fetchData();
      } else {
        setSendResult({ success: false, message: data.error || 'Failed to send' });
      }
    } catch (err) {
      setSendResult({ success: false, message: 'Network error' });
    }

    setSendingBroadcast(false);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Email campaigns</h1>
              <p className="text-gray-600">Manage drip campaign sequences and email automation</p>
            </div>
            <button
              onClick={runDripCampaign}
              disabled={runningCron}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all disabled:opacity-50"
            >
              {runningCron ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Play className="w-5 h-5" />
              )}
              Run campaign now
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Mail className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-gray-600">Total sent</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.totalSent.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Send className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-gray-600">Sent today</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.sentToday}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-gray-600">Active subscribers</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{stats.activeSubscribers.toLocaleString()}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-sky-600" />
                </div>
                <span className="text-gray-600">Active campaigns</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {campaigns.filter(c => c.is_active).length}
              </div>
            </div>
          </div>

          {/* Send Email Section */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                <TestTube className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-gray-900">Send emails</h2>
                <p className="text-sm text-gray-500">Test emails or broadcast to all subscribers</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              {/* Template Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email template</label>
                <select
                  value={selectedTemplate}
                  onChange={(e) => setSelectedTemplate(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white"
                >
                  {templateOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              </div>

              {/* Test Email Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Test email address</label>
                <input
                  type="email"
                  value={testEmail}
                  onChange={(e) => setTestEmail(e.target.value)}
                  placeholder="test@example.com"
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              {/* Buttons */}
              <div className="flex items-end gap-2">
                <button
                  onClick={sendTestEmail}
                  disabled={!testEmail || sendingTest}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
                >
                  {sendingTest ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                  Test
                </button>
                <button
                  onClick={sendBroadcast}
                  disabled={sendingBroadcast || stats.activeSubscribers === 0}
                  className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl hover:from-orange-600 hover:to-yellow-600 transition-all disabled:opacity-50"
                >
                  {sendingBroadcast ? <Loader2 className="w-4 h-4 animate-spin" /> : <Megaphone className="w-4 h-4" />}
                  Broadcast
                </button>
              </div>
            </div>

            {/* Result Message */}
            {sendResult && (
              <div className={`p-4 rounded-xl ${sendResult.success ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                {sendResult.success ? <Check className="w-4 h-4 inline mr-2" /> : <X className="w-4 h-4 inline mr-2" />}
                {sendResult.message}
              </div>
            )}
          </div>

          {/* Commitment (Presale intent) campaign */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Calendar className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">Commitment (presale intent) campaign</h2>
                  <p className="text-sm text-gray-500">
                    This flow is separate from the waitlist drip and uses `commitment_email_sends` for dedupe/logging.
                  </p>
                </div>
              </div>
              <button
                onClick={runCommitmentCampaign}
                disabled={runningCommitmentCron}
                className="flex items-center gap-2 px-5 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors disabled:opacity-50"
              >
                {runningCommitmentCron ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Play className="w-5 h-5" />
                )}
                Run commitment campaign now
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Total commitment emails sent</div>
                <div className="text-2xl font-bold text-gray-900">{commitmentStats.totalSent.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Commitment emails sent today</div>
                <div className="text-2xl font-bold text-gray-900">{commitmentStats.sentToday.toLocaleString()}</div>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">Active commitment users</div>
                <div className="text-2xl font-bold text-gray-900">{commitmentStats.activeCommitments.toLocaleString()}</div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Drip sequence (days after intent)</h3>
                <div className="space-y-2">
                  {commitmentCampaignDays.map((c) => (
                    <div key={c.templateKey} className="rounded-xl border border-gray-200 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {c.sequence}. Day {c.daysAfter} — {c.label}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{c.templateKey}</div>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 border border-indigo-100">
                          Day {c.daysAfter}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-bold text-gray-900 mb-3">Countdown sequence (relative to presale date)</h3>
                <div className="space-y-2">
                  {commitmentCampaignCountdowns.map((c) => (
                    <div key={c.templateKey} className="rounded-xl border border-gray-200 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <div className="font-medium text-gray-900 truncate">
                            {c.sequence}. {c.label}
                          </div>
                          <div className="text-sm text-gray-500 mt-1">{c.templateKey}</div>
                        </div>
                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-orange-50 text-orange-700 border border-orange-100">
                          {c.offsetHours === 0 ? 'At launch' : `${c.offsetHours}h before`}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Campaign Sequence */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Drip campaign sequence</h2>
              <div className="space-y-3">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                  </div>
                ) : (
                  campaigns.map((campaign, index) => (
                    <div
                      key={campaign.id}
                      className={`bg-white rounded-xl p-4 border transition-all ${
                        campaign.is_active
                          ? 'border-emerald-200 bg-emerald-50/30'
                          : 'border-gray-200 opacity-60'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                              {campaign.sequence_order}
                            </span>
                            <span className="font-medium text-gray-900">{campaign.subject}</span>
                          </div>
                          <div className="flex items-center gap-3 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              Day {campaign.days_after_signup}
                            </span>
                            <span className="flex items-center gap-1">
                              <Mail className="w-4 h-4" />
                              {campaign.template_key}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500 mt-2">
                            {templateDescriptions[campaign.template_key] || 'Custom email'}
                          </p>
                        </div>
                        <button
                          onClick={() => toggleCampaign(campaign)}
                          className={`p-2 rounded-lg transition-colors ${
                            campaign.is_active
                              ? 'bg-emerald-100 text-emerald-600 hover:bg-emerald-200'
                              : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                          }`}
                        >
                          {campaign.is_active ? (
                            <Check className="w-5 h-5" />
                          ) : (
                            <Pause className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Recent Sends */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Recent emails sent</h2>
                <button
                  onClick={fetchData}
                  className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
              </div>
              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                  </div>
                ) : recentSends.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No emails sent yet
                  </div>
                ) : (
                  <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                    {recentSends.map((send) => (
                      <div key={send.id} className="px-4 py-3 hover:bg-gray-50">
                        <div className="flex items-center justify-between">
                          <div className="min-w-0 flex-1">
                            <div className="font-medium text-gray-900 truncate">{send.email}</div>
                            <div className="text-sm text-gray-500">
                              {send.template_key}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              send.status === 'sent' ? 'bg-emerald-100 text-emerald-700' :
                              send.status === 'opened' ? 'bg-blue-100 text-blue-700' :
                              'bg-gray-100 text-gray-700'
                            }`}>
                              {send.status}
                            </span>
                            <div className="text-xs text-gray-400 mt-1">
                              {new Date(send.sent_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Recent Commitment Sends */}
          <div className="mt-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-gray-900">Recent commitment emails sent</h2>
              <button
                onClick={fetchData}
                className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
                title="Refresh"
              >
                <RefreshCw className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-indigo-600" />
                </div>
              ) : recentCommitmentSends.length === 0 ? (
                <div className="text-center py-12 text-gray-500">No commitment emails sent yet</div>
              ) : (
                <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                  {recentCommitmentSends.map((send) => (
                    <div key={send.id} className="px-4 py-3 hover:bg-gray-50">
                      <div className="flex items-center justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="font-medium text-gray-900 truncate">{send.email}</div>
                          <div className="text-sm text-gray-500 truncate">{send.template_key}</div>
                          {send.error ? (
                            <div className="text-xs text-red-600 mt-1 truncate">{send.error}</div>
                          ) : null}
                        </div>
                        <div className="text-right whitespace-nowrap">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              send.status === 'sent'
                                ? 'bg-emerald-100 text-emerald-700'
                                : send.status === 'failed'
                                  ? 'bg-red-100 text-red-700'
                                  : 'bg-gray-100 text-gray-700'
                            }`}
                          >
                            {send.status}
                          </span>
                          <div className="text-xs text-gray-400 mt-1">
                            {new Date(send.created_at).toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Info */}
          <div className="mt-8 p-4 bg-blue-50 rounded-xl text-blue-700 text-sm">
            <strong>How it works:</strong> The drip campaign automatically sends emails based on when users signed up.
            Each email is sent once per user. Click "Run campaign now" to process pending emails, or set up a cron job to run automatically.
          </div>
        </div>
      </main>
    </div>
  );
}

