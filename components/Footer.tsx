'use client';

import { motion } from 'framer-motion';
import { Flame, Twitter, Send, Github, Mail, MailCheck } from 'lucide-react';
import { useState } from 'react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production, this would send to your email service
    console.log('Newsletter signup:', email);
    setSubmitted(true);
    setEmail('');
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <footer className="relative bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Newsletter Section */}
        <div className="mb-12 pb-12 border-b border-white/10">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <MailCheck className="w-6 h-6 text-orange-400" />
              <h3 className="text-2xl font-bold">Stay Updated</h3>
            </div>
            <p className="text-gray-400 mb-6">
              Get the latest updates on BLAZE Wallet, new features, and exclusive presale opportunities.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-4 py-3 rounded-xl bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-white placeholder-gray-500"
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-blaze rounded-xl font-bold hover:scale-105 transition-transform glow-orange focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                {submitted ? 'Subscribed!' : 'Subscribe'}
              </button>
            </form>
            {submitted && (
              <p className="mt-4 text-green-400 text-sm">Thank you for subscribing! Check your email for confirmation.</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-blaze flex items-center justify-center">
                <Flame className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">BLAZE</span>
            </div>
            <p className="text-gray-400 mb-4 max-w-md">
              Set your finances ablaze. The revolutionary crypto wallet with DeFi features 
              for the next generation of crypto users.
            </p>
            <div className="flex gap-4">
              <a
                href="https://twitter.com/blazewallet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://t.me/blazewallet"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110"
              >
                <Send className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/blazewalletio"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="mailto:info@blazewallet.io"
                className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-all hover:scale-110"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold mb-4">Product</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#features" className="hover:text-orange-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#demo" className="hover:text-orange-400 transition-colors">
                  Demo
                </a>
              </li>
              <li>
                <a href="#tokenomics" className="hover:text-orange-400 transition-colors">
                  Tokenomics
                </a>
              </li>
              <li>
                <a href="#roadmap" className="hover:text-orange-400 transition-colors">
                  Roadmap
                </a>
              </li>
              <li>
                <a
                  href="https://my.blazewallet.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-orange-400 transition-colors"
                >
                  Launch app
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold mb-4">Resources</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#whitepaper" className="hover:text-orange-400 transition-colors">
                  Whitepaper
                </a>
              </li>
              <li>
                <a href="mailto:info@blazewallet.io" className="hover:text-orange-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="mailto:info@blazewallet.io" className="hover:text-orange-400 transition-colors">
                  Audit report
                </a>
              </li>
              <li>
                <a href="mailto:info@blazewallet.io" className="hover:text-orange-400 transition-colors">
                  Brand kit
                </a>
              </li>
              <li>
                <a href="mailto:info@blazewallet.io" className="hover:text-orange-400 transition-colors">
                  Support
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2025 BLAZE Wallet. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="mailto:info@blazewallet.io" className="hover:text-orange-400 transition-colors">
                Privacy Policy
              </a>
              <a href="mailto:info@blazewallet.io" className="hover:text-orange-400 transition-colors">
                Terms of Service
              </a>
              <a href="mailto:info@blazewallet.io" className="hover:text-orange-400 transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="mt-8 p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
          <p className="text-xs text-gray-400">
            <strong className="text-orange-400">Disclaimer:</strong> Cryptocurrency investments 
            are subject to high market risk. BLAZE Wallet is a non-custodial wallet and does not 
            provide investment advice. Always do your own research before investing.
          </p>
        </div>
      </div>
    </footer>
  );
}



