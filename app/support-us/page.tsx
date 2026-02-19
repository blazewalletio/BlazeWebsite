import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import DonationAddressCard from '@/components/DonationAddressCard';
import Link from 'next/link';
import { HeartHandshake, Shield, Sparkles, ArrowRight } from 'lucide-react';

export const metadata = {
  title: 'Support BLAZE',
  description:
    'Optional donations help fund infrastructure, security, and continued development of BLAZE Wallet.',
};

export default function SupportUsPage() {
  // Public donation addresses; can be overridden via env vars for flexibility.
  const btcAddress =
    process.env.NEXT_PUBLIC_DONATION_BTC_ADDRESS || 'bc1qj256llkdxgg7ersgx3mxjwz3mgdth8jcrmk6gm';
  const ethAddress =
    process.env.NEXT_PUBLIC_DONATION_ETH_ADDRESS || '0x3e1F7a94bB62b76CC52CE075b627c2730C2e0124';
  const solAddress =
    process.env.NEXT_PUBLIC_DONATION_SOL_ADDRESS || 'Cx5XppzCtAVDUmmJggayZGfNTy97X3FfYcyiW9g8N1eo';

  return (
    <main className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>

      <Navbar />

      <div id="main-content" className="sr-only">
        Main content
      </div>

      {/* Hero */}
      <section className="pt-32 pb-14 sm:pb-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[460px] h-[460px] bg-orange-500/20 rounded-full blur-[110px]" />
        <div className="absolute bottom-0 right-1/4 w-[360px] h-[360px] bg-yellow-500/15 rounded-full blur-[90px]" />

        <div className="container-main relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/15 text-white/90 font-medium text-sm mb-6">
              <HeartHandshake className="w-4 h-4 text-orange-300" />
              Optional support
            </div>

            <h1 className="text-3xl sm:text-5xl font-bold text-white mb-4 tracking-tight">
              Support BLAZE
            </h1>

            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto">
              BLAZE is built by a small team with a big mission: make crypto payments safer and genuinely usable.
              If you&apos;d like to support ongoing development, you can donate in Bitcoin or Ethereum.
              It&apos;s completely optional — but sincerely appreciated.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
              <a href="#donate" className="btn-brand inline-flex items-center justify-center gap-2 px-8 py-4">
                View donation addresses <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/support"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/15 transition-colors"
              >
                Contact support
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Donation addresses */}
      <section id="donate" className="py-14 sm:py-16 bg-gray-50 border-t border-gray-100">
        <div className="container-main">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-medium text-sm mb-4">
                <Sparkles className="w-4 h-4" />
                Thank you
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">
                Donate in BTC, ETH, or SOL
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                If you choose to donate, please only send funds on the correct network.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <DonationAddressCard
                title="Bitcoin donation address"
                networkLabel="Bitcoin (BTC)"
                address={btcAddress}
                uriPrefix="bitcoin"
                note="Send only BTC on the Bitcoin network to this address."
              />

              <DonationAddressCard
                title="Ethereum donation address"
                networkLabel="Ethereum (ETH)"
                address={ethAddress}
                uriPrefix="ethereum"
                note="Send only ETH on Ethereum mainnet to this address."
              />

              <DonationAddressCard
                title="Solana donation address"
                networkLabel="Solana (SOL)"
                address={solAddress}
                uriPrefix="solana"
                note="Send only SOL on the Solana network to this address."
              />
            </div>

            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="card p-6 border border-gray-200">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-emerald-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">How donations help</h3>
                <p className="text-sm text-gray-600">
                  Donations help cover infrastructure, product development, and future security work.
                </p>
              </div>

              <div className="card p-6 border border-gray-200">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-orange-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Safety first</h3>
                <p className="text-sm text-gray-600">
                  Always double-check the address before sending. We will never ask for your seed phrase.
                </p>
              </div>

              <div className="card p-6 border border-gray-200">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-sky-700" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">Not the only way</h3>
                <p className="text-sm text-gray-600">
                  You can also help by sharing BLAZE, giving feedback, or joining the community.
                </p>
              </div>
            </div>

            <div className="mt-10 card p-6 sm:p-7 border border-gray-200 bg-white">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Other ways to support</h3>
              <p className="text-sm text-gray-600 mb-4">
                Donations are optional. If you prefer, supporting us in other ways is just as valuable.
              </p>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href="https://t.me/ai4ldMZv0KgyN2Y8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  Join Telegram <ArrowRight className="w-4 h-4" />
                </a>
                <a
                  href="https://x.com/blazewallet_io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  Follow on X <ArrowRight className="w-4 h-4" />
                </a>
                <Link href="/support" className="btn-primary inline-flex items-center justify-center gap-2">
                  Send feedback <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                Donations are voluntary and non-refundable. This page does not provide financial or tax advice.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


