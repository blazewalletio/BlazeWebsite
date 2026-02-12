'use client';

import { motion } from 'framer-motion';
import { Twitter, Send, Github, Mail, ArrowRight, Sparkles, MessageCircle, Phone, MapPin, Clock, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import TrackedLaunchAppLink from '@/components/TrackedLaunchAppLink';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || isLoading) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      const res = await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, source: 'newsletter_footer' }),
      });
      
      const data = await res.json();
      
      if (!res.ok) {
        // If already subscribed, still show success
        if (res.status === 409) {
          setSubmitted(true);
        } else {
          setError(data.error || 'Something went wrong');
        }
      } else {
        setSubmitted(true);
      }
      
      setEmail('');
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      setError('Failed to subscribe. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const links = {
    product: [
      { label: 'Features', href: '#features' },
      { label: 'How it works', href: '#demo' },
      { label: 'Tokenomics', href: '#tokenomics' },
      { label: 'FAQ', href: '#faq' },
      { label: 'Launch app', href: 'https://my.blazewallet.io', external: true },
    ],
    resources: [
      { label: 'Whitepaper', href: '/whitepaper' },
      { label: 'Documentation', href: '/documentation' },
      { label: 'Updates', href: '/updates' },
      { label: 'Support', href: '/support' },
    ],
    legal: [
      { label: 'Privacy policy', href: '/privacy' },
      { label: 'Terms of service', href: '/terms' },
      { label: 'Cookie policy', href: '/cookies' },
    ],
  };

  const socials = [
    { icon: Twitter, href: 'https://twitter.com/blazewallet_io', label: 'Twitter' },
    { icon: Send, href: 'https://t.me/blazewallet_io', label: 'Telegram' },
    { icon: Github, href: 'https://github.com/blazewalletio', label: 'GitHub' },
    { icon: Mail, href: 'mailto:info@blazewallet.io', label: 'Email' },
  ];

  return (
    <footer className="bg-gray-900 text-white overflow-hidden">
      {/* CTA Section - Improved */}
      <section className="relative">
        {/* Background with animated gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400" />
        
        {/* Decorative elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-yellow-300/20 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/20 rounded-full blur-3xl" />
        </div>
        
        {/* Pattern overlay */}
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />

        <div className="relative container-main py-20 md:py-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            {/* Badge */}
            <div className="flex justify-center mb-6">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Start your crypto journey
              </span>
            </div>
            
            {/* Headline */}
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center mb-6 leading-tight">
              Ready to get started?
            </h2>
            
            <p className="text-white/90 text-lg md:text-xl text-center mb-10 max-w-2xl mx-auto">
              Join thousands of users who trust BLAZE for their everyday crypto payments. 
              It only takes 30 seconds to create your wallet.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <TrackedLaunchAppLink
                sourceContext="footer_hero_cta"
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                <Image 
                  src="/blaze-logo.png" 
                  alt="" 
                  width={28} 
                  height={28} 
                  className="rounded-lg"
                />
                Launch wallet
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </TrackedLaunchAppLink>
              
              <Link
                href="/whitepaper"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/15 backdrop-blur-sm text-white rounded-2xl font-semibold text-lg border border-white/30 hover:bg-white/25 transition-all duration-300"
              >
                Read whitepaper
              </Link>
            </div>
            
            {/* Trust indicators */}
            <div className="flex flex-wrap justify-center gap-6 md:gap-10 mt-12 pt-8 border-t border-white/20">
              {[
                { value: '18+', label: 'Blockchains' },
                { value: '2s', label: 'Payments' },
                { value: '24/7', label: 'Support' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl md:text-3xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact Section - "Still have questions?" */}
      <section className="bg-gray-800 border-t border-gray-700">
        <div className="container-main py-12 md:py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center"
          >
            {/* Left side - Text */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-orange-500/20 rounded-full text-orange-400 text-sm font-medium mb-4">
                <MessageCircle className="w-4 h-4" />
                We're here to help
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Still have questions?
              </h3>
              <p className="text-gray-400 mb-6 max-w-md mx-auto lg:mx-0">
                Our team is ready to answer your questions and help you get started with BLAZE Wallet.
              </p>
              <Link
                href="/support"
                className="inline-flex items-center gap-2 text-orange-400 font-semibold hover:text-orange-300 transition-colors group"
              >
                Visit support center
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            {/* Right side - Contact cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href="mailto:info@blazewallet.io"
                className="group p-5 bg-gray-900/50 rounded-2xl border border-gray-700 hover:border-orange-500/50 hover:bg-gray-900 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
                  <Mail className="w-6 h-6 text-orange-400" />
                </div>
                <h4 className="font-semibold text-white mb-1">Email us</h4>
                <p className="text-gray-400 text-sm mb-2">Get a response within 24h</p>
                <span className="text-orange-400 text-sm font-medium">info@blazewallet.io</span>
              </a>
              
              <a
                href="https://t.me/blazewallet_io"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 bg-gray-900/50 rounded-2xl border border-gray-700 hover:border-orange-500/50 hover:bg-gray-900 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
                  <Send className="w-6 h-6 text-orange-400" />
                </div>
                <h4 className="font-semibold text-white mb-1">Telegram</h4>
                <p className="text-gray-400 text-sm mb-2">Join our community</p>
                <span className="text-orange-400 text-sm font-medium">@blazewallet_io</span>
              </a>
              
              <a
                href="https://twitter.com/blazewallet_io"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-5 bg-gray-900/50 rounded-2xl border border-gray-700 hover:border-orange-500/50 hover:bg-gray-900 transition-all duration-300"
              >
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
                  <Twitter className="w-6 h-6 text-orange-400" />
                </div>
                <h4 className="font-semibold text-white mb-1">Twitter/X</h4>
                <p className="text-gray-400 text-sm mb-2">Follow for updates</p>
                <span className="text-orange-400 text-sm font-medium">@blazewallet_io</span>
              </a>
              
              <div className="group p-5 bg-gray-900/50 rounded-2xl border border-gray-700">
                <div className="w-12 h-12 bg-orange-500/20 rounded-xl flex items-center justify-center mb-4">
                  <MapPin className="w-6 h-6 text-orange-400" />
                </div>
                <h4 className="font-semibold text-white mb-1">Location</h4>
                <p className="text-gray-400 text-sm mb-2">Based in the Netherlands</p>
                <span className="text-orange-400 text-sm font-medium">Groningen, NL</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main footer */}
      <div className="container-main py-16 border-t border-gray-800">
        {/* Newsletter */}
        <div className="max-w-xl mx-auto text-center mb-16 pb-16 border-b border-gray-800">
          <h3 className="text-xl font-bold mb-2">Stay updated</h3>
          <p className="text-gray-400 mb-6">
            Get the latest updates on BLAZE Wallet and exclusive presale opportunities.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              disabled={isLoading}
              className="flex-1 px-4 py-3 rounded-xl bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={isLoading}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-xl font-semibold hover:from-orange-600 hover:to-yellow-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed min-w-[120px]"
            >
              {isLoading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : submitted ? (
                '✓ Subscribed!'
              ) : (
                'Subscribe'
              )}
            </button>
          </form>
          {error && (
            <p className="text-red-400 text-sm mt-2" role="alert" aria-live="polite">{error}</p>
          )}
        </div>

        {/* Links grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image 
                src="/blaze-logo.png" 
                alt="BLAZE" 
                width={36} 
                height={36} 
                className="rounded-lg"
              />
              <span className="text-xl font-bold">BLAZE</span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              The intelligent crypto wallet for everyone.
            </p>
            <div className="flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 flex items-center justify-center transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2">
              {links.product.map((link) => (
                <li key={link.label}>
                  {link.href === 'https://my.blazewallet.io' ? (
                    <TrackedLaunchAppLink
                      sourceContext="footer_product_link"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </TrackedLaunchAppLink>
                  ) : (
                    <a
                      href={link.href}
                      target={link.external ? '_blank' : undefined}
                      rel={link.external ? 'noopener noreferrer' : undefined}
                      className="text-gray-400 hover:text-white text-sm transition-colors"
                    >
                      {link.label}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © 2025 BLAZE Wallet. All rights reserved. KvK: 88929280
            </p>
            <p className="text-gray-500 text-sm">
              Made with 🔥 in Groningen, Netherlands
            </p>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-gray-800/50 border border-gray-700">
          <p className="text-xs text-gray-500">
            <strong className="text-gray-400">Disclaimer:</strong> Cryptocurrency investments 
            are subject to high market risk. BLAZE Wallet is a non-custodial wallet and does not 
            provide investment advice. Always do your own research before investing.
          </p>
        </div>
      </div>
    </footer>
  );
}
