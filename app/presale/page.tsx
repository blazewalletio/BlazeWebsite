import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowRight, CheckCircle2, Shield, Users, Zap, Coins, Flame, Wallet, CreditCard, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { PRESALE_CONSTANTS } from '@/lib/presale-constants';
import { buildPageMetadata } from '@/lib/seo/metadata';

const CommitmentForm = dynamic(() => import('@/components/CommitmentForm'), { ssr: false });
const PresaleStickyCTA = dynamic(() => import('@/components/PresaleStickyCTA'), { ssr: false });

const WALLET_URL = 'https://my.blazewallet.io';

export const metadata = buildPageMetadata({
  title: 'BLAZE Presale: Buy BLAZE Tokens Now',
  description: `The BLAZE presale is live. Buy $BLAZE at $${PRESALE_CONSTANTS.presalePrice.toFixed(6)} per token (${PRESALE_CONSTANTS.presaleDiscount}% off launch). Create an account at my.blazewallet.io, add funds, and buy in the wallet. Open for everyone from ${PRESALE_CONSTANTS.publicPresaleDateLabel}.`,
  path: '/presale',
  keywords: [
    'BLAZE presale',
    'buy BLAZE tokens',
    'BLAZE token presale',
    'BLAZE Wallet presale',
  ],
});

export default function PresalePage() {
  const presaleDiscount = PRESALE_CONSTANTS.presaleDiscount;
  const launchPrice = PRESALE_CONSTANTS.launchPrice;
  const presalePrice = PRESALE_CONSTANTS.presalePrice;
  const utilityHighlights = [
    '2% cashback on swap, send, and purchase activity in BLAZE Wallet',
    'Staking: 8% APY (flex), 15% (6-month), 20% (1-year)',
    'Fee discounts up to 75% on swaps (based on staked amount)',
    'Governance voting: 1 token = 1 vote',
  ];
  const tokenMechanics = [
    '0.10% burn on every transfer',
    '50% of wallet revenue used for quarterly buyback & burn',
    'Target supply path: 1B to 700M over 10 years',
  ];
  const faqs = [
    ['How do I buy BLAZE tokens?', 'Create an account at my.blazewallet.io, deposit funds (ETH, BTC, USDT or BSC) into your wallet, then open the presale card in the app and complete your purchase. Min $100, max $10,000 per wallet.'],
    ['When can I buy?', 'The presale is live. Registered supporters had 48-hour early access. Everyone can buy from 18 March 2026, 12:00 UTC.'],
    ['What can I pay with?', 'You can pay with ETH, BTC, USDT or via BSC. Add funds to your BLAZE Wallet first, then buy $BLAZE in the presale card.'],
    ['What is the price?', `$${presalePrice.toFixed(6)} per BLAZE token (${presaleDiscount}% off the $0.02 launch price). Bonus tiers give extra tokens for early buyers.`],
    ['Where do I buy?', 'Only in BLAZE Wallet at my.blazewallet.io. We never ask for your seed phrase. Use only official links.'],
  ] as const;

  return (
    <main className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Navbar />

      <section id="main-content" tabIndex={-1} className="relative overflow-hidden pt-24 sm:pt-28 pb-14 sm:pb-20">
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
            <div className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/20 to-orange-500/20 border border-emerald-500/30 text-emerald-300 font-medium text-xs sm:text-sm mb-5 sm:mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              Presale is live
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-5 leading-tight tracking-tight">
              Buy BLAZE tokens at <span className="text-gradient-brand">{presaleDiscount}% off</span>
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-3xl mx-auto mb-4">
              Registered supporters had 48-hour early access. The presale is open for <strong className="text-white">everyone from {PRESALE_CONSTANTS.publicPresaleDateLabel}</strong>. Create your BLAZE Wallet account, add funds, and buy $BLAZE in the wallet.
            </p>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto mb-7 sm:mb-9">
              ${presalePrice.toFixed(6)} per token · Min $100, max $10,000 per wallet · Pay with ETH, BTC, USDT or via BSC
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 sm:mb-10 max-w-md sm:max-w-none mx-auto">
              <a
                href={WALLET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg shadow-lg shadow-orange-500/30"
              >
                Open BLAZE Wallet and buy
                <ArrowRight className="w-5 h-5" />
              </a>
              <Link
                href="/whitepaper"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base sm:text-lg font-semibold rounded-xl border border-white/20 bg-white/10 text-white hover:bg-white/15 transition-colors"
              >
                Read whitepaper
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left max-w-4xl mx-auto">
              <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur p-4 sm:p-5">
                <div className="text-sm text-gray-300 mb-1">Presale price</div>
                <div className="text-2xl sm:text-3xl font-bold text-white">${presalePrice.toFixed(6)}</div>
              </div>
              <div className="rounded-2xl border border-white/15 bg-white/10 backdrop-blur p-4 sm:p-5">
                <div className="text-sm text-gray-300 mb-1">Launch price</div>
                <div className="text-2xl sm:text-3xl font-bold text-white">${launchPrice.toFixed(2)}</div>
              </div>
              <div className="rounded-2xl border border-emerald-400/30 bg-emerald-400/10 backdrop-blur p-4 sm:p-5">
                <div className="text-sm text-emerald-200 mb-1">Discount</div>
                <div className="text-2xl sm:text-3xl font-bold text-emerald-300">{presaleDiscount}%</div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs sm:text-sm text-gray-400 mt-6 sm:mt-8">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Buy in BLAZE Wallet
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Min $100 · Max $10,000
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ETH, BTC, USDT, BSC
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Open for everyone from 18 March
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16 bg-white border-t border-gray-100">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="card card-hover p-5 sm:p-6">
              <div className="icon-box bg-emerald-100 mb-4">
                <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Buy in the wallet</h3>
              <p className="text-gray-600">Create an account at my.blazewallet.io, add funds, then buy $BLAZE via the presale card in the app.</p>
            </div>
            <div className="card card-hover p-5 sm:p-6">
              <div className="icon-box bg-orange-100 mb-4">
                <Users className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Bonus tiers</h3>
              <p className="text-gray-600">Early buyers get extra tokens. First-come, first-served per tier (Founders +100% down to Public).</p>
            </div>
            <div className="card card-hover p-5 sm:p-6">
              <div className="icon-box bg-sky-100 mb-4">
                <Shield className="w-6 h-6 text-sky-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-1">Clear limits</h3>
              <p className="text-gray-600">$100 minimum, $10,000 maximum per wallet. Pay with ETH, BTC, USDT or via BSC.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-14 bg-gray-50 border-t border-gray-100">
        <div className="container-main">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-medium text-sm mb-4">
                <Zap className="w-4 h-4" />
                How to participate
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-900 mb-2">Buy BLAZE in 3 steps</h2>
              <p className="text-sm sm:text-base text-gray-600">
                Create your account, add funds, and buy $BLAZE tokens directly in BLAZE Wallet.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="card p-4 sm:p-5">
                <div className="w-12 h-12 rounded-xl bg-sky-100 flex items-center justify-center mb-3">
                  <Wallet className="w-6 h-6 text-sky-600" />
                </div>
                <div className="text-xs font-semibold text-orange-600 mb-2">STEP 1</div>
                <h3 className="font-bold text-gray-900 mb-1">Create your account</h3>
                <p className="text-sm text-gray-600">Sign up at <a href={WALLET_URL} target="_blank" rel="noopener noreferrer" className="text-orange-600 hover:underline font-medium">my.blazewallet.io</a>. It only takes a minute.</p>
              </div>
              <div className="card p-4 sm:p-5">
                <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center mb-3">
                  <CreditCard className="w-6 h-6 text-emerald-600" />
                </div>
                <div className="text-xs font-semibold text-orange-600 mb-2">STEP 2</div>
                <h3 className="font-bold text-gray-900 mb-1">Add funds to your wallet</h3>
                <p className="text-sm text-gray-600">Deposit ETH, BTC, USDT or use BSC. You need funds in your BLAZE Wallet to buy tokens.</p>
              </div>
              <div className="card p-4 sm:p-5">
                <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-3">
                  <ShoppingBag className="w-6 h-6 text-orange-600" />
                </div>
                <div className="text-xs font-semibold text-orange-600 mb-2">STEP 3</div>
                <h3 className="font-bold text-gray-900 mb-1">Buy BLAZE in the wallet</h3>
                <p className="text-sm text-gray-600">Open the presale card in BLAZE Wallet and complete your purchase. Min $100, max $10,000 per wallet.</p>
              </div>
            </div>
            <div className="text-center mt-8">
              <a
                href={WALLET_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-brand inline-flex items-center justify-center gap-2 px-8 py-4"
              >
                Open BLAZE Wallet and buy
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 sm:py-12 bg-white border-t border-gray-100">
        <div className="container-main">
          <div className="max-w-5xl mx-auto card p-5 sm:p-7 border border-gray-200">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-orange-100 text-orange-700 font-medium text-xs sm:text-sm mb-4">
              <Coins className="w-4 h-4" />
              BLAZE Wallet vs BLAZE Token
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              BLAZE Wallet is the app. BLAZE Token ($BLAZE) powers utility inside it.
            </h2>
            <p className="text-gray-600 mb-6">
              This presale is for BLAZE Token ($BLAZE), the utility token used across the BLAZE Wallet ecosystem.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-5">
              {utilityHighlights.map((item) => (
                <div key={item} className="rounded-xl bg-gray-50 border border-gray-100 p-4 text-sm text-gray-700">
                  {item}
                </div>
              ))}
            </div>
            <div className="rounded-xl bg-orange-50 border border-orange-200 p-4">
              <div className="flex items-center gap-2 font-semibold text-gray-900 mb-2">
                <Flame className="w-4 h-4 text-orange-600" />
                Deflationary model
              </div>
              <ul className="space-y-1 text-sm text-gray-700">
                {tokenMechanics.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <CommitmentForm />

      <section className="py-14 sm:py-20 lg:py-24 bg-gray-50 border-t border-gray-100">
        <div className="container-main">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8 sm:mb-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-sky-100 text-sky-700 font-medium text-sm mb-5">
                <Zap className="w-4 h-4" />
                Presale FAQ
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">Frequently asked questions</h2>
              <p className="text-gray-600">How to buy BLAZE tokens and participate in the presale.</p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              {faqs.map(([question, answer]) => (
                <div key={question} className="card card-hover p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{question}</h3>
                  <p className="text-gray-600">{answer}</p>
                        </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PresaleStickyCTA />
      <Footer />
    </main>
  );
}

