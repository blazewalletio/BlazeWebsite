'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowRight, Zap, BookOpen, MessageCircle, Twitter, Send, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  
  // Check if we're on a page with a dark hero (only homepage)
  const hasDarkHero = pathname === '/';

  const mainLinks = [
    { label: 'Features', href: '/#features', icon: Zap },
    { label: 'How it works', href: '/#demo', icon: null },
    { label: 'Tokenomics', href: '/#tokenomics', icon: null },
    { label: 'FAQ', href: '/#faq', icon: null },
  ];

  const secondaryLinks = [
    { label: 'Whitepaper', href: '/whitepaper', icon: BookOpen },
    { label: 'Support', href: '/support', icon: MessageCircle },
  ];

  // Track scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Use light theme (dark text) when scrolled OR when not on homepage
  const useLightTheme = scrolled || !hasDarkHero;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      useLightTheme 
        ? 'bg-white/95 backdrop-blur-xl border-b border-gray-200 shadow-soft' 
        : 'bg-transparent'
    }`}>
      <div className="container-main">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 font-bold text-xl">
            <Image 
              src="/blaze-logo.png" 
              alt="BLAZE" 
              width={36} 
              height={36} 
              className="rounded-lg"
            />
            <span className={useLightTheme ? 'text-gray-900' : 'text-white'}>BLAZE</span>
          </a>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center gap-8">
            {mainLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  useLightTheme 
                    ? 'text-gray-600 hover:text-gray-900' 
                    : 'text-gray-300 hover:text-white'
                }`}
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
              className="btn-brand flex items-center gap-2"
            >
              Launch app
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`md:hidden w-10 h-10 flex items-center justify-center rounded-xl transition-all ${
              isOpen
                ? 'bg-orange-500 text-white'
                : useLightTheme 
                  ? 'hover:bg-gray-100 text-gray-900' 
                  : 'hover:bg-white/10 text-white'
            }`}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 top-16 md:hidden z-50 overflow-hidden"
          >
            {/* Background with gradient */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute inset-0 bg-gradient-to-b from-white via-white to-orange-50"
            />
            
            {/* Decorative blur */}
            <div className="absolute top-20 right-0 w-64 h-64 bg-orange-400/20 rounded-full blur-3xl" />
            <div className="absolute bottom-32 left-0 w-48 h-48 bg-yellow-400/20 rounded-full blur-3xl" />

            {/* Content */}
            <div className="relative flex flex-col h-full">
              {/* Logo section */}
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="px-6 py-6 border-b border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <Image 
                    src="/blaze-logo.png" 
                    alt="BLAZE" 
                    width={48} 
                    height={48} 
                    className="rounded-xl"
                  />
                  <div>
                    <div className="font-bold text-gray-900 text-lg">BLAZE Wallet</div>
                    <div className="text-sm text-orange-500">Crypto for everyday life</div>
                  </div>
                </div>
              </motion.div>

              {/* Main menu items */}
              <div className="flex-1 px-4 py-4 overflow-y-auto">
                <div className="space-y-1">
                  {mainLinks.map((link, index) => (
                    <motion.a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + index * 0.05 }}
                      className="flex items-center justify-between px-4 py-4 text-lg font-medium text-gray-900 rounded-2xl hover:bg-white active:bg-orange-50 transition-colors group"
                    >
                      <span>{link.label}</span>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-1 transition-all" />
                    </motion.a>
                  ))}
                </div>

                {/* Divider */}
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="my-4 border-t border-gray-100"
                />

                {/* Secondary links */}
                <div className="space-y-1">
                  {secondaryLinks.map((link, index) => (
                    <motion.div
                      key={link.href}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.45 + index * 0.05 }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-600 rounded-2xl hover:bg-white hover:text-gray-900 active:bg-orange-50 transition-colors"
                      >
                        <div className="w-9 h-9 bg-gray-100 rounded-xl flex items-center justify-center">
                          <link.icon className="w-4 h-4 text-gray-500" />
                        </div>
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Bottom section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="px-4 py-4 bg-white/80 backdrop-blur-sm border-t border-gray-100"
              >
                {/* Social links */}
                <div className="flex justify-center gap-3 mb-4">
                  <a
                    href="https://twitter.com/blazewallet_io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-orange-100 flex items-center justify-center transition-colors"
                  >
                    <Twitter className="w-5 h-5 text-gray-600" />
                  </a>
                  <a
                    href="https://t.me/blazewallet_io"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-orange-100 flex items-center justify-center transition-colors"
                  >
                    <Send className="w-5 h-5 text-gray-600" />
                  </a>
                </div>

                {/* CTA Button */}
                <a
                  href="https://my.blazewallet.io"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-4 text-lg font-semibold text-white rounded-2xl transition-all active:scale-[0.98]"
                  style={{
                    background: 'linear-gradient(135deg, #f97316 0%, #fb923c 50%, #fbbf24 100%)',
                    boxShadow: '0 4px 20px rgba(249, 115, 22, 0.3)'
                  }}
                >
                  <span>Launch app</span>
                  <ArrowRight className="w-5 h-5" />
                </a>

                {/* Safe area padding */}
                <div className="h-safe-area-pb" />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
