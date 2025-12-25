'use client';

import { ArrowRight, Check, Monitor, Smartphone, Zap } from 'lucide-react';
import { useState } from 'react';
import { useInView } from '@/hooks/useInView';

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

export default function Demo() {
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [sectionRef, isVisible] = useInView<HTMLElement>({ threshold: 0.1 });

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

        {/* App preview */}
        <div className={`card p-6 md:p-8 animate-on-scroll delay-4 ${isVisible ? 'is-visible' : ''}`}>
          <div className="flex flex-col lg:flex-row gap-8 items-center">
            {/* Preview toggle & image */}
            <div className="flex-1 w-full">
              {/* View toggle */}
              <div className="flex justify-center gap-2 mb-6">
                <button
                  onClick={() => setViewMode('desktop')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === 'desktop'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  Desktop
                </button>
                <button
                  onClick={() => setViewMode('mobile')}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                    viewMode === 'mobile'
                      ? 'bg-gray-900 text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  Mobile
                </button>
              </div>

              {/* Screenshot area */}
              <div className="relative aspect-video bg-gray-100 rounded-2xl overflow-hidden border border-gray-200">
                {viewMode === 'desktop' ? (
                  <img 
                    src="/screenshots/desktop-wallet.png" 
                    alt="BLAZE Wallet Desktop Interface"
                    className="w-full h-full object-cover object-top"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-50">
                    <img 
                      src="/screenshots/mobile-wallet.png" 
                      alt="BLAZE Wallet Mobile Interface"
                      className="h-full object-contain"
                    />
                  </div>
                )}
                
                {/* Live badge */}
                <div className="absolute top-4 right-4">
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500 text-white text-sm font-medium rounded-full">
                    <span className="w-2 h-2 bg-white rounded-full animate-pulse" />
                    Live
                  </div>
                </div>
              </div>
            </div>

            {/* Features list */}
            <div className="lg:w-80 flex-shrink-0">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Try it yourself</h3>
              <ul className="space-y-4 mb-6">
                {[
                  'AI transaction assistant',
                  'Real-time scam detection',
                  'Multi-chain portfolio',
                  'Staking dashboard',
                  'Token swaps',
                  'NFT gallery',
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center flex-shrink-0">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
              <a
                href="https://my.blazewallet.io"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Open the wallet
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
