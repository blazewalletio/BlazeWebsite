import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

// GET: Fetch current pricing tier and all tiers
export async function GET() {
  try {
    const supabase = createClient();

    // Get all pricing tiers
    const { data: tiers, error: tiersError } = await supabase
      .from('pricing_tiers')
      .select('*')
      .eq('is_active', true)
      .order('tier_number');

    if (tiersError) {
      console.error('Error fetching pricing tiers:', tiersError);
      return NextResponse.json({ error: 'Failed to fetch pricing tiers' }, { status: 500 });
    }

    // Get current buyer count
    const adminSupabase = createAdminClient();
    const { count: buyerCount, error: countError } = await adminSupabase
      .from('presale_buyers')
      .select('*', { count: 'exact', head: true })
      .in('status', ['confirmed', 'completed']);

    const totalBuyers = buyerCount || 0;

    // Determine current tier
    const currentTier = tiers?.find(tier => 
      totalBuyers >= tier.min_buyers - 1 && totalBuyers < tier.max_buyers
    ) || tiers?.[0];

    // Calculate spots remaining in current tier
    const spotsRemaining = currentTier ? currentTier.max_buyers - totalBuyers : 0;

    // Calculate discount from public price ($0.005)
    const publicPrice = 0.005;
    const discountPercentage = currentTier 
      ? Math.round((1 - currentTier.price_usd / publicPrice) * 100)
      : 0;

    return NextResponse.json({
      currentTier: currentTier ? {
        ...currentTier,
        spotsRemaining,
        discountPercentage,
      } : null,
      allTiers: tiers?.map(tier => ({
        ...tier,
        isCurrent: tier.tier_number === currentTier?.tier_number,
        isPast: tier.max_buyers <= totalBuyers,
        spotsRemaining: Math.max(0, tier.max_buyers - totalBuyers),
      })),
      totalBuyers,
    });
  } catch (error) {
    console.error('Error in pricing API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

