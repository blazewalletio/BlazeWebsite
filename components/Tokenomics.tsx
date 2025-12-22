'use client';

import { motion } from 'framer-motion';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { TrendingUp, Users, Lock, Coins, Flame, Award, Crown, Star, Sparkles, DollarSign, BarChart3 } from 'lucide-react';

const distributionData = [
  { name: 'Community Rewards', value: 20, color: '#22c55e', description: '200M tokens' },
  { name: 'Public Sale', value: 15, color: '#f97316', description: '150M tokens' },
  { name: 'Treasury', value: 15, color: '#3b82f6', description: '150M tokens' },
  { name: 'Founder Vesting', value: 15, color: '#fb923c', description: '150M tokens' },
  { name: 'Liquidity', value: 10, color: '#ef4444', description: '100M tokens' },
  { name: 'Founder Unlocked', value: 10, color: '#facc15', description: '100M tokens' },
  { name: 'Team (3yr)', value: 10, color: '#a855f7', description: '100M tokens' },
  { name: 'Strategic (2yr)', value: 5, color: '#ec4899', description: '50M tokens' },
];

const tokenFeatures = [
  {
    icon: Flame,
    title: 'Deflationary',
    description: '0.10% burn per transfer',
    value: 'Reduces supply',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: TrendingUp,
    title: 'Staking rewards',
    description: 'Earn 8-20% APY',
    value: 'Passive income',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Users,
    title: 'Governance',
    description: '1 token = 1 vote',
    value: 'True DAO',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Coins,
    title: 'Fee discounts',
    description: 'Hold to save',
    value: 'Up to 75% off',
    gradient: 'from-purple-500 to-pink-500',
  },
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="relative z-50 bg-slate-900/98 backdrop-blur-2xl border-2 border-orange-500/50 rounded-2xl p-5 shadow-2xl min-w-[200px] transform -translate-y-2">
        {/* Arrow pointing down */}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-slate-900/98 border-r-2 border-b-2 border-orange-500/50 rotate-45"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <div 
              className="w-4 h-4 rounded-full flex-shrink-0" 
              style={{ backgroundColor: data.color }}
            />
            <p className="text-white font-bold text-base sm:text-lg">{data.name}</p>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <p className="text-orange-400 font-bold text-2xl sm:text-3xl">{data.value}%</p>
            <p className="text-gray-300 text-sm">of total supply</p>
          </div>
          <div className="pt-2 border-t border-white/10">
            <p className="text-gray-300 text-sm sm:text-base font-medium">{data.description}</p>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }: any) => {
  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mt-6">
      {payload.map((entry: any, index: number) => (
        <div key={index} className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg border border-white/10">
          <div 
            className="w-3 h-3 rounded-full flex-shrink-0" 
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-white text-xs sm:text-sm font-medium">{entry.value}</span>
          <span className="text-gray-400 text-xs">{entry.payload.value}%</span>
        </div>
      ))}
    </div>
  );
};

export default function Tokenomics() {
  return (
    <section id="tokenomics" className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
            BLAZE <span className="text-gradient">Tokenomics</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Transparent and fair distribution. Designed for long-term growth.
          </p>
        </motion.div>

        {/* Main Stats Grid - Mobile First */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Total Supply */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="card-glass p-5 sm:p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                <Coins className="w-5 h-5 text-white" />
              </div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">Total Supply</div>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-1">1,000,000,000</div>
            <div className="text-gray-400 text-xs sm:text-sm">1 billion BLAZE</div>
          </motion.div>

          {/* Presale Price */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05, ease: "easeOut" }}
            className="card-glass p-5 sm:p-6 bg-gradient-to-br from-green-500/10 to-emerald-500/10 border-green-500/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-white" />
              </div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">Presale Price</div>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-green-400 mb-1">$0.00417</div>
            <div className="text-gray-400 text-xs sm:text-sm">Early bird price</div>
          </motion.div>

          {/* Launch Price */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1, ease: "easeOut" }}
            className="card-glass p-5 sm:p-6 bg-gradient-to-br from-orange-500/10 to-red-500/10 border-orange-500/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-white" />
              </div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">Launch Price</div>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gradient mb-1">$0.01</div>
            <div className="text-gray-400 text-xs sm:text-sm">Public launch price</div>
          </motion.div>

          {/* Market Cap */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.15, ease: "easeOut" }}
            className="card-glass p-5 sm:p-6 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border-blue-500/20"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-white" />
              </div>
              <div className="text-gray-400 text-xs sm:text-sm font-medium">Market Cap</div>
            </div>
            <div className="text-2xl sm:text-3xl lg:text-4xl font-bold text-blue-400 mb-1">$2.5M</div>
            <div className="text-gray-400 text-xs sm:text-sm">250M tokens circulating</div>
          </motion.div>
        </div>

        {/* Token Distribution - Improved Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-16">
          {/* Pie Chart */}
          <motion.div
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="card-glass p-6 sm:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-white">Token Distribution</h3>
            <ResponsiveContainer width="100%" height={320}>
              <PieChart>
                <Pie
                  data={distributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  innerRadius={40}
                  fill="#8884d8"
                  dataKey="value"
                  stroke="rgba(0,0,0,0.3)"
                  strokeWidth={2}
                >
                  {distributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  content={<CustomTooltip />}
                  wrapperStyle={{ 
                    zIndex: 50,
                    pointerEvents: 'none',
                  }}
                  cursor={{ fill: 'transparent' }}
                />
              </PieChart>
            </ResponsiveContainer>
            <CustomLegend payload={distributionData.map((entry, index) => ({
              value: entry.name,
              color: entry.color,
              payload: entry,
            }))} />
          </motion.div>

          {/* Distribution List */}
          <motion.div
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-3 sm:space-y-4"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center lg:text-left text-white">Allocation Details</h3>
            {distributionData.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                className="card-glass p-4 sm:p-5 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-4 h-4 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: item.color }}
                    />
                    <div>
                      <div className="text-white font-bold text-sm sm:text-base">{item.name}</div>
                      <div className="text-gray-400 text-xs sm:text-sm">{item.description}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-orange-400 font-bold text-lg sm:text-xl">{item.value}%</div>
                  </div>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-500"
                    style={{ 
                      width: `${item.value}%`,
                      backgroundColor: item.color,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Liquidity Locked */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-12 sm:mb-16"
        >
          <div className="card-glass p-6 sm:p-8 bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center flex-shrink-0">
                <Lock className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">Liquidity Locked</h3>
                <p className="text-2xl sm:text-3xl font-bold text-gradient mb-2">60% of raised funds</p>
                <p className="text-gray-300 text-sm sm:text-base">2 year lock via smart contract for maximum security</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Token features */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-12 sm:mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-white">Token Utility</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {tokenFeatures.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                  className="card-glass p-5 sm:p-6 text-center hover:bg-white/10 transition-all group"
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform`}>
                    <IconComponent className="w-7 h-7 text-white" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">{feature.title}</h4>
                  <p className="text-gray-300 text-sm mb-2">{feature.description}</p>
                  <p className="text-orange-400 font-bold text-sm">{feature.value}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Vesting schedule */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="card-glass p-6 sm:p-8 mb-12"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center text-white">Vesting Schedule</h3>
          <div className="space-y-4">
            <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                <div>
                  <div className="text-white font-bold text-base sm:text-lg">Founder Vesting</div>
                  <div className="text-gray-300 text-sm">15% (150M tokens)</div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-orange-400 font-bold text-sm sm:text-base">6-month cliff</div>
                  <div className="text-gray-300 text-sm">Linear over 4 years</div>
                </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-gradient-to-r from-orange-500 to-red-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: '25%' }}
                  aria-label="25% vested"
                />
              </div>
              <div className="text-xs text-gray-400">Estimated progress: ~25% after 6 months</div>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                <div>
                  <div className="text-white font-bold text-base sm:text-lg">Team Vesting</div>
                  <div className="text-gray-300 text-sm">10% (100M tokens)</div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-orange-400 font-bold text-sm sm:text-base">Linear unlock</div>
                  <div className="text-gray-300 text-sm">Over 3 years</div>
                </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: '33%' }}
                  aria-label="33% vested"
                />
              </div>
              <div className="text-xs text-gray-400">Estimated progress: ~33% after 1 year</div>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-white/5 border border-white/10">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3 gap-2">
                <div>
                  <div className="text-white font-bold text-base sm:text-lg">Strategic Vesting</div>
                  <div className="text-gray-300 text-sm">5% (50M tokens)</div>
                </div>
                <div className="text-left sm:text-right">
                  <div className="text-orange-400 font-bold text-sm sm:text-base">Linear unlock</div>
                  <div className="text-gray-300 text-sm">Over 2 years</div>
                </div>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-2.5 mb-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full transition-all duration-500"
                  style={{ width: '50%' }}
                  aria-label="50% vested"
                />
              </div>
              <div className="text-xs text-gray-400">Estimated progress: ~50% after 1 year</div>
            </div>
          </div>
          
          {/* Fee Discount Tiers */}
          <div className="mt-8 sm:mt-12 card-glass p-5 sm:p-6 lg:p-8 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border-purple-500/30">
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center text-white">Fee Discount Tiers</h3>
            <p className="text-center text-gray-300 mb-6 sm:mb-8 text-sm sm:text-base px-2">Stake more BLAZE for higher fee discounts on all transactions</p>
            
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
                    <div className="text-xs text-gray-300">Discount</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-white font-bold text-base sm:text-lg">1,000 - 9,999</div>
                  <div className="text-xs sm:text-sm text-gray-300">BLAZE staked</div>
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
                    <div className="text-xs text-gray-300">Discount</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-white font-bold text-base sm:text-lg">10,000 - 49,999</div>
                  <div className="text-xs sm:text-sm text-gray-300">BLAZE staked</div>
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
                    <div className="text-xs text-gray-300">Discount</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-white font-bold text-base sm:text-lg">50,000 - 99,999</div>
                  <div className="text-xs sm:text-sm text-gray-300">BLAZE staked</div>
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
                    <div className="text-xs text-gray-300">Discount</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-white font-bold text-base sm:text-lg">100,000+</div>
                  <div className="text-xs sm:text-sm text-gray-300">BLAZE staked</div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
