'use client';

import { useEffect, useMemo, useState } from 'react';
import { usePathname } from 'next/navigation';
import { hasAnalyticsConsent } from '@/lib/analytics/client';

declare global {
  interface Window {
    fbq?: (...args: any[]) => void;
    _fbq?: (...args: any[]) => void;
    __blazeMetaPixelInitialized?: boolean;
  }
}

const META_PIXEL_SRC = 'https://connect.facebook.net/en_US/fbevents.js';

export default function MetaPixelManager() {
  const pathname = usePathname();
  const pixelId = useMemo(
    () => process.env.NEXT_PUBLIC_META_PIXEL_ID || '1271131718247007',
    []
  );
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
    if (!pixelId || !canTrack || window.__blazeMetaPixelInitialized) return;

    // Standard Meta Pixel bootstrap snippet (slightly adapted for Next/TS).
    ((f: any, b: Document, e: string, v: string, n?: any, t?: any, s?: any) => {
      if (f.fbq) return;
      n = (f.fbq = function () {
        // eslint-disable-next-line prefer-rest-params
        n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
      });
      if (!f._fbq) f._fbq = n;
      n.push = n;
      n.loaded = true;
      n.version = '2.0';
      n.queue = [];
      t = b.createElement(e) as HTMLScriptElement;
      t.async = true;
      t.src = v;
      s = b.getElementsByTagName(e)[0] as HTMLScriptElement;
      s.parentNode?.insertBefore(t, s);
    })(window, document, 'script', META_PIXEL_SRC);

    window.fbq?.('init', pixelId);
    window.fbq?.('track', 'PageView');
    window.__blazeMetaPixelInitialized = true;
  }, [pixelId, canTrack]);

  useEffect(() => {
    if (!canTrack || !window.__blazeMetaPixelInitialized) return;
    // Next.js App Router navigations do not reload the page; fire PageView on route changes.
    window.fbq?.('track', 'PageView');
  }, [pathname, canTrack]);

  return null;
}


