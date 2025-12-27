import { NextResponse } from 'next/server';
import { createClient, createAdminClient } from '@/lib/supabase/server';

// Presale constants from wallet (presale-config.ts)
const PRESALE_PRICE = 0.00417; // Fixed price from wallet
const LAUNCH_PRICE = 0.01;
const PRESALE_DISCOUNT = Math.round((1 - PRESALE_PRICE / LAUNCH_PRICE) * 100); // 58%

// Bonus tiers - everyone pays same price, early buyers get bonus tokens
const BONUS_TIERS = [
  { tier_number: 1, tier_name: 'Founders', min_buyers: 1, max_buyers: 100, bonus_percentage: 100 },
  { tier_number: 2, tier_name: 'Early Birds', min_buyers: 101, max_buyers: 250, bonus_percentage: 75 },
  { tier_number: 3, tier_name: 'Pioneers', min_buyers: 251, max_buyers: 500, bonus_percentage: 50 },
  { tier_number: 4, tier_name: 'Adopters', min_buyers: 501, max_buyers: 1000, bonus_percentage: 30 },
  { tier_number: 5, tier_name: 'Supporters', min_buyers: 1001, max_buyers: 2000, bonus_percentage: 15 },
  { tier_number: 6, tier_name: 'Public', min_buyers: 2001, max_buyers: 999999, bonus_percentage: 0 },
];

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

