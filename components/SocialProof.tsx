'use client';

import { motion } from 'framer-motion';
import { Users, TrendingUp, Shield, Zap, Star, Award } from 'lucide-react';

const stats = [
  { icon: Users, value: '10,000+', label: 'Active Users', color: 'from-blue-500 to-cyan-500' },
  { icon: TrendingUp, value: '$2.5M+', label: 'Market Cap', color: 'from-green-500 to-emerald-500' },
  { icon: Shield, value: '100%', label: 'Non-Custodial', color: 'from-purple-500 to-pink-500' },
  { icon: Zap, value: '18', label: 'Blockchains', color: 'from-orange-500 to-red-500' },
];

const testimonials = [
  {
    name: 'Alex M.',
    role: 'DeFi Enthusiast',
    content: 'The AI Transaction Assistant is a game-changer. I can finally use crypto without feeling overwhelmed.',
    rating: 5,
  },
  {
    name: 'Sarah K.',
    role: 'Crypto Trader',
    content: 'Best wallet I\'ve used. The scam detector saved me from a phishing attack. Staking rewards are amazing too!',
    rating: 5,
  },
  {
    name: 'Mike R.',
    role: 'NFT Collector',
    content: 'Love the NFT marketplace and wallet skins. The 20% APY staking is incredible. Highly recommend!',
    rating: 5,
  },
];

const partners = [
  { name: 'CertiK', type: 'Security Audit' },
  { name: 'PancakeSwap', type: 'DEX Partner' },
  { name: '1inch', type: 'DEX Aggregator' },
  { name: 'MoonPay', type: 'Fiat On-Ramp' },
];

export default function SocialProof() {
  return (
    <section id="social-proof" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Section */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
            Trusted by <span className="text-gradient">thousands</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Join the growing community of BLAZE users
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-20">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
                className="card-glass p-6 text-center hover:bg-white/10 transition-all"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center mb-4 mx-auto`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400">{stat.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Testimonials Section */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mb-16"
        >
          <h3 className="text-2xl sm:text-3xl font-bold text-center mb-12">
            What our <span className="text-gradient">users say</span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
                className="card-glass p-6 hover:bg-white/10 transition-all"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-300 mb-4 italic">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold text-white">{testimonial.name}</div>
                  <div className="text-sm text-gray-400">{testimonial.role}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Partners Section */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center"
        >
          <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 px-4">
            Trusted <span className="text-gradient">Partners</span>
          </h3>
          {/* Mobile: Grid layout, Desktop: Flex layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:flex lg:flex-wrap lg:justify-center gap-4 sm:gap-6 lg:gap-8 px-4">
            {partners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1, ease: "easeOut" }}
                className="card-glass px-5 py-4 sm:px-6 sm:py-4 hover:bg-white/10 transition-all w-full sm:w-auto"
              >
                <div className="flex items-center gap-3 sm:gap-3">
                  <Award className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400 flex-shrink-0" />
                  <div className="text-left flex-1 min-w-0">
                    <div className="font-bold text-white text-sm sm:text-base truncate">{partner.name}</div>
                    <div className="text-xs text-gray-400 truncate">{partner.type}</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

