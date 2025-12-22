'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Monitor, Smartphone, Play, Zap, Shield, Brain, MessageSquare, PieChart, Fuel } from 'lucide-react';
import { useState } from 'react';

export default function Demo() {
  const [isMobile, setIsMobile] = useState(false);

  return (
    <section id="demo" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
            See BLAZE <span className="text-gradient">in action</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Test the most intelligent crypto wallet. With AI, NFTs, Staking, Governance and more. Completely free.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Demo Screenshots */}
          <motion.div
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.15, ease: "easeOut" }}
            className="relative"
          >
            {/* View Toggle */}
            <div className="flex items-center justify-center gap-4 mb-8">
              <span className="text-gray-400 font-medium">View:</span>
              <div className="flex bg-white/5 rounded-xl p-1">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobile(false)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    !isMobile 
                      ? 'bg-gradient-blaze text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  Desktop
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setIsMobile(true)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                    isMobile 
                      ? 'bg-gradient-blaze text-white shadow-lg' 
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  Mobile
                </motion.button>
              </div>
            </div>

            {/* Desktop Frame */}
            {!isMobile && (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative"
              >
                {/* Realistic Monitor Frame */}
                <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-t-3xl p-6 pb-4 shadow-2xl border border-slate-700/50">
                  {/* Monitor Bezel */}
                  <div className="bg-black rounded-2xl p-3 shadow-inner">
                    {/* Screen */}
                    <div className="bg-slate-900 rounded-xl overflow-hidden shadow-inner border border-slate-700/30">
                      <img 
                        src="/screenshots/desktop-wallet.png" 
                        alt="BLAZE Wallet Desktop Screenshot"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to placeholder if image doesn't exist
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800" style={{ display: 'none' }}>
                        <div className="text-center">
                          <div className="w-16 h-16 bg-gradient-blaze rounded-xl flex items-center justify-center mb-4 mx-auto">
                            <Monitor className="w-8 h-8 text-white" />
                          </div>
                          <p className="text-gray-300 font-semibold">Desktop Screenshot</p>
                          <p className="text-gray-500 text-sm">Upload desktop-wallet.png to /public/screenshots/</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Monitor Controls */}
                  <div className="flex items-center justify-between mt-4 px-2">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full shadow-lg"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-lg"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full shadow-lg"></div>
                    </div>
                    <div className="text-slate-400 text-xs font-medium">BLAZE Wallet - Desktop</div>
                    <div className="w-8 h-1 bg-slate-600 rounded-full"></div>
                  </div>
                </div>
                
                {/* Monitor Stand */}
                <div className="bg-gradient-to-b from-slate-700 to-slate-800 h-12 rounded-b-2xl shadow-lg border border-slate-600/50">
                  <div className="bg-gradient-to-b from-slate-600 to-slate-700 h-6 w-40 mx-auto rounded-b-xl shadow-inner"></div>
                </div>
              </motion.div>
            )}

            {/* Mobile Frame */}
            {isMobile && (
              <motion.div
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="relative mx-auto"
                style={{ width: '320px' }}
              >
                {/* Realistic iPhone Frame */}
                <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-[3.5rem] p-3 shadow-2xl border border-slate-700/50">
                  {/* Top Bezel with Notch */}
                  <div className="bg-black rounded-t-[3rem] h-8 flex items-center justify-center relative">
                    <div className="bg-black h-6 w-36 rounded-b-2xl absolute top-0"></div>
                    <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                  </div>
                  
                  {/* Screen Container */}
                  <div className="bg-black rounded-[2.5rem] p-1 shadow-inner">
                    {/* Screen */}
                    <div className="bg-slate-900 rounded-[2.2rem] overflow-hidden shadow-inner">
                      <img 
                        src="/screenshots/mobile-wallet.png" 
                        alt="BLAZE Wallet Mobile Screenshot"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          // Fallback to placeholder if image doesn't exist
                          e.currentTarget.style.display = 'none';
                          const nextElement = e.currentTarget.nextElementSibling as HTMLElement;
                          if (nextElement) {
                            nextElement.style.display = 'flex';
                          }
                        }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800" style={{ display: 'none' }}>
                        <div className="text-center">
                          <div className="w-12 h-12 bg-gradient-blaze rounded-xl flex items-center justify-center mb-3 mx-auto">
                            <Smartphone className="w-6 h-6 text-white" />
                          </div>
                          <p className="text-gray-300 font-semibold text-sm">Mobile Screenshot</p>
                          <p className="text-gray-500 text-xs">Upload mobile-wallet.png to /public/screenshots/</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom Bezel with Home Indicator */}
                  <div className="bg-black rounded-b-[3rem] h-8 flex items-center justify-center relative">
                    <div className="w-32 h-1 bg-slate-700 rounded-full"></div>
                  </div>
                  
                  {/* Side Buttons */}
                  <div className="absolute left-0 top-20 w-1 h-16 bg-slate-600 rounded-r-full"></div>
                  <div className="absolute right-0 top-32 w-1 h-8 bg-slate-600 rounded-l-full"></div>
                  <div className="absolute right-0 top-44 w-1 h-8 bg-slate-600 rounded-l-full"></div>
                </div>
                
                {/* Phone Label */}
                <div className="text-center mt-4">
                  <div className="text-slate-400 text-xs font-medium">BLAZE Wallet - Mobile</div>
                </div>
              </motion.div>
            )}

            {/* Live Badge */}
            <div className="absolute -top-4 -right-4 z-50">
              <div className="px-4 py-2 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-bold flex items-center gap-2 backdrop-blur-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                LIVE DEMO
              </div>
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
            className="space-y-8"
          >
            {/* Features List */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">
                What you can test:
              </h3>
              
              <div className="space-y-4">
                {[
                  {
                    icon: Brain,
                    title: 'AI Transaction Assistant',
                    description: 'Type "Send 50 USDC to 0x..." and AI does the rest'
                  },
                  {
                    icon: Shield,
                    title: 'Smart Scam Detector',
                    description: 'Scan addresses and get a risk score before you interact'
                  },
                  {
                    icon: PieChart,
                    title: 'AI Portfolio Advisor',
                    description: 'Get personalized tips for your portfolio optimization'
                  },
                  {
                    icon: Fuel,
                    title: 'Gas Optimizer',
                    description: 'Save money by transacting at optimal times'
                  },
                  {
                    icon: MessageSquare,
                    title: 'Crypto Expert AI',
                    description: 'Ask questions about DeFi, gas, slippage and more'
                  }
                ].map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.25, delay: index * 0.05, ease: "easeOut" }}
                    className="flex items-start gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <div className="w-10 h-10 bg-gradient-blaze rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-white mb-1">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interactive Elements */}
            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-white">Interactieve features:</h4>
              <div className="grid grid-cols-2 gap-3">
                {[
                  'Quick Actions (Buy, Send, Receive, Swap)',
                  'Staking Dashboard (8-20% APY)',
                  'NFT Marketplace & Minting',
                  'Governance Voting',
                  'Launchpad Projects',
                  'AI Tools (5 features)',
                  'Cashback & Referral',
                  'Settings & Security'
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm text-gray-400">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="pt-4"
            >
              <a
                href="https://my.blazewallet.io"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-blaze rounded-xl font-bold text-lg hover:scale-105 transition-transform glow-orange"
              >
                <Play className="w-5 h-5" />
                Open the wallet
                <ExternalLink className="w-5 h-5" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Quick stats below */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.35, ease: "easeOut" }}
          className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 sm:mt-16 px-4"
        >
          {[
            { label: 'AI Features', value: '5' },
            { label: 'Supported chains', value: '18' },
            { label: 'Max APY', value: '20%' },
            { label: 'Fee discount', value: '75%' },
          ].map((stat, index) => (
            <div key={index} className="card-glass p-3 sm:p-4 text-center">
              <div className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient mb-1">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}



