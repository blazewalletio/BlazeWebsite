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
