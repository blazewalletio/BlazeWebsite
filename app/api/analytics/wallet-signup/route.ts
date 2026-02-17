import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { normalizeAndHashExternalId, sendMetaCapiEvent } from '@/lib/analytics/meta-capi';

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

    // Meta Conversions API (server-side): treat wallet signup as CompleteRegistration.
    // This is independent of the website pixel and captures app-originated signups.
    try {
      const externalId =
        typeof visitorId === 'string' && visitorId.length > 0
          ? normalizeAndHashExternalId(visitorId)
          : null;
      const em =
        typeof emailHash === 'string' && emailHash.length > 0 ? emailHash.toLowerCase() : null;

      const actionSource = source === 'wallet_app' ? 'app' : 'website';
      const eventId =
        typeof walletUserId === 'string' && walletUserId.length > 0
          ? `wallet_account_created:${walletUserId}`
          : typeof walletAddress === 'string' && walletAddress.length > 0
            ? `wallet_account_created:${walletAddress}`
            : `wallet_account_created:${Date.now()}`;

      const capiRes = await sendMetaCapiEvent({
        event_name: 'CompleteRegistration',
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: actionSource,
        event_source_url: 'https://www.blazewallet.io',
        user_data: {
          client_ip_address: ipAddress,
          client_user_agent: userAgent,
          em: em ? [em] : undefined,
          external_id: externalId ? [externalId] : undefined,
        },
        custom_data: {
          source,
        },
      });

      if (!capiRes.ok && !capiRes.skipped) {
        console.warn('Meta CAPI failed for wallet signup:', capiRes);
      }
    } catch (capiError) {
      console.warn('Meta CAPI error for wallet signup:', capiError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing wallet signup event:', error);
    return NextResponse.json({ success: false, error: 'Internal error' }, { status: 500 });
  }
}


