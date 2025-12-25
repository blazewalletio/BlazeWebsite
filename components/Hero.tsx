'use client';

import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowRight, Shield, Zap, CheckCircle, QrCode, Sparkles } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState, useRef } from 'react';

export default function Hero() {
  const [isHovering, setIsHovering] = useState(false);
  const [mounted, setMounted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Mouse tracking for spotlight and 3D effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const spotlightX = useMotionValue(50);
  const spotlightY = useMotionValue(50);

  // Smooth spring animations
  const springConfig = { damping: 30, stiffness: 200 };
  const rotateX = useSpring(useTransform(mouseY, [-300, 300], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-300, 300], [-12, 12]), springConfig);
  
  // Slower rotation for cinematic feel
  const [autoRotate, setAutoRotate] = useState(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Cinematic auto-rotation when not hovering
  useEffect(() => {
    if (!isHovering) {
      const interval = setInterval(() => {
        setAutoRotate(prev => (prev + 0.3) % 360);
        const time = Date.now() / 3000;
        mouseX.set(Math.sin(time) * 80);
        mouseY.set(Math.cos(time * 0.7) * 40);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isHovering, mouseX, mouseY]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouseX.set(e.clientX - centerX);
    mouseY.set(e.clientY - centerY);
    
    // Spotlight follows mouse
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    spotlightX.set(x);
    spotlightY.set(y);
  };

  const trustBadges = [
    { text: 'Pay anywhere' },
    { text: 'Non-custodial' },
    { text: 'Instant payments' },
  ];

  return (
    <section className="relative min-h-screen flex items-center pt-20 md:pt-0 overflow-hidden">
      {/* Deep cinematic background */}
      <div className="absolute inset-0 bg-[#0a0a0f]" />
      
      {/* Animated gradient orbs */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-0 left-1/4 w-[800px] h-[800px] bg-gradient-to-r from-orange-600/30 to-amber-500/20 rounded-full blur-[120px]" 
      />
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-gradient-to-r from-violet-600/20 to-blue-500/20 rounded-full blur-[100px]" 
      />
      
      {/* Spotlight effect that follows cursor */}
      <motion.div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([x, y]) => `radial-gradient(circle 400px at ${x}% ${y}%, rgba(249, 115, 22, 0.15), transparent 70%)`
          ),
        }}
      />
      
      {/* Film grain overlay for cinematic feel */}
      <div 
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      
      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center py-12 lg:py-20">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-orange-300 font-medium text-sm mb-6"
            >
              <Sparkles className="w-4 h-4" />
              Pay with crypto everywhere
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-6 leading-[1.1] tracking-tight"
            >
              Your crypto{' '}
              <span className="relative">
                <span className="text-gradient-brand">wallet</span>
                <motion.span 
                  className="absolute -inset-1 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 blur-xl rounded-lg"
                  animate={{ opacity: [0.5, 0.8, 0.5] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
              </span>
              <br />for everyday life
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-lg sm:text-xl text-gray-400 mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed"
            >
              Pay at the coffee shop, supermarket, or anywhere – just scan a QR code. Crypto payments in seconds, not minutes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
            >
              <a
                href="https://my.blazewallet.io"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-orange-500 to-amber-500 rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(249,115,22,0.4)]"
              >
                <span className="relative z-10">Start paying with crypto</span>
                <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="#quickpay"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold text-white bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl hover:bg-white/10 hover:border-white/20 transition-all duration-300"
              >
                <QrCode className="w-5 h-5" />
                See QuickPay
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 justify-center lg:justify-start"
            >
              {trustBadges.map((badge, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-500"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-500" />
                  <span className="font-medium">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Cinematic 3D iPhone */}
          <motion.div
            ref={containerRef}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            style={{ perspective: 1200 }}
          >
            {/* Cinematic lighting setup */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {/* Key light */}
              <motion.div 
                animate={{ 
                  opacity: [0.6, 0.8, 0.6],
                  scale: [1, 1.1, 1],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute w-[500px] h-[500px] bg-gradient-to-br from-orange-500/40 via-transparent to-transparent rounded-full blur-3xl -top-20 -right-20"
              />
              {/* Fill light */}
              <motion.div 
                animate={{ 
                  opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute w-[400px] h-[400px] bg-gradient-to-tr from-blue-500/20 via-transparent to-transparent rounded-full blur-3xl -bottom-20 -left-20"
              />
            </div>

            {/* 3D iPhone Container */}
            <motion.div
              style={{
                rotateX,
                rotateY,
                transformStyle: 'preserve-3d',
              }}
              className="relative"
            >
              {/* Floor reflection */}
              <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 w-[350px] h-[200px]">
                <div 
                  className="w-full h-full"
                  style={{
                    background: 'linear-gradient(to bottom, rgba(249, 115, 22, 0.2), transparent)',
                    filter: 'blur(40px)',
                    transform: 'rotateX(60deg) scale(1, 0.5)',
                  }}
                />
              </div>
              
              {/* Main device shadow */}
              <motion.div 
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[200px] h-[40px] bg-black/50 rounded-full blur-2xl"
                animate={{ 
                  scale: [1, 1.05, 1],
                  opacity: [0.5, 0.3, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              {/* Lens flare effect */}
              <motion.div
                className="absolute -top-10 -right-10 w-32 h-32 pointer-events-none"
                animate={{ 
                  opacity: [0, 0.6, 0],
                  scale: [0.8, 1.2, 0.8],
                  rotate: [0, 180, 360],
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="w-full h-full bg-gradient-to-r from-orange-400/60 via-yellow-300/40 to-transparent rounded-full blur-xl" />
              </motion.div>

              {/* iPhone 15 Pro Frame */}
              <motion.div 
                className="relative"
                animate={{ 
                  y: [0, -8, 0],
                }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                {/* Titanium outer frame */}
                <div 
                  className="relative rounded-[55px] p-[3px]"
                  style={{
                    background: 'linear-gradient(145deg, #3a3a3f 0%, #1a1a1f 50%, #2a2a2f 100%)',
                    boxShadow: `
                      0 50px 100px -20px rgba(0,0,0,0.8),
                      0 30px 60px -10px rgba(0,0,0,0.6),
                      inset 0 1px 0 rgba(255,255,255,0.1),
                      0 0 0 1px rgba(255,255,255,0.05)
                    `,
                  }}
                >
                  {/* Inner titanium bezel */}
                  <div 
                    className="relative rounded-[52px] p-[12px]"
                    style={{
                      background: 'linear-gradient(145deg, #2a2a2f 0%, #1a1a1f 100%)',
                    }}
                  >
                    {/* Screen bezel (black) */}
                    <div 
                      className="relative bg-black rounded-[42px] overflow-hidden"
                      style={{
                        width: '290px',
                        height: '620px',
                      }}
                    >
                      {/* Dynamic Island */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-30">
                        <motion.div 
                          className="bg-black rounded-full flex items-center justify-center"
                          style={{
                            width: '120px',
                            height: '36px',
                            boxShadow: 'inset 0 0 10px rgba(0,0,0,0.8)',
                          }}
                          animate={{
                            width: ['120px', '126px', '120px'],
                          }}
                          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        >
                          {/* Camera */}
                          <div className="w-3 h-3 rounded-full bg-[#1a1a2e] mr-6 relative">
                            <div className="absolute inset-0.5 rounded-full bg-[#0f0f1a]" />
                            <motion.div 
                              className="absolute inset-1 rounded-full bg-blue-900/30"
                              animate={{ opacity: [0.3, 0.6, 0.3] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            />
                          </div>
                        </motion.div>
                      </div>
                      
                      {/* Screen Content */}
                      <div className="absolute inset-0">
                        <Image
                          src="/iphone_screen.png"
                          alt="BLAZE Wallet App"
                          fill
                          className="object-cover object-top"
                          priority
                          sizes="290px"
                        />
                      </div>
                      
                      {/* Screen glass reflection */}
                      <motion.div 
                        className="absolute inset-0 pointer-events-none z-20"
                        style={{
                          background: 'linear-gradient(125deg, rgba(255,255,255,0.15) 0%, transparent 40%, transparent 60%, rgba(255,255,255,0.05) 100%)',
                        }}
                        animate={{
                          opacity: [1, 0.7, 1],
                        }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      />
                      
                      {/* Subtle screen glow */}
                      <div 
                        className="absolute inset-0 pointer-events-none z-10"
                        style={{
                          boxShadow: 'inset 0 0 60px rgba(255,255,255,0.03)',
                        }}
                      />
                    </div>
                  </div>
                  
                  {/* Physical buttons - Left side */}
                  {/* Silent switch */}
                  <div 
                    className="absolute -left-[1px] top-[120px] w-[4px] h-[32px] rounded-l-sm"
                    style={{
                      background: 'linear-gradient(90deg, #2a2a2f 0%, #3a3a3f 100%)',
                    }}
                  />
                  {/* Volume up */}
                  <div 
                    className="absolute -left-[1px] top-[170px] w-[4px] h-[60px] rounded-l-sm"
                    style={{
                      background: 'linear-gradient(90deg, #2a2a2f 0%, #3a3a3f 100%)',
                    }}
                  />
                  {/* Volume down */}
                  <div 
                    className="absolute -left-[1px] top-[245px] w-[4px] h-[60px] rounded-l-sm"
                    style={{
                      background: 'linear-gradient(90deg, #2a2a2f 0%, #3a3a3f 100%)',
                    }}
                  />
                  {/* Power button - Right side */}
                  <div 
                    className="absolute -right-[1px] top-[180px] w-[4px] h-[80px] rounded-r-sm"
                    style={{
                      background: 'linear-gradient(90deg, #3a3a3f 0%, #2a2a2f 100%)',
                    }}
                  />
                </div>
              </motion.div>
              
              {/* Floating info cards */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0, y: [0, -10, 0] }}
                transition={{ 
                  opacity: { delay: 1, duration: 0.5 },
                  y: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                }}
                className="absolute -top-4 -right-16 hidden lg:block"
                style={{ transform: 'translateZ(60px)' }}
              >
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                      <Zap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">2 seconds</div>
                      <div className="text-xs text-gray-500">Payment time</div>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0, y: [0, 10, 0] }}
                transition={{ 
                  opacity: { delay: 1.2, duration: 0.5 },
                  y: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }
                }}
                className="absolute -bottom-4 -left-16 hidden lg:block"
                style={{ transform: 'translateZ(60px)' }}
              >
                <div className="bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl p-4 border border-gray-100">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-bold text-gray-900">Secured</div>
                      <div className="text-xs text-gray-500">Non-custodial</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Cinematic bottom transition */}
      <div className="absolute bottom-0 left-0 right-0">
        <div className="h-32 bg-gradient-to-t from-white via-white/80 to-transparent" />
      </div>
    </section>
  );
}
