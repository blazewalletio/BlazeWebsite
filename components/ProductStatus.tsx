'use client';

import Link from 'next/link';
import { Activity, ArrowRight } from 'lucide-react';
import { useAnimateOnce } from '@/hooks/useAnimateOnce';
import { PRODUCT_STATUS } from '@/lib/product-updates';

export default function ProductStatus() {
  const [sectionRef, isVisible] = useAnimateOnce<HTMLElement>();

  return (
    <section id="status" ref={sectionRef} className="py-14 bg-white border-b border-gray-100">
      <div className="container-main">
        <div className={`card p-6 md:p-8 animate-entrance ${isVisible ? 'is-visible' : ''}`}>
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-100 text-emerald-700 font-medium text-xs mb-3">
                <Activity className="w-3.5 h-3.5" />
                Product status
              </div>
              <h2 className="text-2xl font-bold text-gray-900">Live build & release snapshot</h2>
              <p className="text-gray-600 text-sm mt-1">
                Public overview of what is currently live and synced.
              </p>
            </div>
            <Link
              href="/updates"
              className="inline-flex items-center gap-2 text-orange-600 font-semibold hover:text-orange-700 transition-colors"
            >
              View release updates
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PRODUCT_STATUS.map((item) => (
              <div key={item.label} className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                <div className="text-xl font-bold text-gray-900">{item.value}</div>
                <div className="text-xs text-gray-600 mt-1">{item.helper}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


