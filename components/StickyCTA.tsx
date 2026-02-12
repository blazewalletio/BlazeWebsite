'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Rocket, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import TrackedLaunchAppLink from '@/components/TrackedLaunchAppLink';

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    // Check if mobile menu is open by checking body overflow
    // The Navbar sets body.style.overflow = 'hidden' when menu is open
    const checkMenuState = () => {
      const bodyOverflow = document.body.style.overflow;
      const isOpen = bodyOverflow === 'hidden';
      setIsMenuOpen(isOpen);
    };

    // Show CTA after scrolling down 300px (only if menu is not open)
    const handleScroll = () => {
      checkMenuState();
      if (window.scrollY > 300 && !isDismissed && !isMenuOpen) {
        setIsVisible(true);
      } else if (isMenuOpen) {
        setIsVisible(false);
      } else if (window.scrollY <= 300) {
        setIsVisible(false);
      }
    };

    // Check menu state on scroll and periodically
    const interval = setInterval(checkMenuState, 200);
    window.addEventListener('scroll', handleScroll);
    checkMenuState(); // Initial check
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isDismissed, isMenuOpen]);

  if (isDismissed || isMenuOpen) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-4 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
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
              <TrackedLaunchAppLink
                sourceContext="sticky_cta_launch"
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-gradient-blaze rounded-lg font-bold text-sm hover:scale-105 transition-transform glow-orange focus:outline-none focus:ring-2 focus:ring-orange-500"
              >
                Launch
              </TrackedLaunchAppLink>
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

