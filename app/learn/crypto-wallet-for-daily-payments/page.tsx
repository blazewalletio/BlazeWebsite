import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, CheckCircle2, Wallet, QrCode, Shield } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Crypto Wallet for Daily Payments: Practical Guide',
  description:
    'Learn how to use a crypto wallet for coffee, groceries, and everyday purchases with practical setup and payment flow tips.',
  path: '/learn/crypto-wallet-for-daily-payments',
  keywords: [
    'crypto wallet for daily payments',
    'pay with crypto in stores',
    'crypto payment wallet guide',
  ],
});

export default function DailyPaymentsGuidePage() {
  return (
    <main className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Navbar />

      <section id="main-content" tabIndex={-1} className="pt-24 md:pt-28 pb-10 bg-white border-b border-gray-100">
        <div className="container-main">
          <Link href="/learn" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Learn
          </Link>
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">How to use a crypto wallet for daily payments</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Most wallets are built for trading. Daily payments need a faster and clearer flow: choose a stable asset, scan QR, confirm, and track status.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-main grid grid-cols-1 lg:grid-cols-3 gap-5">
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
              <Wallet className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">1. Choose spend-ready assets</h2>
            <p className="text-gray-600">Use assets with lower volatility for daily spend cases, then keep long-term holdings separate.</p>
          </article>
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
              <QrCode className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">2. Use QR-first checkout</h2>
            <p className="text-gray-600">QR-based flow reduces manual address errors and improves speed at point-of-sale.</p>
          </article>
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-sky-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">3. Confirm before sending</h2>
            <p className="text-gray-600">Always check amount, network, and recipient details before approving payment.</p>
          </article>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-main">
          <div className="card p-7">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Daily payment checklist</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Keep a dedicated spend balance in your wallet.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Prefer networks with predictable fees for checkout use.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Use QR payments to reduce manual entry mistakes.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Save receipts or transaction hashes for bookkeeping.</li>
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/#quickpay" className="btn-brand inline-flex items-center justify-center gap-2">
                Explore QuickPay
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/presale" className="btn-secondary inline-flex items-center justify-center gap-2">
                Open presale page
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

