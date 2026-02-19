import { NextResponse } from 'next/server';
import { createAdminClient, createClient as createServerClient } from '@/lib/supabase/server';
import { sendCommitmentApologyEmail } from '@/lib/email';

function parsePresaleDateFromSettings(value: unknown) {
  if (typeof value !== 'string') return null;
  let raw = value;
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === 'string') raw = parsed;
  } catch {
    // ignore
  }
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

const AFFECTED_TEMPLATE_KEYS = [
  'commitment_tminus_48h',
  'commitment_tminus_24h',
  'commitment_tminus_12h',
  'commitment_tminus_6h',
  'commitment_tminus_3h',
  'commitment_tminus_1h',
  'commitment_live',
] as const;

export async function POST(request: Request) {
  try {
    // Admin-only: require authenticated session (same pattern as /api/settings).
    const authClient = createServerClient();
    const {
      data: { user },
    } = await authClient.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const sinceHours = typeof body?.sinceHours === 'number' && body.sinceHours > 0 ? body.sinceHours : 72;
    const dryRun = Boolean(body?.dryRun);

    const supabase = createAdminClient();

    const { data: settingsRow } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'presale_date')
      .maybeSingle();

    const presaleDate =
      parsePresaleDateFromSettings(settingsRow?.value) || new Date('2026-03-16T12:00:00Z');
    const presaleDateIso = presaleDate.toISOString();

    const since = new Date(Date.now() - sinceHours * 60 * 60 * 1000).toISOString();

    // Find commitment ids/emails that received any of the affected templates recently.
    const { data: affectedRows, error: affectedError } = await supabase
      .from('commitment_email_sends')
      .select('commitment_id,email,template_key,created_at,status')
      .in('template_key', [...AFFECTED_TEMPLATE_KEYS])
      .gte('created_at', since)
      .eq('status', 'sent');

    if (affectedError) {
      return NextResponse.json({ success: false, error: affectedError.message }, { status: 500 });
    }

    const uniqueByCommitment = new Map<string, string>();
    for (const row of affectedRows || []) {
      if (!row?.commitment_id || !row?.email) continue;
      if (!uniqueByCommitment.has(String(row.commitment_id))) {
        uniqueByCommitment.set(String(row.commitment_id), String(row.email));
      }
    }

    const commitmentIds = Array.from(uniqueByCommitment.keys());
    if (commitmentIds.length === 0) {
      return NextResponse.json({ success: true, sent: 0, failed: 0, total: 0, dryRun, presaleDate: presaleDateIso });
    }

    // Dedupe: do not send apology twice per commitment.
    const { data: alreadySentRows } = await supabase
      .from('commitment_email_sends')
      .select('commitment_id')
      .eq('template_key', 'commitment_apology')
      .in('commitment_id', commitmentIds);
    const alreadySent = new Set((alreadySentRows || []).map((r: any) => String(r.commitment_id)));

    const toSend = commitmentIds
      .filter((id) => !alreadySent.has(id))
      .map((id) => ({ commitmentId: id, email: uniqueByCommitment.get(id)! }));

    if (dryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        presaleDate: presaleDateIso,
        total: toSend.length,
        recipients: toSend.slice(0, 50), // cap preview
      });
    }

    let sent = 0;
    let failed = 0;

    for (const r of toSend) {
      try {
        const res = await sendCommitmentApologyEmail(r.email, presaleDateIso);
        const ok = Boolean((res as any)?.success);
        if (ok) sent++;
        else failed++;

        await supabase.from('commitment_email_sends').insert({
          commitment_id: r.commitmentId,
          email: r.email,
          template_key: 'commitment_apology',
          status: ok ? 'sent' : 'failed',
        });
      } catch (err: any) {
        failed++;
        await supabase.from('commitment_email_sends').insert({
          commitment_id: r.commitmentId,
          email: r.email,
          template_key: 'commitment_apology',
          status: 'failed',
          error: err?.message || String(err),
        });
      }
      // Small delay to avoid rate limiting bursts.
      if (toSend.length > 1) {
        await new Promise((resolve) => setTimeout(resolve, 120));
      }
    }

    return NextResponse.json({
      success: true,
      presaleDate: presaleDateIso,
      sent,
      failed,
      total: toSend.length,
    });
  } catch (error: any) {
    console.error('Error sending commitment apology blast:', error);
    return NextResponse.json({ success: false, error: error?.message || 'Internal error' }, { status: 500 });
  }
}


