'use client';

import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'How does the AI Transaction Assistant work?',
    answer: 'Simply type natural language commands like "Send 50 USDC to 0x..." and our AI will handle the transaction details automatically. The AI uses both offline processing and OpenAI integration to understand your intent and execute transactions safely.',
  },
  {
    question: 'Is BLAZE Wallet safe and secure?',
    answer: 'Yes! BLAZE is a non-custodial wallet, meaning you control your private keys. We use WebAuthn biometric authentication, encrypted local storage, and smart contract verification. Your funds are never stored on our servers.',
  },
  {
    question: 'How do I earn rewards with staking?',
    answer: 'Stake your BLAZE tokens to earn passive income: 8% APY for flexible staking, 15% APY for 6-month lock, and 20% APY for 1-year lock. Rewards are distributed automatically and can be claimed at any time.',
  },
  {
    question: 'What are the transaction fees?',
    answer: 'Transaction fees vary by blockchain network. However, by staking BLAZE tokens, you can get up to 75% discount on all fees. The more you stake, the higher your discount tier (10%, 25%, 50%, or 75%).',
  },
  {
    question: 'Which blockchain networks are supported?',
    answer: 'BLAZE supports 18 blockchain networks: Ethereum, BSC, Polygon, Arbitrum, Base, Sepolia, BSC Testnet, Avalanche, Optimism, Fantom, Cronos, Klaytn, Aurora, Gnosis, Celo, Moonbeam, Moonriver, and Harmony.',
  },
  {
    question: 'How does the Smart Scam Detector work?',
    answer: 'Before you interact with any address or contract, our AI scans it in real-time and provides a risk score. It checks for known scam patterns, suspicious activity, and contract vulnerabilities to help protect your funds.',
  },
  {
    question: 'Can I use BLAZE on mobile?',
    answer: 'Yes! BLAZE is a Progressive Web App (PWA) that works on all devices. You can install it on your phone like a native app, and it works offline. Mobile-first design ensures the best experience on smartphones.',
  },
  {
    question: 'What is the token supply and distribution?',
    answer: 'Total supply is 1 billion BLAZE tokens. Distribution: 20% Community Rewards, 15% Public Sale, 15% Treasury, 15% Founder Vesting, 10% Liquidity, 10% Team (3yr vesting), 10% Founder Unlocked, and 5% Strategic (2yr vesting).',
  },
  {
    question: 'How do I participate in governance?',
    answer: 'Hold BLAZE tokens to vote on proposals (1 token = 1 vote). You can create proposals if you hold 10,000+ BLAZE tokens. Help shape the future of BLAZE through our DAO governance system.',
  },
  {
    question: 'What is the presale price and launch price?',
    answer: 'Presale price is $0.00417 per BLAZE token. Launch price on DEX will be $0.01 per token. Early presale participants get a significant discount before public launch.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/50" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-blaze mb-6">
            <HelpCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
            Frequently Asked <span className="text-gradient">Questions</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Everything you need to know about BLAZE Wallet. Can't find your answer? Contact us.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
              className="card-glass overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-900 rounded-lg"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <h3 className="text-lg sm:text-xl font-bold text-white pr-4">
                  {faq.question}
                </h3>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                id={`faq-answer-${index}`}
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 pb-6 text-gray-400 leading-relaxed">
                  {faq.answer}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5, ease: "easeOut" }}
          className="text-center mt-12"
        >
          <p className="text-gray-400 mb-4">Still have questions?</p>
          <a
            href="mailto:info@blazewallet.io"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-blaze rounded-xl font-bold hover:scale-105 transition-transform glow-orange"
          >
            Contact Support
          </a>
        </motion.div>
      </div>
    </section>
  );
}

