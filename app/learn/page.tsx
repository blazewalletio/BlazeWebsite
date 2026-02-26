import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { BookOpen, Shield, QrCode, ArrowRight, Sparkles } from 'lucide-react';

const guides = [
  {
    title: 'Crypto wallet for daily payments',
    description:
      'How to use a wallet for real-world purchases, not just holding assets.',
    href: '/learn/crypto-wallet-for-daily-payments',
    icon: BookOpen,
    chip: 'Everyday usage',
  },
  {
    title: 'Pay with USDC using QR code',
    description:
      'A practical walkthrough of QR payments with stablecoins and network selection.',
    href: '/learn/pay-with-usdc-qr-code',
    icon: QrCode,
    chip: 'QuickPay guide',
  },
  {
    title: 'Non-custodial wallet security',
    description:
      'Best practices to protect your keys, devices, and transaction flow.',
    href: '/learn/non-custodial-wallet-security',
    icon: Shield,
    chip: 'Security',
  },
];

export default function LearnHubPage() {
  return (
    <main className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Navbar />

      <section
        id="main-content"
        tabIndex={-1}
        className="relative overflow-hidden pt-24 md:pt-28 pb-12 md:pb-16 section-gradient-warm border-b border-gray-100"
      >
        <div
          className="absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.9\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
          }}
        />
        <div className="container-main relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium text-sm mb-5">
              <Sparkles className="w-4 h-4" />
              BLAZE Learn
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Practical crypto wallet guides
            </h1>
            <p className="text-lg text-gray-600">
              Learn how to pay with crypto in real life, secure your wallet setup, and avoid common mistakes.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-14 bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {guides.map((guide) => (
              <article key={guide.href} className="card card-hover p-6">
                <div className="w-11 h-11 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <guide.icon className="w-5 h-5 text-orange-600" />
                </div>
                <div className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 mb-3">
                  {guide.chip}
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{guide.title}</h2>
                <p className="text-gray-600 mb-5">{guide.description}</p>
                <Link href={guide.href} className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700">
                  Read guide
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

