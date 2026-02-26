import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, CheckCircle2, Network, Route, Layers } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Multi-Chain Wallet Guide for Daily Use',
  description:
    'Learn practical multi-chain wallet habits: network selection, asset routing, and common mistakes to avoid in daily payments.',
  path: '/learn/multi-chain-wallet-guide',
  keywords: [
    'multi-chain wallet guide',
    'cross-chain crypto wallet',
    'wallet network selection',
  ],
});

export default function MultiChainWalletGuidePage() {
  return (
    <main className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">Skip to main content</a>
      <Navbar />

      <section id="main-content" tabIndex={-1} className="pt-24 md:pt-28 pb-10 bg-white border-b border-gray-100">
        <div className="container-main">
          <Link href="/learn" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Link>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">Multi-chain wallet guide for everyday payments</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Multi-chain flexibility is powerful, but only if you choose the right network for each payment context and keep balances organized.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-main grid grid-cols-1 lg:grid-cols-3 gap-5">
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
              <Network className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Choose the right network</h2>
            <p className="text-gray-600">Pick networks based on fee profile, speed, and merchant compatibility.</p>
          </article>
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
              <Route className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Route assets intentionally</h2>
            <p className="text-gray-600">Keep spend assets on payment-friendly chains and long-term holdings separate.</p>
          </article>
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center mb-4">
              <Layers className="w-5 h-5 text-sky-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Avoid chain mismatch</h2>
            <p className="text-gray-600">Always confirm recipient chain before sending to prevent avoidable transfer errors.</p>
          </article>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-main">
          <div className="card p-7">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Multi-chain checklist</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Label key wallet addresses per network for quick visual verification.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Maintain a small gas buffer on frequently used chains.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Before sending, check token + chain + recipient one final time.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Use documentation/support when chain compatibility is unclear.</li>
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/documentation" className="btn-brand inline-flex items-center justify-center gap-2">
                Open documentation
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/learn/crypto-payment-fees-explained" className="btn-secondary inline-flex items-center justify-center gap-2">
                Fee guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

