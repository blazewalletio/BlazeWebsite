'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TrendingUp, Users, Lock, Coins, Flame } from 'lucide-react';

const distributionData = [
  { name: 'Public Sale', value: 15, color: '#f97316' },
  { name: 'Liquidity', value: 10, color: '#dc2626' },
  { name: 'Founder Unlocked', value: 10, color: '#facc15' },
  { name: 'Founder Vesting', value: 15, color: '#fb923c' },
  { name: 'Community Rewards', value: 20, color: '#22c55e' },
  { name: 'Treasury', value: 15, color: '#3b82f6' },
  { name: 'Team (3yr)', value: 10, color: '#a855f7' },
  { name: 'Strategic (2yr)', value: 5, color: '#ec4899' },
];

const tokenFeatures = [
  {
    icon: Flame,
    title: 'Deflationary',
    description: '0.10% burn per transfer',
    value: 'Reduces supply',
  },
  {
    icon: TrendingUp,
    title: 'Staking rewards',
    description: 'Earn 8-20% APY',
    value: 'Passive income',
  },
  {
    icon: Users,
    title: 'Governance',
    description: '1 token = 1 vote',
    value: 'True DAO',
  },
  {
    icon: Coins,
    title: 'Fee discounts',
    description: 'Hold to save',
    value: 'Up to 75% off',
  },
];

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            BLAZE <span className="text-gradient">tokenomics</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Transparante en faire distributie. Designed voor long-term growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Pie chart */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-glass p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Token distributie</h3>
            <ResponsiveContainer width="100%" height={350}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}%`}
                  outerRadius={120}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'rgba(0,0,0,0.8)', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="card-glass p-6">
              <div className="text-gray-400 text-sm mb-1">Total supply</div>
              <div className="text-4xl font-bold text-gradient">1,000,000,000</div>
              <div className="text-gray-400 text-sm mt-1">1 billion BLAZE</div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="card-glass p-6">
                <div className="text-gray-400 text-sm mb-1">Presale prijs</div>
                <div className="text-2xl font-bold text-green-400">$0.00417</div>
              </div>
              <div className="card-glass p-6">
                <div className="text-gray-400 text-sm mb-1">Launch prijs</div>
                <div className="text-2xl font-bold text-orange-400">$0.01</div>
              </div>
            </div>

            <div className="card-glass p-6">
              <div className="text-gray-400 text-sm mb-1">Market cap bij launch (circulating)</div>
              <div className="text-3xl font-bold">$2.5M</div>
              <div className="text-gray-400 text-sm mt-1">250M tokens in circulatie</div>
            </div>

            <div className="card-glass p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Lock className="w-5 h-5 text-orange-400" />
                <div className="text-gray-400 text-sm">Liquidity locked</div>
              </div>
              <div className="text-2xl font-bold text-gradient">60% of raised funds</div>
              <div className="text-gray-400 text-sm mt-1">2 year lock via smart contract</div>
            </div>
          </motion.div>
        </div>

        {/* Token features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center">Token utility</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tokenFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="card-glass p-6 text-center hover:bg-white/10 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-blaze flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                <p className="text-gray-400 text-sm mb-2">{feature.description}</p>
                <p className="text-orange-400 font-bold text-sm">{feature.value}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Vesting schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16 card-glass p-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Vesting schedule</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div>
                <div className="font-bold">Founder vesting</div>
                <div className="text-sm text-gray-400">15% (150M tokens)</div>
              </div>
              <div className="text-right">
                <div className="text-orange-400 font-bold">Linear unlock</div>
                <div className="text-sm text-gray-400">Over 2 years</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div>
                <div className="font-bold">Team vesting</div>
                <div className="text-sm text-gray-400">10% (100M tokens)</div>
              </div>
              <div className="text-right">
                <div className="text-orange-400 font-bold">Linear unlock</div>
                <div className="text-sm text-gray-400">Over 3 years</div>
              </div>
            </div>
            <div className="flex items-center justify-between p-4 rounded-xl bg-white/5">
              <div>
                <div className="font-bold">Strategic vesting</div>
                <div className="text-sm text-gray-400">5% (50M tokens)</div>
              </div>
              <div className="text-right">
                <div className="text-orange-400 font-bold">Linear unlock</div>
                <div className="text-sm text-gray-400">Over 2 years</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


