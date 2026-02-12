import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const expectedSecret = process.env.WALLET_SIGNUP_TRACKING_SECRET;
    if (!expectedSecret) {
      return NextResponse.json(
        { success: false, error: 'WALLET_SIGNUP_TRACKING_SECRET is not configured' },
        { status: 503 }
      );
    }

    const body = await request.json();
    const {
      secret,
      visitorId,
      walletUserId,
      walletAddress,
      emailHash,
      source = 'wallet_app',
    } = body || {};

    if (secret !== expectedSecret) {
      return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 });
    }

    const headers = request.headers;
    const ipAddress =
      headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headers.get('x-real-ip') ||
      null;
    const userAgent = headers.get('user-agent');

    const supabase = createAdminClient();
    let attributedCampaign: string | null = null;
    let attributedSource: string | null = null;
    let attributedMedium: string | null = null;
    let attributedContent: string | null = null;
    let attributedTerm: string | null = null;
    let attributedTwclid: string | null = null;

    if (typeof visitorId === 'string' && visitorId.length > 0) {
      const { data: lastTouchEvent } = await supabase
        .from('marketing_events')
        .select('utm_source, utm_medium, utm_campaign, utm_content, utm_term, twclid')
        .eq('visitor_id', visitorId)
        .order('created_at', { ascending: false })
        .limit(1)
        .maybeSingle();

      attributedSource = lastTouchEvent?.utm_source || null;
      attributedMedium = lastTouchEvent?.utm_medium || null;
      attributedCampaign = lastTouchEvent?.utm_campaign || null;
      attributedContent = lastTouchEvent?.utm_content || null;
      attributedTerm = lastTouchEvent?.utm_term || null;
      attributedTwclid = lastTouchEvent?.twclid || null;
    }

    const { error } = await supabase.from('marketing_events').insert({
      event_name: 'wallet_account_created',
      x_event_name: 'SignUp',
      visitor_id: typeof visitorId === 'string' ? visitorId : null,
      source_page: 'wallet_signup_webhook',
      user_agent: userAgent,
      ip_address: ipAddress,
      utm_source: attributedSource,
      utm_medium: attributedMedium,
      utm_campaign: attributedCampaign,
      utm_content: attributedContent,
      utm_term: attributedTerm,
      twclid: attributedTwclid,
      metadata: {
        source,
        walletUserId: walletUserId || null,
        walletAddress: walletAddress || null,
        emailHash: emailHash || null,
      },
    });

    if (error) {
      console.error('Failed to store wallet signup event:', error);
      return NextResponse.json({ success: false, error: 'Failed to store event' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing wallet signup event:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}


