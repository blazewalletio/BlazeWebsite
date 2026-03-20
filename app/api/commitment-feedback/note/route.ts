import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { verifyCommitmentFeedbackToken } from '@/lib/commitment-feedback-token';
import { COMMITMENT_NOT_PURCHASED_SURVEY_CAMPAIGN_KEY } from '@/lib/email';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    const token = typeof body?.token === 'string' ? body.token : '';
    const note = typeof body?.note === 'string' ? body.note.trim().slice(0, 4000) : '';

    const payload = verifyCommitmentFeedbackToken(token);
    if (!payload) {
      return NextResponse.json({ success: false, error: 'Invalid or expired link' }, { status: 400 });
    }

    if (!note) {
      return NextResponse.json({ success: false, error: 'Note is empty' }, { status: 400 });
    }

    const supabase = createAdminClient();
    const { error } = await supabase
      .from('commitment_purchase_feedback')
      .update({
        extra_note: note,
        updated_at: new Date().toISOString(),
      })
      .eq('commitment_id', payload.cid)
      .eq('campaign_key', COMMITMENT_NOT_PURCHASED_SURVEY_CAMPAIGN_KEY);

    if (error) {
      console.error('commitment-feedback note:', error);
      return NextResponse.json({ success: false, error: 'Could not save note' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (e) {
    console.error('commitment-feedback note:', e);
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
