'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Download, BookOpen, Brain, Shield, Zap, Users, Coins, Rocket, Globe, Lock, CheckCircle, QrCode, TrendingDown, Coffee, ShoppingCart, Target, BarChart3, Layers, Wallet, ArrowUpRight, Building, PieChart, Clock, Award, Smartphone, CreditCard, TrendingUp, DollarSign, Server, Database, Network, Cpu } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function WhitepaperPage() {
  const sections = [
    { id: 'summary', title: 'Executive summary', icon: BookOpen },
    { id: 'market', title: 'Market analysis', icon: BarChart3 },
    { id: 'problem', title: 'The problem', icon: TrendingDown },
    { id: 'solution', title: 'Our solution', icon: Target },
    { id: 'quickpay', title: 'QuickPay', icon: QrCode },
    { id: 'features', title: 'Features', icon: Brain },
    { id: 'architecture', title: 'Architecture', icon: Layers },
    { id: 'tokenomics', title: 'Tokenomics', icon: Coins },
    { id: 'security', title: 'Security', icon: Shield },
    { id: 'roadmap', title: 'Roadmap', icon: Rocket },
    { id: 'team', title: 'Team', icon: Users },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-200">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Whitepaper
                </h1>
                <p className="text-gray-500">Version 2.1 • December 2025</p>
              </div>
            </div>
            
            <p className="text-xl text-gray-600 mb-8">
              A comprehensive overview of BLAZE Wallet's vision, technology, tokenomics, and roadmap. 
              We're building the future of everyday crypto payments.
            </p>
            
            <div className="flex flex-wrap gap-4">
              <button className="btn-brand flex items-center gap-2">
                <Download className="w-5 h-5" />
                Download PDF
              </button>
              <a href="#summary" className="btn-secondary flex items-center gap-2">
                Start reading
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Table of Contents */}
      <section className="py-8 bg-gray-50 sticky top-16 z-30 border-b border-gray-200">
        <div className="container-main">
          <div className="flex flex-wrap gap-2 justify-center">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                <section.icon className="w-4 h-4" />
                <span className="hidden sm:inline">{section.title}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-main">
          <div className="max-w-4xl mx-auto space-y-20">
            
            {/* Vision Quote */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200"
            >
              <p className="text-xl text-gray-700 italic mb-4">
                "For decades, we've watched money lose value year after year. We believe paying with crypto – 
                everywhere – is the future. A crypto wallet should be a real wallet you use every day, 
                not just a place to store assets and hope they go up in value."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  R
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Rick Schlimback</div>
                  <div className="text-sm text-gray-500">Founder & CEO, BLAZE Wallet</div>
                </div>
              </div>
            </motion.div>

            {/* 1. Executive Summary */}
            <motion.div
              id="summary"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">1. Executive summary</h2>
              <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                <p>
                  BLAZE Wallet is a next-generation cryptocurrency wallet designed for everyday payments. 
                  While the crypto market has matured significantly, with a total market cap exceeding $2 trillion, 
                  the vast majority of crypto holders still don't use their assets for daily purchases. 
                  BLAZE changes this paradigm.
                </p>
                <p>
                  Our mission is simple: make crypto payments as fast, easy, and ubiquitous as using cash or a card. 
                  With our proprietary QuickPay technology, users can initiate payments in seconds by simply 
                  scanning a QR code. Settlement time depends on the chosen blockchain. Combined with AI-powered features, multi-chain support across 18+ blockchains, 
                  and enterprise-grade security, BLAZE is positioned to become the go-to wallet for crypto payments.
                </p>
                <p>
                  The BLAZE token (BSC) serves as the utility token powering our ecosystem, enabling staking rewards 
                  up to 20% APY (launching Q1 2026), fee discounts, governance participation (Q2 2026), and access to premium features.
                </p>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="card p-5 text-center">
                  <QrCode className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <h3 className="font-bold text-gray-900 text-lg">3 taps</h3>
                  <p className="text-sm text-gray-600">To pay</p>
                </div>
                <div className="card p-5 text-center">
                  <Globe className="w-8 h-8 text-sky-500 mx-auto mb-2" />
                  <h3 className="font-bold text-gray-900 text-lg">18+</h3>
                  <p className="text-sm text-gray-600">Blockchains</p>
                </div>
                <div className="card p-5 text-center">
                  <Brain className="w-8 h-8 text-purple-500 mx-auto mb-2" />
                  <h3 className="font-bold text-gray-900 text-lg">5</h3>
                  <p className="text-sm text-gray-600">AI features</p>
                </div>
                <div className="card p-5 text-center">
                  <TrendingUp className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                  <h3 className="font-bold text-gray-900 text-lg">20%</h3>
                  <p className="text-sm text-gray-600">Max APY</p>
                </div>
              </div>
            </motion.div>

            {/* 2. Market Analysis */}
            <motion.div
              id="market"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">2. Market analysis</h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                <p>
                  The cryptocurrency market has experienced tremendous growth, yet the payment use case 
                  remains largely untapped. This represents a significant opportunity for BLAZE Wallet.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="card p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-orange-500" />
                    Market size
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Total crypto market cap</span>
                        <span className="font-semibold text-gray-900">$2.5T+</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-orange-500 rounded-full w-full" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Crypto wallet users</span>
                        <span className="font-semibold text-gray-900">400M+</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-sky-500 rounded-full w-4/5" />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Using crypto for payments</span>
                        <span className="font-semibold text-gray-900">&lt;5%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full">
                        <div className="h-2 bg-red-500 rounded-full w-[5%]" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-emerald-500" />
                    Growth drivers
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Rising inflation eroding fiat purchasing power',
                      'Growing merchant adoption of crypto payments',
                      'Improved blockchain scalability and lower fees',
                      'Regulatory clarity in key markets',
                      'Increasing demand for financial sovereignty',
                    ].map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card p-6 bg-amber-50 border-amber-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                  The inflation problem
                </h3>
                <p className="text-gray-700 mb-4">
                  Traditional fiat currencies have lost significant purchasing power over the past decades. 
                  The Euro has lost approximately 30% of its value since 2000, while the US Dollar has lost 
                  over 40%. Crypto offers an alternative store of value – but only if it can also function 
                  as a medium of exchange.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white rounded-xl">
                    <div className="text-2xl font-bold text-red-500">-30%</div>
                    <div className="text-xs text-gray-500">EUR since 2000</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl">
                    <div className="text-2xl font-bold text-red-500">-42%</div>
                    <div className="text-xs text-gray-500">USD since 2000</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl">
                    <div className="text-2xl font-bold text-emerald-500">+∞</div>
                    <div className="text-xs text-gray-500">BTC potential</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 3. The Problem */}
            <motion.div
              id="problem"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">3. The problem: crypto isn't spent</h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                <p>
                  Despite the growth of the crypto ecosystem, almost no one actually uses cryptocurrency 
                  for daily purchases. Current wallets are designed for trading, holding, and DeFi – 
                  not for real-world payments. This creates a paradox: crypto is meant to be digital 
                  money, yet it's rarely used as money.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {[
                  { 
                    icon: Wallet, 
                    title: 'Wallets aren\'t real wallets', 
                    desc: 'Current crypto wallets are designed for traders and DeFi users, with complex interfaces that intimidate everyday users.' 
                  },
                  { 
                    icon: Clock, 
                    title: 'Payments take too long', 
                    desc: 'Waiting minutes for transaction confirmations at checkout is impractical. Traditional cards take seconds.' 
                  },
                  { 
                    icon: Layers, 
                    title: 'Complexity overwhelms users', 
                    desc: 'Gas fees, network selection, slippage settings – these concepts confuse new users and create friction.' 
                  },
                  { 
                    icon: Shield, 
                    title: 'Security concerns', 
                    desc: 'Scams, phishing, and malicious smart contracts put users at risk. No protection against common threats.' 
                  },
                  { 
                    icon: Building, 
                    title: 'Limited merchant adoption', 
                    desc: 'Few merchants accept crypto, and those that do often use clunky third-party processors.' 
                  },
                  { 
                    icon: Globe, 
                    title: 'Fragmented ecosystem', 
                    desc: 'Assets spread across multiple chains with no unified experience. Managing multiple wallets is tedious.' 
                  },
                ].map((item, i) => (
                  <div key={i} className="card p-5">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center flex-shrink-0">
                        <item.icon className="w-5 h-5 text-red-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="card p-6 bg-gray-900 text-white">
                <h3 className="font-bold mb-3">The opportunity</h3>
                <p className="text-gray-300">
                  If we can solve these problems and make crypto payments as easy as tapping a card, 
                  we unlock a massive market. With 400+ million crypto holders worldwide and growing 
                  merchant interest, the timing is perfect for a payment-focused wallet.
                </p>
              </div>
            </motion.div>

            {/* 4. Our Solution */}
            <motion.div
              id="solution"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">4. Our solution: BLAZE Wallet</h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                <p>
                  BLAZE Wallet is designed from the ground up for payments. Every feature, every design 
                  decision, every line of code serves one purpose: making crypto payments as fast, easy, 
                  and secure as possible.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card p-6 text-center border-orange-200 bg-orange-50">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Lightning fast</h3>
                  <p className="text-sm text-gray-600">
                    Initiate payments in seconds with QuickPay technology. Settlement time varies by blockchain.
                  </p>
                </div>
                <div className="card p-6 text-center border-purple-200 bg-purple-50">
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">AI-powered</h3>
                  <p className="text-sm text-gray-600">
                    Smart features that protect you from scams, optimize fees, and simplify transactions.
                  </p>
                </div>
                <div className="card p-6 text-center border-sky-200 bg-sky-50">
                  <div className="w-14 h-14 bg-gradient-to-br from-sky-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">Bank-grade security</h3>
                  <p className="text-sm text-gray-600">
                    Non-custodial architecture, biometric auth, hardware key support, and AES-256 encryption.
                  </p>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-4">Key differentiators</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Payment-first design', desc: 'UI optimized for quick payments, not trading' },
                    { title: 'Multi-chain unified', desc: '18+ chains, one seamless experience' },
                    { title: 'Real merchant support', desc: 'QR codes work at any accepting merchant' },
                    { title: 'Human-friendly', desc: 'No jargon, no complexity, just payments' },
                    { title: 'Smart security', desc: 'AI detects threats before they harm you' },
                    { title: 'Earn while you hold', desc: 'Up to 20% APY on staked BLAZE tokens' },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-gray-900">{item.title}</span>
                        <span className="text-gray-600"> – {item.desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 5. QuickPay */}
            <motion.div
              id="quickpay"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">5. QuickPay: instant crypto payments</h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                <p>
                  QuickPay is our flagship feature – the technology that transforms crypto from a 
                  speculative asset into an everyday payment method. It's designed to be faster 
                  than card payments and simpler than cash.
                </p>
              </div>
              
              <div className="card p-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-8 text-center">How QuickPay works</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {[
                    { step: '1', title: 'Scan', desc: 'Point your camera at the merchant\'s QR code', icon: QrCode },
                    { step: '2', title: 'Confirm', desc: 'Review the amount and tap to confirm', icon: CheckCircle },
                    { step: '3', title: 'Done', desc: 'Payment sent to the blockchain', icon: Zap },
                  ].map((item) => (
                    <div key={item.step} className="text-center">
                      <div className="relative inline-block mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto">
                          <item.icon className="w-8 h-8 text-white" />
                        </div>
                        <div className="absolute -top-2 -right-2 w-7 h-7 bg-white rounded-full flex items-center justify-center text-sm font-bold text-orange-500 shadow-md">
                          {item.step}
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="card p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Technical implementation</h3>
                  <ul className="space-y-3 text-sm text-gray-600">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Layer 2 solutions for near-instant finality</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Optimistic transaction confirmation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Auto gas estimation and fee optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Merchant fraud protection system</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>Multi-currency support with auto-conversion</span>
                    </li>
                  </ul>
                </div>

                <div className="card p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Use cases</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon: Coffee, label: 'Coffee shops' },
                      { icon: ShoppingCart, label: 'Retail stores' },
                      { icon: Smartphone, label: 'Online shopping' },
                      { icon: Users, label: 'Restaurants' },
                      { icon: CreditCard, label: 'Services' },
                      { icon: Globe, label: 'Travel' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
                        <item.icon className="w-4 h-4 text-orange-500" />
                        <span className="text-sm text-gray-700">{item.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="card p-6 bg-emerald-50 border-emerald-200">
                <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                  <Building className="w-5 h-5 text-emerald-600" />
                  For merchants
                </h3>
                <p className="text-gray-700 mb-4">
                  Accepting BLAZE payments is simple. Generate a QR code, display it at checkout, 
                  and receive payments directly to your wallet. No intermediaries, no chargebacks, 
                  minimal fees.
                </p>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-white rounded-xl">
                    <div className="text-xl font-bold text-emerald-600">0.5%</div>
                    <div className="text-xs text-gray-500">Transaction fee</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl">
                    <div className="text-xl font-bold text-emerald-600">0</div>
                    <div className="text-xs text-gray-500">Chargebacks</div>
                  </div>
                  <div className="text-center p-3 bg-white rounded-xl">
                    <div className="text-xl font-bold text-emerald-600">24h</div>
                    <div className="text-xs text-gray-500">Settlement</div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 6. AI Features */}
            <motion.div
              id="features"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">6. AI-powered features</h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                <p>
                  BLAZE integrates five AI-powered features designed to make crypto simpler, safer, 
                  and more efficient. These aren't gimmicks – they solve real problems that crypto 
                  users face every day.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { 
                    icon: Brain, 
                    title: 'AI transaction assistant', 
                    desc: 'Send crypto using natural language. Just say "Send 50 USDC to @john" and the AI handles the rest – finding the right address, optimizing the route, and confirming the details.',
                    color: 'bg-purple-100 text-purple-600',
                    features: ['Natural language commands', 'Smart address book', 'Transaction history search', 'Voice support']
                  },
                  { 
                    icon: Shield, 
                    title: 'Smart scam detector', 
                    desc: 'Real-time security scanning that analyzes addresses, smart contracts, and transaction patterns to identify potential threats before you lose money.',
                    color: 'bg-red-100 text-red-600',
                    features: ['Address reputation scoring', 'Contract risk analysis', 'Phishing detection', 'Suspicious pattern alerts']
                  },
                  { 
                    icon: Zap, 
                    title: 'Gas optimizer with smart scheduling', 
                    desc: 'Our unique smart scheduling feature analyzes network conditions to automatically find the best time and fee for your transactions. Save up to 40% on gas fees.',
                    color: 'bg-emerald-100 text-emerald-600',
                    features: ['Smart scheduling (unique!)', 'Real-time gas predictions', 'Batch transaction optimization', 'Fee comparison']
                  },
                  { 
                    icon: BarChart3, 
                    title: 'Portfolio advisor', 
                    desc: 'AI-powered insights into your holdings with personalized recommendations, risk analysis, and market opportunities tailored to your portfolio.',
                    color: 'bg-sky-100 text-sky-600',
                    features: ['Portfolio health score', 'Diversification analysis', 'Yield opportunities', 'Risk alerts']
                  },
                  { 
                    icon: TrendingUp, 
                    title: 'Market analyzer', 
                    desc: 'Real-time market intelligence that tracks trends, sentiment, and opportunities across the crypto ecosystem to keep you informed.',
                    color: 'bg-amber-100 text-amber-600',
                    features: ['Sentiment analysis', 'Trend detection', 'Price alerts', 'News aggregation']
                  },
                ].map((feature, i) => (
                  <div key={i} className="card p-6">
                    <div className="flex flex-col md:flex-row md:items-start gap-4">
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${feature.color}`}>
                        <feature.icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">{feature.title}</h3>
                        <p className="text-gray-600 mb-4">{feature.desc}</p>
                        <div className="flex flex-wrap gap-2">
                          {feature.features.map((f, j) => (
                            <span key={j} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 7. Technical Architecture */}
            <motion.div
              id="architecture"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">7. Technical architecture</h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                <p>
                  BLAZE Wallet is built on a modern, scalable architecture designed for security, 
                  performance, and extensibility. Our non-custodial design ensures you always 
                  maintain full control of your assets.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="card p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Server className="w-5 h-5 text-orange-500" />
                    Frontend
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      Progressive Web App (PWA)
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      React + Next.js framework
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      WebAuthn biometric authentication
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      Offline-first architecture
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-orange-500 rounded-full" />
                      Hardware wallet integration
                    </li>
                  </ul>
                </div>

                <div className="card p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Database className="w-5 h-5 text-sky-500" />
                    Backend
                  </h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-sky-500 rounded-full" />
                      Multi-chain RPC aggregation
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-sky-500 rounded-full" />
                      Real-time price feeds
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-sky-500 rounded-full" />
                      AI model serving infrastructure
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-sky-500 rounded-full" />
                      Transaction indexing
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-sky-500 rounded-full" />
                      Push notification system
                    </li>
                  </ul>
                </div>
              </div>

              <div className="card p-6">
                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Network className="w-5 h-5 text-purple-500" />
                  Supported blockchains
                </h3>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {[
                    'Ethereum', 'BSC', 'Polygon', 'Arbitrum', 'Optimism', 'Base',
                    'Avalanche', 'Solana', 'Fantom', 'Cronos', 'zkSync', 'Linea',
                    'Scroll', 'Mantle', 'Blast', 'Mode', 'Celo', 'Gnosis'
                  ].map((chain, i) => (
                    <div key={i} className="text-center p-2 bg-gray-50 rounded-lg text-xs font-medium text-gray-700">
                      {chain}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 8. Tokenomics */}
            <motion.div
              id="tokenomics"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">8. Tokenomics</h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                <p>
                  The BLAZE token is the utility token powering the BLAZE ecosystem. It provides 
                  holders with staking rewards, fee discounts, governance rights, and access to 
                  premium features.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
                {[
                  { label: 'Symbol', value: 'BLAZE' },
                  { label: 'Total supply', value: '1,000,000,000' },
                  { label: 'Network', value: 'BSC (BEP-20)' },
                  { label: 'Burn rate', value: '0.1% per tx' },
                  { label: 'Liquidity lock', value: '50% / 1 year' },
                ].map((item, i) => (
                  <div key={i} className="card p-4 text-center">
                    <div className="text-sm text-gray-500 mb-1">{item.label}</div>
                    <div className="text-lg font-bold text-gradient-brand">{item.value}</div>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="card p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <PieChart className="w-5 h-5 text-orange-500" />
                    Token distribution
                  </h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Community rewards', percent: 20, color: 'bg-emerald-500' },
                      { label: 'Staking rewards', percent: 16, color: 'bg-yellow-500' },
                      { label: 'Liquidity pool', percent: 15, color: 'bg-sky-500' },
                      { label: 'Treasury', percent: 15, color: 'bg-purple-500' },
                      { label: 'Presale (120M)', percent: 12, color: 'bg-orange-500' },
                      { label: 'Team (6mo vest)', percent: 12, color: 'bg-pink-500' },
                      { label: 'Marketing', percent: 10, color: 'bg-red-500' },
                    ].map((item, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600">{item.label}</span>
                          <span className="font-semibold text-gray-900">{item.percent}%</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className={`h-2 ${item.color} rounded-full`} style={{ width: `${item.percent}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="card p-6">
                  <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Award className="w-5 h-5 text-emerald-500" />
                    Token utility
                  </h3>
                  <ul className="space-y-3">
                    {[
                      'Staking rewards up to 20% APY (Q1 2026)',
                      'Transaction fee discounts (up to 50%)',
                      'Governance voting rights (Q2 2026)',
                      'Premium feature access',
                      'Merchant partnership benefits',
                      'Early access to new features',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        <span className="text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200 mb-6">
                <h3 className="font-bold text-gray-900 mb-4">Presale details</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {[
                    { label: 'Presale tokens', value: '120,000,000', sub: '12% of supply' },
                    { label: 'Presale price', value: '$0.00834', sub: 'per token' },
                    { label: 'Launch price', value: '$0.02', sub: 'per token' },
                    { label: 'Early bird discount', value: '58%', sub: 'vs launch' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-4 rounded-xl text-center">
                      <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                      <div className="text-xl font-bold text-gradient-brand">{item.value}</div>
                      <div className="text-xs text-gray-400">{item.sub}</div>
                    </div>
                  ))}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Early supporters receive bonus tokens: Founders (first 100) get +100%, Early Birds +75%, 
                  Pioneers +50%, Believers +30%, and Supporters +15%. All bonuses are additional tokens on top of purchase.
                </p>
              </div>

              <div className="card p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
                <h3 className="font-bold text-gray-900 mb-4">Staking tiers <span className="text-sm font-normal text-orange-600">(launching Q1 2026)</span></h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { tier: 'Flexible', apy: '8%', lock: 'No lock', min: '100 BLAZE' },
                    { tier: 'Standard', apy: '15%', lock: '6 months', min: '1,000 BLAZE' },
                    { tier: 'Premium', apy: '20%', lock: '12 months', min: '10,000 BLAZE' },
                  ].map((item, i) => (
                    <div key={i} className="bg-white p-5 rounded-xl text-center">
                      <div className="text-sm text-gray-500 mb-1">{item.tier}</div>
                      <div className="text-3xl font-bold text-gradient-brand mb-2">{item.apy}</div>
                      <div className="text-xs text-gray-500">{item.lock}</div>
                      <div className="text-xs text-gray-400 mt-2">Min: {item.min}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* 9. Security */}
            <motion.div
              id="security"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">9. Security</h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                <p>
                  Security is not an afterthought at BLAZE – it's foundational. Our multi-layered 
                  security architecture protects users at every level, from smart contracts to 
                  the application layer.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="card p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Smart contract security</h3>
                  <ul className="space-y-2">
                    {[
                      'Built on audited OpenZeppelin contracts',
                      'ReentrancyGuard on all external calls',
                      'Comprehensive test coverage (100%)',
                      'Multi-sig admin controls',
                      'Time-locked upgrades',
                      'Bug bounty program',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="card p-6">
                  <h3 className="font-bold text-gray-900 mb-4">Wallet security</h3>
                  <ul className="space-y-2">
                    {[
                      'Non-custodial (you own your keys)',
                      'AES-256 encryption for stored data',
                      'Biometric authentication (WebAuthn)',
                      'Hardware security key support',
                      'Session timeout protection',
                      'Transaction signing verification',
                    ].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-gray-600 text-sm">
                        <CheckCircle className="w-4 h-4 text-emerald-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="card p-6 bg-amber-50 border-amber-200">
                <div className="flex items-start gap-4">
                  <Shield className="w-10 h-10 text-amber-600 flex-shrink-0" />
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Audit status</h3>
                    <p className="text-gray-700 mb-3">
                      Our smart contracts will undergo a comprehensive security audit by CertiK, 
                      a leading blockchain security firm, planned for Q1 2026. The full audit 
                      report will be published before public beta launch.
                    </p>
                    <span className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-700 rounded-full text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      Scheduled for Q1 2026
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 10. Roadmap */}
            <motion.div
              id="roadmap"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">10. Roadmap</h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                <p>
                  Our development roadmap is designed to deliver value incrementally while building 
                  toward our vision of making crypto payments ubiquitous.
                </p>
              </div>

              <div className="space-y-4">
                {[
                  { 
                    phase: 'Q2 2025', 
                    title: 'Foundation', 
                    status: 'completed', 
                    items: [
                      'Core wallet architecture & development',
                      'Multi-chain infrastructure (initial 10 chains)',
                      'Smart contract development & testing',
                      'Security framework & encryption design',
                      'Website & branding development',
                      'Team formation & seed funding',
                    ] 
                  },
                  { 
                    phase: 'Q3 2025', 
                    title: 'AI & QuickPay', 
                    status: 'completed', 
                    items: [
                      'QuickPay integration (instant QR payments)',
                      'AI Transaction Assistant',
                      'Smart Scam Detector',
                      'Gas Optimizer with Smart Scheduling (unique feature)',
                      'Portfolio Advisor',
                      'Market Analyzer',
                    ] 
                  },
                  { 
                    phase: 'Q4 2025', 
                    title: 'DEX & fiat integration', 
                    status: 'active', 
                    items: [
                      'Li.Fi integration (token swaps)',
                      'Onramper integration (fiat on-ramp & off-ramp)',
                      'Multi-chain support expansion (18+ chains)',
                      'PWA & mobile-first design',
                      'Website & branding finalization',
                    ] 
                  },
                  { 
                    phase: 'Q1 2026', 
                    title: 'Presale & app launch', 
                    status: 'upcoming', 
                    items: [
                      'BLAZE token presale launch',
                      'iOS app launch (App Store)',
                      'Android app launch (Google Play)',
                      'Public beta release',
                      'Staking platform goes live',
                      'CertiK security audit',
                      'CEX listings (initial)',
                    ] 
                  },
                  { 
                    phase: 'Q2 2026', 
                    title: 'Growth & expansion', 
                    status: 'upcoming', 
                    items: [
                      'CEX listings (continued)',
                      'Merchant partnerships program',
                      'BLAZE card program launch',
                      'Governance launch (1 token = 1 vote)',
                      'Referral & cashback system',
                    ] 
                  },
                  { 
                    phase: 'Q3 2026', 
                    title: 'Ecosystem development', 
                    status: 'upcoming', 
                    items: [
                      'Cross-chain bridges',
                      'Hardware wallet support',
                      'Advanced AI features',
                      'Enterprise solutions',
                      'NFT marketplace expansion',
                    ] 
                  },
                  { 
                    phase: 'Q4 2026', 
                    title: 'Global scale', 
                    status: 'upcoming', 
                    items: [
                      'Worldwide merchant adoption',
                      'Banking partnerships',
                      'Multi-currency card rollout',
                      'DAO governance fully active',
                      'Major exchange listings',
                    ] 
                  },
                ].map((item, i) => (
                  <div key={i} className={`card p-6 ${item.status === 'active' ? 'border-orange-300 bg-orange-50' : ''}`}>
                    <div className="flex items-start gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${
                          item.status === 'completed' ? 'bg-emerald-500' :
                          item.status === 'active' ? 'bg-orange-500' : 'bg-gray-300'
                        }`} />
                        {i < 5 && <div className="w-0.5 h-full bg-gray-200 mt-2" />}
                      </div>
                      <div className="flex-1 pb-4">
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          <span className="text-sm font-medium text-gray-500">{item.phase}</span>
                          <h3 className="font-bold text-gray-900">{item.title}</h3>
                          {item.status === 'completed' && (
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Completed</span>
                          )}
                          {item.status === 'active' && (
                            <span className="text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full">Current</span>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {item.items.map((subitem, j) => (
                            <span key={j} className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-lg">
                              {subitem}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* 11. Team */}
            <motion.div
              id="team"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">11. Team</h2>
              
              <div className="prose prose-lg max-w-none text-gray-600 mb-8">
                <p>
                  BLAZE is built by a dedicated team passionate about making crypto accessible to everyone. 
                  Based in Groningen, Netherlands, we combine deep technical expertise with a user-first mindset.
                </p>
              </div>

              <div className="card p-6 mb-6">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                  <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold flex-shrink-0">
                    R
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-xl mb-1">Rick Schlimback</h3>
                    <p className="text-orange-500 font-medium mb-3">Founder & CEO</p>
                    <p className="text-gray-600 mb-4">
                      Crypto enthusiast and entrepreneur with a vision to make digital payments 
                      accessible to everyone. Passionate about building products that solve real 
                      problems and bring the benefits of cryptocurrency to everyday users.
                    </p>
                    <div className="flex gap-2">
                      <a href="https://twitter.com/blazewallet_io" className="text-sm text-gray-500 hover:text-orange-500">Twitter</a>
                      <span className="text-gray-300">•</span>
                      <a href="https://linkedin.com" className="text-sm text-gray-500 hover:text-orange-500">LinkedIn</a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card p-6 bg-gray-50">
                <h3 className="font-bold text-gray-900 mb-4">Company information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Company:</span>
                    <span className="text-gray-900 ml-2">BLAZE</span>
                  </div>
                  <div>
                    <span className="text-gray-500">KvK number:</span>
                    <span className="text-gray-900 ml-2">88929280</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Location:</span>
                    <span className="text-gray-900 ml-2">Groningen, Netherlands</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Email:</span>
                    <a href="mailto:info@blazewallet.io" className="text-orange-500 ml-2">info@blazewallet.io</a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Conclusion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8 bg-gradient-to-r from-orange-500 to-yellow-500 text-center"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Join the BLAZE revolution</h2>
              <p className="text-white/90 mb-6 max-w-xl mx-auto">
                We're building the future of crypto payments. Join us on this journey and be part 
                of making cryptocurrency truly usable for everyone, everywhere.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="https://my.blazewallet.io" className="btn-light">
                  Try BLAZE Wallet
                </a>
                <a href="https://t.me/blazewallet_io" target="_blank" rel="noopener noreferrer" className="px-6 py-3 bg-white/20 text-white rounded-xl font-semibold hover:bg-white/30 transition-colors">
                  Join community
                </a>
              </div>
            </motion.div>

            {/* Legal disclaimer */}
            <div className="text-xs text-gray-500 p-6 bg-gray-100 rounded-xl">
              <h4 className="font-semibold text-gray-700 mb-2">Disclaimer</h4>
              <p>
                This whitepaper is for informational purposes only and does not constitute financial, 
                investment, or legal advice. Cryptocurrency investments carry significant risks, including 
                the potential loss of principal. Past performance is not indicative of future results. 
                Always conduct your own research and consult with qualified professionals before making 
                investment decisions. The information in this document is subject to change without notice. 
                BLAZE Wallet is a non-custodial service and does not provide custody of user funds.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 bg-white">
        <div className="container-main text-center text-gray-500 text-sm">
          © 2025 BLAZE Wallet. All rights reserved. KvK: 88929280
        </div>
      </footer>
    </div>
  );
}
