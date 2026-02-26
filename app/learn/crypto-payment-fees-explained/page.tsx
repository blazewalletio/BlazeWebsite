import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, CheckCircle2, DollarSign, Clock3, Gauge } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Crypto Payment Fees Explained',
  description:
    'Understand crypto payment fees, network congestion, and practical habits to reduce cost and failed checkout attempts.',
  path: '/learn/crypto-payment-fees-explained',
  keywords: [
    'crypto payment fees',
    'wallet network fees explained',
    'reduce gas fees',
  ],
});

export default function CryptoPaymentFeesExplainedPage() {
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
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">Crypto payment fees explained</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Fee cost depends on network demand, transaction type, and timing. If you understand those three factors, checkout gets more predictable.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-main grid grid-cols-1 lg:grid-cols-3 gap-5">
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Base fee</h2>
            <p className="text-gray-600">Most networks have a baseline fee level that rises during busy periods.</p>
          </article>
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
              <Gauge className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Priority level</h2>
            <p className="text-gray-600">Higher priority confirms faster but usually costs more.</p>
          </article>
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center mb-4">
              <Clock3 className="w-5 h-5 text-sky-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Timing window</h2>
            <p className="text-gray-600">Executing outside peak hours can reduce total checkout cost.</p>
          </article>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-main">
          <div className="card p-7">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Fee optimization checklist</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Compare network options before confirming send.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Set realistic max fee thresholds for non-urgent payments.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Use fee preview tools in-wallet when available.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Track typical fee times for your most-used network.</li>
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/documentation" className="btn-brand inline-flex items-center justify-center gap-2">
                Read payment docs
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/learn/multi-chain-wallet-guide" className="btn-secondary inline-flex items-center justify-center gap-2">
                Multi-chain guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

