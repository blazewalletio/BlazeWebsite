'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, Shield, Eye, Lock, Server, Globe, UserCheck, Mail, Clock, FileText } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function PrivacyPolicyPage() {
  const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'information', title: 'Information we collect' },
    { id: 'usage', title: 'How we use your information' },
    { id: 'sharing', title: 'Sharing your information' },
    { id: 'cookies', title: 'Cookies' },
    { id: 'security', title: 'Data security' },
    { id: 'retention', title: 'Data retention' },
    { id: 'rights', title: 'Your rights' },
    { id: 'contact', title: 'Contact us' },
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
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Privacy policy
                </h1>
                <p className="text-gray-500">Last updated: December 23, 2024</p>
              </div>
            </div>
            
            <p className="text-xl text-gray-600">
              Your privacy matters to us. This policy explains how BLAZE Wallet handles your data.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-6 bg-gray-50 border-b border-gray-200 sticky top-16 z-30">
        <div className="container-main">
          <div className="flex flex-wrap gap-2">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="px-3 py-1.5 text-sm bg-white rounded-lg border border-gray-200 hover:border-orange-300 hover:text-orange-600 transition-colors"
              >
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            
            {/* Key Points */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
            >
              {[
                { icon: Lock, title: 'Non-custodial', desc: 'We never store your private keys' },
                { icon: Eye, title: 'Minimal data', desc: 'We only collect what\'s necessary' },
                { icon: UserCheck, title: 'Your control', desc: 'You can delete your data anytime' },
              ].map((item, i) => (
                <div key={i} className="card p-6 text-center">
                  <item.icon className="w-8 h-8 text-orange-500 mx-auto mb-3" />
                  <h3 className="font-bold text-gray-900 mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.desc}</p>
                </div>
              ))}
            </motion.div>

            {/* Sections */}
            <div className="space-y-12">
              
              {/* Introduction */}
              <motion.div
                id="introduction"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Introduction</h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    BLAZE Wallet ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy 
                    explains how we collect, use, disclose, and safeguard your information when you use our 
                    cryptocurrency wallet application and website.
                  </p>
                  <p>
                    By using BLAZE Wallet, you agree to the collection and use of information in accordance with 
                    this policy. We comply with GDPR, CCPA, and other applicable privacy regulations.
                  </p>
                  <p className="text-gray-500 text-sm">
                    BLAZE Wallet is operated by BLAZE, KvK: 88929280, registered in the Netherlands at 
                    Stavangerweg 13, Groningen, The Netherlands.
                  </p>
                </div>
              </motion.div>

              {/* Information We Collect */}
              <motion.div
                id="information"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Information we collect</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Information you provide</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Email address (only if you opt in for notifications)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Contact form submissions</span>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Automatically collected</h3>
                    <ul className="space-y-2 text-gray-600">
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Device information (type, OS, browser)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span>Usage analytics (anonymized)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mt-2 flex-shrink-0" />
                        <span>IP address (for security purposes)</span>
                      </li>
                    </ul>
                  </div>
                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="flex items-start gap-3">
                      <Lock className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h4 className="font-semibold text-emerald-900">What we never collect</h4>
                        <p className="text-sm text-emerald-700">
                          Private keys, seed phrases, passwords, or any data that could compromise your wallet security. 
                          BLAZE Wallet is fully non-custodial.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* How We Use */}
              <motion.div
                id="usage"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. How we use your information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Provide services', desc: 'To operate and maintain BLAZE Wallet' },
                    { title: 'Improve experience', desc: 'To enhance features and fix bugs' },
                    { title: 'Security', desc: 'To detect and prevent fraud' },
                    { title: 'Communication', desc: 'To respond to your inquiries' },
                    { title: 'Legal compliance', desc: 'To comply with applicable laws' },
                    { title: 'Analytics', desc: 'To understand usage patterns (anonymized)' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Sharing */}
              <motion.div
                id="sharing"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Sharing your information</h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    We do not sell your personal information. We may share data with:
                  </p>
                  <ul>
                    <li><strong>Service providers:</strong> Third parties that help us operate our services (e.g., hosting, analytics)</li>
                    <li><strong>Payment processors:</strong> When using fiat on-ramp services like MoonPay</li>
                    <li><strong>Legal requirements:</strong> When required by law or to protect our rights</li>
                  </ul>
                  <p>
                    All third parties are contractually obligated to protect your data and use it only for 
                    the purposes we specify.
                  </p>
                </div>
              </motion.div>

              {/* Cookies */}
              <motion.div
                id="cookies"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Cookies</h2>
                <div className="prose prose-gray max-w-none mb-4">
                  <p>
                    We use cookies and similar technologies to enhance your experience. These include:
                  </p>
                  <ul>
                    <li><strong>Essential cookies:</strong> Required for the website to function</li>
                    <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
                    <li><strong>Preference cookies:</strong> Remember your settings</li>
                  </ul>
                </div>
                <Link href="/cookies" className="text-orange-500 font-medium hover:underline">
                  Read our full Cookie Policy →
                </Link>
              </motion.div>

              {/* Security */}
              <motion.div
                id="security"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Data security</h2>
                <div className="prose prose-gray max-w-none mb-6">
                  <p>
                    We implement industry-standard security measures to protect your information:
                  </p>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    'AES-256 encryption',
                    'HTTPS everywhere',
                    'Regular security audits',
                    'Access controls',
                  ].map((item, i) => (
                    <div key={i} className="p-3 bg-gray-50 rounded-xl text-center">
                      <span className="text-sm font-medium text-gray-900">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Retention */}
              <motion.div
                id="retention"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Data retention</h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    We retain your personal data only as long as necessary for the purposes outlined in this policy, 
                    or as required by law. Since BLAZE Wallet is non-custodial, most of your wallet data exists 
                    only on your device and blockchain networks.
                  </p>
                  <p>
                    Analytics data is automatically deleted after 26 months. You can request deletion of your 
                    personal data at any time.
                  </p>
                </div>
              </motion.div>

              {/* Your Rights */}
              <motion.div
                id="rights"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Your rights</h2>
                <div className="prose prose-gray max-w-none mb-6">
                  <p>Under GDPR and CCPA, you have the right to:</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { title: 'Access', desc: 'Request a copy of your personal data' },
                    { title: 'Rectification', desc: 'Correct inaccurate information' },
                    { title: 'Erasure', desc: 'Request deletion of your data' },
                    { title: 'Portability', desc: 'Receive your data in a portable format' },
                    { title: 'Object', desc: 'Opt out of certain data processing' },
                    { title: 'Withdraw consent', desc: 'Revoke previously given consent' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-sm text-gray-600">{item.desc}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-gray-600">
                  To exercise these rights, contact us at{' '}
                  <a href="mailto:info@blazewallet.io" className="text-orange-500 hover:underline">
                    info@blazewallet.io
                  </a>
                </p>
              </motion.div>

              {/* Contact */}
              <motion.div
                id="contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Contact us</h2>
                <p className="text-gray-600 mb-4">
                  If you have questions about this Privacy Policy or our data practices, please contact us:
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
        </div>
      </section>

      {/* Related Links */}
      <section className="py-12 bg-white border-t border-gray-200">
        <div className="container-main">
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/terms" className="card px-6 py-3 hover:shadow-soft-md transition-all">
              <span className="font-medium text-gray-900">Terms of service</span>
            </Link>
            <Link href="/cookies" className="card px-6 py-3 hover:shadow-soft-md transition-all">
              <span className="font-medium text-gray-900">Cookie policy</span>
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
