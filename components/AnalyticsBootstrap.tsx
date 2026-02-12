'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { initializeAttribution, trackMarketingEvent } from '@/lib/analytics/client';

export default function AnalyticsBootstrap() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    initializeAttribution();
  }, []);

  useEffect(() => {
    initializeAttribution();
    trackMarketingEvent('page_view', {
      path: pathname,
      query: searchParams.toString() || null,
    });
  }, [pathname, searchParams]);

  return null;
}


