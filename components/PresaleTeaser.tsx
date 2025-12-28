'use client';

import { useState, useEffect } from 'react';
import { Zap, Users, TrendingUp, ArrowRight, Clock, Gift, ChevronRight } from 'lucide-react';
import Link from 'next/link';

interface PricingTier {
  tier_name: string;
  price_usd: number;
  bonus_percentage: number;
  spotsRemaining: number;
  discountPercentage: number;
  max_buyers: number;
}

export default function PresaleTeaser() {
  const [currentTier, setCurrentTier] = useState<PricingTier | null>(null);
  const [waitlistCount, setWaitlistCount] = useState(0);
  const [inputAmount, setInputAmount] = useState(100);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch pricing
        const pricingRes = await fetch('/api/pricing');
        const pricingData = await pricingRes.json();
        if (pricingData.currentTier) {
          setCurrentTier(pricingData.currentTier);
        }

        // Fetch waitlist count
        const waitlistRes = await fetch('/api/waitlist');
        const waitlistData = await waitlistRes.json();
        setWaitlistCount(waitlistData.count || 0);
      } catch (err) {
        console.error('Error fetching presale data:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  // Calculate tokens - using fixed presale price ($0.00834)
  const PRESALE_PRICE = 0.00834; // Fixed presale price
  const LAUNCH_PRICE = 0.02;
  const bonusPercentage = currentTier?.bonus_percentage || 100; // Default to Founders tier (100% bonus = 2x tokens)
  const baseTokens = inputAmount / PRESALE_PRICE;
  const bonusTokens = baseTokens * (bonusPercentage / 100);
  const totalTokens = baseTokens + bonusTokens;
  const presaleDiscount = Math.round((1 - PRESALE_PRICE / LAUNCH_PRICE) * 100); // 58%

  // Presale limits from wallet
  const HARD_CAP = 500000; // $500k
  const TOKENS_FOR_SALE = 120000000; // 120M tokens

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
      
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="container-main relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            {/* Live badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 text-orange-300 font-medium text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Early bird presale open
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Get BLAZE tokens at{' '}
              <span className="text-gradient-brand">58% off</span>
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Fixed presale price of $0.00834 per token. Early supporters get bonus tokens!
            </p>
          </div>

          {/* Main card */}
          <div className="bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              {/* Left: Current tier info */}
              <div className="p-8 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/10">
                {/* Tier badge */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-4 py-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl">
                    <span className="text-white font-bold">{currentTier?.tier_name || 'Founders'} Tier</span>
                  </div>
                  {bonusPercentage > 0 && (
                    <div className="px-3 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-sm font-medium">
                      +{bonusPercentage}% bonus
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="text-gray-400 text-sm mb-1">Presale price</div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-5xl font-bold text-white">${PRESALE_PRICE.toFixed(5)}</span>
                    <span className="text-gray-500 line-through text-lg">$0.02</span>
                  </div>
                  <div className="text-emerald-400 text-sm mt-1">{presaleDiscount}% off launch price</div>
                </div>

                {/* Presale info */}
                <div className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-gray-500 mb-1">Hard cap</div>
                      <div className="text-white font-bold">${(HARD_CAP / 1000).toFixed(0)}k</div>
                    </div>
                    <div>
                      <div className="text-gray-500 mb-1">Tokens available</div>
                      <div className="text-white font-bold">{(TOKENS_FOR_SALE / 1000000).toFixed(0)}M BLAZE</div>
                    </div>
                  </div>
                </div>

                {/* Bonus highlight */}
                {bonusPercentage > 0 && (
                  <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                    <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                      <Gift className="w-5 h-5 text-yellow-400" />
                    </div>
                    <div>
                      <div className="text-white font-medium">+{bonusPercentage}% bonus tokens</div>
                      <div className="text-gray-400 text-sm">Early bird bonus for {currentTier?.tier_name || 'Founders'}</div>
                    </div>
                  </div>
                )}

                {/* Social proof */}
                <div className="flex items-center gap-4 mt-6 pt-6 border-t border-white/10">
                  <div className="flex -space-x-2">
                    {[...Array(4)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-orange-400 to-yellow-400 border-2 border-slate-900 flex items-center justify-center text-white text-xs font-bold"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <div className="text-gray-400 text-sm">
                    <span className="text-white font-medium">{waitlistCount.toLocaleString()}+</span> people waiting
                  </div>
                </div>
              </div>

              {/* Right: Quick calculator */}
              <div className="p-8 lg:p-10 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-white font-medium mb-6">
                  <Zap className="w-5 h-5 text-orange-400" />
                  Quick calculator
                </div>

                {/* Amount input */}
                <div className="mb-6">
                  <label className="text-gray-400 text-sm mb-2 block">Investment amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-lg">$</span>
                    <input
                      type="number"
                      value={inputAmount}
                      onChange={(e) => setInputAmount(Math.max(0, parseInt(e.target.value) || 0))}
                      className="w-full pl-10 pr-4 py-4 bg-white/10 border border-white/20 rounded-xl text-white text-2xl font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                  {/* Quick amounts */}
                  <div className="flex gap-2 mt-3">
                    {[50, 100, 250, 500, 1000].map((amount) => (
                      <button
                        key={amount}
                        onClick={() => setInputAmount(amount)}
                        className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
                          inputAmount === amount
                            ? 'bg-orange-500 text-white'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Result */}
                <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl p-6 border border-orange-500/20 mb-6">
                  <div className="text-gray-400 text-sm mb-2">You'll receive</div>
                  <div className="text-4xl font-bold text-white mb-1">
                    {Math.round(totalTokens).toLocaleString()}
                    <span className="text-orange-400 ml-2 text-lg font-medium">BLAZE</span>
                  </div>
                  <div className="flex items-center gap-2 text-emerald-400 text-sm">
                    <TrendingUp className="w-4 h-4" />
                    Including {Math.round(bonusTokens).toLocaleString()} bonus tokens
                  </div>
                </div>

                {/* CTA */}
                <Link
                  href="/presale"
                  className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg shadow-orange-500/30 group"
                >
                  Reserve my tokens
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>

                <p className="text-center text-gray-500 text-sm mt-4">
                  No payment required yet • Just register your intent
                </p>
              </div>
            </div>

            {/* Bottom bar - View all tiers */}
            <Link
              href="/presale"
              className="flex items-center justify-between px-8 py-4 bg-white/5 border-t border-white/10 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5, 6].map((tier) => (
                    <div
                      key={tier}
                      className={`w-2 h-6 rounded-full ${
                        tier === 1 ? 'bg-orange-500' : 'bg-white/20'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-400">
                  View all 6 pricing tiers & referral rewards
                </span>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all" />
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-10">
            {[
              { icon: Zap, text: 'Email confirmation' },
              { icon: Users, text: 'Non-custodial' },
              { icon: Clock, text: 'Priority access' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-400">
                <item.icon className="w-5 h-5 text-orange-400" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
