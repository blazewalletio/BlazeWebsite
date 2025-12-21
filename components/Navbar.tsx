'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Menu, X, Sparkles, Zap, Coins, FileText, Map, Rocket } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: 'Features', href: '#features', icon: Sparkles },
    { label: 'Demo', href: '#demo', icon: Zap },
    { label: 'Tokenomics', href: '#tokenomics', icon: Coins },
    { label: 'Whitepaper', href: '#whitepaper', icon: FileText },
    { label: 'Roadmap', href: '#roadmap', icon: Map },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 font-bold text-xl">
            <div className="w-8 h-8 rounded-lg bg-gradient-blaze flex items-center justify-center">
              <Flame className="w-5 h-5 text-white" />
            </div>
            <span>BLAZE</span>
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-300 hover:text-orange-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA button */}
          <div className="hidden md:block">
            <a
              href="https://my.blazewallet.io"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-gradient-blaze rounded-lg font-bold hover:scale-105 transition-transform"
            >
              Launch app
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu - Solid full screen overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 md:hidden bg-slate-950 flex flex-col"
          >
            {/* Header with close button */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-blaze flex items-center justify-center">
                  <Flame className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">BLAZE</span>
              </div>
              <motion.button
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.2, delay: 0.1 }}
                onClick={() => setIsOpen(false)}
                className="w-10 h-10 rounded-lg bg-slate-800 hover:bg-slate-700 flex items-center justify-center transition-colors"
              >
                <X className="w-6 h-6 text-white" />
              </motion.button>
            </div>

            {/* Menu items */}
            <div className="flex-1 overflow-y-auto px-6 py-8 space-y-3">
              {links.map((link, index) => {
                const IconComponent = link.icon;
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                    whileHover={{ x: 5 }}
                    className="block w-full bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-orange-500/50 rounded-xl p-5 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-gradient-blaze flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-white group-hover:text-orange-400 transition-colors">
                          {link.label}
                        </h3>
                      </div>
                      <Rocket className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors flex-shrink-0" />
                    </div>
                  </motion.a>
                );
              })}
            </div>

            {/* CTA Button */}
            <div className="px-6 py-6 border-t border-slate-800 bg-slate-900">
              <motion.a
                href="https://my.blazewallet.io"
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: 0.4 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="block w-full px-6 py-4 bg-gradient-blaze rounded-xl font-bold text-lg text-center glow-orange shadow-2xl flex items-center justify-center gap-2"
              >
                <Rocket className="w-5 h-5" />
                Launch Wallet
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}



