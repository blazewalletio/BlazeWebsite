'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { hasAnalyticsConsent } from '@/lib/analytics/client';

declare global {
  interface Window {
    twq?: (...args: any[]) => void;
    __blazeXPixelInitialized?: boolean;
  }
}

const X_PIXEL_SRC = 'https://static.ads-twitter.com/uwt.js';

export default function XPixelManager() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const pixelId = useMemo(() => process.env.NEXT_PUBLIC_X_PIXEL_ID || 'r51j4', []);
  const [canTrack, setCanTrack] = useState(false);

  useEffect(() => {
    const checkConsent = () => setCanTrack(hasAnalyticsConsent());
    checkConsent();
    window.addEventListener('storage', checkConsent);
    window.addEventListener('cookie-consent-updated', checkConsent as EventListener);
    return () => {
      window.removeEventListener('storage', checkConsent);
      window.removeEventListener('cookie-consent-updated', checkConsent as EventListener);
    };
  }, []);

  useEffect(() => {
    if (!pixelId || !canTrack || window.__blazeXPixelInitialized) return;

    ((e: any, t: Document, n: string, s?: any, u?: HTMLScriptElement, a?: HTMLScriptElement) => {
      if (typeof e.twq === 'function') return;
      s = e.twq = function () {
        // eslint-disable-next-line prefer-rest-params
        if (typeof s.exe === 'function') {
          s.exe.apply(s, arguments);
          return;
        }
        s.queue.push(arguments);
      };
      s.version = '1.1';
      s.queue = [];
      u = t.createElement(n) as HTMLScriptElement;
      u.async = true;
      u.src = X_PIXEL_SRC;
      a = t.getElementsByTagName(n)[0] as HTMLScriptElement;
      a.parentNode?.insertBefore(u, a);
    })(window, document, 'script');

    window.twq?.('config', pixelId);
    window.twq?.('track', 'PageView');
    window.__blazeXPixelInitialized = true;
  }, [pixelId, canTrack]);

  useEffect(() => {
    if (!canTrack || !window.__blazeXPixelInitialized) return;
    window.twq?.('track', 'PageView', {
      path: pathname,
      query: searchParams.toString() || undefined,
    });
  }, [pathname, searchParams, canTrack]);

  return null;
}


