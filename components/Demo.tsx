'use client';

import { ArrowRight, Zap, Brain, Shield, Clock, Repeat, CreditCard, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';
import { motion, AnimatePresence } from 'framer-motion';

const steps = [
  {
    number: '01',
    title: 'Create your wallet',
    description: 'Generate a secure wallet in seconds. Your keys, your crypto – always.',
  },
  {
    number: '02',
    title: 'Add your assets',
    description: 'Import existing tokens or buy crypto directly with card or bank transfer.',
  },
  {
    number: '03',
    title: 'Start using DeFi',
    description: 'Swap, stake, vote, and explore – all from one simple interface.',
  },
];

const features = [
  {
    id: 'ai',
    title: 'AI Assistant',
    shortTitle: 'AI Assistant',
    description: 'Talk to your wallet like a friend. Send crypto, check balances, or get help – just type what you need.',
    icon: Brain,
    color: 'from-purple-500 to-violet-600',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
  },
  {
    id: 'scam',
    title: 'Scam Protection',
    shortTitle: 'Scam Protection',
    description: 'Every transaction is scanned for risks. See warnings before you send, not after you lose.',
    icon: Shield,
    color: 'from-emerald-500 to-teal-600',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
  },
  {
    id: 'schedule',
    title: 'Smart Schedule',
    shortTitle: 'Smart Schedule',
    description: 'Set your max gas fee and we execute when it\'s cheapest. Save up to 40% automatically.',
    icon: Clock,
    color: 'from-orange-500 to-amber-500',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30',
  },
  {
    id: 'swap',
    title: 'Swap & Bridge',
    shortTitle: 'Swap & Bridge',
    description: 'Trade tokens and move assets across 18+ chains. All in one place, no external apps needed.',
    icon: Repeat,
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
  },
  {
    id: 'ramp',
    title: 'On & Off-ramp',
    shortTitle: 'On & Off-ramp',
    description: 'Buy crypto with your card, sell to your bank. Fiat to crypto and back, seamlessly.',
    icon: CreditCard,
    color: 'from-pink-500 to-rose-500',
    bgColor: 'bg-pink-500/10',
    borderColor: 'border-pink-500/30',
  },
];

export default function Demo() {
  const [activeFeature, setActiveFeature] = useState(0);
  const [sectionRef, isVisible] = useInView<HTMLElement>({ threshold: 0.1 });

  const currentFeature = features[activeFeature];
  const IconComponent = currentFeature.icon;

  return (
    <section id="demo" ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="container-main">
        {/* Header */}
        <div className={`text-center mb-16 animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium text-sm mb-6">
            <Zap className="w-4 h-4" />
            Get started in minutes
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            How it works
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            No complicated setup, no technical knowledge required.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative animate-on-scroll delay-${index + 1} ${isVisible ? 'is-visible' : ''}`}
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-gray-200 -z-10" />
              )}
              
              <div className="card p-6 text-center h-full">
                <div className="w-20 h-20 mx-auto mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
                  <span className="text-3xl font-bold text-gray-900">{step.number}</span>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Feature Spotlight */}
        <div className={`animate-on-scroll delay-4 ${isVisible ? 'is-visible' : ''}`}>
          <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-3xl overflow-hidden relative">
            {/* Background effects */}
            <div className="absolute top-0 left-1/4 w-64 h-64 bg-orange-500/20 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-yellow-500/15 rounded-full blur-[80px]" />
            
            <div className="relative flex flex-col lg:flex-row">
              {/* Left: Feature tabs */}
              <div className="lg:w-72 p-4 lg:p-6 lg:border-r border-white/10">
                <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0 scrollbar-hide">
                  {features.map((feature, index) => {
                    const FeatureIcon = feature.icon;
                    const isActive = activeFeature === index;
                    return (
                      <button
                        key={feature.id}
                        onClick={() => setActiveFeature(index)}
                        className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all whitespace-nowrap lg:whitespace-normal lg:w-full text-left ${
                          isActive
                            ? 'bg-white/10 border border-white/20'
                            : 'hover:bg-white/5 border border-transparent'
                        }`}
                      >
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                          isActive ? feature.bgColor : 'bg-white/5'
                        }`}>
                          <FeatureIcon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                        </div>
                        <span className={`font-medium ${isActive ? 'text-white' : 'text-gray-400'}`}>
                          {feature.shortTitle}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Right: Feature content */}
              <div className="flex-1 p-6 lg:p-10">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeFeature}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col lg:flex-row items-center gap-8"
                  >
                    {/* Icon showcase */}
                    <div className="relative">
                      <div className={`w-32 h-32 lg:w-40 lg:h-40 rounded-3xl bg-gradient-to-br ${currentFeature.color} flex items-center justify-center shadow-2xl`}>
                        <IconComponent className="w-16 h-16 lg:w-20 lg:h-20 text-white" />
                      </div>
                      {/* Decorative rings */}
                      <div className={`absolute -inset-4 rounded-[2rem] border ${currentFeature.borderColor} opacity-50`} />
                      <div className={`absolute -inset-8 rounded-[2.5rem] border ${currentFeature.borderColor} opacity-25`} />
                      {/* Sparkle */}
                      <motion.div 
                        className="absolute -top-2 -right-2"
                        animate={{ rotate: 360 }}
                        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                      >
                        <Sparkles className="w-6 h-6 text-yellow-400" />
                      </motion.div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 text-center lg:text-left">
                      <h3 className="text-2xl lg:text-3xl font-bold text-white mb-4">
                        {currentFeature.title}
                      </h3>
                      <p className="text-gray-400 text-lg mb-6 max-w-md">
                        {currentFeature.description}
                      </p>
                      
                      {/* Feature indicator dots */}
                      <div className="flex gap-2 justify-center lg:justify-start mb-8">
                        {features.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setActiveFeature(index)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              activeFeature === index 
                                ? 'w-6 bg-orange-500' 
                                : 'bg-white/30 hover:bg-white/50'
                            }`}
                          />
                        ))}
                      </div>

                      <a
                        href="https://my.blazewallet.io"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-orange-500/25 transition-all"
                      >
                        Try BLAZE now
                        <ArrowRight className="w-4 h-4" />
                      </a>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
