import { NextResponse } from 'next/server';
import { createAdminClient, createClient } from '@/lib/supabase/server';
import { sendCommitmentConfirmation } from '@/lib/email';

// GET: Fetch user's commitment
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const supabase = createAdminClient();
    
    const { data: commitment, error } = await supabase
      .from('commitments')
      .select('*')
      .eq('email', email)
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

    if (!email || !intendedAmountUsd) {
      return NextResponse.json(
        { error: 'Email and intended amount are required' },
        { status: 400 }
      );
    }

    if (intendedAmountUsd < 10) {
      return NextResponse.json(
        { error: 'Minimum commitment is $10' },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    // Get current pricing tier to calculate tokens
    const { data: currentTierData } = await supabase
      .from('pricing_tiers')
      .select('*')
      .eq('is_active', true)
      .order('tier_number')
      .limit(1);

    const currentTier = currentTierData?.[0];
    const pricePerToken = currentTier?.price_usd || 0.005;
    const bonusPercentage = currentTier?.bonus_percentage || 0;
    
    // Calculate estimated tokens
    const baseTokens = intendedAmountUsd / pricePerToken;
    const bonusTokens = baseTokens * (bonusPercentage / 100);
    const totalTokens = baseTokens + bonusTokens;

    // Check if user exists in waitlist
    const { data: waitlistUser } = await supabase
      .from('waitlist')
      .select('id')
      .eq('email', email)
      .single();

    // Upsert commitment
    const { data: commitment, error } = await supabase
      .from('commitments')
      .upsert({
        email,
        waitlist_id: waitlistUser?.id || null,
        intended_amount_usd: intendedAmountUsd,
        intended_amount_tokens: totalTokens,
        commitment_tier: currentTier?.tier_number || 1,
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

    // Send confirmation email
    try {
      await sendCommitmentConfirmation({
        email,
        amountUsd: intendedAmountUsd,
        estimatedTokens: Math.round(totalTokens),
        bonusPercentage,
        tierName: currentTier?.tier_name || 'Founders',
      });
    } catch (emailError) {
      console.error('Failed to send commitment email:', emailError);
      // Don't fail the request if email fails
    }

    return NextResponse.json({
      success: true,
      commitment: {
        email,
        amountUsd: intendedAmountUsd,
        estimatedTokens: Math.round(totalTokens),
        baseTokens: Math.round(baseTokens),
        bonusTokens: Math.round(bonusTokens),
        bonusPercentage,
        tierName: currentTier?.tier_name || 'Founders',
        pricePerToken,
      },
    });
  } catch (error) {
    console.error('Error in commitment POST:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

