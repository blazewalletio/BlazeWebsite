import dynamic from 'next/dynamic';
import Features from '@/components/Features';
import AboutSection from '@/components/AboutSection';
import Tokenomics from '@/components/Tokenomics';
import SocialProof from '@/components/SocialProof';
import Roadmap from '@/components/Roadmap';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

// Dynamic imports for Framer Motion components to prevent hydration errors
const Hero = dynamic(() => import('@/components/Hero'), { 
  ssr: false,
  loading: () => (
    <section className="relative min-h-screen flex items-center pt-20 md:pt-0 overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container-main relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center py-12 lg:py-20">
          <div className="text-center lg:text-left">
            <div className="h-10 w-48 bg-orange-500/20 rounded-full mb-6 mx-auto lg:mx-0 animate-pulse" />
            <div className="h-16 w-full max-w-lg bg-white/10 rounded-lg mb-4 animate-pulse" />
            <div className="h-6 w-3/4 bg-white/10 rounded-lg mb-8 mx-auto lg:mx-0 animate-pulse" />
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <div className="h-14 w-48 bg-orange-500/50 rounded-2xl animate-pulse" />
              <div className="h-14 w-36 bg-white/20 rounded-2xl animate-pulse" />
            </div>
          </div>
          <div className="flex justify-center lg:justify-end">
            <div className="w-[306px] h-[630px] bg-white/10 rounded-[3rem] animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  )
});

const QuickPay = dynamic(() => import('@/components/QuickPay'), { 
  ssr: false,
  loading: () => (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-main">
        <div className="text-center mb-16">
          <div className="h-10 w-48 bg-orange-100 rounded-full mb-6 mx-auto animate-pulse" />
          <div className="h-12 w-96 bg-gray-200 rounded-lg mb-4 mx-auto animate-pulse" />
          <div className="h-6 w-2/3 bg-gray-100 rounded-lg mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  )
});

const Demo = dynamic(() => import('@/components/Demo'), { 
  ssr: false,
  loading: () => (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container-main">
        <div className="text-center mb-16">
          <div className="h-12 w-80 bg-gray-200 rounded-lg mb-4 mx-auto animate-pulse" />
          <div className="h-6 w-2/3 bg-gray-100 rounded-lg mx-auto animate-pulse" />
        </div>
      </div>
    </section>
  )
});

const PresaleTeaser = dynamic(() => import('@/components/PresaleTeaser'), { 
  ssr: false,
  loading: () => (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container-main">
        <div className="h-64 bg-white/10 rounded-3xl animate-pulse" />
      </div>
    </section>
  )
});

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
