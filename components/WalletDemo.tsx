'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, ArrowDownLeft, RefreshCw, Settings, 
  TrendingUp, Eye, EyeOff, Plus, Zap, ChevronRight,
  Repeat, Wallet as WalletIcon, TrendingDown, PieChart, Rocket, CreditCard,
  Lock, Gift, Vote, Users, Palette, LogOut, Sparkles, Shield, Brain, MessageSquare,
  Smartphone, Monitor
} from 'lucide-react';

// Mock data for demo
const mockChains = {
  ethereum: {
    name: 'Ethereum',
    shortName: 'ETH',
    icon: 'Ξ',
    color: '#627EEA',
    nativeCurrency: { name: 'Ether', symbol: 'ETH' }
  },
  bsc: {
    name: 'Binance Smart Chain',
    shortName: 'BSC',
    icon: '🟡',
    color: '#F3BA2F',
    nativeCurrency: { name: 'BNB', symbol: 'BNB' }
  },
  polygon: {
    name: 'Polygon',
    shortName: 'MATIC',
    icon: '⬟',
    color: '#8247E5',
    nativeCurrency: { name: 'MATIC', symbol: 'MATIC' }
  }
};

const mockTokens = [
  {
    name: 'Tether USD',
    symbol: 'USDT',
    balance: '1,250.00',
    balanceUSD: '1,250.00',
    change24h: 0.1,
    logo: '₮'
  },
  {
    name: 'USD Coin',
    symbol: 'USDC',
    balance: '850.50',
    balanceUSD: '850.50',
    change24h: -0.2,
    logo: '₡'
  },
  {
    name: 'Blaze Token',
    symbol: 'BLAZE',
    balance: '15,000.00',
    balanceUSD: '2,250.00',
    change24h: 5.2,
    logo: '🔥'
  }
];

export default function WalletDemo() {
  const [isMobile, setIsMobile] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [currentChain, setCurrentChain] = useState('ethereum');
  const [totalValueUSD, setTotalValueUSD] = useState(12547.50);
  const [change24h, setChange24h] = useState(2.5);
  const [balance, setBalance] = useState('2.4567');
  const [chartData, setChartData] = useState([100, 105, 98, 112, 108, 115, 120, 118, 125, 130, 128, 135, 132, 140, 138, 145, 142, 150, 148, 155]);

  const chain = mockChains[currentChain as keyof typeof mockChains];
  const formattedAddress = '0x1834...5a24d';
  const isPositiveChange = change24h >= 0;

  // Simulate refresh
  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      // Simulate small price changes
      setTotalValueUSD(prev => prev + (Math.random() - 0.5) * 100);
      setChange24h(prev => prev + (Math.random() - 0.5) * 2);
    }, 1000);
  };

  // Generate chart data
  useEffect(() => {
    const interval = setInterval(() => {
      setChartData(prev => {
        const newData = [...prev];
        newData.shift();
        newData.push(prev[prev.length - 1] + (Math.random() - 0.5) * 10);
        return newData;
      });
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`${isMobile ? 'w-[375px]' : 'w-[1200px]'} mx-auto bg-gray-50 min-h-screen relative overflow-hidden`}>
      {/* View Toggle */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobile(false)}
          className={`p-2 rounded-lg ${!isMobile ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
        >
          <Monitor className="w-4 h-4" />
        </motion.button>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsMobile(true)}
          className={`p-2 rounded-lg ${isMobile ? 'bg-blue-500 text-white' : 'bg-white text-gray-600'}`}
        >
          <Smartphone className="w-4 h-4" />
        </motion.button>
      </div>

      {/* Header with Network Selector */}
      <div className="sticky top-0 z-30 backdrop-blur-xl bg-white/95 border-b border-gray-200 shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-2 glass-card px-3 sm:px-4 py-2 rounded-xl hover:bg-gray-50 min-w-0"
              >
                <div 
                  className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-base sm:text-lg flex-shrink-0"
                  style={{ background: chain.color }}
                >
                  {chain.icon}
                </div>
                <div className="text-left min-w-0">
                  <div className="text-xs sm:text-sm font-semibold text-gray-900">{chain.shortName}</div>
                  <div className="text-xs text-gray-500 font-mono truncate">{formattedAddress}</div>
                </div>
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 flex-shrink-0" />
              </motion.button>
            </div>

            <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
              {/* Presale button - Hidden on mobile */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="hidden md:flex px-3 py-2 rounded-xl items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 text-white hover:from-orange-600 hover:to-yellow-600 shadow-soft"
              >
                <Rocket className="w-5 h-5" />
                <span className="text-sm font-semibold">Presale</span>
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={handleRefresh}
                disabled={isRefreshing}
                className="glass-card p-2.5 sm:p-3 rounded-xl hover:bg-gray-50"
              >
                <RefreshCw className={`w-4 h-4 sm:w-5 sm:h-5 text-gray-700 ${isRefreshing ? 'animate-spin' : ''}`} />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="glass-card p-2.5 sm:p-3 rounded-xl hover:bg-gray-50"
              >
                <Settings className="w-4 h-4 sm:w-5 sm:h-5 text-gray-700" />
              </motion.button>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="glass-card p-2.5 sm:p-3 rounded-xl hover:bg-red-50 text-red-600"
              >
                <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Portfolio Value Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card relative overflow-hidden card-3d subtle-shimmer"
        >
          <div className="absolute inset-0 bg-gradient-primary opacity-5 animate-gradient" />
          <div className="relative z-10">
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <div className="text-sm text-gray-600 mb-2">Portfolio value</div>
                <div className="flex items-center gap-3 mb-2">
                  {showBalance ? (
                    <>
                      <h2 className="text-4xl md:text-5xl font-bold">
                        ${totalValueUSD.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </h2>
                      <div className="text-right">
                        <div className="text-sm text-gray-500">{balance} {chain.nativeCurrency.symbol}</div>
                        <div className="text-xs text-gray-400">Native balance</div>
                      </div>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowBalance(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                    </>
                  ) : (
                    <>
                      <h2 className="text-4xl md:text-5xl font-bold">••••••</h2>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setShowBalance(true)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <EyeOff className="w-5 h-5" />
                      </motion.button>
                    </>
                  )}
                </div>
                
                <div className={`flex items-center gap-2 text-sm ${isPositiveChange ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {isPositiveChange ? (
                    <TrendingUp className="w-4 h-4" />
                  ) : (
                    <TrendingDown className="w-4 h-4" />
                  )}
                  <span>
                    {isPositiveChange ? '+' : ''}{change24h.toFixed(2)}% vandaag
                  </span>
                </div>
              </div>
            </div>

            {/* Mini Chart */}
            <div className="h-20 flex items-end gap-1 mb-4">
              {chartData.map((value, i) => {
                const minValue = Math.min(...chartData);
                const maxValue = Math.max(...chartData);
                const range = maxValue - minValue || 1;
                const heightPercent = ((value - minValue) / range) * 80 + 20;
                return (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${heightPercent}%` }}
                    transition={{ delay: i * 0.03, duration: 0.5 }}
                    className={`flex-1 rounded-t ${isPositiveChange ? 'bg-emerald-400/40' : 'bg-rose-400/40'}`}
                  />
                );
              })}
            </div>

            {/* Time Range Selector */}
            <div className="flex gap-2 flex-wrap">
              {[
                { label: '1u', hours: 1 },
                { label: '1d', hours: 24 },
                { label: '3d', hours: 72 },
                { label: '1w', hours: 168 },
                { label: '1m', hours: 720 },
                { label: 'Alles', hours: null },
              ].map((range) => (
                <motion.button
                  key={range.label}
                  whileTap={{ scale: 0.95 }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    range.hours === 24
                      ? 'bg-primary-600 text-white shadow-soft'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {range.label}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Presale Card - Mobile Only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden glass-card card-hover relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-yellow-500/10" />
          <div className="relative z-10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center">
                  <Rocket className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold text-gray-900 text-lg">BLAZE Presale</div>
                  <div className="text-sm text-gray-600">Vroege toegang tot tokens</div>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </div>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3">
          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            whileTap={{ scale: 0.95 }}
            className="glass-card card-hover p-4 text-center"
          >
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center mb-2">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm font-semibold text-gray-900">Buy</div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.15 }}
            whileTap={{ scale: 0.95 }}
            className="glass-card card-hover p-4 text-center"
          >
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-rose-500 to-orange-500 rounded-xl flex items-center justify-center mb-2">
              <ArrowUpRight className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm font-semibold text-gray-900">Send</div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            whileTap={{ scale: 0.95 }}
            className="glass-card card-hover p-4 text-center"
          >
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center mb-2">
              <ArrowDownLeft className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm font-semibold text-gray-900">Receive</div>
          </motion.button>

          <motion.button
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            whileTap={{ scale: 0.95 }}
            className="glass-card card-hover p-4 text-center"
          >
            <div className="w-12 h-12 mx-auto bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-2">
              <Repeat className="w-6 h-6 text-white" />
            </div>
            <div className="text-sm font-semibold text-gray-900">Swap</div>
          </motion.button>
        </div>

        {/* Add Tokens Button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileTap={{ scale: 0.98 }}
          className="w-full glass-card card-hover p-3 flex items-center justify-center gap-2 mt-3"
        >
          <Plus className="w-4 h-4" />
          <span className="text-sm font-semibold">Add tokens</span>
        </motion.button>

        {/* AI Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32 }}
          className="glass-card mt-4 relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/20 to-pink-500/20 blur-3xl" />
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-500" />
                AI Tools
              </h3>
              <button className="text-xs text-purple-500 hover:text-purple-600 flex items-center gap-1">
                <Settings className="w-3 h-3" />
                Configureer
              </button>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {/* AI Transaction Assistant */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="glass p-4 rounded-xl hover:bg-white/10 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div className="font-semibold mb-1">AI Assistent</div>
                <div className="text-xs text-slate-400">Natuurlijke taal transacties</div>
              </motion.button>

              {/* AI Risk Scanner */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="glass p-4 rounded-xl hover:bg-white/10 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-cyan-500 rounded-lg flex items-center justify-center mb-3">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="font-semibold mb-1">Scam Detector</div>
                <div className="text-xs text-slate-400">Real-time risico scanning</div>
              </motion.button>

              {/* AI Portfolio Advisor */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="glass p-4 rounded-xl hover:bg-white/10 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center mb-3">
                  <PieChart className="w-5 h-5 text-white" />
                </div>
                <div className="font-semibold mb-1">Portfolio Advisor</div>
                <div className="text-xs text-slate-400">Gepersonaliseerde tips</div>
              </motion.button>

              {/* AI Gas Optimizer */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="glass p-4 rounded-xl hover:bg-white/10 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center mb-3">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <div className="font-semibold mb-1">Gas Optimizer</div>
                <div className="text-xs text-slate-400">Bespaar op gas fees</div>
              </motion.button>

              {/* AI Chat Assistant */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="glass p-4 rounded-xl hover:bg-white/10 transition-colors text-left"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center mb-3">
                  <MessageSquare className="w-5 h-5 text-white" />
                </div>
                <div className="font-semibold mb-1">Crypto Expert</div>
                <div className="text-xs text-slate-400">24/7 AI support</div>
              </motion.button>

              {/* AI Brain - All Features */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="glass p-4 rounded-xl hover:bg-white/10 transition-colors text-left bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-indigo-400 to-purple-500 rounded-lg flex items-center justify-center mb-3">
                  <Brain className="w-5 h-5 text-white" />
                </div>
                <div className="font-semibold mb-1">AI Brain</div>
                <div className="text-xs text-slate-400">Alles in één interface</div>
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* BLAZE Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="glass-card"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold flex items-center gap-2">
              🔥 BLAZE Features
            </h3>
            <div className="px-3 py-1 rounded-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white text-xs font-bold">
              Premium
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {/* Staking */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="glass p-4 rounded-xl hover:bg-white/10 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-lg flex items-center justify-center mb-3">
                <Lock className="w-5 h-5 text-white" />
              </div>
              <div className="font-semibold mb-1">Staking</div>
              <div className="text-xs text-slate-400">Earn up to 20% APY</div>
            </motion.button>

            {/* Cashback */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="glass p-4 rounded-xl hover:bg-white/10 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-lg flex items-center justify-center mb-3">
                <Gift className="w-5 h-5 text-white" />
              </div>
              <div className="font-semibold mb-1">Cashback</div>
              <div className="text-xs text-slate-400">2% on all transactions</div>
            </motion.button>

            {/* Governance */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="glass p-4 rounded-xl hover:bg-white/10 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center mb-3">
                <Vote className="w-5 h-5 text-white" />
              </div>
              <div className="font-semibold mb-1">Governance</div>
              <div className="text-xs text-slate-400">Vote on proposals</div>
            </motion.button>

            {/* Launchpad */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="glass p-4 rounded-xl hover:bg-white/10 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center mb-3">
                <Rocket className="w-5 h-5 text-white" />
              </div>
              <div className="font-semibold mb-1">Launchpad</div>
              <div className="text-xs text-slate-400">Early access to IDOs</div>
            </motion.button>

            {/* Referrals */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="glass p-4 rounded-xl hover:bg-white/10 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="font-semibold mb-1">Referrals</div>
              <div className="text-xs text-slate-400">Earn 50 BLAZE/referral</div>
            </motion.button>

            {/* NFT Collection */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="glass p-4 rounded-xl hover:bg-white/10 transition-colors text-left"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center mb-3">
                <Palette className="w-5 h-5 text-white" />
              </div>
              <div className="font-semibold mb-1">NFT Skins</div>
              <div className="text-xs text-slate-400">Exclusive wallet themes</div>
            </motion.button>
          </div>
        </motion.div>

        {/* Assets */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="glass-card"
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Assets</h3>
          </div>
          
          <div className="space-y-3">
            {/* Native Token */}
            <motion.div
              whileTap={{ scale: 0.98 }}
              className="glass p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-4">
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold"
                  style={{ background: chain.color }}
                >
                  {chain.icon}
                </div>
                <div>
                  <div className="font-semibold">{chain.nativeCurrency.name}</div>
                  <div className="text-sm text-slate-400">
                    {balance} {chain.nativeCurrency.symbol}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold">
                  ${(parseFloat(balance) * 2500).toFixed(2)}
                </div>
                <div className={`text-sm ${isPositiveChange ? 'text-emerald-400' : 'text-rose-400'}`}>
                  {isPositiveChange ? '+' : ''}{change24h.toFixed(2)}%
                </div>
              </div>
            </motion.div>

            {/* ERC-20 Tokens */}
            {mockTokens.map((token, index) => (
              <motion.div
                key={token.symbol}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                whileTap={{ scale: 0.98 }}
                className="glass p-4 rounded-xl flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-600 rounded-full flex items-center justify-center text-xl">
                    {token.logo}
                  </div>
                  <div>
                    <div className="font-semibold">{token.name}</div>
                    <div className="text-sm text-slate-400">
                      {token.balance} {token.symbol}
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-semibold">${token.balanceUSD}</div>
                  <div className={`text-sm ${token.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {token.change24h >= 0 ? '+' : ''}{token.change24h.toFixed(2)}%
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Floating Quick Pay Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full shadow-2xl flex items-center justify-center subtle-glow hover:scale-110 transition-transform duration-300"
      >
        <Zap className="w-8 h-8 text-white" />
      </motion.button>
    </div>
  );
}
