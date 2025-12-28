'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Hook that triggers animation once when element enters viewport
 * Only animates on desktop (1024px+), mobile gets instant display
 */
export function useAnimateOnce<T extends HTMLElement>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Skip on mobile - animations are disabled via CSS anyway
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Once visible, stay visible (no re-triggering)
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold, rootMargin: '0px 0px -50px 0px' }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible] as const;
}

