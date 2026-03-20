import { NextResponse } from 'next/server';
import { createAdminClient, createClient as createServerClient } from '@/lib/supabase/server';
import {
  sendCommitmentNotPurchasedSurveyEmail,
  COMMITMENT_NOT_PURCHASED_SURVEY_TEMPLATE_KEY,
  COMMITMENT_NOT_PURCHASED_SURVEY_CAMPAIGN_KEY,
} from '@/lib/email';
import { signCommitmentFeedbackToken } from '@/lib/commitment-feedback-token';

const EXCLUDED_EMAILS = new Set(['sjoehl@yahoo.com', 'marcveltens@gmail.com'].map((e) => e.toLowerCase()));

const TIER_NAMES: Record<number, string> = {
  1: 'Founders',
  2: 'Early Birds',
  3: 'Pioneers',
  4: 'Adopters',
  5: 'Supporters',
  6: 'Public',
};

/**
 * Admin-only: send “haven’t bought yet” survey to all non-converted commitments except excluded emails.
 */
export async function POST(request: Request) {
  try {
    const authClient = createServerClient();
    const {
      data: { user },
    } = await authClient.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json().catch(() => ({}));
    const dryRun = Boolean(body?.dryRun);

    const supabase = createAdminClient();

    const { data: commitments, error: listError } = await supabase
      .from('commitments')
      .select('id, email, intended_amount_usd, commitment_tier, converted, email_paused')
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
      .eq('template_key', COMMITMENT_NOT_PURCHASED_SURVEY_TEMPLATE_KEY)
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
      const token = signCommitmentFeedbackToken(String(c.id));
      if (!token) {
        failed++;
        continue;
      }
      const tierName = TIER_NAMES[c.commitment_tier] || 'Public';
      const res = await sendCommitmentNotPurchasedSurveyEmail({
        email: String(c.email),
        intendedAmountUsd: Number(c.intended_amount_usd) || 0,
        tierName,
        token,
      });
      if (res.success) {
        sent++;
        await supabase.from('commitment_email_sends').upsert(
          {
            commitment_id: String(c.id),
            email: String(c.email).toLowerCase().trim(),
            template_key: COMMITMENT_NOT_PURCHASED_SURVEY_TEMPLATE_KEY,
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
      campaign: COMMITMENT_NOT_PURCHASED_SURVEY_CAMPAIGN_KEY,
    });
  } catch (e) {
    console.error('commitment-not-purchased-survey:', e);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}
