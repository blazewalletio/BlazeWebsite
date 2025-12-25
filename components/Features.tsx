'use client';

import { Brain, Shield, TrendingUp, Wallet, QrCode, Repeat, Sparkles, Image as ImageIcon, Vote } from 'lucide-react';
import { useInView } from '@/hooks/useInView';

const features = [
  {
    icon: QrCode,
    title: 'QuickPay',
    description: 'Scan a QR code and pay in seconds. At the coffee shop, supermarket, anywhere.',
    color: 'text-orange-500',
    bg: 'bg-orange-100',
  },
  {
    icon: Brain,
    title: 'AI assistant',
    description: 'Type natural language commands like "Send 50 USDC to..." and let AI handle the rest.',
    color: 'text-purple-500',
    bg: 'bg-purple-100',
  },
  {
    icon: Shield,
    title: 'Scam protection',
    description: 'Real-time scanning of addresses and contracts. Get a risk score before you interact.',
    color: 'text-emerald-500',
    bg: 'bg-emerald-100',
  },
  {
    icon: TrendingUp,
    title: 'Smart gas optimizer',
    description: 'Unique smart scheduling finds the best time to transact. Save up to 40% on gas fees automatically.',
    color: 'text-sky-500',
    bg: 'bg-sky-100',
  },
];

const additionalFeatures = [
  { icon: Wallet, text: '18 blockchains' },
  { icon: Repeat, text: 'Token swaps' },
  { icon: ImageIcon, text: 'NFT support' },
  { icon: Vote, text: 'DAO governance' },
];

export default function Features() {
  const [sectionRef, isVisible] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section 
      id="features" 
      ref={sectionRef}
      className="py-20 lg:py-28 bg-gray-50"
    >
      <div className="container-main">
        {/* Header */}
        <div className={`text-center mb-16 animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-medium text-sm mb-6">
            <Sparkles className="w-4 h-4" />
            More than a wallet
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            A wallet for <span className="text-gradient-brand">real life</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We believe crypto should be used, not just held. That's why BLAZE comes with everything 
            you need to pay, save, and grow your crypto.
          </p>
        </div>

        {/* Main features grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className={`card p-8 hover:shadow-soft-lg transition-shadow duration-200 animate-on-scroll delay-${index + 1} ${isVisible ? 'is-visible' : ''}`}
            >
              <div className={`icon-box-lg ${feature.bg} mb-6`}>
                <feature.icon className={`w-8 h-8 ${feature.color}`} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Additional features bar */}
        <div className={`card p-6 animate-on-scroll delay-4 ${isVisible ? 'is-visible' : ''}`}>
          <div className="flex flex-wrap justify-center gap-6 md:gap-12">
            {additionalFeatures.map((item, index) => (
              <div key={index} className="flex items-center gap-2 text-gray-700">
                <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
                  <item.icon className="w-4 h-4 text-gray-500" />
                </div>
                <span className="font-medium">{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
