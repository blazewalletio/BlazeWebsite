import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value');

    if (error) throw error;

    // Convert to object
    const settings: Record<string, any> = {};
    data?.forEach((item) => {
      settings[item.key] = JSON.parse(item.value);
    });

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Error getting settings:', error);
    return NextResponse.json({
      presale_date: '2026-02-01T12:00:00Z',
      waitlist_offset: 2847,
    });
  }
}

