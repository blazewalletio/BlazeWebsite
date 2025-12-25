'use client';

import { Menu, X, ArrowRight, Zap, BookOpen, MessageCircle, Twitter, Send, ChevronRight, Wallet, Info, Map } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react';
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
    { label: 'Features', href: '/#features', description: 'What BLAZE offers' },
    { label: 'How it works', href: '/#demo', description: 'Get started in 3 steps' },
    { label: 'Tokenomics', href: '/#tokenomics', description: 'BLAZE token economy' },
    { label: 'Roadmap', href: '/#roadmap', description: 'Our development plan' },
    { label: 'FAQ', href: '/#faq', description: 'Common questions' },
  ];

  const secondaryLinks = [
    { label: 'Whitepaper', href: '/whitepaper', icon: BookOpen, color: 'bg-purple-100 text-purple-600' },
    { label: 'Support', href: '/support', icon: MessageCircle, color: 'bg-sky-100 text-sky-600' },
    { label: 'About us', href: '/#about', icon: Info, color: 'bg-emerald-100 text-emerald-600' },
  ];

  // Track scroll for navbar background
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Robust body scroll lock for iOS and Android
  useEffect(() => {
    if (isOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore scroll position
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [isOpen]);

  // Close menu on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, []);

  // Close menu function
  const closeMenu = useCallback(() => setIsOpen(false), []);

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
            {mainLinks.slice(0, 4).map((link) => (
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
            aria-expanded={isOpen}
          >
            {isOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu - CSS-based animations for better performance */}
      <div 
        className={`fixed inset-0 top-16 md:hidden z-50 transition-all duration-300 ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop overlay - click to close */}
        <div 
          className="absolute inset-0 bg-black/20 backdrop-blur-sm"
          onClick={closeMenu}
        />
        
        {/* Menu panel */}
        <div 
          className={`absolute inset-x-0 top-0 bottom-0 bg-white transition-transform duration-300 ease-out ${
            isOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
          style={{
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
          }}
        >
          {/* Decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-orange-50/50 via-transparent to-transparent pointer-events-none" />
          
          {/* Content container */}
          <div className="relative flex flex-col h-full">
            {/* Scrollable menu content */}
            <div className="flex-1 overflow-y-auto overscroll-contain">
              {/* Main navigation */}
              <div className="px-3 pt-4 pb-3">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                  Navigate
                </div>
                <div className="space-y-1">
                  {mainLinks.map((link, index) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className="flex items-center justify-between px-3 py-3.5 rounded-xl hover:bg-gray-50 active:bg-orange-50 transition-colors group"
                      style={{
                        animationDelay: `${index * 50}ms`,
                      }}
                    >
                      <div>
                        <div className="font-semibold text-gray-900 group-hover:text-orange-600 transition-colors">
                          {link.label}
                        </div>
                        <div className="text-sm text-gray-500">{link.description}</div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-orange-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                    </a>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div className="mx-5 border-t border-gray-100" />

              {/* Secondary links */}
              <div className="px-3 py-3">
                <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
                  Resources
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {secondaryLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 active:bg-orange-50 transition-colors group"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${link.color}`}>
                        <link.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Quick stats */}
              <div className="mx-5 my-3 p-4 rounded-2xl bg-gradient-to-r from-gray-50 to-orange-50/50 border border-gray-100">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-lg font-bold text-gray-900">18+</div>
                    <div className="text-xs text-gray-500">Chains</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-orange-600">2s</div>
                    <div className="text-xs text-gray-500">Payments</div>
                  </div>
                  <div>
                    <div className="text-lg font-bold text-gray-900">5</div>
                    <div className="text-xs text-gray-500">AI features</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Fixed bottom section */}
            <div className="border-t border-gray-100 bg-white px-4 py-4 safe-area-pb">
              {/* Social links */}
              <div className="flex justify-center gap-3 mb-4">
                <a
                  href="https://twitter.com/blazewallet_io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-orange-100 flex items-center justify-center transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5 text-gray-600" />
                </a>
                <a
                  href="https://t.me/blazewallet_io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-11 h-11 rounded-xl bg-gray-100 hover:bg-gray-200 active:bg-orange-100 flex items-center justify-center transition-colors"
                  aria-label="Telegram"
                >
                  <Send className="w-5 h-5 text-gray-600" />
                </a>
              </div>

              {/* CTA Button */}
              <a
                href="https://my.blazewallet.io"
                target="_blank"
                rel="noopener noreferrer"
                onClick={closeMenu}
                className="w-full flex items-center justify-center gap-2 py-4 text-lg font-semibold text-white rounded-2xl transition-all active:scale-[0.98] btn-brand"
              >
                <Wallet className="w-5 h-5" />
                <span>Launch app</span>
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
