'use client';

import { useState } from 'react';
import { ArrowRight, Copy, Check, Wallet, Coins, ArrowLeftRight, ShieldCheck, ExternalLink, LineChart } from 'lucide-react';
import { useAnimateOnce } from '@/hooks/useAnimateOnce';
import { BLAZE_TOKEN } from '@/lib/token-constants';

const steps = [
  {
    icon: Wallet,
    title: 'Get a wallet & some BNB',
    body: 'Open BLAZE Wallet (or any BSC wallet), then add BNB on BNB Smart Chain to cover your purchase and gas.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Open PancakeSwap',
    body: 'Go to PancakeSwap with BLAZE pre-selected as the output token, and connect your wallet.',
  },
  {
    icon: Coins,
    title: 'Swap BNB for $BLAZE',
    body: 'Enter the amount, confirm the swap, and $BLAZE lands in your wallet. Always verify the contract address below.',
  },
];

export default function BuyBlaze() {
  const [sectionRef, isVisible] = useAnimateOnce<HTMLElement>();
  const [copied, setCopied] = useState(false);

  const copyContract = async () => {
    try {
      await navigator.clipboard.writeText(BLAZE_TOKEN.contract);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section id="buy" ref={sectionRef} className="py-14 sm:py-16 lg:py-24 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-yellow-500/15 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container-main relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-8 sm:mb-10 lg:mb-12 animate-entrance ${isVisible ? 'is-visible' : ''}`}>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-orange-500/20 border border-emerald-500/30 text-emerald-300 font-medium text-xs sm:text-sm mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              $BLAZE is live on PancakeSwap
            </div>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-white mb-3 sm:mb-4">
              Buy <span className="text-gradient-brand">$BLAZE</span> in seconds
            </h2>
            <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto">
              BLAZE Token is live on BNB Smart Chain. Swap BNB for $BLAZE on PancakeSwap, or grab it straight from your BLAZE Wallet.
            </p>
          </div>

          {/* Primary CTAs */}
          <div className={`flex flex-col sm:flex-row gap-3 justify-center mb-8 sm:mb-10 max-w-xl sm:max-w-none mx-auto animate-entrance delay-1 ${isVisible ? 'is-visible' : ''}`}>
            <a
              href={BLAZE_TOKEN.pancakeSwapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-brand w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg shadow-lg shadow-orange-500/30"
            >
              Buy on PancakeSwap
              <ArrowRight className="w-5 h-5" />
            </a>
            <a
              href={BLAZE_TOKEN.dexScreenerUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg font-semibold rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/15 transition-colors"
            >
              <LineChart className="w-5 h-5" />
              View live chart
            </a>
          </div>

          {/* Contract address */}
          <div className={`max-w-2xl mx-auto mb-10 sm:mb-12 animate-entrance delay-1 ${isVisible ? 'is-visible' : ''}`}>
            <div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-4 sm:p-5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs sm:text-sm text-gray-400">Official BLAZE contract (BEP-20)</span>
                <a
                  href={BLAZE_TOKEN.bscScanTokenUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs text-emerald-300 hover:text-emerald-200 transition-colors"
                >
                  <ShieldCheck className="w-3.5 h-3.5" />
                  Verified on BscScan
                </a>
              </div>
              <div className="flex items-center gap-2">
                <code className="flex-1 min-w-0 truncate text-xs sm:text-sm text-white font-mono bg-black/30 rounded-lg px-3 py-2.5">
                  {BLAZE_TOKEN.contract}
                </code>
                <button
                  type="button"
                  onClick={copyContract}
                  aria-label="Copy contract address"
                  className="shrink-0 inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-sm font-medium transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <p className="text-[11px] sm:text-xs text-gray-500 mt-2">
                Always double-check the address. BLAZE will never DM you or ask for your seed phrase.
              </p>
            </div>
          </div>

          {/* How to buy */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 animate-entrance delay-2 ${isVisible ? 'is-visible' : ''}`}>
            {steps.map((step, i) => (
              <div key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500 to-yellow-500 flex items-center justify-center">
                    <step.icon className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xs font-semibold text-orange-400">STEP {i + 1}</span>
                </div>
                <h3 className="font-bold text-white mb-1">{step.title}</h3>
                <p className="text-sm text-gray-400">{step.body}</p>
              </div>
            ))}
          </div>

          {/* Secondary: buy via wallet + full guide */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-x-6 gap-y-3 text-sm animate-entrance delay-2 ${isVisible ? 'is-visible' : ''}`}>
            <a
              href={BLAZE_TOKEN.walletUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
            >
              <Wallet className="w-4 h-4 text-orange-400" />
              Prefer in-app? Buy inside BLAZE Wallet
            </a>
            <a
              href="/presale"
              className="inline-flex items-center gap-1 text-gray-400 hover:text-white transition-colors"
            >
              Full step-by-step buy guide
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
