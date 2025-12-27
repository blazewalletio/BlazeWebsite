'use client';

import { useState, useEffect } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { createClient } from '@/lib/supabase/client';
import Image from 'next/image';
import { 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Twitter,
  Users,
  DollarSign,
  Target,
  Lightbulb,
  ExternalLink,
  Zap,
  Brain,
  QrCode,
  Shield,
  Repeat,
  Wallet,
  TrendingUp,
  Gift,
  Clock,
  CheckCircle,
  ArrowRight,
} from 'lucide-react';

// =============================================================================
// TYPES
// =============================================================================

interface VisualConfig {
  mode: 'dark' | 'warm' | 'dark-green' | 'dark-gold';
  layout: 'stat' | 'quote' | 'comparison' | 'list' | 'grid' | 'timeline' | 'celebration' | 'countdown' | 'dashboard';
  headline: string;
  subheadline?: string;
  stat?: { value: string; label: string };
  bullets?: string[];
  showLogo?: boolean;
  comparison?: { left: string[]; right: string[] };
  steps?: string[];
  gridItems?: { icon: string; label: string }[];
}

interface MarketingPost {
  id: string;
  day: number;
  week: number;
  phase: string;
  type: 'text' | 'thread' | 'image' | 'poll';
  title: string;
  content: string;
  hashtags: string[];
  visual: VisualConfig;
  tip?: string;
}

// =============================================================================
// ALL MARKETING POSTS WITH VISUAL CONFIGS
// =============================================================================

const MARKETING_POSTS: MarketingPost[] = [
  // WEEK 1
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
      mode: 'dark',
      layout: 'stat',
      headline: 'Smart Schedule',
      stat: { value: '40%', label: 'Maximum gas savings' },
      bullets: ['Real-time gas analysis', 'Automatic execution', 'You set max, we do the rest'],
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
      mode: 'dark',
      layout: 'quote',
      headline: '"Send 100 USDC to mom"',
      subheadline: 'The wallet that understands you',
    },
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
      mode: 'dark',
      layout: 'comparison',
      headline: 'QuickPay',
      comparison: {
        left: ['Ask address', 'Copy/paste', 'Choose network', 'Set gas', 'Wait...'],
        right: ['Scan', 'Confirm', 'Done ✓'],
      },
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
      mode: 'dark-green',
      layout: 'stat',
      headline: 'Scam Protection',
      stat: { value: '$3.8B', label: 'Lost to scams in 2024' },
      bullets: ['Address check', 'Contract analysis', 'Risk score', 'Warning before send'],
    },
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
      mode: 'warm',
      layout: 'grid',
      headline: 'All-in-One',
      subheadline: 'Stop juggling 5 different apps',
      gridItems: [
        { icon: 'swap', label: 'Swap' },
        { icon: 'bridge', label: 'Bridge' },
        { icon: 'ramp', label: 'On-ramp' },
        { icon: 'offramp', label: 'Off-ramp' },
      ],
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
      mode: 'dark',
      layout: 'timeline',
      headline: 'Smart Schedule',
      subheadline: 'How it works',
      steps: ['Create transaction', 'We analyze gas', 'Execute at best time'],
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
      mode: 'warm',
      layout: 'list',
      headline: 'Week 1 Recap',
      subheadline: '5 features that set BLAZE apart',
      bullets: ['Smart Schedule', 'AI Assistant', 'QuickPay', 'Scam Protection', 'All-in-One'],
      showLogo: true,
    },
  },

  // WEEK 2
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
      mode: 'dark',
      layout: 'comparison',
      headline: 'On-ramp & Off-ramp',
      subheadline: 'Fiat ↔ Crypto in one app',
      comparison: {
        left: ['FIAT', '💳'],
        right: ['CRYPTO', '🪙'],
      },
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
      mode: 'dark',
      layout: 'grid',
      headline: 'One-click Bridging',
      subheadline: 'Move assets seamlessly',
      gridItems: [
        { icon: 'eth', label: 'ETH' },
        { icon: 'bsc', label: 'BSC' },
        { icon: 'matic', label: 'MATIC' },
        { icon: 'arb', label: 'ARB' },
      ],
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
      mode: 'dark',
      layout: 'stat',
      headline: '18+ Chains',
      stat: { value: '18+', label: 'Blockchains supported' },
      subheadline: 'One wallet for everything',
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
      mode: 'dark-green',
      layout: 'list',
      headline: 'Non-custodial',
      subheadline: 'Your keys. Your crypto.',
      bullets: ['Keys stored locally', 'Encrypted on device', 'We never have access', 'You\'re in control'],
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
      mode: 'warm',
      layout: 'list',
      headline: 'Community Poll',
      subheadline: 'Which feature excites you most?',
      bullets: ['Smart Schedule', 'AI Assistant', 'QuickPay', 'Scam Protection'],
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
      mode: 'dark',
      layout: 'quote',
      headline: 'Simpler. Safer. Smarter.',
      subheadline: 'Not faster transactions. Just way less hassle.',
      showLogo: true,
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
      mode: 'warm',
      layout: 'list',
      headline: 'Join the Waitlist',
      subheadline: 'Early access for early supporters',
      bullets: ['iOS & Android apps', 'Token presale', 'Staking up to 20% APY'],
      showLogo: true,
    },
  },

  // WEEK 3
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

4/ Presale Price: $0.00834
Launch Price: $0.02
That's 58% below launch.

Full details: blazewallet.io/presale`,
    hashtags: ['BLAZE', 'tokenomics', 'presale', 'crypto'],
    visual: {
      mode: 'dark',
      layout: 'stat',
      headline: 'BLAZE Tokenomics',
      stat: { value: '1B', label: 'Total Supply' },
      bullets: ['Presale: 12%', 'Liquidity: 25%', 'Staking: 20%', '0.1% burn per tx'],
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
      mode: 'dark-gold',
      layout: 'stat',
      headline: 'Bonus Tiers',
      stat: { value: '+100%', label: 'Founder Bonus' },
      bullets: ['🏆 Founders +100%', '⭐ Early Birds +75%', '🔥 Believers +50%', '💪 Supporters +35%'],
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

Presale price: $0.00834
Launch price: $0.02
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
      mode: 'warm',
      layout: 'stat',
      headline: 'Founder Math',
      stat: { value: '4.79x', label: 'Potential from day one' },
      bullets: ['$100 invested', '47,962 BLAZE', '$479 at launch'],
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
      mode: 'dark-green',
      layout: 'stat',
      headline: 'Staking Rewards',
      stat: { value: '20%', label: 'Maximum APY' },
      bullets: ['Flexible: 8% APY', '6-month: 15% APY', '12-month: 20% APY'],
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
      mode: 'dark',
      layout: 'list',
      headline: 'Why BLAZE?',
      subheadline: 'Real utility. Real product.',
      bullets: ['Unique features', 'Working product', 'Real utility', 'Deflationary', 'Strong bonuses'],
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

💰 Price: $0.00834 per token
🎁 Bonuses: Up to +100%
💵 Min investment: $10
💵 Max investment: $2,500
💳 Payment: USDC, BNB, ETH, or card

Opening Q1 2026.

Waitlist members notified first.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'details'],
    visual: {
      mode: 'dark',
      layout: 'stat',
      headline: 'Presale Details',
      stat: { value: '$0.00834', label: 'per token' },
      bullets: ['Bonus: Up to +100%', 'Min: $10', 'Max: $2,500', 'USDC, BNB, ETH, card'],
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
      mode: 'warm',
      layout: 'list',
      headline: 'Week 3 Recap',
      subheadline: 'Tokenomics revealed',
      bullets: ['1B total supply', '58% presale discount', 'Up to 100% bonus', 'Staking 20% APY'],
      showLogo: true,
    },
  },

  // WEEK 4 - COUNTDOWN
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
      mode: 'dark',
      layout: 'countdown',
      headline: '7',
      subheadline: 'DAYS',
      bullets: ['On waitlist?', 'Funds ready?', 'Wallet connected?'],
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
• $0.00834 per token
• Max allocation: $2,500

At launch price ($0.02):
$100 invested → $479 value

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'countdown'],
    visual: {
      mode: 'dark',
      layout: 'countdown',
      headline: '6',
      subheadline: 'DAYS',
      bullets: ['First 100 only', '+100% bonus', '$0.00834/token'],
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
      mode: 'dark',
      layout: 'countdown',
      headline: '5',
      subheadline: 'DAYS',
      bullets: ['Referral program live', 'Share & earn bonus', 'Top referrers rewarded'],
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
      mode: 'dark',
      layout: 'countdown',
      headline: '4',
      subheadline: 'DAYS',
      bullets: ['USDC, BNB, ETH, card', 'Min: $10', 'Tokens at TGE'],
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
      mode: 'dark',
      layout: 'countdown',
      headline: '3',
      subheadline: 'DAYS',
      stat: { value: '100', label: 'Founder spots available' },
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
      mode: 'warm',
      layout: 'countdown',
      headline: '48',
      subheadline: 'HOURS',
      bullets: ['Presale bookmarked', 'Funds ready', 'Move fast'],
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

Price: $0.00834

Set your alarm.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'tomorrow'],
    visual: {
      mode: 'warm',
      layout: 'countdown',
      headline: 'TOMORROW',
      subheadline: '9:00 UTC',
      bullets: ['First 100 = Founder', '+100% bonus', 'Set your alarm'],
    },
  },

  // WEEK 5 - PRESALE LIVE
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
      mode: 'warm',
      layout: 'celebration',
      headline: 'PRESALE LIVE',
      subheadline: 'blazewallet.io/presale',
      showLogo: true,
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
      mode: 'dark',
      layout: 'dashboard',
      headline: 'Presale Update',
      bullets: ['$XXX,XXX Raised', 'XXX Buyers', 'XX% Progress'],
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
      mode: 'warm',
      layout: 'celebration',
      headline: '$100K',
      subheadline: 'MILESTONE REACHED',
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
      mode: 'dark-gold',
      layout: 'stat',
      headline: 'Founders',
      stat: { value: 'SOLD OUT', label: 'Moving to Early Birds' },
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
      mode: 'dark',
      layout: 'stat',
      headline: 'Still Live',
      stat: { value: '58%', label: 'Below launch price' },
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
      mode: 'dark-gold',
      layout: 'list',
      headline: 'Top Referrers',
      subheadline: 'Leaderboard update',
      bullets: ['🥇 XX referrals', '🥈 XX referrals', '🥉 XX referrals'],
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
      mode: 'warm',
      layout: 'dashboard',
      headline: 'Week 1 Complete',
      subheadline: 'Thank you',
      showLogo: true,
    },
  },

  // WEEK 6 - ONGOING
  {
    id: 'w6d1',
    day: 1,
    week: 6,
    phase: 'Ongoing',
    type: 'text',
    title: 'What Happens Next',
    content: `What happens after you buy BLAZE tokens?

1. Tokens reserved for you
2. TGE (Token Generation Event) in Q1 2026
3. Tokens distributed to your wallet
4. Staking goes live
5. Start earning up to 20% APY

blazewallet.io`,
    hashtags: ['BLAZE', 'roadmap', 'TGE'],
    visual: {
      mode: 'dark',
      layout: 'timeline',
      headline: 'What Happens Next',
      steps: ['Tokens reserved', 'TGE Q1 2026', 'Tokens sent', 'Staking live'],
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
      mode: 'dark',
      layout: 'list',
      headline: 'Dev Update',
      subheadline: 'On track for Q1 2026',
      bullets: ['iOS app', 'Android app', 'Smart Schedule', 'QuickPay tools'],
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
      mode: 'warm',
      layout: 'quote',
      headline: 'Thank You',
      subheadline: 'To our community',
      showLogo: true,
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
      mode: 'dark',
      layout: 'stat',
      headline: 'Smart Schedule',
      stat: { value: '40%', label: 'Max gas savings' },
      subheadline: 'Unique to BLAZE',
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
      mode: 'dark',
      layout: 'comparison',
      headline: '2026 Roadmap',
      comparison: {
        left: ['Q1', 'iOS/Android', 'Token TGE', 'Staking'],
        right: ['Q2', 'Merchants', 'DeFi', 'DAO'],
      },
      showLogo: true,
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
      mode: 'dark',
      layout: 'stat',
      headline: 'Still Time',
      stat: { value: '58%', label: 'Below launch price' },
      subheadline: 'Presale continues',
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
      mode: 'warm',
      layout: 'grid',
      headline: 'BLAZE',
      subheadline: 'Crypto made usable',
      gridItems: [
        { icon: 'schedule', label: 'Smart Schedule' },
        { icon: 'ai', label: 'AI Assistant' },
        { icon: 'qr', label: 'QuickPay' },
        { icon: 'shield', label: 'Scam Protection' },
        { icon: 'allinone', label: 'All-in-One' },
        { icon: 'chains', label: '18+ Chains' },
      ],
      showLogo: true,
    },
  },
];

// =============================================================================
// VISUAL RENDERER COMPONENT
// =============================================================================

function VisualPreview({ visual, postTitle }: { visual: VisualConfig; postTitle: string }) {
  const getModeStyles = () => {
    switch (visual.mode) {
      case 'warm':
        return 'bg-gradient-to-br from-orange-500 via-orange-400 to-yellow-400';
      case 'dark-green':
        return 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900';
      case 'dark-gold':
        return 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900';
      default:
        return 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900';
    }
  };

  const getAccentColor = () => {
    switch (visual.mode) {
      case 'warm': return 'text-white';
      case 'dark-green': return 'text-emerald-400';
      case 'dark-gold': return 'text-yellow-400';
      default: return 'text-orange-400';
    }
  };

  const getStatColor = () => {
    switch (visual.mode) {
      case 'warm': return 'text-white';
      case 'dark-green': return 'text-emerald-400';
      case 'dark-gold': return 'text-yellow-400';
      default: return 'bg-gradient-to-r from-orange-400 to-yellow-400 bg-clip-text text-transparent';
    }
  };

  return (
    <div 
      className={`relative rounded-2xl overflow-hidden ${getModeStyles()}`}
      style={{ aspectRatio: '1200/675' }}
    >
      {/* Background Effects for Dark Modes */}
      {visual.mode !== 'warm' && (
        <>
          {/* Orange blur */}
          <div className="absolute top-0 left-1/4 w-48 h-48 bg-orange-500/20 rounded-full blur-[60px]" />
          {/* Yellow blur */}
          <div className="absolute bottom-0 right-1/4 w-36 h-36 bg-yellow-500/15 rounded-full blur-[50px]" />
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-[0.03]" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </>
      )}

      {/* Warm mode effects */}
      {visual.mode === 'warm' && (
        <div className="absolute top-1/4 right-1/4 w-24 h-24 bg-white/10 rounded-full blur-[30px]" />
      )}

      {/* Content */}
      <div className="relative h-full flex flex-col justify-center px-6 py-4 text-white">
        
        {/* COUNTDOWN LAYOUT */}
        {visual.layout === 'countdown' && (
          <div className="text-center">
            <div className={`text-6xl font-black mb-1 ${getStatColor()}`}>
              {visual.headline}
            </div>
            <div className="text-2xl font-bold mb-3 opacity-90">
              {visual.subheadline}
            </div>
            {visual.bullets && (
              <div className="flex flex-wrap justify-center gap-2 mt-2">
                {visual.bullets.map((bullet, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5 text-xs">
                    {bullet}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* STAT LAYOUT */}
        {visual.layout === 'stat' && (
          <div className="flex flex-col items-center text-center">
            {visual.stat && (
              <>
                <div className={`text-5xl font-black mb-0.5 ${getStatColor()}`}>
                  {visual.stat.value}
                </div>
                <div className="text-sm opacity-70 mb-2">
                  {visual.stat.label}
                </div>
              </>
            )}
            <div className="text-xl font-bold mb-1">{visual.headline}</div>
            {visual.subheadline && (
              <div className="text-sm opacity-80 mb-2">{visual.subheadline}</div>
            )}
            {visual.bullets && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 mt-1 max-w-xs">
                {visual.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-center gap-2 py-0.5">
                    <div className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${visual.mode === 'dark-green' ? 'bg-emerald-400' : visual.mode === 'dark-gold' ? 'bg-yellow-400' : 'bg-orange-400'}`} />
                    <span className="text-xs">{bullet}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* QUOTE LAYOUT */}
        {visual.layout === 'quote' && (
          <div className="text-center max-w-md mx-auto">
            <div className={`text-3xl font-black mb-2 ${getAccentColor()}`}>
              {visual.headline}
            </div>
            {visual.subheadline && (
              <div className="text-base opacity-80">
                {visual.subheadline}
              </div>
            )}
          </div>
        )}

        {/* COMPARISON LAYOUT */}
        {visual.layout === 'comparison' && visual.comparison && (
          <div className="text-center">
            <div className="text-xl font-bold mb-3">{visual.headline}</div>
            {visual.subheadline && <div className="text-sm opacity-70 mb-2">{visual.subheadline}</div>}
            <div className="flex justify-center gap-4">
              <div className="bg-white/5 border border-white/10 rounded-xl p-3 min-w-[100px]">
                <div className="text-xs opacity-50 mb-1">OLD WAY</div>
                {visual.comparison.left.map((item, i) => (
                  <div key={i} className="text-xs opacity-60 py-0.5">{item}</div>
                ))}
              </div>
              <div className="flex items-center">
                <ArrowRight className={`w-5 h-5 ${getAccentColor()}`} />
              </div>
              <div className={`bg-white/10 border rounded-xl p-3 min-w-[100px] ${visual.mode === 'warm' ? 'border-white/30' : 'border-orange-500/30'}`}>
                <div className={`text-xs mb-1 ${getAccentColor()}`}>BLAZE</div>
                {visual.comparison.right.map((item, i) => (
                  <div key={i} className="text-xs font-medium py-0.5">{item}</div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* LIST LAYOUT */}
        {visual.layout === 'list' && (
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">{visual.headline}</div>
            {visual.subheadline && (
              <div className="text-sm opacity-70 mb-2">{visual.subheadline}</div>
            )}
            {visual.bullets && (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 max-w-xs mx-auto">
                {visual.bullets.map((bullet, i) => (
                  <div key={i} className="flex items-center gap-2 py-0.5 text-left">
                    <CheckCircle className={`w-4 h-4 flex-shrink-0 ${visual.mode === 'dark-green' ? 'text-emerald-400' : 'text-orange-400'}`} />
                    <span className="text-xs">{bullet}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* GRID LAYOUT */}
        {visual.layout === 'grid' && (
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">{visual.headline}</div>
            {visual.subheadline && (
              <div className="text-sm opacity-70 mb-3">{visual.subheadline}</div>
            )}
            {visual.gridItems && (
              <div className={`grid gap-2 max-w-sm mx-auto ${visual.gridItems.length > 4 ? 'grid-cols-3' : 'grid-cols-4'}`}>
                {visual.gridItems.map((item, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 text-center">
                    <div className="mb-0.5">
                      {item.icon === 'swap' && <Repeat className="w-5 h-5 mx-auto text-orange-400" />}
                      {item.icon === 'bridge' && <ArrowRight className="w-5 h-5 mx-auto text-orange-400" />}
                      {item.icon === 'ramp' && <TrendingUp className="w-5 h-5 mx-auto text-orange-400" />}
                      {item.icon === 'offramp' && <DollarSign className="w-5 h-5 mx-auto text-orange-400" />}
                      {item.icon === 'schedule' && <Clock className="w-5 h-5 mx-auto text-orange-400" />}
                      {item.icon === 'ai' && <Brain className="w-5 h-5 mx-auto text-orange-400" />}
                      {item.icon === 'qr' && <QrCode className="w-5 h-5 mx-auto text-orange-400" />}
                      {item.icon === 'shield' && <Shield className="w-5 h-5 mx-auto text-orange-400" />}
                      {item.icon === 'allinone' && <Wallet className="w-5 h-5 mx-auto text-orange-400" />}
                      {item.icon === 'chains' && <Zap className="w-5 h-5 mx-auto text-orange-400" />}
                      {item.icon === 'eth' && <span className="text-sm">Ξ</span>}
                      {item.icon === 'bsc' && <span className="text-sm text-yellow-400">◆</span>}
                      {item.icon === 'matic' && <span className="text-sm text-purple-400">⬡</span>}
                      {item.icon === 'arb' && <span className="text-sm text-blue-400">◈</span>}
                    </div>
                    <div className="text-[10px] font-medium">{item.label}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TIMELINE LAYOUT */}
        {visual.layout === 'timeline' && (
          <div className="text-center">
            <div className="text-2xl font-bold mb-1">{visual.headline}</div>
            {visual.subheadline && (
              <div className="text-sm opacity-70 mb-3">{visual.subheadline}</div>
            )}
            {visual.steps && visual.steps.length > 0 && (
              <div className="flex justify-center items-center gap-1 max-w-md mx-auto">
                {visual.steps.map((step, i, arr) => (
                  <div key={i} className="flex items-center">
                    <div className="flex flex-col items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${visual.mode === 'warm' ? 'bg-white/20' : 'bg-orange-500/30 text-orange-400'}`}>
                        {i + 1}
                      </div>
                      <div className="text-[10px] mt-1 max-w-[70px] text-center leading-tight">{step}</div>
                    </div>
                    {i < arr.length - 1 && (
                      <div className={`w-6 h-0.5 mx-0.5 ${visual.mode === 'warm' ? 'bg-white/30' : 'bg-orange-500/30'}`} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CELEBRATION LAYOUT */}
        {visual.layout === 'celebration' && (
          <div className="text-center">
            {visual.showLogo && (
              <div className="mb-2 flex justify-center">
                <Image src="/blaze-logo.png" alt="BLAZE" width={48} height={48} className="rounded-xl" />
              </div>
            )}
            <div className="inline-block px-3 py-1.5 rounded-full bg-red-500 text-white text-xs font-bold mb-2 animate-pulse">
              🔴 LIVE
            </div>
            <div className="text-4xl font-black mb-1">{visual.headline}</div>
            {visual.subheadline && (
              <div className="text-base opacity-90">{visual.subheadline}</div>
            )}
          </div>
        )}

        {/* DASHBOARD LAYOUT */}
        {visual.layout === 'dashboard' && (
          <div className="text-center">
            <div className="text-xl font-bold mb-3">{visual.headline}</div>
            {visual.bullets && (
              <div className="flex justify-center gap-2">
                {visual.bullets.map((stat, i) => (
                  <div key={i} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg p-2 min-w-[90px]">
                    <div className={`text-lg font-bold ${getAccentColor()}`}>{stat.split(' ')[0]}</div>
                    <div className="text-[10px] opacity-70">{stat.split(' ').slice(1).join(' ')}</div>
                  </div>
                ))}
              </div>
            )}
            {visual.subheadline && (
              <div className="text-sm opacity-80 mt-2">{visual.subheadline}</div>
            )}
          </div>
        )}

        {/* Logo (when enabled, positioned bottom right) */}
        {visual.showLogo && visual.layout !== 'celebration' && (
          <div className="absolute bottom-3 right-4">
            <Image src="/blaze-logo.png" alt="BLAZE" width={28} height={28} className="rounded-lg opacity-80" />
          </div>
        )}

        {/* Website URL */}
        <div className="absolute bottom-3 left-4 text-xs font-medium opacity-40">
          blazewallet.io
        </div>
      </div>
    </div>
  );
}

// =============================================================================
// MAIN PAGE COMPONENT
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
              6 weeks of ready-to-use X content with BLAZE-styled visuals. Screenshot the preview for X.
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
                        ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
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
                      <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                        post.visual.mode === 'warm' 
                          ? 'bg-gradient-to-r from-orange-100 to-yellow-100 text-orange-600' 
                          : 'bg-gray-100 text-gray-500'
                      }`}>
                        {post.visual.mode === 'warm' ? 'warm' : 'dark'}
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
                  <p className="text-sm text-gray-600 line-clamp-2">{post.content.substring(0, 120)}...</p>
                  <div className="flex flex-wrap gap-1 mt-3">
                    {post.hashtags.slice(0, 3).map((tag) => (
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
                      <span className="font-semibold text-gray-900">Visual Preview</span>
                    </div>
                    <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                      Screenshot for X
                    </span>
                  </div>

                  {/* Visual Preview */}
                  <div className="p-4">
                    <VisualPreview visual={selectedPost.visual} postTitle={selectedPost.title} />

                    {/* Post Text */}
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
                            <span className="text-gray-500 text-sm">@BLAZEwallet</span>
                          </div>
                          <p className="text-gray-800 whitespace-pre-wrap text-sm line-clamp-6">
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
                      className="flex-1 py-2.5 px-4 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
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
                    <a 
                      href="https://twitter.com/intent/tweet" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="py-2.5 px-4 bg-blue-500 text-white rounded-xl font-medium hover:bg-blue-600 transition-colors flex items-center gap-2"
                    >
                      <Twitter className="w-4 h-4" />
                      Post
                    </a>
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
                  <div className="w-16 h-16 bg-gradient-to-br from-orange-100 to-yellow-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Twitter className="w-8 h-8 text-orange-500" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Select a post</h3>
                  <p className="text-gray-500">
                    Click on a post to preview the BLAZE-styled visual
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
