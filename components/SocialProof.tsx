'use client';

import { Shield, Lock, ScanSearch, KeyRound, CheckCircle, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import { useInView } from '@/hooks/useInView';

const securityFeatures = [
  { 
    icon: ScanSearch, 
    title: 'Every transaction scanned', 
    description: 'Real-time scam detection before you send',
  },
  { 
    icon: KeyRound, 
    title: 'Your keys, your crypto', 
    description: 'Non-custodial – we never have access',
  },
  { 
    icon: Lock, 
    title: 'Encrypted locally', 
    description: 'Private keys never leave your device',
  },
  { 
    icon: CheckCircle, 
    title: 'CertiK audit', 
    description: 'Professional security audit Q1 2026',
  },
];

const partners = [
  { 
    name: 'CertiK', 
    description: 'Security audit (Q1 2026)',
    logo: '/partners/certik.png',
    height: 40,
    invert: false,
  },
  { 
    name: 'Li.Fi', 
    description: 'Token swaps',
    logo: '/partners/lifi.png',
    height: 24,
    invert: true,
  },
  { 
    name: 'Onramper', 
    description: 'Fiat on/off ramp',
    logo: '/partners/onramper.svg',
    height: 28,
    invert: false,
  },
];

export default function SocialProof() {
  const [sectionRef, isVisible] = useInView<HTMLElement>({ threshold: 0.1 });

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-gray-50">
      <div className="container-main">
        {/* Header */}
        <div className={`text-center mb-12 animate-on-scroll ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium text-sm mb-6">
            <Shield className="w-4 h-4" />
            Security first
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Built for <span className="text-gradient-brand">security</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your security is our top priority. Non-custodial means you're always in control.
          </p>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {securityFeatures.map((feature, index) => (
            <div
              key={feature.title}
              className={`card p-6 animate-on-scroll delay-${index + 1} ${isVisible ? 'is-visible' : ''}`}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-sm text-gray-500">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Partners */}
        <div className={`card p-8 animate-on-scroll delay-4 ${isVisible ? 'is-visible' : ''}`}>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-8">
            Trusted partners & integrations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                {/* Logo container */}
                <div className="w-full h-16 bg-white rounded-xl flex items-center justify-center mb-4 px-4">
                  <Image
                    src={partner.logo}
                    alt={`${partner.name} logo`}
                    width={120}
                    height={partner.height}
                    className={`object-contain ${partner.invert ? 'invert' : ''}`}
                    style={{ height: partner.height, width: 'auto', maxWidth: '100%' }}
                  />
                </div>
                <div className="font-bold text-gray-900 text-lg">{partner.name}</div>
                <div className="text-sm text-gray-500">{partner.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-12 text-center animate-on-scroll delay-4 ${isVisible ? 'is-visible' : ''}`}>
          <p className="text-gray-600 mb-4">Want to learn more about our security?</p>
          <a
            href="/whitepaper"
            className="inline-flex items-center gap-2 text-sky-600 font-medium hover:text-sky-700 transition-colors"
          >
            Read our whitepaper
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
