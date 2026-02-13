'use client';

import { motion } from 'framer-motion';
import { ArrowLeft, FileText, Scale, AlertTriangle, CheckCircle, XCircle, Globe, Shield, Mail, Server } from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function TermsOfServicePage() {
  const sections = [
    { id: 'acceptance', title: 'Acceptance' },
    { id: 'description', title: 'Service description' },
    { id: 'eligibility', title: 'Eligibility' },
    { id: 'responsibilities', title: 'Your responsibilities' },
    { id: 'prohibited', title: 'Prohibited activities' },
    { id: 'intellectual', title: 'Intellectual property' },
    { id: 'third-party', title: 'Third-party services' },
    { id: 'disclaimers', title: 'Disclaimers' },
    { id: 'liability', title: 'Limitation of liability' },
    { id: 'termination', title: 'Termination' },
    { id: 'governing', title: 'Governing law' },
    { id: 'contact', title: 'Contact' },
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
                <Scale className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                  Terms of service
                </h1>
                <p className="text-gray-500">Last updated: December 23, 2024</p>
              </div>
            </div>
            
            <p className="text-xl text-gray-600">
              Please read these terms carefully before using BLAZE Wallet.
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
              className="card p-6 bg-amber-50 border-amber-200 mb-12"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-amber-900 mb-2">Important summary</h3>
                  <ul className="space-y-1 text-amber-800 text-sm">
                    <li>• BLAZE Wallet is non-custodial – you are responsible for your private keys</li>
                    <li>• Cryptocurrency involves risk of loss – never invest more than you can afford to lose</li>
                    <li>• You must be 18+ years old to use our services</li>
                    <li>• We comply with Dutch and EU law (KvK: 88929280)</li>
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Sections */}
            <div className="space-y-12">
              
              {/* Acceptance */}
              <motion.div
                id="acceptance"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of terms</h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    By accessing or using BLAZE Wallet, you agree to be bound by these Terms of Service 
                    and our Privacy Policy. If you do not agree to these terms, please do not use our services.
                  </p>
                  <p>
                    We may update these terms at any time. Continued use of BLAZE Wallet after changes 
                    constitutes acceptance of the modified terms.
                  </p>
                </div>
              </motion.div>

              {/* Service Description */}
              <motion.div
                id="description"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Service description</h2>
                <div className="prose prose-gray max-w-none mb-6">
                  <p>
                    BLAZE Wallet is a non-custodial cryptocurrency wallet that enables users to:
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Store and manage digital assets',
                    'Send and receive cryptocurrency',
                    'Pay at merchants via QuickPay',
                    'Stake BLAZE tokens',
                    'Access AI-powered features',
                    'Connect to decentralized applications',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-gray-50 rounded-xl">
                      <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                      <span className="text-gray-900">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-sky-50 rounded-xl border border-sky-200">
                  <p className="text-sky-800 text-sm">
                    <strong>Non-custodial:</strong> We never have access to your private keys or seed phrase. 
                    You maintain full control over your assets.
                  </p>
                </div>
              </motion.div>

              {/* Eligibility */}
              <motion.div
                id="eligibility"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Eligibility</h2>
                <div className="prose prose-gray max-w-none">
                  <p>To use BLAZE Wallet, you must:</p>
                  <ul>
                    <li>Be at least 18 years old</li>
                    <li>Have the legal capacity to enter into a binding agreement</li>
                    <li>Not be located in a jurisdiction where cryptocurrency services are prohibited</li>
                    <li>Not be on any sanctions lists or restricted from using financial services</li>
                  </ul>
                </div>
              </motion.div>

              {/* Your Responsibilities */}
              <motion.div
                id="responsibilities"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Your responsibilities</h2>
                <div className="space-y-4">
                  {[
                    { title: 'Secure your credentials', desc: 'Keep your seed phrase and private keys safe. Never share them with anyone, including BLAZE staff.' },
                    { title: 'Accurate information', desc: 'Provide truthful information when required.' },
                    { title: 'Lawful use', desc: 'Use BLAZE Wallet only for lawful purposes and comply with all applicable laws.' },
                    { title: 'Risk awareness', desc: 'Understand that cryptocurrency investments carry significant risk of loss.' },
                    { title: 'Tax compliance', desc: 'You are responsible for reporting and paying any applicable taxes on your cryptocurrency activities.' },
                  ].map((item, i) => (
                    <div key={i} className="p-4 bg-gray-50 rounded-xl">
                      <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Prohibited Activities */}
              <motion.div
                id="prohibited"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Prohibited activities</h2>
                <div className="prose prose-gray max-w-none mb-6">
                  <p>You may not use BLAZE Wallet for:</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {[
                    'Money laundering or terrorist financing',
                    'Fraud or deception',
                    'Sanctions violations',
                    'Illegal gambling',
                    'Dark web transactions',
                    'Ransomware payments',
                    'Circumventing security measures',
                    'Any illegal activity',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 p-3 bg-red-50 rounded-xl">
                      <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      <span className="text-red-900 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Intellectual Property */}
              <motion.div
                id="intellectual"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Intellectual property</h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    All content, features, and functionality of BLAZE Wallet, including but not limited to 
                    text, graphics, logos, icons, images, audio, video, software, and code, are owned by 
                    BLAZE and protected by international copyright, trademark, and other intellectual 
                    property laws.
                  </p>
                  <p>
                    You may not copy, modify, distribute, sell, or lease any part of our services without 
                    our explicit written permission.
                  </p>
                </div>
              </motion.div>

              {/* Third-Party Services */}
              <motion.div
                id="third-party"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Third-party services</h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    BLAZE Wallet integrates with third-party services including:
                  </p>
                  <ul>
                    <li><strong>MoonPay:</strong> For fiat-to-crypto purchases. Subject to MoonPay's terms and KYC requirements.</li>
                    <li><strong>Blockchain networks:</strong> Transaction fees and confirmation times are determined by the respective networks.</li>
                    <li><strong>Decentralized applications (dApps):</strong> We are not responsible for third-party dApps you connect to.</li>
                  </ul>
                  <p>
                    We are not liable for the actions, content, or policies of any third-party services.
                  </p>
                </div>
              </motion.div>

              {/* Disclaimers */}
              <motion.div
                id="disclaimers"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Disclaimers</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-amber-50 rounded-xl border border-amber-200">
                    <h4 className="font-semibold text-amber-900 mb-2">Risk warning</h4>
                    <p className="text-amber-800 text-sm">
                      Cryptocurrency and digital assets are highly volatile and speculative. You may lose 
                      some or all of your investment. Past performance is not indicative of future results. 
                      Never invest more than you can afford to lose.
                    </p>
                  </div>
                  <div className="prose prose-gray max-w-none">
                    <p>
                      BLAZE Wallet is provided "as is" without warranties of any kind, either express or 
                      implied. We do not guarantee:
                    </p>
                    <ul>
                      <li>Uninterrupted or error-free operation</li>
                      <li>That defects will be corrected</li>
                      <li>The accuracy of any information displayed</li>
                      <li>The security of data transmitted through our services</li>
                    </ul>
                    <p>
                      We do not provide investment, financial, legal, or tax advice. Consult appropriate 
                      professionals before making investment decisions.
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Limitation of Liability */}
              <motion.div
                id="liability"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Limitation of liability</h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    To the maximum extent permitted by law, BLAZE and its directors, employees, and 
                    affiliates shall not be liable for:
                  </p>
                  <ul>
                    <li>Any indirect, incidental, special, consequential, or punitive damages</li>
                    <li>Loss of profits, data, or goodwill</li>
                    <li>Loss of cryptocurrency or digital assets</li>
                    <li>Unauthorized access to or alteration of your data</li>
                    <li>Any conduct or content of third parties</li>
                  </ul>
                  <p>
                    Our total liability for any claims shall not exceed the amount you paid us in the 12 
                    months preceding the claim, or $100 (whichever is greater).
                  </p>
                </div>
              </motion.div>

              {/* Termination */}
              <motion.div
                id="termination"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Termination</h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    We may suspend or terminate your access to BLAZE Wallet at any time, without notice, 
                    for conduct that we believe violates these Terms or is harmful to other users, us, or 
                    third parties, or for any other reason.
                  </p>
                  <p>
                    Since BLAZE Wallet is non-custodial, you will always be able to access your assets 
                    using your seed phrase on any compatible wallet, even if your access to our services 
                    is terminated.
                  </p>
                </div>
              </motion.div>

              {/* Governing Law */}
              <motion.div
                id="governing"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Governing law</h2>
                <div className="prose prose-gray max-w-none">
                  <p>
                    These Terms are governed by and construed in accordance with the laws of the 
                    Netherlands, without regard to its conflict of law provisions.
                  </p>
                  <p>
                    Any disputes arising from these Terms or your use of BLAZE Wallet shall be resolved 
                    in the courts of Groningen, the Netherlands, unless otherwise required by applicable 
                    consumer protection laws.
                  </p>
                </div>
              </motion.div>

              {/* Contact */}
              <motion.div
                id="contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="card p-8 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200"
              >
                <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Contact us</h2>
                <p className="text-gray-600 mb-4">
                  If you have questions about these Terms of Service, please contact us:
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
            <Link href="/privacy" className="card px-6 py-3 hover:shadow-soft-md transition-all">
              <span className="font-medium text-gray-900">Privacy policy</span>
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
