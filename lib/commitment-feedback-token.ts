import { createHmac, timingSafeEqual } from 'crypto';

const TOKEN_VERSION = 1;
const DEFAULT_TTL_MS = 45 * 24 * 60 * 60 * 1000; // 45 days

function getSecret(): string {
  const s =
    process.env.COMMITMENT_FEEDBACK_TOKEN_SECRET ||
    process.env.CRON_SECRET ||
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    '';
  if (!s) return '';
  return s;
}

function base64UrlEncode(buf: Buffer): string {
  return buf
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');
}

function base64UrlDecode(s: string): Buffer {
  let padded = s.replace(/-/g, '+').replace(/_/g, '/');
  while (padded.length % 4) padded += '=';
  return Buffer.from(padded, 'base64');
}

export interface CommitmentFeedbackTokenPayload {
  v: number;
  cid: string;
  exp: number;
}

export function signCommitmentFeedbackToken(
  commitmentId: string,
  ttlMs: number = DEFAULT_TTL_MS
): string | null {
  const secret = getSecret();
  if (!secret) {
    console.error('signCommitmentFeedbackToken: missing COMMITMENT_FEEDBACK_TOKEN_SECRET (or CRON_SECRET fallback)');
    return null;
  }
  const payload: CommitmentFeedbackTokenPayload = {
    v: TOKEN_VERSION,
    cid: commitmentId,
    exp: Date.now() + ttlMs,
  };
  const payloadJson = JSON.stringify(payload);
  const payloadB64 = base64UrlEncode(Buffer.from(payloadJson, 'utf8'));
  const sig = createHmac('sha256', secret).update(payloadB64).digest();
  const sigB64 = base64UrlEncode(sig);
  return `${payloadB64}.${sigB64}`;
}

export function verifyCommitmentFeedbackToken(token: string): CommitmentFeedbackTokenPayload | null {
  const secret = getSecret();
  if (!secret) return null;
  const parts = token.split('.');
  if (parts.length !== 2) return null;
  const [payloadB64, sigB64] = parts;
  const expectedSig = createHmac('sha256', secret).update(payloadB64).digest();
  let sig: Buffer;
  try {
    sig = base64UrlDecode(sigB64);
  } catch {
    return null;
  }
  if (sig.length !== expectedSig.length || !timingSafeEqual(sig, expectedSig)) {
    return null;
  }
  let payload: CommitmentFeedbackTokenPayload;
  try {
    payload = JSON.parse(base64UrlDecode(payloadB64).toString('utf8')) as CommitmentFeedbackTokenPayload;
  } catch {
    return null;
  }
  if (payload.v !== TOKEN_VERSION || typeof payload.cid !== 'string' || typeof payload.exp !== 'number') {
    return null;
  }
  if (Date.now() > payload.exp) return null;
  return payload;
}
