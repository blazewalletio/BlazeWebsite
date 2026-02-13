'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { initializeAttribution, trackMarketingEvent } from '@/lib/analytics/client';

export default function AnalyticsBootstrap() {
  const pathname = usePathname();

  useEffect(() => {
    initializeAttribution();
  }, []);

  useEffect(() => {
    initializeAttribution();
    trackMarketingEvent('page_view', {
      path: pathname,
      query: typeof window !== 'undefined' ? window.location.search || null : null,
    });
  }, [pathname]);

  return null;
}


