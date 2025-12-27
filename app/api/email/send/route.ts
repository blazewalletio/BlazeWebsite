import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import {
  sendWelcomeEmail,
  sendWhyBlazeEmail,
  sendSocialProofEmail,
  sendFomoPricingEmail,
  sendExclusiveBonusEmail,
  sendPresaleCountdownEmail,
} from '@/lib/email';

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
                price: currentTier?.price_usd || 0.00834,
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
            const presaleDate = new Date('2026-03-01');
            const daysUntil = Math.ceil((presaleDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));
            const countdownResult = await sendPresaleCountdownEmail(
              recipient.email,
              recipient.referral_code || 'BLAZE',
              daysUntil
            );
            success = countdownResult.success;
            break;

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

