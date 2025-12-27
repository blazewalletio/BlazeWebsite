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
import { HydrationDebug } from '@/components/HydrationDebug';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <HydrationDebug name="Navbar">
        <Navbar />
      </HydrationDebug>
      <div id="main-content" className="sr-only">Main content</div>
      <HydrationDebug name="Hero">
        <Hero />
      </HydrationDebug>
      <HydrationDebug name="QuickPay">
        <QuickPay />
      </HydrationDebug>
      <HydrationDebug name="Features">
        <Features />
      </HydrationDebug>
      <HydrationDebug name="PresaleTeaser">
        <PresaleTeaser />
      </HydrationDebug>
      <HydrationDebug name="Demo">
        <Demo />
      </HydrationDebug>
      <HydrationDebug name="SocialProof">
        <SocialProof />
      </HydrationDebug>
      <HydrationDebug name="AboutSection">
        <AboutSection />
      </HydrationDebug>
      <HydrationDebug name="Tokenomics">
        <Tokenomics />
      </HydrationDebug>
      <HydrationDebug name="Roadmap">
        <Roadmap />
      </HydrationDebug>
      <HydrationDebug name="FAQ">
        <FAQ />
      </HydrationDebug>
      <HydrationDebug name="Footer">
        <Footer />
      </HydrationDebug>
    </main>
  );
}
