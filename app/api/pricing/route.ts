import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/server';
import { BONUS_TIERS, PRESALE_CONSTANTS } from '@/lib/presale-constants';

// Presale constants from wallet (presale-config.ts)
const PRESALE_PRICE = PRESALE_CONSTANTS.presalePrice; // Fixed presale price
const LAUNCH_PRICE = PRESALE_CONSTANTS.launchPrice;
const PRESALE_DISCOUNT = Math.round((1 - PRESALE_PRICE / LAUNCH_PRICE) * 100); // 58%

// GET: Fetch current pricing tier and all tiers
export async function GET() {
  try {
    // Get current buyer count from database
    const adminSupabase = createAdminClient();
    const { count: buyerCount } = await adminSupabase
      .from('presale_buyers')
      .select('*', { count: 'exact', head: true })
      .in('status', ['confirmed', 'completed']);

    const totalBuyers = buyerCount || 0;

    // Determine current tier based on buyer count
    const currentTierData = BONUS_TIERS.find(tier => 
      totalBuyers >= tier.min_buyers - 1 && totalBuyers < tier.max_buyers
    ) || BONUS_TIERS[0];

    // Calculate spots remaining in current tier
    const spotsRemaining = currentTierData.max_buyers - totalBuyers;

    return NextResponse.json({
      // Presale info from wallet
      presalePrice: PRESALE_PRICE,
      launchPrice: LAUNCH_PRICE,
      presaleDiscount: PRESALE_DISCOUNT,
      
      // Current tier with bonus info
      currentTier: {
        ...currentTierData,
        price_usd: PRESALE_PRICE, // Same price for all tiers
        spotsRemaining,
        discountPercentage: PRESALE_DISCOUNT,
      },
      
      // All bonus tiers
      allTiers: BONUS_TIERS.map(tier => ({
        ...tier,
        price_usd: PRESALE_PRICE, // Same price for all
        isCurrent: tier.tier_number === currentTierData.tier_number,
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

