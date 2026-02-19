import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';
import { sendNewSignupNotification, sendWelcomeEmail } from '@/lib/email';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Generate a unique referral code
function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'BLAZE';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

function getCountryCode(request: NextRequest): string | null {
  // Prefer Vercel's explicit header. Fallback to geo if present.
  const header =
    request.headers.get('x-vercel-ip-country') ||
    request.headers.get('cf-ipcountry') ||
    null;

  const geoCountry = (request as any)?.geo?.country ?? null;
  const raw = (geoCountry || header || '').toString().trim().toUpperCase();

  // Common "unknown"/special values:
  // - "XX" sometimes used as unknown
  // - "T1" is used by some providers for Tor/anonymous traffic
  if (!raw || raw === 'XX' || raw === 'T1') return null;
  if (!/^[A-Z]{2}$/.test(raw)) return null;
  return raw;
}

export async function POST(request: NextRequest) {
  try {
    const { email, source = 'presale_countdown', ref } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Valid email is required' },
        { status: 400 }
      );
    }

    // Get client info
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';
    const countryCode = getCountryCode(request);

    // Generate unique referral code
    const referralCode = generateReferralCode();

    // Insert into waitlist
    const { data, error } = await supabase
      .from('waitlist')
      .insert({
        email: email.toLowerCase().trim(),
        source,
        ip_address: ip,
        user_agent: userAgent,
        country_code: countryCode,
        referral_code: referralCode,
        referred_by: ref || null,
      })
      .select()
      .single();

    if (error) {
      // Check for duplicate email
      if (error.code === '23505') {
        // Get existing referral code for this email
        const { data: existing } = await supabase
          .from('waitlist')
          .select('referral_code')
          .eq('email', email.toLowerCase().trim())
          .single();

        return NextResponse.json(
          { 
            error: 'This email is already on the waitlist!',
            referralCode: existing?.referral_code 
          },
          { status: 409 }
        );
      }
      throw error;
    }

    // Get updated count
    const { count } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    // Keep waitlist count display consistent with GET response
    const { data: settings } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'waitlist_offset')
      .single();
    const offset = settings ? JSON.parse(settings.value) : 2847;

    // Send notification email to admin
    try {
      const adminResult = await sendNewSignupNotification(email, source, ref);
      console.log('Admin notification result:', adminResult);
    } catch (emailError) {
      console.error('Admin notification failed:', emailError);
    }

    // Send welcome email to user
    try {
      const welcomeResult = await sendWelcomeEmail(email, referralCode);
      console.log('Welcome email result:', welcomeResult);
    } catch (emailError) {
      console.error('Welcome email failed:', emailError);
    }

    return NextResponse.json({
      success: true,
      message: 'Successfully joined the waitlist!',
      count: (count || 0) + offset,
      referralCode,
    });
  } catch (error: any) {
    console.error('Waitlist signup error:', error);
    return NextResponse.json(
      { error: 'Failed to join waitlist. Please try again.' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');

    // Get analytics data
    if (action === 'analytics') {
      const days = parseInt(searchParams.get('days') || '30');
      
      // Get daily signups
      const { data: dailyData } = await supabase.rpc('get_daily_signups', { days_back: days });
      
      // Get source stats
      const { data: sourceData } = await supabase.rpc('get_source_stats');
      
      // Get top referrers
      const { data: referrerData } = await supabase.rpc('get_top_referrers', { limit_count: 10 });

      return NextResponse.json({
        daily: dailyData || [],
        sources: sourceData || [],
        topReferrers: referrerData || [],
      });
    }

    // Get export data
    if (action === 'export') {
      const format = searchParams.get('format') || 'json';
      const startDate = searchParams.get('start');
      const endDate = searchParams.get('end');
      const sourceFilter = searchParams.get('source');

      let query = supabase
        .from('waitlist')
        .select('email, source, referral_code, referred_by, created_at')
        .order('created_at', { ascending: false });

      if (startDate) {
        query = query.gte('created_at', startDate);
      }
      if (endDate) {
        query = query.lte('created_at', endDate);
      }
      if (sourceFilter && sourceFilter !== 'all') {
        query = query.eq('source', sourceFilter);
      }

      const { data, error } = await query;

      if (error) throw error;

      if (format === 'csv') {
        const csv = [
          'Email,Source,Referral Code,Referred By,Date',
          ...(data || []).map(row => 
            `${row.email},${row.source || ''},${row.referral_code || ''},${row.referred_by || ''},${row.created_at}`
          )
        ].join('\n');

        return new NextResponse(csv, {
          headers: {
            'Content-Type': 'text/csv',
            'Content-Disposition': `attachment; filename=blaze-waitlist-${new Date().toISOString().split('T')[0]}.csv`
          }
        });
      }

      return NextResponse.json({ data });
    }

    // Default: Get waitlist count
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
    console.error('Error getting waitlist data:', error);
    return NextResponse.json({ count: 2847 });
  }
}
