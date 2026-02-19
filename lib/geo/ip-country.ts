type CountryLookupResult = {
  countryCode: string | null;
  provider?: string;
  error?: string;
};

function normalizeIp(raw: string | null | undefined): string | null {
  if (!raw) return null;
  const first = raw.split(',')[0]?.trim();
  if (!first) return null;

  // Basic guard against obviously invalid values we store sometimes.
  if (first === 'unknown') return null;

  // Skip local/private ranges quickly (not exhaustive, but avoids useless lookups).
  if (
    first.startsWith('10.') ||
    first.startsWith('192.168.') ||
    first.startsWith('172.16.') ||
    first.startsWith('172.17.') ||
    first.startsWith('172.18.') ||
    first.startsWith('172.19.') ||
    first.startsWith('172.2') || // 172.20-172.29
    first.startsWith('172.3') || // 172.30-172.31
    first.startsWith('127.') ||
    first === '::1'
  ) {
    return null;
  }

  return first;
}

function normalizeCountryCode(raw: unknown): string | null {
  const v = String(raw || '').trim().toUpperCase();
  if (!v || v === 'XX' || v === 'T1') return null;
  if (!/^[A-Z]{2}$/.test(v)) return null;
  return v;
}

export async function lookupCountryCodeFromIp(ip: string | null | undefined): Promise<CountryLookupResult> {
  const normalizedIp = normalizeIp(ip);
  if (!normalizedIp) return { countryCode: null };

  // Lightweight public endpoint, no API key required. Good enough for small backfills.
  // Note: ipapi.co has rate limits; we run sequentially in the backfill endpoint.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2500);

  try {
    const res = await fetch(`https://ipapi.co/${encodeURIComponent(normalizedIp)}/json/`, {
      signal: controller.signal,
      headers: { 'accept': 'application/json' },
      cache: 'no-store',
    });

    if (!res.ok) {
      return { countryCode: null, provider: 'ipapi.co', error: `HTTP ${res.status}` };
    }

    const data: any = await res.json();
    const cc = normalizeCountryCode(data?.country_code);
    return { countryCode: cc, provider: 'ipapi.co' };
  } catch (e: any) {
    return { countryCode: null, provider: 'ipapi.co', error: e?.message || 'lookup failed' };
  } finally {
    clearTimeout(timeout);
  }
}


