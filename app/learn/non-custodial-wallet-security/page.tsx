import type { Metadata } from 'next';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft, ArrowRight, CheckCircle2, Shield, Lock, KeyRound } from 'lucide-react';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Non-Custodial Wallet Security Guide',
  description:
    'A practical security guide for non-custodial wallets: key management, transaction checks, and device safety habits.',
  path: '/learn/non-custodial-wallet-security',
  keywords: [
    'non-custodial wallet security',
    'crypto wallet safety tips',
    'protect seed phrase',
    'secure crypto wallet',
  ],
});

export default function NonCustodialSecurityGuidePage() {
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
          <h1 className="text-3xl sm:text-5xl font-bold text-gray-900 mb-4">Non-custodial wallet security, explained simply</h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            Non-custodial means you control your keys. That gives freedom and responsibility. These habits reduce avoidable mistakes.
          </p>
        </div>
      </section>

      <section className="py-12 bg-gray-50">
        <div className="container-main grid grid-cols-1 lg:grid-cols-3 gap-5">
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
              <KeyRound className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">1. Protect your recovery phrase</h2>
            <p className="text-gray-600">Store recovery words offline and never share them in chat, forms, or support messages.</p>
          </article>
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
              <Shield className="w-5 h-5 text-emerald-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">2. Review every transaction</h2>
            <p className="text-gray-600">Always verify recipient, token, amount, and network before approving signatures.</p>
          </article>
          <article className="card p-6">
            <div className="w-11 h-11 rounded-xl bg-sky-100 flex items-center justify-center mb-4">
              <Lock className="w-5 h-5 text-sky-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">3. Secure your devices</h2>
            <p className="text-gray-600">Use strong lock methods and keep your wallet app and operating system up to date.</p>
          </article>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-main">
          <div className="card p-7">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Security checklist</h2>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Never expose seed phrase or private keys in screenshots.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Use phishing-resistant habits before connecting wallets to unknown dApps.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Enable biometric/PIN protection on all devices.</li>
              <li className="flex items-start gap-2"><CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5" />Treat every transaction confirmation as a final review step.</li>
            </ul>
            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Link href="/support" className="btn-brand inline-flex items-center justify-center gap-2">
                Contact support
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/documentation" className="btn-secondary inline-flex items-center justify-center gap-2">
                Read more docs
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

