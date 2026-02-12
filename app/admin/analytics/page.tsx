'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import {
  TrendingUp,
  Users,
  Calendar,
  Award,
  RefreshCw,
  MousePointerClick,
  Target,
  UserPlus,
} from 'lucide-react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
} from 'recharts';

interface DailyData {
  date: string;
  count: number;
  source?: string;
  fullDate?: string;
}

interface SourceData {
  source: string;
  count: number;
  percentage: number;
}

interface ReferrerData {
  referrer_code: string;
  email: string;
  referral_count: number;
}

interface MarketingFunnel {
  launchClicks: number;
  presaleIntents: number;
  walletSignups: number;
  xLaunchClicks: number;
  xPresaleIntents: number;
  xWalletSignups: number;
}

interface CampaignAttributionRow {
  campaign: string;
  clicks: number;
  intents: number;
  signups: number;
}

const COLORS = ['#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899'];

export default function AdminAnalytics() {
  const [dailyData, setDailyData] = useState<DailyData[]>([]);
  const [sourceData, setSourceData] = useState<SourceData[]>([]);
  const [topReferrers, setTopReferrers] = useState<ReferrerData[]>([]);
  const [marketingFunnel, setMarketingFunnel] = useState<MarketingFunnel>({
    launchClicks: 0,
    presaleIntents: 0,
    walletSignups: 0,
    xLaunchClicks: 0,
    xPresaleIntents: 0,
    xWalletSignups: 0,
  });
  const [campaignAttribution, setCampaignAttribution] = useState<CampaignAttributionRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [days, setDays] = useState(30);
  
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/admin/login');
        return;
      }
      setUser(user);
      loadData();
    };
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) loadData();
  }, [days]);

  const loadMarketingAttribution = async () => {
    const periodStart = new Date();
    periodStart.setDate(periodStart.getDate() - days);
    const sinceIso = periodStart.toISOString();

    const countQuery = (eventName: string, source?: string) => {
      let query = supabase
        .from('marketing_events')
        .select('*', { count: 'exact', head: true })
        .eq('event_name', eventName)
        .gte('created_at', sinceIso);
      if (source) {
        query = query.eq('utm_source', source);
      }
      return query;
    };

    const [
      launchClicksRes,
      presaleIntentsRes,
      walletSignupsRes,
      xLaunchClicksRes,
      xPresaleIntentsRes,
      xWalletSignupsRes,
      campaignRowsRes,
    ] = await Promise.all([
      countQuery('wallet_launch_click'),
      countQuery('presale_intent_registered'),
      countQuery('wallet_account_created'),
      countQuery('wallet_launch_click', 'x'),
      countQuery('presale_intent_registered', 'x'),
      countQuery('wallet_account_created', 'x'),
      supabase
        .from('marketing_events')
        .select('event_name, utm_campaign, utm_source')
        .gte('created_at', sinceIso)
        .in('event_name', ['wallet_launch_click', 'presale_intent_registered', 'wallet_account_created'])
        .limit(10000),
    ]);

    setMarketingFunnel({
      launchClicks: launchClicksRes.count || 0,
      presaleIntents: presaleIntentsRes.count || 0,
      walletSignups: walletSignupsRes.count || 0,
      xLaunchClicks: xLaunchClicksRes.count || 0,
      xPresaleIntents: xPresaleIntentsRes.count || 0,
      xWalletSignups: xWalletSignupsRes.count || 0,
    });

    const attributionMap = new Map<string, CampaignAttributionRow>();
    for (const row of campaignRowsRes.data || []) {
      const source = (row.utm_source || '').toLowerCase();
      if (source !== 'x' && source !== 'twitter') continue;

      const campaign = row.utm_campaign || '(not set)';
      if (!attributionMap.has(campaign)) {
        attributionMap.set(campaign, { campaign, clicks: 0, intents: 0, signups: 0 });
      }
      const bucket = attributionMap.get(campaign)!;

      if (row.event_name === 'wallet_launch_click') bucket.clicks += 1;
      if (row.event_name === 'presale_intent_registered') bucket.intents += 1;
      if (row.event_name === 'wallet_account_created') bucket.signups += 1;
    }

    const sortedCampaigns = Array.from(attributionMap.values()).sort((a, b) => {
      if (b.intents !== a.intents) return b.intents - a.intents;
      return b.clicks - a.clicks;
    });
    setCampaignAttribution(sortedCampaigns);
  };

  const loadData = async () => {
    setRefreshing(true);
    try {
      const res = await fetch(`/api/waitlist?action=analytics&days=${days}`);
      const data = await res.json();

      // Process daily data - aggregate by date
      const dailyMap = new Map<string, number>();
      (data.daily || []).forEach((item: DailyData) => {
        const existing = dailyMap.get(item.date) || 0;
        dailyMap.set(item.date, existing + Number(item.count));
      });
      
      const processedDaily = Array.from(dailyMap.entries())
        .map(([date, count]) => ({ 
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          count,
          fullDate: date
        }))
        .sort((a, b) => new Date(a.fullDate).getTime() - new Date(b.fullDate).getTime());

      setDailyData(processedDaily);
      setSourceData(data.sources || []);
      setTopReferrers(data.topReferrers || []);
      await loadMarketingAttribution();
    } catch (error) {
      console.error('Error loading analytics:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const totalSignups = sourceData.reduce((acc, curr) => acc + Number(curr.count), 0);
  const intentRate = marketingFunnel.launchClicks
    ? (marketingFunnel.presaleIntents / marketingFunnel.launchClicks) * 100
    : 0;
  const signupRate = marketingFunnel.launchClicks
    ? (marketingFunnel.walletSignups / marketingFunnel.launchClicks) * 100
    : 0;

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold text-gray-900">Analytics</h1>
              <p className="text-gray-500 mt-1">Track your waitlist growth and referrals</p>
            </div>
            <div className="flex items-center gap-3">
              <select
                value={days}
                onChange={(e) => setDays(Number(e.target.value))}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                <option value={7}>Last 7 days</option>
                <option value={30}>Last 30 days</option>
                <option value={90}>Last 90 days</option>
              </select>
              <button
                onClick={loadData}
                disabled={refreshing}
                className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : (
            <>
              {/* Stats row */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                      <Users className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="text-sm text-gray-500">Total signups</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{totalSignups}</div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-sm text-gray-500">This period</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {dailyData.reduce((acc, curr) => acc + curr.count, 0)}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <span className="text-sm text-gray-500">Avg per day</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">
                    {dailyData.length > 0 
                      ? Math.round(dailyData.reduce((acc, curr) => acc + curr.count, 0) / dailyData.length)
                      : 0}
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                      <Award className="w-5 h-5 text-sky-600" />
                    </div>
                    <span className="text-sm text-gray-500">Top referrers</span>
                  </div>
                  <div className="text-3xl font-bold text-gray-900">{topReferrers.length}</div>
                </div>
              </div>

              {/* Marketing Attribution (X Ads) */}
              <div className="bg-white rounded-2xl border border-gray-200 p-6 mb-8">
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg">Marketing Attribution (X Ads)</h3>
                    <p className="text-sm text-gray-500">
                      Track launch clicks, presale intents, and wallet signups for the selected period.
                    </p>
                  </div>
                  <span className="text-xs font-medium px-3 py-1 rounded-full bg-orange-100 text-orange-700">
                    Last {days} days
                  </span>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-6 gap-4 mb-6">
                  <div className="rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <MousePointerClick className="w-4 h-4" />
                      Launch clicks
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{marketingFunnel.launchClicks}</div>
                  </div>
                  <div className="rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <Target className="w-4 h-4" />
                      Presale intents
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{marketingFunnel.presaleIntents}</div>
                    <div className="text-xs text-emerald-600 mt-1">{intentRate.toFixed(1)}% of clicks</div>
                  </div>
                  <div className="rounded-xl border border-gray-200 p-4">
                    <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
                      <UserPlus className="w-4 h-4" />
                      Wallet signups
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{marketingFunnel.walletSignups}</div>
                    <div className="text-xs text-emerald-600 mt-1">{signupRate.toFixed(1)}% of clicks</div>
                  </div>
                  <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                    <div className="text-gray-600 text-sm mb-1">X clicks</div>
                    <div className="text-2xl font-bold text-orange-700">{marketingFunnel.xLaunchClicks}</div>
                  </div>
                  <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                    <div className="text-gray-600 text-sm mb-1">X intents</div>
                    <div className="text-2xl font-bold text-orange-700">{marketingFunnel.xPresaleIntents}</div>
                  </div>
                  <div className="rounded-xl border border-orange-200 bg-orange-50 p-4">
                    <div className="text-gray-600 text-sm mb-1">X signups</div>
                    <div className="text-2xl font-bold text-orange-700">{marketingFunnel.xWalletSignups}</div>
                  </div>
                </div>

                <div className="rounded-xl border border-gray-200 overflow-hidden">
                  <div className="px-4 py-3 border-b border-gray-100 bg-gray-50">
                    <h4 className="font-semibold text-gray-900">X campaign attribution</h4>
                  </div>
                  {campaignAttribution.length === 0 ? (
                    <div className="p-6 text-sm text-gray-500">No X-attributed campaign data yet.</div>
                  ) : (
                    <div className="divide-y divide-gray-100">
                      {campaignAttribution.slice(0, 12).map((campaign) => (
                        <div key={campaign.campaign} className="grid grid-cols-4 gap-3 px-4 py-3 text-sm">
                          <div className="font-medium text-gray-900 truncate" title={campaign.campaign}>
                            {campaign.campaign}
                          </div>
                          <div className="text-gray-600">{campaign.clicks} clicks</div>
                          <div className="text-gray-600">{campaign.intents} intents</div>
                          <div className="text-gray-600">{campaign.signups} signups</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Charts grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                {/* Line chart - Daily signups */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Signups over time</h3>
                  <div className="h-64">
                    {dailyData.length > 0 ? (
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dailyData}>
                          <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                          <XAxis dataKey="date" tick={{ fontSize: 12 }} stroke="#94a3b8" />
                          <YAxis tick={{ fontSize: 12 }} stroke="#94a3b8" />
                          <Tooltip 
                            contentStyle={{ 
                              borderRadius: '12px', 
                              border: '1px solid #e2e8f0',
                              boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                            }} 
                          />
                          <Line 
                            type="monotone" 
                            dataKey="count" 
                            stroke="#f97316" 
                            strokeWidth={3}
                            dot={{ fill: '#f97316', strokeWidth: 2, r: 4 }}
                            activeDot={{ r: 6, fill: '#f97316' }}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    ) : (
                      <div className="h-full flex items-center justify-center text-gray-400">
                        No data for this period
                      </div>
                    )}
                  </div>
                </div>

                {/* Pie chart - Source breakdown */}
                <div className="bg-white rounded-2xl p-6 border border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4">Traffic sources</h3>
                  <div className="h-64 flex items-center">
                    {sourceData.length > 0 ? (
                      <div className="w-full flex items-center gap-4">
                        <div className="w-1/2">
                          <ResponsiveContainer width="100%" height={200}>
                            <PieChart>
                              <Pie
                                data={sourceData}
                                cx="50%"
                                cy="50%"
                                innerRadius={50}
                                outerRadius={80}
                                paddingAngle={2}
                                dataKey="count"
                              >
                                {sourceData.map((entry, index) => (
                                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                              </Pie>
                              <Tooltip />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                        <div className="w-1/2 space-y-2">
                          {sourceData.map((item, index) => (
                            <div key={item.source} className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div 
                                  className="w-3 h-3 rounded-full" 
                                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                                />
                                <span className="text-sm text-gray-600 truncate max-w-[100px]">
                                  {item.source}
                                </span>
                              </div>
                              <span className="text-sm font-semibold text-gray-900">
                                {item.percentage}%
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <div className="w-full flex items-center justify-center text-gray-400">
                        No source data available
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Top Referrers */}
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
                <div className="p-6 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900">Top referrers</h3>
                  <p className="text-sm text-gray-500 mt-1">Users who brought the most signups</p>
                </div>
                {topReferrers.length > 0 ? (
                  <div className="divide-y divide-gray-100">
                    {topReferrers.map((referrer, index) => (
                      <div key={referrer.referrer_code} className="flex items-center justify-between p-4 hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                            index === 0 ? 'bg-yellow-100 text-yellow-700' :
                            index === 1 ? 'bg-gray-100 text-gray-700' :
                            index === 2 ? 'bg-orange-100 text-orange-700' :
                            'bg-gray-50 text-gray-600'
                          }`}>
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{referrer.email}</p>
                            <p className="text-sm text-gray-500">Code: {referrer.referrer_code}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-gray-900">{referrer.referral_count}</p>
                          <p className="text-xs text-gray-500">referrals</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center text-gray-400">
                    No referrals yet
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}

