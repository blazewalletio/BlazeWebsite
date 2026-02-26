'use client';

import { ChevronDown, HelpCircle } from 'lucide-react';
import { useState } from 'react';
import { useAnimateOnce } from '@/hooks/useAnimateOnce';
import { SEO_FAQS } from '@/lib/seo/content';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [sectionRef, isVisible] = useAnimateOnce<HTMLElement>();

  return (
    <section id="faq" ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="container-main">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className={`text-center mb-12 animate-entrance ${isVisible ? 'is-visible' : ''}`}>
            <div className="icon-box-lg bg-gray-100 mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-gray-600" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Frequently asked <span className="text-gradient-brand">questions</span>
            </h2>
            <p className="text-lg text-gray-600">
              Everything you need to know about BLAZE Wallet.
            </p>
          </div>

          {/* FAQ list */}
          <div className="space-y-3">
            {SEO_FAQS.map((faq, index) => (
              <div 
                key={index} 
                className={`card overflow-hidden animate-entrance delay-${Math.min(index + 1, 4)} ${isVisible ? 'is-visible' : ''}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left hover:bg-gray-50 transition-colors"
                  aria-expanded={openIndex === index}
                >
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openIndex === index 
                      ? 'bg-gray-900 rotate-180' 
                      : 'bg-gray-100'
                  }`}>
                    <ChevronDown
                      className={`w-5 h-5 transition-colors ${
                        openIndex === index ? 'text-white' : 'text-gray-500'
                      }`}
                    />
                  </div>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                >
                  <div className="px-6 pb-6 text-gray-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
