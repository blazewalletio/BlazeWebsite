import crypto from 'crypto';

type MetaActionSource = 'website' | 'app' | 'email' | 'phone_call' | 'chat' | 'other';

type MetaCapiUserData = {
  client_ip_address?: string | null;
  client_user_agent?: string | null;
  em?: string[]; // SHA256 hashes
  external_id?: string[]; // SHA256 hashes
  fbp?: string;
  fbc?: string;
};

type MetaCapiEvent = {
  event_name: string;
  event_time: number; // unix seconds
  event_id?: string;
  action_source: MetaActionSource;
  event_source_url?: string;
  user_data: MetaCapiUserData;
  custom_data?: Record<string, unknown>;
};

function sha256Hex(input: string) {
  return crypto.createHash('sha256').update(input).digest('hex');
}

function looksLikeSha256Hex(maybe: string) {
  return /^[a-f0-9]{64}$/i.test(maybe);
}

export function normalizeAndHashExternalId(externalId: string) {
  return sha256Hex(externalId.trim());
}

export async function sendMetaCapiEvent(event: MetaCapiEvent) {
  const token = process.env.META_CONVERSIONS_API_TOKEN;
  const pixelId =
    process.env.META_PIXEL_ID || process.env.NEXT_PUBLIC_META_PIXEL_ID || '1271131718247007';

  if (!token) {
    // Not configured; fail silently so product flows keep working.
    return { ok: false as const, skipped: true as const, reason: 'missing_token' as const };
  }

  const apiVersion = process.env.META_GRAPH_API_VERSION || 'v20.0';
  const testEventCode = process.env.META_TEST_EVENT_CODE;
  const url = new URL(`https://graph.facebook.com/${apiVersion}/${pixelId}/events`);
  url.searchParams.set('access_token', token);
  if (testEventCode) url.searchParams.set('test_event_code', testEventCode);

  // Ensure hashes are hashes (avoid accidentally sending raw PII).
  const safeUserData: MetaCapiUserData = { ...(event.user_data || {}) };
  if (Array.isArray(safeUserData.em)) {
    safeUserData.em = safeUserData.em.filter((h) => typeof h === 'string' && looksLikeSha256Hex(h));
  }
  if (Array.isArray(safeUserData.external_id)) {
    safeUserData.external_id = safeUserData.external_id.filter(
      (h) => typeof h === 'string' && looksLikeSha256Hex(h)
    );
  }

  const payload = {
    data: [
      {
        ...event,
        user_data: safeUserData,
      },
    ],
  };

  const res = await fetch(url.toString(), {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => '');
    return { ok: false as const, skipped: false as const, status: res.status, body: text };
  }

  const json = await res.json().catch(() => ({}));
  return { ok: true as const, response: json };
}


