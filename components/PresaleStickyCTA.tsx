'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, X, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function PresaleStickyCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const checkMenuState = () => {
      setIsMenuOpen(document.body.style.overflow === 'hidden');
    };

    const handleScroll = () => {
      checkMenuState();
      if (window.scrollY > 500 && !isDismissed && !isMenuOpen) {
        setIsVisible(true);
      } else if (window.scrollY <= 500 || isMenuOpen) {
        setIsVisible(false);
      }
    };

    const interval = setInterval(checkMenuState, 250);
    window.addEventListener('scroll', handleScroll, { passive: true });
    checkMenuState();
    handleScroll();

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
          transition={{ type: 'spring', damping: 24, stiffness: 210 }}
          className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-slate-950/95 backdrop-blur-xl border-t border-white/10 shadow-2xl"
        >
          <div className="flex items-center gap-2">
            <a
              href="#commitment"
              className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold"
            >
              <Zap className="w-4 h-4" />
              Reserve my spot
              <ArrowRight className="w-4 h-4" />
            </a>
            <button
              onClick={() => {
                setIsDismissed(true);
                setIsVisible(false);
              }}
              className="h-11 w-11 rounded-xl bg-white/10 text-white flex items-center justify-center"
              aria-label="Dismiss sticky presale CTA"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}


