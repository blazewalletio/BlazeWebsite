'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import { 
  Calendar, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Twitter,
  Users,
  DollarSign,
  Target,
  Lightbulb,
  ArrowRight,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

// =============================================================================
// MARKETING CONTENT - HONEST, PROFESSIONAL, ON-BRAND
// =============================================================================

interface MarketingPost {
  id: string;
  day: number;
  week: number;
  phase: string;
  type: 'text' | 'thread' | 'image' | 'poll';
  title: string;
  content: string;
  hashtags: string[];
  visual: {
    style: 'dark' | 'light' | 'gradient';
    headline: string;
    subheadline?: string;
    bullets?: string[];
    stat?: { value: string; label: string };
    showLogo?: boolean;
    accent?: 'orange' | 'green' | 'blue' | 'gold';
  };
  tip?: string;
}

const MARKETING_POSTS: MarketingPost[] = [
  // ==========================================================================
  // WEEK 1: EDUCATION - WHAT MAKES BLAZE UNIQUE
  // ==========================================================================
  {
    id: 'w1d1',
    day: 1,
    week: 1,
    phase: 'Education',
    type: 'text',
    title: 'Smart Schedule Introduction',
    content: `Did you know gas fees on Ethereum can vary up to 10x within a single day?

Smart Schedule analyzes real-time gas prices and executes your transaction at the cheapest moment.

Automatically. Up to 40% savings.

No other wallet does this.

blazewallet.io`,
    hashtags: ['crypto', 'DeFi', 'Ethereum', 'gasfees'],
    visual: {
      style: 'dark',
      headline: 'Smart Schedule',
      subheadline: 'Save up to 40% on gas fees',
      bullets: ['Real-time gas analysis', 'Automatic execution', 'You set the max, we do the rest'],
      accent: 'orange',
    },
    tip: 'Best posted during high gas periods for relevance',
  },
  {
    id: 'w1d2',
    day: 2,
    week: 1,
    phase: 'Education',
    type: 'text',
    title: 'AI Assistant Feature',
    content: `"Send 100 USDC to @friend"

That's it. No menus. No searching for addresses.

BLAZE AI understands what you want.

The first wallet that actually gets you.

blazewallet.io`,
    hashtags: ['AI', 'crypto', 'Web3', 'UX'],
    visual: {
      style: 'dark',
      headline: '"Send 100 USDC to mom"',
      subheadline: 'The wallet that understands you',
      accent: 'blue',
    },
    tip: 'Conversational tone works well here',
  },
  {
    id: 'w1d3',
    day: 3,
    week: 1,
    phase: 'Education',
    type: 'text',
    title: 'QuickPay Explanation',
    content: `Paying with crypto at a store:

The old way:
→ Ask for their address
→ Copy it (hopefully no typo)
→ Choose network
→ Set gas
→ Wait for confirmation

BLAZE QuickPay:
→ Scan QR
→ Confirm

Simple. Not faster blockchain, just way less hassle.

blazewallet.io`,
    hashtags: ['QuickPay', 'crypto', 'payments', 'UX'],
    visual: {
      style: 'light',
      headline: 'QuickPay',
      subheadline: 'Scan. Confirm. Done.',
      bullets: ['No copy-pasting addresses', 'No network confusion', 'No manual gas settings'],
      accent: 'orange',
    },
  },
  {
    id: 'w1d4',
    day: 4,
    week: 1,
    phase: 'Education',
    type: 'text',
    title: 'Scam Protection',
    content: `$3.8 billion lost to crypto scams in 2024.

BLAZE scans EVERY transaction:
✓ Address reputation check
✓ Smart contract analysis
✓ Real-time risk score
✓ Warning before you confirm

You see the risk BEFORE you lose your crypto.

blazewallet.io`,
    hashtags: ['security', 'crypto', 'scam', 'protection'],
    visual: {
      style: 'dark',
      headline: 'Scam Protection',
      subheadline: 'See the risk before you send',
      stat: { value: '$3.8B', label: 'Lost to scams in 2024' },
      accent: 'green',
    },
    tip: 'Security resonates strongly - good engagement post',
  },
  {
    id: 'w1d5',
    day: 5,
    week: 1,
    phase: 'Education',
    type: 'text',
    title: 'All-in-One Solution',
    content: `How many crypto apps do you have?

• Wallet for storage
• DEX for swaps
• Bridge for cross-chain
• Exchange for on-ramp
• Another exchange for off-ramp

BLAZE: Everything in 1 app.

Swap. Bridge. On-ramp. Off-ramp. 18+ chains.

One wallet. Done.

blazewallet.io`,
    hashtags: ['crypto', 'wallet', 'DeFi', 'allinone'],
    visual: {
      style: 'light',
      headline: 'All-in-One',
      subheadline: 'Stop juggling 5 different apps',
      bullets: ['Swap', 'Bridge', 'On-ramp', 'Off-ramp', '18+ chains'],
      accent: 'orange',
    },
  },
  {
    id: 'w1d6',
    day: 6,
    week: 1,
    phase: 'Education',
    type: 'thread',
    title: 'Smart Schedule Deep Dive',
    content: `🧵 How Smart Schedule actually works:

1/ You create a transaction

2/ BLAZE analyzes current gas prices and historical patterns

3/ If gas is expensive now → we wait

4/ Gas drops → automatic execution

You set your max gas. We handle the timing.

Average savings: 25-40%

No other wallet has this. blazewallet.io`,
    hashtags: ['SmartSchedule', 'gas', 'Ethereum', 'DeFi'],
    visual: {
      style: 'dark',
      headline: 'Smart Schedule',
      subheadline: 'How it works',
      bullets: ['1. You create transaction', '2. We analyze gas prices', '3. Execute at optimal time'],
      accent: 'orange',
    },
  },
  {
    id: 'w1d7',
    day: 7,
    week: 1,
    phase: 'Education',
    type: 'text',
    title: 'Week 1 Recap',
    content: `This week we showed you what makes BLAZE different:

• Smart Schedule - save up to 40% on gas
• AI Assistant - talk to your wallet
• QuickPay - pay with a QR scan
• Scam Protection - see risks before sending
• All-in-One - swap, bridge, on/off-ramp

One wallet. Everything you need.

blazewallet.io`,
    hashtags: ['BLAZE', 'crypto', 'wallet'],
    visual: {
      style: 'gradient',
      headline: 'Week 1 Recap',
      subheadline: '5 features that set BLAZE apart',
      showLogo: true,
      accent: 'orange',
    },
  },

  // ==========================================================================
  // WEEK 2: DEEPER EDUCATION + COMMUNITY
  // ==========================================================================
  {
    id: 'w2d1',
    day: 1,
    week: 2,
    phase: 'Education',
    type: 'text',
    title: 'On-ramp & Off-ramp',
    content: `Buying crypto shouldn't require 3 different apps.

BLAZE On-ramp:
Card → Crypto in your wallet

BLAZE Off-ramp:
Crypto → Cash in your bank

No external exchanges. No extra steps. No confusion.

blazewallet.io`,
    hashtags: ['onramp', 'offramp', 'crypto', 'fiat'],
    visual: {
      style: 'light',
      headline: 'On-ramp & Off-ramp',
      subheadline: 'Fiat ↔ Crypto in one app',
      accent: 'blue',
    },
  },
  {
    id: 'w2d2',
    day: 2,
    week: 2,
    phase: 'Education',
    type: 'text',
    title: 'Cross-chain Simplified',
    content: `Moving assets between chains used to be a nightmare.

Find a bridge → Check if it's legit → Connect wallet → Hope it works

BLAZE: One-click bridging built in.

Ethereum ↔ BSC ↔ Polygon ↔ Arbitrum ↔ and more

All from one interface.

blazewallet.io`,
    hashtags: ['bridge', 'crosschain', 'DeFi', 'multichain'],
    visual: {
      style: 'dark',
      headline: 'One-click Bridging',
      subheadline: 'Move assets between chains seamlessly',
      accent: 'blue',
    },
  },
  {
    id: 'w2d3',
    day: 3,
    week: 2,
    phase: 'Education',
    type: 'text',
    title: '18 Chains',
    content: `BLAZE supports 18+ blockchains:

Ethereum • BSC • Polygon • Solana • Arbitrum • Base • Optimism • Avalanche • Fantom • Cronos • and more

One wallet. All your crypto. Everywhere.

No more switching between apps.

blazewallet.io`,
    hashtags: ['multichain', 'crypto', 'wallet', 'DeFi'],
    visual: {
      style: 'dark',
      headline: '18+ Chains',
      subheadline: 'One wallet for everything',
      accent: 'orange',
    },
  },
  {
    id: 'w2d4',
    day: 4,
    week: 2,
    phase: 'Education',
    type: 'text',
    title: 'Non-custodial',
    content: `Your keys. Your crypto. Always.

BLAZE is fully non-custodial:

• Private keys stored locally
• Encrypted on your device
• We never have access
• You're always in control

Not your keys, not your crypto.

With BLAZE, they're always yours.

blazewallet.io`,
    hashtags: ['noncustodial', 'security', 'crypto', 'selfcustody'],
    visual: {
      style: 'dark',
      headline: 'Non-custodial',
      subheadline: 'Your keys. Your crypto.',
      accent: 'green',
    },
  },
  {
    id: 'w2d5',
    day: 5,
    week: 2,
    phase: 'Education',
    type: 'poll',
    title: 'Community Poll',
    content: `Quick question for the community:

Which BLAZE feature are you most excited about?

📊 Poll below`,
    hashtags: ['BLAZE', 'poll', 'crypto'],
    visual: {
      style: 'light',
      headline: 'Community Poll',
      subheadline: 'Which feature excites you most?',
      bullets: ['Smart Schedule', 'AI Assistant', 'QuickPay', 'Scam Protection'],
      accent: 'orange',
    },
    tip: 'Poll options: Smart Schedule / AI Assistant / QuickPay / Scam Protection',
  },
  {
    id: 'w2d6',
    day: 6,
    week: 2,
    phase: 'Education',
    type: 'text',
    title: 'Why We Built BLAZE',
    content: `"We built BLAZE because crypto should be usable, not just holdable.

Not faster transactions - that's blockchain dependent.

But simpler, safer, and smarter.

One wallet that does everything, protects you from scams, and saves you money on gas.

That's BLAZE."

blazewallet.io`,
    hashtags: ['BLAZE', 'crypto', 'vision'],
    visual: {
      style: 'dark',
      headline: 'Why BLAZE exists',
      subheadline: 'Simpler. Safer. Smarter.',
      showLogo: true,
      accent: 'orange',
    },
  },
  {
    id: 'w2d7',
    day: 7,
    week: 2,
    phase: 'Education',
    type: 'text',
    title: 'Waitlist Update',
    content: `BLAZE Waitlist Update

Thank you to everyone who's joined so far.

Coming Q1 2026:
• iOS & Android apps
• BLAZE token presale
• Staking rewards up to 20% APY

Early supporters get early access.

Join the waitlist: blazewallet.io`,
    hashtags: ['BLAZE', 'waitlist', 'presale'],
    visual: {
      style: 'gradient',
      headline: 'Join the Waitlist',
      subheadline: 'Early access for early supporters',
      showLogo: true,
      accent: 'orange',
    },
  },

  // ==========================================================================
  // WEEK 3: PRESALE BUILDUP
  // ==========================================================================
  {
    id: 'w3d1',
    day: 1,
    week: 3,
    phase: 'Presale Buildup',
    type: 'thread',
    title: 'Tokenomics Reveal',
    content: `🧵 BLAZE Token - Full Tokenomics

Everything you need to know about $BLAZE:

1/ Total Supply: 1,000,000,000 (1 billion)
Fixed supply. No inflation.

2/ Distribution:
• Presale: 12%
• Liquidity: 25%
• Staking rewards: 20%
• Development: 15%
• Marketing: 10%
• Team: 12% (6-month vesting)
• Reserve: 6%

3/ Burn Mechanism:
0.1% of every transaction is burned.
Supply decreases over time.

4/ Presale Price: $0.00417
Launch Price: $0.01
That's 58% below launch.

Full details: blazewallet.io/presale`,
    hashtags: ['BLAZE', 'tokenomics', 'presale', 'crypto'],
    visual: {
      style: 'dark',
      headline: 'BLAZE Tokenomics',
      stat: { value: '1B', label: 'Total Supply' },
      accent: 'orange',
    },
  },
  {
    id: 'w3d2',
    day: 2,
    week: 3,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Bonus Tiers',
    content: `BLAZE Presale Bonus Tiers:

🏆 Founders (first 100 buyers): +100% bonus
⭐ Early Birds (101-250): +75% bonus
🔥 Believers (251-500): +50% bonus
💪 Supporters (501-1000): +35% bonus
🤝 Community (1001-2000): +20% bonus
👥 Public (2001+): +10% bonus

First movers get rewarded.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'bonus', 'crypto'],
    visual: {
      style: 'dark',
      headline: 'Bonus Tiers',
      stat: { value: '+100%', label: 'Founder Bonus' },
      accent: 'gold',
    },
    tip: 'Highlight the Founder bonus - most compelling tier',
  },
  {
    id: 'w3d3',
    day: 3,
    week: 3,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Investment Math',
    content: `The math on BLAZE Founder tier:

Presale price: $0.00417
Launch price: $0.01
Founder bonus: +100%

$100 invested as Founder:
→ 23,981 base tokens
→ +23,981 bonus tokens
→ 47,962 BLAZE total
→ Worth $479 at launch

4.79x potential from day one.

Only 100 Founder spots.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'investment'],
    visual: {
      style: 'gradient',
      headline: '4.79x',
      subheadline: 'Potential for Founders',
      accent: 'gold',
    },
  },
  {
    id: 'w3d4',
    day: 4,
    week: 3,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Staking Preview',
    content: `BLAZE Staking (launching Q1 2026):

Flexible staking:
• Unstake anytime
• 8% APY

6-month lock:
• Fixed term
• 15% APY

12-month lock:
• Best returns
• 20% APY

Hold BLAZE. Earn more BLAZE.

blazewallet.io`,
    hashtags: ['staking', 'BLAZE', 'APY', 'DeFi'],
    visual: {
      style: 'dark',
      headline: 'Staking Rewards',
      stat: { value: '20%', label: 'Max APY' },
      accent: 'green',
    },
  },
  {
    id: 'w3d5',
    day: 5,
    week: 3,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Why Invest',
    content: `Why BLAZE?

✓ Unique features no other wallet has
✓ Working product, not vaporware
✓ Real utility from day one
✓ Deflationary tokenomics
✓ Strong bonus structure for early supporters

This isn't just a token.

It's the utility token for a wallet people will actually use.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'investment', 'crypto', 'utility'],
    visual: {
      style: 'light',
      headline: 'Why BLAZE?',
      subheadline: 'Real utility. Real product.',
      accent: 'orange',
    },
  },
  {
    id: 'w3d6',
    day: 6,
    week: 3,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Presale Details',
    content: `BLAZE Presale Details:

💰 Price: $0.00417 per token
🎁 Bonuses: Up to +100%
💵 Min investment: $10
💵 Max investment: $2,500
💳 Payment: USDC, BNB, ETH, or card

Opening Q1 2026.

Waitlist members notified first.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'details'],
    visual: {
      style: 'dark',
      headline: 'Presale Details',
      subheadline: '$0.00417 per token',
      accent: 'orange',
    },
  },
  {
    id: 'w3d7',
    day: 7,
    week: 3,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Week 3 Summary',
    content: `This week: BLAZE tokenomics revealed.

• 1 billion total supply
• 58% presale discount
• Up to 100% bonus for early buyers
• 0.1% burn per transaction
• Staking up to 20% APY

Next week: Countdown begins.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'recap', 'tokenomics'],
    visual: {
      style: 'gradient',
      headline: 'Week 3 Recap',
      subheadline: 'Tokenomics revealed',
      showLogo: true,
      accent: 'orange',
    },
  },

  // ==========================================================================
  // WEEK 4: COUNTDOWN WEEK
  // ==========================================================================
  {
    id: 'w4d1',
    day: 1,
    week: 4,
    phase: 'Countdown',
    type: 'text',
    title: '7 Days',
    content: `7 days until BLAZE Presale.

Checklist:
☐ On the waitlist (for early notification)
☐ Funds ready (USDC, BNB, or ETH)
☐ Wallet connected

Founder tier: 100 spots
Waitlist: Growing daily

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'countdown'],
    visual: {
      style: 'dark',
      headline: '7 Days',
      subheadline: 'Until presale opens',
      accent: 'orange',
    },
  },
  {
    id: 'w4d2',
    day: 2,
    week: 4,
    phase: 'Countdown',
    type: 'text',
    title: '6 Days',
    content: `6 days.

Quick Founder tier recap:
• First 100 buyers only
• +100% bonus tokens
• $0.00417 per token
• Max allocation: $2,500

At launch price ($0.01):
$100 invested → $479 value

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'countdown'],
    visual: {
      style: 'dark',
      headline: '6 Days',
      subheadline: 'Founder tier: +100% bonus',
      accent: 'orange',
    },
  },
  {
    id: 'w4d3',
    day: 3,
    week: 4,
    phase: 'Countdown',
    type: 'text',
    title: '5 Days',
    content: `5 days remaining.

Referral program live.

Share your unique link → Earn bonus allocation when friends buy.

Top referrers get additional rewards.

Your referral link is in your waitlist confirmation email.

blazewallet.io`,
    hashtags: ['BLAZE', 'referral', 'presale'],
    visual: {
      style: 'dark',
      headline: '5 Days',
      subheadline: 'Referral program live',
      accent: 'orange',
    },
  },
  {
    id: 'w4d4',
    day: 4,
    week: 4,
    phase: 'Countdown',
    type: 'text',
    title: '4 Days',
    content: `4 days.

FAQ:

Q: What payment methods?
A: USDC, BNB, ETH, or card

Q: Minimum investment?
A: $10

Q: When do I receive tokens?
A: At TGE (Token Generation Event)

Q: Is it safe?
A: Smart contract audited. Non-custodial.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'FAQ'],
    visual: {
      style: 'light',
      headline: '4 Days',
      subheadline: 'Presale FAQ',
      accent: 'orange',
    },
  },
  {
    id: 'w4d5',
    day: 5,
    week: 4,
    phase: 'Countdown',
    type: 'text',
    title: '3 Days',
    content: `3 days.

Current numbers:
• Waitlist signups: Growing
• Founder spots: 100
• Total interested: Much more than 100

Speed matters for Founder tier.

Be ready.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'countdown'],
    visual: {
      style: 'dark',
      headline: '3 Days',
      stat: { value: '100', label: 'Founder spots available' },
      accent: 'orange',
    },
  },
  {
    id: 'w4d6',
    day: 6,
    week: 4,
    phase: 'Countdown',
    type: 'text',
    title: '2 Days',
    content: `48 hours.

Final checklist:

✓ blazewallet.io/presale bookmarked
✓ Funds in wallet
✓ Ready to move fast

Founder tier won't last long.

See you there.`,
    hashtags: ['BLAZE', 'presale', '48hours'],
    visual: {
      style: 'dark',
      headline: '48 Hours',
      subheadline: 'Final countdown',
      accent: 'orange',
    },
  },
  {
    id: 'w4d7',
    day: 7,
    week: 4,
    phase: 'Countdown',
    type: 'text',
    title: 'Tomorrow',
    content: `Tomorrow.

BLAZE Presale opens at 9:00 UTC.

First 100 buyers = Founder tier (+100% bonus)

Price: $0.00417

Set your alarm.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'tomorrow'],
    visual: {
      style: 'gradient',
      headline: 'Tomorrow',
      subheadline: '9:00 UTC',
      accent: 'orange',
    },
  },

  // ==========================================================================
  // WEEK 5: PRESALE LIVE
  // ==========================================================================
  {
    id: 'w5d1',
    day: 1,
    week: 5,
    phase: 'Presale Live',
    type: 'thread',
    title: 'Presale Live Announcement',
    content: `BLAZE Presale is LIVE.

How to participate:
1. Go to blazewallet.io/presale
2. Connect wallet
3. Choose amount
4. Confirm transaction

Founder tier (+100% bonus) available now.

First 100 buyers only.

Let's build BLAZE together.`,
    hashtags: ['BLAZE', 'presale', 'LIVE', 'crypto'],
    visual: {
      style: 'gradient',
      headline: 'Presale LIVE',
      subheadline: 'blazewallet.io/presale',
      showLogo: true,
      accent: 'orange',
    },
    tip: 'Pin this post for the duration of presale',
  },
  {
    id: 'w5d2',
    day: 2,
    week: 5,
    phase: 'Presale Live',
    type: 'text',
    title: 'Progress Update Template',
    content: `BLAZE Presale Update

💰 Raised: $[AMOUNT]
👥 Participants: [NUMBER]
📊 Progress: [X]%

Current tier: [TIER NAME]
Current bonus: +[X]%

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'update'],
    visual: {
      style: 'dark',
      headline: 'Presale Update',
      subheadline: 'Progress report',
      accent: 'orange',
    },
    tip: 'Update [AMOUNT], [NUMBER], [X]% with live data from admin',
  },
  {
    id: 'w5d3',
    day: 3,
    week: 5,
    phase: 'Presale Live',
    type: 'text',
    title: 'Milestone Template',
    content: `Milestone reached!

$[AMOUNT] raised.

Thank you to everyone who believes in BLAZE.

Presale continues.

Current tier: [TIER] (+[X]% bonus)

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'milestone', 'presale'],
    visual: {
      style: 'gradient',
      headline: '$[AMOUNT]',
      subheadline: 'Milestone reached',
      accent: 'gold',
    },
    tip: 'Post at $25K, $50K, $100K, $250K milestones',
  },
  {
    id: 'w5d4',
    day: 4,
    week: 5,
    phase: 'Presale Live',
    type: 'text',
    title: 'Tier Sold Out Template',
    content: `[TIER NAME] tier is now SOLD OUT.

Moving to [NEXT TIER] tier.

New bonus: +[X]%

Still a great opportunity.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'soldout'],
    visual: {
      style: 'dark',
      headline: '[TIER] Sold Out',
      subheadline: 'Next tier now active',
      accent: 'orange',
    },
    tip: 'Post when each tier sells out',
  },
  {
    id: 'w5d5',
    day: 5,
    week: 5,
    phase: 'Presale Live',
    type: 'text',
    title: 'Reminder Post',
    content: `Reminder: BLAZE presale is still live.

Current bonus: +[X]%

58% below launch price.

This window will close.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'reminder'],
    visual: {
      style: 'light',
      headline: 'Still Live',
      subheadline: '58% below launch price',
      accent: 'orange',
    },
  },
  {
    id: 'w5d6',
    day: 6,
    week: 5,
    phase: 'Presale Live',
    type: 'text',
    title: 'Referral Leaderboard',
    content: `Referral Leaderboard Update

Top referrers this week:
🥇 [X] referrals
🥈 [X] referrals
🥉 [X] referrals

Bonus allocations awarded.

Your referral link is in your email.

blazewallet.io`,
    hashtags: ['BLAZE', 'referral', 'leaderboard'],
    visual: {
      style: 'dark',
      headline: 'Top Referrers',
      subheadline: 'Leaderboard update',
      accent: 'gold',
    },
  },
  {
    id: 'w5d7',
    day: 7,
    week: 5,
    phase: 'Presale Live',
    type: 'text',
    title: 'Week 1 Presale Recap',
    content: `Presale Week 1 Complete.

Stats:
💰 Total raised: $[AMOUNT]
👥 Participants: [NUMBER]
🌍 Countries: [NUMBER]

Thank you for believing in BLAZE.

Presale continues.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'recap'],
    visual: {
      style: 'gradient',
      headline: 'Week 1 Complete',
      subheadline: 'Thank you',
      showLogo: true,
      accent: 'orange',
    },
  },

  // ==========================================================================
  // WEEK 6: ONGOING + THANK YOU
  // ==========================================================================
  {
    id: 'w6d1',
    day: 1,
    week: 6,
    phase: 'Ongoing',
    type: 'text',
    title: 'What Happens Next',
    content: `What happens after you buy BLAZE?

1. Tokens reserved for you
2. TGE (Token Generation Event) in Q1 2026
3. Tokens distributed to your wallet
4. Staking goes live
5. Start earning up to 20% APY

blazewallet.io`,
    hashtags: ['BLAZE', 'roadmap', 'TGE'],
    visual: {
      style: 'dark',
      headline: 'What Happens Next',
      subheadline: 'After you buy',
      accent: 'orange',
    },
  },
  {
    id: 'w6d2',
    day: 2,
    week: 6,
    phase: 'Ongoing',
    type: 'text',
    title: 'Development Update',
    content: `BLAZE Development Update

Currently in progress:
• iOS app development
• Android app development
• Smart Schedule optimization
• QuickPay merchant tools

On track for Q1 2026 launch.

blazewallet.io`,
    hashtags: ['BLAZE', 'development', 'update'],
    visual: {
      style: 'light',
      headline: 'Dev Update',
      subheadline: 'On track for Q1 2026',
      accent: 'blue',
    },
  },
  {
    id: 'w6d3',
    day: 3,
    week: 6,
    phase: 'Ongoing',
    type: 'text',
    title: 'Community Thank You',
    content: `To the BLAZE community:

Thank you.

For believing in a wallet that's actually useful.
For joining early.
For spreading the word.

We're building this together.

blazewallet.io`,
    hashtags: ['BLAZE', 'community', 'thankyou'],
    visual: {
      style: 'dark',
      headline: 'Thank You',
      subheadline: 'To our community',
      showLogo: true,
      accent: 'orange',
    },
  },
  {
    id: 'w6d4',
    day: 4,
    week: 6,
    phase: 'Ongoing',
    type: 'text',
    title: 'Feature Spotlight: Smart Schedule',
    content: `Feature Spotlight: Smart Schedule

While other wallets make you manually time transactions...

BLAZE does it automatically.

Set your max gas.
We execute at the cheapest moment.

25-40% average savings.

Unique to BLAZE.

blazewallet.io`,
    hashtags: ['SmartSchedule', 'BLAZE', 'gas', 'DeFi'],
    visual: {
      style: 'dark',
      headline: 'Smart Schedule',
      stat: { value: '40%', label: 'Max gas savings' },
      accent: 'orange',
    },
  },
  {
    id: 'w6d5',
    day: 5,
    week: 6,
    phase: 'Ongoing',
    type: 'text',
    title: 'Looking Ahead',
    content: `What's coming in 2026:

Q1:
• iOS & Android launch
• BLAZE token TGE
• Staking activation

Q2:
• Merchant partnerships
• Advanced DeFi features
• DAO governance

We're just getting started.

blazewallet.io`,
    hashtags: ['BLAZE', 'roadmap', '2026'],
    visual: {
      style: 'gradient',
      headline: '2026 Roadmap',
      subheadline: 'Just getting started',
      showLogo: true,
      accent: 'orange',
    },
  },
  {
    id: 'w6d6',
    day: 6,
    week: 6,
    phase: 'Ongoing',
    type: 'text',
    title: 'Final Presale Push',
    content: `Presale reminder:

Still below launch price.
Still with bonus tokens.
Still time to join.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'reminder'],
    visual: {
      style: 'dark',
      headline: 'Still Time',
      subheadline: 'Presale continues',
      accent: 'orange',
    },
  },
  {
    id: 'w6d7',
    day: 7,
    week: 6,
    phase: 'Ongoing',
    type: 'text',
    title: 'Summary Post',
    content: `BLAZE in one post:

🔥 Smart Schedule - save on gas
🔥 AI Assistant - talk to your wallet
🔥 QuickPay - pay with QR codes
🔥 Scam Protection - stay safe
🔥 All-in-One - swap, bridge, on/off-ramp
🔥 18+ chains - one wallet for everything

The wallet that makes crypto usable.

blazewallet.io`,
    hashtags: ['BLAZE', 'crypto', 'wallet'],
    visual: {
      style: 'gradient',
      headline: 'BLAZE',
      subheadline: 'Crypto made usable',
      showLogo: true,
      accent: 'orange',
    },
  },
];

// =============================================================================
// COMPONENT
// =============================================================================

export default function MarketingPage() {
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [selectedPost, setSelectedPost] = useState<MarketingPost | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [liveStats, setLiveStats] = useState({ waitlist: 0, raised: 0, buyers: 0 });
  const supabase = createClient();

  useEffect(() => {
    const fetchStats = async () => {
      const { count: waitlistCount } = await supabase
        .from('waitlist')
        .select('*', { count: 'exact', head: true });
      
      const { data: commitments } = await supabase
        .from('commitments')
        .select('amount');
      
      const totalRaised = commitments?.reduce((sum, c) => sum + (c.amount || 0), 0) || 0;
      
      setLiveStats({
        waitlist: waitlistCount || 0,
        raised: totalRaised,
        buyers: commitments?.length || 0,
      });
    };
    fetchStats();
  }, []);

  const weekPosts = MARKETING_POSTS.filter(p => p.week === selectedWeek);

  const copyToClipboard = async (text: string, id: string) => {
    await navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getPhaseInfo = (week: number) => {
    switch(week) {
      case 1: return { name: 'Education', desc: 'Unique features' };
      case 2: return { name: 'Education', desc: 'Deep dives + community' };
      case 3: return { name: 'Presale Buildup', desc: 'Tokenomics + investment' };
      case 4: return { name: 'Countdown', desc: '7 days to launch' };
      case 5: return { name: 'Presale Live', desc: 'Updates + milestones' };
      case 6: return { name: 'Ongoing', desc: 'Thank you + roadmap' };
      default: return { name: '', desc: '' };
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar />
      
      <main className="lg:ml-64 pt-16 lg:pt-0">
        <div className="p-6 lg:p-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">
              Marketing Content
            </h1>
            <p className="text-gray-600">
              6 weeks of ready-to-use X content. Click a post to preview and copy.
            </p>
          </div>

          {/* Live Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Users className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Waitlist</p>
                  <p className="text-2xl font-bold text-gray-900">{liveStats.waitlist.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Commitments</p>
                  <p className="text-2xl font-bold text-gray-900">${liveStats.raised.toLocaleString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Target className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Participants</p>
                  <p className="text-2xl font-bold text-gray-900">{liveStats.buyers}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Week Selector */}
          <div className="bg-white rounded-2xl p-4 mb-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Content Calendar</h2>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedWeek(Math.max(1, selectedWeek - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                  disabled={selectedWeek === 1}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-medium text-gray-900 min-w-[100px] text-center">
                  Week {selectedWeek}
                </span>
                <button
                  onClick={() => setSelectedWeek(Math.min(6, selectedWeek + 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50"
                  disabled={selectedWeek === 6}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="grid grid-cols-6 gap-2">
              {[1, 2, 3, 4, 5, 6].map((week) => {
                const info = getPhaseInfo(week);
                return (
                  <button
                    key={week}
                    onClick={() => setSelectedWeek(week)}
                    className={`p-3 rounded-xl text-center transition-all ${
                      selectedWeek === week
                        ? 'bg-orange-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                    }`}
                  >
                    <div className="font-bold">Week {week}</div>
                    <div className="text-xs mt-1 opacity-80 truncate">
                      {info.name}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Post List */}
            <div className="space-y-4">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">
                    Week {selectedWeek}: {getPhaseInfo(selectedWeek).name}
                  </h3>
                  <p className="text-sm text-gray-500">{getPhaseInfo(selectedWeek).desc}</p>
                </div>
                <span className="text-sm text-gray-400">{weekPosts.length} posts</span>
              </div>
              
              {weekPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className={`bg-white rounded-xl p-4 shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                    selectedPost?.id === post.id 
                      ? 'border-orange-500 ring-2 ring-orange-100' 
                      : 'border-gray-100'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
                        Day {post.day}
                      </span>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                        {post.type}
                      </span>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        copyToClipboard(post.content + '\n\n' + post.hashtags.map(h => '#' + h).join(' '), post.id);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg"
                    >
                      {copiedId === post.id ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                  <h4 className="font-semibold text-gray-900 mb-2">{post.title}</h4>
                  <p className="text-sm text-gray-600 line-clamp-3">{post.content.substring(0, 150)}...</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.hashtags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-xs text-blue-500">#{tag}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Preview */}
            <div className="lg:sticky lg:top-8">
              {selectedPost ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                  <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Twitter className="w-5 h-5 text-gray-900" />
                      <span className="font-semibold text-gray-900">Post Preview</span>
                    </div>
                    <a 
                      href="https://twitter.com/intent/tweet" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
                    >
                      Open X <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>

                  {/* Visual Preview - Professional Design */}
                  <div className="p-4">
                    <div 
                      className={`relative rounded-2xl overflow-hidden ${
                        selectedPost.visual.style === 'dark' 
                          ? 'bg-slate-900' 
                          : selectedPost.visual.style === 'light'
                          ? 'bg-white border-2 border-gray-100'
                          : 'bg-gradient-to-br from-orange-500 to-yellow-500'
                      }`}
                      style={{ aspectRatio: '1200/675' }}
                    >
                      {/* Subtle pattern for dark/gradient */}
                      {selectedPost.visual.style !== 'light' && (
                        <div className="absolute inset-0 opacity-5">
                          <div className="absolute inset-0" style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                            backgroundSize: '24px 24px'
                          }} />
                        </div>
                      )}

                      {/* Content */}
                      <div className={`relative h-full flex flex-col justify-center p-8 ${
                        selectedPost.visual.style === 'light' ? 'text-gray-900' : 'text-white'
                      }`}>
                        
                        {/* Main stat if exists */}
                        {selectedPost.visual.stat && (
                          <div className="mb-4">
                            <div className={`text-5xl md:text-6xl font-black ${
                              selectedPost.visual.accent === 'gold' 
                                ? 'text-yellow-400' 
                                : selectedPost.visual.accent === 'green'
                                ? selectedPost.visual.style === 'light' ? 'text-emerald-600' : 'text-emerald-400'
                                : selectedPost.visual.style === 'gradient'
                                ? 'text-white'
                                : 'text-orange-400'
                            }`}>
                              {selectedPost.visual.stat.value}
                            </div>
                            <div className={`text-lg ${
                              selectedPost.visual.style === 'light' ? 'text-gray-500' : 'text-white/70'
                            }`}>
                              {selectedPost.visual.stat.label}
                            </div>
                          </div>
                        )}

                        {/* Headline */}
                        <h2 className={`text-3xl md:text-4xl font-bold mb-2 ${
                          !selectedPost.visual.stat ? 'mb-4' : ''
                        }`}>
                          {selectedPost.visual.headline}
                        </h2>

                        {/* Subheadline */}
                        {selectedPost.visual.subheadline && (
                          <p className={`text-xl ${
                            selectedPost.visual.style === 'light' ? 'text-gray-600' : 'text-white/80'
                          }`}>
                            {selectedPost.visual.subheadline}
                          </p>
                        )}

                        {/* Bullets */}
                        {selectedPost.visual.bullets && (
                          <ul className={`mt-4 space-y-2 ${
                            selectedPost.visual.style === 'light' ? 'text-gray-600' : 'text-white/80'
                          }`}>
                            {selectedPost.visual.bullets.map((bullet, i) => (
                              <li key={i} className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${
                                  selectedPost.visual.accent === 'green' 
                                    ? 'bg-emerald-400' 
                                    : selectedPost.visual.accent === 'blue'
                                    ? 'bg-blue-400'
                                    : 'bg-orange-400'
                                }`} />
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Logo - Bottom right, subtle */}
                        {selectedPost.visual.showLogo && (
                          <div className="absolute bottom-6 right-6">
                            <Image 
                              src="/blaze-logo.png" 
                              alt="BLAZE" 
                              width={48} 
                              height={48}
                              className="rounded-xl"
                            />
                          </div>
                        )}

                        {/* Website - Bottom left */}
                        <div className={`absolute bottom-6 left-8 text-sm font-medium ${
                          selectedPost.visual.style === 'light' ? 'text-gray-400' : 'text-white/60'
                        }`}>
                          blazewallet.io
                        </div>
                      </div>
                    </div>

                    {/* Post Text Preview */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start gap-3">
                        <Image 
                          src="/blaze-logo.png" 
                          alt="BLAZE" 
                          width={40} 
                          height={40}
                          className="rounded-full flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-900">BLAZE Wallet</span>
                            <span className="text-gray-500">@BLAZEwallet</span>
                          </div>
                          <p className="text-gray-800 whitespace-pre-wrap text-sm">
                            {selectedPost.content}
                          </p>
                          <div className="flex flex-wrap gap-1 mt-2">
                            {selectedPost.hashtags.map((tag) => (
                              <span key={tag} className="text-sm text-blue-500">#{tag}</span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-4 border-t border-gray-100 flex gap-2">
                    <button
                      onClick={() => copyToClipboard(selectedPost.content + '\n\n' + selectedPost.hashtags.map(h => '#' + h).join(' '), 'full-' + selectedPost.id)}
                      className="flex-1 py-2 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                    >
                      {copiedId === 'full-' + selectedPost.id ? (
                        <>
                          <Check className="w-4 h-4" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Copy text
                        </>
                      )}
                    </button>
                  </div>

                  {/* Tip */}
                  {selectedPost.tip && (
                    <div className="px-4 pb-4">
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                        <div className="flex items-start gap-2">
                          <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-amber-800">Tip</p>
                            <p className="text-sm text-amber-700">{selectedPost.tip}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Calendar className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Select a post</h3>
                  <p className="text-gray-500">
                    Click on a post to preview the visual and copy the text
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Design Guidelines */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-orange-500" />
              Visual Design Guidelines
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Colors</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Primary: BLAZE orange (#F97316)</li>
                  <li>• Accent: Yellow (#EAB308)</li>
                  <li>• Dark bg: Slate (#0F172A)</li>
                  <li>• Light bg: White or Gray-50</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Typography</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Headlines: Bold, clean sans-serif</li>
                  <li>• Body: Regular weight</li>
                  <li>• Keep it readable and professional</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Logo Usage</h4>
                <ul className="space-y-1 text-gray-600">
                  <li>• Use real BLAZE logo, not icons</li>
                  <li>• Position in corner, not over text</li>
                  <li>• Only when it adds value</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Quick Reference */}
          <div className="mt-6 bg-slate-900 rounded-2xl p-6 text-white">
            <h3 className="font-semibold mb-4">Quick Reference: BLAZE USPs</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
              <div>
                <div className="text-orange-400 font-medium">Smart Schedule</div>
                <div className="text-white/70">Save up to 40% on gas</div>
              </div>
              <div>
                <div className="text-orange-400 font-medium">AI Assistant</div>
                <div className="text-white/70">Natural language commands</div>
              </div>
              <div>
                <div className="text-orange-400 font-medium">QuickPay</div>
                <div className="text-white/70">Pay via QR code</div>
              </div>
              <div>
                <div className="text-orange-400 font-medium">Scam Protection</div>
                <div className="text-white/70">Real-time risk scanning</div>
              </div>
              <div>
                <div className="text-orange-400 font-medium">All-in-One</div>
                <div className="text-white/70">Swap, bridge, on/off-ramp</div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
