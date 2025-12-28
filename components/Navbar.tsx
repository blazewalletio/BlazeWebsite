'use client';

import { Menu, X, ArrowRight, Zap, BookOpen, MessageCircle, Twitter, Send, ChevronRight, Wallet, Info, Map, Flame } from 'lucide-react';
import { useState, useEffect, useCallback, useRef } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const scrollPositionRef = useRef(0);
  
  // Check if we're on a page with a dark hero (only homepage)
  const hasDarkHero = pathname === '/';

  const mainLinks = [
    { label: 'Features', href: '/#features', description: 'What BLAZE offers' },
    { label: 'How it works', href: '/#demo', description: 'Get started in 3 steps' },
    { label: 'Presale', href: '/presale', description: 'Join the early bird presale', highlight: true },
    { label: 'Tokenomics', href: '/#tokenomics', description: 'BLAZE token economy' },
    { label: 'Roadmap', href: '/#roadmap', description: 'Our development plan' },
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
      scrollPositionRef.current = window.scrollY;
      
      // Lock body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollPositionRef.current}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore scroll position when menu closes
      const savedPosition = scrollPositionRef.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.left = '';
      document.body.style.right = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      
      // Use requestAnimationFrame to ensure smooth restoration
      requestAnimationFrame(() => {
        window.scrollTo(0, savedPosition);
      });
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

  // Use light theme (dark text) when scrolled OR when not on homepage OR when menu is open
  const useLightTheme = scrolled || !hasDarkHero || isOpen;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-300 ${
      useLightTheme 
        ? 'bg-white backdrop-blur-xl border-b border-gray-200 shadow-soft' 
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
          <div className="hidden md:flex items-center gap-6">
            {mainLinks.slice(0, 4).map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`font-medium transition-colors ${
                  link.highlight
                    ? 'text-orange-500 hover:text-orange-600 flex items-center gap-1'
                    : useLightTheme 
                      ? 'text-gray-600 hover:text-gray-900' 
                      : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.highlight && <Flame className="w-4 h-4" />}
                {link.label}
              </Link>
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

      {/* Mobile menu - Slide from top with staggered items */}
      <div 
        className={`fixed left-0 right-0 top-16 bottom-0 md:hidden z-[55] transition-opacity duration-250 ${
          isOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
        style={{ height: 'calc(100vh - 64px)' }}
      >
        {/* Backdrop overlay - click to close */}
        <div 
          className={`absolute inset-0 bg-black/20 backdrop-blur-sm transition-opacity duration-250 ${
            isOpen ? 'opacity-100' : 'opacity-0'
          }`}
          onClick={closeMenu}
        />
        
        {/* Menu panel - Slides from top */}
        <div 
          className={`absolute left-0 right-0 top-0 bg-white transition-all duration-250 ease-out ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
          }`}
          style={{
            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
            height: 'calc(100vh - 64px)',
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
                <div 
                  className={`text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 transition-all duration-200 ${
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}
                  style={{ transitionDelay: isOpen ? '50ms' : '0ms' }}
                >
                  Navigate
                </div>
                <div className="space-y-1">
                  {mainLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`flex items-center justify-between px-3 py-3.5 rounded-xl transition-all group ${
                        link.highlight 
                          ? 'bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200' 
                          : 'hover:bg-gray-50 active:bg-orange-50'
                      } ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'}`}
                      style={{ 
                        transitionDuration: '200ms',
                        transitionDelay: isOpen ? `${75 + index * 50}ms` : '0ms',
                      }}
                    >
                      <div className="flex items-center gap-3">
                        {link.highlight && (
                          <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                            <Flame className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div>
                          <div className={`font-semibold transition-colors ${
                            link.highlight ? 'text-orange-600' : 'text-gray-900 group-hover:text-orange-600'
                          }`}>
                            {link.label}
                          </div>
                          <div className="text-sm text-gray-500">{link.description}</div>
                        </div>
                      </div>
                      <ChevronRight className={`w-5 h-5 group-hover:translate-x-0.5 transition-all flex-shrink-0 ${
                        link.highlight ? 'text-orange-500' : 'text-gray-300 group-hover:text-orange-500'
                      }`} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Divider */}
              <div 
                className={`mx-5 border-t border-gray-100 transition-opacity duration-200 ${
                  isOpen ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ transitionDelay: isOpen ? '300ms' : '0ms' }}
              />

              {/* Secondary links */}
              <div className="px-3 py-3">
                <div 
                  className={`text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2 transition-all duration-200 ${
                    isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
                  }`}
                  style={{ transitionDelay: isOpen ? '325ms' : '0ms' }}
                >
                  Resources
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {secondaryLinks.map((link, index) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={closeMenu}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-gray-50 active:bg-orange-50 transition-all group ${
                        isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-3'
                      }`}
                      style={{ 
                        transitionDuration: '200ms',
                        transitionDelay: isOpen ? `${350 + index * 50}ms` : '0ms',
                      }}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${link.color}`}>
                        <link.icon className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-medium text-gray-600 group-hover:text-gray-900">{link.label}</span>
                    </Link>
                  ))}
                </div>
              </div>

            </div>

            {/* Fixed bottom section */}
            <div 
              className={`border-t border-gray-100 bg-white px-4 py-4 safe-area-pb transition-all duration-200 ${
                isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: isOpen ? '400ms' : '0ms' }}
            >
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
