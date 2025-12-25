'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { QrCode, Zap, Shield, Clock, Coffee, ShoppingCart, Scissors, Car, TrendingDown, Check, Loader2 } from 'lucide-react';
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';

const useCases = [
  { icon: Coffee, label: 'Coffee shops', example: '€4.50' },
  { icon: ShoppingCart, label: 'Groceries', example: '€47.80' },
  { icon: Scissors, label: 'Haircuts', example: '€25.00' },
  { icon: Car, label: 'Parking', example: '€3.20' },
];

const benefits = [
  {
    icon: Zap,
    title: '2-second payments',
    description: 'Scan, confirm, done. Faster than card payments.',
  },
  {
    icon: Shield,
    title: 'No middlemen',
    description: 'Direct peer-to-peer. Lower fees than traditional payments.',
  },
  {
    icon: TrendingDown,
    title: 'Beat inflation',
    description: 'Your money loses value every year. Crypto doesn\'t have to.',
  },
];

// Demo steps
type DemoStep = 'idle' | 'scanning' | 'confirming' | 'processing' | 'complete';

export default function QuickPay() {
  const [demoStep, setDemoStep] = useState<DemoStep>('idle');
  const [isPlaying, setIsPlaying] = useState(false);
  const [sectionRef, isVisible] = useInView<HTMLElement>({ threshold: 0.1 });

  const handleStartDemo = () => {
    if (isPlaying) return; // Prevent multiple clicks during animation
    
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
    <section id="quickpay" ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="container-main">
        {/* Header */}
        <div className={`text-center mb-16 animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-medium text-sm mb-6">
            <QrCode className="w-4 h-4" />
            Introducing QuickPay
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Pay with crypto. <span className="text-gradient-brand">Everywhere.</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We believe crypto should be as easy to spend as cash. QuickPay makes that possible – 
            scan a QR code and pay in seconds.
          </p>
        </div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Interactive Phone demo - Keep Framer Motion for interactive animations */}
          <div className={`relative order-2 lg:order-1 animate-on-scroll delay-1 ${isVisible ? 'is-visible' : ''}`}>
            <div className="relative mx-auto max-w-xs">
              {/* Phone frame */}
              <div 
                className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl cursor-pointer"
                onClick={handleStartDemo}
              >
                <div className="bg-white rounded-[2rem] overflow-hidden" style={{ height: '520px' }}>
                  {/* QuickPay flow */}
                  <div className="h-full flex flex-col">
                    {/* Step indicator */}
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
                    
                    {/* Dynamic content based on step - Keep AnimatePresence for smooth transitions */}
                    <div className="flex-1 relative overflow-hidden">
                      <AnimatePresence mode="wait">
                        {/* Step 1: Idle - Scan prompt */}
                        {demoStep === 'idle' && (
                          <motion.div
                            key="idle"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-6"
                          >
                            <motion.div 
                              className="w-32 h-32 border-4 border-dashed border-orange-300 rounded-2xl flex items-center justify-center mb-4 cursor-pointer hover:border-orange-500 transition-colors"
                              animate={{ scale: [1, 1.02, 1] }}
                              transition={{ duration: 2, repeat: Infinity }}
                            >
                              <QrCode className="w-16 h-16 text-orange-400" />
                            </motion.div>
                            <div className="font-bold text-gray-900 text-lg mb-1">Tap to scan QR</div>
                            <div className="text-gray-500 text-sm text-center">Point your camera at merchant's QR code</div>
                          </motion.div>
                        )}

                        {/* Step 2: Scanning */}
                        {demoStep === 'scanning' && (
                          <motion.div
                            key="scanning"
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.1 }}
                            className="absolute inset-0 flex flex-col items-center justify-center p-6 bg-black"
                          >
                            <div className="relative w-48 h-48 mb-4">
                              {/* Scanner frame */}
                              <div className="absolute inset-0 border-2 border-white/30 rounded-xl" />
                              {/* Animated corners */}
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
                              {/* Scan line */}
                              <motion.div
                                className="absolute left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-orange-500 to-transparent"
                                animate={{ top: ['10%', '90%', '10%'] }}
                                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                              />
                              {/* QR placeholder */}
                              <div className="absolute inset-8 grid grid-cols-5 gap-1 opacity-30">
                                {[...Array(25)].map((_, i) => (
                                  <div key={i} className={`bg-white rounded-sm ${Math.random() > 0.5 ? 'opacity-100' : 'opacity-30'}`} />
                                ))}
                              </div>
                            </div>
                            <div className="text-white font-medium">Scanning...</div>
                          </motion.div>
                        )}

                        {/* Step 3: Confirming */}
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

                        {/* Step 4: Processing */}
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

                        {/* Step 5: Complete */}
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
                                  <Check className="w-10 h-10 text-emerald-500" strokeWidth={3} />
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
              
              {/* Time indicator */}
              <div className="absolute -right-4 top-1/4 bg-white rounded-xl shadow-lg border border-gray-200 p-3">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-gray-900">1.8s</span>
                </div>
              </div>
              
            </div>
          </div>

          {/* Right: Benefits */}
          <div className={`order-1 lg:order-2 animate-on-scroll delay-2 ${isVisible ? 'is-visible' : ''}`}>
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit.title}
                  className="card p-6"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Use cases */}
        <div className={`card p-8 animate-on-scroll delay-3 ${isVisible ? 'is-visible' : ''}`}>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-6">
            Use QuickPay anywhere
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {useCases.map((useCase, index) => (
              <div 
                key={index}
                className="text-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="w-12 h-12 mx-auto bg-white rounded-xl flex items-center justify-center mb-3 shadow-soft border border-gray-100">
                  <useCase.icon className="w-6 h-6 text-orange-500" />
                </div>
                <div className="font-semibold text-gray-900 mb-1">{useCase.label}</div>
                <div className="text-sm text-gray-500">{useCase.example}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision quote */}
        <div className={`mt-12 text-center max-w-3xl mx-auto animate-on-scroll delay-4 ${isVisible ? 'is-visible' : ''}`}>
          <blockquote className="text-xl text-gray-600 italic mb-4">
            "For decades, we've watched money lose value year after year. We built BLAZE because 
            we believe paying with crypto – everywhere – is the future."
          </blockquote>
          <div className="flex items-center justify-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
              R
            </div>
            <div className="text-left">
              <div className="font-semibold text-gray-900">Rick Schlimback</div>
              <div className="text-gray-500 text-sm">Founder, BLAZE Wallet</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
