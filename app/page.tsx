import Hero from '@/components/Hero';
import QuickPay from '@/components/QuickPay';
import Features from '@/components/Features';
import Demo from '@/components/Demo';
import AboutSection from '@/components/AboutSection';
import Tokenomics from '@/components/Tokenomics';
import SocialProof from '@/components/SocialProof';
import Roadmap from '@/components/Roadmap';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import PresaleTeaser from '@/components/PresaleTeaser';
import ProductStatus from '@/components/ProductStatus';
import SupportBlazeTeaser from '@/components/SupportBlazeTeaser';
import { buildPageMetadata } from '@/lib/seo/metadata';
import Link from 'next/link';
import { BookOpen, ArrowRight, Shield, QrCode } from 'lucide-react';

export const metadata = buildPageMetadata({
  title: 'BLAZE Wallet: AI Crypto Wallet for Everyday Payments',
  description:
    'Use QuickPay to pay with crypto in seconds. BLAZE Wallet combines non-custodial security, scam protection, and multi-chain support for daily use.',
  path: '/',
  keywords: [
    'AI crypto wallet',
    'crypto wallet for payments',
    'non-custodial wallet',
    'QuickPay wallet',
    'multi-chain wallet',
  ],
});

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Navbar />
      <div id="main-content" tabIndex={-1}>
        <Hero />
        <ProductStatus />
        <QuickPay />
        <Features />
        <PresaleTeaser />
        <Demo />
        <section className="py-14 lg:py-20 bg-gray-50 border-y border-gray-100">
          <div className="container-main">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-medium text-sm mb-4">
                <BookOpen className="w-4 h-4" />
                Learn
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
                Practical guides for real-world crypto use
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Start with quick guides on payments, wallet security, and network choices.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Link href="/learn/pay-with-usdc-qr-code" className="card card-hover p-5">
                <QrCode className="w-6 h-6 text-orange-500 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Pay with USDC via QR</h3>
                <p className="text-sm text-gray-600">Step-by-step checkout flow for everyday payments.</p>
              </Link>
              <Link href="/learn/non-custodial-wallet-security" className="card card-hover p-5">
                <Shield className="w-6 h-6 text-emerald-500 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Wallet security basics</h3>
                <p className="text-sm text-gray-600">High-impact habits to reduce avoidable mistakes.</p>
              </Link>
              <Link href="/learn" className="card card-hover p-5">
                <BookOpen className="w-6 h-6 text-sky-500 mb-3" />
                <h3 className="font-bold text-gray-900 mb-1">Open all guides</h3>
                <p className="text-sm text-gray-600 inline-flex items-center gap-1">
                  Explore the learn hub
                  <ArrowRight className="w-4 h-4" />
                </p>
              </Link>
            </div>
          </div>
        </section>
        <SocialProof />
        <AboutSection />
        <Tokenomics />
        <Roadmap />
        <FAQ />
        <SupportBlazeTeaser />
        <Footer />
      </div>
    </main>
  );
}
