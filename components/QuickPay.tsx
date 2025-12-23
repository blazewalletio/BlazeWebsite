'use client';

import { motion } from 'framer-motion';
import { QrCode, Zap, Shield, Clock, Coffee, ShoppingCart, Scissors, Car, ArrowRight, TrendingDown } from 'lucide-react';

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

export default function QuickPay() {
  return (
    <section id="quickpay" className="py-20 lg:py-28 bg-white">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
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
        </motion.div>

        {/* Main content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Left: Phone demo */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative order-2 lg:order-1"
          >
            <div className="relative mx-auto max-w-xs">
              {/* Phone frame */}
              <div className="bg-gray-900 rounded-[2.5rem] p-3 shadow-2xl">
                <div className="bg-white rounded-[2rem] overflow-hidden aspect-[9/16]">
                  {/* QuickPay flow */}
                  <div className="h-full flex flex-col">
                    {/* Step indicator */}
                    <div className="px-4 py-3 bg-gradient-to-r from-orange-500 to-yellow-500">
                      <div className="flex items-center justify-between text-white">
                        <span className="text-sm font-medium">QuickPay</span>
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-white rounded-full" />
                          <div className="w-2 h-2 bg-white/50 rounded-full" />
                          <div className="w-2 h-2 bg-white/50 rounded-full" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Payment confirmation */}
                    <div className="flex-1 p-4 flex flex-col">
                      <div className="text-center mb-4">
                        <div className="w-16 h-16 mx-auto bg-emerald-100 rounded-full flex items-center justify-center mb-3">
                          <svg className="w-8 h-8 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div className="font-bold text-gray-900 text-lg">Payment sent!</div>
                        <div className="text-gray-500 text-sm">Transaction confirmed</div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-xl p-4 mb-4">
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
                          <span className="text-emerald-500 font-medium">1.8 sec</span>
                        </div>
                      </div>
                      
                      <div className="text-center text-gray-500 text-xs">
                        To: Coffee Corner
                        <br />
                        <span className="font-mono text-xs">0x7a3B...4f2E</span>
                      </div>
                    </div>
                    
                    {/* Bottom button */}
                    <div className="p-4">
                      <button className="w-full py-3 bg-gray-900 text-white rounded-xl font-medium">
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Time indicator */}
              <motion.div
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -right-4 top-1/4 bg-white rounded-xl shadow-lg border border-gray-200 p-3"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <span className="font-bold text-gray-900">1.8s</span>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="order-1 lg:order-2"
          >
            <div className="space-y-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
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
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Use cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="card p-8"
        >
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
        </motion.div>

        {/* Vision quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 text-center max-w-3xl mx-auto"
        >
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
        </motion.div>
      </div>
    </section>
  );
}
