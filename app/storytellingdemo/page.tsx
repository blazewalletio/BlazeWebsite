'use client';

import { useEffect, useRef, useState, useMemo } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, useAnimationFrame } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, Zap, Shield, Brain, QrCode, ChevronDown, Sparkles } from 'lucide-react';

// ============ PARTICLE SYSTEM ============
function ParticleField({ count = 50, color = 'orange' }: { count?: number; color?: string }) {
  const particles = useMemo(() => 
    [...Array(count)].map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    })), [count]
  );

  const colorMap: Record<string, string> = {
    orange: 'bg-orange-500',
    red: 'bg-red-500',
    yellow: 'bg-yellow-400',
    white: 'bg-white',
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className={`absolute rounded-full ${colorMap[color]} opacity-20`}
          style={{
            width: p.size,
            height: p.size,
            left: `${p.x}%`,
            top: `${p.y}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.1, 0.4, 0.1],
            scale: [1, 1.5, 1],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}

// ============ MONEY DRAIN EFFECT ============
function MoneyDrain() {
  const symbols = ['€', '$', '£', '¥', '₿'];
  const items = useMemo(() => 
    [...Array(30)].map((_, i) => ({
      id: i,
      symbol: symbols[i % symbols.length],
      x: Math.random() * 100,
      delay: Math.random() * 8,
      duration: 6 + Math.random() * 4,
      size: 16 + Math.random() * 24,
      opacity: 0.1 + Math.random() * 0.3,
    })), []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {items.map((item) => (
        <motion.div
          key={item.id}
          className="absolute text-red-500/30 font-bold select-none"
          style={{
            left: `${item.x}%`,
            fontSize: item.size,
          }}
          initial={{ y: '-10%', opacity: 0, rotate: 0 }}
          animate={{ 
            y: '110%', 
            opacity: [0, item.opacity, item.opacity, 0],
            rotate: [0, 15, -15, 0],
          }}
          transition={{
            duration: item.duration,
            delay: item.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        >
          {item.symbol}
        </motion.div>
      ))}
    </div>
  );
}

// ============ GLOWING ORB ============
function GlowingOrb({ progress }: { progress: any }) {
  const scale = useTransform(progress, [0.1, 0.3, 0.5], [0, 1, 1.5]);
  const opacity = useTransform(progress, [0.1, 0.25, 0.5, 0.7], [0, 0.8, 1, 0.6]);
  
  return (
    <motion.div 
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10"
      style={{ scale, opacity }}
    >
      {/* Outer glow */}
      <div className="absolute -inset-32 bg-gradient-radial from-orange-500/40 via-yellow-500/20 to-transparent rounded-full blur-3xl" />
      {/* Middle glow */}
      <div className="absolute -inset-16 bg-gradient-radial from-orange-400/60 via-orange-500/30 to-transparent rounded-full blur-2xl" />
      {/* Core */}
      <div className="w-32 h-32 bg-gradient-radial from-yellow-300 via-orange-500 to-orange-600 rounded-full blur-sm" />
      {/* Inner bright spot */}
      <div className="absolute inset-8 bg-white/80 rounded-full blur-md" />
    </motion.div>
  );
}

// ============ FEATURE CARD ============
function FeatureCard({ 
  icon: Icon, 
  label, 
  description,
  gradient,
  index,
  isVisible 
}: { 
  icon: any; 
  label: string; 
  description: string;
  gradient: string;
  index: number;
  isVisible: boolean;
}) {
  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, x: -100, rotateY: -30 }}
      animate={isVisible ? { 
        opacity: 1, 
        x: 0, 
        rotateY: 0,
        transition: { 
          duration: 0.8, 
          delay: index * 0.15,
          ease: [0.25, 0.46, 0.45, 0.94]
        }
      } : {}}
      style={{ perspective: 1000 }}
    >
      {/* Glow on hover */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${gradient} rounded-2xl opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500`} />
      
      <div className="relative flex items-center gap-5 p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300">
        <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${gradient} flex items-center justify-center flex-shrink-0 shadow-lg`}>
          <Icon className="w-7 h-7 text-white" />
        </div>
        <div>
          <div className="text-white font-bold text-lg mb-1">{label}</div>
          <div className="text-gray-400 text-sm">{description}</div>
        </div>
      </div>
    </motion.div>
  );
}

// ============ ANIMATED COUNTER ============
function AnimatedCounter({ value, suffix = '', isVisible }: { value: number; suffix?: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    if (!isVisible) return;
    
    let start = 0;
    const end = value;
    const duration = 2000;
    const increment = end / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    
    return () => clearInterval(timer);
  }, [isVisible, value]);
  
  return <span>{count.toLocaleString()}{suffix}</span>;
}

// ============ TRANSACTION GLOBE ============
function TransactionGlobe({ isVisible }: { isVisible: boolean }) {
  const [pulses, setPulses] = useState<{ id: number; x: number; y: number }[]>([]);
  
  useEffect(() => {
    if (!isVisible) return;
    
    const interval = setInterval(() => {
      const angle = Math.random() * Math.PI * 2;
      const radius = 80 + Math.random() * 40;
      setPulses(prev => [
        ...prev.slice(-10),
        {
          id: Date.now(),
          x: 50 + Math.cos(angle) * radius / 2,
          y: 50 + Math.sin(angle) * radius / 2,
        }
      ]);
    }, 800);
    
    return () => clearInterval(interval);
  }, [isVisible]);

  return (
    <div className="relative w-80 h-80 mx-auto">
      {/* Outer ring */}
      <motion.div 
        className="absolute inset-0 rounded-full border-2 border-orange-500/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Middle ring */}
      <motion.div 
        className="absolute inset-8 rounded-full border border-yellow-500/20"
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Inner ring */}
      <motion.div 
        className="absolute inset-16 rounded-full border border-orange-400/30"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      
      {/* Core glow */}
      <div className="absolute inset-24 rounded-full bg-gradient-radial from-orange-500/40 to-transparent" />
      
      {/* Transaction pulses */}
      {pulses.map((pulse) => (
        <motion.div
          key={pulse.id}
          className="absolute w-3 h-3"
          style={{ left: `${pulse.x}%`, top: `${pulse.y}%` }}
          initial={{ scale: 0, opacity: 1 }}
          animate={{ scale: [0, 2, 3], opacity: [1, 0.5, 0] }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        >
          <div className="w-full h-full rounded-full bg-orange-500 shadow-lg shadow-orange-500/50" />
        </motion.div>
      ))}
      
      {/* Static nodes */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 45;
        return (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-orange-400"
            style={{
              left: `${50 + Math.cos(angle) * radius}%`,
              top: `${50 + Math.sin(angle) * radius}%`,
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        );
      })}
    </div>
  );
}

// ============ MAIN COMPONENT ============
export default function StorytellingDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentAct, setCurrentAct] = useState(1);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Ultra smooth scroll
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.0001,
  });

  // Act opacities with better easing
  const act1Opacity = useTransform(smoothProgress, [0, 0.12, 0.18], [1, 1, 0]);
  const act2Opacity = useTransform(smoothProgress, [0.14, 0.20, 0.32, 0.38], [0, 1, 1, 0]);
  const act3Opacity = useTransform(smoothProgress, [0.34, 0.40, 0.58, 0.64], [0, 1, 1, 0]);
  const act4Opacity = useTransform(smoothProgress, [0.60, 0.66, 0.78, 0.84], [0, 1, 1, 0]);
  const act5Opacity = useTransform(smoothProgress, [0.80, 0.88], [0, 1]);

  // Background transitions
  const bgOpacity = useTransform(smoothProgress, [0, 0.15, 0.35], [1, 1, 0]);
  
  // Track current act
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (v) => {
      if (v < 0.18) setCurrentAct(1);
      else if (v < 0.38) setCurrentAct(2);
      else if (v < 0.64) setCurrentAct(3);
      else if (v < 0.84) setCurrentAct(4);
      else setCurrentAct(5);
    });
    return () => unsubscribe();
  }, [smoothProgress]);

  // iPhone animations
  const iphoneY = useTransform(smoothProgress, [0.34, 0.45, 0.58], [300, 0, -100]);
  const iphoneScale = useTransform(smoothProgress, [0.34, 0.45, 0.58], [0.6, 1, 1.1]);
  const iphoneRotateX = useTransform(smoothProgress, [0.34, 0.45, 0.58], [30, 0, -10]);
  const iphoneRotateY = useTransform(smoothProgress, [0.40, 0.50, 0.58], [-20, 0, 15]);

  const features = [
    { icon: QrCode, label: 'QuickPay', description: 'Scan & pay in 2 seconds', gradient: 'from-orange-500 to-yellow-500' },
    { icon: Brain, label: 'AI Assistant', description: 'Natural language transactions', gradient: 'from-purple-500 to-pink-500' },
    { icon: Shield, label: 'Scam Protection', description: 'Real-time threat detection', gradient: 'from-emerald-500 to-teal-500' },
    { icon: Zap, label: 'Lightning Fast', description: '18 chains, instant swaps', gradient: 'from-sky-500 to-blue-500' },
  ];

  return (
    <div ref={containerRef} className="relative bg-black">
      {/* Progress bar */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left"
        style={{ 
          scaleX: smoothProgress,
          background: 'linear-gradient(90deg, #f97316, #eab308, #f97316)',
        }}
      />

      {/* Act indicator */}
      <div className="fixed top-8 left-8 z-[100] flex items-center gap-3">
        {[1, 2, 3, 4, 5].map((act) => (
          <motion.div 
            key={act}
            className="relative"
            animate={{ scale: currentAct === act ? 1.2 : 1 }}
          >
            <div className={`w-2.5 h-2.5 rounded-full transition-all duration-500 ${
              currentAct >= act 
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500' 
                : 'bg-white/20'
            }`} />
            {currentAct === act && (
              <motion.div 
                className="absolute inset-0 rounded-full bg-orange-500"
                animate={{ scale: [1, 2, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            )}
          </motion.div>
        ))}
        <span className="ml-2 text-white/40 text-sm font-medium">Act {currentAct}</span>
      </div>

      {/* Skip button */}
      <motion.a 
        href="#finale"
        className="fixed top-8 right-8 z-[100] px-5 py-2.5 rounded-full bg-white/5 backdrop-blur-md border border-white/10 text-white/60 text-sm font-medium hover:bg-white/10 hover:text-white transition-all"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Skip intro →
      </motion.a>

      {/* Scroll hint */}
      <motion.div 
        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100] flex flex-col items-center"
        style={{ opacity: useTransform(smoothProgress, [0, 0.05], [1, 0]) }}
      >
        <span className="text-white/40 text-sm mb-3 tracking-wider uppercase">Scroll to begin</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown className="w-6 h-6 text-orange-500/60" />
        </motion.div>
      </motion.div>

      {/* ============ BACKGROUNDS ============ */}
      
      {/* Dark base */}
      <div className="fixed inset-0 bg-[#030303] z-0" />
      
      {/* Red tint for act 1 */}
      <motion.div 
        className="fixed inset-0 z-0 bg-gradient-to-b from-red-950/30 via-transparent to-transparent"
        style={{ opacity: bgOpacity }}
      />

      {/* Glow orb */}
      <GlowingOrb progress={smoothProgress} />

      {/* Slate gradient for later acts */}
      <motion.div 
        className="fixed inset-0 z-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
        style={{ opacity: useTransform(smoothProgress, [0.3, 0.5], [0, 1]) }}
      />

      {/* ============ SCROLL CONTAINER ============ */}
      <div className="relative z-20" style={{ height: '600vh' }}>

        {/* ============ ACT 1: THE DARKNESS ============ */}
        <motion.section 
          className="fixed inset-0 flex items-center justify-center"
          style={{ opacity: act1Opacity, pointerEvents: currentAct === 1 ? 'auto' : 'none' }}
        >
          <MoneyDrain />
          <ParticleField count={30} color="red" />
          
          <div className="relative text-center px-6 max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.5, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div 
                className="text-red-500/60 text-sm uppercase tracking-[0.3em] mb-8 font-medium"
                initial={{ opacity: 0, letterSpacing: '0.5em' }}
                animate={{ opacity: 1, letterSpacing: '0.3em' }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                The uncomfortable truth
              </motion.div>
              
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9] tracking-tight">
                <motion.span 
                  className="block"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  Your money
                </motion.span>
                <motion.span 
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-700"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  is dying.
                </motion.span>
              </h1>
              
              <motion.p
                className="text-xl sm:text-2xl text-gray-500 max-w-2xl mx-auto leading-relaxed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1.2 }}
              >
                Every day you hold cash, inflation eats away at your purchasing power. 
                <span className="text-red-400"> Silently. Relentlessly.</span>
              </motion.p>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="flex justify-center gap-12 mt-16"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 1.8 }}
            >
              {[
                { value: '-8%', label: 'This year' },
                { value: '-40%', label: 'In 5 years' },
                { value: '-64%', label: 'In 10 years' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-4xl sm:text-5xl font-black text-red-500 mb-2">{stat.value}</div>
                  <div className="text-gray-600 text-sm uppercase tracking-wider">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* ============ ACT 2: THE SPARK ============ */}
        <motion.section 
          className="fixed inset-0 flex items-center justify-center"
          style={{ opacity: act2Opacity, pointerEvents: currentAct === 2 ? 'auto' : 'none' }}
        >
          <ParticleField count={60} color="orange" />
          
          <div className="relative text-center px-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={currentAct >= 2 ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <motion.div 
                className="text-orange-500/60 text-sm uppercase tracking-[0.3em] mb-8 font-medium"
                initial={{ opacity: 0 }}
                animate={currentAct >= 2 ? { opacity: 1 } : {}}
                transition={{ delay: 0.3 }}
              >
                But what if...
              </motion.div>

              <h2 className="text-5xl sm:text-7xl lg:text-8xl font-black text-white mb-12 leading-[0.9]">
                <span className="block mb-2">You could</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400">
                  fight back?
                </span>
              </h2>

              {/* BLAZE Logo reveal */}
              <motion.div
                className="relative inline-block"
                initial={{ opacity: 0, scale: 0, rotate: -180 }}
                animate={currentAct >= 2 ? { opacity: 1, scale: 1, rotate: 0 } : {}}
                transition={{ 
                  type: 'spring', 
                  stiffness: 200, 
                  damping: 20,
                  delay: 0.5 
                }}
              >
                {/* Glow rings */}
                <motion.div 
                  className="absolute -inset-8 rounded-full bg-orange-500/30 blur-2xl"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity }}
                />
                <motion.div 
                  className="absolute -inset-4 rounded-full bg-yellow-500/40 blur-xl"
                  animate={{ scale: [1.1, 1, 1.1], opacity: [0.4, 0.6, 0.4] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                
                <Image 
                  src="/blaze-logo.png" 
                  alt="BLAZE" 
                  width={180} 
                  height={180}
                  className="relative rounded-3xl shadow-2xl shadow-orange-500/30"
                />
              </motion.div>

              <motion.div
                className="mt-10 flex items-center justify-center gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={currentAct >= 2 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 1 }}
              >
                <Sparkles className="w-5 h-5 text-orange-400" />
                <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                  Introducing BLAZE
                </span>
                <Sparkles className="w-5 h-5 text-yellow-400" />
              </motion.div>
            </motion.div>
          </div>
        </motion.section>

        {/* ============ ACT 3: THE WEAPON ============ */}
        <motion.section 
          className="fixed inset-0 flex items-center justify-center"
          style={{ opacity: act3Opacity, pointerEvents: currentAct === 3 ? 'auto' : 'none' }}
        >
          <ParticleField count={40} color="yellow" />
          
          <div className="relative w-full max-w-7xl mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Features */}
              <div className="space-y-5 order-2 lg:order-1">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={currentAct >= 3 ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.8 }}
                  className="mb-10"
                >
                  <div className="text-orange-500/60 text-sm uppercase tracking-[0.2em] mb-4 font-medium">
                    Your new weapon
                  </div>
                  <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
                    Everything you need.
                    <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">
                      Nothing you don't.
                    </span>
                  </h2>
                </motion.div>

                {features.map((feature, index) => (
                  <FeatureCard
                    key={feature.label}
                    {...feature}
                    index={index}
                    isVisible={currentAct >= 3}
                  />
                ))}
              </div>

              {/* iPhone */}
              <motion.div 
                className="relative flex justify-center order-1 lg:order-2"
                style={{
                  y: iphoneY,
                  scale: iphoneScale,
                  rotateX: iphoneRotateX,
                  rotateY: iphoneRotateY,
                  transformPerspective: 1200,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Massive glow */}
                <div className="absolute -inset-20 bg-gradient-to-r from-orange-500/30 via-yellow-500/20 to-orange-500/30 rounded-full blur-3xl" />
                
                {/* Phone frame */}
                <div 
                  className="relative rounded-[3rem] p-[3px]"
                  style={{
                    background: 'linear-gradient(145deg, #8a8a8f 0%, #48484a 50%, #8a8a8f 100%)',
                    boxShadow: '0 30px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.1)',
                  }}
                >
                  <div 
                    className="rounded-[2.85rem] p-[10px]"
                    style={{ background: 'linear-gradient(180deg, #3a3a3c 0%, #1c1c1e 100%)' }}
                  >
                    <div 
                      className="relative bg-black rounded-[2.4rem] overflow-hidden"
                      style={{ width: '300px', height: '620px' }}
                    >
                      {/* Dynamic Island */}
                      <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30 bg-black rounded-full w-28 h-8" />
                      
                      {/* Screen */}
                      <Image
                        src="/iphone_screen.png"
                        alt="BLAZE Wallet"
                        fill
                        className="object-cover object-top"
                        priority
                      />
                      
                      {/* Screen reflection */}
                      <div 
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(125deg, rgba(255,255,255,0.1) 0%, transparent 40%)',
                        }}
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* ============ ACT 4: THE PROOF ============ */}
        <motion.section 
          className="fixed inset-0 flex items-center justify-center"
          style={{ opacity: act4Opacity, pointerEvents: currentAct === 4 ? 'auto' : 'none' }}
        >
          <ParticleField count={50} color="orange" />
          
          <div className="relative text-center px-6 max-w-5xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={currentAct >= 4 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <div className="text-orange-500/60 text-sm uppercase tracking-[0.2em] mb-6 font-medium">
                You're not alone
              </div>
              
              <h2 className="text-5xl sm:text-6xl font-black text-white mb-6">
                Join the <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">movement</span>
              </h2>
              
              <p className="text-xl text-gray-400 max-w-xl mx-auto mb-16">
                Thousands are already preparing for the future of payments
              </p>
            </motion.div>

            {/* Stats row */}
            <motion.div 
              className="grid grid-cols-3 gap-8 mb-16"
              initial={{ opacity: 0, y: 30 }}
              animate={currentAct >= 4 ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              {[
                { value: 12000, suffix: '+', label: 'On waitlist' },
                { value: 18, suffix: '', label: 'Blockchains' },
                { value: 2, suffix: 's', label: 'Payment time' },
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-2">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} isVisible={currentAct >= 4} />
                  </div>
                  <div className="text-gray-500 uppercase tracking-wider text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>

            {/* Globe */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={currentAct >= 4 ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 }}
            >
              <TransactionGlobe isVisible={currentAct >= 4} />
            </motion.div>
          </div>
        </motion.section>

        {/* ============ ACT 5: YOUR TURN ============ */}
        <motion.section 
          id="finale"
          className="fixed inset-0 flex items-center justify-center"
          style={{ opacity: act5Opacity, pointerEvents: currentAct === 5 ? 'auto' : 'none' }}
        >
          <ParticleField count={80} color="yellow" />
          
          {/* Background glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-radial from-orange-500/20 to-transparent rounded-full blur-3xl" />
          
          <div className="relative text-center px-6 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={currentAct >= 5 ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <div className="text-orange-500/60 text-sm uppercase tracking-[0.3em] mb-8 font-medium">
                The choice is yours
              </div>

              <h2 className="text-6xl sm:text-7xl lg:text-8xl font-black text-white mb-8 leading-[0.9]">
                <span className="block">Your journey</span>
                <motion.span 
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400"
                  style={{
                    backgroundSize: '200% 100%',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                >
                  starts now.
                </motion.span>
              </h2>

              <p className="text-xl sm:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
                Secure your spot in the presale. Early supporters get 
                <span className="text-orange-400 font-semibold"> 58% off</span> the public launch price.
              </p>

              {/* CTA */}
              <motion.div
                className="flex flex-col sm:flex-row gap-5 justify-center mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={currentAct >= 5 ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 }}
              >
                <motion.a
                  href="/#tokenomics"
                  className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 rounded-2xl font-bold text-lg text-white overflow-hidden"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Animated bg */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500"
                    style={{ backgroundSize: '200% 100%' }}
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  {/* Glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 opacity-0 group-hover:opacity-50 blur-xl transition-opacity" />
                  
                  <span className="relative">Join the presale</span>
                  <ArrowRight className="relative w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </motion.a>

                <motion.a
                  href="/"
                  className="inline-flex items-center justify-center gap-2 px-10 py-5 rounded-2xl font-semibold text-lg text-white border border-white/20 hover:bg-white/10 transition-all"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Explore homepage
                </motion.a>
              </motion.div>

              {/* Price info */}
              <motion.div
                className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm"
                initial={{ opacity: 0 }}
                animate={currentAct >= 5 ? { opacity: 1 } : {}}
                transition={{ delay: 0.8 }}
              >
                <div className="text-center">
                  <div className="text-3xl font-black text-white">$0.00417</div>
                  <div className="text-sm text-gray-500">Early bird</div>
                </div>
                <div className="w-px h-12 bg-white/20" />
                <div className="text-center">
                  <div className="text-3xl font-black text-emerald-400">58% off</div>
                  <div className="text-sm text-gray-500">vs public price</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </motion.section>
      </div>

      {/* Global styles */}
      <style jsx global>{`
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}
