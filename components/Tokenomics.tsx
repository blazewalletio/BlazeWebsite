'use client';

import { motion } from 'framer-motion';
import { Coins, TrendingUp, Users, Flame, Lock, ArrowRight, Sparkles } from 'lucide-react';

const tokenInfo = [
  { label: 'Total supply', value: '1B', description: '1 billion BLAZE' },
  { label: 'Presale price', value: '$0.00417', description: 'Early bird price' },
  { label: 'Launch price', value: '$0.01', description: 'Public launch' },
];

const distribution = [
  { name: 'Community rewards', percentage: 20, color: 'bg-emerald-500' },
  { name: 'Public sale', percentage: 15, color: 'bg-orange-500' },
  { name: 'Treasury', percentage: 15, color: 'bg-sky-500' },
  { name: 'Founder vesting', percentage: 15, color: 'bg-purple-500' },
  { name: 'Liquidity', percentage: 10, color: 'bg-red-500' },
  { name: 'Team (3yr)', percentage: 10, color: 'bg-pink-500' },
  { name: 'Other', percentage: 15, color: 'bg-gray-400' },
];

const utilities = [
  { icon: Flame, title: 'Deflationary', description: '0.1% burn per transfer' },
  { icon: TrendingUp, title: 'Staking', description: '8-20% APY (Q1 2026)' },
  { icon: Users, title: 'Governance', description: '1 token = 1 vote (Q2 2026)' },
  { icon: Lock, title: 'Fee discounts', description: 'Up to 75% off' },
];

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="py-20 lg:py-28 bg-gray-50">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-100 text-purple-700 font-medium text-sm mb-6">
            <Coins className="w-4 h-4" />
            Token economy
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            BLAZE <span className="text-gradient-brand">tokenomics</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transparent and fair distribution. Designed for long-term growth.
          </p>
        </motion.div>

        {/* Key stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {tokenInfo.map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6 text-center"
            >
              <div className="text-sm text-gray-500 mb-1">{item.label}</div>
              <div className="text-3xl md:text-4xl font-bold text-gradient-brand mb-1">{item.value}</div>
              <div className="text-sm text-gray-600">{item.description}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Distribution */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Token distribution</h3>
            <div className="space-y-4">
              {distribution.map((item) => (
                <div key={item.name}>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-700 font-medium">{item.name}</span>
                    <span className="font-bold text-gray-900">{item.percentage}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.percentage}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.5 }}
                      className={`h-full ${item.color} rounded-full`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Utilities */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="card p-6 md:p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">Token utility</h3>
            <div className="grid grid-cols-2 gap-4">
              {utilities.map((item, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-xl">
                  <div className="icon-box-sm bg-gray-200 mb-3">
                    <item.icon className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">{item.title}</div>
                  <div className="text-sm text-gray-600">{item.description}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Liquidity lock notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card p-6 md:p-8 bg-orange-50 border-orange-200"
        >
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Lock className="w-8 h-8 text-orange-600" />
            </div>
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-xl font-bold text-gray-900 mb-1">Liquidity locked</h3>
              <p className="text-gray-600">
                60% of raised funds locked for 2 years via smart contract for maximum security and trust.
              </p>
            </div>
            <a
              href="/whitepaper"
              className="btn-primary flex items-center gap-2 whitespace-nowrap"
            >
              Learn more
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
