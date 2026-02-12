import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      eventName,
      payload = {},
      visitorId,
      pagePath,
      pageUrl,
      referrer,
      attribution = {},
      xEventName,
      value,
      currency,
    } = body || {};

    if (!eventName || typeof eventName !== 'string') {
      return NextResponse.json({ success: false, error: 'eventName is required' }, { status: 400 });
    }

    const headers = request.headers;
    const ipAddress =
      headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      headers.get('x-real-ip') ||
      null;
    const userAgent = headers.get('user-agent');

    const supabase = createAdminClient();
    const { error } = await supabase.from('marketing_events').insert({
      event_name: eventName.slice(0, 80),
      x_event_name: typeof xEventName === 'string' ? xEventName : null,
      event_value: typeof value === 'number' ? value : null,
      currency: typeof currency === 'string' ? currency : null,
      visitor_id: typeof visitorId === 'string' ? visitorId : null,
      source_page: typeof pagePath === 'string' ? pagePath : null,
      page_url: typeof pageUrl === 'string' ? pageUrl : null,
      referrer: typeof referrer === 'string' ? referrer : null,
      user_agent: userAgent,
      ip_address: ipAddress,
      utm_source: attribution?.utm_source || null,
      utm_medium: attribution?.utm_medium || null,
      utm_campaign: attribution?.utm_campaign || null,
      utm_content: attribution?.utm_content || null,
      utm_term: attribution?.utm_term || null,
      twclid: attribution?.twclid || null,
      metadata: payload,
    });

    if (error) {
      console.error('Failed to insert marketing event:', error);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error storing analytics event:', error);
    return NextResponse.json({ success: false }, { status: 200 });
  }
}


