'use client';

import { Twitter, Send, Github, Mail, MapPin, Target, Heart } from 'lucide-react';
import Image from 'next/image';
import { useAnimateOnce } from '@/hooks/useAnimateOnce';

export default function AboutSection() {
  const [sectionRef, isVisible] = useAnimateOnce<HTMLElement>();

  return (
    <section id="about" ref={sectionRef} className="py-20 lg:py-28 bg-white">
      <div className="container-main">
        <div className="max-w-4xl mx-auto">
          <div className={`card p-8 md:p-12 animate-entrance ${isVisible ? 'is-visible' : ''}`}>
            <div className="flex flex-col items-center text-center">
              {/* Logo */}
              <div className="mb-6">
                <Image 
                  src="/blaze-logo.png" 
                  alt="BLAZE" 
                  width={120} 
                  height={120} 
                  className="rounded-2xl"
                />
              </div>

              {/* Header */}
              <div className="flex items-center gap-2 justify-center mb-2">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                  Hi! We are BLAZE
                </h2>
              </div>
              <p className="text-sky-600 font-medium mb-6">
                Building the future of crypto payments
              </p>

              {/* Mission */}
              <div className="max-w-2xl mb-8">
                <p className="text-gray-600 leading-relaxed mb-4">
                  We started BLAZE because we believe crypto should be simple for everyone. 
                  For too long, complex wallets have scared people away from the benefits of 
                  decentralized finance. We're changing that with AI-powered features that make 
                  managing your crypto as easy as using any other app on your phone.
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Our mission is to bring the next billion users to crypto by removing 
                  the complexity and fear. No more confusing interfaces, no more worrying 
                  about scams – just simple, secure, intelligent crypto management that 
                  you can use every day, everywhere.
                </p>
              </div>

              {/* Values */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full mb-8">
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Target className="w-5 h-5 text-orange-600" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">Our mission</div>
                  <div className="text-sm text-gray-600">Make crypto accessible to everyone</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-sky-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <Heart className="w-5 h-5 text-sky-600" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">Our values</div>
                  <div className="text-sm text-gray-600">Security, simplicity, transparency</div>
                </div>
                <div className="p-4 bg-gray-50 rounded-xl">
                  <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                    <MapPin className="w-5 h-5 text-emerald-600" />
                  </div>
                  <div className="font-semibold text-gray-900 mb-1">Based in</div>
                  <div className="text-sm text-gray-600">Groningen, Netherlands</div>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-3 justify-center mb-8">
                <a
                  href="https://twitter.com/blazewallet_io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Twitter className="w-5 h-5 text-gray-600" />
                </a>
                <a
                  href="https://t.me/blazewallet_io"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Send className="w-5 h-5 text-gray-600" />
                </a>
                <a
                  href="https://github.com/blazewalletio"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Github className="w-5 h-5 text-gray-600" />
                </a>
                <a
                  href="mailto:info@blazewallet.io"
                  className="w-10 h-10 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                >
                  <Mail className="w-5 h-5 text-gray-600" />
                </a>
              </div>
            </div>

            {/* Company info */}
            <div className="pt-8 border-t border-gray-100">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-sm text-gray-500 mb-1">Founded</div>
                  <div className="font-bold text-gray-900">2024</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">KvK number</div>
                  <div className="font-bold text-gray-900">88929280</div>
                </div>
                <div>
                  <div className="text-sm text-gray-500 mb-1">Contact</div>
                  <div className="font-bold text-gray-900">info@blazewallet.io</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
