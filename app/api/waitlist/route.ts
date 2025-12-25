import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    const { email, source = 'presale_countdown' } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Get client info
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Insert into waitlist
    const { data, error } = await supabase
      .from('waitlist')
      .insert({
        email: email.toLowerCase().trim(),
        source,
        ip_address: ip,
        user_agent: userAgent,
      })
      .select()
      .single();

    if (error) {
      // Check for duplicate email
      if (error.code === '23505') {
        return NextResponse.json(
          { error: 'This email is already on the waitlist!' },
          { status: 409 }
        );
      }
      throw error;
    }

    // Get updated count
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      count: count || 0,
    });
  } catch (error: any) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Get waitlist count
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    // Get offset from settings
    const { data: settings } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'waitlist_offset')
      .single();

    const offset = settings ? JSON.parse(settings.value) : 2847;

    return NextResponse.json({
      count: (count || 0) + offset,
    });
  } catch (error) {
    console.error('Error getting waitlist count:', error);
    return NextResponse.json({ count: 2847 });
  }
}

