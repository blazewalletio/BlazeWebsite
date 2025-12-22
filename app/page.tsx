import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Demo from '@/components/Demo';
import Tokenomics from '@/components/Tokenomics';
import Whitepaper from '@/components/Whitepaper';
import Roadmap from '@/components/Roadmap';
import Security from '@/components/Security';
import SocialProof from '@/components/SocialProof';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import StickyCTA from '@/components/StickyCTA';

export default function Home() {
  return (
    <main className="min-h-screen">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Navbar />
      <div id="main-content" className="sr-only">Main content</div>
      <Hero />
      <Features />
      <Demo />
      <Tokenomics />
      <Whitepaper />
      <Roadmap />
      <Security />
      <SocialProof />
      <FAQ />
      <Footer />
      <StickyCTA />
    </main>
  );
}



