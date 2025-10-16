'use client';

import { motion } from 'framer-motion';
import { 
  Wallet, Lock, Repeat, TrendingUp, Users, Rocket, 
  Palette, Gift, Shield, Zap, Globe, Award, Brain, 
  ScanEye, PieChart, Fuel, MessageSquare, Smartphone,
  Languages, QrCode, Fingerprint, DollarSign, Vote
} from 'lucide-react';

const aiFeatures = [
  {
    icon: Brain,
    title: 'AI Transaction Assistant',
    description: 'Natuurlijke taal interface: typ "Stuur 50 USDC naar 0x..." en de AI doet de rest. Offline + OpenAI powered.',
    gradient: 'from-purple-600 to-pink-600',
    badge: 'AI',
  },
  {
    icon: ScanEye,
    title: 'Smart Scam Detector',
    description: 'Real-time security scanning van adressen en contracts. Krijg een risico score voordat je interacteert.',
    gradient: 'from-red-600 to-orange-600',
    badge: 'AI',
  },
  {
    icon: PieChart,
    title: 'AI Portfolio Advisor',
    description: 'Gepersonaliseerde portfolio analyse met diversificatie score en actionable recommendations.',
    gradient: 'from-blue-600 to-cyan-600',
    badge: 'AI',
  },
  {
    icon: Fuel,
    title: 'Predictive Gas Optimizer',
    description: 'ML-based gas price voorspelling. Bespaar geld door te transacteren op optimale tijden.',
    gradient: 'from-green-600 to-emerald-600',
    badge: 'AI',
  },
  {
    icon: MessageSquare,
    title: 'Conversational Crypto Assistant',
    description: '24/7 AI crypto expert. Stel vragen over DeFi, gas, slippage en meer. Context-aware antwoorden.',
    gradient: 'from-indigo-600 to-purple-600',
    badge: 'AI',
  },
];

const featureCategories = [
  {
    title: 'Core Wallet',
    subtitle: 'Essential wallet functionality',
    gradient: 'from-blue-500 to-cyan-500',
    borderColor: 'border-blue-500/30',
    features: [
      {
        icon: Wallet,
        title: 'Multi-chain wallet',
        description: 'Support voor Ethereum, BSC, Polygon, Arbitrum, Base. Één wallet voor alle chains.',
        gradient: 'from-blue-500 to-cyan-500',
      },
      {
        icon: Zap,
        title: 'Lightning performance',
        description: '60fps animaties, instant updates, sub-second transactions. Buttery smooth op alle devices.',
        gradient: 'from-yellow-400 to-yellow-600',
      },
      {
        icon: Smartphone,
        title: 'Progressive Web App',
        description: 'Installeer als native app op iOS/Android. Works offline, push notifications.',
        gradient: 'from-blue-400 to-blue-600',
      },
      {
        icon: Languages,
        title: 'Multi-language',
        description: 'Volledig vertaald naar Nederlands, Engels, Spaans, Frans en Duits.',
        gradient: 'from-orange-400 to-red-500',
      },
    ],
  },
  {
    title: 'DeFi Features',
    subtitle: 'Advanced DeFi functionality',
    gradient: 'from-orange-500 to-red-500',
    borderColor: 'border-orange-500/30',
    features: [
      {
        icon: TrendingUp,
        title: 'Advanced staking',
        description: '8% APY flexible, 15% APY 6-maanden lock, 20% APY 1-jaar lock. Earn passief inkomen.',
        gradient: 'from-orange-500 to-red-500',
      },
      {
        icon: Vote,
        title: 'DAO governance',
        description: 'Stem over proposals, suggest wijzigingen en help de toekomst bepalen. 1 token = 1 stem.',
        gradient: 'from-indigo-500 to-purple-500',
      },
      {
        icon: Repeat,
        title: 'Instant swaps',
        description: 'Swap tokens via 1inch DEX aggregator. Altijd de beste rates, lage slippage.',
        gradient: 'from-purple-500 to-pink-500',
      },
      {
        icon: Gift,
        title: 'Cashback rewards',
        description: 'Earn BLAZE tokens bij elke transactie. Meer je gebruikt, meer je verdient.',
        gradient: 'from-teal-500 to-cyan-500',
      },
    ],
  },
  {
    title: 'Advanced Features',
    subtitle: 'Premium and innovative features',
    gradient: 'from-purple-500 to-pink-500',
    borderColor: 'border-purple-500/30',
    features: [
      {
        icon: Rocket,
        title: 'Project launchpad',
        description: 'Early access tot nieuwe crypto projects. BLAZE stakers krijgen exclusieve allocations.',
        gradient: 'from-yellow-500 to-orange-500',
      },
      {
        icon: Palette,
        title: 'NFT marketplace',
        description: 'Mint, trade en collect NFTs. Plus: personaliseer je wallet met unieke NFT skins.',
        gradient: 'from-pink-500 to-rose-500',
      },
      {
        icon: Award,
        title: 'Premium membership',
        description: 'Stake 10,000+ BLAZE voor premium status: tot 75% fee discount en exclusive features.',
        gradient: 'from-purple-400 to-pink-500',
      },
      {
        icon: QrCode,
        title: 'QR login & payments',
        description: 'Instant QR code payments, cross-device login, en merchant payment support.',
        gradient: 'from-blue-400 to-indigo-500',
      },
    ],
  },
  {
    title: 'Security & Audit',
    subtitle: 'Enterprise-grade security',
    gradient: 'from-green-500 to-emerald-500',
    borderColor: 'border-green-500/30',
    features: [
      {
        icon: Shield,
        title: 'Verified & audited',
        description: 'Smart contracts verified op BSCScan. Audit door CertiK. 100% transparant en open-source.',
        gradient: 'from-red-500 to-orange-500',
      },
      {
        icon: Fingerprint,
        title: 'Biometric security',
        description: 'WebAuthn biometric authentication, hardware key support, encrypted local storage.',
        gradient: 'from-green-500 to-emerald-500',
      },
    ],
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
            De meest <span className="text-gradient">intelligente</span> crypto wallet
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            BLAZE combineert geavanceerde AI met complete DeFi functionaliteit. Jouw persoonlijke crypto assistent.
          </p>
        </motion.div>

        {/* AI Features Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h3 className="text-3xl font-bold mb-3">
              <span className="text-gradient">5 Geavanceerde AI Features</span>
            </h3>
            <p className="text-gray-400">
              Artificiële intelligentie die je wallet slimmer, veiliger en makkelijker maakt
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="card-glass p-6 hover:bg-white/10 transition-all group cursor-pointer border-2 border-purple-500/30"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold">
                    AI
                  </span>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Categorized Features Section */}
        <div className="space-y-16">
          {featureCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className="relative"
            >
              {/* Category Header */}
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold mb-2">
                  <span className={`bg-gradient-to-r ${category.gradient} bg-clip-text text-transparent`}>
                    {category.title}
                  </span>
                </h3>
                <p className="text-gray-400 text-lg">{category.subtitle}</p>
              </div>

              {/* Category Features Grid */}
              <div className={`card-glass p-8 border-2 ${category.borderColor} bg-gradient-to-br from-slate-900/50 to-slate-800/30`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {category.features.map((feature, featureIndex) => (
                    <motion.div
                      key={feature.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: (categoryIndex * 0.1) + (featureIndex * 0.05) }}
                      whileHover={{ scale: 1.05, y: -5 }}
                      className="card-glass p-6 hover:bg-white/10 transition-all group cursor-pointer"
                    >
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
                      <p className="text-gray-400 text-sm">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


