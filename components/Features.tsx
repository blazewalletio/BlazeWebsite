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

const coreFeatures = [
  {
    icon: Wallet,
    title: 'Multi-chain wallet',
    description: 'Support voor 7 chains: Ethereum, BSC, Polygon, Arbitrum, Base, Sepolia, BSC Testnet. Één wallet voor alle chains met real-time switching.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Brain,
    title: '5 AI Features',
    description: 'Transaction Assistant, Scam Detector, Portfolio Advisor, Gas Optimizer en Crypto Expert. De meest intelligente wallet.',
    gradient: 'from-purple-600 to-pink-600',
  },
  {
    icon: TrendingUp,
    title: 'Advanced staking',
    description: '8% APY flexible, 15% APY 6-maanden lock, 20% APY 1-jaar lock. Earn passief inkomen met je BLAZE tokens.',
    gradient: 'from-orange-500 to-red-500',
  },
  {
    icon: Fingerprint,
    title: 'Biometric security',
    description: 'WebAuthn biometric authentication, QR login, hardware key support, en encrypted local storage voor maximale veiligheid.',
    gradient: 'from-green-500 to-emerald-500',
  },
  {
    icon: Palette,
    title: 'NFT marketplace',
    description: 'Mint, trade en collect NFTs. Plus: personaliseer je wallet met unieke NFT skins (Common, Rare, Epic, Legendary).',
    gradient: 'from-pink-500 to-rose-500',
  },
  {
    icon: Vote,
    title: 'DAO governance',
    description: 'Stem over proposals, suggest wijzigingen en help de toekomst bepalen. 1 token = 1 stem. Create proposals vanaf 10,000 BLAZE.',
    gradient: 'from-indigo-500 to-purple-500',
  },
  {
    icon: Rocket,
    title: 'Launchpad',
    description: 'Investeer in nieuwe projecten via de BLAZE Launchpad. Early access voor premium holders. Soft cap / Hard cap systeem.',
    gradient: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Repeat,
    title: 'Token Swap',
    description: '1inch DEX aggregator integratie voor beste rates. Swap tussen alle tokens op alle chains. Live exchange rates.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: Gift,
    title: 'Cashback & Referral',
    description: 'Earn cashback op swaps, sends, buys, stakes. Referral programma met signup rewards en fee sharing. Lifetime earnings tracking.',
    gradient: 'from-green-500 to-teal-500',
  },
  {
    icon: Award,
    title: 'Premium membership',
    description: 'Stake 10,000+ BLAZE voor premium status: tot 75% fee discount, exclusive features, early access en premium support.',
    gradient: 'from-purple-400 to-pink-500',
  },
  {
    icon: Smartphone,
    title: 'PWA & Mobile',
    description: 'Installable als native app. Offline support, push notifications ready. Mobile-first design met bottom navigation.',
    gradient: 'from-blue-400 to-indigo-500',
  },
  {
    icon: Globe,
    title: 'Multi-language',
    description: 'Nederlands & Engels support. Uitbreidbaar naar meer talen. next-intl integratie voor volledige localisatie.',
    gradient: 'from-teal-500 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Lightning performance',
    description: '60fps animaties, instant updates, sub-second transactions. Buttery smooth op alle devices. Optimized gas usage.',
    gradient: 'from-yellow-400 to-yellow-600',
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
            De meest <span className="text-gradient">intelligente</span> crypto wallet
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
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
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 px-4">
              <span className="text-gradient">5 Geavanceerde AI Features</span>
            </h3>
            <p className="text-gray-400 px-4 text-sm sm:text-base">
              Artificiële intelligentie die je wallet slimmer, veiliger en makkelijker maakt
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="card-glass p-4 sm:p-6 hover:bg-white/10 transition-all group cursor-pointer border-2 border-purple-500/30"
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

        {/* Comparison Section */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 px-4">
              BLAZE vs <span className="text-gradient">Traditional Wallets</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto px-4 text-sm sm:text-base">
              Ontdek waarom BLAZE de toekomst van crypto wallets is
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="card-glass p-4 sm:p-6 lg:p-8 max-w-5xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {/* Traditional Wallets */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 flex items-center justify-center">
                    <Wallet className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-gray-300">Traditional Wallets</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-300 font-medium">Complex interfaces</p>
                      <p className="text-gray-500 text-sm">Steep learning curve for beginners</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-300 font-medium">Manual security checks</p>
                      <p className="text-gray-500 text-sm">Users vulnerable to scams and phishing</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-300 font-medium">Basic features only</p>
                      <p className="text-gray-500 text-sm">Limited to simple send/receive</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-300 font-medium">No optimization tools</p>
                      <p className="text-gray-500 text-sm">Overpay for gas fees</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-gray-300 font-medium">Limited support</p>
                      <p className="text-gray-500 text-sm">No help when you need it</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* BLAZE Wallet */}
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-gradient-blaze flex items-center justify-center">
                    <Brain className="w-6 h-6 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold text-white">BLAZE Wallet</h4>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium">AI-powered simplicity</p>
                      <p className="text-gray-400 text-sm">Natural language commands</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium">Smart scam detection</p>
                      <p className="text-gray-400 text-sm">Real-time security scanning</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium">Complete DeFi platform</p>
                      <p className="text-gray-400 text-sm">Staking, NFTs, governance & more</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium">Gas price optimization</p>
                      <p className="text-gray-400 text-sm">Save money with ML predictions</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    <div>
                      <p className="text-white font-medium">24/7 AI assistance</p>
                      <p className="text-gray-400 text-sm">Expert help whenever you need it</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Core Features Section */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h3 className="text-2xl sm:text-3xl font-bold mb-3 px-4">
              Core <span className="text-gradient">Features</span>
            </h3>
            <p className="text-gray-400 max-w-2xl mx-auto px-4 text-sm sm:text-base">
              De belangrijkste features die BLAZE uniek maken. Krachtig, veilig en gebruiksvriendelijk.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {coreFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="card-glass p-6 sm:p-8 hover:bg-white/10 transition-all group cursor-pointer text-center"
              >
                <div className={`w-12 h-12 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 sm:mb-6 mx-auto group-hover:scale-110 transition-transform shadow-lg`}>
                  <feature.icon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{feature.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}



