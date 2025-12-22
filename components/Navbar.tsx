'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Flame, Menu, X, Sparkles, Zap, Coins, FileText, Map, Rocket, HelpCircle } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: 'Features', href: '#features', icon: Sparkles },
    { label: 'Demo', href: '#demo', icon: Zap },
    { label: 'Tokenomics', href: '#tokenomics', icon: Coins },
    { label: 'Whitepaper', href: '#whitepaper', icon: FileText },
    { label: 'Roadmap', href: '#roadmap', icon: Map },
    { label: 'FAQ', href: '#faq', icon: HelpCircle },
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

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

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
            onClick={handleMenuToggle}
            className="md:hidden w-10 h-10 flex items-center justify-center"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu - Full screen overlay with black background */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ 
              type: 'tween',
              duration: 0.3,
              ease: [0.4, 0, 0.2, 1]
            }}
            className="fixed inset-0 z-[9999] md:hidden bg-black"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9999,
              willChange: 'transform'
            }}
          >
              <div className="h-full w-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-blaze flex items-center justify-center">
                      <Flame className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold text-white">BLAZE</span>
                  </div>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-10 h-10 rounded-lg hover:bg-white/10 flex items-center justify-center transition-colors"
                  >
                    <X className="w-6 h-6 text-white" />
                  </button>
                </div>

                {/* Menu items */}
                <div className="flex-1 overflow-y-auto px-6 py-8" style={{ minHeight: 0 }}>
                  <div className="space-y-4">
                    {links.map((link, index) => {
                      const IconComponent = link.icon;
                      return (
                        <a
                          key={link.href || index}
                          href={link.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-4 px-6 py-5 rounded-xl hover:bg-white/5 transition-all group w-full"
                          style={{
                            display: 'flex',
                            visibility: 'visible',
                            opacity: 1,
                            color: 'white'
                          }}
                        >
                          <div className="w-14 h-14 rounded-xl bg-gradient-blaze/20 group-hover:bg-gradient-blaze flex items-center justify-center transition-all flex-shrink-0">
                            {IconComponent && <IconComponent className="w-7 h-7 text-white" />}
                          </div>
                          <span className="text-xl font-semibold text-white group-hover:text-orange-400 transition-colors flex-1">
                            {link.label}
                          </span>
                          <Rocket className="w-5 h-5 text-gray-500 group-hover:text-orange-400 transition-colors flex-shrink-0" />
                        </a>
                      );
                    })}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="px-6 py-6 border-t border-white/10">
                  <a
                    href="https://my.blazewallet.io"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsOpen(false)}
                    className="block w-full px-6 py-4 bg-gradient-blaze rounded-xl font-bold text-lg text-center glow-orange shadow-lg flex items-center justify-center gap-2 text-white hover:scale-105 transition-transform"
                  >
                    <Rocket className="w-5 h-5" />
                    Launch Wallet
                  </a>
                </div>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}



