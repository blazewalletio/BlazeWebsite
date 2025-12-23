'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Shield, Zap, CheckCircle, QrCode } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function Hero() {
  const [isHovering, setIsHovering] = useState(false);

  // Mouse tracking for 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-15, 15]), springConfig);

  // Auto-animation when not hovering
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        const time = Date.now() / 2000;
        mouseX.set(Math.sin(time) * 100);
        mouseY.set(Math.cos(time) * 50);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isHovering, mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
  };

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

          {/* Right: 3D iPhone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative flex justify-center lg:justify-end"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ perspective: 1000 }}
          >
            {/* 3D iPhone Container */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative"
            >
              {/* Glow effect behind phone */}
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-[3rem] blur-2xl opacity-30 scale-90" />
              
              {/* iPhone Frame */}
              <div 
                className="relative bg-[#1a1a1a] rounded-[3rem] p-[14px] shadow-2xl"
                style={{
                  boxShadow: `
                    0 0 0 1px rgba(255,255,255,0.1),
                    0 25px 50px -12px rgba(0,0,0,0.8),
                    0 0 100px rgba(249, 115, 22, 0.2)
                  `,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* iPhone inner bezel */}
                <div className="relative bg-black rounded-[2.5rem] overflow-hidden"
                  style={{
                    width: '280px',
                    height: '580px',
                  }}
                >
                  {/* Dynamic Island */}
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20">
                    <div className="bg-black rounded-full px-6 py-2 flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-[#1a1a1a]" />
                      <div className="w-2 h-2 rounded-full bg-[#0a3d2e]" />
                    </div>
                  </div>
                  
                  {/* Screen Content - Your screenshot */}
                  <div className="absolute inset-0">
                    <Image
                      src="/iphone_screen.png"
                      alt="BLAZE Wallet App"
                      fill
                      className="object-cover object-top"
                      priority
                      sizes="280px"
                    />
                  </div>
                  
                  {/* Screen reflection */}
                  <div 
                    className="absolute inset-0 pointer-events-none z-10"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%, transparent 100%)',
                    }}
                  />
                </div>
                
                {/* Side buttons */}
                <div className="absolute -left-[2px] top-28 w-[3px] h-8 bg-[#2a2a2a] rounded-l" />
                <div className="absolute -left-[2px] top-44 w-[3px] h-12 bg-[#2a2a2a] rounded-l" />
                <div className="absolute -left-[2px] top-60 w-[3px] h-12 bg-[#2a2a2a] rounded-l" />
                <div className="absolute -right-[2px] top-36 w-[3px] h-16 bg-[#2a2a2a] rounded-r" />
              </div>
              
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-2 -right-8 bg-white rounded-2xl shadow-xl p-3 border border-gray-100 hidden lg:block"
                style={{ transform: 'translateZ(40px)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                    <Zap className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-xs">2 seconds</div>
                    <div className="text-[10px] text-gray-500">Payment time</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-2 -left-8 bg-white rounded-2xl shadow-xl p-3 border border-gray-100 hidden lg:block"
                style={{ transform: 'translateZ(40px)' }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <Shield className="w-4 h-4 text-orange-600" />
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900 text-xs">Secured</div>
                    <div className="text-[10px] text-gray-500">Non-custodial</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
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
