import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, CheckCircle2, Shield, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import PresaleTeaser from '@/components/PresaleTeaser';
import CommitmentForm from '@/components/CommitmentForm';
import Leaderboard from '@/components/Leaderboard';
import { PRESALE_CONSTANTS } from '@/lib/presale-constants';

export default function PresalePage() {
  const presaleDiscount = PRESALE_CONSTANTS.presaleDiscount;
  const launchPrice = PRESALE_CONSTANTS.launchPrice;
  const presalePrice = PRESALE_CONSTANTS.presalePrice;
  const faqs = [
    ['What is the BLAZE presale?', 'The presale gives early supporters access to BLAZE tokens at a discounted price before public launch.'],
    ['How much is the minimum intent?', 'The minimum intent amount is $100 and maximum is $10,000 per wallet.'],
    ['Do I pay immediately?', 'No. Registering intent is not a payment. You reserve your spot and receive payment instructions when presale opens.'],
    ['What does the referral program do?', 'Each signup gets a referral code. Referrals move you up the leaderboard and unlock bonus token rewards.'],
  ] as const;

  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-28 pb-16 section-gradient-warm">
        <div className="container-main">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-medium text-sm mb-6">
              <Zap className="w-4 h-4" />
              BLAZE presale
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-5">
              Join the <span className="text-gradient-brand">BLAZE presale</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
              Fixed price of ${presalePrice.toFixed(5)} per token ({presaleDiscount}% below ${launchPrice.toFixed(2)} launch),
              with bonus tiers for early supporters.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#commitment" className="btn-brand inline-flex items-center justify-center gap-2 px-8 py-4 text-lg">
                Reserve my spot
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link href="/whitepaper" className="btn-secondary inline-flex items-center justify-center gap-2 px-8 py-4 text-lg">
                Read whitepaper
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card p-6">
              <div className="icon-box bg-emerald-100 mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No upfront payment</h3>
              <p className="text-gray-600">Register intent first, complete purchase when presale opens.</p>
            </div>
            <div className="card p-6">
              <div className="icon-box bg-orange-100 mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Referral rewards</h3>
              <p className="text-gray-600">Invite friends and climb the leaderboard for extra token bonuses.</p>
            </div>
            <div className="card p-6">
              <div className="icon-box bg-sky-100 mb-4">
                <Shield className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Clear contribution limits</h3>
              <p className="text-gray-600">Intent range is $100 to $10,000 per wallet across all flows.</p>
            </div>
          </div>
        </div>
      </section>

      <PresaleTeaser />
      <CommitmentForm />
      <Leaderboard />

      <section className="py-20 bg-gray-50">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Frequently asked questions</h2>
              <p className="text-gray-600">Everything about intent registration and presale access.</p>
            </div>
            <div className="space-y-4">
              {faqs.map(([question, answer]) => (
                <div key={question} className="card p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{question}</h3>
                  <p className="text-gray-600">{answer}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

