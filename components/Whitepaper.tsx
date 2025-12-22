'use client';

import { motion } from 'framer-motion';
import { FileText, Download, CheckCircle2, ExternalLink, Calendar, Lock, PenTool, Settings, ShieldCheck, BarChart3 } from 'lucide-react';

const sections = [
  { title: 'Executive Summary', page: 2 },
  { title: 'Problem Statement', page: 4 },
  { title: 'BLAZE Solution', page: 6 },
  { title: 'Technology Stack', page: 10 },
  { title: 'Smart Contract Architecture', page: 14 },
  { title: 'Token Economics', page: 18 },
  { title: 'Roadmap & Milestones', page: 22 },
  { title: 'Team & Advisors', page: 26 },
  { title: 'Security & Audits', page: 28 },
  { title: 'Legal & Compliance', page: 30 },
];

const highlights = [
  '5 Revolutionary AI Features',
  'Multi-chain support (18 blockchain networks)',
  'Deflationary tokenomics (0.10% burn)',
  'Advanced staking (8-20% APY)',
  'Premium membership system (10,000+ BLAZE)',
  'Smart contract verified & audited (39/39 tests passed)',
  'Biometric authentication & QR login',
  'NFT marketplace, Launchpad, Cashback & Referral',
];

export default function Whitepaper() {
  return (
    <section id="whitepaper" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Glow effects */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4">
            <span className="text-gradient">Whitepaper</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            In-depth technical documentation and vision for the future of BLAZE.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Preview */}
          <motion.div
            initial={{ x: -50 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="space-y-6"
          >
            <div className="card-glass p-6 sm:p-8 border-2 border-orange-500/30 glow-orange">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl bg-gradient-blaze flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold">BLAZE Whitepaper</h3>
                  <p className="text-gray-400 text-sm sm:text-base">Version 2.0 • 32 pages</p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {highlights.map((highlight, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                    <span className="text-gray-300">{highlight}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 px-6 py-3 bg-gradient-blaze rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 glow-orange">
                  <Download className="w-5 h-5" />
                  Download PDF
                </button>
                <a 
                  href="/whitepaper"
                  className="flex-1 px-6 py-3 card-glass rounded-xl font-bold hover:scale-105 transition-transform flex items-center justify-center gap-2 hover:bg-white/10"
                >
                  <ExternalLink className="w-5 h-5" />
                  Read online
                </a>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="card-glass p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">32</div>
                <div className="text-xs sm:text-sm text-gray-400">Pages</div>
              </div>
              <div className="card-glass p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">10+</div>
                <div className="text-xs sm:text-sm text-gray-400">Sections</div>
              </div>
              <div className="card-glass p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">5K+</div>
                <div className="text-xs sm:text-sm text-gray-400">Downloads</div>
              </div>
              <div className="card-glass p-4 sm:p-6 text-center">
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">v2.0</div>
                <div className="text-xs sm:text-sm text-gray-400">Latest</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Table of contents */}
          <motion.div
            initial={{ x: 50 }}
            whileInView={{ x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="card-glass p-6 sm:p-8"
          >
            <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Table of Contents</h3>
            <div className="space-y-2">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ x: 20 }}
                  whileInView={{ x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: index * 0.03, ease: "easeOut" }}
                  className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-blaze/20 flex items-center justify-center text-sm font-bold group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    <span className="font-medium group-hover:text-orange-400 transition-colors">
                      {section.title}
                    </span>
                  </div>
                  <span className="text-gray-400 text-sm">p.{section.page}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-orange-400" />
                  <span><strong>Last updated:</strong> December 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-orange-400" />
                  <span><strong>Status:</strong> Final version</span>
                </div>
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-orange-400" />
                  <span><strong>Authors:</strong> BLAZE Core Team</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional resources */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="mt-16"
        >
          <h3 className="text-xl sm:text-2xl font-bold mb-6 text-center px-4">Additional Documentation</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 px-4">
            {[
              {
                title: 'Technical specs',
                description: 'Smart contract architecture and API docs',
                icon: Settings,
              },
              {
                title: 'Audit report',
                description: 'Security audit by CertiK',
                icon: ShieldCheck,
              },
              {
                title: 'Tokenomics model',
                description: 'Detailed financial projections',
                icon: BarChart3,
              },
            ].map((doc, index) => {
              const IconComponent = doc.icon;
              return (
                <motion.div
                  key={doc.title}
                  initial={{ y: 20 }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05, ease: "easeOut" }}
                  className="card-glass p-6 hover:bg-white/10 transition-all cursor-pointer group"
                >
                  <div className="flex justify-center mb-3">
                    <div className="w-16 h-16 rounded-xl bg-gradient-blaze/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                      <IconComponent className="w-8 h-8 text-orange-400" />
                    </div>
                  </div>
                  <h4 className="text-xl font-bold mb-2 group-hover:text-orange-400 transition-colors">
                    {doc.title}
                  </h4>
                  <p className="text-gray-400 text-sm">{doc.description}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}



