'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, MessageCircle, Mail, Send, BookOpen, Clock, CheckCircle, HelpCircle, ExternalLink, Twitter, MessagesSquare } from 'lucide-react';
import Link from 'next/link';
import TrackedLaunchAppLink from '@/components/TrackedLaunchAppLink';
import Navbar from '@/components/Navbar';
import { useState } from 'react';
import { trackSupportContactSubmitted } from '@/lib/analytics/client';
import Footer from '@/components/Footer';

export default function SupportPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Something went wrong');
        setIsLoading(false);
        return;
      }

      setSubmitted(true);
      setIsLoading(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
      trackSupportContactSubmitted({ subject: formData.subject || null });
    } catch (err) {
      setError('Failed to send message. Please try again.');
      setIsLoading(false);
    }
  };

  const contactMethods = [
    {
      icon: Mail,
      title: 'Email support',
      description: 'Get help via email',
      action: 'info@blazewallet.io',
      href: 'mailto:info@blazewallet.io',
      color: 'bg-sky-100 text-sky-600'
    },
    {
      icon: MessagesSquare,
      title: 'Telegram',
      description: 'Join our community',
      action: '@blazewallet_io',
      href: 'https://t.me/ai4ldMZv0KgyN2Y8',
      color: 'bg-blue-100 text-blue-600'
    },
    {
      icon: Twitter,
      title: 'Twitter/X',
      description: 'Follow for updates',
      action: '@blazewallet_io',
      href: 'https://x.com/blazewallet_io',
      color: 'bg-gray-100 text-gray-600'
    },
  ];

  const faqs = [
    {
      question: 'Is BLAZE Wallet safe?',
      answer: 'Yes, BLAZE Wallet is non-custodial, meaning we never have access to your private keys. Your keys are encrypted and stored locally on your device with AES-256 encryption.'
    },
    {
      question: 'What is QuickPay?',
      answer: 'QuickPay is our fast payment feature that lets you pay at any merchant by scanning a QR code. Settlement time depends on the blockchain you choose.'
    },
    {
      question: 'How do I recover my wallet?',
      answer: 'You can recover your wallet using your 12 or 24 word seed phrase. Go to the login screen and select "Import Wallet" to restore access.'
    },
    {
      question: 'Which blockchains are supported?',
      answer: 'BLAZE Wallet supports 18+ blockchains including Ethereum, BSC, Polygon, Arbitrum, Solana, and more. We\'re constantly adding new networks.'
    },
    {
      question: 'How do I stake BLAZE tokens?',
      answer: 'Navigate to the Staking tab in the app, select your preferred plan (Flexible, 6-month, or 1-year lock), enter the amount, and confirm. You\'ll start earning rewards immediately.'
    },
    {
      question: 'Are there any fees?',
      answer: 'BLAZE Wallet is free to use. You only pay standard blockchain network fees (gas) for transactions. Our AI Gas Optimizer helps you save on these fees.'
    },
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
              <MessageCircle className="w-8 h-8 text-white" />
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Support
            </h1>
            <p className="text-xl text-gray-600">
              We're here to help. Reach out anytime.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-12 bg-gray-50">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {contactMethods.map((method, index) => (
              <motion.a
                key={method.title}
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card p-6 hover:shadow-soft-md transition-all group"
              >
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${method.color} mb-4`}>
                  <method.icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-gray-900 mb-1 group-hover:text-orange-600 transition-colors">
                  {method.title}
                </h3>
                <p className="text-sm text-gray-500 mb-2">{method.description}</p>
                <span className="text-orange-500 font-medium flex items-center gap-1">
                  {method.action}
                  <ExternalLink className="w-3 h-3" />
                </span>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16">
        <div className="container-main">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a message</h2>
              
              {submitted ? (
                <div className="card p-8 text-center">
                  <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Message sent!</h3>
                  <p className="text-gray-600 mb-4">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-orange-500 font-medium hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="card p-6 space-y-4">
                  {error && (
                    <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm">
                      <span>⚠️</span>
                      {error}
                    </div>
                  )}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                      placeholder="you@example.com"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                    <select
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all"
                    >
                      <option value="">Select a topic</option>
                      <option value="general">General inquiry</option>
                      <option value="technical">Technical support</option>
                      <option value="account">Account issue</option>
                      <option value="partnership">Partnership</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 outline-none transition-all resize-none"
                      placeholder="Describe your question or issue..."
                    />
                  </div>
                  
                  <button 
                    type="submit" 
                    disabled={isLoading}
                    className="btn-brand w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        Send message
                      </>
                    )}
                  </button>
                </form>
              )}
              
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                <Clock className="w-4 h-4" />
                <span>Average response time: 24 hours</span>
              </div>
            </motion.div>

            {/* FAQ */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently asked questions</h2>
              
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <details key={index} className="card p-4 group">
                    <summary className="flex items-center justify-between cursor-pointer list-none">
                      <span className="font-medium text-gray-900 pr-4">{faq.question}</span>
                      <HelpCircle className="w-5 h-5 text-gray-400 flex-shrink-0 group-open:text-orange-500 transition-colors" />
                    </summary>
                    <p className="mt-3 text-gray-600 pt-3 border-t border-gray-100">
                      {faq.answer}
                    </p>
                  </details>
                ))}
              </div>
              
              <Link
                href="/documentation"
                className="inline-flex items-center gap-2 mt-6 text-orange-500 font-medium hover:underline"
              >
                <BookOpen className="w-4 h-4" />
                View all documentation
              </Link>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Optional support */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <div className="container-main">
          <div className="card p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">Want to support BLAZE?</h2>
              <p className="text-gray-600">
                If you&apos;d like to support ongoing development, you can optionally donate in BTC, ETH, or SOL.
                No pressure — it&apos;s completely optional.
              </p>
            </div>
            <Link href="/support-us" className="btn-brand whitespace-nowrap">
              Support BLAZE
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-white border-t border-gray-200">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="card p-8 bg-gradient-to-r from-orange-500 to-yellow-500 text-center"
          >
            <h2 className="text-2xl font-bold text-white mb-2">Ready to get started?</h2>
            <p className="text-white/90 mb-6">Experience the future of crypto payments.</p>
            <TrackedLaunchAppLink sourceContext="support_cta" className="btn-light">
              Launch BLAZE Wallet
            </TrackedLaunchAppLink>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

