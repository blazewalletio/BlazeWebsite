'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import {
  Zap, Shield, Users, TrendingUp, ArrowRight, Gift, Clock, Check,
  Trophy, Medal, Star, Copy, ChevronDown, ChevronUp, AlertCircle,
  Loader2, Target, Calculator, Share2, Twitter, Send, Flame,
  Lock, Wallet, BadgeCheck, Sparkles, ArrowUp
} from 'lucide-react';

// Types
interface PricingTier {
  tier_number: number;
  tier_name: string;
  min_buyers: number;
  max_buyers: number;
  price_usd: number;
  bonus_percentage: number;
  isCurrent?: boolean;
  isPast?: boolean;
  spotsRemaining?: number;
  discountPercentage?: number;
}

interface LeaderboardEntry {
  rank: number;
  email: string;
  referralCode: string;
  referralCount: number;
  badge: { name: string; color: string } | null;
  bonusTokens: number;
}

interface Reward {
  rank_start: number;
  rank_end: number;
  bonus_tokens: number;
  badge_name: string;
  badge_color: string;
}

export default function PresalePage() {
  // State
  const [tiers, setTiers] = useState<PricingTier[]>([]);
  const [currentTier, setCurrentTier] = useState<PricingTier | null>(null);
  const [totalBuyers, setTotalBuyers] = useState(0);
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [rewards, setRewards] = useState<Reward[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Commitment form state
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState(100);
  const [commitmentLoading, setCommitmentLoading] = useState(false);
  const [commitmentSuccess, setCommitmentSuccess] = useState(false);
  const [commitmentError, setCommitmentError] = useState<string | null>(null);
  
  // User stats
  const [userEmail, setUserEmail] = useState('');
  const [userStats, setUserStats] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  
  // FAQ
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  // Refs
  const commitmentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      // Fetch pricing
      const pricingRes = await fetch('/api/pricing');
      const pricingData = await pricingRes.json();
      setTiers(pricingData.allTiers || []);
      setCurrentTier(pricingData.currentTier);
      setTotalBuyers(pricingData.totalBuyers || 0);

      // Fetch waitlist count
      const waitlistRes = await fetch('/api/waitlist');
      const waitlistData = await waitlistRes.json();
      setWaitlistCount(waitlistData.count || 0);

      // Fetch leaderboard
      const leaderboardRes = await fetch('/api/leaderboard?limit=10');
      const leaderboardData = await leaderboardRes.json();
      setLeaderboard(leaderboardData.leaderboard || []);
      setRewards(leaderboardData.rewards || []);
    } catch (err) {
      console.error('Error fetching data:', err);
    } finally {
      setLoading(false);
    }
  }

  async function handleCommitment(e: React.FormEvent) {
    e.preventDefault();
    setCommitmentLoading(true);
    setCommitmentError(null);

    try {
      const res = await fetch('/api/commitment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, intendedAmountUsd: amount }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setCommitmentSuccess(true);
    } catch (err: any) {
      setCommitmentError(err.message);
    } finally {
      setCommitmentLoading(false);
    }
  }

  async function checkUserStats() {
    if (!userEmail) return;
    try {
      const res = await fetch(`/api/leaderboard?email=${encodeURIComponent(userEmail)}`);
      const data = await res.json();
      setUserStats(data.userStats);
    } catch (err) {
      console.error('Error fetching user stats:', err);
    }
  }

  function copyReferralLink() {
    if (!userStats?.referralLink) return;
    navigator.clipboard.writeText(userStats.referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  function scrollToCommitment() {
    commitmentRef.current?.scrollIntoView({ behavior: 'smooth' });
  }

  // Calculations - using fixed presale price ($0.00834)
  const PRESALE_PRICE = 0.00834; // Fixed presale price
  const LAUNCH_PRICE = 0.02;
  const bonusPercentage = currentTier?.bonus_percentage || 0;
  const baseTokens = amount / PRESALE_PRICE;
  const bonusTokens = baseTokens * (bonusPercentage / 100);
  const totalTokens = baseTokens + bonusTokens;
  const valueAtLaunch = totalTokens * LAUNCH_PRICE;
  const presaleDiscount = Math.round((1 - PRESALE_PRICE / LAUNCH_PRICE) * 100); // 58%

  const faqs = [
    {
      q: 'What is the BLAZE presale?',
      a: 'The BLAZE presale gives early supporters the opportunity to purchase BLAZE tokens at a significant discount before our public launch. The earlier you join, the lower the price you pay.',
    },
    {
      q: 'How do the bonus tiers work?',
      a: 'Everyone pays the same presale price of $0.00834 per BLAZE token (58% off the $0.02 launch price). Early supporters get massive bonus tokens: Founders get +100% (double tokens!), Early Birds +75%, Pioneers +50%, and so on. The earlier you join, the more bonus tokens you receive!',
    },
    {
      q: 'Is this a commitment or actual payment?',
      a: 'Registering your intent is NOT a payment. It simply reserves your spot and locks in your tier pricing. When the presale officially opens, you\'ll receive instructions to complete your purchase.',
    },
    {
      q: 'What payment methods will be accepted?',
      a: 'We\'ll accept USDT, USDC, ETH, BNB, and credit/debit cards. You\'ll be able to choose your preferred method when the presale opens.',
    },
    {
      q: 'How does the referral program work?',
      a: 'When you join the waitlist, you get a unique referral link. For every friend who signs up using your link, you climb the leaderboard. Top referrers earn bonus tokens - up to 100,000 BLAZE for #1!',
    },
    {
      q: 'When will I receive my tokens?',
      a: 'Tokens will be distributed after the Token Generation Event (TGE). You\'ll receive your tokens to the wallet address you provide during purchase.',
    },
    {
      q: 'Is BLAZE safe and legitimate?',
      a: 'Yes! BLAZE is a registered company (KvK: 88929280) based in the Netherlands. Our wallet is non-custodial, meaning you always control your private keys. We\'re building real technology - check out our whitepaper for technical details.',
    },
  ];

  return (
    <main className="min-h-screen bg-slate-950">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-orange-500/20 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-yellow-500/10 rounded-full blur-[100px]" />
        
        <div className="container-main relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 text-orange-300 font-medium text-sm mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Early bird presale • Limited spots
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              Join the BLAZE{' '}
              <span className="text-gradient-brand">presale</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto"
            >
              Presale price: $0.00834 per BLAZE token (58% off $0.02 launch). Early supporters get bonus tokens!
              No payment required to reserve your spot.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8 mb-10"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-white">{waitlistCount.toLocaleString()}+</div>
                <div className="text-gray-500 text-sm">People waiting</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-400">${PRESALE_PRICE.toFixed(5)}</div>
                <div className="text-gray-500 text-sm">Current price</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-emerald-400">{currentTier?.discountPercentage || 70}%</div>
                <div className="text-gray-500 text-sm">Discount</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-yellow-400">+{bonusPercentage}%</div>
                <div className="text-gray-500 text-sm">Bonus tokens</div>
              </div>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <button
                onClick={scrollToCommitment}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg shadow-orange-500/30 flex items-center justify-center gap-2"
              >
                Reserve my spot
                <ArrowRight className="w-5 h-5" />
              </button>
              <a
                href="#tiers"
                className="px-8 py-4 bg-white/10 text-white rounded-xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2 border border-white/20"
              >
                View all tiers
                <ChevronDown className="w-5 h-5" />
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Early Bird Bonus Tiers */}
      <section id="tiers" className="py-20 relative">
        <div className="container-main">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Early bird bonus tiers
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everyone pays the same price of $0.00834 per token.
              Early supporters get bonus tokens based on their tier!
            </p>
          </div>

          {/* Price banner */}
          <div className="max-w-2xl mx-auto mb-10 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 rounded-2xl p-6 text-center">
            <div className="text-gray-400 text-sm mb-2">Fixed presale price (from wallet)</div>
            <div className="text-4xl font-bold text-white mb-2">$0.00834 <span className="text-lg text-gray-400">per BLAZE token</span></div>
            <div className="text-emerald-400 font-medium">{presaleDiscount}% off launch price of $0.02</div>
          </div>

          {/* Bonus tiers grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
            {[
              { tier: 'Founders', range: '1-100', bonus: 100 },
              { tier: 'Early Birds', range: '101-250', bonus: 75 },
              { tier: 'Pioneers', range: '251-500', bonus: 50 },
              { tier: 'Adopters', range: '501-1000', bonus: 30 },
              { tier: 'Supporters', range: '1001-2000', bonus: 15 },
              { tier: 'Public', range: '2000+', bonus: 0 },
            ].map((tier, index) => {
              const isCurrent = currentTier?.tier_name === tier.tier || 
                (index === 0 && !currentTier);
              return (
                <motion.div
                  key={tier.tier}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className={`relative rounded-2xl p-5 transition-all ${
                    isCurrent
                      ? 'bg-gradient-to-br from-orange-500/30 to-yellow-500/30 border-2 border-orange-500 scale-105 z-10'
                      : 'bg-white/5 border border-white/10 hover:border-orange-500/50'
                  }`}
                >
                  {isCurrent && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-orange-500 rounded-full text-white text-xs font-bold whitespace-nowrap">
                      Current tier
                    </div>
                  )}
                  <div className="text-center">
                    <div className="text-xs text-gray-500 mb-1">Buyers #{tier.range}</div>
                    <div className="font-bold text-white mb-3 text-sm">{tier.tier}</div>
                    {tier.bonus > 0 ? (
                      <>
                        <div className="text-3xl font-bold text-yellow-400 mb-1">
                          +{tier.bonus}%
                        </div>
                        <div className="text-xs text-gray-400">bonus tokens</div>
                      </>
                    ) : (
                      <>
                        <div className="text-xl font-bold text-gray-400 mb-1">
                          No bonus
                        </div>
                        <div className="text-xs text-gray-500">base price only</div>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Example calculation */}
          <div className="max-w-xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4 text-center">Example: $100 investment</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center p-4 bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl border border-orange-500/30">
                <div className="text-orange-300 mb-1">As Founder (+100%)</div>
                <div className="text-3xl font-bold text-white">{Math.floor(100 / 0.00834 * 2).toLocaleString()}</div>
                <div className="text-orange-400 text-xs">BLAZE tokens</div>
                <div className="text-emerald-400 text-xs mt-1">2x tokens!</div>
              </div>
              <div className="text-center p-4 bg-white/5 rounded-xl">
                <div className="text-gray-400 mb-1">As Public (0%)</div>
                <div className="text-3xl font-bold text-white">{Math.floor(100 / 0.00834).toLocaleString()}</div>
                <div className="text-orange-400 text-xs">BLAZE tokens</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment Form */}
      <section ref={commitmentRef} id="reserve" className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="container-main">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 text-emerald-400 font-medium text-sm mb-6">
                  <Target className="w-4 h-4" />
                  Reserve your spot
                </div>
                <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                  Lock in your price
                </h2>
                <p className="text-gray-400 mb-8">
                  Register your purchase intent to secure your tier pricing.
                  No payment required - just let us know you're interested.
                </p>

                <AnimatePresence mode="wait">
                  {commitmentSuccess ? (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="bg-emerald-500/10 border border-emerald-500/30 rounded-2xl p-8 text-center"
                    >
                      <div className="w-16 h-16 bg-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-emerald-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">You're in!</h3>
                      <p className="text-gray-400 mb-4">
                        Check your email for confirmation. We'll notify you when the presale opens.
                      </p>
                      <button
                        onClick={() => setCommitmentSuccess(false)}
                        className="text-orange-400 hover:text-orange-300"
                      >
                        Register another commitment
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      onSubmit={handleCommitment}
                      className="space-y-6"
                    >
                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Your email</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          placeholder="you@example.com"
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                        />
                      </div>

                      <div>
                        <label className="block text-gray-400 text-sm mb-2">Investment amount</label>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                          <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(Math.max(10, parseInt(e.target.value) || 10))}
                            min="10"
                            className="w-full pl-8 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-orange-500"
                          />
                        </div>
                        <div className="flex gap-2 mt-3">
                          {[50, 100, 250, 500, 1000, 2500].map((val) => (
                            <button
                              key={val}
                              type="button"
                              onClick={() => setAmount(val)}
                              className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                                amount === val
                                  ? 'bg-orange-500 text-white'
                                  : 'bg-white/5 text-gray-400 hover:bg-white/10'
                              }`}
                            >
                              ${val >= 1000 ? `${val / 1000}k` : val}
                            </button>
                          ))}
                        </div>
                      </div>

                      {commitmentError && (
                        <div className="flex items-center gap-2 text-red-400 bg-red-500/10 px-4 py-3 rounded-xl">
                          <AlertCircle className="w-5 h-5" />
                          {commitmentError}
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={commitmentLoading}
                        className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg shadow-orange-500/30 disabled:opacity-50 flex items-center justify-center gap-2"
                      >
                        {commitmentLoading ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <Target className="w-5 h-5" />
                            Reserve my spot
                          </>
                        )}
                      </button>

                      <p className="text-center text-gray-500 text-sm">
                        This is not a payment • You can adjust your amount anytime
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>

              {/* Calculator */}
              <div className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl p-8 border border-white/10">
                <div className="flex items-center gap-2 text-white font-medium mb-6">
                  <Calculator className="w-5 h-5 text-orange-400" />
                  Your allocation
                </div>

                <div className="space-y-4 mb-8">
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-gray-400">Investment</span>
                    <span className="text-2xl font-bold text-white">${amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-gray-400">Price per token</span>
                    <span className="font-medium text-white">${PRESALE_PRICE.toFixed(5)}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-gray-400">Base tokens</span>
                    <span className="font-medium text-white">{Math.round(baseTokens).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center py-3 border-b border-white/10">
                    <span className="text-emerald-400 flex items-center gap-2">
                      <Gift className="w-4 h-4" />
                      Bonus ({bonusPercentage}%)
                    </span>
                    <span className="font-medium text-emerald-400">+{Math.round(bonusTokens).toLocaleString()}</span>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-2xl p-6 border border-orange-500/30">
                  <div className="text-gray-400 text-sm mb-1">Total tokens</div>
                  <div className="text-4xl font-bold text-white">
                    {Math.round(totalTokens).toLocaleString()}
                    <span className="text-orange-400 text-lg ml-2">BLAZE</span>
                  </div>
                </div>

                {/* Trust signals */}
                <div className="mt-8 space-y-3">
                  {[
                    { icon: Lock, text: 'Non-custodial wallet' },
                    { icon: Shield, text: 'AI scam protection' },
                    { icon: Zap, text: 'Priority access' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 text-gray-400 text-sm">
                      <item.icon className="w-4 h-4 text-orange-400" />
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Referral Leaderboard */}
      <section id="leaderboard" className="py-20">
        <div className="container-main">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/20 text-purple-400 font-medium text-sm mb-6">
              <Trophy className="w-4 h-4" />
              Referral program
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Earn bonus tokens
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Share your referral link and climb the leaderboard.
              Top referrers earn up to 100,000 bonus BLAZE tokens!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Leaderboard */}
            <div className="lg:col-span-2 bg-white/5 rounded-2xl border border-white/10 overflow-hidden">
              <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between">
                <h3 className="font-bold text-white flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Top Referrers
                </h3>
                <span className="text-gray-500 text-sm">{leaderboard.length} active</span>
              </div>
              <div className="divide-y divide-white/5">
                {leaderboard.slice(0, 10).map((entry, index) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center gap-4 px-6 py-4 ${
                      entry.rank <= 3 ? 'bg-yellow-500/5' : ''
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold ${
                      entry.rank === 1 ? 'bg-yellow-500/20 text-yellow-400' :
                      entry.rank === 2 ? 'bg-gray-500/20 text-gray-300' :
                      entry.rank === 3 ? 'bg-amber-500/20 text-amber-400' :
                      'bg-white/5 text-gray-500'
                    }`}>
                      {entry.rank <= 3 ? (
                        entry.rank === 1 ? <Trophy className="w-5 h-5" /> :
                        <Medal className="w-5 h-5" />
                      ) : (
                        `#${entry.rank}`
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-white truncate">{entry.email}</div>
                      {entry.badge && (
                        <span
                          className="inline-block px-2 py-0.5 rounded-full text-xs text-white mt-1"
                          style={{ backgroundColor: entry.badge.color }}
                        >
                          {entry.badge.name}
                        </span>
                      )}
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white">{entry.referralCount}</div>
                      <div className="text-xs text-gray-500">referrals</div>
                    </div>
                    {entry.bonusTokens > 0 && (
                      <div className="text-right">
                        <div className="font-bold text-orange-400">+{entry.bonusTokens.toLocaleString()}</div>
                        <div className="text-xs text-gray-500">bonus</div>
                      </div>
                    )}
                  </div>
                ))}
                {leaderboard.length === 0 && (
                  <div className="px-6 py-12 text-center text-gray-500">
                    No referrals yet. Be the first!
                  </div>
                )}
              </div>
            </div>

            {/* Your Stats */}
            <div className="space-y-6">
              {/* Check your rank */}
              <div className="bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-2xl p-6 border border-orange-500/20">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Star className="w-5 h-5 text-orange-400" />
                  Check your rank
                </h3>
                <input
                  type="email"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 mb-3"
                />
                <button
                  onClick={checkUserStats}
                  className="w-full py-3 bg-orange-500 text-white rounded-xl font-semibold hover:bg-orange-600 transition-colors"
                >
                  Check rank
                </button>

                {userStats && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <div className="text-center mb-4">
                      <div className="text-4xl font-bold text-orange-400">#{userStats.rank}</div>
                      <div className="text-gray-400 text-sm">Your rank</div>
                    </div>
                    <div className="space-y-2 text-sm mb-4">
                      <div className="flex justify-between">
                        <span className="text-gray-400">Referrals</span>
                        <span className="text-white font-medium">{userStats.referralCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-400">Bonus</span>
                        <span className="text-orange-400 font-medium">+{userStats.bonusTokens?.toLocaleString() || 0}</span>
                      </div>
                    </div>
                    <button
                      onClick={copyReferralLink}
                      className="w-full flex items-center justify-center gap-2 py-3 bg-white/10 rounded-xl text-white hover:bg-white/20 transition-colors"
                    >
                      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      {copied ? 'Copied!' : 'Copy referral link'}
                    </button>
                  </div>
                )}
              </div>

              {/* Rewards tiers */}
              <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="font-bold text-white mb-4 flex items-center gap-2">
                  <Gift className="w-5 h-5 text-yellow-400" />
                  Bonus rewards
                </h3>
                <div className="space-y-3">
                  {rewards.slice(0, 5).map((reward, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2 h-2 rounded-full"
                          style={{ backgroundColor: reward.badge_color }}
                        />
                        <span className="text-gray-400">
                          {reward.rank_start === reward.rank_end
                            ? `#${reward.rank_start}`
                            : `#${reward.rank_start}-${reward.rank_end}`}
                        </span>
                      </div>
                      <span className="text-orange-400 font-medium">
                        +{reward.bonus_tokens.toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-900/50">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Frequently asked questions
              </h2>
              <p className="text-gray-400">
                Everything you need to know about the BLAZE presale.
              </p>
            </div>

            <div className="space-y-3">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white/5 border border-white/10 rounded-xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full px-6 py-4 flex items-center justify-between text-left"
                  >
                    <span className="font-medium text-white">{faq.q}</span>
                    {openFaq === index ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </button>
                  <AnimatePresence>
                    {openFaq === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-4 text-gray-400">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20">
        <div className="container-main">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-3xl p-12 border border-orange-500/30"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-orange-500/30">
                <Flame className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to join the presale?
              </h2>
              <p className="text-gray-400 mb-8 max-w-xl mx-auto">
                Don't miss out on the lowest prices. Register your intent now and be first in line when the presale opens.
              </p>
              <button
                onClick={scrollToCommitment}
                className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg shadow-orange-500/30 inline-flex items-center gap-2"
              >
                Reserve my spot now
                <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

