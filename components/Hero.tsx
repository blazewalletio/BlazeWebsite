'use client';

import { motion } from 'framer-motion';
import { ArrowRight, CheckCircle, QrCode } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

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
  const [animationPhase, setAnimationPhase] = useState<'loading' | 'glitch' | 'materialize' | 'complete'>('loading');

  useEffect(() => {
    // Animation timeline
    const timeline = [
      { phase: 'glitch' as const, delay: 300 },
      { phase: 'materialize' as const, delay: 1500 },
      { phase: 'complete' as const, delay: 2500 },
    ];

    const timeouts = timeline.map(({ phase, delay }) => 
      setTimeout(() => setAnimationPhase(phase), delay)
    );

    return () => timeouts.forEach(clearTimeout);
  }, []);

  const trustBadges = [
    { text: 'Pay anywhere' },
    { text: 'Non-custodial' },
    { text: 'Instant payments' },
  ];

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
      
      {/* Floating Crypto Icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {floatingIcons.map((icon) => (
          <motion.div
            key={icon.symbol}
            className="absolute"
            style={{ left: icon.x, top: icon.y }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ 
              opacity: [0.15, 0.3, 0.15],
              scale: [0.8, 1, 0.8],
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: icon.duration,
              delay: icon.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <div 
              className="w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center backdrop-blur-sm"
              style={{ 
                backgroundColor: `${icon.color}15`,
                border: `1px solid ${icon.color}30`,
                boxShadow: `0 0 30px ${icon.color}20`,
              }}
            >
              <span 
                className="font-bold text-xs md:text-sm"
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
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 text-orange-300 font-medium text-sm mb-6"
            >
              <QrCode className="w-4 h-4" />
              Pay with crypto everywhere
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
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
              transition={{ delay: 0.3 }}
              className="text-lg sm:text-xl text-gray-300 mb-8 max-w-lg mx-auto lg:mx-0"
            >
              Pay at the coffee shop, supermarket, or anywhere – just scan a QR code. Crypto payments in seconds, not minutes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
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
              transition={{ delay: 0.5 }}
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

          {/* Right: Holographic iPhone with Entry Animation */}
          <div className="relative flex justify-center lg:justify-end">
            {/* Holographic container */}
            <div className={`iphone-hologram ${animationPhase}`}>
              
              {/* Scanlines overlay - always visible during loading/glitch */}
              <div className={`scanlines ${animationPhase === 'complete' ? 'opacity-0' : 'opacity-100'}`} />
              
              {/* RGB Glitch layers */}
              <div className={`glitch-container ${animationPhase}`}>
                {/* Red channel */}
                <div className="glitch-layer glitch-red" />
                {/* Blue channel */}
                <div className="glitch-layer glitch-blue" />
              </div>
              
              {/* Main iPhone */}
              <div className={`iphone-main ${animationPhase}`}>
                {/* Ambient glow */}
                <div className={`iphone-glow ${animationPhase === 'complete' ? 'opacity-60' : 'opacity-0'}`} />
                
                {/* iPhone 15 Pro Frame */}
                <div className="iphone-frame">
                  {/* Inner bezel */}
                  <div className="iphone-bezel">
                    {/* Screen */}
                    <div className="iphone-screen">
                      {/* Dynamic Island */}
                      <div className="dynamic-island">
                        <div className="dynamic-island-inner">
                          <div className="dynamic-island-camera" />
                        </div>
                      </div>
                      
                      {/* Screen Content */}
                      <div className="screen-content">
                        <Image
                          src="/iphone_screen.jpeg"
                          alt="BLAZE Wallet App"
                          fill
                          className="object-cover object-top"
                          priority
                          sizes="280px"
                        />
                      </div>
                      
                      {/* Power-on flash */}
                      <div className={`power-flash ${animationPhase === 'materialize' ? 'animate-flash' : ''}`} />
                      
                      {/* Glass reflection */}
                      <div className="glass-reflection" />
                    </div>
                  </div>
                  
                  {/* Side buttons */}
                  <div className="side-button silent-switch" />
                  <div className="side-button volume-up" />
                  <div className="side-button volume-down" />
                  <div className="side-button power" />
                </div>
              </div>
              
              {/* Data stream particles */}
              <div className={`data-particles ${animationPhase === 'loading' || animationPhase === 'glitch' ? 'active' : ''}`}>
                {[...Array(20)].map((_, i) => (
                  <div key={i} className="particle" style={{ 
                    '--delay': `${i * 0.1}s`,
                    '--x': `${Math.random() * 100}%`,
                    '--duration': `${0.5 + Math.random() * 1}s`
                  } as React.CSSProperties} />
                ))}
              </div>
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
      
      {/* Holographic Animation Styles */}
      <style jsx>{`
        /* Main container */
        .iphone-hologram {
          position: relative;
          width: 306px;
          height: 630px;
        }
        
        /* Scanlines */
        .scanlines {
          position: absolute;
          inset: -20px;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(0, 255, 255, 0.03) 2px,
            rgba(0, 255, 255, 0.03) 4px
          );
          pointer-events: none;
          z-index: 100;
          transition: opacity 0.5s ease-out;
          animation: scanline-move 0.1s linear infinite;
        }
        
        @keyframes scanline-move {
          0% { transform: translateY(0); }
          100% { transform: translateY(4px); }
        }
        
        /* Glitch container */
        .glitch-container {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 50;
        }
        
        .glitch-container.loading,
        .glitch-container.glitch {
          animation: glitch-skew 0.5s infinite linear alternate-reverse;
        }
        
        .glitch-container.materialize,
        .glitch-container.complete {
          animation: none;
          opacity: 0;
        }
        
        .glitch-layer {
          position: absolute;
          inset: 0;
          background: inherit;
          opacity: 0;
        }
        
        .glitch-container.glitch .glitch-red {
          animation: glitch-red 0.3s infinite linear alternate-reverse;
        }
        
        .glitch-container.glitch .glitch-blue {
          animation: glitch-blue 0.3s infinite linear alternate-reverse;
        }
        
        @keyframes glitch-skew {
          0% { transform: skew(0deg); }
          20% { transform: skew(-2deg); }
          40% { transform: skew(1deg); }
          60% { transform: skew(-1deg); }
          80% { transform: skew(2deg); }
          100% { transform: skew(0deg); }
        }
        
        @keyframes glitch-red {
          0%, 100% { 
            opacity: 0;
            transform: translate(0, 0);
          }
          20% { 
            opacity: 0.8;
            transform: translate(-5px, 2px);
            filter: hue-rotate(-60deg);
          }
          40% { 
            opacity: 0;
            transform: translate(3px, -1px);
          }
          60% { 
            opacity: 0.6;
            transform: translate(-3px, 1px);
            filter: hue-rotate(-60deg);
          }
          80% { 
            opacity: 0;
            transform: translate(2px, -2px);
          }
        }
        
        @keyframes glitch-blue {
          0%, 100% { 
            opacity: 0;
            transform: translate(0, 0);
          }
          15% { 
            opacity: 0;
            transform: translate(2px, -1px);
          }
          35% { 
            opacity: 0.7;
            transform: translate(4px, 1px);
            filter: hue-rotate(60deg);
          }
          55% { 
            opacity: 0;
            transform: translate(-2px, 2px);
          }
          75% { 
            opacity: 0.5;
            transform: translate(3px, -1px);
            filter: hue-rotate(60deg);
          }
        }
        
        /* Main iPhone */
        .iphone-main {
          position: relative;
          transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);
        }
        
        .iphone-main.loading {
          opacity: 0;
          transform: scale(0.95) translateY(20px);
          filter: blur(10px);
        }
        
        .iphone-main.glitch {
          opacity: 0.7;
          transform: scale(0.98) translateY(10px);
          filter: blur(2px) saturate(1.5);
          animation: hologram-flicker 0.15s infinite;
        }
        
        .iphone-main.materialize {
          opacity: 1;
          transform: scale(1) translateY(0);
          filter: blur(0) saturate(1);
        }
        
        .iphone-main.complete {
          opacity: 1;
          transform: scale(1) translateY(0);
          filter: none;
        }
        
        @keyframes hologram-flicker {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.9; }
        }
        
        /* Glow */
        .iphone-glow {
          position: absolute;
          inset: -32px;
          background: radial-gradient(ellipse at center, rgba(249, 115, 22, 0.4) 0%, rgba(234, 179, 8, 0.2) 40%, transparent 70%);
          border-radius: 4rem;
          filter: blur(40px);
          transition: opacity 0.8s ease-out;
          z-index: -1;
        }
        
        /* iPhone Frame */
        .iphone-frame {
          position: relative;
          border-radius: 3rem;
          padding: 3px;
          background: linear-gradient(145deg, #8a8a8f 0%, #6e6e73 25%, #48484a 50%, #6e6e73 75%, #8a8a8f 100%);
          box-shadow: 
            0 0 0 1px rgba(255,255,255,0.1),
            0 4px 6px rgba(0,0,0,0.3),
            0 10px 20px rgba(0,0,0,0.4),
            0 30px 60px rgba(0,0,0,0.5),
            inset 0 1px 0 rgba(255,255,255,0.2);
        }
        
        .iphone-bezel {
          border-radius: 2.85rem;
          padding: 10px;
          background: linear-gradient(180deg, #3a3a3c 0%, #2c2c2e 50%, #1c1c1e 100%);
          box-shadow: inset 0 1px 2px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(0,0,0,0.3);
        }
        
        .iphone-screen {
          position: relative;
          width: 280px;
          height: 590px;
          background: black;
          border-radius: 2.4rem;
          overflow: hidden;
          box-shadow: inset 0 0 1px 1px rgba(0,0,0,0.8);
        }
        
        /* Dynamic Island */
        .dynamic-island {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 30;
        }
        
        .dynamic-island-inner {
          width: 120px;
          height: 34px;
          background: black;
          border-radius: 9999px;
          display: flex;
          align-items: center;
          box-shadow: 0 0 0 1px rgba(255,255,255,0.05);
        }
        
        .dynamic-island-camera {
          position: absolute;
          left: 20px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: radial-gradient(circle at 30% 30%, #2a2a4a, #0a0a15);
          box-shadow: inset 0 0 2px rgba(0,0,0,0.8);
        }
        
        .dynamic-island-camera::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: rgba(74, 74, 106, 0.6);
        }
        
        /* Screen content */
        .screen-content {
          position: absolute;
          inset: 0;
        }
        
        /* Power flash */
        .power-flash {
          position: absolute;
          inset: 0;
          background: white;
          opacity: 0;
          z-index: 20;
          pointer-events: none;
        }
        
        .power-flash.animate-flash {
          animation: power-on 0.6s ease-out forwards;
        }
        
        @keyframes power-on {
          0% { opacity: 0; }
          10% { opacity: 0.8; }
          100% { opacity: 0; }
        }
        
        /* Glass reflection */
        .glass-reflection {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            125deg, 
            rgba(255,255,255,0.08) 0%, 
            transparent 25%,
            transparent 60%,
            rgba(255,255,255,0.02) 100%
          );
          pointer-events: none;
          z-index: 10;
        }
        
        /* Side buttons */
        .side-button {
          position: absolute;
          width: 4px;
          background: linear-gradient(90deg, #5a5a5c, #7a7a7c, #5a5a5c);
        }
        
        .silent-switch {
          left: -2px;
          top: 100px;
          height: 28px;
          border-radius: 2px 0 0 2px;
          box-shadow: -1px 0 2px rgba(0,0,0,0.3);
        }
        
        .volume-up {
          left: -2px;
          top: 145px;
          height: 50px;
          border-radius: 2px 0 0 2px;
          box-shadow: -1px 0 2px rgba(0,0,0,0.3);
        }
        
        .volume-down {
          left: -2px;
          top: 205px;
          height: 50px;
          border-radius: 2px 0 0 2px;
          box-shadow: -1px 0 2px rgba(0,0,0,0.3);
        }
        
        .power {
          right: -2px;
          top: 160px;
          height: 70px;
          border-radius: 0 2px 2px 0;
          box-shadow: 1px 0 2px rgba(0,0,0,0.3);
        }
        
        /* Data particles */
        .data-particles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 60;
          overflow: hidden;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .data-particles.active {
          opacity: 1;
        }
        
        .particle {
          position: absolute;
          width: 2px;
          height: 8px;
          background: linear-gradient(to bottom, transparent, #00ffff, transparent);
          left: var(--x);
          animation: particle-fall var(--duration) var(--delay) infinite linear;
          opacity: 0.6;
        }
        
        @keyframes particle-fall {
          0% {
            transform: translateY(-20px);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
          }
          90% {
            opacity: 0.6;
          }
          100% {
            transform: translateY(650px);
            opacity: 0;
          }
        }
        
        /* Mobile adjustments */
        @media (max-width: 640px) {
          .iphone-hologram {
            transform: scale(0.85);
            transform-origin: center;
          }
        }
      `}</style>
    </section>
  );
}
