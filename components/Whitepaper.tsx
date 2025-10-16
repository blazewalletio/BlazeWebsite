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
  'Multi-chain support (5 chains)',
  'Deflationary tokenomics (0.10% burn)',
  'Advanced staking (8-20% APY)',
  'Premium membership system',
  'Smart contract verified & audited',
  'Biometric authentication',
  'NFT marketplace & launchpad',
];

export default function Whitepaper() {
  return (
    <section id="whitepaper" className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />
      
      {/* Glow effects */}
      <div className="absolute top-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Whitepaper</span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Diepgaande technische documentatie en vision voor de toekomst van BLAZE.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Preview */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <div className="card-glass p-8 border-2 border-orange-500/30 glow-orange">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-xl bg-gradient-blaze flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold">BLAZE Whitepaper</h3>
                  <p className="text-gray-400">Version 2.0 • 32 paginas</p>
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
                  Lees online
                </a>
              </div>
            </div>

            {/* Quick stats */}
            <div className="grid grid-cols-2 gap-4">
              <div className="card-glass p-6 text-center">
                <div className="text-3xl font-bold text-gradient mb-1">32</div>
                <div className="text-sm text-gray-400">Paginas</div>
              </div>
              <div className="card-glass p-6 text-center">
                <div className="text-3xl font-bold text-gradient mb-1">10+</div>
                <div className="text-sm text-gray-400">Secties</div>
              </div>
              <div className="card-glass p-6 text-center">
                <div className="text-3xl font-bold text-gradient mb-1">5K+</div>
                <div className="text-sm text-gray-400">Downloads</div>
              </div>
              <div className="card-glass p-6 text-center">
                <div className="text-3xl font-bold text-gradient mb-1">v2.0</div>
                <div className="text-sm text-gray-400">Latest</div>
              </div>
            </div>
          </motion.div>

          {/* Right: Table of contents */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="card-glass p-8"
          >
            <h3 className="text-2xl font-bold mb-6">Inhoudsopgave</h3>
            <div className="space-y-2">
              {sections.map((section, index) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
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
                  <span><strong>Laatst bijgewerkt:</strong> December 2024</span>
                </div>
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-orange-400" />
                  <span><strong>Status:</strong> Final version</span>
                </div>
                <div className="flex items-center gap-2">
                  <PenTool className="w-4 h-4 text-orange-400" />
                  <span><strong>Auteurs:</strong> BLAZE Core Team</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-6 text-center">Aanvullende documentatie</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: 'Technical specs',
                description: 'Smart contract architectuur en API docs',
                icon: Settings,
              },
              {
                title: 'Audit report',
                description: 'Security audit door CertiK',
                icon: ShieldCheck,
              },
              {
                title: 'Tokenomics model',
                description: 'Gedetailleerde financiële projecties',
                icon: BarChart3,
              },
            ].map((doc, index) => {
              const IconComponent = doc.icon;
              return (
                <motion.div
                  key={doc.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
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


