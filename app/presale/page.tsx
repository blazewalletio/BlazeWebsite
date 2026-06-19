import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CopyContractCard from '@/components/CopyContractCard';
import {
  ArrowRight,
  CheckCircle2,
  Shield,
  Zap,
  Coins,
  Flame,
  Wallet,
  ArrowLeftRight,
  LineChart,
  Smartphone,
} from 'lucide-react';
import Link from 'next/link';
import { buildPageMetadata } from '@/lib/seo/metadata';
import { BLAZE_TOKEN } from '@/lib/token-constants';

const WALLET_URL = BLAZE_TOKEN.walletUrl;

export const metadata = buildPageMetadata({
  title: 'How to Buy $BLAZE on PancakeSwap',
  description:
    'Buy BLAZE Token ($BLAZE) on PancakeSwap in a few steps. Swap BNB for $BLAZE on BNB Smart Chain, verify the official contract, or buy directly inside BLAZE Wallet.',
  path: '/presale',
  keywords: [
    'buy BLAZE token',
    'BLAZE PancakeSwap',
    'how to buy BLAZE',
    'BLAZE BEP-20',
    'BLAZE Wallet token',
  ],
});

const buySteps = [
  {
    icon: Wallet,
    title: 'Get a wallet & BNB',
    body: 'Open BLAZE Wallet (or any BSC-compatible wallet) and make sure you hold some BNB on BNB Smart Chain to cover the purchase and gas fees.',
  },
  {
    icon: ArrowLeftRight,
    title: 'Open PancakeSwap',
    body: 'Head to PancakeSwap with $BLAZE pre-selected as the output token, then connect your wallet. Confirm the BLAZE contract matches the one below.',
  },
  {
    icon: Coins,
    title: 'Swap BNB for $BLAZE',
    body: 'Enter how much BNB you want to spend, review the rate, and confirm. $BLAZE arrives in your wallet within seconds.',
  },
];

const utilityHighlights = [
  '2% cashback on swap, send, and purchase activity in BLAZE Wallet',
  'Staking: 8% APY (flex), 15% (6-month), 20% (1-year)',
  'Fee discounts up to 75% on swaps (based on staked amount)',
  'Governance voting: 1 token = 1 vote',
];

const tokenMechanics = [
  '0.10% burn on every transfer',
  '50% of wallet revenue used for quarterly buyback & burn',
  'Target supply path: 1B to 700M over 10 years',
];

const faqs = [
  [
    'How do I buy $BLAZE?',
    'The fastest way is on PancakeSwap: connect your wallet, make sure you have BNB on BNB Smart Chain, and swap BNB for $BLAZE using the official contract address. You can also buy directly inside BLAZE Wallet at my.blazewallet.io.',
  ],
  [
    'What is the official contract address?',
    `$BLAZE runs on BNB Smart Chain (BEP-20). The official contract is ${BLAZE_TOKEN.contract}. Always verify it on BscScan before swapping — never trust an address from a DM.`,
  ],
  [
    'Do I need to set slippage?',
    '$BLAZE has a small 0.10% transfer burn. A slippage tolerance of around 0.5%–1% on PancakeSwap is usually enough for a smooth swap.',
  ],
  [
    'Can I buy without leaving the app?',
    'Yes. Open BLAZE Wallet at my.blazewallet.io, add funds, and buy $BLAZE in-app — no separate DEX account needed.',
  ],
  [
    'How do I stay safe?',
    'Only use official links (blazewallet.io and my.blazewallet.io). BLAZE will never ask for your seed phrase. Verify the contract address on BscScan every time.',
  ],
] as const;

export default function BuyBlazePage() {
  return (
    <main className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Navbar />

      {/* Hero */}
      <section id="main-content" tabIndex={-1} className="relative overflow-hidden pt-24 sm:pt-28 pb-14 sm:pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-0 left-1/4 w-[460px] h-[460px] bg-orange-500/20 rounded-full blur-[110px]" />
        <div className="absolute bottom-0 right-1/4 w-[360px] h-[360px] bg-yellow-500/15 rounded-full blur-[90px]" />

        <div className="container-main relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-orange-500/20 border border-emerald-500/30 text-emerald-300 font-medium text-xs sm:text-sm mb-5 sm:mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Live on PancakeSwap · BNB Smart Chain
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 leading-tight tracking-tight">
              Buy <span className="text-gradient-brand">$BLAZE</span> on PancakeSwap
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto mb-7 sm:mb-9">
              $BLAZE is the utility token of BLAZE Wallet. Swap BNB for $BLAZE on PancakeSwap in a few clicks, or buy it directly inside the app.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 sm:mb-10 max-w-md sm:max-w-none mx-auto">
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

            <div className="max-w-2xl mx-auto">
              <CopyContractCard variant="dark" />
            </div>

            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-gray-400 mt-6 sm:mt-8">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Non-custodial — you hold your keys
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Verified contract on BscScan
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Buy on PancakeSwap or in-app
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* How to buy */}
      <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
        <div className="container-main">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-medium text-sm mb-4">
                <Zap className="w-4 h-4" />
                How to buy
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">Buy $BLAZE in 3 steps</h2>
              <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
                Swap BNB for $BLAZE on PancakeSwap on BNB Smart Chain.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {buySteps.map((step, i) => (
                <div key={step.title} className="card p-5 sm:p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center">
                      <step.icon className="w-6 h-6 text-orange-600" />
                    </div>
                    <div className="text-xs font-semibold text-orange-600">STEP {i + 1}</div>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{step.title}</h3>
                  <p className="text-sm text-gray-600">{step.body}</p>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <a
                href={BLAZE_TOKEN.pancakeSwapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand inline-flex items-center justify-center gap-2 px-8 py-4"
              >
                Buy on PancakeSwap
                <ArrowRight className="w-5 h-5" />
              </a>
              <a
                href={BLAZE_TOKEN.bscScanTokenUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4"
              >
                <Shield className="w-5 h-5" />
                Verify on BscScan
              </a>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">
              Tip: $BLAZE has a 0.10% transfer burn — set PancakeSwap slippage to about 0.5%–1% for a smooth swap.
            </p>
          </div>
        </div>
      </section>

      {/* Buy in-app alternative */}
      <section className="py-12 sm:py-16 bg-gray-50 border-t border-gray-100">
        <div className="container-main">
          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div className="card p-6 sm:p-7">
              <div className="icon-box bg-orange-100 mb-4">
                <Wallet className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Prefer to buy in the app?</h3>
              <p className="text-gray-600 mb-5">
                Create a BLAZE Wallet account, add funds, and buy $BLAZE directly inside the app — no separate exchange account required.
              </p>
              <a
                href={WALLET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand inline-flex items-center gap-2"
              >
                Open BLAZE Wallet
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
            <div className="card p-6 sm:p-7">
              <div className="icon-box bg-sky-100 mb-4">
                <Smartphone className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Install BLAZE on your phone</h3>
              <p className="text-gray-600 mb-5">
                BLAZE Wallet is a web app you can install in seconds. Open my.blazewallet.io on your phone and tap “Add to Home Screen” for an app-like experience.
              </p>
              <Link href="/#install" className="btn-secondary inline-flex items-center gap-2">
                How to install
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Token utility */}
      <section className="py-10 sm:py-12 bg-white border-t border-gray-100">
        <div className="container-main">
          <div className="max-w-5xl mx-auto card p-5 sm:p-7 border border-gray-200">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 font-medium text-xs sm:text-sm mb-4">
              <Coins className="w-4 h-4" />
              BLAZE Wallet vs BLAZE Token
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              BLAZE Wallet is the app. BLAZE Token ($BLAZE) powers utility inside it.
            </h2>
            <p className="text-gray-600 mb-6">
              $BLAZE is the utility token used across the BLAZE Wallet ecosystem.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              {utilityHighlights.map((item) => (
                <div key={item} className="rounded-xl bg-gray-50 border border-gray-100 p-4 text-sm text-gray-700">
                  {item}
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-orange-50 border border-orange-200 p-4">
              <div className="flex items-center gap-2 font-semibold text-gray-900 mb-2">
                <Flame className="w-4 h-4 text-orange-600" />
                Deflationary model
              </div>
              <ul className="space-y-1 text-sm text-gray-700">
                {tokenMechanics.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-14 sm:py-20 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-medium text-sm mb-5">
                <Zap className="w-4 h-4" />
                Buy $BLAZE FAQ
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Frequently asked questions</h2>
              <p className="text-gray-600">Everything you need to buy $BLAZE safely.</p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map(([question, answer]) => (
                <div key={question} className="card card-hover p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{question}</h3>
                  <p className="text-gray-600 break-words">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
