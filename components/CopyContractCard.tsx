'use client';

import { useState } from 'react';
import { Copy, Check, ShieldCheck } from 'lucide-react';
import { BLAZE_TOKEN } from '@/lib/token-constants';

interface CopyContractCardProps {
  variant?: 'dark' | 'light';
}

export default function CopyContractCard({ variant = 'light' }: CopyContractCardProps) {
  const [copied, setCopied] = useState(false);

  const copyContract = async () => {
    try {
      await navigator.clipboard.writeText(BLAZE_TOKEN.contract);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  };

  const isDark = variant === 'dark';

  return (
    <div
      className={`rounded-2xl border p-4 sm:p-5 ${
        isDark ? 'border-white/10 bg-white/5 backdrop-blur-xl' : 'border-gray-200 bg-white'
      }`}
    >
      <div className="flex items-center justify-between gap-2 mb-2">
        <span className={`text-xs sm:text-sm ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
          Official BLAZE contract (BEP-20)
        </span>
        <a
          href={BLAZE_TOKEN.bscScanTokenUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-700 transition-colors"
        >
          <ShieldCheck className="w-3.5 h-3.5" />
          Verified on BscScan
        </a>
      </div>
      <div className="flex items-center gap-2">
        <code
          className={`flex-1 min-w-0 truncate text-xs sm:text-sm font-mono rounded-lg px-3 py-2.5 ${
            isDark ? 'text-white bg-black/30' : 'text-gray-900 bg-gray-100'
          }`}
        >
          {BLAZE_TOKEN.contract}
        </code>
        <button
          type="button"
          onClick={copyContract}
          aria-label="Copy contract address"
          className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
            isDark ? 'bg-white/10 hover:bg-white/20 text-white' : 'bg-gray-900 hover:bg-gray-800 text-white'
          }`}
        >
          {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>
      <p className={`text-[11px] sm:text-xs mt-2 ${isDark ? 'text-gray-500' : 'text-gray-500'}`}>
        Always double-check the address. BLAZE will never DM you or ask for your seed phrase.
      </p>
    </div>
  );
}
