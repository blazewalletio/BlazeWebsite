'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, CheckCircle, QrCode } from 'lucide-react';
import Image from 'next/image';
import { useState, useEffect } from 'react';

// Floating crypto icons data
const floatingIcons = [
  { symbol: 'BTC', color: '#F7931A', x: '10%', y: '20%', delay: 0, duration: 20 },
  { symbol: 'ETH', color: '#627EEA', x: '85%', y: '15%', delay: 2, duration: 25 },
  { symbol: 'SOL', color: '#00FFA3', x: '15%', y: '70%', delay: 4, duration: 22 },
  { symbol: 'USDC', color: '#2775CA', x: '80%', y: '75%', delay: 1, duration: 18 },
  { symbol: 'BNB', color: '#F3BA2F', x: '5%', y: '45%', delay: 3, duration: 24 },
  { symbol: 'MATIC', color: '#8247E5', x: '92%', y: '45%', delay: 5, duration: 21 },
];

export default function Hero() {
  // Check if we're on mobile - only set after mount to avoid hydration mismatch
  const [isMobile, setIsMobile] = useState(false);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const trustBadges = [
    { text: 'Pay anywhere' },
    { text: 'Non-custodial' },
    { text: 'Multi-chain' },
  ];

  // On mobile, disable heavy animations for performance
  const shouldAnimate = hasMounted && !isMobile;

  return (
    <section className="relative min-h-screen flex items-center pt-20 md:pt-0 overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      
      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-yellow-500/10 rounded-full blur-3xl" />
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-5" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />
      
      {/* Floating Crypto Icons - Only animate on desktop */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden lg:block">
        {floatingIcons.map((icon) => (
          <motion.div
            key={icon.symbol}
            className="absolute"
            style={{ left: icon.x, top: icon.y }}
            initial={{ opacity: 0.2, scale: 0.9 }}
            animate={shouldAnimate ? { 
              opacity: [0.15, 0.3, 0.15],
              scale: [0.8, 1, 0.8],
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 10, -10, 0],
            } : { opacity: 0.2, scale: 0.9 }}
            transition={{
              duration: icon.duration,
              delay: icon.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div 
              className="w-16 h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm"
              style={{ 
                backgroundColor: `${icon.color}15`,
                border: `1px solid ${icon.color}30`,
                boxShadow: `0 0 30px ${icon.color}20`,
              }}
            >
              <span 
                className="font-bold text-sm"
                style={{ color: icon.color }}
              >
                {icon.symbol}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 lg:py-20">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 text-orange-300 font-medium text-sm mb-6"
            >
              <QrCode className="w-4 h-4" />
              Pay with crypto everywhere
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight"
            >
              Your crypto{' '}
              <span className="text-gradient-brand">wallet</span>
              <br />for everyday life
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg sm:text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Pay at the coffee shop, supermarket, or anywhere – just scan a QR code. Crypto payments in seconds, not minutes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <a
                href="https://my.blazewallet.io"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand flex items-center justify-center gap-2 px-8 py-4 text-lg"
              >
                Start paying with crypto
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href="#quickpay"
                className="btn-light flex items-center justify-center gap-2 px-8 py-4 text-lg"
              >
                <QrCode className="w-5 h-5" />
                See QuickPay
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-400"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span className="font-medium">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: iPhone with Layered Reveal Animation (desktop only) */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative">
              
              {/* Layer 1: Ambient glow - appears first (desktop only animation) */}
              <motion.div 
                className="absolute -inset-8 rounded-[4rem] blur-3xl"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(249, 115, 22, 0.4) 0%, rgba(234, 179, 8, 0.2) 50%, transparent 70%)',
                }}
                initial={shouldAnimate ? { opacity: 0, scale: 0.8 } : { opacity: 0.6, scale: 1 }}
                animate={{ opacity: 0.6, scale: 1 }}
                transition={shouldAnimate ? { 
                  delay: 0.3,
                  duration: 1.2, 
                  ease: [0.22, 1, 0.36, 1] 
                } : { duration: 0 }}
              />
              
              {/* Layer 2: iPhone - appears second (no animation on mobile) */}
              <motion.div
                initial={shouldAnimate ? { opacity: 0, y: 60, scale: 0.95 } : { opacity: 1, y: 0, scale: 1 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={shouldAnimate ? { 
                  delay: 0.6,
                  duration: 1, 
                  ease: [0.22, 1, 0.36, 1] 
                } : { duration: 0 }}
              >
                {/* iPhone 15 Pro Frame */}
                <div 
                  className="relative rounded-[3rem] p-[3px]"
                  style={{
                    background: 'linear-gradient(145deg, #8a8a8f 0%, #6e6e73 25%, #48484a 50%, #6e6e73 75%, #8a8a8f 100%)',
                    boxShadow: `
                      0 0 0 1px rgba(255,255,255,0.1),
                      0 4px 6px rgba(0,0,0,0.3),
                      0 10px 20px rgba(0,0,0,0.4),
                      0 30px 60px rgba(0,0,0,0.5),
                      inset 0 1px 0 rgba(255,255,255,0.2)
                    `,
                  }}
                >
                  {/* Inner bezel */}
                  <div 
                    className="rounded-[2.85rem] p-[10px]"
                    style={{
                      background: 'linear-gradient(180deg, #3a3a3c 0%, #2c2c2e 50%, #1c1c1e 100%)',
                      boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(0,0,0,0.3)',
                    }}
                  >
                    {/* Screen */}
                    <div 
                      className="relative bg-black rounded-[2.4rem] overflow-hidden"
                      style={{
                        width: '280px',
                        height: '590px',
                        boxShadow: 'inset 0 0 1px 1px rgba(0,0,0,0.8)',
                      }}
                    >
                      {/* Dynamic Island */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30">
                        <div 
                          className="bg-black rounded-full flex items-center justify-center"
                          style={{
                            width: '120px',
                            height: '34px',
                            boxShadow: '0 0 0 1px rgba(255,255,255,0.05)',
                          }}
                        >
                          <div className="absolute left-5 w-3 h-3 rounded-full bg-[#1a1a2e] ring-1 ring-[#0d0d15]">
                            <div className="absolute inset-0.5 rounded-full bg-gradient-to-br from-[#2a2a4a] to-[#0a0a15]">
                              <div className="absolute top-0.5 left-0.5 w-1 h-1 rounded-full bg-[#4a4a6a] opacity-60" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      {/* Screen Content */}
                      <div className="absolute inset-0">
                        <Image
                          src="/iphone_screen.jpeg"
                          alt="BLAZE Wallet App"
                          fill
                          className="object-cover object-top"
                          priority
                          sizes="280px"
                        />
                      </div>
                      
                      {/* Glass reflection */}
                      <div 
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                          background: `linear-gradient(125deg, rgba(255,255,255,0.08) 0%, transparent 25%, transparent 60%, rgba(255,255,255,0.02) 100%)`,
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Side buttons */}
                  <div 
                    className="absolute -left-[2px] top-[100px] w-[4px] h-[28px] rounded-l-sm"
                    style={{
                      background: 'linear-gradient(90deg, #5a5a5c, #7a7a7c, #5a5a5c)',
                      boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
                    }}
                  />
                  <div 
                    className="absolute -left-[2px] top-[145px] w-[4px] h-[50px] rounded-l-sm"
                    style={{
                      background: 'linear-gradient(90deg, #5a5a5c, #7a7a7c, #5a5a5c)',
                      boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
                    }}
                  />
                  <div 
                    className="absolute -left-[2px] top-[205px] w-[4px] h-[50px] rounded-l-sm"
                    style={{
                      background: 'linear-gradient(90deg, #5a5a5c, #7a7a7c, #5a5a5c)',
                      boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
                    }}
                  />
                  <div 
                    className="absolute -right-[2px] top-[160px] w-[4px] h-[70px] rounded-r-sm"
                    style={{
                      background: 'linear-gradient(90deg, #5a5a5c, #7a7a7c, #5a5a5c)',
                      boxShadow: '1px 0 2px rgba(0,0,0,0.3)',
                    }}
                  />
                </div>
              </motion.div>
              
              {/* Layer 3: Floating badges - appear last (desktop only) */}
              <motion.div
                initial={shouldAnimate ? { opacity: 0, y: 20, x: 20 } : { opacity: 1, y: 0, x: 0 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={shouldAnimate ? { 
                  delay: 1.2,
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1] 
                } : { duration: 0 }}
                className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-2xl p-3 border border-gray-100 hidden lg:block z-50"
                style={{ 
                  boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">18+ chains</div>
                    <div className="text-[11px] text-gray-500">Supported</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={shouldAnimate ? { opacity: 0, y: -20, x: -20 } : { opacity: 1, y: 0, x: 0 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                transition={shouldAnimate ? { 
                  delay: 1.4,
                  duration: 0.8, 
                  ease: [0.22, 1, 0.36, 1] 
                } : { duration: 0 }}
                className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-2xl p-3 border border-gray-100 hidden lg:block z-50"
                style={{ 
                  boxShadow: '0 10px 40px rgba(0,0,0,0.15)',
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">Secured</div>
                    <div className="text-[11px] text-gray-500">Non-custodial</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Diagonal slice transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg 
          viewBox="0 0 1440 120" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg" 
          className="w-full"
          preserveAspectRatio="none"
        >
          <polygon points="0,120 1440,40 1440,120" fill="white"/>
        </svg>
      </div>
    </section>
  );
}
