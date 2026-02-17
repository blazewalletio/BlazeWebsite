'use client';

export type AttributionSnapshot = {
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_content?: string;
  utm_term?: string;
  twclid?: string;
  landing_path?: string;
  referrer?: string;
  captured_at?: string;
};

type StoredAttribution = {
  firstTouch?: AttributionSnapshot;
  lastTouch?: AttributionSnapshot;
};

type TrackOptions = {
  xEventName?: string;
  value?: number;
  currency?: string;
  metaEventName?: string;
  metaPayload?: Record<string, unknown>;
};

declare global {
  interface Window {
    twq?: (...args: any[]) => void;
    fbq?: (...args: any[]) => void;
  }
}

const CONSENT_KEY = 'cookie_consent';
const ATTRIBUTION_KEY = 'blaze_attribution_v1';
const VISITOR_ID_KEY = 'blaze_visitor_id_v1';
const X_LEAD_EVENT_ID = process.env.NEXT_PUBLIC_X_LEAD_EVENT_ID || '';
const X_SIGNUP_EVENT_ID = process.env.NEXT_PUBLIC_X_SIGNUP_EVENT_ID || '';

function isXDebugEnabled() {
  if (typeof window === 'undefined') return false;
  try {
    return new URLSearchParams(window.location.search).has('debug_x');
  } catch {
    return false;
  }
}

function isMetaDebugEnabled() {
  if (typeof window === 'undefined') return false;
  try {
    return new URLSearchParams(window.location.search).has('debug_meta');
  } catch {
    return false;
  }
}

function logXLead(status: string, details?: Record<string, unknown>) {
  // Keep this always-on for Lead debugging; conversions are rare and this helps verify tracking in production.
  // eslint-disable-next-line no-console
  console.info(`[X Pixel][Lead] ${status}`, details || {});
}

function logXEvent(status: string, details?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  if (!isXDebugEnabled()) return;
  // eslint-disable-next-line no-console
  console.info(`[X Pixel] ${status}`, details || {});
}

function logMetaEvent(status: string, details?: Record<string, unknown>) {
  if (typeof window === 'undefined') return;
  if (!isMetaDebugEnabled()) return;
  // eslint-disable-next-line no-console
  console.info(`[Meta Pixel] ${status}`, details || {});
}

function getCookieConsent() {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(CONSENT_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function hasAnalyticsConsent() {
  const consent = getCookieConsent();
  return Boolean(consent?.analytics);
}

export function ensureVisitorId() {
  if (typeof window === 'undefined') return '';
  const existing = window.localStorage.getItem(VISITOR_ID_KEY);
  if (existing) return existing;
  const generated =
    typeof window.crypto?.randomUUID === 'function'
      ? window.crypto.randomUUID()
      : `${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
  window.localStorage.setItem(VISITOR_ID_KEY, generated);
  return generated;
}

export function getVisitorId() {
  if (typeof window === 'undefined') return '';
  return window.localStorage.getItem(VISITOR_ID_KEY) || '';
}

function parseAttributionFromUrl(url: URL): AttributionSnapshot {
  const p = url.searchParams;
  const snapshot: AttributionSnapshot = {
    utm_source: p.get('utm_source') || undefined,
    utm_medium: p.get('utm_medium') || undefined,
    utm_campaign: p.get('utm_campaign') || undefined,
    utm_content: p.get('utm_content') || undefined,
    utm_term: p.get('utm_term') || undefined,
    twclid: p.get('twclid') || undefined,
  };
  const hasCampaignData =
    snapshot.utm_source ||
    snapshot.utm_medium ||
    snapshot.utm_campaign ||
    snapshot.utm_content ||
    snapshot.utm_term ||
    snapshot.twclid;

  if (!hasCampaignData) {
    return {};
  }

  return {
    ...snapshot,
    landing_path: `${url.pathname}${url.search}`,
    referrer: typeof document !== 'undefined' ? document.referrer || undefined : undefined,
    captured_at: new Date().toISOString(),
  };
}

export function getStoredAttribution(): StoredAttribution {
  if (typeof window === 'undefined') return {};
  const raw = window.localStorage.getItem(ATTRIBUTION_KEY);
  if (!raw) return {};
  try {
    return JSON.parse(raw) as StoredAttribution;
  } catch {
    return {};
  }
}

export function captureAttributionFromCurrentUrl() {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  const newSnapshot = parseAttributionFromUrl(url);
  const hasAnyData = Object.keys(newSnapshot).length > 0;
  if (!hasAnyData) return;

  const existing = getStoredAttribution();
  const next: StoredAttribution = {
    firstTouch: existing.firstTouch || newSnapshot,
    lastTouch: newSnapshot,
  };
  window.localStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(next));
}

export function initializeAttribution() {
  if (typeof window === 'undefined') return;
  ensureVisitorId();
  captureAttributionFromCurrentUrl();
}

export function getAttributionSnapshot(): AttributionSnapshot {
  const stored = getStoredAttribution();
  return stored.lastTouch || stored.firstTouch || {};
}

export function buildTrackedWalletLaunchUrl(baseUrl: string, sourceContext: string) {
  const target = new URL(baseUrl);
  const attribution = getAttributionSnapshot();
  const visitorId = ensureVisitorId();

  target.searchParams.set('bw_vid', visitorId);
  target.searchParams.set('bw_src', sourceContext);

  target.searchParams.set('utm_source', attribution.utm_source || 'website');
  target.searchParams.set('utm_medium', attribution.utm_medium || 'referral');
  target.searchParams.set('utm_campaign', attribution.utm_campaign || 'wallet_launch');
  target.searchParams.set('utm_content', sourceContext);

  if (attribution.utm_term) target.searchParams.set('utm_term', attribution.utm_term);
  if (attribution.twclid) target.searchParams.set('twclid', attribution.twclid);

  return target.toString();
}

export async function trackMarketingEvent(
  eventName: string,
  payload: Record<string, unknown> = {},
  options: TrackOptions = {}
) {
  if (typeof window === 'undefined') return;
  const attribution = getAttributionSnapshot();
  const visitorId = ensureVisitorId();

  const body = {
    eventName,
    payload,
    visitorId,
    pagePath: window.location.pathname,
    pageUrl: window.location.href,
    referrer: document.referrer || null,
    attribution,
    xEventName: options.xEventName,
    value: options.value,
    currency: options.currency,
  };

  try {
    await fetch('/api/analytics/events', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
      keepalive: true,
    });
  } catch (error) {
    console.error('Failed to store marketing event:', error);
  }

  if (options.metaEventName && !hasAnalyticsConsent()) {
    logMetaEvent('SKIPPED: no analytics consent', {
      eventName,
      metaEventName: options.metaEventName,
      value: typeof options.value === 'number' ? options.value : undefined,
      currency: options.currency,
    });
    return;
  }

  if (options.metaEventName && hasAnalyticsConsent()) {
    // Keep Meta payload minimal; unknown keys can reduce match quality.
    const metaPayload: Record<string, unknown> = { ...(options.metaPayload || {}) };
    if (typeof options.value === 'number') metaPayload.value = options.value;
    if (options.currency) metaPayload.currency = options.currency;

    const sendMetaEvent = (attempt = 0) => {
      if (typeof window.fbq === 'function') {
        try {
          window.fbq('track', options.metaEventName as string, metaPayload);
          logMetaEvent('SENT', { eventName, metaEventName: options.metaEventName, ...metaPayload });
        } catch (error) {
          console.error('Failed to send Meta pixel event:', error);
          logMetaEvent('ERROR while sending (see console error above)', {
            eventName,
            metaEventName: options.metaEventName,
            ...metaPayload,
          });
        }
        return;
      }

      if (attempt < 15) {
        window.setTimeout(() => sendMetaEvent(attempt + 1), 200);
      } else {
        console.warn(`Meta pixel not ready, skipped event: ${options.metaEventName}`);
        logMetaEvent('SKIPPED: pixel not ready after retries', {
          eventName,
          metaEventName: options.metaEventName,
          ...metaPayload,
        });
      }
    };

    sendMetaEvent();
  }

  if (options.xEventName && !hasAnalyticsConsent()) {
    if (options.xEventName === 'Lead') {
      logXLead('SKIPPED: no analytics consent (accept cookies to enable pixel)', {
        eventName,
        value: typeof options.value === 'number' ? options.value : undefined,
        currency: options.currency,
      });
    }
    return;
  }

  if (options.xEventName && hasAnalyticsConsent()) {
    // Keep X payload minimal: sending unknown keys can cause events to be dropped.
    const xPayload: Record<string, unknown> = {};
    if (typeof options.value === 'number') {
      // X pixel supports legacy params (tw_sale_amount / tw_order_quantity). Setting them explicitly makes
      // the resulting `adsct` request easier to verify in DevTools (you'll see tw_sale_amount=<value>).
      xPayload.value = options.value;
      xPayload.tw_sale_amount = options.value;
      xPayload.tw_order_quantity = 1;
    }
    if (options.currency) xPayload.currency = options.currency;

    // Retry briefly to avoid losing conversions when pixel bootstrap is still initializing.
    const sendXEvent = (attempt = 0) => {
      if (typeof window.twq === 'function') {
        try {
          window.twq('track', options.xEventName as string, xPayload);
          if (options.xEventName === 'Lead') {
            logXLead('SENT', { eventName, ...xPayload });
          } else {
            logXEvent('track', { xEventName: options.xEventName, ...xPayload });
          }

          // Important: X "conversion events" created in Events Manager have an event id like `tw-...-...`.
          // Those only become Active when you call `twq('event', '<event-id>', ...)`.
          if (options.xEventName === 'Lead' && X_LEAD_EVENT_ID) {
            window.twq('event', X_LEAD_EVENT_ID, xPayload);
            logXEvent('event (lead tracker)', { id: X_LEAD_EVENT_ID, ...xPayload });
          }
          if (options.xEventName === 'SignUp' && X_SIGNUP_EVENT_ID) {
            window.twq('event', X_SIGNUP_EVENT_ID, xPayload);
            logXEvent('event (signup tracker)', { id: X_SIGNUP_EVENT_ID, ...xPayload });
          }
        } catch (error) {
          console.error('Failed to send X pixel event:', error);
          if (options.xEventName === 'Lead') {
            logXLead('ERROR while sending (see console error above)', { eventName, ...xPayload });
          }
        }
        return;
      }

      if (attempt < 15) {
        window.setTimeout(() => sendXEvent(attempt + 1), 200);
      } else {
        console.warn(`X pixel not ready, skipped event: ${options.xEventName}`);
        if (options.xEventName === 'Lead') {
          logXLead('SKIPPED: pixel not ready after retries', { eventName, ...xPayload });
        }
      }
    };

    sendXEvent();
  }
}

export function trackPresaleIntentRegistered(data: {
  amountUsd: number;
  tierName: string;
  bonusPercentage: number;
}) {
  return trackMarketingEvent('presale_intent_registered', data, {
    xEventName: 'Lead',
    metaEventName: 'Lead',
    metaPayload: {
      content_name: 'BLAZE Presale',
      content_category: 'presale',
    },
    value: data.amountUsd,
    currency: 'USD',
  });
}

export function trackWalletLaunchClick(sourceContext: string) {
  return trackMarketingEvent('wallet_launch_click', { sourceContext });
}

export function trackSupportContactSubmitted(data: { subject?: string | null }) {
  return trackMarketingEvent(
    'support_contact_submitted',
    { subject: data.subject || null },
    {
      metaEventName: 'Contact',
      metaPayload: {
        content_category: 'support',
      },
    }
  );
}


