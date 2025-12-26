'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { Volume2, VolumeX, ChevronDown, Check, Loader2, QrCode, ArrowRight, Zap, Shield, Globe, Sparkles } from 'lucide-react';
import Image from 'next/image';

type DemoStep = 'idle' | 'scanning' | 'confirming' | 'processing' | 'complete';

export default function StorytellingDemo() {
  const [mounted, setMounted] = useState(false);
  const [audioEnabled, setAudioEnabled] = useState(false);
  const [demoStep, setDemoStep] = useState<DemoStep>('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [cursorTrail, setCursorTrail] = useState<{ x: number; y: number; id: number }[]>([]);
  const trailIdRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const rotateX = useSpring(useTransform(mouseY, [-500, 500], [15, -15]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-500, 500], [-15, 15]), springConfig);

  const { scrollYProgress } = useScroll();
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0.3]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
      trailIdRef.current += 1;
      setCursorTrail(prev => [...prev.slice(-20), { x: e.clientX, y: e.clientY, id: trailIdRef.current }]);
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        mouseX.set(e.clientX - (rect.left + rect.width / 2));
        mouseY.set(e.clientY - (rect.top + rect.height / 2));
      }
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => setCursorTrail(prev => prev.slice(-15)), 50);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isPlaying && demoStep === 'idle') {
      const interval = setInterval(() => {
        const time = Date.now() / 4000;
        mouseX.set(Math.sin(time) * 50);
        mouseY.set(Math.cos(time) * 25);
      }, 16);
      return () => clearInterval(interval);
    }
  }, [isPlaying, demoStep, mouseX, mouseY]);

  const handleStartDemo = useCallback(() => {
    if (isPlaying) return;
    setIsPlaying(true);
    setDemoStep('scanning');
    setTimeout(() => setDemoStep('confirming'), 1200);
    setTimeout(() => setDemoStep('processing'), 2800);
    setTimeout(() => setDemoStep('complete'), 3800);
    setTimeout(() => { setDemoStep('idle'); setIsPlaying(false); }, 6500);
  }, [isPlaying]);

  if (!mounted) return <div className="min-h-screen bg-black flex items-center justify-center"><div className="w-8 h-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" /></div>;

  return (
    <div className="relative bg-black text-white overflow-x-hidden" style={{ cursor: 'none' }}>
      <motion.div className="fixed w-4 h-4 rounded-full pointer-events-none z-[100] mix-blend-difference" style={{ background: 'radial-gradient(circle, #f97316 0%, #eab308 100%)', x: cursorPosition.x - 8, y: cursorPosition.y - 8, boxShadow: '0 0 20px #f97316, 0 0 40px #f9731680' }} animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
      {cursorTrail.map((point) => <motion.div key={point.id} className="fixed w-2 h-2 rounded-full pointer-events-none z-[99]" initial={{ opacity: 0.8, scale: 1 }} animate={{ opacity: 0, scale: 0 }} transition={{ duration: 0.5 }} style={{ background: 'radial-gradient(circle, #f97316 0%, transparent 100%)', left: point.x - 4, top: point.y - 4, boxShadow: '0 0 10px #f97316' }} />)}
      
      <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }} onClick={() => setAudioEnabled(!audioEnabled)} className="fixed top-6 right-6 z-50 w-12 h-12 rounded-full bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/10 transition-all" style={{ cursor: 'none' }}>
        {audioEnabled ? <Volume2 className="w-5 h-5 text-white/70" /> : <VolumeX className="w-5 h-5 text-white/40" />}
      </motion.button>

      <section ref={containerRef} className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <motion.div className="absolute inset-0" style={{ opacity: backgroundOpacity }}>
          <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950 to-black" />
          <motion.div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(249,115,22,0.15) 0%, transparent 70%)', filter: 'blur(60px)' }} animate={{ x: [0, 50, 0], y: [0, 30, 0], scale: [1, 1.1, 1] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full" style={{ background: 'radial-gradient(circle, rgba(234,179,8,0.1) 0%, transparent 70%)', filter: 'blur(60px)' }} animate={{ x: [0, -30, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1 }} />
          <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-20" style={{ background: 'conic-gradient(from 0deg, transparent, #f97316, transparent, #eab308, transparent)', filter: 'blur(80px)' }} animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: 'linear' }} />
          <div className="absolute inset-0 overflow-hidden">{[...Array(60)].map((_, i) => <motion.div key={i} className="absolute w-1 h-1 bg-white rounded-full" style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random() * 0.4 + 0.1 }} animate={{ y: [0, -40, 0], opacity: [0.1, 0.6, 0.1] }} transition={{ duration: Math.random() * 5 + 4, repeat: Infinity, delay: Math.random() * 3, ease: 'easeInOut' }} />)}</div>
        </motion.div>

        <div className="relative z-10 flex flex-col items-center">
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 1 }} className="mb-12">
            <Image src="/blaze-logo.png" alt="BLAZE" width={48} height={48} className="rounded-xl opacity-80" />
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.8, y: 50 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 0.8, duration: 1.2, ease: [0.16, 1, 0.3, 1] }} className="relative mb-12" style={{ perspective: 1200 }}>
            <motion.div style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }} className="relative">
              <div className="absolute -inset-12 bg-gradient-to-r from-orange-500/30 via-yellow-500/20 to-orange-500/30 rounded-[5rem] blur-3xl opacity-60" />
              <motion.div className="absolute -inset-8 rounded-[4rem]" style={{ background: 'conic-gradient(from 0deg, #f97316, #eab308, #f97316)', filter: 'blur(40px)', opacity: 0.4 }} animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: 'linear' }} />

              <div className="relative rounded-[3rem] p-[3px]" style={{ background: 'linear-gradient(145deg, #4a4a4c 0%, #2c2c2e 50%, #1a1a1c 100%)', boxShadow: '0 0 0 1px rgba(255,255,255,0.1), 0 25px 50px rgba(0,0,0,0.5), 0 50px 100px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)' }}>
                <div className="rounded-[2.85rem] p-[10px]" style={{ background: 'linear-gradient(180deg, #2a2a2c 0%, #1c1c1e 100%)' }}>
                  <div className="relative bg-black rounded-[2.4rem] overflow-hidden" style={{ width: '300px', height: '630px' }}>
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-30"><div className="bg-black rounded-full w-[126px] h-[36px] flex items-center justify-center"><div className="absolute left-5 w-3 h-3 rounded-full bg-[#1a1a2e] ring-1 ring-[#0d0d15]" /></div></div>

                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900 to-black">
                      <AnimatePresence mode="wait">
                        {demoStep === 'idle' && (
                          <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center p-8">
                            <div className="absolute top-16 left-0 right-0 text-center"><div className="text-orange-500 text-sm font-medium mb-1">QuickPay</div><div className="text-white/60 text-xs">Tap to experience</div></div>
                            <motion.div className="relative w-40 h-40 cursor-pointer" onClick={handleStartDemo} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} style={{ cursor: 'none' }}>
                              <motion.div className="absolute inset-0 border-2 border-orange-500/50 rounded-3xl" animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.2, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
                              <div className="absolute inset-0 border-2 border-dashed border-orange-500/80 rounded-3xl flex items-center justify-center"><QrCode className="w-16 h-16 text-orange-500" /></div>
                              <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-orange-500 rounded-tl-xl" /><div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-orange-500 rounded-tr-xl" /><div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-orange-500 rounded-bl-xl" /><div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-orange-500 rounded-br-xl" />
                            </motion.div>
                            <motion.div className="absolute bottom-20 text-center" animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }}><div className="text-white font-semibold mb-1">Tap to scan</div><div className="text-white/40 text-sm">Experience 2-second payments</div></motion.div>
                          </motion.div>
                        )}
                        {demoStep === 'scanning' && (
                          <motion.div key="scanning" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 bg-black flex flex-col items-center justify-center">
                            <div className="relative w-52 h-52">
                              <div className="absolute inset-0 border border-white/20 rounded-2xl" />
                              {[0, 1, 2, 3].map((i) => <motion.div key={i} className={`absolute w-10 h-10 border-orange-500 ${i === 0 ? 'top-0 left-0 border-t-4 border-l-4 rounded-tl-xl' : i === 1 ? 'top-0 right-0 border-t-4 border-r-4 rounded-tr-xl' : i === 2 ? 'bottom-0 left-0 border-b-4 border-l-4 rounded-bl-xl' : 'bottom-0 right-0 border-b-4 border-r-4 rounded-br-xl'}`} animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.2 }} />)}
                              <motion.div className="absolute left-4 right-4 h-1 bg-gradient-to-r from-transparent via-orange-500 to-transparent rounded-full" animate={{ top: ['15%', '85%'] }} transition={{ duration: 1, repeat: Infinity, ease: 'easeInOut' }} />
                            </div>
                            <motion.div className="mt-8 text-white font-medium" animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>Scanning...</motion.div>
                          </motion.div>
                        )}
                        {demoStep === 'confirming' && (
                          <motion.div key="confirming" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="absolute inset-0 flex flex-col p-6 pt-16">
                            <div className="text-center mb-2"><div className="text-white font-bold text-lg">Confirm payment</div><div className="text-white/50 text-sm">Coffee Corner</div></div>
                            <div className="flex-1 flex flex-col justify-center">
                              <motion.div className="text-center mb-8" initial={{ scale: 0.8 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}><div className="text-6xl font-bold text-white mb-2">€4.50</div><div className="text-white/50">≈ 4.52 USDC</div></motion.div>
                              <div className="bg-white/5 rounded-2xl p-4 mb-6 border border-white/10"><div className="flex justify-between text-sm mb-3"><span className="text-white/50">Network</span><span className="text-white font-medium">Polygon</span></div><div className="flex justify-between text-sm mb-3"><span className="text-white/50">Fee</span><span className="text-emerald-400 font-medium">~$0.001</span></div><div className="flex justify-between text-sm"><span className="text-white/50">Time</span><span className="text-orange-400 font-medium">~2 seconds</span></div></div>
                            </div>
                            <motion.div className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl text-center font-bold text-white text-lg" animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 0.8, repeat: Infinity }}>Confirm & Pay</motion.div>
                          </motion.div>
                        )}
                        {demoStep === 'processing' && (
                          <motion.div key="processing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col items-center justify-center">
                            <motion.div animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}><Loader2 className="w-16 h-16 text-orange-500" /></motion.div>
                            <div className="mt-6 text-white font-medium">Processing...</div><div className="text-white/40 text-sm mt-1">Almost there</div>
                          </motion.div>
                        )}
                        {demoStep === 'complete' && (
                          <motion.div key="complete" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 flex flex-col p-6 pt-16">
                            <div className="flex-1 flex flex-col items-center justify-center">
                              <motion.div className="w-24 h-24 bg-emerald-500/20 rounded-full flex items-center justify-center mb-6" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.2 }}><motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', delay: 0.4 }}><Check className="w-12 h-12 text-emerald-400" strokeWidth={3} /></motion.div></motion.div>
                              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="text-center"><div className="text-2xl font-bold text-white mb-1">Payment sent!</div><div className="text-white/50">Transaction confirmed</div></motion.div>
                            </div>
                            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="bg-white/5 rounded-2xl p-4 border border-white/10"><div className="flex justify-between mb-2"><span className="text-white/50 text-sm">Amount</span><span className="text-white font-bold">€4.50</span></div><div className="flex justify-between mb-2"><span className="text-white/50 text-sm">Paid with</span><span className="text-white">4.52 USDC</span></div><div className="flex justify-between"><span className="text-white/50 text-sm">Time</span><span className="text-emerald-400 font-bold">1.8 sec ⚡</span></div></motion.div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, transparent 50%)' }} />
                  </div>
                </div>
                <div className="absolute -left-[2px] top-[100px] w-[4px] h-[28px] rounded-l-sm bg-gradient-to-r from-gray-600 to-gray-500" /><div className="absolute -left-[2px] top-[145px] w-[4px] h-[50px] rounded-l-sm bg-gradient-to-r from-gray-600 to-gray-500" /><div className="absolute -left-[2px] top-[205px] w-[4px] h-[50px] rounded-l-sm bg-gradient-to-r from-gray-600 to-gray-500" /><div className="absolute -right-[2px] top-[160px] w-[4px] h-[70px] rounded-r-sm bg-gradient-to-r from-gray-500 to-gray-600" />
              </div>
            </motion.div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5, duration: 1 }} className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 tracking-tight"><span className="text-white">Pay with crypto.</span><br /><span className="bg-gradient-to-r from-orange-500 to-yellow-500 bg-clip-text text-transparent">Everywhere.</span></h1>
            <p className="text-white/40 text-lg max-w-md mx-auto">2 seconds. Any store. Zero complexity.</p>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.8, duration: 0.8 }} className="flex flex-col sm:flex-row gap-4">
            <a href="https://my.blazewallet.io" target="_blank" rel="noopener noreferrer" className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl font-bold text-lg overflow-hidden" style={{ cursor: 'none' }}>
              <span className="relative z-10 flex items-center gap-2">Get early access<ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" /></span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </motion.div>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
            <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }} className="flex flex-col items-center gap-2 text-white/30" style={{ cursor: 'none' }}><span className="text-xs uppercase tracking-widest">Discover more</span><ChevronDown className="w-5 h-5" /></motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative min-h-screen py-32 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium mb-6"><Sparkles className="w-4 h-4" />Why BLAZE?</div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">The future of payments</h2>
            <p className="text-white/40 text-lg max-w-2xl mx-auto">While others build wallets for holding, we built one for living.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{ icon: Zap, title: '2-second payments', description: 'Faster than your card. Scan, confirm, done.', color: 'from-orange-500 to-yellow-500' }, { icon: Shield, title: 'Non-custodial', description: 'Your keys, your crypto. Always.', color: 'from-emerald-500 to-teal-500' }, { icon: Globe, title: '18+ blockchains', description: 'One wallet for all your crypto.', color: 'from-sky-500 to-blue-500' }].map((feature, index) => (
              <motion.div key={feature.title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.15, duration: 0.6 }} className="group relative p-8 rounded-3xl bg-white/[0.02] border border-white/[0.05] hover:border-white/10 transition-all" style={{ cursor: 'none' }}>
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}><feature.icon className="w-7 h-7 text-white" /></div>
                <h3 className="text-xl font-bold text-white mb-2">{feature.title}</h3>
                <p className="text-white/40">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }} className="mt-20 text-center">
            <a href="/" className="inline-flex items-center gap-2 text-white/50 hover:text-white transition-colors" style={{ cursor: 'none' }}><ArrowRight className="w-4 h-4 rotate-180" />Back to full website</a>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

