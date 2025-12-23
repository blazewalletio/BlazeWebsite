'use client';

import { motion } from 'framer-motion';
import { Shield, Wallet, Cpu, TrendingUp, ExternalLink } from 'lucide-react';
import Image from 'next/image';

const stats = [
  { 
    icon: Wallet, 
    value: '18', 
    label: 'Blockchains', 
    description: 'Multi-chain support',
  },
  { 
    icon: Cpu, 
    value: '5', 
    label: 'AI features', 
    description: 'Smart assistance',
  },
  { 
    icon: TrendingUp, 
    value: '20%', 
    label: 'Max APY', 
    description: 'Staking rewards',
  },
  { 
    icon: Shield, 
    value: '100%', 
    label: 'Non-custodial', 
    description: 'Your keys, your crypto',
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
  return (
    <section className="py-20 lg:py-28 bg-gray-50">
      <div className="container-main">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
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
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card p-6 text-center"
            >
              <div className="icon-box mx-auto mb-4 bg-gray-100">
                <stat.icon className="w-6 h-6 text-gray-600" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">
                {stat.value}
              </div>
              <div className="font-medium text-gray-900 mb-1">{stat.label}</div>
              <div className="text-sm text-gray-500">{stat.description}</div>
            </motion.div>
          ))}
        </div>

        {/* Partners */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="card p-8"
        >
          <h3 className="text-xl font-bold text-gray-900 text-center mb-8">
            Trusted partners & integrations
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {partners.map((partner, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.5 + index * 0.1 }}
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
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-12 text-center"
        >
          <p className="text-gray-600 mb-4">Want to learn more about our security?</p>
          <a
            href="/whitepaper"
            className="inline-flex items-center gap-2 text-sky-600 font-medium hover:text-sky-700 transition-colors"
          >
            Read our whitepaper
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
