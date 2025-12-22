'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TrendingUp, Users, Lock, Coins, Flame, Award, Crown, Star, Sparkles } from 'lucide-react';

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
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
            BLAZE <span className="text-gradient">tokenomics</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Transparent and fair distribution. Designed for long-term growth.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Pie chart */}
          <motion.div
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="card-glass p-8"
          >
            <h3 className="text-2xl font-bold mb-6 text-center">Token Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
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
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="card-glass p-4 sm:p-6">
              <div className="text-gray-400 text-xs sm:text-sm mb-1">Total supply</div>
              <div className="text-3xl sm:text-4xl font-bold text-gradient">1,000,000,000</div>
              <div className="text-gray-400 text-xs sm:text-sm mt-1">1 billion BLAZE</div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="card-glass p-4 sm:p-6">
                <div className="text-gray-400 text-xs sm:text-sm mb-1">Presale price</div>
                <div className="text-xl sm:text-2xl font-bold text-green-400">$0.00417</div>
              </div>
              <div className="card-glass p-4 sm:p-6">
                <div className="text-gray-400 text-xs sm:text-sm mb-1">Launch price</div>
                <div className="text-xl sm:text-2xl font-bold text-orange-400">$0.01</div>
              </div>
            </div>

            <div className="card-glass p-4 sm:p-6">
              <div className="text-gray-400 text-xs sm:text-sm mb-1">Market cap at launch (circulating)</div>
              <div className="text-2xl sm:text-3xl font-bold">$2.5M</div>
              <div className="text-gray-400 text-xs sm:text-sm mt-1">250M tokens in circulation</div>
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
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <h3 className="text-3xl font-bold mb-8 text-center">Token utility</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tokenFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
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
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-16 card-glass p-8"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Vesting schedule</h3>
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-bold">Founder vesting</div>
                  <div className="text-sm text-gray-400">15% (150M tokens)</div>
                </div>
                <div className="text-right">
                  <div className="text-orange-400 font-bold">6-month cliff</div>
                  <div className="text-sm text-gray-400">Linear over 4 years</div>
                </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: '25%' }}
                  aria-label="25% vested"
                />
              </div>
              <div className="text-xs text-gray-500">Estimated progress: ~25% after 6 months</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-bold">Team vesting</div>
                  <div className="text-sm text-gray-400">10% (100M tokens)</div>
                </div>
                <div className="text-right">
                  <div className="text-orange-400 font-bold">Linear unlock</div>
                  <div className="text-sm text-gray-400">Over 3 years</div>
                </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: '33%' }}
                  aria-label="33% vested"
                />
              </div>
              <div className="text-xs text-gray-500">Estimated progress: ~33% after 1 year</div>
            </div>
            <div className="p-4 rounded-xl bg-white/5">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <div className="font-bold">Strategic vesting</div>
                  <div className="text-sm text-gray-400">5% (50M tokens)</div>
                </div>
                <div className="text-right">
                  <div className="text-orange-400 font-bold">Linear unlock</div>
                  <div className="text-sm text-gray-400">Over 2 years</div>
                </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2 mb-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: '50%' }}
                  aria-label="50% vested"
                />
              </div>
              <div className="text-xs text-gray-500">Estimated progress: ~50% after 1 year</div>
            </div>
          </div>
          
          {/* Fee Discount Tiers */}
          <div className="mt-12 card-glass p-4 sm:p-6 lg:p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
            <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-6 text-center">Fee Discount Tiers</h3>
            <p className="text-center text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base px-2">Stake more BLAZE for higher fee discounts on all transactions</p>
            
            {/* Mobile: Single column, Desktop: Grid */}
            <div className="space-y-4 sm:space-y-0 sm:grid sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
              {/* Tier 1: 10% */}
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 p-5 sm:p-6 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-bold text-gradient">10%</div>
                    <div className="text-xs text-gray-400">Discount</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-white font-bold text-base sm:text-lg">1,000 - 9,999</div>
                  <div className="text-xs sm:text-sm text-gray-400">BLAZE staked</div>
                </div>
              </div>

              {/* Tier 2: 25% - Premium */}
              <div className="bg-gradient-to-br from-blue-500/20 to-cyan-500/20 p-5 sm:p-6 rounded-2xl border-2 border-blue-500/40 hover:border-blue-500/60 transition-all group relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <div className="px-2 py-1 rounded-full bg-blue-500/30 border border-blue-500/50">
                    <span className="text-[10px] font-bold text-blue-300">PREMIUM</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                    <Star className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-bold text-gradient">25%</div>
                    <div className="text-xs text-gray-400">Discount</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-white font-bold text-base sm:text-lg">10,000 - 49,999</div>
                  <div className="text-xs sm:text-sm text-gray-400">BLAZE staked</div>
                </div>
              </div>

              {/* Tier 3: 50% */}
              <div className="bg-gradient-to-br from-purple-500/20 to-pink-500/20 p-5 sm:p-6 rounded-2xl border-2 border-purple-500/40 hover:border-purple-500/60 transition-all group">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
                    <Award className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-bold text-gradient">50%</div>
                    <div className="text-xs text-gray-400">Discount</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-white font-bold text-base sm:text-lg">50,000 - 99,999</div>
                  <div className="text-xs sm:text-sm text-gray-400">BLAZE staked</div>
                </div>
              </div>

              {/* Tier 4: 75% - VIP */}
              <div className="bg-gradient-to-br from-orange-500/20 to-red-500/20 p-5 sm:p-6 rounded-2xl border-2 border-orange-500/40 hover:border-orange-500/60 transition-all group relative overflow-hidden">
                <div className="absolute top-2 right-2">
                  <div className="px-2 py-1 rounded-full bg-orange-500/30 border border-orange-500/50">
                    <span className="text-[10px] font-bold text-orange-300">VIP</span>
                  </div>
                </div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                    <Crown className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                  </div>
                  <div className="text-right">
                    <div className="text-3xl sm:text-4xl font-bold text-gradient">75%</div>
                    <div className="text-xs text-gray-400">Discount</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-white font-bold text-base sm:text-lg">100,000+</div>
                  <div className="text-xs sm:text-sm text-gray-400">BLAZE staked</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



