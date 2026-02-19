import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import {
  sendCommitmentDay10TierEmail,
  sendCommitmentDay13PaymentPrepEmail,
  sendCommitmentDay18HowPresaleWorksEmail,
  sendCommitmentDay2ReadinessEmail,
  sendCommitmentDay5WhyBlazeEmail,
  sendCommitmentDay7SecurityEmail,
  sendCommitmentCountdownEmail,
  sendCommitmentLiveEmail,
} from '@/lib/email';

const CRON_SECRET = process.env.CRON_SECRET;

type CommitmentRow = {
  id: string;
  email: string;
  intended_amount_usd: number | null;
  intended_amount_tokens: number | null;
  commitment_tier: number | null;
  created_at: string;
  email_paused?: boolean | null;
};

function getPresaleDate(value: unknown) {
  // site_settings.value is JSONB; for presale_date it is stored as a JSON string.
  if (typeof value === 'string') return new Date(value);
  return null;
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
    const results: { email: string; template: string; success: boolean }[] = [];

    const { data: settingsRow } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'presale_date')
      .maybeSingle();

    const presaleDate =
      getPresaleDate(settingsRow?.value) || new Date('2026-03-01T12:00:00Z');

    const dayCampaigns: { templateKey: string; daysAfterIntent: number }[] = [
      { templateKey: 'commitment_day2_readiness', daysAfterIntent: 2 },
      { templateKey: 'commitment_day5_why_blaze', daysAfterIntent: 5 },
      { templateKey: 'commitment_day7_security', daysAfterIntent: 7 },
      { templateKey: 'commitment_day10_tier', daysAfterIntent: 10 },
      { templateKey: 'commitment_day13_payment_prep', daysAfterIntent: 13 },
      { templateKey: 'commitment_day18_how_presale_works', daysAfterIntent: 18 },
    ];

    const sendDayTemplate = async (templateKey: string, user: CommitmentRow) => {
      switch (templateKey) {
        case 'commitment_day2_readiness':
          return sendCommitmentDay2ReadinessEmail(user.email);
        case 'commitment_day5_why_blaze':
          return sendCommitmentDay5WhyBlazeEmail(user.email);
        case 'commitment_day7_security':
          return sendCommitmentDay7SecurityEmail(user.email);
        case 'commitment_day10_tier':
          return sendCommitmentDay10TierEmail(user.email, {
            tierNumber: user.commitment_tier || 0,
            amountUsd: user.intended_amount_usd || 0,
            estimatedTokens: user.intended_amount_tokens || 0,
          });
        case 'commitment_day13_payment_prep':
          return sendCommitmentDay13PaymentPrepEmail(user.email);
        case 'commitment_day18_how_presale_works':
          return sendCommitmentDay18HowPresaleWorksEmail(user.email);
        default:
          return { success: false as const };
      }
    };

    for (const campaign of dayCampaigns) {
      const daysAgo = new Date(now);
      daysAgo.setDate(daysAgo.getDate() - campaign.daysAfterIntent);

      const dayStart = new Date(daysAgo);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(daysAgo);
      dayEnd.setHours(23, 59, 59, 999);

      const { data: eligibleUsers } = await supabase
        .from('commitments')
        .select('id,email,intended_amount_usd,intended_amount_tokens,commitment_tier,created_at,email_paused')
        .gte('created_at', dayStart.toISOString())
        .lte('created_at', dayEnd.toISOString())
        .neq('email', '')
        .eq('email_paused', false);

      if (!eligibleUsers || eligibleUsers.length === 0) continue;

      const commitmentIds = eligibleUsers.map((u: CommitmentRow) => u.id);
      const { data: sentRows } = await supabase
        .from('commitment_email_sends')
        .select('commitment_id')
        .eq('template_key', campaign.templateKey)
        .in('commitment_id', commitmentIds);

      const sentSet = new Set((sentRows || []).map((r: any) => String(r.commitment_id)));

      for (const user of eligibleUsers as CommitmentRow[]) {
        if (sentSet.has(String(user.id))) continue;
        let success = false;
        try {
          const res = await sendDayTemplate(campaign.templateKey, user);
          success = Boolean((res as any)?.success);
        } catch (err) {
          success = false;
        }

        await supabase.from('commitment_email_sends').insert({
          commitment_id: String(user.id),
          email: user.email,
          template_key: campaign.templateKey,
          status: success ? 'sent' : 'failed',
        });

        if (success) {
          await supabase
            .from('commitments')
            .update({ last_email_sent: campaign.templateKey })
            .eq('id', user.id);
        }

        results.push({ email: user.email, template: campaign.templateKey, success });
      }
    }

    // Countdown reminders (event-driven). Run this cron frequently (e.g. every 15 minutes).
    const countdownTemplates: {
      templateKey: string;
      offsetHours: number;
      label: string;
      cta: string;
    }[] = [
      { templateKey: 'commitment_tminus_48h', offsetHours: 48, label: '48 hours', cta: 'Open BLAZE Wallet' },
      { templateKey: 'commitment_tminus_24h', offsetHours: 24, label: '24 hours', cta: 'Open BLAZE Wallet' },
      { templateKey: 'commitment_tminus_12h', offsetHours: 12, label: '12 hours', cta: 'Open BLAZE Wallet' },
      { templateKey: 'commitment_tminus_6h', offsetHours: 6, label: '6 hours', cta: 'Open BLAZE Wallet' },
      { templateKey: 'commitment_tminus_3h', offsetHours: 3, label: '3 hours', cta: 'Open BLAZE Wallet' },
      { templateKey: 'commitment_tminus_1h', offsetHours: 1, label: '1 hour', cta: 'Open BLAZE Wallet' },
    ];

    const windowMs = 20 * 60 * 1000; // 20 minutes window to tolerate cron drift.

    for (const t of countdownTemplates) {
      const target = new Date(presaleDate.getTime() - t.offsetHours * 60 * 60 * 1000);
      if (now.getTime() < target.getTime() || now.getTime() >= target.getTime() + windowMs) continue;

      const { data: sentRows } = await supabase
        .from('commitment_email_sends')
        .select('commitment_id')
        .eq('template_key', t.templateKey);
      const sentSet = new Set((sentRows || []).map((r: any) => String(r.commitment_id)));

      // Fetch commitments in pages to avoid huge payloads.
      const pageSize = 1000;
      for (let offset = 0; ; offset += pageSize) {
        const { data: commitmentsPage } = await supabase
          .from('commitments')
          .select('id,email,email_paused,created_at')
          .eq('email_paused', false)
          .order('created_at', { ascending: true })
          .range(offset, offset + pageSize - 1);

        if (!commitmentsPage || commitmentsPage.length === 0) break;

        for (const user of commitmentsPage as CommitmentRow[]) {
          if (!user.email || !user.email.includes('@')) continue;
          if (sentSet.has(String(user.id))) continue;

          let success = false;
          try {
            const res = await sendCommitmentCountdownEmail(user.email, t.label, t.cta);
            success = Boolean((res as any)?.success);
          } catch {
            success = false;
          }

          await supabase.from('commitment_email_sends').insert({
            commitment_id: String(user.id),
            email: user.email,
            template_key: t.templateKey,
            status: success ? 'sent' : 'failed',
          });

          results.push({ email: user.email, template: t.templateKey, success });
        }

        if (commitmentsPage.length < pageSize) break;
      }
    }

    // LIVE email (T0)
    const liveTarget = presaleDate;
    if (now.getTime() >= liveTarget.getTime() && now.getTime() < liveTarget.getTime() + windowMs) {
      const templateKey = 'commitment_live';
      const { data: sentRows } = await supabase
        .from('commitment_email_sends')
        .select('commitment_id')
        .eq('template_key', templateKey);
      const sentSet = new Set((sentRows || []).map((r: any) => String(r.commitment_id)));

      const pageSize = 1000;
      for (let offset = 0; ; offset += pageSize) {
        const { data: commitmentsPage } = await supabase
          .from('commitments')
          .select('id,email,email_paused,created_at')
          .eq('email_paused', false)
          .order('created_at', { ascending: true })
          .range(offset, offset + pageSize - 1);

        if (!commitmentsPage || commitmentsPage.length === 0) break;

        for (const user of commitmentsPage as CommitmentRow[]) {
          if (!user.email || !user.email.includes('@')) continue;
          if (sentSet.has(String(user.id))) continue;

          let success = false;
          try {
            const res = await sendCommitmentLiveEmail(user.email);
            success = Boolean((res as any)?.success);
          } catch {
            success = false;
          }

          await supabase.from('commitment_email_sends').insert({
            commitment_id: String(user.id),
            email: user.email,
            template_key: templateKey,
            status: success ? 'sent' : 'failed',
          });

          results.push({ email: user.email, template: templateKey, success });
        }

        if (commitmentsPage.length < pageSize) break;
      }
    }

    return NextResponse.json({
      success: true,
      presaleDate: presaleDate.toISOString(),
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error('Error in commitment campaign cron:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}


