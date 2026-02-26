import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, CheckCircle2, Wallet, Building2, Scale } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Crypto Wallet vs Exchange Wallet: Key Differences',
  description:
    'Understand the practical differences between non-custodial wallets and exchange wallets for payments, custody, and daily use.',
  path: '/learn/crypto-wallet-vs-exchange-wallet',
  keywords: [
    'crypto wallet vs exchange wallet',
    'non-custodial vs custodial wallet',
    'best wallet for payments',
  ],
});

export default function WalletVsExchangeWalletPage() {
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
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">Crypto wallet vs exchange wallet</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Both have a role. Exchanges are often used for buying and trading, while non-custodial wallets are built for direct ownership and day-to-day use.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-main grid grid-cols-1 lg:grid-cols-3 gap-5">
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
              <Wallet className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Non-custodial wallet</h2>
            <p className="text-gray-600">You control keys and transaction approval. Best for direct ownership and payment flexibility.</p>
          </article>
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
              <Building2 className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Exchange wallet</h2>
            <p className="text-gray-600">Custody is held by the platform. Convenient for trading and fiat ramps.</p>
          </article>
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center mb-4">
              <Scale className="w-5 h-5 text-sky-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Practical split</h2>
            <p className="text-gray-600">Many users buy on exchanges and move spend balances to non-custodial wallets.</p>
          </article>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-main">
          <div className="card p-7">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Decision checklist</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Need direct ownership and payment control? Use non-custodial wallet.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Need quick buying/selling with fiat? Exchange can be practical entry point.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />For routine spending, keep a dedicated wallet payment balance.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Review platform risk and custody model before storing larger amounts.</li>
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/#features" className="btn-brand inline-flex items-center justify-center gap-2">
                Explore wallet features
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/learn/non-custodial-wallet-security" className="btn-secondary inline-flex items-center justify-center gap-2">
                Security guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

