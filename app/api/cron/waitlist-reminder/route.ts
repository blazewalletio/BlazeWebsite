import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import {
  sendWaitlistPresaleReminderEmail,
  sendPresaleOpenForEveryoneEmail,
  sendWaitlistPresaleDripEmail,
} from '@/lib/email';
import type { PresaleDripKey } from '@/lib/presale-drip-copy';

const CRON_SECRET = process.env.CRON_SECRET;
const SLOT_INTERVAL_MS = 6 * 60 * 60 * 1000; // 6 hours
const WINDOW_MS = 20 * 60 * 1000; // 20 minutes to tolerate cron drift
const POST_SERIES_OFFSET_MS = 60 * 60 * 60 * 1000; // 60 hours = 12h after slot 8 start (48h)
const HOUR_MS = 60 * 60 * 1000;

const TEMPLATE_POST_SERIES = 'waitlist_presale_open_for_everyone';

// Drip: 24h, 3d, 5d, 7d, 10d, 14d, 17d, 20d, 23d, 26d, 29d, 33d, 36d, 40d after post-series (60h), then apr30 at 17:00 UTC.
const DRIP_SCHEDULE: { offsetHours: number; key: PresaleDripKey }[] = [
  { offsetHours: 84, key: '24h' },   // 60+24
  { offsetHours: 132, key: '3d' },   // 60+72
  { offsetHours: 180, key: '5d' },
  { offsetHours: 228, key: '7d' },
  { offsetHours: 300, key: '10d' },
  { offsetHours: 396, key: '14d' },
  { offsetHours: 468, key: '17d' },
  { offsetHours: 540, key: '20d' },
  { offsetHours: 612, key: '23d' },
  { offsetHours: 684, key: '26d' },
  { offsetHours: 756, key: '29d' },
  { offsetHours: 852, key: '33d' },
  { offsetHours: 924, key: '36d' },
  { offsetHours: 1020, key: '40d' },
];

const APR30_UTC_START = new Date('2026-04-30T17:00:00Z').getTime();
const APR30_UTC_END = APR30_UTC_START + WINDOW_MS;

function getDripSlot(elapsedMs: number, now: Date): PresaleDripKey | null {
  const nowMs = now.getTime();
  for (const { offsetHours, key } of DRIP_SCHEDULE) {
    const start = offsetHours * HOUR_MS;
    if (elapsedMs >= start && elapsedMs < start + WINDOW_MS) return key;
  }
  if (nowMs >= APR30_UTC_START && nowMs < APR30_UTC_END) return 'apr30';
  return null;
}

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
    // 12 hours after slot 8: send "presale open for everyone" mail (one-time window).
    const postSeriesWindowStart = seriesStart.getTime() + POST_SERIES_OFFSET_MS;
    const inPostSeriesWindow =
      elapsed >= POST_SERIES_OFFSET_MS && elapsed < POST_SERIES_OFFSET_MS + WINDOW_MS;

    if (slotIndex > 8 && !inPostSeriesWindow) {
      const dripKey = getDripSlot(elapsed, now);
      if (dripKey) {
        const templateKey = `waitlist_presale_drip_${dripKey}`;
        const { data: sentRows } = await supabase
          .from('email_sends')
          .select('waitlist_id')
          .eq('template_key', templateKey);
        const sentSet = new Set((sentRows || []).map((r: { waitlist_id: string }) => String(r.waitlist_id)));

        const { data: subscribers } = await supabase
          .from('waitlist')
          .select('id, email, referral_code')
          .eq('email_paused', false);

        const toSend = (subscribers || []).filter((u: { id: string }) => !sentSet.has(String(u.id)));
        const results: { email: string; success: boolean }[] = [];

        for (const user of toSend) {
          let success = false;
          try {
            const res = await sendWaitlistPresaleDripEmail(
              user.email,
              user.referral_code || 'BLAZE',
              dripKey
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

        const dripWindowStart =
          dripKey === 'apr30'
            ? APR30_UTC_START
            : DRIP_SCHEDULE.find((d) => d.key === dripKey)!.offsetHours * HOUR_MS + seriesStart.getTime();

        return NextResponse.json({
          success: true,
          seriesStart: seriesStart.toISOString(),
          slotIndex: `drip_${dripKey}`,
          slotStart: new Date(dripWindowStart).toISOString(),
          sent: results.filter((r) => r.success).length,
          failed: results.filter((r) => !r.success).length,
          total: results.length,
          results,
        });
      }

      const postSeriesEnd = POST_SERIES_OFFSET_MS + WINDOW_MS;
      const lastDripEnd = Math.max(
        postSeriesEnd,
        ...DRIP_SCHEDULE.map((d) => d.offsetHours * HOUR_MS + WINDOW_MS)
      );
      const afterApr30 = now.getTime() >= APR30_UTC_END;

      return NextResponse.json({
        message:
          afterApr30 || elapsed >= lastDripEnd
            ? 'Series finished (early-access + post-series + drip mails done)'
            : 'Waiting for next drip send window',
        seriesStart: seriesStart.toISOString(),
        results: [],
      });
    }

    if (inPostSeriesWindow) {
      const { data: sentRows } = await supabase
        .from('email_sends')
        .select('waitlist_id')
        .eq('template_key', TEMPLATE_POST_SERIES);
      const sentSet = new Set((sentRows || []).map((r: { waitlist_id: string }) => String(r.waitlist_id)));

      const { data: subscribers } = await supabase
        .from('waitlist')
        .select('id, email, referral_code')
        .eq('email_paused', false);

      const toSend = (subscribers || []).filter((u: { id: string }) => !sentSet.has(String(u.id)));
      const results: { email: string; success: boolean }[] = [];

      for (const user of toSend) {
        let success = false;
        try {
          const res = await sendPresaleOpenForEveryoneEmail(
            user.email,
            user.referral_code || 'BLAZE'
          );
          success = res.success;
        } catch (err) {
          success = false;
        }
        if (success) {
          await supabase.from('email_sends').insert({
            waitlist_id: user.id,
            email: user.email,
            template_key: TEMPLATE_POST_SERIES,
            status: 'sent',
          });
        }
        results.push({ email: user.email, success });
      }

      return NextResponse.json({
        success: true,
        seriesStart: seriesStart.toISOString(),
        slotIndex: 'post_series',
        slotStart: new Date(postSeriesWindowStart).toISOString(),
        sent: results.filter((r) => r.success).length,
        failed: results.filter((r) => !r.success).length,
        total: results.length,
        results,
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
