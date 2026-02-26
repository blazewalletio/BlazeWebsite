import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldAlert, Link2Off, BadgeAlert } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'How to Avoid Crypto Payment Scams',
  description:
    'A practical anti-scam guide for crypto wallet users: suspicious links, fake support messages, and transaction verification habits.',
  path: '/learn/avoid-crypto-payment-scams',
  keywords: [
    'avoid crypto scams',
    'crypto payment scam prevention',
    'wallet security checklist',
  ],
});

export default function AvoidCryptoPaymentScamsPage() {
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
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">How to avoid crypto payment scams</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Most losses come from social engineering, not protocol flaws. A short verification routine blocks many high-risk mistakes.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-main grid grid-cols-1 lg:grid-cols-3 gap-5">
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
              <Link2Off className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Check every link</h2>
            <p className="text-gray-600">Never trust shortened or copied links without verifying the destination domain first.</p>
          </article>
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
              <BadgeAlert className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Ignore fake urgency</h2>
            <p className="text-gray-600">Scammers push “act now” pressure to skip verification. Pause and re-check details.</p>
          </article>
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center mb-4">
              <ShieldAlert className="w-5 h-5 text-sky-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">Never share recovery phrase</h2>
            <p className="text-gray-600">No legitimate support team will ever ask for seed phrase or private keys.</p>
          </article>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-main">
          <div className="card p-7">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Anti-scam habit loop</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Verify recipient address on the final confirmation screen.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Cross-check support contact details via official website pages.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Treat unexpected DMs as untrusted until proven otherwise.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />If unsure, pause and ask via verified support channels.</li>
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/support" className="btn-brand inline-flex items-center justify-center gap-2">
                Contact verified support
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/learn/non-custodial-wallet-security" className="btn-secondary inline-flex items-center justify-center gap-2">
                Wallet security guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

