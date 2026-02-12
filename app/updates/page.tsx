import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PRODUCT_STATUS } from '@/lib/product-updates';
import { getWalletCommitsPageUrl, getWalletReleaseBranch, getWalletUpdates } from '@/lib/wallet-updates-server';
import { Activity, Clock3, ExternalLink, Tag } from 'lucide-react';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function UpdatesPage() {
  const releaseBranch = getWalletReleaseBranch();
  const commitsPageUrl = getWalletCommitsPageUrl();
  const { updates: walletUpdates, source } = await getWalletUpdates(12);
  const statusCards = PRODUCT_STATUS.map((item) =>
    item.label === 'Latest wallet update'
      ? {
          ...item,
          value: walletUpdates[0]?.date || 'Unknown',
          helper:
            source === 'github'
              ? 'Resolved from live wallet commit feed'
              : 'Showing fallback snapshot due temporary API issue',
        }
      : item
  );

  return (
    <main className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Navbar />
      <div id="main-content" className="sr-only">
        Main content
      </div>

      <section className="relative overflow-hidden pt-24 md:pt-28 pb-12 md:pb-16 section-gradient-warm border-b border-gray-100">
        <div className="absolute inset-0 opacity-[0.08]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.9'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
        <div className="container-main">
          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium text-sm mb-5">
              <Activity className="w-4 h-4" />
              Wallet release updates
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Wallet release updates & sync log
            </h1>
            <p className="text-lg text-gray-600">
              Transparent changelog sourced from the `BlazeWallet21-10` repository commit history.
            </p>
            <p className="text-sm text-gray-500 mt-3">
              Feed source: {source === 'github' ? 'Live GitHub API' : 'Fallback snapshot'}
            </p>
            <p className="text-sm text-gray-500 mt-1">
              Tracking branch: <span className="font-semibold text-gray-700">{releaseBranch}</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 mt-7 sm:mt-8 max-w-sm sm:max-w-none">
              <Link href="/" className="btn-secondary px-5 py-2.5 text-center">Back to homepage</Link>
              <Link href="/presale" className="btn-brand px-5 py-2.5 text-center">Open presale</Link>
              <a
                href={commitsPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary px-5 py-2.5 text-center inline-flex items-center justify-center gap-2"
              >
                Wallet commits
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10 md:py-12 bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-10 md:mb-12">
            {statusCards.map((item) => (
              <div key={item.label} className="card p-4">
                <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                <div className="text-xl font-bold text-gray-900">{item.value}</div>
                <div className="text-xs text-gray-600 mt-1">{item.helper}</div>
              </div>
            ))}
          </div>

          <div className="space-y-3 md:space-y-4">
            {walletUpdates.map((update) => (
              <article key={`${update.date}-${update.title}`} className="card p-5 md:p-7">
                <div className="flex gap-4">
                  <div className="hidden sm:flex flex-col items-center pt-1">
                    <span className="w-3 h-3 rounded-full bg-orange-500" />
                    <span className="w-px flex-1 bg-gray-200 mt-2" />
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                        <Clock3 className="w-4 h-4" />
                        {update.date}
                      </div>
                      {update.commitHash && update.commitUrl && (
                        <a
                          href={update.commitUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-orange-700 bg-orange-100 rounded-full px-2.5 py-1 hover:bg-orange-200 transition-colors"
                        >
                          {update.commitHash}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-2">{update.title}</h2>
                    <p className="text-sm md:text-base text-gray-600 mb-4">{update.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {update.tags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium bg-gray-100 text-gray-700"
                        >
                          <Tag className="w-3 h-3" />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


