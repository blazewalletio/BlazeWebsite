'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { Trophy, Medal, Star, Users, Gift, Search, Download, Loader2, RefreshCw } from 'lucide-react';

interface LeaderboardEntry {
  id: string;
  email: string;
  referral_code: string;
  total_referral_count: number;
  created_at: string;
}

interface Reward {
  id: number;
  rank_start: number;
  rank_end: number;
  reward_description: string;
  bonus_tokens: number;
  bonus_percentage: number;
  badge_name: string;
  badge_color: string;
}

export default function LeaderboardAdminPage() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [editingReward, setEditingReward] = useState<Reward | null>(null);

  const supabase = createClient();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    setLoading(true);
    
    // Fetch leaderboard
    const { data: leaderboardData } = await supabase
      .from('waitlist')
      .select('id, email, referral_code, total_referral_count, created_at')
      .gt('total_referral_count', 0)
      .order('total_referral_count', { ascending: false })
      .order('created_at', { ascending: true })
      .limit(100);

    // Fetch rewards
    const { data: rewardsData } = await supabase
      .from('leaderboard_rewards')
      .select('*')
      .order('rank_start');

    setLeaderboard(leaderboardData || []);
    setRewards(rewardsData || []);
    setLoading(false);
  }

  async function updateReward(reward: Reward) {
    const { error } = await supabase
      .from('leaderboard_rewards')
      .update({
        reward_description: reward.reward_description,
        bonus_tokens: reward.bonus_tokens,
        bonus_percentage: reward.bonus_percentage,
        badge_name: reward.badge_name,
        badge_color: reward.badge_color,
      })
      .eq('id', reward.id);

    if (!error) {
      setEditingReward(null);
      fetchData();
    }
  }

  function exportCSV() {
    const headers = ['Rank', 'Email', 'Referral Code', 'Referral Count', 'Joined Date'];
    const rows = leaderboard.map((entry, index) => [
      index + 1,
      entry.email,
      entry.referral_code,
      entry.total_referral_count,
      new Date(entry.created_at).toLocaleDateString(),
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `leaderboard-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  }

  function getRankIcon(rank: number) {
    if (rank === 1) return <Trophy className="w-5 h-5 text-yellow-500" />;
    if (rank === 2) return <Medal className="w-5 h-5 text-gray-400" />;
    if (rank === 3) return <Medal className="w-5 h-5 text-amber-600" />;
    if (rank <= 10) return <Star className="w-5 h-5 text-orange-400" />;
    return null;
  }

  function getRewardForRank(rank: number): Reward | undefined {
    return rewards.find(r => rank >= r.rank_start && rank <= r.rank_end);
  }

  const filteredLeaderboard = leaderboard.filter(entry =>
    entry.email.toLowerCase().includes(search.toLowerCase()) ||
    entry.referral_code.toLowerCase().includes(search.toLowerCase())
  );

  const totalReferrals = leaderboard.reduce((sum, e) => sum + e.total_referral_count, 0);
  const totalBonusTokens = leaderboard.reduce((sum, entry, index) => {
    const reward = getRewardForRank(index + 1);
    return sum + (reward?.bonus_tokens || 0);
  }, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Referral leaderboard</h1>
              <p className="text-gray-600">Manage leaderboard rewards and view top referrers</p>
            </div>
            <button
              onClick={fetchData}
              className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
            >
              <RefreshCw className="w-5 h-5" />
              Refresh
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
                  <Users className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-gray-600">Active referrers</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{leaderboard.length}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Gift className="w-5 h-5 text-orange-600" />
                </div>
                <span className="text-gray-600">Total referrals</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{totalReferrals}</div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                  <Trophy className="w-5 h-5 text-yellow-600" />
                </div>
                <span className="text-gray-600">Top score</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">
                {leaderboard[0]?.total_referral_count || 0}
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <Star className="w-5 h-5 text-emerald-600" />
                </div>
                <span className="text-gray-600">Bonus tokens</span>
              </div>
              <div className="text-3xl font-bold text-gray-900">{totalBonusTokens.toLocaleString()}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Leaderboard Table */}
            <div className="lg:col-span-2">
              {/* Search & Export */}
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search by email or code..."
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
                <button
                  onClick={exportCSV}
                  className="flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  Export
                </button>
              </div>

              <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
                  </div>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Rank</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Email</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Code</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Referrals</th>
                          <th className="text-left px-6 py-4 text-sm font-semibold text-gray-900">Bonus</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-100">
                        {filteredLeaderboard.map((entry, index) => {
                          const rank = leaderboard.indexOf(entry) + 1;
                          const reward = getRewardForRank(rank);
                          return (
                            <tr key={entry.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  {getRankIcon(rank)}
                                  <span className={`font-bold ${rank <= 3 ? 'text-lg' : 'text-gray-600'}`}>
                                    #{rank}
                                  </span>
                                </div>
                              </td>
                              <td className="px-6 py-4">
                                <div className="font-medium text-gray-900">{entry.email}</div>
                                {reward && (
                                  <span
                                    className="inline-block px-2 py-0.5 rounded-full text-xs text-white mt-1"
                                    style={{ backgroundColor: reward.badge_color }}
                                  >
                                    {reward.badge_name}
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                                  {entry.referral_code}
                                </code>
                              </td>
                              <td className="px-6 py-4">
                                <span className="font-bold text-orange-500">
                                  {entry.total_referral_count}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                {reward && (
                                  <span className="text-emerald-600 font-medium">
                                    +{reward.bonus_tokens.toLocaleString()}
                                  </span>
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>

            {/* Rewards Configuration */}
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">Reward tiers</h2>
              <div className="space-y-3">
                {rewards.map((reward) => (
                  <div
                    key={reward.id}
                    className="bg-white rounded-xl p-4 border border-gray-200"
                  >
                    {editingReward?.id === reward.id ? (
                      <div className="space-y-3">
                        <input
                          type="number"
                          value={editingReward.bonus_tokens}
                          onChange={(e) => setEditingReward({
                            ...editingReward,
                            bonus_tokens: parseInt(e.target.value) || 0,
                          })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                          placeholder="Bonus tokens"
                        />
                        <input
                          type="text"
                          value={editingReward.badge_name}
                          onChange={(e) => setEditingReward({
                            ...editingReward,
                            badge_name: e.target.value,
                          })}
                          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm"
                          placeholder="Badge name"
                        />
                        <div className="flex gap-2">
                          <button
                            onClick={() => updateReward(editingReward)}
                            className="flex-1 px-3 py-2 bg-emerald-500 text-white rounded-lg text-sm hover:bg-emerald-600"
                          >
                            Save
                          </button>
                          <button
                            onClick={() => setEditingReward(null)}
                            className="flex-1 px-3 py-2 bg-gray-100 text-gray-600 rounded-lg text-sm hover:bg-gray-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div
                        className="cursor-pointer"
                        onClick={() => setEditingReward(reward)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span
                            className="px-2 py-1 rounded-full text-xs text-white font-medium"
                            style={{ backgroundColor: reward.badge_color }}
                          >
                            {reward.badge_name}
                          </span>
                          <span className="text-sm text-gray-500">
                            #{reward.rank_start}-{reward.rank_end}
                          </span>
                        </div>
                        <div className="text-lg font-bold text-orange-500">
                          +{reward.bonus_tokens.toLocaleString()} tokens
                        </div>
                        <div className="text-xs text-gray-500 mt-1">
                          Click to edit
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}


