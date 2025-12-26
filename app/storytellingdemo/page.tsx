'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';
import Image from 'next/image';
import { ArrowRight, ChevronDown, ArrowUp, QrCode, Brain, Shield, Zap } from 'lucide-react';

export default function StorytellingDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentAct, setCurrentAct] = useState(1);
  const [showHint, setShowHint] = useState(true);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 50,
    mass: 0.3,
  });

  const act1Opacity = useTransform(smoothProgress, [0, 0.18, 0.22], [1, 1, 0]);
  const act2Opacity = useTransform(smoothProgress, [0.18, 0.22, 0.38, 0.42], [0, 1, 1, 0]);
  const act3Opacity = useTransform(smoothProgress, [0.38, 0.42, 0.68, 0.72], [0, 1, 1, 0]);
  const act4Opacity = useTransform(smoothProgress, [0.68, 0.72, 0.85, 0.88], [0, 1, 1, 0]);
  const act5Opacity = useTransform(smoothProgress, [0.85, 0.88, 1], [0, 1, 1]);

  const bgColor = useTransform(
    smoothProgress,
    [0, 0.2, 0.4, 0.7, 0.85],
    ['rgb(0, 0, 0)', 'rgb(15, 10, 5)', 'rgb(30, 20, 10)', 'rgb(15, 23, 42)', 'rgb(15, 23, 42)']
  );

  const glowOpacity = useTransform(smoothProgress, [0.18, 0.32, 0.5], [0, 0.4, 0.8]);
  const glowScale = useTransform(smoothProgress, [0.18, 0.4], [0.3, 1.8]);

  const iphoneScale = useTransform(smoothProgress, [0.38, 0.52, 0.68], [0.4, 1, 1.4]);
  const iphoneY = useTransform(smoothProgress, [0.38, 0.52, 0.68], [150, 0, -150]);
  const iphoneRotateY = useTransform(smoothProgress, [0.42, 0.52, 0.62], [-25, 0, 25]);

  useMotionValueEvent(smoothProgress, 'change', (value) => {
    if (value < 0.2) setCurrentAct(1);
    else if (value < 0.42) setCurrentAct(2);
    else if (value < 0.72) setCurrentAct(3);
    else if (value < 0.88) setCurrentAct(4);
    else setCurrentAct(5);
    if (value > 0.05) setShowHint(false);
  });

  const scrollToAct = useCallback((act: number) => {
    if (!containerRef.current) return;
    const actPositions = [0, 0, 0.2, 0.42, 0.72, 0.88];
    const targetProgress = actPositions[act] || 0;
    const containerHeight = containerRef.current.scrollHeight - window.innerHeight;
    const targetScroll = targetProgress * containerHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  }, []);

  const scrollToNextAct = useCallback(() => {
    scrollToAct(Math.min(currentAct + 1, 5));
  }, [currentAct, scrollToAct]);

  const scrollToPrevAct = useCallback(() => {
    scrollToAct(Math.max(currentAct - 1, 1));
  }, [currentAct, scrollToAct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault();
        scrollToNextAct();
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        scrollToPrevAct();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [scrollToNextAct, scrollToPrevAct]);

  const handleActClick = useCallback(() => {
    if (currentAct < 5) scrollToNextAct();
  }, [currentAct, scrollToNextAct]);

  return (
    <>
      <style jsx global>{`
        .story-particle {
          position: absolute;
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: linear-gradient(to bottom, rgba(251, 146, 60, 0.5), transparent);
          will-change: transform, opacity;
          transform: translateZ(0);
          animation: story-particle-fall 5s linear infinite;
        }
        @keyframes story-particle-fall {
          0% { transform: translateY(-5vh) translateZ(0); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(105vh) translateZ(0); opacity: 0; }
        }
        .story-coin {
          position: absolute;
          font-size: 2rem;
          will-change: transform, opacity;
          transform: translateZ(0);
          animation: story-coin-fade 3.5s ease-out infinite;
        }
        @keyframes story-coin-fade {
          0% { transform: translateY(0) scale(1) translateZ(0); opacity: 0; }
          25% { opacity: 0.6; }
          75% { opacity: 0.6; }
          100% { transform: translateY(80px) scale(0.2) translateZ(0); opacity: 0; }
        }
        .story-gpu {
          will-change: transform;
          transform: translateZ(0);
          backface-visibility: hidden;
        }
      `}</style>

      <div ref={containerRef} className="relative">
        <motion.div 
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500 z-50 origin-left"
          style={{ scaleX: smoothProgress }}
        />

        <div className="fixed top-6 left-6 z-50">
          <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
            {[1, 2, 3, 4, 5].map((act) => (
              <button
                key={act}
                onClick={() => scrollToAct(act)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  currentAct >= act ? 'bg-orange-500 w-8' : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>

        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2">
          {currentAct > 1 && (
            <button
              onClick={scrollToPrevAct}
              className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all flex items-center justify-center"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          )}
          {currentAct < 5 && (
            <button
              onClick={scrollToNextAct}
              className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all flex items-center justify-center"
            >
              <ChevronDown className="w-5 h-5" />
            </button>
          )}
        </div>

        <a 
          href="#finale"
          className="fixed top-6 right-6 z-50 px-4 py-2 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white/70 text-sm hover:bg-white/20 transition-colors"
        >
          Skip →
        </a>

        {showHint && (
          <motion.div 
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 1 }}
          >
            <span className="text-sm mb-2 font-medium">Scroll or use arrow keys</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronDown className="w-5 h-5" />
            </motion.div>
          </motion.div>
        )}

        <motion.div 
          className="fixed inset-0 z-0"
          style={{ backgroundColor: bgColor }}
        />

        <motion.div 
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full z-10 pointer-events-none story-gpu"
          style={{ 
            opacity: glowOpacity,
            scale: glowScale,
            background: 'radial-gradient(circle, rgba(249,115,22,0.25) 0%, rgba(234,179,8,0.12) 40%, transparent 70%)',
          }}
        />

        <div className="relative z-20" style={{ height: '400vh' }}>
          
          <motion.section 
            className="fixed inset-0 flex items-center justify-center overflow-hidden cursor-pointer story-gpu"
            style={{ opacity: act1Opacity }}
            onClick={handleActClick}
          >
            {[...Array(5)].map((_, i) => (
              <div key={i} className="story-particle" style={{ left: `${18 + i * 16}%`, animationDelay: `${i * 1}s` }} />
            ))}
            {[...Array(4)].map((_, i) => (
              <div key={i} className="story-coin" style={{ left: `${15 + i * 22}%`, top: `${20 + (i % 2) * 30}%`, animationDelay: `${i * 0.9}s` }}>💸</div>
            ))}
          
            <div className="text-center px-6 max-w-4xl">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Your money loses value.<br />
                <span className="text-red-400">Every. Single. Day.</span>
              </h1>
              <p className="text-xl sm:text-2xl text-gray-400 mb-12">
                8% per year. Gone. While you watch.
              </p>
              <div className="flex justify-center gap-8 sm:gap-12 text-gray-500">
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-red-400 mb-1">-8%</div>
                  <div className="text-sm">Per year</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-red-400 mb-1">-40%</div>
                  <div className="text-sm">In 5 years</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl sm:text-5xl font-bold text-red-400 mb-1">-64%</div>
                  <div className="text-sm">In 10 years</div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="fixed inset-0 flex items-center justify-center cursor-pointer story-gpu"
            style={{ opacity: act2Opacity }}
            onClick={handleActClick}
          >
            <div className="text-center px-6">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-8">
                What if you could<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">fight back?</span>
              </h2>
              <div className="relative inline-block">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-3xl blur-2xl opacity-40" />
                <Image 
                  src="/blaze-logo.png" 
                  alt="BLAZE" 
                  width={160} 
                  height={160}
                  className="relative rounded-3xl"
                  priority
                />
              </div>
              <p className="text-2xl sm:text-3xl text-orange-300 mt-8 font-medium">
                Introducing BLAZE
              </p>
            </div>
          </motion.section>

          <motion.section 
            className="fixed inset-0 flex items-center justify-center cursor-pointer story-gpu"
            style={{ opacity: act3Opacity }}
            onClick={handleActClick}
          >
            <div className="relative w-full max-w-6xl mx-auto px-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-5">
                  <h2 className="text-3xl sm:text-4xl font-bold text-white mb-8">
                    Your new weapon against<br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400">financial decay</span>
                  </h2>
                  {[
                    { Icon: QrCode, label: 'QuickPay', color: 'from-orange-500 to-yellow-500' },
                    { Icon: Brain, label: 'AI Assistant', color: 'from-purple-500 to-pink-500' },
                    { Icon: Shield, label: 'Scam Protection', color: 'from-emerald-500 to-teal-500' },
                    { Icon: Zap, label: '2 Second Payments', color: 'from-sky-500 to-blue-500' },
                  ].map((f, i) => (
                    <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${f.color} flex items-center justify-center flex-shrink-0`}>
                        <f.Icon className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-white font-semibold text-lg">{f.label}</span>
                    </div>
                  ))}
                </div>
                <motion.div 
                  className="relative flex justify-center story-gpu"
                  style={{
                    scale: iphoneScale,
                    y: iphoneY,
                    rotateY: iphoneRotateY,
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-yellow-500/20 rounded-[4rem] blur-3xl" />
                  <div className="relative bg-gray-900 rounded-[3rem] p-3 shadow-2xl">
                    <div className="bg-black rounded-[2.5rem] overflow-hidden" style={{ width: '280px', height: '560px' }}>
                      <Image src="/iphone_screen.png" alt="BLAZE" fill className="object-cover object-top" priority />
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.section>

          <motion.section 
            className="fixed inset-0 flex items-center justify-center cursor-pointer story-gpu"
            style={{ opacity: act4Opacity }}
            onClick={handleActClick}
          >
            <div className="text-center px-6">
              <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">You're not alone</h2>
              <p className="text-xl sm:text-2xl text-gray-400 mb-12">Thousands are already on the journey</p>
              <div className="grid grid-cols-3 gap-8 sm:gap-12 max-w-2xl mx-auto mb-12">
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-2">12K+</div>
                  <div className="text-gray-400 text-sm">Waitlist</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-2">18</div>
                  <div className="text-gray-400 text-sm">Blockchains</div>
                </div>
                <div className="text-center">
                  <div className="text-5xl sm:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-400 mb-2">2s</div>
                  <div className="text-gray-400 text-sm">Payments</div>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section 
            id="finale"
            className="fixed inset-0 flex items-center justify-center story-gpu"
            style={{ opacity: act5Opacity }}
          >
            <div className="text-center px-6 max-w-3xl">
              <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white mb-6">
                Your journey<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400">starts now</span>
              </h2>
              <p className="text-xl sm:text-2xl text-gray-300 mb-10">
                Join the presale. Get early access. Fight back.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="/#tokenomics" className="group relative inline-flex items-center justify-center gap-3 px-8 py-5 overflow-hidden rounded-2xl font-bold text-lg text-white transition-all hover:scale-105">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-yellow-500 to-orange-500" />
                  <span className="relative">Join the presale</span>
                  <ArrowRight className="relative w-5 h-5" />
                </a>
                <a href="/" className="inline-flex items-center justify-center gap-2 px-8 py-5 rounded-2xl font-semibold text-lg text-white border border-white/30 hover:bg-white/10 transition-colors">
                  Back to homepage
                </a>
              </div>
            </div>
          </motion.section>
        </div>
      </div>
    </>
  );
}
