'use client';

import { motion } from 'framer-motion';
import { Shield, CheckCircle2, Lock, FileCheck, Code, Eye } from 'lucide-react';

const securityFeatures = [
  {
    icon: Shield,
    title: 'Non-Custodial Wallet',
    description: 'You control your private keys. We never have access to your funds. Your crypto, your control.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: Lock,
    title: 'Biometric Authentication',
    description: 'WebAuthn support for fingerprint, face ID, and hardware keys. Enterprise-grade security.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: FileCheck,
    title: 'Smart Contract Audits',
    description: 'All smart contracts are verified and audited. CertiK audit completion planned for Q1 2026.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Code,
    title: 'Open Source',
    description: 'Transparent codebase. Community can review and verify our security practices.',
    color: 'from-orange-500 to-red-500',
  },
  {
    icon: Eye,
    title: 'Real-Time Monitoring',
    description: 'AI-powered scam detection scans every transaction before execution. Stay protected.',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    icon: CheckCircle2,
    title: 'Verified Contracts',
    description: 'All smart contracts are verified on block explorers. Transparent and auditable.',
    color: 'from-teal-500 to-cyan-500',
  },
];

const verificationLinks = [
  {
    label: 'Smart Contract Verification',
    href: 'https://bscscan.com/address/0x...',
    status: 'Verified',
  },
  {
    label: 'CertiK Audit Report',
    href: '#',
    status: 'Coming Q1 2026',
  },
  {
    label: 'GitHub Repository',
    href: 'https://github.com/blazewalletio',
    status: 'Public',
  },
];

export default function Security() {
  return (
    <section id="security" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-blaze mb-6">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
            Security & <span className="text-gradient">Trust</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Your security is our top priority. Built with enterprise-grade security practices.
          </p>
        </motion.div>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {securityFeatures.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
                className="card-glass p-6 hover:bg-white/10 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Verification Links */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="card-glass p-8 max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Verification & Audits</h3>
          <div className="space-y-4">
            {verificationLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                  <span className="font-semibold text-white">{link.label}</span>
                </div>
                <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm font-medium">
                  {link.status}
                </span>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Security Best Practices */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          className="mt-12 text-center"
        >
          <div className="card-glass p-8 max-w-4xl mx-auto bg-gradient-to-r from-orange-500/10 to-red-500/10 border-orange-500/30">
            <h3 className="text-2xl font-bold mb-4">Security Best Practices</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Never share your private keys</p>
                  <p className="text-sm text-gray-400">BLAZE will never ask for your private keys or seed phrase</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Enable biometric authentication</p>
                  <p className="text-sm text-gray-400">Use WebAuthn for the highest level of security</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Verify addresses before sending</p>
                  <p className="text-sm text-gray-400">Always double-check recipient addresses</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Use the scam detector</p>
                  <p className="text-sm text-gray-400">Let our AI check addresses before you interact</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

