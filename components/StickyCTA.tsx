'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, X } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    // Show CTA after scrolling down 300px
    const handleScroll = () => {
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (isDismissed) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-50 md:hidden p-4 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <Rocket className="w-4 h-4 text-orange-400" />
                <span className="text-sm font-bold text-white">Launch BLAZE Wallet</span>
              </div>
              <p className="text-xs text-gray-400">Experience the future of DeFi</p>
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://my.blazewallet.io"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-blaze rounded-lg font-bold text-sm hover:scale-105 transition-transform glow-orange focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Launch
              </a>
              <button
                onClick={() => {
                  setIsDismissed(true);
                  setIsVisible(false);
                }}
                className="w-8 h-8 rounded-lg bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500"
                aria-label="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

