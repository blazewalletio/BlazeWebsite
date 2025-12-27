'use client';

import { useEffect, useId, useState, ReactNode } from 'react';

interface HydrationDebugProps {
  name: string;
  children: ReactNode;
}

// This component wraps children and logs hydration info
export function HydrationDebug({ name, children }: HydrationDebugProps) {
  const id = useId();
  const [hydrated, setHydrated] = useState(false);
  
  // Log on initial render (server-side in theory, but this is a client component)
  console.log(`[Hydration] ${name}: Initial render, hydrated=${hydrated}, id=${id}`);
  
  useEffect(() => {
    console.log(`[Hydration] ${name}: useEffect running (client-side), id=${id}`);
    setHydrated(true);
    
    // Check for common hydration issues
    const checkElement = document.querySelector(`[data-hydration-debug="${id}"]`);
    if (checkElement) {
      console.log(`[Hydration] ${name}: DOM element found, innerHTML length=${checkElement.innerHTML.length}`);
    }
  }, [name, id]);

  return (
    <div data-hydration-debug={id} data-component-name={name}>
      {children}
    </div>
  );
}

// Global hydration error catcher - add to layout
export function HydrationErrorCatcher() {
  useEffect(() => {
    console.log('[Hydration] HydrationErrorCatcher mounted');
    
    // Override console.error to catch hydration errors
    const originalError = console.error;
    console.error = (...args: unknown[]) => {
      const message = args[0];
      if (typeof message === 'string') {
        if (message.includes('Hydration') || 
            message.includes('hydrat') || 
            message.includes('server') ||
            message.includes('client') ||
            message.includes('mismatch') ||
            message.includes('#418') ||
            message.includes('#423') ||
            message.includes('#425')) {
          console.log('[Hydration ERROR CAUGHT]:', message);
          console.log('[Hydration ERROR STACK]:', new Error().stack);
          
          // Try to find which component caused it
          const debugElements = document.querySelectorAll('[data-hydration-debug]');
          console.log('[Hydration] Debug components on page:', 
            Array.from(debugElements).map(el => el.getAttribute('data-component-name'))
          );
        }
      }
      originalError.apply(console, args);
    };

    // Also catch unhandled errors
    const handleError = (event: ErrorEvent) => {
      if (event.message.includes('Hydration') || 
          event.message.includes('#418') ||
          event.message.includes('#423') ||
          event.message.includes('#425')) {
        console.log('[Hydration WINDOW ERROR]:', event.message);
        console.log('[Hydration WINDOW ERROR LOCATION]:', event.filename, event.lineno, event.colno);
      }
    };

    window.addEventListener('error', handleError);

    return () => {
      console.error = originalError;
      window.removeEventListener('error', handleError);
    };
  }, []);

  return null;
}

// Quick checker for specific issues
export function checkForHydrationIssues() {
  console.log('[Hydration Check] Starting hydration issue check...');
  
  // Check for Math.random usage
  const originalRandom = Math.random;
  let randomCalls = 0;
  Math.random = function() {
    randomCalls++;
    console.warn('[Hydration Check] Math.random() called! This can cause hydration mismatches.');
    console.trace();
    return originalRandom();
  };
  
  // Check for Date.now during render
  const originalDateNow = Date.now;
  let dateNowCalls = 0;
  Date.now = function() {
    dateNowCalls++;
    // Only warn if called outside of useEffect/event handlers
    if (document.readyState !== 'complete') {
      console.warn('[Hydration Check] Date.now() called during render! This can cause hydration mismatches.');
      console.trace();
    }
    return originalDateNow();
  };

  // Restore after initial render
  setTimeout(() => {
    Math.random = originalRandom;
    Date.now = originalDateNow;
    console.log(`[Hydration Check] Complete. Math.random calls: ${randomCalls}, Date.now calls: ${dateNowCalls}`);
  }, 5000);
}

