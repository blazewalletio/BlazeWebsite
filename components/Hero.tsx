'use client';

import { motion } from 'framer-motion';
import { Flame, ArrowRight, Rocket } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    // Presale end date (30 days from now - adjust as needed)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 30);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-blaze text-white font-bold mb-8"
        >
          <Flame className="w-5 h-5" />
          <span>BLAZE WALLET</span>
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
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
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto px-4"
        >
          The most intelligent crypto wallet with 5 advanced AI features. 
          Multi-chain (7 chains), Staking (8-20% APY), Governance, NFTs, Launchpad, Cashback, Referral and more. Join the presale now!
        </motion.p>

        {/* AI Badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
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

        {/* Presale Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="card-glass p-4 sm:p-6 md:p-8 max-w-4xl mx-auto mb-8 glow-orange"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <Rocket className="w-5 h-5 sm:w-6 sm:h-6 text-orange-500" />
            <h2 className="text-xl sm:text-2xl font-bold text-gradient">PRESALE LIVE NOW</h2>
          </div>
          
          {/* Countdown */}
          <div className="grid grid-cols-4 gap-2 sm:gap-4 mb-4 sm:mb-6">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="card-glass p-2 sm:p-3 md:p-4">
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient">
                  {String(item.value).padStart(2, '0')}
                </div>
                <div className="text-xs sm:text-sm text-gray-400 mt-1">{item.label}</div>
              </div>
            ))}
          </div>

          {/* Presale stats */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="text-center">
              <div className="text-gray-400 text-xs sm:text-sm mb-1">Token price</div>
              <div className="text-xl sm:text-2xl font-bold text-green-400">$0.00417</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-xs sm:text-sm mb-1">Launch price</div>
              <div className="text-xl sm:text-2xl font-bold text-orange-400">$0.01</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400 text-xs sm:text-sm mb-1">ROI at launch</div>
              <div className="text-xl sm:text-2xl font-bold text-gradient">2.4x</div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>$125,000 raised</span>
              <span>$500,000 hard cap</span>
            </div>
            <div className="w-full bg-gray-800 rounded-full h-4 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '25%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-blaze"
              />
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4">
            <a
              href="https://my.blazewallet.io"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-blaze rounded-xl font-bold text-base sm:text-lg hover:scale-105 transition-transform flex items-center justify-center gap-2 glow-orange"
            >
              Join presale now
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </a>
            <a
              href="#demo"
              className="px-6 sm:px-8 py-3 sm:py-4 card-glass rounded-xl font-bold text-base sm:text-lg hover:scale-105 transition-transform text-center"
            >
              View demo
            </a>
          </div>
        </motion.div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
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
            <span>7 chains supported</span>
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



