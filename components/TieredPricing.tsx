'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, Clock, TrendingUp, Check, AlertCircle, Loader2 } from 'lucide-react';

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
}

interface PricingData {
  currentTier: PricingTier & {
    spotsRemaining: number;
    discountPercentage: number;
  } | null;
  allTiers: PricingTier[];
  totalBuyers: number;
}

export default function TieredPricing() {
  const [pricingData, setPricingData] = useState<PricingData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPricing() {
      try {
        const res = await fetch('/api/pricing');
        if (!res.ok) throw new Error('Failed to fetch pricing');
        const data = await res.json();
        setPricingData(data);
      } catch (err) {
        setError('Could not load pricing information');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPricing();
  }, []);

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-800">
        <div className="container-main">
          <div className="flex justify-center items-center h-64">
            <Loader2 className="w-8 h-8 animate-spin text-orange-500" />
          </div>
        </div>
      </section>
    );
  }

  if (error || !pricingData) {
    return null;
  }

  const { currentTier, allTiers, totalBuyers } = pricingData;
  const launchPrice = 0.02;

  return (
    <section id="pricing" className="py-20 lg:py-28 bg-gradient-to-b from-slate-900 to-slate-800 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
      </div>

      <div className="container-main relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/20 text-orange-400 font-medium text-sm mb-6 border border-orange-500/30">
            <TrendingUp className="w-4 h-4" />
            Early bird pricing
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            The earlier you join,{' '}
            <span className="text-gradient-brand">the more you save</span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Our tiered pricing rewards early supporters with up to 70% discount on the public price.
            Each tier has limited spots.
          </p>
        </motion.div>

        {/* Current Tier Highlight */}
        {currentTier && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-xl mx-auto mb-12"
          >
            <div className="relative bg-gradient-to-br from-orange-500/20 to-yellow-500/20 rounded-3xl p-1">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full text-white text-sm font-bold">
                Current tier
              </div>
              <div className="bg-slate-900/90 rounded-3xl p-8 backdrop-blur-xl">
                <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-3 justify-center md:justify-start mb-2">
                      <h3 className="text-2xl font-bold text-white">{currentTier.tier_name}</h3>
                      <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 rounded-full text-sm font-medium">
                        {currentTier.discountPercentage}% off
                      </span>
                    </div>
                    <p className="text-gray-400">
                      Buyers {currentTier.min_buyers} - {currentTier.max_buyers}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-white mb-1">
                      ${currentTier.price_usd.toFixed(4)}
                    </div>
                    <div className="text-gray-400 text-sm line-through">
                      ${launchPrice.toFixed(2)} launch price
                    </div>
                  </div>
                  <div className="text-center bg-slate-800/50 rounded-2xl px-6 py-4">
                    <div className="flex items-center gap-2 text-orange-400 mb-1">
                      <Clock className="w-4 h-4" />
                      <span className="font-bold text-2xl">{currentTier.spotsRemaining}</span>
                    </div>
                    <div className="text-gray-400 text-sm">spots left</div>
                  </div>
                </div>
                {currentTier.bonus_percentage > 0 && (
                  <div className="mt-6 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500/10 to-yellow-500/10 rounded-xl border border-orange-500/20">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <span className="text-white font-medium">
                      +{currentTier.bonus_percentage}% bonus tokens for {currentTier.tier_name} tier!
                    </span>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* All Tiers Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"
        >
          {allTiers?.map((tier, index) => (
            <motion.div
              key={tier.tier_number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-2xl p-4 transition-all ${
                tier.isCurrent
                  ? 'bg-gradient-to-br from-orange-500/30 to-yellow-500/30 border-2 border-orange-500'
                  : tier.isPast
                  ? 'bg-slate-800/30 border border-slate-700/50 opacity-60'
                  : 'bg-slate-800/50 border border-slate-700 hover:border-orange-500/50'
              }`}
            >
              {tier.isPast && (
                <div className="absolute inset-0 flex items-center justify-center bg-slate-900/80 rounded-2xl z-10">
                  <div className="flex items-center gap-2 text-emerald-400 font-medium">
                    <Check className="w-5 h-5" />
                    <span>Sold out</span>
                  </div>
                </div>
              )}
              <div className="text-center">
                <div className="text-xs text-gray-500 mb-1">
                  {tier.min_buyers}-{tier.max_buyers} buyers
                </div>
                <div className="font-bold text-white mb-2">{tier.tier_name}</div>
                <div className="text-xl font-bold text-orange-400 mb-1">
                  ${tier.price_usd.toFixed(4)}
                </div>
                {tier.bonus_percentage > 0 && (
                  <div className="text-xs text-yellow-400">
                    +{tier.bonus_percentage}% bonus
                  </div>
                )}
                {tier.isCurrent && tier.spotsRemaining !== undefined && (
                  <div className="mt-2 text-xs text-orange-400 font-medium">
                    {tier.spotsRemaining} spots left
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-12 max-w-3xl mx-auto"
        >
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>{totalBuyers} buyers</span>
            <span>2,000+ public</span>
          </div>
          <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${Math.min((totalBuyers / 2000) * 100, 100)}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full relative"
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full shadow-lg" />
            </motion.div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            {allTiers?.slice(0, 5).map((tier) => (
              <span key={tier.tier_number} className={tier.isCurrent ? 'text-orange-400 font-medium' : ''}>
                {tier.max_buyers}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center mt-12"
        >
          <a
            href="#commitment"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold text-lg hover:from-orange-600 hover:to-yellow-600 transition-all shadow-lg shadow-orange-500/30"
          >
            Lock in your price now
            <Zap className="w-5 h-5" />
          </a>
          <p className="text-gray-400 text-sm mt-4">
            No payment required - just register your interest to secure your tier
          </p>
        </motion.div>
      </div>
    </section>
  );
}

