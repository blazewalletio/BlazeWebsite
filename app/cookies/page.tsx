'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Cookie, Shield, Settings, BarChart3, Mail, Server, FileText, CheckCircle, XCircle, Info } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function CookiePolicyPage() {
  const cookieTypes = [
    {
      icon: Shield,
      title: 'Essential cookies',
      required: true,
      description: 'Required for the website to function properly. Cannot be disabled.',
      examples: ['Session management', 'Security tokens', 'Load balancing'],
      color: 'bg-emerald-100 text-emerald-600'
    },
    {
      icon: Settings,
      title: 'Functional cookies',
      required: false,
      description: 'Remember your preferences and settings for a better experience.',
      examples: ['Language preferences', 'Theme settings', 'Cookie consent'],
      color: 'bg-sky-100 text-sky-600'
    },
    {
      icon: BarChart3,
      title: 'Analytics cookies',
      required: false,
      description: 'Help us understand how visitors interact with our website.',
      examples: ['Google Analytics', 'Meta Pixel', 'Page views', 'User journeys'],
      color: 'bg-purple-100 text-purple-600'
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      {/* Hero */}
      <section className="pt-32 pb-16 bg-white border-b border-gray-200">
        <div className="container-main">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-3xl"
          >
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to home
            </Link>
            
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center">
                <Cookie className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Cookie policy
                </h1>
                <p className="text-gray-500">Last updated: December 23, 2024</p>
              </div>
            </div>
            
            <p className="text-xl text-gray-600">
              Learn how we use cookies to improve your experience on BLAZE Wallet.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            
            {/* What are cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">What are cookies?</h2>
              <div className="prose prose-gray max-w-none">
                <p>
                  Cookies are small text files that are placed on your device when you visit a website. 
                  They are widely used to make websites work more efficiently and to provide information 
                  to the site owners.
                </p>
                <p>
                  BLAZE Wallet uses cookies and similar technologies to enhance your experience, analyze 
                  usage, and assist in our marketing efforts. This policy explains what cookies we use 
                  and how you can control them.
                </p>
              </div>
            </motion.div>

            {/* Cookie Types */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Types of cookies we use</h2>
              <div className="space-y-4">
                {cookieTypes.map((type, index) => (
                  <div key={type.title} className="card p-6">
                    <div className="flex items-start gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${type.color}`}>
                        <type.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-gray-900">{type.title}</h3>
                          {type.required ? (
                            <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">
                              Required
                            </span>
                          ) : (
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">
                              Optional
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 mb-3">{type.description}</p>
                        <div className="flex flex-wrap gap-2">
                          {type.examples.map((example, i) => (
                            <span key={i} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {example}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Cookie Table */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Specific cookies</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Cookie name</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Purpose</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Duration</th>
                      <th className="text-left py-3 px-4 font-semibold text-gray-900">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: 'blaze_consent', purpose: 'Stores cookie preferences', duration: '1 year', type: 'Essential' },
                      { name: 'blaze_session', purpose: 'Session management', duration: 'Session', type: 'Essential' },
                      { name: '_ga', purpose: 'Google Analytics ID', duration: '2 years', type: 'Analytics' },
                      { name: '_gid', purpose: 'Google Analytics session', duration: '24 hours', type: 'Analytics' },
                      { name: '_fbp', purpose: 'Meta Pixel browser identifier', duration: '3 months', type: 'Analytics' },
                      { name: '_fbc', purpose: 'Meta click identifier (when present)', duration: '3 months', type: 'Analytics' },
                      { name: 'theme', purpose: 'Theme preference', duration: '1 year', type: 'Functional' },
                    ].map((cookie, i) => (
                      <tr key={i} className="border-b border-gray-100">
                        <td className="py-3 px-4 font-mono text-orange-600">{cookie.name}</td>
                        <td className="py-3 px-4 text-gray-600">{cookie.purpose}</td>
                        <td className="py-3 px-4 text-gray-600">{cookie.duration}</td>
                        <td className="py-3 px-4">
                          <span className={`text-xs px-2 py-0.5 rounded-full ${
                            cookie.type === 'Essential' ? 'bg-emerald-100 text-emerald-700' :
                            cookie.type === 'Analytics' ? 'bg-purple-100 text-purple-700' :
                            'bg-sky-100 text-sky-700'
                          }`}>
                            {cookie.type}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>

            {/* Managing Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Managing your cookies</h2>
              <div className="prose prose-gray max-w-none mb-6">
                <p>
                  You can control and/or delete cookies as you wish. You can delete all cookies that are 
                  already on your device and you can set most browsers to prevent them from being placed.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <h3 className="font-semibold text-gray-900 mb-2">Browser settings</h3>
                  <p className="text-gray-600 text-sm mb-3">
                    Most browsers allow you to manage cookie settings. Here are links to common browsers:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {[
                      { name: 'Chrome', url: 'https://support.google.com/chrome/answer/95647' },
                      { name: 'Firefox', url: 'https://support.mozilla.org/en-US/kb/cookies' },
                      { name: 'Safari', url: 'https://support.apple.com/guide/safari/manage-cookies' },
                      { name: 'Edge', url: 'https://support.microsoft.com/en-us/microsoft-edge/delete-cookies' },
                    ].map((browser) => (
                      <a
                        key={browser.name}
                        href={browser.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-orange-500 hover:underline"
                      >
                        {browser.name} →
                      </a>
                    ))}
                  </div>
                </div>
                
                <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <p className="text-amber-800 text-sm">
                      Disabling cookies may affect your experience on our website. Some features may not 
                      work properly without essential cookies.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Third-Party Cookies */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-party cookies</h2>
              <div className="prose prose-gray max-w-none">
                <p>
                  Some cookies are placed by third-party services that appear on our pages. We use:
                </p>
                <ul>
                  <li>
                    <strong>Google Analytics:</strong> To understand how visitors use our website and 
                    improve our services. 
                    <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
                      Google's Privacy Policy
                    </a>
                  </li>
                  <li>
                    <strong>Meta Pixel:</strong> To measure the effectiveness of our marketing and understand conversions.
                    <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer" className="text-orange-500 hover:underline">
                      Meta's Privacy Policy
                    </a>
                  </li>
                  <li>
                    <strong>Vercel Analytics:</strong> To monitor website performance and user experience.
                  </li>
                </ul>
                <p>
                  These third parties may use cookies to collect information about your online activities 
                  over time and across different websites.
                </p>
              </div>
            </motion.div>

            {/* Updates */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8 mb-8"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Updates to this policy</h2>
              <div className="prose prose-gray max-w-none">
                <p>
                  We may update this Cookie Policy from time to time to reflect changes in technology, 
                  legislation, or our data practices. When we make changes, we will update the "Last 
                  updated" date at the top of this policy.
                </p>
                <p>
                  We encourage you to periodically review this page for the latest information on our 
                  cookie practices.
                </p>
              </div>
            </motion.div>

            {/* Contact */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="card p-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact us</h2>
              <p className="text-gray-600 mb-4">
                If you have questions about our Cookie Policy, please contact us:
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-orange-500" />
                  <a href="mailto:info@blazewallet.io" className="text-gray-900 hover:text-orange-600">
                    info@blazewallet.io
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Server className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-900">BLAZE, Stavangerweg 13, Groningen, NL</span>
                </div>
                <div className="flex items-center gap-3">
                  <FileText className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-900">KvK: 88929280</span>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container-main">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/privacy" className="card px-6 py-3 hover:shadow-soft-md transition-all">
              <span className="font-medium text-gray-900">Privacy policy</span>
            </Link>
            <Link href="/terms" className="card px-6 py-3 hover:shadow-soft-md transition-all">
              <span className="font-medium text-gray-900">Terms of service</span>
            </Link>
            <Link href="/support" className="card px-6 py-3 hover:shadow-soft-md transition-all">
              <span className="font-medium text-gray-900">Contact support</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-200 bg-white">
        <div className="container-main text-center text-gray-500 text-sm">
          © 2025 BLAZE Wallet. All rights reserved. KvK: 88929280
        </div>
      </footer>
    </div>
  );
}
