'use client';

import { motion } from 'framer-motion';
import { Flame, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const links = [
    { label: 'Features', href: '#features' },
    { label: 'Demo', href: '#demo' },
    { label: 'Tokenomics', href: '#tokenomics' },
    { label: 'Whitepaper', href: '#whitepaper' },
    { label: 'Roadmap', href: '#roadmap' },
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

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-slate-900 border-t border-white/10"
        >
          <div className="px-4 py-4 space-y-3">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block py-2 text-gray-300 hover:text-orange-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="https://my.blazewallet.io"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-6 py-3 bg-gradient-blaze rounded-lg font-bold text-center"
            >
              Launch app
            </a>
          </div>
        </motion.div>
      )}
    </nav>
  );
}



