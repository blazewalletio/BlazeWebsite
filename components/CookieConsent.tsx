'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield } from 'lucide-react';
import Link from 'next/link';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    essential: true,
    functional: true,
    analytics: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    } else {
      try {
        const saved = JSON.parse(consent);
        setPreferences(saved);
      } catch (e) {
        setShowBanner(true);
      }
    }
  }, []);

  const acceptAll = () => {
    const allAccepted = { essential: true, functional: true, analytics: true };
    localStorage.setItem('cookie_consent', JSON.stringify(allAccepted));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setPreferences(allAccepted);
    setShowBanner(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('cookie_consent', JSON.stringify(preferences));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setShowBanner(false);
    setShowSettings(false);
  };

  const rejectNonEssential = () => {
    const essentialOnly = { essential: true, functional: false, analytics: false };
    localStorage.setItem('cookie_consent', JSON.stringify(essentialOnly));
    localStorage.setItem('cookie_consent_date', new Date().toISOString());
    setPreferences(essentialOnly);
    setShowBanner(false);
  };

  return (
    <AnimatePresence>
      {showBanner && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-gray-200 rounded-2xl shadow-soft-xl overflow-hidden">
              {!showSettings ? (
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center flex-shrink-0">
                      <Cookie className="w-6 h-6 text-sky-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-gray-900 mb-2">
                        We use cookies
                      </h3>
                      <p className="text-gray-600 text-sm mb-4">
                        We use cookies to improve your experience and analyze site usage.{' '}
                        <Link href="/cookies" className="text-sky-600 hover:underline">
                          Learn more
                        </Link>
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <button onClick={acceptAll} className="btn-primary text-sm py-2">
                          Accept all
                        </button>
                        <button onClick={rejectNonEssential} className="btn-secondary text-sm py-2">
                          Essential only
                        </button>
                        <button
                          onClick={() => setShowSettings(true)}
                          className="px-4 py-2 text-gray-600 hover:text-gray-900 text-sm transition-colors"
                        >
                          Customize
                        </button>
                      </div>
                    </div>
                    <button
                      onClick={rejectNonEssential}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                      aria-label="Close"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-bold text-gray-900">Cookie preferences</h3>
                    <button
                      onClick={() => setShowSettings(false)}
                      className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4 mb-6">
                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Shield className="w-5 h-5 text-emerald-600" />
                        <div>
                          <p className="font-semibold text-gray-900">Essential cookies</p>
                          <p className="text-sm text-gray-500">Required for the site to function</p>
                        </div>
                      </div>
                      <div className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-semibold rounded-full">
                        Always on
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Cookie className="w-5 h-5 text-sky-600" />
                        <div>
                          <p className="font-semibold text-gray-900">Functional cookies</p>
                          <p className="text-sm text-gray-500">Remember your preferences</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.functional}
                          onChange={(e) => setPreferences({ ...preferences, functional: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Cookie className="w-5 h-5 text-sky-600" />
                        <div>
                          <p className="font-semibold text-gray-900">Analytics cookies</p>
                          <p className="text-sm text-gray-500">Help us improve the service</p>
                        </div>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={preferences.analytics}
                          onChange={(e) => setPreferences({ ...preferences, analytics: e.target.checked })}
                          className="sr-only peer"
                        />
                        <div className="w-11 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500"></div>
                      </label>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button onClick={acceptSelected} className="btn-primary flex-1 text-sm py-2">
                      Save preferences
                    </button>
                    <button onClick={acceptAll} className="btn-secondary text-sm py-2">
                      Accept all
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
