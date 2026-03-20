import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
import { createAdminClient } from '@/lib/supabase/server';
import { verifyCommitmentFeedbackToken } from '@/lib/commitment-feedback-token';
import { getCommitmentFeedbackReason } from '@/lib/commitment-feedback-reasons';
import { COMMITMENT_NOT_PURCHASED_SURVEY_CAMPAIGN_KEY } from '@/lib/email';

function thanksUrl(request: NextRequest, other: boolean, token: string) {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin).replace(/\/$/, '');
  if (other) {
    return `${base}/commitment-feedback/thanks?other=1&t=${encodeURIComponent(token)}`;
  }
  return `${base}/commitment-feedback/thanks`;
}

export async function GET(request: NextRequest) {
  try {
    const r = request.nextUrl.searchParams.get('r') || '';
    const t = request.nextUrl.searchParams.get('t') || '';
    const reason = getCommitmentFeedbackReason(r);
    const payload = verifyCommitmentFeedbackToken(t);

    if (!reason || !payload) {
      return NextResponse.redirect(new URL('/commitment-feedback/thanks?invalid=1', request.url));
    }

    const supabase = createAdminClient();
    const { data: commitment, error: fetchError } = await supabase
      .from('commitments')
      .select('id, email')
      .eq('id', payload.cid)
      .maybeSingle();

    if (fetchError || !commitment) {
      return NextResponse.redirect(new URL('/commitment-feedback/thanks?invalid=1', request.url));
    }

    const normalizedEmail = String(commitment.email || '').toLowerCase().trim();
    const campaign = COMMITMENT_NOT_PURCHASED_SURVEY_CAMPAIGN_KEY;
    const now = new Date().toISOString();

    const { data: existing } = await supabase
      .from('commitment_purchase_feedback')
      .select('id')
      .eq('commitment_id', String(commitment.id))
      .eq('campaign_key', campaign)
      .maybeSingle();

    if (existing?.id) {
      const { error: updateError } = await supabase
        .from('commitment_purchase_feedback')
        .update({
          reason_key: reason.key,
          reason_label: reason.adminLabel,
          email: normalizedEmail,
          updated_at: now,
        })
        .eq('id', existing.id);
      if (updateError) {
        console.error('commitment-feedback update:', updateError);
        return NextResponse.redirect(new URL('/commitment-feedback/thanks?error=1', request.url));
      }
    } else {
      const { error: insertError } = await supabase.from('commitment_purchase_feedback').insert({
        commitment_id: String(commitment.id),
        email: normalizedEmail,
        reason_key: reason.key,
        reason_label: reason.adminLabel,
        campaign_key: campaign,
        updated_at: now,
      });
      if (insertError) {
        console.error('commitment-feedback insert:', insertError);
        return NextResponse.redirect(new URL('/commitment-feedback/thanks?error=1', request.url));
      }
    }

    const isOther = reason.key === 'other';
    return NextResponse.redirect(thanksUrl(request, isOther, t));
  } catch (e) {
    console.error('commitment-feedback click:', e);
    return NextResponse.redirect(new URL('/commitment-feedback/thanks?error=1', request.url));
  }
}
