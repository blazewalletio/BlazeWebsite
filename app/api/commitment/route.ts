import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import {
  sendCommitmentConfirmation,
  sendCommitmentNotification,
  sendNewSignupNotification,
  sendWelcomeEmail,
} from '@/lib/email';

// Presale constants from wallet
const PRESALE_PRICE = 0.00834;
const BONUS_TIERS = [
  { tier_number: 1, tier_name: 'Founders', min_buyers: 1, max_buyers: 100, bonus_percentage: 100 },
  { tier_number: 2, tier_name: 'Early Birds', min_buyers: 101, max_buyers: 250, bonus_percentage: 75 },
  { tier_number: 3, tier_name: 'Pioneers', min_buyers: 251, max_buyers: 500, bonus_percentage: 50 },
  { tier_number: 4, tier_name: 'Adopters', min_buyers: 501, max_buyers: 1000, bonus_percentage: 30 },
  { tier_number: 5, tier_name: 'Supporters', min_buyers: 1001, max_buyers: 2000, bonus_percentage: 15 },
  { tier_number: 6, tier_name: 'Public', min_buyers: 2001, max_buyers: 999999, bonus_percentage: 0 },
];

function getCurrentTier(buyerCount: number) {
  return BONUS_TIERS.find(tier => 
    buyerCount >= tier.min_buyers - 1 && buyerCount < tier.max_buyers
  ) || BONUS_TIERS[0];
}

function generateReferralCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = 'BLAZE';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

// GET: Fetch user's commitment
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    const normalizedEmail = email?.toLowerCase().trim();

    if (!normalizedEmail) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const supabase = createAdminClient();
    
    const { data: commitment, error } = await supabase
      .from('commitments')
      .select('*')
      .eq('email', normalizedEmail)
      .single();

    if (error && error.code !== 'PGRST116') { // PGRST116 = not found
      console.error('Error fetching commitment:', error);
      return NextResponse.json({ error: 'Failed to fetch commitment' }, { status: 500 });
    }

    return NextResponse.json({ commitment });
  } catch (error) {
    console.error('Error in commitment GET:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// POST: Create or update commitment
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, intendedAmountUsd, notes } = body;
    const normalizedEmail = email?.toLowerCase().trim();

    if (!normalizedEmail || !intendedAmountUsd) {
      return NextResponse.json(
        { error: 'Email and intended amount are required' },
        { status: 400 }
      );
    }

    if (intendedAmountUsd < 100) {
      return NextResponse.json(
        { error: 'Minimum investment is $100' },
        { status: 400 }
      );
    }

    if (intendedAmountUsd > 10000) {
      return NextResponse.json(
        { error: 'Maximum investment is $10,000 per wallet' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Get current commitment count to determine tier
    const { count: commitmentCount } = await supabase
      .from('commitments')
      .select('*', { count: 'exact', head: true });

    const currentTier = getCurrentTier(commitmentCount || 0);
    const bonusPercentage = currentTier.bonus_percentage;
    
    // Calculate estimated tokens using fixed presale price
    const baseTokens = intendedAmountUsd / PRESALE_PRICE;
    const bonusTokens = baseTokens * (bonusPercentage / 100);
    const totalTokens = baseTokens + bonusTokens;

    // Check if user exists in waitlist, if not add them
    let isNewWaitlistSignup = false;
    let { data: waitlistUser } = await supabase
      .from('waitlist')
      .select('id, referral_code')
      .eq('email', normalizedEmail)
      .single();

    // If not on waitlist, add them
    if (!waitlistUser) {
      const referralCode = generateReferralCode();
      const { data: newWaitlistUser } = await supabase
        .from('waitlist')
        .insert({
          email: normalizedEmail,
          source: 'commitment',
          referral_code: referralCode,
        })
        .select('id, referral_code')
        .single();
      waitlistUser = newWaitlistUser;
      isNewWaitlistSignup = true;
    }

    // Upsert commitment
    const { data: commitment, error } = await supabase
      .from('commitments')
      .upsert({
        email: normalizedEmail,
        waitlist_id: waitlistUser?.id || null,
        intended_amount_usd: intendedAmountUsd,
        intended_amount_tokens: Math.round(totalTokens),
        commitment_tier: currentTier.tier_number,
        notes: notes || null,
        updated_at: new Date().toISOString(),
      }, {
        onConflict: 'email',
      })
      .select()
      .single();

    if (error) {
      console.error('Error creating commitment:', error);
      return NextResponse.json({ error: 'Failed to save commitment' }, { status: 500 });
    }

    // Send confirmation email to user
    try {
      await sendCommitmentConfirmation({
        email: normalizedEmail,
        amountUsd: intendedAmountUsd,
        estimatedTokens: Math.round(totalTokens),
        bonusPercentage,
        tierName: currentTier.tier_name,
      });
    } catch (emailError) {
      console.error('Failed to send commitment confirmation email:', emailError);
    }

    // Send notification to admin
    try {
      await sendCommitmentNotification({
        email: normalizedEmail,
        amountUsd: intendedAmountUsd,
        estimatedTokens: Math.round(totalTokens),
        tierName: currentTier.tier_name,
      });
    } catch (emailError) {
      console.error('Failed to send admin notification:', emailError);
    }

    // Ensure commitment-based signups receive the same base waitlist email flow
    if (isNewWaitlistSignup && waitlistUser?.referral_code) {
      try {
        await sendNewSignupNotification(normalizedEmail, 'commitment');
      } catch (emailError) {
        console.error('Failed to send waitlist admin signup notification:', emailError);
      }

      try {
        await sendWelcomeEmail(normalizedEmail, waitlistUser.referral_code);
      } catch (emailError) {
        console.error('Failed to send waitlist welcome email from commitment flow:', emailError);
      }
    }

    return NextResponse.json({
      success: true,
      commitment: {
        email: normalizedEmail,
        amountUsd: intendedAmountUsd,
        estimatedTokens: Math.round(totalTokens),
        baseTokens: Math.round(baseTokens),
        bonusTokens: Math.round(bonusTokens),
        bonusPercentage,
        tierName: currentTier.tier_name,
        pricePerToken: PRESALE_PRICE,
      },
    });
  } catch (error) {
    console.error('Error in commitment POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

