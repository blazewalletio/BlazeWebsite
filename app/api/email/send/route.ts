import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import {
  sendWelcomeEmail,
  sendWhyBlazeEmail,
  sendSocialProofEmail,
  sendFomoPricingEmail,
  sendExclusiveBonusEmail,
  sendPresaleCountdownEmail,
  sendCommitmentConfirmation,
  sendCommitmentDay2ReadinessEmail,
  sendCommitmentDay5WhyBlazeEmail,
  sendCommitmentDay7SecurityEmail,
  sendCommitmentDay10TierEmail,
  sendCommitmentDay13PaymentPrepEmail,
  sendCommitmentDay18HowPresaleWorksEmail,
  sendCommitmentCountdownEmail,
  sendCommitmentLiveEmail,
  sendCommitmentApologyEmail,
} from '@/lib/email';
import { PRESALE_CONSTANTS } from '@/lib/presale-constants';

function parsePresaleDateFromSettings(value: unknown) {
  if (typeof value !== 'string') return null;
  let raw = value;
  try {
    const parsed = JSON.parse(value);
    if (typeof parsed === 'string') raw = parsed;
  } catch {
    // ignore
  }
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return null;
  return d;
}

// POST: Send a specific email to a specific address or broadcast to all
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { template, email, broadcast } = body;

    if (!template) {
      return NextResponse.json({ error: 'Template is required' }, { status: 400 });
    }

    const supabase = createAdminClient();
    const results: { email: string; success: boolean; error?: string }[] = [];

    // Get recipients
    let recipients: { email: string; referral_code: string; total_referral_count: number }[] = [];

    if (broadcast) {
      // Get all active waitlist subscribers
      const { data: subscribers } = await supabase
        .from('waitlist')
        .select('email, referral_code, total_referral_count')
        .eq('email_paused', false);
      
      recipients = subscribers || [];
    } else if (email) {
      // Single recipient - check if they're on waitlist or use provided email
      const { data: subscriber } = await supabase
        .from('waitlist')
        .select('email, referral_code, total_referral_count')
        .eq('email', email)
        .single();

      if (subscriber) {
        recipients = [subscriber];
      } else {
        // Not on waitlist, create temporary recipient
        recipients = [{ 
          email, 
          referral_code: 'TEST123', 
          total_referral_count: 0 
        }];
      }
    } else {
      return NextResponse.json({ error: 'Email or broadcast flag required' }, { status: 400 });
    }

    if (recipients.length === 0) {
      return NextResponse.json({ error: 'No recipients found' }, { status: 400 });
    }

    // Safety: some templates are not intended to be broadcast to all waitlist subscribers from here.
    if (broadcast && (String(template).startsWith('commitment_') || template === 'commitment_apology')) {
      return NextResponse.json(
        { error: 'Commitment templates can only be sent as a test email from here (no broadcast).' },
        { status: 400 }
      );
    }

    // Get data for emails
    const { count: waitlistCount } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    const { data: tierData } = await supabase
      .from('pricing_tiers')
      .select('*')
      .eq('is_active', true)
      .order('tier_number')
      .limit(1);

    const currentTier = tierData?.[0];

    const { data: settingsRow } = await supabase
      .from('site_settings')
      .select('value')
      .eq('key', 'presale_date')
      .maybeSingle();
    const presaleDate =
      parsePresaleDateFromSettings(settingsRow?.value) || new Date('2026-03-16T12:00:00Z');

    // Send emails
    for (const recipient of recipients) {
      try {
        let success = false;

        switch (template) {
          case 'welcome':
            const welcomeResult = await sendWelcomeEmail(recipient.email, recipient.referral_code || 'BLAZE');
            success = welcomeResult.success;
            break;

          case 'why_blaze':
            const whyResult = await sendWhyBlazeEmail(recipient.email, recipient.referral_code || 'BLAZE');
            success = whyResult.success;
            break;

          case 'social_proof':
            const socialResult = await sendSocialProofEmail(
              recipient.email,
              recipient.referral_code || 'BLAZE',
              waitlistCount || 0
            );
            success = socialResult.success;
            break;

          case 'fomo_pricing':
            const fomoResult = await sendFomoPricingEmail(
              recipient.email,
              recipient.referral_code || 'BLAZE',
              {
                name: currentTier?.tier_name || 'Founders',
                price: currentTier?.price_usd || PRESALE_CONSTANTS.presalePrice,
                spotsLeft: currentTier?.max_buyers || 100,
              }
            );
            success = fomoResult.success;
            break;

          case 'exclusive_bonus':
            const bonusResult = await sendExclusiveBonusEmail(
              recipient.email,
              recipient.referral_code || 'BLAZE',
              recipient.total_referral_count || 0
            );
            success = bonusResult.success;
            break;

          case 'presale_countdown':
            const presaleCountdownDate = new Date('2026-03-01');
            const daysUntil = Math.ceil((presaleCountdownDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
            const countdownResult = await sendPresaleCountdownEmail(
              recipient.email,
              recipient.referral_code || 'BLAZE',
              daysUntil
            );
            success = countdownResult.success;
            break;

          case 'commitment_apology':
            const apologyResult = await sendCommitmentApologyEmail(recipient.email, presaleDate.toISOString());
            success = apologyResult.success;
            break;

          case 'commitment_confirmation': {
            // Test-sending: use representative sample values. The real confirmation is sent on intent signup.
            const confirmationResult = await sendCommitmentConfirmation({
              email: recipient.email,
              amountUsd: 500,
              estimatedTokens: 60000,
              bonusPercentage: 10,
              tierName: 'Founders',
            });
            success = confirmationResult.success;
            break;
          }

          case 'commitment_day2_readiness': {
            const r = await sendCommitmentDay2ReadinessEmail(recipient.email);
            success = r.success;
            break;
          }

          case 'commitment_day5_why_blaze': {
            const r = await sendCommitmentDay5WhyBlazeEmail(recipient.email);
            success = r.success;
            break;
          }

          case 'commitment_day7_security': {
            const r = await sendCommitmentDay7SecurityEmail(recipient.email);
            success = r.success;
            break;
          }

          case 'commitment_day10_tier': {
            const r = await sendCommitmentDay10TierEmail(recipient.email, {
              tierNumber: 1,
              amountUsd: 500,
              estimatedTokens: 60000,
            });
            success = r.success;
            break;
          }

          case 'commitment_day13_payment_prep': {
            const r = await sendCommitmentDay13PaymentPrepEmail(recipient.email);
            success = r.success;
            break;
          }

          case 'commitment_day18_how_presale_works': {
            const r = await sendCommitmentDay18HowPresaleWorksEmail(recipient.email);
            success = r.success;
            break;
          }

          case 'commitment_tminus_48h': {
            const r = await sendCommitmentCountdownEmail(recipient.email, '48 hours', 'Open BLAZE Wallet');
            success = r.success;
            break;
          }

          case 'commitment_tminus_24h': {
            const r = await sendCommitmentCountdownEmail(recipient.email, '24 hours', 'Open BLAZE Wallet');
            success = r.success;
            break;
          }

          case 'commitment_tminus_12h': {
            const r = await sendCommitmentCountdownEmail(recipient.email, '12 hours', 'Open BLAZE Wallet');
            success = r.success;
            break;
          }

          case 'commitment_tminus_6h': {
            const r = await sendCommitmentCountdownEmail(recipient.email, '6 hours', 'Open BLAZE Wallet');
            success = r.success;
            break;
          }

          case 'commitment_tminus_3h': {
            const r = await sendCommitmentCountdownEmail(recipient.email, '3 hours', 'Open BLAZE Wallet');
            success = r.success;
            break;
          }

          case 'commitment_tminus_1h': {
            const r = await sendCommitmentCountdownEmail(recipient.email, '1 hour', 'Open BLAZE Wallet');
            success = r.success;
            break;
          }

          case 'commitment_live': {
            const r = await sendCommitmentLiveEmail(recipient.email);
            success = r.success;
            break;
          }

          default:
            results.push({ email: recipient.email, success: false, error: 'Unknown template' });
            continue;
        }

        results.push({ email: recipient.email, success });

        // Record the send (if not a test to non-subscriber)
        if (success && broadcast) {
          const { data: waitlistUser } = await supabase
            .from('waitlist')
            .select('id')
            .eq('email', recipient.email)
            .single();

          if (waitlistUser) {
            await supabase.from('email_sends').insert({
              waitlist_id: waitlistUser.id,
              email: recipient.email,
              template_key: `manual_${template}`,
              status: 'sent',
            });
          }
        }

        // Small delay to avoid rate limiting
        if (recipients.length > 1) {
          await new Promise(resolve => setTimeout(resolve, 100));
        }
      } catch (err: any) {
        results.push({ email: recipient.email, success: false, error: err.message });
      }
    }

    const successCount = results.filter(r => r.success).length;
    const failedCount = results.filter(r => !r.success).length;

    return NextResponse.json({
      success: true,
      sent: successCount,
      failed: failedCount,
      total: recipients.length,
      results,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

