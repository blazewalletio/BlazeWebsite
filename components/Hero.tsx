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
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-12, 12]), springConfig);

  // Auto-animation when not hovering
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        const time = Date.now() / 3000;
        mouseX.set(Math.sin(time) * 80);
        mouseY.set(Math.cos(time) * 40);
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

          {/* Right: Premium Glass iPhone */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="relative flex justify-center lg:justify-end"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ perspective: 1200 }}
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
              {/* Ambient glow */}
              <div className="absolute -inset-8 bg-gradient-to-r from-orange-500/40 via-pink-500/30 to-purple-500/40 rounded-[4rem] blur-3xl opacity-60 animate-pulse" 
                style={{ animationDuration: '4s' }}
              />
              
              {/* Secondary glow for depth */}
              <div className="absolute -inset-4 bg-gradient-to-br from-orange-400/30 to-yellow-400/30 rounded-[3.5rem] blur-2xl opacity-50" />
              
              {/* iPhone 15 Pro Frame - Titanium finish */}
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
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Inner titanium bezel */}
                <div 
                  className="rounded-[2.85rem] p-[10px]"
                  style={{
                    background: 'linear-gradient(180deg, #3a3a3c 0%, #2c2c2e 50%, #1c1c1e 100%)',
                    boxShadow: 'inset 0 1px 2px rgba(255,255,255,0.1), inset 0 -1px 2px rgba(0,0,0,0.3)',
                  }}
                >
                  {/* Screen container with realistic bezels */}
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
                        {/* Camera */}
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
                        src="/iphone_screen.png"
                        alt="BLAZE Wallet App"
                        fill
                        className="object-cover object-top"
                        priority
                        sizes="280px"
                      />
                    </div>
                    
                    {/* Animated light reflection - moving shine */}
                    <div 
                      className="absolute inset-0 pointer-events-none z-20 overflow-hidden"
                    >
                      {/* Main moving shine */}
                      <div 
                        className="absolute w-[200%] h-[200%] -top-1/2 -left-1/2 animate-shine"
                        style={{
                          background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.03) 45%, rgba(255,255,255,0.08) 50%, rgba(255,255,255,0.03) 55%, transparent 60%)',
                        }}
                      />
                    </div>
                    
                    {/* Static glass reflection overlay */}
                    <div 
                      className="absolute inset-0 pointer-events-none z-10"
                      style={{
                        background: `
                          linear-gradient(
                            125deg, 
                            rgba(255,255,255,0.08) 0%, 
                            transparent 25%,
                            transparent 60%,
                            rgba(255,255,255,0.02) 100%
                          )
                        `,
                      }}
                    />
                    
                    {/* Edge highlight - top */}
                    <div 
                      className="absolute top-0 left-4 right-4 h-[1px] z-20"
                      style={{
                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                      }}
                    />
                  </div>
                </div>
                
                {/* Side buttons - Titanium style */}
                {/* Silent switch */}
                <div 
                  className="absolute -left-[2px] top-[100px] w-[4px] h-[28px] rounded-l-sm"
                  style={{
                    background: 'linear-gradient(90deg, #5a5a5c, #7a7a7c, #5a5a5c)',
                    boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
                  }}
                />
                {/* Volume up */}
                <div 
                  className="absolute -left-[2px] top-[145px] w-[4px] h-[50px] rounded-l-sm"
                  style={{
                    background: 'linear-gradient(90deg, #5a5a5c, #7a7a7c, #5a5a5c)',
                    boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
                  }}
                />
                {/* Volume down */}
                <div 
                  className="absolute -left-[2px] top-[205px] w-[4px] h-[50px] rounded-l-sm"
                  style={{
                    background: 'linear-gradient(90deg, #5a5a5c, #7a7a7c, #5a5a5c)',
                    boxShadow: '-1px 0 2px rgba(0,0,0,0.3)',
                  }}
                />
                {/* Power button */}
                <div 
                  className="absolute -right-[2px] top-[160px] w-[4px] h-[70px] rounded-r-sm"
                  style={{
                    background: 'linear-gradient(90deg, #5a5a5c, #7a7a7c, #5a5a5c)',
                    boxShadow: '1px 0 2px rgba(0,0,0,0.3)',
                  }}
                />
              </div>
              
              {/* Floating badges */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-2xl p-3 border border-gray-100 hidden lg:block"
                style={{ 
                  transform: 'translateZ(60px)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)',
                }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">2 seconds</div>
                    <div className="text-[11px] text-gray-500">Payment time</div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute -bottom-4 -left-6 bg-white rounded-2xl shadow-2xl p-3 border border-gray-100 hidden lg:block"
                style={{ 
                  transform: 'translateZ(60px)',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05)',
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
      
      {/* CSS for shine animation */}
      <style jsx>{`
        @keyframes shine {
          0% {
            transform: translateX(-100%) rotate(0deg);
          }
          100% {
            transform: translateX(100%) rotate(0deg);
          }
        }
        .animate-shine {
          animation: shine 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
