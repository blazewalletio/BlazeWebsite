import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, CheckCircle2, Shield, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import PresaleTeaser from '@/components/PresaleTeaser';
import CommitmentForm from '@/components/CommitmentForm';
import Leaderboard from '@/components/Leaderboard';
import PresaleCountdown from '@/components/PresaleCountdown';
import { PRESALE_CONSTANTS } from '@/lib/presale-constants';

export default function PresalePage() {
  const presaleDiscount = PRESALE_CONSTANTS.presaleDiscount;
  const launchPrice = PRESALE_CONSTANTS.launchPrice;
  const presalePrice = PRESALE_CONSTANTS.presalePrice;
  const faqs = [
    ['What is the BLAZE presale?', 'The presale gives early supporters access to BLAZE tokens at a discounted price before public launch.'],
    ['How much is the minimum intent?', 'The minimum intent amount is $100 and maximum is $10,000 per wallet.'],
    ['Do I pay immediately?', 'No. Registering intent is not a payment. You reserve your spot and receive payment instructions when the presale goes live.'],
    ['What does the referral program do?', 'Each signup gets a referral code. Referrals move you up the leaderboard and unlock bonus token rewards.'],
  ] as const;

  return (
    <main className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Navbar />
      <div id="main-content" className="sr-only">Main content</div>

      <section className="relative overflow-hidden pt-28 pb-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="absolute top-0 left-1/4 w-[460px] h-[460px] bg-orange-500/20 rounded-full blur-[110px]" />
        <div className="absolute bottom-0 right-1/4 w-[360px] h-[360px] bg-yellow-500/15 rounded-full blur-[90px]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container-main relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-orange-500/20 to-yellow-500/20 border border-orange-500/30 text-orange-300 font-medium text-sm mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500" />
              </span>
              Early bird presale access
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-5 leading-tight">
              Get BLAZE tokens at <span className="text-gradient-brand">{presaleDiscount}% off</span>
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl mx-auto mb-9">
              Fixed presale price of ${presalePrice.toFixed(6)} per token. Early supporters get bonus tokens and priority access.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
              <a href="#commitment" className="btn-brand inline-flex items-center justify-center gap-2 px-8 py-4 text-lg shadow-lg shadow-orange-500/30">
                Reserve my spot
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/whitepaper"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 text-lg font-semibold rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/15 transition-colors"
              >
                Read whitepaper
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-4xl mx-auto">
              <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur p-5">
                <div className="text-sm text-gray-300 mb-1">Presale price</div>
                <div className="text-3xl font-bold text-white">${presalePrice.toFixed(6)}</div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur p-5">
                <div className="text-sm text-gray-300 mb-1">Launch price</div>
                <div className="text-3xl font-bold text-white">${launchPrice.toFixed(2)}</div>
              </div>
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 backdrop-blur p-5">
                <div className="text-sm text-emerald-200 mb-1">Discount</div>
                <div className="text-3xl font-bold text-emerald-300">{presaleDiscount}%</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-gray-400 mt-8">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Intent only
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Minimum $100
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                No upfront payment
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white border-t border-gray-100">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card card-hover p-6">
              <div className="icon-box bg-emerald-100 mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">No upfront payment</h3>
              <p className="text-gray-600">Register intent first, complete purchase when the presale goes live.</p>
                      </div>
            <div className="card card-hover p-6">
              <div className="icon-box bg-orange-100 mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Referral rewards</h3>
              <p className="text-gray-600">Invite friends and climb the leaderboard for extra token bonuses.</p>
                </div>
            <div className="card card-hover p-6">
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
      <section className="py-16 bg-gray-50 border-t border-gray-100">
        <div className="container-main">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-medium text-sm mb-4">
                <Zap className="w-4 h-4" />
                Presale countdown
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                Time left until launch
              </h2>
              <p className="text-gray-600">
                Keep track of the exact start time while you register your payment intent.
              </p>
            </div>
            <PresaleCountdown />
          </div>
        </div>
      </section>
      <CommitmentForm />
      <Leaderboard />

      <section className="py-20 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-medium text-sm mb-5">
                <Zap className="w-4 h-4" />
                Presale FAQ
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Frequently asked questions</h2>
              <p className="text-gray-600">Everything about intent registration and presale access.</p>
            </div>
            <div className="space-y-4">
              {faqs.map(([question, answer]) => (
                <div key={question} className="card card-hover p-6">
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

