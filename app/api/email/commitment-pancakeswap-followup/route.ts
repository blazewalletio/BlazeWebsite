import { NextResponse } from 'next/server';
import { createAdminClient, createClient as createServerClient } from '@/lib/supabase/server';
import {
  sendCommitmentPancakeFollowupEmail,
  COMMITMENT_PANCAKE_FOLLOWUP_TEMPLATE_KEY,
  COMMITMENT_PANCAKE_FOLLOWUP_CAMPAIGN_KEY,
} from '@/lib/email';

const EXCLUDED_EMAILS = new Set(['sjoehl@yahoo.com', 'marcveltens@gmail.com'].map((e) => e.toLowerCase()));

function hasAdminBearer(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  const adminSecret = process.env.ADMIN_SECRET || 'blaze-admin-2024';
  return authHeader === `Bearer ${adminSecret}`;
}

/**
 * Admin-only: PancakeSwap follow-up to all non-converted commitments
 * (except excluded / paused). Supports dryRun and testCommitmentId for QA.
 * Auth: a logged-in admin session OR a Bearer ADMIN_SECRET (server-to-server).
 */
export async function POST(request: Request) {
  try {
    if (!hasAdminBearer(request)) {
      const authClient = createServerClient();
      const {
        data: { user },
      } = await authClient.auth.getUser();

      if (!user) {
        return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
      }
    }

    const body = await request.json().catch(() => ({}));
    const dryRun = Boolean(body?.dryRun);
    const testCommitmentId =
      typeof body?.testCommitmentId === 'string' ? body.testCommitmentId.trim() : '';

    const supabase = createAdminClient();

    // Preview / QA: one email, does NOT log to commitment_email_sends.
    if (testCommitmentId) {
      const { data: c, error: oneErr } = await supabase
        .from('commitments')
        .select('id, email')
        .eq('id', testCommitmentId)
        .maybeSingle();

      if (oneErr || !c) {
        return NextResponse.json({ success: false, error: 'Commitment not found' }, { status: 404 });
      }

      const res = await sendCommitmentPancakeFollowupEmail(String(c.email));
      if (!res.success) {
        return NextResponse.json({ success: false, error: 'Resend failed' }, { status: 500 });
      }

      return NextResponse.json({
        success: true,
        test: true,
        email: String(c.email),
        commitmentId: String(c.id),
        note: 'Not logged in commitment_email_sends; safe for QA; blast will still send later.',
      });
    }

    const { data: commitments, error: listError } = await supabase
      .from('commitments')
      .select('id, email, converted, email_paused')
      .eq('converted', false);

    if (listError) {
      return NextResponse.json({ success: false, error: listError.message }, { status: 500 });
    }

    const eligible = (commitments || []).filter((c) => {
      const email = String(c.email || '').toLowerCase().trim();
      if (!email || EXCLUDED_EMAILS.has(email)) return false;
      if (c.email_paused) return false;
      return true;
    });

    const { data: alreadySent } = await supabase
      .from('commitment_email_sends')
      .select('commitment_id')
      .eq('template_key', COMMITMENT_PANCAKE_FOLLOWUP_TEMPLATE_KEY)
      .eq('status', 'sent');

    const sentSet = new Set((alreadySent || []).map((r) => String(r.commitment_id)));
    const toSend = eligible.filter((c) => !sentSet.has(String(c.id)));

    if (dryRun) {
      return NextResponse.json({
        success: true,
        dryRun: true,
        eligible: eligible.length,
        wouldSend: toSend.length,
        excluded: (commitments || []).length - eligible.length,
      });
    }

    let sent = 0;
    let failed = 0;

    for (const c of toSend) {
      const res = await sendCommitmentPancakeFollowupEmail(String(c.email));
      if (res.success) {
        sent++;
        await supabase.from('commitment_email_sends').upsert(
          {
            commitment_id: String(c.id),
            email: String(c.email).toLowerCase().trim(),
            template_key: COMMITMENT_PANCAKE_FOLLOWUP_TEMPLATE_KEY,
            status: 'sent',
          },
          { onConflict: 'commitment_id,template_key' }
        );
      } else {
        failed++;
      }
      await new Promise((r) => setTimeout(r, 250));
    }

    return NextResponse.json({
      success: true,
      sent,
      failed,
      total: toSend.length,
      campaign: COMMITMENT_PANCAKE_FOLLOWUP_CAMPAIGN_KEY,
    });
  } catch (e) {
    console.error('commitment-pancakeswap-followup:', e);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
