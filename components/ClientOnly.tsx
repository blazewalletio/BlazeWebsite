'use client';

import { useState, useEffect, ReactNode } from 'react';

interface ClientOnlyProps {
  children: ReactNode;
  fallback?: ReactNode;
}

/**
 * ClientOnly component - renders children only after hydration is complete.
 * This prevents hydration mismatches caused by:
 * - Browser extensions modifying the DOM
 * - Third-party scripts injecting content
 * - Time/date-sensitive content
 * - localStorage-dependent rendering
 */
export default function ClientOnly({ children, fallback = null }: ClientOnlyProps) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return fallback;
  }

  return <>{children}</>;
}

