import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { PRODUCT_STATUS, PRODUCT_UPDATES } from '@/lib/product-updates';
import { Activity, Clock3, Tag } from 'lucide-react';

export default function UpdatesPage() {
  return (
    <main className="min-h-screen bg-white">
      <a href="#main-content" className="skip-to-content">
        Skip to main content
      </a>
      <Navbar />
      <div id="main-content" className="sr-only">
        Main content
      </div>

      <section className="pt-28 pb-16 bg-gray-50 border-b border-gray-100">
        <div className="container-main">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-100 text-emerald-700 font-medium text-sm mb-5">
              <Activity className="w-4 h-4" />
              Product updates
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Release updates & sync log
            </h1>
            <p className="text-lg text-gray-600">
              Transparent changelog of wallet/website alignment work, feature updates, and reliability improvements.
            </p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container-main">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {PRODUCT_STATUS.map((item) => (
              <div key={item.label} className="card p-4">
                <div className="text-xs text-gray-500 mb-1">{item.label}</div>
                <div className="text-xl font-bold text-gray-900">{item.value}</div>
                <div className="text-xs text-gray-600 mt-1">{item.helper}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4">
            {PRODUCT_UPDATES.map((update) => (
              <article key={`${update.date}-${update.title}`} className="card p-6">
                <div className="flex flex-wrap items-center gap-3 mb-3">
                  <div className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                    <Clock3 className="w-4 h-4" />
                    {update.date}
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">{update.title}</h2>
                <p className="text-gray-600 mb-4">{update.summary}</p>
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}


