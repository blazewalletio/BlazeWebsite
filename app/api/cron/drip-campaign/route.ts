import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import {
  sendWhyBlazeEmail,
  sendSocialProofEmail,
  sendFomoPricingEmail,
  sendExclusiveBonusEmail,
  sendPresaleCountdownEmail,
} from '@/lib/email';

// Cron secret for security
const CRON_SECRET = process.env.CRON_SECRET;

export async function GET(request: Request) {
  try {
    // Verify cron secret
    const authHeader = request.headers.get('authorization');
    if (CRON_SECRET && authHeader !== `Bearer ${CRON_SECRET}`) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const supabase = createAdminClient();
    const now = new Date();
    const results: { email: string; template: string; success: boolean }[] = [];

    // Get email campaigns configuration
    const { data: campaigns } = await supabase
      .from('email_campaigns')
      .select('*')
      .eq('is_active', true)
      .eq('campaign_type', 'drip')
      .order('sequence_order');

    if (!campaigns || campaigns.length === 0) {
      return NextResponse.json({ message: 'No active campaigns', results: [] });
    }

    // Get current waitlist count for social proof emails
    const { count: waitlistCount } = await supabase
      .from('waitlist')
      .select('*', { count: 'exact', head: true });

    // Get current pricing tier info
    const { data: currentTierData } = await supabase
      .from('pricing_tiers')
      .select('*')
      .eq('is_active', true)
      .order('tier_number')
      .limit(1);
    
    const currentTier = currentTierData?.[0];

    // Process each campaign
    for (const campaign of campaigns) {
      if (campaign.template_key === 'welcome') continue; // Welcome is sent immediately on signup

      // Calculate the date threshold for this campaign
      const daysAgo = new Date(now);
      daysAgo.setDate(daysAgo.getDate() - campaign.days_after_signup);

      // Find users who:
      // 1. Signed up exactly X days ago (within a day window)
      // 2. Haven't received this email yet
      // 3. Aren't paused
      const dayStart = new Date(daysAgo);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(daysAgo);
      dayEnd.setHours(23, 59, 59, 999);

      const { data: eligibleUsers } = await supabase
        .from('waitlist')
        .select(`
          id,
          email,
          referral_code,
          total_referral_count,
          email_paused
        `)
        .gte('created_at', dayStart.toISOString())
        .lte('created_at', dayEnd.toISOString())
        .eq('email_paused', false);

      if (!eligibleUsers || eligibleUsers.length === 0) continue;

      for (const user of eligibleUsers) {
        // Check if email was already sent
        const { data: existingSend } = await supabase
          .from('email_sends')
          .select('id')
          .eq('waitlist_id', user.id)
          .eq('template_key', campaign.template_key)
          .single();

        if (existingSend) continue; // Already sent

        // Send the appropriate email
        let success = false;
        try {
          switch (campaign.template_key) {
            case 'why_blaze':
              const whyResult = await sendWhyBlazeEmail(user.email, user.referral_code);
              success = whyResult.success;
              break;

            case 'social_proof':
              const socialResult = await sendSocialProofEmail(
                user.email,
                user.referral_code,
                waitlistCount || 0
              );
              success = socialResult.success;
              break;

            case 'fomo_pricing':
              const fomoResult = await sendFomoPricingEmail(user.email, user.referral_code, {
                name: currentTier?.tier_name || 'Founders',
                price: currentTier?.price_usd || 0.0015,
                spotsLeft: currentTier?.max_buyers || 100,
              });
              success = fomoResult.success;
              break;

            case 'exclusive_bonus':
              const bonusResult = await sendExclusiveBonusEmail(
                user.email,
                user.referral_code,
                user.total_referral_count || 0
              );
              success = bonusResult.success;
              break;

            case 'presale_countdown':
              // Calculate days until presale (Q1 2026 = ~90 days from now, adjust as needed)
              const presaleDate = new Date('2026-03-01');
              const daysUntil = Math.ceil((presaleDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
              const countdownResult = await sendPresaleCountdownEmail(
                user.email,
                user.referral_code,
                daysUntil
              );
              success = countdownResult.success;
              break;
          }

          // Record the email send
          if (success) {
            await supabase.from('email_sends').insert({
              waitlist_id: user.id,
              campaign_id: campaign.id,
              email: user.email,
              template_key: campaign.template_key,
              status: 'sent',
            });

            // Update last email sent on waitlist
            await supabase
              .from('waitlist')
              .update({ last_email_sent: campaign.template_key })
              .eq('id', user.id);
          }

          results.push({
            email: user.email,
            template: campaign.template_key,
            success,
          });
        } catch (emailError) {
          console.error(`Failed to send ${campaign.template_key} to ${user.email}:`, emailError);
          results.push({
            email: user.email,
            template: campaign.template_key,
            success: false,
          });
        }
      }
    }

    return NextResponse.json({
      success: true,
      processed: results.length,
      results,
    });
  } catch (error) {
    console.error('Error in drip campaign cron:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

