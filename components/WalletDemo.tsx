'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, ArrowDownLeft, RefreshCw, Settings, 
  TrendingUp, Eye, EyeOff, Plus, Zap, ChevronRight,
  Repeat, Wallet as WalletIcon, TrendingDown, PieChart, Rocket, CreditCard,
  Lock, Gift, Vote, Users, Palette, LogOut, Smartphone, Monitor,
  Brain, ScanEye, MessageSquare, Fuel, BarChart3
} from 'lucide-react';

// Mock data for demo
const mockTokens = [
  { symbol: 'ETH', name: 'Ethereum', balance: '2.45', usdValue: 4890.50, change24h: 2.5, logo: '🔷' },
  { symbol: 'BLAZE', name: 'Blaze Token', balance: '15,000', usdValue: 625.00, change24h: 8.2, logo: '🔥' },
  { symbol: 'USDC', name: 'USD Coin', balance: '1,250', usdValue: 1250.00, change24h: 0.1, logo: '💙' },
  { symbol: 'USDT', name: 'Tether', balance: '500', usdValue: 500.00, change24h: -0.1, logo: '💚' },
];

const mockChains = [
  { id: 'ethereum', name: 'Ethereum', symbol: 'ETH', color: '#627EEA' },
  { id: 'bsc', name: 'BSC', symbol: 'BNB', color: '#F3BA2F' },
  { id: 'polygon', name: 'Polygon', symbol: 'MATIC', color: '#8247E5' },
  { id: 'arbitrum', name: 'Arbitrum', symbol: 'ETH', color: '#28A0F0' },
  { id: 'base', name: 'Base', symbol: 'ETH', color: '#0052FF' },
];

const aiFeatures = [
  { icon: Brain, name: 'AI Assistant', color: 'from-purple-500 to-pink-500' },
  { icon: ScanEye, name: 'Scam Detector', color: 'from-red-500 to-orange-500' },
  { icon: BarChart3, name: 'Portfolio Advisor', color: 'from-blue-500 to-cyan-500' },
  { icon: Fuel, name: 'Gas Optimizer', color: 'from-green-500 to-emerald-500' },
  { icon: MessageSquare, name: 'Crypto Expert', color: 'from-indigo-500 to-purple-500' },
];

export default function WalletDemo() {
  const [isMobile, setIsMobile] = useState(false);
  const [showBalance, setShowBalance] = useState(true);
  const [currentChain, setCurrentChain] = useState(mockChains[0]);
  const [totalValue, setTotalValue] = useState(7265.50);
  const [change24h, setChange24h] = useState(2.5);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };

  return (
    <div className={`relative ${isMobile ? 'w-[375px] h-[667px]' : 'w-[1200px] h-[800px]'} mx-auto bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 overflow-hidden rounded-2xl`}>
      {/* View Toggle */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <button
          onClick={() => setIsMobile(false)}
          className={`p-2 rounded-lg transition-all ${
            !isMobile ? 'bg-orange-500 text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'
          }`}
        >
          <Monitor className="w-4 h-4" />
        </button>
        <button
          onClick={() => setIsMobile(true)}
          className={`p-2 rounded-lg transition-all ${
            isMobile ? 'bg-orange-500 text-white' : 'bg-white/10 text-gray-400 hover:bg-white/20'
          }`}
        >
          <Smartphone className="w-4 h-4" />
        </button>
      </div>

      {/* Header */}
      <div className={`relative z-10 p-6 ${!isMobile ? 'pr-96' : ''}`}>
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center">
              <span className="text-white font-bold text-lg">🔥</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">BLAZE Wallet</h1>
              <p className="text-sm text-gray-400">{formatAddress('0x742d35cc6634c0532925a3b8d0c9e5c3d3e8d3f5')}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleRefresh}
              className={`p-2 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 transition-all ${
                isRefreshing ? 'animate-spin' : ''
              }`}
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 transition-all">
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Chain Selector */}
        <div className="flex items-center gap-2 mb-6">
          {mockChains.map((chain) => (
            <button
              key={chain.id}
              onClick={() => setCurrentChain(chain)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                currentChain.id === chain.id
                  ? 'bg-orange-500 text-white'
                  : 'bg-white/10 text-gray-400 hover:bg-white/20'
              }`}
            >
              {chain.symbol}
            </button>
          ))}
        </div>

        {/* Portfolio Value */}
        <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400 text-sm">Total Portfolio Value</span>
            <button
              onClick={() => setShowBalance(!showBalance)}
              className="p-1 rounded-lg bg-white/10 text-gray-400 hover:bg-white/20 transition-all"
            >
              {showBalance ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
            </button>
          </div>
          
          <div className="flex items-center gap-3 mb-2">
            <span className="text-3xl font-bold text-white">
              {showBalance ? formatNumber(totalValue) : '••••••'}
            </span>
            <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-medium ${
              change24h >= 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
            }`}>
              <TrendingUp className="w-3 h-3" />
              {change24h >= 0 ? '+' : ''}{change24h}%
            </div>
          </div>
          
          <p className="text-gray-400 text-sm">24h change</p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          {[
            { icon: ArrowUpRight, label: 'Send', color: 'from-blue-500 to-cyan-500' },
            { icon: ArrowDownLeft, label: 'Receive', color: 'from-green-500 to-emerald-500' },
            { icon: Repeat, label: 'Swap', color: 'from-purple-500 to-pink-500' },
            { icon: Plus, label: 'Buy', color: 'from-orange-500 to-red-500' },
          ].map((action, index) => (
            <motion.button
              key={action.label}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`p-4 rounded-xl bg-gradient-to-r ${action.color} text-white text-center`}
            >
              <action.icon className="w-6 h-6 mx-auto mb-1" />
              <span className="text-xs font-medium">{action.label}</span>
            </motion.button>
          ))}
        </div>

        {/* AI Features */}
        <div className="mb-6">
          <h3 className="text-white font-bold mb-3 flex items-center gap-2">
            <Brain className="w-5 h-5 text-purple-400" />
            AI Features
            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 text-xs rounded-full">5 Tools</span>
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {aiFeatures.map((feature, index) => (
              <motion.button
                key={feature.name}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="p-3 rounded-xl bg-white/5 border border-white/10 text-left hover:bg-white/10 transition-all group"
              >
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-2 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-4 h-4 text-white" />
                </div>
                <span className="text-white text-sm font-medium">{feature.name}</span>
                <div className="text-gray-400 text-xs mt-1">Tap to try</div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Token List */}
        <div className={`space-y-3 ${!isMobile ? 'max-h-96 overflow-y-auto' : ''}`}>
          <h3 className="text-white font-bold">Tokens</h3>
          {mockTokens.map((token, index) => (
            <motion.div
              key={token.symbol}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 bg-white/5 backdrop-blur-xl rounded-xl border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-xl">
                  {token.logo}
                </div>
                <div>
                  <div className="text-white font-medium">{token.symbol}</div>
                  <div className="text-gray-400 text-sm">{token.name}</div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-white font-medium">
                  {showBalance ? formatNumber(token.usdValue) : '••••'}
                </div>
                <div className="text-gray-400 text-sm">
                  {showBalance ? token.balance : '••••'} {token.symbol}
                </div>
                <div className={`text-xs font-medium ${
                  token.change24h >= 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Navigation - Only show on mobile */}
        {isMobile && (
          <div className="fixed bottom-0 left-0 right-0 bg-slate-900/80 backdrop-blur-xl border-t border-white/10 p-4">
            <div className="grid grid-cols-5 gap-2">
              {[
                { icon: WalletIcon, label: 'Wallet', active: true },
                { icon: PieChart, label: 'Portfolio' },
                { icon: Rocket, label: 'Staking' },
                { icon: Vote, label: 'Governance' },
                { icon: Palette, label: 'NFTs' },
              ].map((item, index) => (
                <button
                  key={item.label}
                  className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-all ${
                    item.active ? 'text-orange-400' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  <span className="text-xs">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Desktop Sidebar - Only show on desktop */}
        {!isMobile && (
          <div className="fixed right-0 top-0 bottom-0 w-80 bg-slate-900/80 backdrop-blur-xl border-l border-white/10 p-6 overflow-y-auto">
            <h3 className="text-white font-bold mb-4">Quick Actions</h3>
            
            {/* Staking Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Rocket className="w-5 h-5 text-orange-400" />
                <span className="text-white font-medium">Staking</span>
              </div>
              <div className="space-y-2">
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-white text-sm font-medium">Flexible Staking</div>
                  <div className="text-orange-400 text-sm">8% APY</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-white text-sm font-medium">6 Month Lock</div>
                  <div className="text-orange-400 text-sm">15% APY</div>
                </div>
                <div className="p-3 bg-white/5 rounded-lg">
                  <div className="text-white text-sm font-medium">1 Year Lock</div>
                  <div className="text-orange-400 text-sm">20% APY</div>
                </div>
              </div>
            </div>

            {/* Governance Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Vote className="w-5 h-5 text-blue-400" />
                <span className="text-white font-medium">Governance</span>
              </div>
              <div className="p-3 bg-white/5 rounded-lg">
                <div className="text-white text-sm font-medium">Active Proposals</div>
                <div className="text-gray-400 text-sm">3 proposals</div>
              </div>
            </div>

            {/* NFTs Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Palette className="w-5 h-5 text-purple-400" />
                <span className="text-white font-medium">NFTs</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-lg flex items-center justify-center">
                    <span className="text-2xl">🎨</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Premium Badge */}
            <div className="p-4 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-lg border border-orange-500/30">
              <div className="flex items-center gap-2 mb-2">
                <Gift className="w-5 h-5 text-orange-400" />
                <span className="text-white font-medium">Premium Status</span>
              </div>
              <div className="text-gray-400 text-sm">10,000+ BLAZE staked</div>
              <div className="text-orange-400 text-sm font-medium">75% fee discount</div>
            </div>
          </div>
        )}
      </div>

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
    </div>
  );
}
