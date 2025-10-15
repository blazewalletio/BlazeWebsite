import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Demo from '@/components/Demo';
import Tokenomics from '@/components/Tokenomics';
import Whitepaper from '@/components/Whitepaper';
import Roadmap from '@/components/Roadmap';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Demo />
      <Tokenomics />
      <Whitepaper />
      <Roadmap />
      <Footer />
    </main>
  );
}

