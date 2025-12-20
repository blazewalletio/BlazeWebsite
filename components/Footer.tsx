'use client';

import { motion } from 'framer-motion';
import { Flame, Twitter, Send, Github, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative bg-slate-950 border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
              Set your finances ablaze. De revolutionaire crypto wallet met DeFi features 
              voor de next generation van crypto users.
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
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Audit report
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
                  Brand kit
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-orange-400 transition-colors">
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
              © 2024 BLAZE Wallet. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-gray-400">
              <a href="#" className="hover:text-orange-400 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-orange-400 transition-colors">
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



