'use client';

import { motion } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    question: 'What is BLAZE Wallet?',
    answer: 'BLAZE is an AI-powered crypto wallet that makes managing your digital assets simple and secure. It supports 18 blockchain networks, includes advanced AI features like scam detection and natural language transactions, and will offer staking rewards up to 20% APY starting Q1 2026.',
  },
  {
    question: 'Is BLAZE Wallet safe?',
    answer: 'Yes! BLAZE is a non-custodial wallet, meaning you control your private keys at all times. We use WebAuthn biometric authentication, encrypted local storage, and your funds are never stored on our servers. A CertiK security audit is scheduled for Q1 2026.',
  },
  {
    question: 'How does QuickPay work?',
    answer: 'QuickPay lets you pay with crypto anywhere in seconds. Simply scan a QR code, confirm the amount, and the payment is processed in under 2 seconds. It works with stablecoins like USDC and USDT for consistent value.',
  },
  {
    question: 'What blockchain networks are supported?',
    answer: 'BLAZE supports 18+ networks including Ethereum, BSC, Polygon, Arbitrum, Base, Avalanche, Optimism, Fantom, Cronos, and more. We continuously add support for new networks.',
  },
  {
    question: 'When does staking launch?',
    answer: 'Staking launches in Q1 2026 alongside our public beta. You\'ll be able to earn passive income: 8% APY for flexible staking (unstake anytime), 15% APY for 6-month lock, and 20% APY for 1-year lock. Rewards will be distributed automatically.',
  },
  {
    question: 'When is the BLAZE token presale?',
    answer: 'The BLAZE token presale is scheduled for Q1 2026, alongside the launch of our iOS and Android apps. Early supporters will get access to discounted tokens before the public launch. Join our community to stay updated on exact dates.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white">
      <div className="container-main">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <div className="icon-box-lg bg-gray-100 mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-gray-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Frequently asked <span className="text-gradient-brand">questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about BLAZE Wallet.
            </p>
          </motion.div>

          {/* FAQ list */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="card overflow-hidden"
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-gray-900 rotate-180' 
                      : 'bg-gray-100'
                  }`}>
                    <ChevronDown
                      className={`w-5 h-5 transition-colors ${
                        openIndex === index ? 'text-white' : 'text-gray-500'
                      }`}
                    />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
