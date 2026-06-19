'use client';

import { ArrowRight, Share, Plus, MoreVertical, Smartphone, Zap } from 'lucide-react';
import { useAnimateOnce } from '@/hooks/useAnimateOnce';
import TrackedLaunchAppLink from '@/components/TrackedLaunchAppLink';

const iosSteps = [
  { icon: Share, text: 'Open my.blazewallet.io in Safari and tap the Share icon.' },
  { icon: Plus, text: 'Choose “Add to Home Screen”.' },
  { icon: Smartphone, text: 'Tap “Add” — BLAZE now opens like a native app.' },
];

const androidSteps = [
  { icon: MoreVertical, text: 'Open my.blazewallet.io in Chrome and tap the ⋮ menu.' },
  { icon: Plus, text: 'Choose “Install app” or “Add to Home screen”.' },
  { icon: Smartphone, text: 'Confirm — BLAZE installs to your home screen.' },
];

export default function InstallApp() {
  const [sectionRef, isVisible] = useAnimateOnce<HTMLElement>();

  return (
    <section id="install" ref={sectionRef} className="py-16 sm:py-20 lg:py-28 bg-white border-y border-gray-100">
      <div className="container-main">
        <div className={`text-center mb-10 sm:mb-12 animate-entrance ${isVisible ? 'is-visible' : ''}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-medium text-sm mb-4">
            <Smartphone className="w-4 h-4" />
            Install in seconds
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-3">
            Get <span className="text-gradient-brand">BLAZE</span> on your phone
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            BLAZE Wallet is a web app — no download, no app store. Add it to your home screen and it works just like a native app, fully non-custodial.
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto mb-10 animate-entrance delay-1 ${isVisible ? 'is-visible' : ''}`}>
          {/* iOS */}
          <div className="card p-6 sm:p-7">
            <h3 className="font-bold text-gray-900 mb-5">On iPhone & iPad</h3>
            <ol className="space-y-4">
              {iosSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-sky-100 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-sky-600" />
                  </div>
                  <span className="text-sm text-gray-700 pt-1.5">{step.text}</span>
                </li>
              ))}
            </ol>
          </div>

          {/* Android */}
          <div className="card p-6 sm:p-7">
            <h3 className="font-bold text-gray-900 mb-5">On Android</h3>
            <ol className="space-y-4">
              {androidSteps.map((step, i) => (
                <li key={i} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg bg-emerald-100 flex items-center justify-center flex-shrink-0">
                    <step.icon className="w-5 h-5 text-emerald-600" />
                  </div>
                  <span className="text-sm text-gray-700 pt-1.5">{step.text}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        <div className={`text-center animate-entrance delay-2 ${isVisible ? 'is-visible' : ''}`}>
          <TrackedLaunchAppLink
            sourceContext="install_section_cta"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-brand inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg shadow-lg shadow-orange-500/20"
          >
            <Zap className="w-5 h-5" />
            Launch BLAZE Wallet
            <ArrowRight className="w-5 h-5" />
          </TrackedLaunchAppLink>
          <p className="text-sm text-gray-500 mt-3">Free · Non-custodial · Create your wallet in 30 seconds</p>
        </div>
      </div>
    </section>
  );
}
