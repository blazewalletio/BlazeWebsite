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
import TieredPricing from '@/components/TieredPricing';
import Leaderboard from '@/components/Leaderboard';
import CommitmentForm from '@/components/CommitmentForm';

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Navbar />
      <div id="main-content" className="sr-only">Main content</div>
      <Hero />
      <QuickPay />
      <Features />
      <TieredPricing />
      <CommitmentForm />
      <Leaderboard />
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
