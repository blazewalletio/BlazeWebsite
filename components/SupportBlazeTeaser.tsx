import Link from 'next/link';
import { HeartHandshake, ArrowRight, ShieldCheck } from 'lucide-react';

export default function SupportBlazeTeaser() {
  return (
    <section className="py-14 sm:py-16 bg-gray-50 border-t border-gray-100">
      <div className="container-main">
        <div className="max-w-5xl mx-auto">
          <div className="card p-6 sm:p-10 border border-gray-200 bg-white">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-100 text-orange-700 font-medium text-sm mb-4">
                  <HeartHandshake className="w-4 h-4" />
                  Optional support
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
                  Want to support BLAZE?
                </h2>
                <p className="text-gray-600">
                  If you&apos;d like to support ongoing development, you can optionally donate in BTC, ETH, or SOL.
                  No pressure — it&apos;s completely optional.
                </p>
                <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  We&apos;ll never ask for your seed phrase.
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                <Link href="/support-us" className="btn-brand inline-flex items-center justify-center gap-2">
                  Support BLAZE <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/support"
                  className="btn-secondary inline-flex items-center justify-center gap-2"
                >
                  Contact support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


