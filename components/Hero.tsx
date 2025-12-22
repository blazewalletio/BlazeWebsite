'use client';

import { motion } from 'framer-motion';
import { Flame, ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/20 rounded-full blur-3xl animate-pulse delay-1000" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        {/* Logo/Badge */}
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-blaze text-white font-bold mb-8"
        >
          <Flame className="w-5 h-5" />
          <span>BLAZE WALLET</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 px-4"
        >
          Set Your Finances
          <br />
          <span className="text-gradient animate-bg inline-flex items-center gap-2 sm:gap-3">
            Ablaze <Flame className="w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16 inline-block" />
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto px-4"
        >
          The most intelligent crypto wallet with 5 advanced AI features. 
          Multi-chain (18 chains), Staking (8-20% APY), Governance, NFTs, Launchpad, Cashback, Referral and more. Experience the future of DeFi.
        </motion.p>

        {/* AI Badge */}
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-8 sm:mb-12 max-w-4xl mx-auto px-4"
        >
          {[
            '🤖 AI Transaction Assistant',
            '🛡️ Smart Scam Detector',
            '📊 AI Portfolio Advisor',
            '⚡ Gas Optimizer',
            '💬 Crypto Expert AI'
          ].map((feature, index) => (
            <span 
              key={index}
              className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-xs sm:text-sm font-medium backdrop-blur-sm"
            >
              {feature}
            </span>
          ))}
        </motion.div>

        {/* Key Features Showcase */}
        <motion.div
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-5xl mx-auto mb-8"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: '🤖', label: '5 AI Features', value: 'Revolutionary' },
              { icon: '⛓️', label: '18 Chains', value: 'Universal' },
              { icon: '📈', label: 'Up to 20% APY', value: 'Staking' },
              { icon: '🛡️', label: '100% Secure', value: 'Non-custodial' },
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: 0.2 + index * 0.05, ease: "easeOut" }}
                whileHover={{ scale: 1.03, y: -3 }}
                style={{ willChange: 'transform' }}
                className="card-glass p-4 sm:p-6 text-center hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="text-3xl sm:text-4xl mb-2">{stat.icon}</div>
                <div className="text-lg sm:text-xl font-bold text-gradient mb-1">{stat.value}</div>
                <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <a
              href="https://my.blazewallet.io"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-blaze rounded-xl font-bold text-base sm:text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 glow-orange"
            >
              Launch Wallet
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="#demo"
              className="px-6 sm:px-8 py-3 sm:py-4 card-glass rounded-xl font-bold text-base sm:text-lg hover:scale-105 transition-transform text-center"
            >
              View Demo
            </a>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
          className="flex flex-wrap justify-center gap-4 sm:gap-8 text-xs sm:text-sm text-gray-400 px-4"
        >
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Smart contract verified</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Non-custodial</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>18 chains supported</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>Launch-ready</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}



