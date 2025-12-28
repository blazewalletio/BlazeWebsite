'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Target, Zap, Calculator, Check, AlertCircle, Loader2, TrendingUp, Gift, Shield } from 'lucide-react';

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

export default function CommitmentForm() {
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState<number>(100);
  const [customAmount, setCustomAmount] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<CommitmentResult | null>(null);
  const [currentTier, setCurrentTier] = useState<PricingTier | null>(null);

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

  // Calculate estimated tokens
  const pricePerToken = currentTier?.price_usd || 0.0015;
  const bonusPercentage = currentTier?.bonus_percentage || 50;
  const effectiveAmount = isCustom ? parseFloat(customAmount) || 0 : amount;
  const baseTokens = effectiveAmount / pricePerToken;
  const bonusTokens = baseTokens * (bonusPercentage / 100);
  const totalTokens = baseTokens + bonusTokens;

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
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="commitment" className="py-20 lg:py-28 bg-gradient-to-b from-white to-orange-50">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium text-sm mb-6">
            <Target className="w-4 h-4" />
            Reserve your spot
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Lock in your{' '}
            <span className="text-gradient-brand">early bird price</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Register your purchase intent now. No payment required - just let us know how much you plan to invest
            and secure your tier pricing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Form */}
          <motion.div
            initial={{ x: -20 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
          >
            <AnimatePresence mode="wait">
              {success ? (
                <motion.div
                  key="success"
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
                  className="bg-white rounded-3xl p-8 shadow-xl border border-emerald-100"
                >
                  <div className="text-center">
                    <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Check className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Intent registered!</h3>
                    <p className="text-gray-600 mb-6">
                      We've recorded your purchase intent. You'll receive a confirmation email shortly.
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
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.95 }}
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
                    <div className="grid grid-cols-3 gap-2 mb-3">
                      {SUGGESTED_AMOUNTS.map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => {
                            setAmount(value);
                            setIsCustom(false);
                          }}
                          className={`py-3 rounded-xl font-medium transition-all ${
                            !isCustom && amount === value
                              ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/30'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          ${value.toLocaleString()}
                        </button>
                      ))}
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
                    <p className="text-xs text-gray-500 mt-2">Min $100 – Max $10,000</p>
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="mb-6 flex items-center gap-2 text-red-500 bg-red-50 px-4 py-3 rounded-xl">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm">{error}</span>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading || !email || effectiveAmount < 100 || effectiveAmount > 10000}
                    className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg shadow-orange-500/30 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Target className="w-5 h-5" />
                        Register my intent
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    This is not a payment. You're only registering your interest.
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Calculator & Benefits */}
          <motion.div
            initial={{ x: 20 }}
            whileInView={{ x: 0 }}
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
                  <span className="font-medium">${pricePerToken.toFixed(4)}</span>
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
              <h3 className="font-bold text-gray-900 mb-4">Why register your intent?</h3>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Lock in your tier</div>
                    <div className="text-sm text-gray-600">Secure today's price even if tiers sell out</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Zap className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Priority access</div>
                    <div className="text-sm text-gray-600">Be first in line when presale opens</div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Gift className="w-4 h-4 text-purple-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">Bonus reminders</div>
                    <div className="text-sm text-gray-600">We'll remind you before the presale starts</div>
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

