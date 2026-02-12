'use client';

import { CheckCircle, Circle, Rocket, ArrowRight } from 'lucide-react';
import { useAnimateOnce } from '@/hooks/useAnimateOnce';

const roadmapPhases = [
  {
    phase: 'Q2 2025',
    title: 'Foundation',
    status: 'completed',
    highlights: [
      'Core wallet architecture',
      'Multi-chain infrastructure',
      'Smart contract development',
      'Security framework design',
      'Website & branding',
    ],
  },
  {
    phase: 'Q3 2025',
    title: 'AI & QuickPay',
    status: 'completed',
    highlights: [
      'QuickPay integration',
      'AI transaction assistant',
      'Smart scam detector',
      'Gas optimizer with smart scheduling',
      'Portfolio advisor & market analyzer',
    ],
  },
  {
    phase: 'Q4 2025',
    title: 'DEX & fiat integration',
    status: 'completed',
    highlights: [
      'Li.Fi integration (token swaps)',
      'Onramper integration (fiat on/off ramp)',
      'Multi-chain support (18+ chains)',
      'PWA & mobile-first design',
    ],
  },
  {
    phase: 'Q1 2026',
    title: 'Presale & app launch',
    status: 'active',
    highlights: [
      'BLAZE token presale',
      'iOS & Android app launch',
      'Public beta release',
      'Staking platform live',
      'CertiK security audit',
    ],
  },
  {
    phase: 'Q2 2026',
    title: 'Growth & expansion',
    status: 'upcoming',
    highlights: [
      'CEX listings (continued)',
      'Merchant partnerships',
      'BLAZE card program',
      'Governance launch',
    ],
  },
  {
    phase: 'Q3 2026',
    title: 'Ecosystem',
    status: 'upcoming',
    highlights: [
      'Cross-chain bridges',
      'Hardware wallet support',
      'Advanced AI features',
      'Enterprise solutions',
    ],
  },
  {
    phase: 'Q4 2026',
    title: 'Global scale',
    status: 'upcoming',
    highlights: [
      'Worldwide merchant adoption',
      'Banking partnerships',
      'Multi-currency card rollout',
      'DAO governance active',
    ],
  },
];

export default function Roadmap() {
  const [sectionRef, isVisible] = useAnimateOnce<HTMLElement>(0.05);

  return (
    <section id="roadmap" ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="container-main">
        {/* Header */}
        <div className={`text-center mb-12 animate-entrance ${isVisible ? 'is-visible' : ''}`}>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Product <span className="text-gradient-brand">roadmap</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-xl mx-auto">
            From foundation to global scale – transparent planning for the future.
          </p>
        </div>

        {/* Timeline grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-entrance delay-1 ${isVisible ? 'is-visible' : ''}`}>
          {roadmapPhases.map((phase) => (
            <div key={phase.phase}>
              <div className={`card p-5 h-full ${
                phase.status === 'active' 
                  ? 'border-orange-300 bg-orange-50 ring-2 ring-orange-200' 
                  : phase.status === 'completed'
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : 'border-gray-200'
              }`}>
                <div className="flex items-center gap-2 mb-3">
                  {phase.status === 'completed' && (
                    <CheckCircle className="w-4 h-4 text-emerald-500" />
                  )}
                  {phase.status === 'active' && (
                    <Rocket className="w-4 h-4 text-orange-500" />
                  )}
                  {phase.status === 'upcoming' && (
                    <Circle className="w-4 h-4 text-gray-400" />
                  )}
                  <span className={`text-xs font-semibold uppercase tracking-wide ${
                    phase.status === 'completed' ? 'text-emerald-600' :
                    phase.status === 'active' ? 'text-orange-600' : 'text-gray-500'
                  }`}>
                    {phase.phase}
                  </span>
                  {phase.status === 'active' && (
                    <span className="text-[10px] font-medium text-orange-600 bg-orange-100 px-1.5 py-0.5 rounded-full ml-auto">
                      Current
                    </span>
                  )}
                </div>

                <h3 className="font-bold text-gray-900 mb-3">{phase.title}</h3>

                <ul className="space-y-1.5">
                  {phase.highlights.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                      <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5 ${
                        phase.status === 'completed' ? 'bg-emerald-400' :
                        phase.status === 'active' ? 'bg-orange-400' : 'bg-gray-300'
                      }`} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className={`mt-10 text-center animate-entrance delay-2 ${isVisible ? 'is-visible' : ''}`}>
          <a
            href="/whitepaper#roadmap"
            className="inline-flex items-center gap-2 text-orange-600 font-medium hover:text-orange-700 transition-colors"
          >
            View detailed roadmap
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
