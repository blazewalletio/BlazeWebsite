'use client';

import { motion } from 'framer-motion';
import { 
  Wallet, Lock, Repeat, TrendingUp, Users, Rocket, 
  Palette, Gift, Shield, Zap, Globe, Award 
} from 'lucide-react';

const features = [
  {
    icon: Wallet,
    title: 'Multi-chain wallet',
    description: 'Support voor Ethereum, BSC, Polygon, Arbitrum, Base en meer. Één wallet voor alle chains.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Lock,
    title: 'Non-custodial & secure',
    description: 'Jouw keys, jouw crypto. AES-256 encryptie en biometric authentication voor maximale veiligheid.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Repeat,
    title: 'Token swaps',
    description: 'Swap tokens direct in-app via 1inch DEX aggregator. Altijd de beste rates.',
    gradient: 'from-purple-500 to-pink-500',
  },
  {
    icon: TrendingUp,
    title: 'Staking (8-20% APY)',
    description: 'Stake BLAZE tokens en earn passief inkomen. Flexible, 6 maanden of 1 jaar lock periodes.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Users,
    title: 'DAO governance',
    description: 'Stem mee over de toekomst van BLAZE. Één token = één stem. True decentralization.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Rocket,
    title: 'Launchpad',
    description: 'Early access tot nieuwe crypto projects. BLAZE holders krijgen exclusieve deals.',
    gradient: 'from-yellow-500 to-orange-500',
  },
  {
    icon: Palette,
    title: 'NFT wallet skins',
    description: 'Personaliseer je wallet met unieke NFT skins. Collect, trade en flex.',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Gift,
    title: 'Cashback rewards',
    description: 'Earn BLAZE tokens bij elke transactie. Meer je gebruikt, meer je verdient.',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Shield,
    title: 'Verified contracts',
    description: 'Alle smart contracts zijn verified op BscScan. Transparant en trustworthy.',
    gradient: 'from-red-500 to-orange-500',
  },
  {
    icon: Zap,
    title: 'Lightning fast',
    description: 'Optimized voor snelheid. Transactions in seconden, niet minuten.',
    gradient: 'from-yellow-400 to-yellow-600',
  },
  {
    icon: Globe,
    title: 'PWA support',
    description: 'Installeer als app op je phone. Works offline, native feel.',
    gradient: 'from-blue-400 to-blue-600',
  },
  {
    icon: Award,
    title: 'Premium membership',
    description: 'Stake 10,000+ BLAZE voor lifetime premium. Fee discounts en exclusive features.',
    gradient: 'from-purple-400 to-pink-500',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-20 overflow-hidden">
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
            Packed with <span className="text-gradient">features</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Meer dan alleen een wallet. BLAZE is een complete DeFi ecosystem.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="card-glass p-6 hover:bg-white/10 transition-all group cursor-pointer"
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

