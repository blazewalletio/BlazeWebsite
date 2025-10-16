'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import WalletDemo from './WalletDemo';

export default function Demo() {
  return (
    <section id="demo" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Zie BLAZE <span className="text-gradient">in actie</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Test de meest intelligente crypto wallet. Met AI, NFTs, Staking, Governance en meer. Volledig gratis.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          {/* Demo container */}
          <div className="relative rounded-2xl overflow-hidden card-glass border-2 border-orange-500/30 glow-orange bg-white">
            {/* Corner badges */}
            <div className="absolute top-4 right-4 z-50 flex gap-2">
              <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/30 text-green-400 text-sm font-bold flex items-center gap-1">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                LIVE DEMO
              </div>
            </div>
            
            {/* Wallet Demo Component */}
            <WalletDemo />
          </div>

          {/* Quick stats below demo */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
          >
            {[
              { label: 'AI Features', value: '5' },
              { label: 'Supported chains', value: '5' },
              { label: 'Max APY', value: '20%' },
              { label: 'Fee discount', value: '75%' },
            ].map((stat, index) => (
              <div key={index} className="card-glass p-4 text-center">
                <div className="text-2xl md:text-3xl font-bold text-gradient mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="text-center mt-8"
          >
            <a
              href="https://my.blazewallet.io"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-blaze rounded-xl font-bold text-lg hover:scale-105 transition-transform glow-orange"
            >
              Open de wallet
              <ExternalLink className="w-5 h-5" />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}


