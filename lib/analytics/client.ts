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
};

declare global {
  interface Window {
    twq?: (...args: any[]) => void;
  }
}

const CONSENT_KEY = 'cookie_consent';
const ATTRIBUTION_KEY = 'blaze_attribution_v1';
const VISITOR_ID_KEY = 'blaze_visitor_id_v1';
const X_LEAD_CONVERSION_EVENT_ID =
  process.env.NEXT_PUBLIC_X_LEAD_EVENT_ID || 'tw-r5ij4-r5ij6';

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

  if (options.xEventName && hasAnalyticsConsent()) {
    const xPayload: Record<string, unknown> = { ...payload };
    if (typeof options.value === 'number') xPayload.value = options.value;
    if (options.currency) xPayload.currency = options.currency;

    // Retry briefly to avoid losing conversions when pixel bootstrap is still initializing.
    const sendXEvent = (attempt = 0) => {
      if (typeof window.twq === 'function') {
        try {
          window.twq('track', options.xEventName as string, xPayload);
          // X Ads conversion trackers in Event Manager can require explicit event IDs.
          if (options.xEventName === 'Lead' && X_LEAD_CONVERSION_EVENT_ID) {
            window.twq('event', X_LEAD_CONVERSION_EVENT_ID, xPayload);
          }
        } catch (error) {
          console.error('Failed to send X pixel event:', error);
        }
        return;
      }

      if (attempt < 15) {
        window.setTimeout(() => sendXEvent(attempt + 1), 200);
      } else {
        console.warn(`X pixel not ready, skipped event: ${options.xEventName}`);
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
    value: data.amountUsd,
    currency: 'USD',
  });
}

export function trackWalletLaunchClick(sourceContext: string) {
  return trackMarketingEvent('wallet_launch_click', { sourceContext });
}


