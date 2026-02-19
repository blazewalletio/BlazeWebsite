'use client';

import { useState, useEffect } from 'react';
import { Zap, Users, TrendingUp, ArrowRight, Clock, Gift, Loader2, CheckCircle2, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { useAnimateOnce } from '@/hooks/useAnimateOnce';
import { PRESALE_CONSTANTS } from '@/lib/presale-constants';
import { trackPresaleIntentRegistered } from '@/lib/analytics/client';

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
  const [inputAmount, setInputAmount] = useState(250);
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMobileDetails, setShowMobileDetails] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<{
    tierName: string;
    estimatedTokens: number;
    amountUsd: number;
  } | null>(null);
  const [sectionRef, isVisible] = useAnimateOnce<HTMLElement>();

  useEffect(() => {
    async function fetchData() {
      try {
        const pricingRes = await fetch('/api/pricing');
        const pricingData = await pricingRes.json();
        if (pricingData.currentTier) {
          setCurrentTier(pricingData.currentTier);
        }

        const waitlistRes = await fetch('/api/waitlist');
        const waitlistData = await waitlistRes.json();
        setWaitlistCount(waitlistData.count || 0);
      } catch (err) {
        console.error('Error fetching presale data:', err);
      }
    }
    fetchData();
  }, []);

  const PRESALE_PRICE = PRESALE_CONSTANTS.presalePrice;
  const LAUNCH_PRICE = PRESALE_CONSTANTS.launchPrice;
  const bonusPercentage = currentTier?.bonus_percentage || 100;
  const baseTokens = inputAmount / PRESALE_PRICE;
  const bonusTokens = baseTokens * (bonusPercentage / 100);
  const totalTokens = baseTokens + bonusTokens;
  const presaleDiscount = Math.round((1 - PRESALE_PRICE / LAUNCH_PRICE) * 100);

  const HARD_CAP = PRESALE_CONSTANTS.hardCap;
  const TOKENS_FOR_SALE = PRESALE_CONSTANTS.presaleAllocation;
  const hardCapLabel =
    HARD_CAP >= 1_000_000
      ? `$${(HARD_CAP / 1_000_000).toFixed(1)}M`
      : `$${(HARD_CAP / 1_000).toFixed(0)}k`;

  async function handleInlineIntentSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    setSubmitSuccess(null);

    if (!email.trim()) {
      setSubmitError('Email is required.');
      return;
    }
    if (inputAmount < 100) {
      setSubmitError('Minimum investment is $100.');
      return;
    }
    if (inputAmount > 10000) {
      setSubmitError('Maximum investment is $10,000 per wallet.');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await fetch('/api/commitment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          intendedAmountUsd: inputAmount,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data?.error || 'Failed to register your intent.');
      }

      const estimatedTokens = data?.commitment?.estimatedTokens || Math.round(totalTokens);
      const tierName = data?.commitment?.tierName || currentTier?.tier_name || 'Founders';
      setSubmitSuccess({
        tierName,
        estimatedTokens,
        amountUsd: inputAmount,
      });

      trackPresaleIntentRegistered({
        amountUsd: inputAmount,
        tierName,
        bonusPercentage,
      });
    } catch (error: any) {
      setSubmitError(error?.message || 'Failed to register your intent.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section ref={sectionRef} className="py-14 sm:py-16 lg:py-24 relative overflow-hidden">
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
          <div className={`text-center mb-7 sm:mb-9 lg:mb-12 animate-entrance ${isVisible ? 'is-visible' : ''}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 text-orange-300 font-medium text-xs sm:text-sm mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </span>
              Early bird presale access
            </div>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Get BLAZE tokens at{' '}
              <span className="text-gradient-brand">58% off</span>
            </h2>
            <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto">
              Register your intent directly here. No payment required.
            </p>
          </div>

          <div className={`bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden animate-entrance delay-1 ${isVisible ? 'is-visible' : ''}`}>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-5 sm:p-7 lg:p-10 border-b lg:border-b-0 lg:border-r border-white/10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="px-3 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl">
                    <span className="text-white font-bold text-sm sm:text-base">{currentTier?.tier_name || 'Founders'} Tier</span>
                  </div>
                  {bonusPercentage > 0 && (
                    <div className="px-2.5 py-1 bg-yellow-500/20 text-yellow-400 rounded-lg text-xs sm:text-sm font-medium">
                      +{bonusPercentage}% bonus
                    </div>
                  )}
                </div>

                <div className="mb-5 sm:mb-6">
                  <div className="text-gray-400 text-xs sm:text-sm mb-1">Presale price</div>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl sm:text-5xl font-bold text-white">${PRESALE_PRICE.toFixed(6)}</span>
                    <span className="text-gray-500 line-through text-sm sm:text-lg">$0.02</span>
                  </div>
                  <div className="text-emerald-400 text-xs sm:text-sm mt-1">{presaleDiscount}% off launch price</div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="text-gray-400 text-sm">
                    <span className="text-white font-medium">{waitlistCount.toLocaleString()}+</span> people waiting
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setShowMobileDetails((prev) => !prev)}
                  className="sm:hidden mb-3 inline-flex items-center gap-2 text-sm text-gray-300 hover:text-white transition-colors"
                >
                  {showMobileDetails ? 'Hide details' : 'Show details'}
                  {showMobileDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                <div className={`${showMobileDetails ? 'block' : 'hidden'} sm:block`}>
                  <div className="mb-5 sm:mb-6 p-4 bg-white/5 rounded-xl border border-white/10">
                    <div className="grid grid-cols-2 gap-4 text-xs sm:text-sm">
                      <div>
                        <div className="text-gray-500 mb-1">Hard cap</div>
                        <div className="text-white font-bold">{hardCapLabel}</div>
                      </div>
                      <div>
                        <div className="text-gray-500 mb-1">Tokens available</div>
                        <div className="text-white font-bold">{(TOKENS_FOR_SALE / 1000000).toFixed(0)}M BLAZE</div>
                      </div>
                    </div>
                  </div>

                  {bonusPercentage > 0 && (
                    <div className="hidden sm:flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-xl border border-yellow-500/20">
                      <div className="w-10 h-10 bg-yellow-500/20 rounded-xl flex items-center justify-center">
                        <Gift className="w-5 h-5 text-yellow-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium">+{bonusPercentage}% bonus tokens</div>
                        <div className="text-gray-400 text-sm">Early bird bonus for {currentTier?.tier_name || 'Founders'}</div>
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-4 mt-5 pt-5 sm:mt-6 sm:pt-6 border-t border-white/10">
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
                      Community verified presale demand
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 sm:p-7 lg:p-10 bg-white/[0.02]">
                <div className="flex items-center gap-2 text-white font-medium mb-4 sm:mb-6">
                  <Zap className="w-5 h-5 text-orange-400" />
                  Register your intent
                </div>

                <form onSubmit={handleInlineIntentSubmit}>
                  <div className="mb-4">
                    <label className="text-gray-400 text-sm mb-2 block">Email address</label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      required
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  <div className="mb-4">
                    <label className="text-gray-400 text-sm mb-2 block">Investment amount</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium text-base">$</span>
                      <input
                        type="number"
                        value={inputAmount}
                        onChange={(e) => setInputAmount(Math.max(0, parseInt(e.target.value, 10) || 0))}
                        min={100}
                        max={10000}
                        className="w-full pl-9 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-xl font-bold focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {[100, 250, 500, 1000, 2500].map((amount) => (
                      <button
                        key={amount}
                        type="button"
                        onClick={() => setInputAmount(amount)}
                        className={`py-2 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                          inputAmount === amount
                            ? 'bg-orange-500 text-white'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        ${amount}
                      </button>
                    ))}
                  </div>

                  <div className="bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-xl p-4 sm:p-6 border border-orange-500/20 mb-4">
                    <div className="text-gray-400 text-xs sm:text-sm mb-2">Estimated tokens</div>
                    <div className="text-3xl sm:text-4xl font-bold text-white mb-1">
                      {Math.round(totalTokens).toLocaleString()}
                      <span className="text-orange-400 ml-2 text-sm sm:text-lg font-medium">BLAZE</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-400 text-xs sm:text-sm">
                      <TrendingUp className="w-4 h-4" />
                      Includes {Math.round(bonusTokens).toLocaleString()} bonus tokens
                    </div>
                  </div>

                  {submitError && (
                    <div className="mb-4 flex items-center gap-2 text-red-300 bg-red-500/10 border border-red-500/30 px-3 py-2 rounded-xl text-sm">
                      <AlertCircle className="w-4 h-4 flex-shrink-0" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  {submitSuccess && (
                    <div className="mb-4 flex items-center gap-2 text-emerald-300 bg-emerald-500/10 border border-emerald-500/30 px-3 py-2 rounded-xl text-sm">
                      <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                      <span>
                        Intent registered: ${submitSuccess.amountUsd.toLocaleString()} ({submitSuccess.tierName} tier).{' '}
                        <a
                          href="https://t.me/ai4ldMZv0KgyN2Y8"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-orange-200 hover:text-white font-semibold underline underline-offset-2"
                        >
                          Join Telegram
                        </a>
                        .
                      </span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting || !email.trim() || inputAmount < 100 || inputAmount > 10000}
                    className="w-full flex items-center justify-center gap-2 py-3 sm:py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold text-base sm:text-lg hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        Register my intent
                        <ArrowRight className="w-5 h-5" />
                      </>
                    )}
                  </button>

                  <p className="text-center text-gray-500 text-xs sm:text-sm mt-3">
                    No payment required. One intent per email.
                  </p>
                </form>

                <div className="mt-4 sm:mt-5 text-center">
                  <Link
                    href="/presale"
                    className="text-sm text-gray-400 hover:text-white transition-colors inline-flex items-center gap-1"
                  >
                    Open full presale page
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className={`flex flex-wrap justify-center gap-5 sm:gap-8 mt-7 sm:mt-10 animate-entrance delay-2 ${isVisible ? 'is-visible' : ''}`}>
            {[
              { icon: Zap, text: 'Email confirmation' },
              { icon: Users, text: 'Non-custodial' },
              { icon: Clock, text: 'Priority access' },
            ].map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-400 text-sm">
                <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-orange-400" />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
