'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDown, X, QrCode, Zap, Shield, CheckCircle, Loader2, Sparkles } from 'lucide-react';

type DemoStep = 'idle' | 'scanning' | 'confirming' | 'processing' | 'complete';

export default function StorytellingDemo() {
  const [demoStep, setDemoStep] = useState<DemoStep>('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStartDemo = () => {
    if (isPlaying) return;
    
    setIsPlaying(true);
    setDemoStep('scanning');
    setTimeout(() => setDemoStep('confirming'), 1500);
    setTimeout(() => setDemoStep('processing'), 3500);
    setTimeout(() => setDemoStep('complete'), 4700);
    setTimeout(() => {
      setDemoStep('idle');
      setIsPlaying(false);
    }, 7500);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* Cursor glow effect */}
      <div 
        className="fixed pointer-events-none z-50 mix-blend-screen"
        style={{
          left: mousePosition.x - 150,
          top: mousePosition.y - 150,
          width: 300,
          height: 300,
          background: 'radial-gradient(circle, rgba(249,115,22,0.3) 0%, transparent 70%)',
          filter: 'blur(40px)',
          transition: 'all 0.1s ease-out',
        }}
      />

      <AnimatePresence>
        {!showMore && (
          <motion.section
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="min-h-screen flex flex-col items-center justify-center relative px-4"
          >
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: 50 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="mb-12"
              >
                <div className="relative mx-auto max-w-xs">
                  <div 
                    className="bg-gray-950 rounded-[2.5rem] p-3 shadow-2xl cursor-pointer border border-gray-800 hover:border-orange-500/50 transition-all duration-300"
                    onClick={handleStartDemo}
                  >
                    <div className="bg-black rounded-[2rem] overflow-hidden" style={{ height: '520px' }}>
                      <div className="h-full flex flex-col">
                        <div className="px-4 py-3 bg-gradient-to-r from-orange-500 to-yellow-500">
                          <div className="flex items-center justify-between text-white">
                            <span className="text-sm font-medium">QuickPay</span>
                            <div className="flex gap-1">
                              <div className={`w-2 h-2 rounded-full transition-all ${demoStep !== 'idle' ? 'bg-white' : 'bg-white/50'}`} />
                              <div className={`w-2 h-2 rounded-full transition-all ${demoStep === 'confirming' || demoStep === 'processing' || demoStep === 'complete' ? 'bg-white' : 'bg-white/50'}`} />
                              <div className={`w-2 h-2 rounded-full transition-all ${demoStep === 'complete' ? 'bg-white' : 'bg-white/50'}`} />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 relative overflow-hidden bg-white">
                          <AnimatePresence mode="wait">
                            {demoStep === 'idle' && (
                              <motion.div
                                key="idle"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute inset-0 flex flex-col items-center justify-center p-6"
                              >
                                <motion.div 
                                  className="w-32 h-32 border-4 border-dashed border-orange-300 rounded-2xl flex items-center justify-center mb-4"
                                  animate={{ scale: [1, 1.02, 1] }}
                                  transition={{ duration: 2, repeat: Infinity }}
                                >
                                  <QrCode className="w-16 h-16 text-orange-400" />
                                </motion.div>
                                <div className="font-bold text-gray-900 text-lg mb-1">Tap to scan QR</div>
                                <div className="text-gray-500 text-sm text-center">Point your camera at merchant's QR code</div>
                              </motion.div>
                            )}

                            {demoStep === 'scanning' && (
                              <motion.div
                                key="scanning"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black"
                              >
                                <div className="relative w-48 h-48 mb-4">
                                  <div className="absolute inset-0 border-2 border-white/30 rounded-xl" />
                                  <motion.div 
                                    className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-orange-500 rounded-tl-lg"
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                  />
                                  <motion.div 
                                    className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-orange-500 rounded-tr-lg"
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: 0.25 }}
                                  />
                                  <motion.div 
                                    className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-orange-500 rounded-bl-lg"
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: 0.5 }}
                                  />
                                  <motion.div 
                                    className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-orange-500 rounded-br-lg"
                                    animate={{ opacity: [1, 0.5, 1] }}
                                    transition={{ duration: 1, repeat: Infinity, delay: 0.75 }}
                                  />
                                  <motion.div
                                    className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                                    animate={{ top: ['10%', '90%', '10%'] }}
                                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                                  />
                                </div>
                                <div className="text-white font-medium">Scanning...</div>
                              </motion.div>
                            )}

                            {demoStep === 'confirming' && (
                              <motion.div
                                key="confirming"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="absolute inset-0 flex flex-col p-4"
                              >
                                <div className="text-center mb-4 pt-2">
                                  <div className="font-bold text-gray-900 text-lg">Confirm payment</div>
                                  <div className="text-gray-500 text-sm">Coffee Corner</div>
                                </div>
                                
                                <div className="flex-1 flex flex-col justify-center">
                                  <div className="text-center mb-6">
                                    <div className="text-5xl font-bold text-gray-900 mb-1">€4.50</div>
                                    <div className="text-gray-500">≈ 4.52 USDC</div>
                                  </div>
                                  
                                  <div className="bg-gray-50 rounded-xl p-3 mb-4">
                                    <div className="flex justify-between items-center text-sm">
                                      <span className="text-gray-500">Network</span>
                                      <span className="text-gray-900 font-medium">Polygon</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm mt-2">
                                      <span className="text-gray-500">Fee</span>
                                      <span className="text-emerald-500 font-medium">~$0.001</span>
                                    </div>
                                  </div>
                                </div>
                                
                                <motion.button 
                                  className="w-full py-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl font-bold text-lg shadow-lg shadow-orange-500/30"
                                  animate={{ scale: [1, 1.02, 1] }}
                                  transition={{ duration: 1, repeat: Infinity }}
                                >
                                  Confirm & Pay
                                </motion.button>
                              </motion.div>
                            )}

                            {demoStep === 'processing' && (
                              <motion.div
                                key="processing"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute inset-0 flex flex-col items-center justify-center p-6"
                              >
                                <motion.div
                                  animate={{ rotate: 360 }}
                                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                                  className="mb-4"
                                >
                                  <Loader2 className="w-16 h-16 text-orange-500" />
                                </motion.div>
                                <div className="font-bold text-gray-900 text-lg mb-1">Processing...</div>
                                <div className="text-gray-500 text-sm">This will only take a moment</div>
                              </motion.div>
                            )}

                            {demoStep === 'complete' && (
                              <motion.div
                                key="complete"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute inset-0 flex flex-col p-4"
                              >
                                <div className="flex-1 flex flex-col items-center justify-center">
                                  <motion.div 
                                    className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-4"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', delay: 0.2 }}
                                  >
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{ type: 'spring', delay: 0.4 }}
                                    >
                                      <CheckCircle className="w-10 h-10 text-emerald-500" strokeWidth={3} />
                                    </motion.div>
                                  </motion.div>
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                  >
                                    <div className="font-bold text-gray-900 text-xl mb-1 text-center">Payment sent!</div>
                                    <div className="text-gray-500 text-sm text-center">Transaction confirmed</div>
                                  </motion.div>
                                </div>
                                
                                <motion.div
                                  initial={{ opacity: 0, y: 20 }}
                                  animate={{ opacity: 1, y: 0 }}
                                  transition={{ delay: 0.6 }}
                                  className="bg-gray-50 rounded-xl p-4"
                                >
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-500 text-sm">Amount</span>
                                    <span className="font-bold text-gray-900">€4.50</span>
                                  </div>
                                  <div className="flex justify-between items-center mb-2">
                                    <span className="text-gray-500 text-sm">Paid with</span>
                                    <span className="text-gray-900">4.52 USDC</span>
                                  </div>
                                  <div className="flex justify-between items-center">
                                    <span className="text-gray-500 text-sm">Time</span>
                                    <span className="text-emerald-500 font-bold">1.8 sec ⚡</span>
                                  </div>
                                </motion.div>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <motion.div 
                    className="absolute -right-4 top-1/4 bg-black border border-orange-500/30 rounded-xl shadow-lg shadow-orange-500/20 p-3"
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-500" />
                      <span className="font-bold text-white">1.8s</span>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
              >
                Pay with crypto.
                <br />
                <span className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Everywhere.
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="mb-12"
              >
                <button
                  onClick={() => setShowMore(true)}
                  className="group relative px-12 py-5 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl font-bold text-xl text-white shadow-2xl shadow-orange-500/50 hover:shadow-orange-500/70 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Try it
                    <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                </button>
              </motion.div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-gray-500 text-sm"
              >
                Click the phone to see QuickPay in action
              </motion.p>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showMore && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
          >
            <button
              onClick={() => setShowMore(false)}
              className="fixed top-6 right-6 z-50 w-12 h-12 bg-black/50 backdrop-blur-sm border border-white/10 rounded-xl flex items-center justify-center hover:bg-black/70 transition-colors"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <div className="space-y-32 py-32">
              <section className="container-main">
                <div className="max-w-3xl mx-auto text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    The wallet that makes crypto{' '}
                    <span className="bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent">
                      spendable
                    </span>
                  </h2>
                  <p className="text-xl text-gray-400 leading-relaxed">
                    For decades, we've watched money lose value year after year. We built BLAZE because 
                    we believe paying with crypto – everywhere – is the future.
                  </p>
                </div>
              </section>

              <section className="container-main">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {[
                    { icon: QrCode, title: 'QuickPay', desc: 'Scan & pay in 2 seconds' },
                    { icon: Sparkles, title: 'AI Assistant', desc: 'Natural language commands' },
                    { icon: Shield, title: 'Non-custodial', desc: 'Your keys, your crypto' },
                  ].map((feature, i) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className="text-center p-8 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <feature.icon className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </section>

              <section className="container-main">
                <div className="max-w-2xl mx-auto text-center">
                  <h2 className="text-4xl md:text-5xl font-bold mb-6">
                    Ready to get started?
                  </h2>
                  <p className="text-xl text-gray-400 mb-8">
                    Join thousands who trust BLAZE for everyday crypto payments.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="https://my.blazewallet.io"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-8 py-4 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl font-bold text-lg hover:scale-105 transition-transform"
                    >
                      Launch wallet
                    </a>
                    <a
                      href="/"
                      className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl font-semibold text-lg hover:bg-white/20 transition-colors"
                    >
                      Learn more
                    </a>
                  </div>
                </div>
              </section>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
