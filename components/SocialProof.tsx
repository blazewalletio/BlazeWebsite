'use client';

import { useEffect, useState } from 'react';
import { Shield, Lock, ScanSearch, KeyRound, CheckCircle, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useAnimateOnce } from '@/hooks/useAnimateOnce';

type WalletUpdate = {
  date: string;
  title: string;
  summary: string;
};

const securityFeatures = [
  { 
    icon: ScanSearch, 
    title: 'Every transaction scanned', 
    description: 'Real-time scam detection before you send',
  },
  { 
    icon: KeyRound, 
    title: 'Your keys, your crypto', 
    description: 'Non-custodial. We never have access.',
  },
  {
    icon: Lock, 
    title: 'Encrypted locally', 
    description: 'Private keys never leave your device',
  },
  {
    icon: CheckCircle, 
    title: 'Audit track', 
    description: 'Independent third-party security audit planned for Q1 2026',
  },
];

const partners = [
  { 
    name: 'Independent audit', 
    description: 'Third-party security review track (Q1 2026)',
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
  const [sectionRef, isVisible] = useAnimateOnce<HTMLElement>();
  const [walletUpdates, setWalletUpdates] = useState<WalletUpdate[]>([]);
  const [loadingUpdates, setLoadingUpdates] = useState(true);

  useEffect(() => {
    let isMounted = true;

    async function fetchWalletUpdates() {
      try {
        const res = await fetch('/api/updates/wallet');
        if (!res.ok) {
          throw new Error('Failed to fetch wallet updates');
        }
        const data = await res.json();
        if (isMounted) {
          setWalletUpdates((data.updates || []).slice(0, 2));
        }
      } catch (error) {
        console.error('Failed to load wallet updates for social proof:', error);
      } finally {
        if (isMounted) {
          setLoadingUpdates(false);
        }
      }
    }

    fetchWalletUpdates();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section ref={sectionRef} className="py-20 lg:py-28 bg-gray-50">
      <div className="container-main">
        {/* Header */}
        <div className={`text-center mb-12 animate-entrance ${isVisible ? 'is-visible' : ''}`}>
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
              className={`card p-6 animate-entrance delay-${Math.min(index + 1, 4)} ${isVisible ? 'is-visible' : ''}`}
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
        <div className={`card p-8 animate-entrance delay-4 ${isVisible ? 'is-visible' : ''}`}>
          <h3 className="text-xl font-bold text-gray-900 text-center mb-8">
            Trusted partners & integrations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <div 
                key={index}
                className="flex flex-col items-center p-6 rounded-2xl bg-gray-50 hover:bg-gray-100 transition-colors"
              >
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

        {/* Latest updates snapshot */}
        <div className={`mt-10 card p-8 animate-entrance delay-4 ${isVisible ? 'is-visible' : ''}`}>
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="text-xl font-bold text-gray-900">Latest shipped updates</h3>
            <Link href="/updates" className="text-orange-600 font-medium hover:text-orange-700 transition-colors">
              Full changelog
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {loadingUpdates && (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 md:col-span-2 text-sm text-gray-500">
                Loading latest wallet updates...
              </div>
            )}
            {!loadingUpdates && walletUpdates.length === 0 && (
              <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 md:col-span-2 text-sm text-gray-500">
                No wallet updates available right now.
              </div>
            )}
            {!loadingUpdates &&
              walletUpdates.map((update) => (
                <div key={`${update.date}-${update.title}`} className="rounded-2xl border border-gray-200 bg-gray-50 p-4">
                  <div className="text-xs text-gray-500 mb-1">{update.date}</div>
                  <div className="font-semibold text-gray-900 mb-1">{update.title}</div>
                  <p className="text-sm text-gray-600">{update.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className={`mt-12 text-center animate-entrance delay-4 ${isVisible ? 'is-visible' : ''}`}>
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
