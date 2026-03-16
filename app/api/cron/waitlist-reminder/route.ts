import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { sendWaitlistPresaleReminderEmail } from '@/lib/email';

const CRON_SECRET = process.env.CRON_SECRET;
const SLOT_INTERVAL_MS = 6 * 60 * 60 * 1000; // 6 hours
const WINDOW_MS = 20 * 60 * 1000; // 20 minutes to tolerate cron drift

function parseSeriesStart(value: unknown): Date | null {
  if (value == null) return null;
  let raw: string | undefined;
  if (typeof value === 'string') {
    try {
      const parsed = JSON.parse(value);
      raw = typeof parsed === 'string' ? parsed : String(parsed);
    } catch {
      raw = value;
    }
  } else {
    raw = String(value);
  }
  const d = new Date(raw);
  return Number.isNaN(d.getTime()) ? null : d;
}

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    const vercelCronHeader = request.headers.get('x-vercel-cron');
    const isVercelCron = vercelCronHeader === '1';
    const isValidSecret = CRON_SECRET && authHeader === `Bearer ${CRON_SECRET}`;
    const isDev = process.env.NODE_ENV === 'development';
    const isAdminTrigger = !CRON_SECRET;

    if (!isVercelCron && !isValidSecret && !isDev && !isAdminTrigger) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();
    const now = new Date();

    const { data: row } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'waitlist_reminder_series_start')
      .maybeSingle();

    const seriesStart = parseSeriesStart(row?.value);
    if (!seriesStart) {
      return NextResponse.json({
        message: 'waitlist_reminder_series_start not set in site_settings',
        results: [],
      });
    }

    // Which 6-hour slot are we in? 0 = first (18:00 UTC), 8 = last (48h later).
    const elapsed = now.getTime() - seriesStart.getTime();
    const slotIndex = Math.floor(elapsed / SLOT_INTERVAL_MS);

    if (slotIndex < 0) {
      return NextResponse.json({
        message: 'Series not started yet',
        seriesStart: seriesStart.toISOString(),
        results: [],
      });
    }
    if (slotIndex > 8) {
      return NextResponse.json({
        message: 'Series finished (48h passed)',
        seriesStart: seriesStart.toISOString(),
        results: [],
      });
    }

    // Only send when we're in the first 20 minutes of this slot (avoid duplicate sends).
    const slotStart = new Date(seriesStart.getTime() + slotIndex * SLOT_INTERVAL_MS);
    if (now.getTime() < slotStart.getTime() || now.getTime() >= slotStart.getTime() + WINDOW_MS) {
      return NextResponse.json({
        message: 'Not in send window for this slot',
        slotIndex,
        slotStart: slotStart.toISOString(),
        results: [],
      });
    }

    const templateKey = `waitlist_presale_reminder_6h_${slotIndex}`;

    // Who has already received this slot?
    const { data: sentRows } = await supabase
      .from('email_sends')
      .select('waitlist_id')
      .eq('template_key', templateKey);
    const sentSet = new Set((sentRows || []).map((r: { waitlist_id: string }) => String(r.waitlist_id)));

    // All active waitlist subscribers who haven't received this slot.
    const { data: subscribers } = await supabase
      .from('waitlist')
      .select('id, email, referral_code')
      .eq('email_paused', false);

    const toSend = (subscribers || []).filter((u: { id: string }) => !sentSet.has(String(u.id)));
    const results: { email: string; success: boolean }[] = [];

    for (const user of toSend) {
      let success = false;
      try {
        const res = await sendWaitlistPresaleReminderEmail(
          user.email,
          user.referral_code || 'BLAZE',
          slotIndex
        );
        success = res.success;
      } catch (err) {
        success = false;
      }

      if (success) {
        await supabase.from('email_sends').insert({
          waitlist_id: user.id,
          email: user.email,
          template_key: templateKey,
          status: 'sent',
        });
      }
      results.push({ email: user.email, success });
    }

    return NextResponse.json({
      success: true,
      seriesStart: seriesStart.toISOString(),
      slotIndex,
      slotStart: slotStart.toISOString(),
      sent: results.filter((r) => r.success).length,
      failed: results.filter((r) => !r.success).length,
      total: results.length,
      results,
    });
  } catch (error) {
    console.error('Error in waitlist-reminder cron:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
