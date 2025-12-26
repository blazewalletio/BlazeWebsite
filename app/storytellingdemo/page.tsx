'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Zap, Shield, Brain, QrCode, ChevronDown } from 'lucide-react';

// Particle component for the darkness scene
function FallingParticle({ delay, x }: { delay: number; x: number }) {
  return (
    <motion.div
      className="absolute w-2 h-2 rounded-full bg-gradient-to-b from-yellow-500/60 to-transparent"
      style={{ left: `${x}%` }}
      initial={{ top: '-5%', opacity: 0 }}
      animate={{ 
        top: '105%', 
        opacity: [0, 0.8, 0.8, 0],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'linear',
      }}
    />
  );
}

// Floating coin that fades away
function FadingCoin({ delay, x, y }: { delay: number; x: number; y: number }) {
  return (
    <motion.div
      className="absolute text-4xl"
      style={{ left: `${x}%`, top: `${y}%` }}
      initial={{ opacity: 0, scale: 1 }}
      animate={{ 
        opacity: [0, 0.6, 0],
        scale: [1, 0.5, 0.2],
        y: [0, 50, 100],
      }}
      transition={{
        duration: 4,
        delay,
        repeat: Infinity,
        ease: 'easeOut',
      }}
    >
      💸
    </motion.div>
  );
}

export default function StorytellingDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentAct, setCurrentAct] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Smooth scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Act transitions based on scroll
  const act1Opacity = useTransform(smoothProgress, [0, 0.15, 0.2], [1, 1, 0]);
  const act2Opacity = useTransform(smoothProgress, [0.15, 0.2, 0.35, 0.4], [0, 1, 1, 0]);
  const act3Opacity = useTransform(smoothProgress, [0.35, 0.4, 0.65, 0.7], [0, 1, 1, 0]);
  const act4Opacity = useTransform(smoothProgress, [0.65, 0.7, 0.82, 0.87], [0, 1, 1, 0]);
  const act5Opacity = useTransform(smoothProgress, [0.82, 0.87, 1], [0, 1, 1]);

  // Background color transition
  const bgColor = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.7, 0.85],
    [
      'rgb(0, 0, 0)',           // Pure black
      'rgb(15, 10, 5)',         // Hint of warmth
      'rgb(30, 20, 10)',        // Warm dark
      'rgb(15, 23, 42)',        // Slate
      'rgb(15, 23, 42)',        // Stay slate
    ]
  );

  // Glow intensity
  const glowOpacity = useTransform(smoothProgress, [0.15, 0.3, 0.5], [0, 0.5, 1]);
  const glowScale = useTransform(smoothProgress, [0.15, 0.4], [0.5, 2]);

  // iPhone transforms
  const iphoneScale = useTransform(smoothProgress, [0.35, 0.5, 0.65], [0.3, 1, 1.5]);
  const iphoneY = useTransform(smoothProgress, [0.35, 0.5, 0.65], [200, 0, -200]);
  const iphoneRotateY = useTransform(smoothProgress, [0.4, 0.5, 0.6], [-30, 0, 30]);

  // Track current act
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (value) => {
      if (value < 0.2) setCurrentAct(1);
      else if (value < 0.4) setCurrentAct(2);
      else if (value < 0.7) setCurrentAct(3);
      else if (value < 0.87) setCurrentAct(4);
      else setCurrentAct(5);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // Features for Act 3
  const features = [
    { icon: QrCode, label: 'QuickPay', color: 'from-orange-500 to-yellow-500' },
    { icon: Brain, label: 'AI Assistant', color: 'from-purple-500 to-pink-500' },
    { icon: Shield, label: 'Scam Protection', color: 'from-emerald-500 to-teal-500' },
    { icon: Zap, label: '2 Second Payments', color: 'from-sky-500 to-blue-500' },
  ];

  return (
    <div ref={containerRef} className="relative">
      {/* Progress indicator */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 to-yellow-500 z-50 origin-left"
        style={{ scaleX: smoothProgress }}
      />

      {/* Act indicator */}
      <div className="fixed top-6 left-6 z-50">
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
          {[1, 2, 3, 4, 5].map((act) => (
            <div 
              key={act}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentAct >= act ? 'bg-orange-500' : 'bg-white/30'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Skip button */}
      <a 
        href="#finale"
        className="fixed top-6 right-6 z-50 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white/70 text-sm hover:bg-white/20 transition-colors"
      >
        Skip to end →
      </a>

      {/* Scroll hint */}
      <motion.div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center text-white/50"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{ opacity: useTransform(smoothProgress, [0, 0.1], [1, 0]) }}
      >
        <span className="text-sm mb-2">Scroll to begin</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>

      {/* Dynamic background */}
      <motion.div 
        className="fixed inset-0 z-0"
        style={{ backgroundColor: bgColor }}
      />

      {/* Central glow effect */}
      <motion.div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full z-10 pointer-events-none"
        style={{ 
          opacity: glowOpacity,
          scale: glowScale,
          background: 'radial-gradient(circle, rgba(249,115,22,0.4) 0%, rgba(234,179,8,0.2) 30%, transparent 70%)',
        }}
      />

      {/* The actual scroll content - 500vh for smooth scrolling */}
      <div className="relative z-20" style={{ height: '500vh' }}>
        
        {/* ============ ACT 1: THE DARKNESS ============ */}
        <motion.section 
          className="fixed inset-0 flex items-center justify-center overflow-hidden"
          style={{ opacity: act1Opacity }}
        >
          {/* Falling money particles */}
          {[...Array(15)].map((_, i) => (
            <FadingCoin 
              key={i} 
              delay={i * 0.5} 
              x={10 + (i * 6)} 
              y={20 + (i % 3) * 20}
            />
          ))}
          
          <div className="text-center px-6 max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Your money loses value.
                <br />
                <span className="text-red-500">Every. Single. Day.</span>
              </h1>
            </motion.div>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.5 }}
              className="text-xl text-gray-400 mb-8"
            >
              8% per year. Gone. While you watch.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 2.5 }}
              className="flex justify-center gap-8 text-gray-500"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">-8%</div>
                <div className="text-sm">Per year</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">-40%</div>
                <div className="text-sm">In 5 years</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-400">-64%</div>
                <div className="text-sm">In 10 years</div>
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* ============ ACT 2: THE SPARK ============ */}
        <motion.section 
          className="fixed inset-0 flex items-center justify-center"
          style={{ opacity: act2Opacity }}
        >
          <div className="text-center px-6">
            <motion.h2 
              className="text-4xl sm:text-6xl lg:text-7xl font-bold text-white mb-8"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
            >
              What if you could
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                fight back?
              </span>
            </motion.h2>

            {/* BLAZE logo reveal */}
            <motion.div
              className="relative inline-block"
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', delay: 0.3 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl blur-2xl opacity-50" />
              <Image 
                src="/blaze-logo.png" 
                alt="BLAZE" 
                width={150} 
                height={150}
                className="relative rounded-3xl"
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-2xl text-orange-300 mt-8 font-medium"
            >
              Introducing BLAZE
            </motion.p>
          </div>
        </motion.section>

        {/* ============ ACT 3: THE WEAPON ============ */}
        <motion.section 
          className="fixed inset-0 flex items-center justify-center"
          style={{ opacity: act3Opacity }}
        >
          <div className="relative w-full max-w-6xl mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Features list */}
              <div className="space-y-6">
                <motion.h2 
                  className="text-3xl sm:text-4xl font-bold text-white mb-8"
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                >
                  Your new weapon against
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                    financial decay
                  </span>
                </motion.h2>

                {features.map((feature, index) => (
                  <motion.div
                    key={feature.label}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center flex-shrink-0`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-white font-semibold text-lg">{feature.label}</span>
                  </motion.div>
                ))}
              </div>

              {/* iPhone */}
              <motion.div 
                className="relative flex justify-center"
                style={{
                  scale: iphoneScale,
                  y: iphoneY,
                  rotateY: iphoneRotateY,
                  transformPerspective: 1000,
                }}
              >
                {/* Glow behind phone */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/30 to-yellow-500/30 rounded-[4rem] blur-3xl" />
                
                {/* Phone frame */}
                <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="bg-black rounded-[2.5rem] overflow-hidden" style={{ width: '280px', height: '560px' }}>
                    <Image
                      src="/iphone_screen.png"
                      alt="BLAZE Wallet"
                      fill
                      className="object-cover object-top"
                    />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ============ ACT 4: THE PROOF ============ */}
        <motion.section 
          className="fixed inset-0 flex items-center justify-center"
          style={{ opacity: act4Opacity }}
        >
          <div className="text-center px-6">
            <motion.h2 
              className="text-4xl sm:text-5xl font-bold text-white mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              You're not alone
            </motion.h2>
            
            <motion.p
              className="text-xl text-gray-400 mb-12"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Thousands are already on the journey
            </motion.p>

            {/* Stats */}
            <motion.div 
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-center">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-2">
                  12K+
                </div>
                <div className="text-gray-400">Waitlist</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-2">
                  18
                </div>
                <div className="text-gray-400">Blockchains</div>
              </div>
              <div className="text-center">
                <div className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-2">
                  2s
                </div>
                <div className="text-gray-400">Payments</div>
              </div>
            </motion.div>

            {/* Globe visualization placeholder */}
            <motion.div
              className="mt-12 relative w-64 h-64 mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
            >
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-500/20 to-yellow-500/20 animate-pulse" />
              <div className="absolute inset-4 rounded-full border border-orange-500/30" />
              <div className="absolute inset-8 rounded-full border border-yellow-500/20" />
              <div className="absolute inset-12 rounded-full border border-orange-500/10" />
              
              {/* Animated dots representing transactions */}
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-orange-500 rounded-full"
                  style={{
                    left: `${50 + 40 * Math.cos(i * Math.PI / 4)}%`,
                    top: `${50 + 40 * Math.sin(i * Math.PI / 4)}%`,
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.2,
                    repeat: Infinity,
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ============ ACT 5: YOUR TURN ============ */}
        <motion.section 
          id="finale"
          className="fixed inset-0 flex items-center justify-center"
          style={{ opacity: act5Opacity }}
        >
          <div className="text-center px-6 max-w-3xl">
            <motion.h2 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Your journey
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 animate-gradient">
                starts now
              </span>
            </motion.h2>

            <motion.p
              className="text-xl text-gray-300 mb-10"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Join the presale. Get early access. Fight back.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <a
                href="/#tokenomics"
                className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 overflow-hidden rounded-2xl font-bold text-lg text-white transition-all"
              >
                {/* Animated gradient background */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 bg-[length:200%_100%] animate-gradient" />
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-50 blur-xl group-hover:opacity-75 transition-opacity" />
                
                <span className="relative">Join the presale</span>
                <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/"
                className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-2xl font-semibold text-lg text-white border border-white/30 hover:bg-white/10 transition-colors"
              >
                Back to homepage
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              className="flex justify-center gap-8 mt-12 text-gray-500"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-white">$0.00417</div>
                <div className="text-sm">Early bird price</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-emerald-400">58% off</div>
                <div className="text-sm">vs public launch</div>
              </div>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Gradient animation CSS */}
      <style jsx global>{`
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-gradient {
          animation: gradient 3s ease infinite;
        }
      `}</style>
    </div>
  );
}

