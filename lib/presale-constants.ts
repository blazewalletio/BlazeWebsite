// BLAZE Presale Constants - synced with wallet presale-config.ts
// Source: ~/Desktop/blazewallet-app/lib/presale-config.ts

export const PRESALE_CONSTANTS = {
  // Token info
  totalSupply: 1_000_000_000, // 1 billion BLAZE
  presaleAllocation: 120_000_000, // 120M BLAZE for presale (12%)
  
  // Pricing
  presalePrice: 0.00417, // $0.00417 per BLAZE (from wallet)
  launchPrice: 0.01, // $0.01 per BLAZE after presale
  
  // Caps
  hardCap: 500_000, // $500k
  softCap: 100_000, // $100k
  
  // Contribution limits
  minContribution: 100, // $100 minimum
  maxContribution: 10_000, // $10,000 maximum per wallet
  
  // Calculated values
  get presaleDiscount() {
    return Math.round((1 - this.presalePrice / this.launchPrice) * 100);
  },
  
  get maxTokensAtPresalePrice() {
    return Math.floor(this.hardCap / this.presalePrice);
  },
};

// Early bird bonus tiers - bonus tokens for early supporters
// Base price is always $0.00417, bonuses are extra tokens
export const BONUS_TIERS = [
  {
    tier_number: 1,
    tier_name: 'Founders',
    min_buyers: 1,
    max_buyers: 100,
    bonus_percentage: 100, // +100% bonus = 2x tokens!
  },
  {
    tier_number: 2,
    tier_name: 'Early Birds',
    min_buyers: 101,
    max_buyers: 250,
    bonus_percentage: 75, // +75% bonus tokens
  },
  {
    tier_number: 3,
    tier_name: 'Pioneers',
    min_buyers: 251,
    max_buyers: 500,
    bonus_percentage: 50, // +50% bonus tokens
  },
  {
    tier_number: 4,
    tier_name: 'Adopters',
    min_buyers: 501,
    max_buyers: 1000,
    bonus_percentage: 30, // +30% bonus tokens
  },
  {
    tier_number: 5,
    tier_name: 'Supporters',
    min_buyers: 1001,
    max_buyers: 2000,
    bonus_percentage: 15, // +15% bonus tokens
  },
  {
    tier_number: 6,
    tier_name: 'Public',
    min_buyers: 2001,
    max_buyers: 999999,
    bonus_percentage: 0, // No bonus
  },
];

// Helper function to calculate tokens for investment amount
export function calculateTokens(amountUsd: number, bonusPercentage: number = 0) {
  const baseTokens = amountUsd / PRESALE_CONSTANTS.presalePrice;
  const bonusTokens = baseTokens * (bonusPercentage / 100);
  return {
    baseTokens: Math.floor(baseTokens),
    bonusTokens: Math.floor(bonusTokens),
    totalTokens: Math.floor(baseTokens + bonusTokens),
    pricePerToken: PRESALE_CONSTANTS.presalePrice,
    valueAtLaunch: Math.floor(baseTokens + bonusTokens) * PRESALE_CONSTANTS.launchPrice,
  };
}

// Helper to get current tier based on buyer count
export function getCurrentTier(buyerCount: number) {
  return BONUS_TIERS.find(tier => 
    buyerCount >= tier.min_buyers - 1 && buyerCount < tier.max_buyers
  ) || BONUS_TIERS[BONUS_TIERS.length - 1];
}

