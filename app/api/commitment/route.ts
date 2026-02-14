import { NextResponse } from 'next/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import {
  sendCommitmentConfirmation,
  sendCommitmentNotification,
  sendNewSignupNotification,
  sendWelcomeEmail,
} from '@/lib/email';
import { getCurrentTier, PRESALE_CONSTANTS } from '@/lib/presale-constants';

// Presale constants from wallet
const PRESALE_PRICE = PRESALE_CONSTANTS.presalePrice;

function createServiceRoleClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
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

    const supabase = createServiceRoleClient();
    
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

    const supabase = createServiceRoleClient();

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

    // Check if user exists in waitlist, if not add them.
    // Use a list query instead of .single() to avoid errors when duplicate records exist.
    let isNewWaitlistSignup = false;
    let waitlistUser: { id: string; referral_code: string | null } | null = null;

    const { data: waitlistRows, error: waitlistLookupError } = await supabase
      .from('waitlist')
      .select('id, referral_code')
      .eq('email', normalizedEmail)
      .order('created_at', { ascending: true })
      .limit(1);

    if (waitlistLookupError) {
      console.error('Error looking up waitlist user for commitment:', waitlistLookupError);
    } else {
      waitlistUser = waitlistRows?.[0] ?? null;
    }

    // If not on waitlist, add them.
    if (!waitlistUser) {
      const referralCode = generateReferralCode();
      const { data: newWaitlistUser, error: insertWaitlistError } = await supabase
        .from('waitlist')
        .insert({
          email: normalizedEmail,
          source: 'commitment',
          referral_code: referralCode,
        })
        .select('id, referral_code')
        .single();

      if (!insertWaitlistError && newWaitlistUser) {
        waitlistUser = newWaitlistUser;
        isNewWaitlistSignup = true;
      } else {
        // Race-safe fallback: if insert failed (e.g. duplicate key), fetch existing row once more.
        if (insertWaitlistError) {
          console.error('Failed to insert waitlist user from commitment flow:', insertWaitlistError);
        }
        const { data: fallbackRows } = await supabase
          .from('waitlist')
          .select('id, referral_code')
          .eq('email', normalizedEmail)
          .order('created_at', { ascending: true })
          .limit(1);
        waitlistUser = fallbackRows?.[0] ?? null;
      }
    }

    // Enforce one intent per email: return early if one already exists.
    const { data: existingCommitment, error: existingCommitmentError } = await supabase
      .from('commitments')
      .select('id')
      .eq('email', normalizedEmail)
      .limit(1)
      .maybeSingle();

    if (existingCommitmentError) {
      console.error('Error checking existing commitment:', existingCommitmentError);
      return NextResponse.json({ error: 'Failed to validate existing commitment' }, { status: 500 });
    }

    if (existingCommitment) {
      return NextResponse.json(
        { error: 'An intent is already registered for this email address.' },
        { status: 409 }
      );
    }

    // Insert commitment (no updates allowed for existing emails).
    const { data: commitment, error } = await supabase
      .from('commitments')
      .insert({
        email: normalizedEmail,
        waitlist_id: waitlistUser?.id || null,
        intended_amount_usd: intendedAmountUsd,
        intended_amount_tokens: Math.round(totalTokens),
        commitment_tier: currentTier.tier_number,
        notes: notes || null,
        updated_at: new Date().toISOString(),
      })
      .select()
      .single();

    if (error) {
      if ((error as { code?: string }).code === '23505') {
        return NextResponse.json(
          { error: 'An intent is already registered for this email address.' },
          { status: 409 }
        );
      }
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

