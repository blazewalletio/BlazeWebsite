'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, BookOpen, Wallet, Send, QrCode, Shield, Brain, Coins, Settings, ExternalLink, Search, Sparkles } from 'lucide-react';
import Link from 'next/link';
import TrackedLaunchAppLink from '@/components/TrackedLaunchAppLink';
import Navbar from '@/components/Navbar';
import { useState } from 'react';

export default function DocumentationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  
  const categories = [
    {
      title: 'Getting started',
      icon: Wallet,
      color: 'bg-sky-100 text-sky-600',
      articles: [
        { title: 'Create a new wallet', description: 'Set up your BLAZE Wallet in minutes' },
        { title: 'Import existing wallet', description: 'Restore with seed phrase or private key' },
        { title: 'Security best practices', description: 'Protect your assets with proper security' },
        { title: 'Understanding the dashboard', description: 'Navigate the main interface' },
      ]
    },
    {
      title: 'QuickPay',
      icon: QrCode,
      color: 'bg-orange-100 text-orange-600',
      articles: [
        { title: 'How QuickPay works', description: 'Pay with crypto via QR codes' },
        { title: 'Scan to pay', description: 'Make payments at any merchant' },
        { title: 'Receive payments', description: 'Generate your payment QR code' },
        { title: 'Payment history', description: 'Track all QuickPay transactions' },
      ]
    },
    {
      title: 'Sending & receiving',
      icon: Send,
      color: 'bg-emerald-100 text-emerald-600',
      articles: [
        { title: 'Send crypto', description: 'Transfer tokens to any address' },
        { title: 'Receive crypto', description: 'Share your wallet address' },
        { title: 'Transaction fees', description: 'Understanding gas and network fees' },
        { title: 'Cross-chain transfers', description: 'Move assets between blockchains' },
      ]
    },
    {
      title: 'AI features',
      icon: Brain,
      color: 'bg-purple-100 text-purple-600',
      articles: [
        { title: 'AI transaction assistant', description: 'Send crypto with natural language' },
        { title: 'Smart scam detector', description: 'AI-powered security scanning' },
        { title: 'Gas optimizer', description: 'Save on transaction fees' },
        { title: 'Portfolio advisor', description: 'Get AI recommendations' },
        { title: 'Market analyzer', description: 'Real-time market insights' },
      ]
    },
    {
      title: 'Staking',
      icon: Coins,
      color: 'bg-yellow-100 text-yellow-600',
      articles: [
        { title: 'How staking works', description: 'Earn rewards on your BLAZE tokens' },
        { title: 'Staking plans', description: 'Compare APY rates and lock periods' },
        { title: 'Claim rewards', description: 'Withdraw your earned rewards' },
        { title: 'Unstaking', description: 'Withdraw your staked tokens' },
      ]
    },
    {
      title: 'Security',
      icon: Shield,
      color: 'bg-red-100 text-red-600',
      articles: [
        { title: 'Non-custodial security', description: 'Your keys, your crypto' },
        { title: 'Biometric authentication', description: 'Set up Face ID or fingerprint' },
        { title: 'Backup seed phrase', description: 'Secure your recovery phrase' },
        { title: 'Hardware key support', description: 'Use YubiKey or other security keys' },
      ]
    },
  ];

  const quickLinks = [
    { title: 'Launch app', href: 'https://my.blazewallet.io', icon: ExternalLink },
    { title: 'Whitepaper', href: '/whitepaper', icon: BookOpen },
    { title: 'Support', href: '/support', icon: Settings },
  ];

  const filteredCategories = searchQuery
    ? categories.map(cat => ({
        ...cat,
        articles: cat.articles.filter(
          art =>
            art.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            art.description.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(cat => cat.articles.length > 0)
    : categories;

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-200">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl mx-auto text-center"
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            
            <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Documentation
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Everything you need to know about using BLAZE Wallet
            </p>
            
            {/* Search */}
            <div className="relative max-w-xl mx-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search documentation..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 bg-gray-50 border-b border-gray-200">
        <div className="container-main">
          <div className="flex flex-wrap justify-center gap-4">
            {quickLinks.map((link) => (
              link.href === 'https://my.blazewallet.io' ? (
                <TrackedLaunchAppLink
                  key={link.title}
                  sourceContext="documentation_quicklink_launch"
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-soft transition-all"
                >
                  <link.icon className="w-4 h-4 text-orange-500" />
                  <span className="font-medium text-gray-900">{link.title}</span>
                </TrackedLaunchAppLink>
              ) : (
                <a
                  key={link.title}
                  href={link.href}
                  className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:shadow-soft transition-all"
                >
                  <link.icon className="w-4 h-4 text-orange-500" />
                  <span className="font-medium text-gray-900">{link.title}</span>
                </a>
              )
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container-main">
          {filteredCategories.length === 0 ? (
            <div className="text-center py-16">
              <Search className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-500">No results found for "{searchQuery}"</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredCategories.map((category, index) => (
                <motion.div
                  key={category.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="card p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${category.color}`}>
                      <category.icon className="w-5 h-5" />
                    </div>
                    <h2 className="text-lg font-bold text-gray-900">{category.title}</h2>
                  </div>
                  
                  <ul className="space-y-1">
                    {category.articles.map((article) => (
                      <li key={article.title}>
                        <div className="p-3 rounded-lg bg-gray-50 border border-gray-100">
                          <div className="flex items-start justify-between">
                            <div>
                              <span className="font-medium text-gray-900">
                                {article.title}
                              </span>
                              <p className="text-sm text-gray-500 mt-0.5">{article.description}</p>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Help CTA */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8 bg-gradient-to-r from-orange-500 to-yellow-500 text-center"
          >
            <Sparkles className="w-12 h-12 text-white mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-white mb-2">Can't find what you're looking for?</h2>
            <p className="text-white/90 mb-6">Our support team is ready to help you.</p>
            <Link href="/support" className="btn-light">
              Contact support
            </Link>
          </motion.div>
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

