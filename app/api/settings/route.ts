import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient, createClient } from '@/lib/supabase/server';

function parseSettingsRows(data: { key: string; value: string }[] | null) {
  const settings: Record<string, any> = {};
  data?.forEach((item) => {
    settings[item.key] = JSON.parse(item.value);
  });
  return settings;
}

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from('site_settings')
      .select('key, value');

    if (error) throw error;

    return NextResponse.json(parseSettingsRows(data));
  } catch (error) {
    console.error('Error getting settings:', error);
    return NextResponse.json({
      presale_date: '2026-02-01T12:00:00Z',
      waitlist_offset: 2847,
    });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authClient = createClient();
    const {
      data: { user },
    } = await authClient.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { presale_date, waitlist_offset } = body ?? {};

    if (!presale_date || Number.isNaN(Date.parse(presale_date))) {
      return NextResponse.json({ error: 'Invalid presale_date' }, { status: 400 });
    }

    if (typeof waitlist_offset !== 'number' || !Number.isFinite(waitlist_offset)) {
      return NextResponse.json({ error: 'Invalid waitlist_offset' }, { status: 400 });
    }

    const now = new Date().toISOString();
    const adminSupabase = createAdminClient();
    const { error } = await adminSupabase.from('site_settings').upsert(
      [
        {
          key: 'presale_date',
          value: JSON.stringify(presale_date),
          updated_at: now,
          updated_by: user.id,
        },
        {
          key: 'waitlist_offset',
          value: JSON.stringify(waitlist_offset),
          updated_at: now,
          updated_by: user.id,
        },
      ],
      { onConflict: 'key' }
    );

    if (error) throw error;

    return NextResponse.json({
      success: true,
      settings: {
        presale_date,
        waitlist_offset,
      },
    });
  } catch (error: any) {
    console.error('Error saving settings:', error);
    return NextResponse.json(
      { error: error?.message || 'Failed to save settings' },
      { status: 500 }
    );
  }
}


