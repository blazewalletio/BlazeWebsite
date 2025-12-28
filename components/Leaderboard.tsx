'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Star, Users, ArrowUp, Copy, Check, Loader2, ExternalLink } from 'lucide-react';

interface LeaderboardEntry {
  rank: number;
  email: string;
  referralCode: string;
  referralCount: number;
  badge: {
    name: string;
    color: string;
  } | null;
  bonusTokens: number;
  bonusPercentage: number;
}

interface Reward {
  rank_start: number;
  rank_end: number;
  reward_description: string;
  bonus_tokens: number;
  badge_name: string;
  badge_color: string;
}

interface LeaderboardData {
  leaderboard: LeaderboardEntry[];
  rewards: Reward[];
  totalParticipants: number;
  userStats?: {
    rank: number;
    referralCode: string;
    referralCount: number;
    badge: { name: string; color: string } | null;
    bonusTokens: number;
    bonusPercentage: number;
    referralsToNextRank: number;
    referralLink: string;
  };
}

export default function Leaderboard() {
  const [data, setData] = useState<LeaderboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [checkingUser, setCheckingUser] = useState(false);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  async function fetchLeaderboard(email?: string) {
    try {
      const url = email ? `/api/leaderboard?email=${encodeURIComponent(email)}` : '/api/leaderboard';
      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch leaderboard');
      const result = await res.json();
      setData(result);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setCheckingUser(false);
    }
  }

  async function handleCheckRank() {
    if (!userEmail) return;
    setCheckingUser(true);
    await fetchLeaderboard(userEmail);
  }

  function copyReferralLink() {
    if (!data?.userStats?.referralLink) return;
    navigator.clipboard.writeText(data.userStats.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function getRankIcon(rank: number) {
    if (rank === 1) return <Trophy className="w-6 h-6 text-yellow-400" />;
    if (rank === 2) return <Medal className="w-6 h-6 text-gray-300" />;
    if (rank === 3) return <Medal className="w-6 h-6 text-amber-600" />;
    if (rank <= 10) return <Star className="w-5 h-5 text-orange-400" />;
    return null;
  }

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="container-main">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="leaderboard" className="py-20 lg:py-28 bg-white">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium text-sm mb-6">
            <Trophy className="w-4 h-4" />
            Referral leaderboard
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Top referrers win{' '}
            <span className="text-gradient-brand">bonus tokens</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Share your referral link and climb the leaderboard. Top 100 referrers get up to 100,000 bonus BLAZE tokens!
          </p>
        </motion.div>

        {/* Stats Banner */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 mb-12"
        >
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 text-center border border-purple-100">
            <div className="text-3xl font-bold text-purple-600 mb-1">{data?.totalParticipants?.toLocaleString() || 0}</div>
            <div className="text-gray-600 text-sm">Total participants</div>
          </div>
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 text-center border border-orange-100">
            <div className="text-3xl font-bold text-orange-600 mb-1">{data?.leaderboard?.length || 0}</div>
            <div className="text-gray-600 text-sm">Active referrers</div>
          </div>
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-6 text-center border border-emerald-100">
            <div className="text-3xl font-bold text-emerald-600 mb-1">100K+</div>
            <div className="text-gray-600 text-sm">Bonus tokens</div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Leaderboard */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-soft">
              <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-6 py-4">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Top Referrers
                </h3>
              </div>
              <div className="divide-y divide-gray-100">
                {data?.leaderboard?.slice(0, 25).map((entry, index) => (
                  <motion.div
                    key={entry.rank}
                    initial={{ x: -20 }}
                    whileInView={{ x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.03 }}
                    className={`flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors ${
                      entry.rank <= 3 ? 'bg-gradient-to-r from-yellow-50/50 to-transparent' : ''
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      entry.rank === 1 ? 'bg-yellow-100 text-yellow-600' :
                      entry.rank === 2 ? 'bg-gray-100 text-gray-600' :
                      entry.rank === 3 ? 'bg-amber-100 text-amber-600' :
                      'bg-gray-50 text-gray-500'
                    }`}>
                      {getRankIcon(entry.rank) || `#${entry.rank}`}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 truncate">{entry.email}</div>
                      {entry.badge && (
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-xs font-medium text-white mt-1"
                          style={{ backgroundColor: entry.badge.color }}
                        >
                          {entry.badge.name}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">{entry.referralCount}</div>
                      <div className="text-xs text-gray-500">referrals</div>
                    </div>
                    {entry.bonusTokens > 0 && (
                      <div className="text-right hidden sm:block">
                        <div className="font-bold text-orange-500">+{entry.bonusTokens.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">bonus</div>
                      </div>
                    )}
                  </motion.div>
                ))}
                {(!data?.leaderboard || data.leaderboard.length === 0) && (
                  <div className="px-6 py-12 text-center text-gray-500">
                    <Users className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                    <p>No referrals yet. Be the first!</p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Check Your Rank */}
            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 border border-orange-100"
            >
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Star className="w-5 h-5 text-orange-500" />
                Check your rank
              </h3>
              <div className="space-y-3">
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 rounded-xl border border-orange-200 bg-white focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                />
                <button
                  onClick={handleCheckRank}
                  disabled={checkingUser || !userEmail}
                  className="w-full px-4 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all disabled:opacity-50"
                >
                  {checkingUser ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Check rank'}
                </button>
              </div>

              {data?.userStats && (
                <div className="mt-6 pt-6 border-t border-orange-200">
                  <div className="text-center mb-4">
                    <div className="text-4xl font-bold text-orange-500">#{data.userStats.rank}</div>
                    <div className="text-gray-600 text-sm">Your current rank</div>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Referrals</span>
                      <span className="font-medium text-gray-900">{data.userStats.referralCount}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Bonus tokens</span>
                      <span className="font-medium text-orange-500">+{data.userStats.bonusTokens.toLocaleString()}</span>
                    </div>
                    {data.userStats.referralsToNextRank > 0 && (
                      <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 rounded-lg px-3 py-2">
                        <ArrowUp className="w-4 h-4" />
                        <span>{data.userStats.referralsToNextRank} more to rank up!</span>
                      </div>
                    )}
                  </div>
                  <div className="mt-4">
                    <div className="text-xs text-gray-500 mb-2">Your referral link:</div>
                    <button
                      onClick={copyReferralLink}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-white border border-orange-200 rounded-xl hover:bg-orange-50 transition-colors text-sm"
                    >
                      {copied ? (
                        <>
                          <Check className="w-4 h-4 text-emerald-500" />
                          <span className="text-emerald-500">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 text-gray-500" />
                          <span className="text-gray-600 truncate">{data.userStats.referralLink}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Rewards Info */}
            <motion.div
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl border border-gray-200 p-6 shadow-soft"
            >
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Medal className="w-5 h-5 text-purple-500" />
                Reward tiers
              </h3>
              <div className="space-y-3">
                {data?.rewards?.map((reward, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 text-sm"
                  >
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: reward.badge_color }}
                    />
                    <span className="flex-1 text-gray-600">
                      {reward.rank_start === reward.rank_end
                        ? `#${reward.rank_start}`
                        : `#${reward.rank_start}-${reward.rank_end}`}
                    </span>
                    <span className="font-medium text-orange-500">
                      +{reward.bonus_tokens.toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}

