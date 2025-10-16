'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Circle, Rocket, UserCircle, Code, Handshake } from 'lucide-react';

const roadmapPhases = [
  {
    phase: 'Q4 2024',
    title: 'Foundation',
    status: 'completed',
    items: [
      'Smart contracts development (39/39 tests passed)',
      'Security architecture & ReentrancyGuard',
      'Multi-chain wallet (5 chains)',
      'Advanced staking system (8-20% APY)',
      'Testnet deployment & verification',
    ],
  },
  {
    phase: 'Q1 2025',
    title: 'AI Integration & Launch',
    status: 'completed',
    items: [
      '5 AI features geïmplementeerd',
      'Biometric authentication (WebAuthn)',
      'NFT marketplace & minting',
      'Governance DAO system',
      'Launchpad platform',
    ],
  },
  {
    phase: 'Q2 2025',
    title: 'Presale & Mainnet',
    status: 'active',
    items: [
      'Public presale launch (LIVE)',
      'Mainnet deployment (BSC)',
      'DEX listings (PancakeSwap, Uniswap)',
      'CertiK audit completion',
      'Marketing campaign start',
    ],
  },
  {
    phase: 'Q3 2025',
    title: 'Exchange Listings',
    status: 'upcoming',
    items: [
      'Gate.io listing',
      'MEXC listing',
      'KuCoin application',
      'CoinGecko & CMC tracking',
      '10,000+ holders target',
    ],
  },
  {
    phase: 'Q4 2025',
    title: 'Ecosystem Expansion',
    status: 'upcoming',
    items: [
      'Cross-chain bridges',
      'Fiat on/off ramps (MoonPay)',
      'Mobile apps (iOS/Android)',
      'Hardware wallet support',
      '50,000+ users milestone',
    ],
  },
  {
    phase: '2026',
    title: 'Global Scale',
    status: 'upcoming',
    items: [
      'Binance listing (if metrics met)',
      'BLAZE debit card',
      'Enterprise solutions',
      'Advanced AI predictions',
      '100,000+ users & $500M+ FDV',
    ],
  },
];

export default function Roadmap() {
  return (
    <section id="roadmap" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/50" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Product <span className="text-gradient">roadmap</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Van MVP tot global scale. Transparante planning voor de komende jaren.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-orange-500 via-red-500 to-transparent" />

          {/* Phases */}
          <div className="space-y-12">
            {roadmapPhases.map((phase, index) => (
              <motion.div
                key={phase.phase}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative ${
                  index % 2 === 0 ? 'md:pr-1/2 md:text-right' : 'md:pl-1/2 md:ml-auto'
                } md:w-[calc(50%+2rem)]`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-auto md:right-[-1.75rem] top-8 md:top-8 w-4 h-4 rounded-full bg-gradient-blaze border-4 border-slate-900 z-10" />

                <div
                  className={`ml-12 md:ml-0 card-glass p-6 ${
                    phase.status === 'active'
                      ? 'border-2 border-orange-500 glow-orange'
                      : phase.status === 'completed'
                      ? 'border border-green-500/30'
                      : 'border border-white/10'
                  }`}
                >
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-blaze text-white text-sm font-bold mb-3">
                    {phase.status === 'completed' && <CheckCircle2 className="w-4 h-4" />}
                    {phase.status === 'active' && <Rocket className="w-4 h-4" />}
                    {phase.status === 'upcoming' && <Circle className="w-4 h-4" />}
                    {phase.phase}
                  </div>

                  <h3 className="text-2xl font-bold mb-4">{phase.title}</h3>

                  <ul className="space-y-2">
                    {phase.items.map((item, itemIndex) => (
                      <li key={itemIndex} className="flex items-start gap-2 text-gray-300">
                        {phase.status === 'completed' ? (
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                        ) : (
                          <Circle className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                        )}
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Team section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-20"
        >
          <h3 className="text-3xl font-bold mb-12 text-center">
            Meet the <span className="text-gradient">team</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Founder',
                role: 'Founder & CEO',
                icon: UserCircle,
                bio: 'Crypto entrepreneur met 5+ jaar ervaring in DeFi',
              },
              {
                name: 'Core Team',
                role: 'Development',
                icon: Code,
                bio: 'Full-stack developers gespecialiseerd in blockchain',
              },
              {
                name: 'Community',
                role: 'Advisors',
                icon: Handshake,
                bio: 'Ervaren crypto advisors en marketing experts',
              },
            ].map((member, index) => {
              const IconComponent = member.icon;
              return (
                <motion.div
                  key={member.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card-glass p-6 text-center hover:bg-white/10 transition-all"
                >
                  <div className="flex justify-center mb-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-blaze flex items-center justify-center">
                      <IconComponent className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-1">{member.name}</h4>
                  <p className="text-orange-400 text-sm font-medium mb-3">{member.role}</p>
                  <p className="text-gray-400 text-sm">{member.bio}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}


