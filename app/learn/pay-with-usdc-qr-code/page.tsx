import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, CheckCircle2, QrCode, DollarSign, Clock3 } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'How to Pay with USDC via QR Code',
  description:
    'Step-by-step guide to paying with USDC using QR codes, including network selection, fee checks, and confirmation best practices.',
  path: '/learn/pay-with-usdc-qr-code',
  keywords: [
    'pay with USDC QR code',
    'USDC payment guide',
    'crypto QR code checkout',
  ],
});

export default function PayWithUsdcQrGuidePage() {
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
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">How to pay with USDC using a QR code</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            QR checkout is the fastest way to avoid address mistakes. This guide walks through a practical USDC flow you can repeat at any merchant.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-main grid grid-cols-1 lg:grid-cols-3 gap-5">
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
              <QrCode className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">1. Scan the merchant QR</h2>
            <p className="text-gray-600">Use camera scan in your wallet so receiver and request details populate automatically.</p>
          </article>
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
              <DollarSign className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">2. Verify amount and token</h2>
            <p className="text-gray-600">Confirm the checkout amount and make sure you are sending the right stablecoin variant.</p>
          </article>
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center mb-4">
              <Clock3 className="w-5 h-5 text-sky-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">3. Confirm network fee</h2>
            <p className="text-gray-600">Check network and estimated fee before sending to avoid surprises during checkout.</p>
          </article>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-main">
          <div className="card p-7">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">USDC QR best-practice list</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Double-check token symbol and network before confirming.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Use the wallet flow that shows live fee preview.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Wait for send confirmation before closing checkout.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Keep a small fee buffer in your wallet for smoother payments.</li>
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/#quickpay" className="btn-brand inline-flex items-center justify-center gap-2">
                Try QuickPay flow
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/documentation" className="btn-secondary inline-flex items-center justify-center gap-2">
                Open documentation
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

