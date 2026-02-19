'use client';

import { useMemo, useState } from 'react';
import { Copy, Check, ExternalLink, QrCode } from 'lucide-react';

type DonationAddressCardProps = {
  title: string;
  networkLabel: string;
  address: string | null | undefined;
  uriPrefix: 'bitcoin' | 'ethereum';
  note?: string;
};

function buildWalletUri(uriPrefix: 'bitcoin' | 'ethereum', address: string) {
  // Keep it simple (no amount/message). Wallet support varies across platforms.
  return `${uriPrefix}:${address}`;
}

export default function DonationAddressCard({
  title,
  networkLabel,
  address,
  uriPrefix,
  note,
}: DonationAddressCardProps) {
  const [copied, setCopied] = useState(false);
  const normalizedAddress = useMemo(() => (address || '').trim(), [address]);
  const canShow = normalizedAddress.length > 0;

  const walletUri = useMemo(() => {
    if (!canShow) return null;
    return buildWalletUri(uriPrefix, normalizedAddress);
  }, [canShow, uriPrefix, normalizedAddress]);

  const qrUrl = useMemo(() => {
    if (!canShow) return null;
    // External QR generator; address is public info.
    return `https://quickchart.io/qr?text=${encodeURIComponent(normalizedAddress)}&size=220`;
  }, [canShow, normalizedAddress]);

  const handleCopy = async () => {
    if (!canShow) return;
    try {
      await navigator.clipboard.writeText(normalizedAddress);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1200);
    } catch {
      // Fallback: do nothing; user can still select/copy manually.
    }
  };

  return (
    <div className="card p-6 sm:p-7 border border-gray-200">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold text-orange-600 mb-2">{networkLabel}</div>
          <h3 className="text-xl font-bold text-gray-900">{title}</h3>
          {note ? <p className="text-sm text-gray-600 mt-2">{note}</p> : null}
        </div>

        <button
          type="button"
          onClick={handleCopy}
          disabled={!canShow}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span className="text-sm font-semibold">{copied ? 'Copied' : 'Copy'}</span>
        </button>
      </div>

      <div className="mt-5">
        {canShow ? (
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 font-mono text-sm text-gray-900 break-all">
            {normalizedAddress}
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-900">
            Donation address not configured yet.
          </div>
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {walletUri ? (
          <a
            href={walletUri}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold"
          >
            Open in wallet <ExternalLink className="w-4 h-4" />
          </a>
        ) : null}

        {qrUrl ? (
          <details className="group">
            <summary className="cursor-pointer list-none inline-flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 text-gray-700 hover:bg-gray-50">
              <QrCode className="w-4 h-4" />
              <span className="text-sm font-semibold">Show QR</span>
            </summary>
            <div className="mt-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={qrUrl}
                alt={`${title} donation QR`}
                className="w-[220px] h-[220px] rounded-xl border border-gray-200 bg-white"
                loading="lazy"
              />
              <p className="text-xs text-gray-500 mt-2">
                Always double-check the address before sending.
              </p>
            </div>
          </details>
        ) : null}
      </div>
    </div>
  );
}


