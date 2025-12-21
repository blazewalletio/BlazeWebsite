'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Menu, X, Sparkles, Zap, Coins, FileText, Map, Rocket } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: 'Features', href: '#features', icon: Sparkles },
    { label: 'Demo', href: '#demo', icon: Zap },
    { label: 'Tokenomics', href: '#tokenomics', icon: Coins },
    { label: 'Whitepaper', href: '#whitepaper', icon: FileText },
    { label: 'Roadmap', href: '#roadmap', icon: Map },
  ];

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

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

      {/* Mobile menu - Slide-in drawer with glassmorphism */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-40 md:hidden bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-in drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ 
                type: 'spring', 
                damping: 25, 
                stiffness: 200,
                duration: 0.3
              }}
              className="fixed top-0 right-0 bottom-0 z-50 md:hidden w-full max-w-sm"
            >
              <div className="h-full bg-slate-950/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-blaze flex items-center justify-center">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold">BLAZE</span>
                  </div>
                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </motion.button>
                </div>

                {/* Menu items */}
                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-2">
                  {links.map((link, index) => {
                    const IconComponent = link.icon;
                    return (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ 
                          duration: 0.3, 
                          delay: index * 0.05,
                          ease: "easeOut"
                        }}
                        whileHover={{ x: -4 }}
                        className="flex items-center gap-4 px-5 py-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-orange-500/30 transition-all group"
                      >
                        <div className="w-12 h-12 rounded-xl bg-gradient-blaze/20 group-hover:bg-gradient-blaze flex items-center justify-center transition-all flex-shrink-0">
                          <IconComponent className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
                        </div>
                        <span className="text-lg font-semibold text-white group-hover:text-orange-400 transition-colors flex-1">
                          {link.label}
                        </span>
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.05 + 0.2 }}
                        >
                          <Rocket className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors" />
                        </motion.div>
                      </motion.a>
                    );
                  })}
                </div>

                {/* CTA Button */}
                <div className="px-6 py-6 border-t border-white/10 bg-slate-900/50">
                  <motion.a
                    href="https://my.blazewallet.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-6 py-4 bg-gradient-blaze rounded-xl font-bold text-lg text-center glow-orange shadow-lg flex items-center justify-center gap-2"
                  >
                    <Rocket className="w-5 h-5" />
                    Launch Wallet
                  </motion.a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}



