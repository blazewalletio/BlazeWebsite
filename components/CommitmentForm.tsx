'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap, Calculator, Check, AlertCircle, Loader2, TrendingUp, Gift, Shield, Wallet, ArrowRight } from 'lucide-react';
import { BONUS_TIERS, PRESALE_CONSTANTS } from '@/lib/presale-constants';
import { trackPresaleIntentRegistered } from '@/lib/analytics/client';
import { useSearchParams } from 'next/navigation';

interface PricingTier {
  tier_number: number;
  tier_name: string;
  price_usd: number;
  bonus_percentage: number;
}

interface CommitmentResult {
  email: string;
  amountUsd: number;
  estimatedTokens: number;
  baseTokens: number;
  bonusTokens: number;
  bonusPercentage: number;
  tierName: string;
  pricePerToken: number;
}

const SUGGESTED_AMOUNTS = [100, 250, 500, 1000, 2500, 5000];
const POPULAR_AMOUNT = 500;

export default function CommitmentForm() {
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState<number>(POPULAR_AMOUNT);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<CommitmentResult | null>(null);
  const [currentTier, setCurrentTier] = useState<PricingTier | null>(null);
  const [presaleTimestamp, setPresaleTimestamp] = useState<number>(new Date('2026-02-01T12:00:00Z').getTime());
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0 });

  // Fetch current pricing tier
  useEffect(() => {
    async function fetchTier() {
      try {
        const res = await fetch('/api/pricing');
        const data = await res.json();
        if (data.currentTier) {
          setCurrentTier(data.currentTier);
        }
      } catch (err) {
        console.error('Failed to fetch pricing:', err);
      }
    }
    fetchTier();
  }, []);

  // Keep countdown synced with admin-configured presale date
  useEffect(() => {
    async function fetchPresaleDate() {
      try {
        const res = await fetch('/api/settings');
        const data = await res.json();
        if (res.ok && data.presale_date) {
          setPresaleTimestamp(new Date(data.presale_date).getTime());
        }
      } catch (err) {
        console.error('Failed to fetch presale date:', err);
      }
    }
    fetchPresaleDate();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      const diff = Math.max(0, presaleTimestamp - now);
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [presaleTimestamp]);

  // Optional prefill via query param, e.g. /presale?intent=500#commitment
  useEffect(() => {
    const raw = searchParams.get('intent');
    if (!raw) return;
    const parsed = Number(raw);
    if (!Number.isFinite(parsed)) return;
    if (parsed < PRESALE_CONSTANTS.minContribution || parsed > PRESALE_CONSTANTS.maxContribution) return;
    setAmount(parsed);
    setIsCustom(false);
    setCustomAmount('');
  }, [searchParams]);

  // Calculate estimated tokens
  const pricePerToken = currentTier?.price_usd || PRESALE_CONSTANTS.presalePrice;
  const bonusPercentage = currentTier?.bonus_percentage ?? BONUS_TIERS[0].bonus_percentage;
  const effectiveAmount = isCustom ? parseFloat(customAmount) || 0 : amount;
  const baseTokens = effectiveAmount / pricePerToken;
  const bonusTokens = baseTokens * (bonusPercentage / 100);
  const totalTokens = baseTokens + bonusTokens;
  const estimateTokensForAmount = (usd: number) =>
    Math.round((usd / pricePerToken) * (1 + bonusPercentage / 100));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const finalAmount = isCustom ? parseFloat(customAmount) : amount;
    if (!finalAmount || finalAmount < 100) {
      setError('Minimum investment is $100');
      setLoading(false);
      return;
    }
    if (finalAmount > 10000) {
      setError('Maximum investment is $10,000 per wallet');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/commitment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          intendedAmountUsd: finalAmount,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to register commitment');
      }

      setSuccess(data.commitment);
      trackPresaleIntentRegistered({
        amountUsd: finalAmount,
        tierName: data.commitment?.tierName || currentTier?.tier_name || 'Unknown',
        bonusPercentage: data.commitment?.bonusPercentage || bonusPercentage,
      });
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const walletUrl = 'https://my.blazewallet.io';

  return (
    <section id="commitment" className="py-20 lg:py-28 bg-gradient-to-b from-white to-orange-50">
      <div className="container-main">
        {/* Presale live – buy in wallet CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12 rounded-2xl border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-white p-6 sm:p-8"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-medium text-sm mb-3">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Presale is live
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Buy BLAZE tokens in the wallet</h3>
              <p className="text-gray-600 mb-4 max-w-xl">
                Create an account at my.blazewallet.io, add funds (ETH, BTC, USDT or BSC), then open the presale card in the app to buy. Open for everyone from 18 March 2026, 12:00 UTC.
              </p>
              <a
                href={walletUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg shadow-orange-500/25"
              >
                <Wallet className="w-5 h-5" />
                Open BLAZE Wallet and buy
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </motion.div>

        {/* Primary: Buy in wallet */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Do your presale purchase in{' '}
            <span className="text-gradient-brand">BLAZE Wallet</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Go to my.blazewallet.io, add funds, and buy $BLAZE in the presale card. Min $100, max $10,000 per wallet.
          </p>
          <a
            href={walletUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold text-lg shadow-lg shadow-orange-500/30 hover:from-orange-600 hover:to-yellow-600 transition-all"
          >
            <Wallet className="w-6 h-6" />
            Open BLAZE Wallet and buy
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left: Steps + optional intent form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">3 steps to buy</h3>
              <ol className="space-y-3 text-gray-700">
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center flex-shrink-0">1</span>
                  Create your account at <a href={walletUrl} target="_blank" rel="noopener noreferrer" className="text-orange-600 font-medium hover:underline">my.blazewallet.io</a>
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center flex-shrink-0">2</span>
                  Add funds (ETH, BTC, USDT or BSC) to your wallet
                </li>
                <li className="flex items-start gap-3">
                  <span className="w-7 h-7 rounded-full bg-orange-100 text-orange-600 font-bold text-sm flex items-center justify-center flex-shrink-0">3</span>
                  Open the presale card in the app and complete your purchase
                </li>
              </ol>
              <a
                href={walletUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold hover:from-orange-600 hover:to-yellow-600 transition-all"
              >
                Open BLAZE Wallet and buy
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>

            {/* Optional: register intent (collapsible) */}
            <details className="bg-white rounded-2xl border border-gray-200 shadow-soft overflow-hidden">
              <summary className="px-6 py-4 cursor-pointer text-gray-700 font-medium hover:bg-gray-50 flex items-center gap-2">
                <Target className="w-4 h-4 text-orange-500" />
                Optional: register your intent for email reminders
              </summary>
              <div className="px-6 pb-6 pt-2 border-t border-gray-100">
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-100"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Intent registered!</h3>
                    <p className="text-gray-600 mb-6">
                      We've recorded your purchase intent. You'll receive a confirmation email shortly, including details for your 48-hour early-access window.
                    </p>
                    <p className="text-sm text-gray-600 mb-6">
                      Want updates and announcements in real time?{' '}
                      <a
                        href="https://t.me/ai4ldMZv0KgyN2Y8"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-orange-600 hover:text-orange-700 font-semibold hover:underline"
                      >
                        Join our Telegram community
                      </a>
                      .
                    </p>

                    <div className="bg-gradient-to-br from-orange-50 to-yellow-50 rounded-2xl p-6 text-left mb-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Your investment</div>
                          <div className="text-2xl font-bold text-gray-900">${success.amountUsd.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Est. tokens</div>
                          <div className="text-2xl font-bold text-orange-500">{success.estimatedTokens.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Tier</div>
                          <div className="font-bold text-gray-900">{success.tierName}</div>
                        </div>
                        <div>
                          <div className="text-sm text-gray-500 mb-1">Bonus</div>
                          <div className="font-bold text-emerald-500">+{success.bonusPercentage}%</div>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => setSuccess(null)}
                      className="text-orange-500 hover:text-orange-600 font-medium"
                    >
                      Register another commitment
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  onSubmit={handleSubmit}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100"
                >
                  {/* Email */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Your email
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      placeholder="you@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900"
                    />
                  </div>

                  {/* Amount Selection */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How much do you plan to invest?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                      {SUGGESTED_AMOUNTS.map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            setAmount(value);
                            setIsCustom(false);
                          }}
                          className={`relative py-2.5 rounded-xl transition-all text-left px-3 ${
                            !isCustom && amount === value
                              ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/30'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {value === POPULAR_AMOUNT && (
                            <span
                              className={`absolute top-1.5 right-1.5 z-10 text-[10px] px-2 py-0.5 rounded-full font-semibold shadow-sm ${
                                !isCustom && amount === value
                                  ? 'bg-white text-orange-700 border border-white'
                                  : 'bg-orange-600 text-white border border-orange-600'
                              }`}
                            >
                              Popular
                            </span>
                          )}
                          <div className="font-semibold">${value.toLocaleString()}</div>
                        </button>
                      ))}
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      Estimated allocation at this amount: ~{estimateTokensForAmount(effectiveAmount || amount).toLocaleString()} tokens incl. bonus.
                    </div>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
                      <input
                        type="number"
                        value={customAmount}
                        onChange={(e) => {
                          setCustomAmount(e.target.value);
                          setIsCustom(true);
                        }}
                        onFocus={() => setIsCustom(true)}
                        placeholder="Custom amount"
                        min="100"
                        max="10000"
                        className={`w-full pl-8 pr-4 py-3 rounded-xl border transition-all focus:outline-none focus:ring-2 focus:ring-orange-500 text-gray-900 ${
                          isCustom ? 'border-orange-500 ring-2 ring-orange-500' : 'border-gray-200'
                        }`}
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Popular with early supporters: $500. You can choose any amount from $100 to $10,000.
                    </p>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="mb-6 flex items-center gap-2 text-red-500 bg-red-50 px-4 py-3 rounded-xl">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  <p className="text-xs text-gray-500 mb-4">
                    We&apos;ll send a confirmation and reminders. You still buy in the wallet at my.blazewallet.io.
                  </p>

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading || !email || effectiveAmount < 100 || effectiveAmount > 10000}
                    className="w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-gray-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Target className="w-4 h-4" />
                        Register for reminders
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-3">
                    Not a payment. One intent per email. Confirmation sent automatically.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
              </div>
            </details>
          </motion.div>

          {/* Calculator & Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            {/* Live Calculator */}
            <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-orange-500/20 rounded-xl flex items-center justify-center">
                  <Calculator className="w-5 h-5 text-orange-400" />
                </div>
                <h3 className="text-xl font-bold">Token calculator</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400">Your investment</span>
                  <span className="text-2xl font-bold">${effectiveAmount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400">Price per token</span>
                  <span className="font-medium">${pricePerToken.toFixed(6)}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-gray-400">Base tokens</span>
                  <span className="font-medium">{Math.round(baseTokens).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-white/10">
                  <span className="text-emerald-400 flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    Bonus ({bonusPercentage}%)
                  </span>
                  <span className="font-medium text-emerald-400">+{Math.round(bonusTokens).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center py-4 bg-orange-500/20 rounded-xl px-4 -mx-4">
                  <span className="font-bold text-lg">Total tokens</span>
                  <span className="text-3xl font-bold text-orange-400">{Math.round(totalTokens).toLocaleString()}</span>
                </div>
              </div>

              {currentTier && (
                <div className="mt-6 flex items-center gap-2 text-sm text-gray-400">
                  <TrendingUp className="w-4 h-4" />
                  <span>Current tier: {currentTier.tier_name}</span>
                </div>
              )}
            </div>

            {/* Benefits */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-soft">
              <h3 className="font-bold text-gray-900 mb-4">Why buy in the wallet?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Presale price</div>
                    <div className="text-sm text-gray-600">Buy at 58% off the launch price. Bonus tiers for early buyers.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Simple flow</div>
                    <div className="text-sm text-gray-600">Account → add funds → open presale card and buy. Min $100, max $10,000.</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gift className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Pay with ETH, BTC, USDT or BSC</div>
                    <div className="text-sm text-gray-600">Add funds to your BLAZE Wallet, then buy in the presale card.</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

