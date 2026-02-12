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

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Navbar />
      <div id="main-content" className="sr-only">Main content</div>
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
      <Footer />
    </main>
  );
}
