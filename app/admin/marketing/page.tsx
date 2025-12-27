'use client';

import { useState, useEffect, useRef } from 'react';
import AdminSidebar from '@/components/admin/AdminSidebar';
import { createClient } from '@/lib/supabase/client';
import { 
  Calendar, 
  Image as ImageIcon, 
  Copy, 
  Check, 
  ChevronLeft, 
  ChevronRight,
  Download,
  Twitter,
  Zap,
  Users,
  TrendingUp,
  Shield,
  Clock,
  Gift,
  Rocket,
  Target,
  Heart,
  MessageCircle,
  Repeat2,
  BarChart3,
  Flame,
  Star,
  AlertCircle,
  CheckCircle,
  ArrowRight,
  QrCode,
  Brain,
  Wallet,
  DollarSign,
  Trophy,
  Lock,
  Sparkles,
} from 'lucide-react';

// =============================================================================
// MARKETING CONTENT DATA - 6 WEEKS OF POSTS
// =============================================================================

interface MarketingPost {
  id: string;
  day: number;
  week: number;
  phase: string;
  type: 'text' | 'thread' | 'image' | 'video' | 'poll';
  title: string;
  content: string;
  hashtags: string[];
  imageType: 'pain-point' | 'feature' | 'stats' | 'countdown' | 'announcement' | 'testimonial' | 'progress';
  imageData?: {
    headline: string;
    subheadline?: string;
    stat?: string;
    statLabel?: string;
    icon?: string;
    gradient?: string;
  };
  engagement?: string;
  cta?: string;
}

const MARKETING_POSTS: MarketingPost[] = [
  // ==========================================================================
  // WEEK 1: AWARENESS - THE PROBLEM
  // ==========================================================================
  {
    id: 'w1d1',
    day: 1,
    week: 1,
    phase: 'Awareness',
    type: 'thread',
    title: 'The Problem Thread',
    content: `🧵 Why crypto will NEVER go mainstream... (unless THIS changes)

Let me explain 👇

1/ Crypto has been around for 15 years. Yet only 4% of the world uses it daily.

Why? Because it's UNUSABLE for real life.

2/ Try paying for coffee with ETH. 
- Open wallet
- Find merchant address  
- Copy/paste
- Set gas
- Wait 2+ minutes
- Hope it confirms

Meanwhile, the guy behind you paid with Apple Pay in 2 seconds.

3/ The UX is broken.

We've been so focused on "number go up" that we forgot the original vision:

MONEY. That you can SPEND. Anywhere.

4/ This is why we built @BLAZEwallet.

A crypto wallet designed for PAYMENTS first.

Not trading. Not speculation. SPENDING.

🔥 Waitlist open: blazewallet.io`,
    hashtags: ['crypto', 'Web3', 'DeFi', 'Bitcoin', 'payments'],
    imageType: 'pain-point',
    imageData: {
      headline: 'Crypto is UNUSABLE',
      subheadline: 'for everyday payments',
      stat: '4%',
      statLabel: 'of the world uses crypto daily',
      gradient: 'dark',
    },
    engagement: 'Ask followers: "When was the last time you SPENT crypto (not traded)?"',
  },
  {
    id: 'w1d2',
    day: 2,
    week: 1,
    phase: 'Awareness',
    type: 'text',
    title: 'Pain Point - Waiting',
    content: `The year is 2025.

You can:
• Video call anyone on Earth instantly
• Have AI write your emails
• Order anything to your door in hours

But paying with crypto?

Still takes 2+ minutes and costs $5 in gas.

Something's broken. We're fixing it.

🔥 blazewallet.io`,
    hashtags: ['crypto', 'UX', 'Web3', 'future'],
    imageType: 'pain-point',
    imageData: {
      headline: '2025',
      subheadline: 'Crypto payments still take 2+ minutes',
      gradient: 'dark',
    },
  },
  {
    id: 'w1d3',
    day: 3,
    week: 1,
    phase: 'Awareness',
    type: 'image',
    title: 'Coffee Shop Scenario',
    content: `POV: You try to pay for coffee with crypto

☕ "That'll be €4.50"

You:
1. Open wallet app
2. Ask for their address
3. They look confused
4. You explain what crypto is
5. They write address on napkin
6. You type it in (typo?)
7. Calculate gas fees
8. Transaction pending...
9. Still pending...
10. Coffee is cold

There has to be a better way. 

There is. 🔥

blazewallet.io`,
    hashtags: ['crypto', 'payments', 'UX', 'coffee'],
    imageType: 'pain-point',
    imageData: {
      headline: 'Coffee + Crypto',
      subheadline: '= 10 step nightmare',
      icon: 'coffee',
      gradient: 'dark',
    },
    engagement: 'Quote tweet with your worst crypto payment experience',
  },
  {
    id: 'w1d4',
    day: 4,
    week: 1,
    phase: 'Awareness',
    type: 'poll',
    title: 'Engagement Poll',
    content: `Quick poll for Crypto Twitter:

How often do you SPEND crypto in real life?

(Not trade, not stake, actually BUY things)`,
    hashtags: ['crypto', 'poll', 'CryptoTwitter'],
    imageType: 'stats',
    imageData: {
      headline: 'Poll',
      subheadline: 'How often do you SPEND crypto?',
    },
    engagement: 'Poll options: Daily / Weekly / Monthly / Never',
  },
  {
    id: 'w1d5',
    day: 5,
    week: 1,
    phase: 'Awareness',
    type: 'text',
    title: 'The Solution Teaser',
    content: `What if I told you...

You could pay with crypto:
✓ At any store
✓ By scanning a QR code
✓ In seconds
✓ On 18+ blockchains
✓ With AI assistance

Would you use it?

We're building exactly that.

BLAZE Wallet. Coming Q1 2026.

Join 1,000+ on the waitlist 👇
blazewallet.io`,
    hashtags: ['BLAZE', 'BLAZEwallet', 'crypto', 'payments'],
    imageType: 'feature',
    imageData: {
      headline: 'What if...',
      subheadline: 'you could pay with crypto anywhere?',
      gradient: 'orange',
    },
  },
  {
    id: 'w1d6',
    day: 6,
    week: 1,
    phase: 'Awareness',
    type: 'text',
    title: 'Weekend Recap',
    content: `This week we talked about why crypto payments are broken.

Next week: How we're fixing it.

If you're tired of:
• Complicated wallets
• Slow transactions
• Unusable UX

You'll want to follow along.

🔥 BLAZE Wallet - Making crypto spendable.

blazewallet.io`,
    hashtags: ['BLAZE', 'crypto', 'Web3'],
    imageType: 'announcement',
    imageData: {
      headline: 'Week 1 Recap',
      subheadline: 'The problem with crypto payments',
      gradient: 'dark',
    },
  },
  {
    id: 'w1d7',
    day: 7,
    week: 1,
    phase: 'Awareness',
    type: 'image',
    title: 'Sunday Stats',
    content: `BLAZE Waitlist Update 📊

Week 1 stats:
• Waitlist signups: Growing daily
• Countries represented: 20+
• Most requested feature: QuickPay

Thank you for believing in our vision.

The revolution starts with spending.

🔥 blazewallet.io`,
    hashtags: ['BLAZE', 'BLAZEwallet', 'update'],
    imageType: 'stats',
    imageData: {
      headline: 'Week 1',
      stat: '20+',
      statLabel: 'Countries on waitlist',
      gradient: 'orange',
    },
  },

  // ==========================================================================
  // WEEK 2: AWARENESS - BLAZE INTRODUCTION
  // ==========================================================================
  {
    id: 'w2d1',
    day: 1,
    week: 2,
    phase: 'Awareness',
    type: 'thread',
    title: 'Introducing BLAZE',
    content: `🔥 Introducing BLAZE Wallet

The crypto wallet built for SPENDING, not just holding.

A thread on what makes us different 👇

1/ QUICKPAY

Scan a QR code. Confirm. Done.

Pay with crypto at any store, just like Apple Pay.

No addresses. No copy/paste. No waiting.

2/ AI ASSISTANT

"Send $50 USDC to @friend"

Type natural language. AI handles the rest.

No more navigating confusing menus.

3/ SCAM PROTECTION

Before you interact with any contract or address, we scan it.

Real-time risk score. Warnings. Protection.

Your funds stay safe.

4/ 18+ BLOCKCHAINS

Ethereum, BSC, Polygon, Solana, Arbitrum, Base, and more.

One wallet. All your crypto. Everywhere.

5/ Coming Q1 2026

Join the waitlist for:
• Early access
• Presale discounts (up to 58% off!)
• Founder benefits

🔥 blazewallet.io`,
    hashtags: ['BLAZE', 'BLAZEwallet', 'crypto', 'Web3', 'DeFi'],
    imageType: 'feature',
    imageData: {
      headline: 'BLAZE Wallet',
      subheadline: 'Pay with crypto. Anywhere.',
      gradient: 'orange',
    },
  },
  {
    id: 'w2d2',
    day: 2,
    week: 2,
    phase: 'Awareness',
    type: 'image',
    title: 'QuickPay Feature',
    content: `QuickPay: The feature that changes everything.

How it works:
1️⃣ Merchant shows QR code
2️⃣ You scan it
3️⃣ Confirm amount
4️⃣ Payment sent

That's it. Like Apple Pay, but for crypto.

Works with USDC, USDT, and 50+ tokens.

This is the future of spending.

🔥 blazewallet.io/#quickpay`,
    hashtags: ['QuickPay', 'BLAZE', 'crypto', 'payments'],
    imageType: 'feature',
    imageData: {
      headline: 'QuickPay',
      subheadline: 'Scan. Confirm. Done.',
      icon: 'qr',
      gradient: 'orange',
    },
  },
  {
    id: 'w2d3',
    day: 3,
    week: 2,
    phase: 'Awareness',
    type: 'text',
    title: 'AI Assistant',
    content: `"Send 100 USDC to mom"

That's it. That's the transaction.

BLAZE AI understands natural language.

No more:
❌ Finding the right menu
❌ Entering long addresses
❌ Calculating gas manually

Just tell the AI what you want.

🔥 blazewallet.io`,
    hashtags: ['AI', 'BLAZE', 'crypto', 'UX'],
    imageType: 'feature',
    imageData: {
      headline: 'AI Assistant',
      subheadline: '"Send 100 USDC to mom"',
      icon: 'brain',
      gradient: 'purple',
    },
  },
  {
    id: 'w2d4',
    day: 4,
    week: 2,
    phase: 'Awareness',
    type: 'image',
    title: 'Scam Protection',
    content: `Lost $50K to a phishing link?

We've all heard the horror stories.

BLAZE Scam Protection:
✓ Scans every address before you send
✓ Analyzes smart contracts in real-time
✓ Shows risk score with warnings
✓ Blocks known scam addresses

Your funds. Protected.

🔥 blazewallet.io`,
    hashtags: ['security', 'BLAZE', 'crypto', 'scam'],
    imageType: 'feature',
    imageData: {
      headline: 'Scam Protection',
      subheadline: 'Real-time risk analysis',
      icon: 'shield',
      gradient: 'green',
    },
  },
  {
    id: 'w2d5',
    day: 5,
    week: 2,
    phase: 'Awareness',
    type: 'image',
    title: '18 Chains',
    content: `One wallet. 18+ blockchains.

BLAZE supports:
• Ethereum
• BSC
• Polygon
• Solana
• Arbitrum
• Base
• Optimism
• Avalanche
• Fantom
• Cronos
• And more...

No more juggling 10 different wallets.

All your crypto. One place.

🔥 blazewallet.io`,
    hashtags: ['multichain', 'BLAZE', 'crypto', 'DeFi'],
    imageType: 'feature',
    imageData: {
      headline: '18+ Chains',
      subheadline: 'One wallet for everything',
      icon: 'wallet',
      gradient: 'blue',
    },
  },
  {
    id: 'w2d6',
    day: 6,
    week: 2,
    phase: 'Awareness',
    type: 'text',
    title: 'Founder Vision',
    content: `"For decades, we've watched money lose value year after year. 

We built BLAZE because we believe paying with crypto – everywhere – is the future."

- Rick Schlimback, Founder

Join us in making crypto spendable.

🔥 blazewallet.io`,
    hashtags: ['BLAZE', 'founder', 'vision', 'crypto'],
    imageType: 'testimonial',
    imageData: {
      headline: '"The future of money"',
      subheadline: '- Rick Schlimback, Founder',
      gradient: 'dark',
    },
  },
  {
    id: 'w2d7',
    day: 7,
    week: 2,
    phase: 'Awareness',
    type: 'image',
    title: 'Week 2 Stats',
    content: `BLAZE Week 2 Update 📊

• Waitlist growth: +45%
• Twitter followers: Growing
• Most clicked feature: QuickPay

Your support means everything.

Next week: Presale details 👀

🔥 blazewallet.io`,
    hashtags: ['BLAZE', 'update', 'crypto'],
    imageType: 'stats',
    imageData: {
      headline: 'Week 2',
      stat: '+45%',
      statLabel: 'Waitlist growth',
      gradient: 'orange',
    },
  },

  // ==========================================================================
  // WEEK 3: EDUCATION - DEEP DIVES
  // ==========================================================================
  {
    id: 'w3d1',
    day: 1,
    week: 3,
    phase: 'Education',
    type: 'thread',
    title: 'QuickPay Deep Dive',
    content: `🧵 QuickPay Deep Dive: How BLAZE makes crypto payments work

Let me show you exactly how it works 👇

1/ THE PROBLEM

Current crypto payments:
- Copy address → Paste → Set gas → Wait → Hope

QuickPay:
- Scan → Confirm → Done

2/ THE TECHNOLOGY

QuickPay uses smart QR codes that encode:
• Recipient address
• Amount requested
• Preferred token
• Network selection

All you do is scan and confirm.

3/ SETTLEMENT TIME

Here's the honest truth:
- Polygon: ~2-3 seconds
- Solana: ~1 second
- BSC: ~3-5 seconds
- Ethereum: ~15+ seconds

We support fast chains for fast payments.

4/ TOKEN SUPPORT

Pay with whatever you have:
• USDC, USDT (stablecoins)
• ETH, BNB, MATIC
• Any supported token

Auto-convert coming soon.

5/ TRY IT

See QuickPay demo on our website.

Coming Q1 2026.

🔥 blazewallet.io/#quickpay`,
    hashtags: ['QuickPay', 'BLAZE', 'crypto', 'tutorial'],
    imageType: 'feature',
    imageData: {
      headline: 'QuickPay',
      subheadline: 'How it actually works',
      gradient: 'orange',
    },
  },
  {
    id: 'w3d2',
    day: 2,
    week: 3,
    phase: 'Education',
    type: 'image',
    title: 'Chain Comparison',
    content: `Which blockchain is fastest for payments? 🏎️

Settlement times:

🥇 Solana: ~1 second
🥈 Polygon: ~2-3 seconds  
🥉 BSC: ~3-5 seconds
4️⃣ Arbitrum: ~5-10 seconds
5️⃣ Ethereum: ~15+ seconds

BLAZE supports all of them.

Choose the right chain for your needs.

🔥 blazewallet.io`,
    hashtags: ['blockchain', 'speed', 'crypto', 'BLAZE'],
    imageType: 'stats',
    imageData: {
      headline: 'Chain Speed',
      subheadline: 'Settlement times compared',
      gradient: 'blue',
    },
  },
  {
    id: 'w3d3',
    day: 3,
    week: 3,
    phase: 'Education',
    type: 'text',
    title: 'Why Stablecoins',
    content: `Why pay with stablecoins?

Your crypto portfolio: 📈📉📈📉📈

Your coffee price: ☕ €4.50

When you're SPENDING, you want stability.

That's why QuickPay defaults to USDC/USDT.

• No volatility stress
• Know exactly what you're paying
• Merchant gets stable value

Spending should be simple.

🔥 blazewallet.io`,
    hashtags: ['stablecoins', 'USDC', 'crypto', 'payments'],
    imageType: 'feature',
    imageData: {
      headline: 'Stablecoins',
      subheadline: 'For stable spending',
      gradient: 'blue',
    },
  },
  {
    id: 'w3d4',
    day: 4,
    week: 3,
    phase: 'Education',
    type: 'thread',
    title: 'Security Deep Dive',
    content: `🧵 How BLAZE keeps your crypto safe

Security isn't optional. Here's our approach 👇

1/ NON-CUSTODIAL

Your keys. Your crypto. Always.

We never store your private keys on our servers.

Only YOU control your funds.

2/ BIOMETRIC AUTH

WebAuthn + Face ID / Touch ID

No passwords to steal.

3/ SCAM DETECTION

Before every transaction:
• Address reputation check
• Contract analysis
• Risk score calculation
• Warning display

We catch scams before they catch you.

4/ ENCRYPTED STORAGE

All local data encrypted.

Even if someone gets your phone, they can't access your wallet.

5/ UPCOMING: CERTIK AUDIT

Security audit scheduled Q1 2026.

Professional verification.

🔥 blazewallet.io`,
    hashtags: ['security', 'BLAZE', 'crypto', 'safety'],
    imageType: 'feature',
    imageData: {
      headline: 'Security First',
      subheadline: 'Your keys. Your crypto.',
      icon: 'shield',
      gradient: 'green',
    },
  },
  {
    id: 'w3d5',
    day: 5,
    week: 3,
    phase: 'Education',
    type: 'image',
    title: 'BLAZE vs Others',
    content: `BLAZE vs Traditional Wallets

Feature comparison:

QuickPay QR payments:
❌ MetaMask
❌ Trust Wallet  
✅ BLAZE

AI Assistant:
❌ MetaMask
❌ Trust Wallet
✅ BLAZE

Scam Protection:
⚠️ MetaMask (basic)
⚠️ Trust Wallet (basic)
✅ BLAZE (advanced)

Payment-first UX:
❌ MetaMask
❌ Trust Wallet
✅ BLAZE

We're not just another wallet.

🔥 blazewallet.io`,
    hashtags: ['BLAZE', 'wallet', 'comparison', 'crypto'],
    imageType: 'stats',
    imageData: {
      headline: 'BLAZE',
      subheadline: 'Not just another wallet',
      gradient: 'orange',
    },
  },
  {
    id: 'w3d6',
    day: 6,
    week: 3,
    phase: 'Education',
    type: 'text',
    title: 'Roadmap Preview',
    content: `What's coming for BLAZE?

2025:
✓ Website live
✓ Waitlist open
→ AI features development
→ QuickPay integration

Q1 2026:
• iOS & Android launch
• BLAZE token presale
• Staking (up to 20% APY)

Q2 2026:
• Global merchant partnerships
• DAO governance launch
• Advanced DeFi features

We're building the future of spending.

🔥 blazewallet.io/whitepaper`,
    hashtags: ['roadmap', 'BLAZE', 'crypto', 'future'],
    imageType: 'announcement',
    imageData: {
      headline: 'Roadmap',
      subheadline: 'Q1 2026: Launch',
      gradient: 'orange',
    },
  },
  {
    id: 'w3d7',
    day: 7,
    week: 3,
    phase: 'Education',
    type: 'image',
    title: 'Week 3 Milestone',
    content: `BLAZE Week 3 Update 📊

Milestone reached: 2,500+ waitlist signups! 🎉

Top countries:
🇳🇱 Netherlands
🇺🇸 USA
🇬🇧 UK
🇩🇪 Germany

Thank you for spreading the word!

Next week: PRESALE DETAILS 🔥

blazewallet.io`,
    hashtags: ['BLAZE', 'milestone', 'waitlist'],
    imageType: 'stats',
    imageData: {
      headline: '2,500+',
      stat: '2,500+',
      statLabel: 'Waitlist signups',
      gradient: 'orange',
    },
  },

  // ==========================================================================
  // WEEK 4: PRESALE BUILDUP
  // ==========================================================================
  {
    id: 'w4d1',
    day: 1,
    week: 4,
    phase: 'Presale Buildup',
    type: 'thread',
    title: 'Tokenomics Reveal',
    content: `🔥 BLAZE TOKEN - Full Tokenomics Reveal

Everything you need to know about $BLAZE 👇

1/ TOTAL SUPPLY

1,000,000,000 BLAZE tokens
(1 billion)

Fixed supply. No inflation.

2/ DISTRIBUTION

• Presale: 12% (120M tokens)
• Liquidity: 25%
• Staking rewards: 20%
• Development: 15%
• Marketing: 10%
• Team: 12% (6-month vesting)
• Reserve: 6%

3/ BURN MECHANISM

0.1% of every transaction is burned.

Over time, supply decreases.

Deflationary by design.

4/ PRESALE PRICE

$0.00417 per token
(58% discount from launch!)

Launch price: $0.01

5/ BONUS TIERS 🎁

• Founders (first 100): +100% bonus
• Early Birds (100-250): +75% bonus
• Believers (250-500): +50% bonus
• Supporters (500-1000): +35% bonus
• Community (1000-2000): +20% bonus
• Public (2000+): +10% bonus

First movers get rewarded.

🔥 blazewallet.io/presale`,
    hashtags: ['BLAZE', 'tokenomics', 'presale', 'crypto'],
    imageType: 'announcement',
    imageData: {
      headline: '$BLAZE',
      subheadline: 'Tokenomics revealed',
      stat: '1B',
      statLabel: 'Total supply',
      gradient: 'orange',
    },
  },
  {
    id: 'w4d2',
    day: 2,
    week: 4,
    phase: 'Presale Buildup',
    type: 'image',
    title: 'Bonus Tiers Visual',
    content: `🎁 BLAZE Presale Bonus Tiers

The earlier you join, the more you get:

🏆 FOUNDERS (spots 1-100)
+100% BONUS
Buy 10,000 → Get 20,000 BLAZE

⭐ EARLY BIRDS (101-250)
+75% BONUS
Buy 10,000 → Get 17,500 BLAZE

🔥 BELIEVERS (251-500)
+50% BONUS
Buy 10,000 → Get 15,000 BLAZE

💪 SUPPORTERS (501-1000)
+35% BONUS

🤝 COMMUNITY (1001-2000)
+20% BONUS

👥 PUBLIC (2001+)
+10% BONUS

Don't miss Founder tier.

🔥 blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'bonus', 'crypto'],
    imageType: 'announcement',
    imageData: {
      headline: '+100%',
      subheadline: 'Founder Bonus',
      stat: '100',
      statLabel: 'Founder spots',
      gradient: 'gold',
    },
  },
  {
    id: 'w4d3',
    day: 3,
    week: 4,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'FOMO Post',
    content: `Quick math on BLAZE presale:

Presale price: $0.00417
Launch price: $0.01

That's a 58% discount.

With Founder bonus (+100%):
• Invest $100
• Get 47,962 BLAZE
• Worth $479 at launch

4.79x potential from day 1.

Only 100 Founder spots.

🔥 blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'crypto', 'investment'],
    imageType: 'stats',
    imageData: {
      headline: '4.79x',
      subheadline: 'Potential for Founders',
      gradient: 'orange',
    },
  },
  {
    id: 'w4d4',
    day: 4,
    week: 4,
    phase: 'Presale Buildup',
    type: 'image',
    title: 'Staking Preview',
    content: `BLAZE Staking Rewards (launching Q1 2026)

Earn passive income on your BLAZE:

🟢 Flexible staking
• Unstake anytime
• 8% APY

🟡 6-month lock
• Fixed term
• 15% APY

🔴 12-month lock
• Best returns
• 20% APY

Stack your BLAZE. Earn more BLAZE.

🔥 blazewallet.io`,
    hashtags: ['staking', 'BLAZE', 'APY', 'passive'],
    imageType: 'feature',
    imageData: {
      headline: 'Up to 20%',
      subheadline: 'APY on staking',
      gradient: 'green',
    },
  },
  {
    id: 'w4d5',
    day: 5,
    week: 4,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Countdown Start',
    content: `⏰ BLAZE PRESALE

Opening in 14 days.

What you need to know:

📅 Date: [TBA - Q1 2026]
💰 Price: $0.00417
🎁 Founder bonus: +100%
📊 Spots: Only 100 at Founder tier

Join the waitlist now to be notified.

🔥 blazewallet.io`,
    hashtags: ['BLAZE', 'presale', 'countdown'],
    imageType: 'countdown',
    imageData: {
      headline: '14 Days',
      subheadline: 'Until presale opens',
      gradient: 'orange',
    },
  },
  {
    id: 'w4d6',
    day: 6,
    week: 4,
    phase: 'Presale Buildup',
    type: 'image',
    title: 'Social Proof',
    content: `BLAZE Community Growing 🚀

This week:
• 1,000+ new waitlist signups
• 500+ new Twitter followers
• 50+ referrals claimed

The word is spreading.

Founder spots won't last.

Secure your position 👇
blazewallet.io`,
    hashtags: ['BLAZE', 'community', 'growth'],
    imageType: 'stats',
    imageData: {
      headline: '1,000+',
      stat: '1,000+',
      statLabel: 'New signups this week',
      gradient: 'orange',
    },
  },
  {
    id: 'w4d7',
    day: 7,
    week: 4,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Week 4 Summary',
    content: `Week 4 Recap - Presale reveal edition

This week we shared:
✓ Full tokenomics (1B supply)
✓ Bonus tiers (+100% for Founders!)
✓ Staking rewards (up to 20% APY)
✓ Presale countdown started

Next week: Final countdown + presale launch prep.

Are you ready?

🔥 blazewallet.io`,
    hashtags: ['BLAZE', 'recap', 'presale'],
    imageType: 'stats',
    imageData: {
      headline: 'Week 4',
      subheadline: 'Presale revealed',
      gradient: 'dark',
    },
  },

  // ==========================================================================
  // WEEK 5: PRESALE COUNTDOWN
  // ==========================================================================
  {
    id: 'w5d1',
    day: 1,
    week: 5,
    phase: 'Presale Countdown',
    type: 'image',
    title: '7 Days Countdown',
    content: `🚨 7 DAYS UNTIL BLAZE PRESALE

One week from now, it begins.

Final checklist:
☐ On waitlist? (notified first)
☐ Funds ready? (USDC, BNB, ETH)
☐ Wallet connected?

First 100 buyers = Founder tier (+100% bonus)

Don't oversleep this one.

🔥 blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'countdown', '7days'],
    imageType: 'countdown',
    imageData: {
      headline: '7 Days',
      subheadline: 'PRESALE COUNTDOWN',
      gradient: 'orange',
    },
  },
  {
    id: 'w5d2',
    day: 2,
    week: 5,
    phase: 'Presale Countdown',
    type: 'text',
    title: '6 Days',
    content: `6 days until BLAZE presale.

Founder tier recap:
• First 100 buyers only
• +100% bonus tokens
• $0.00417 per token
• Maximum allocation: $2,500

At launch ($0.01):
$100 investment → $479 value

The math speaks for itself.

🔥 blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'countdown'],
    imageType: 'countdown',
    imageData: {
      headline: '6 Days',
      subheadline: 'Founder tier: +100%',
      gradient: 'orange',
    },
  },
  {
    id: 'w5d3',
    day: 3,
    week: 5,
    phase: 'Presale Countdown',
    type: 'image',
    title: '5 Days',
    content: `5 DAYS ⏰

Referral leaderboard heating up!

Top referrers will get bonus allocations.

Current leaders:
🥇 @[user1] - 23 referrals
🥈 @[user2] - 18 referrals
🥉 @[user3] - 15 referrals

Your unique referral link is in your email.

Share & earn more BLAZE.

🔥 blazewallet.io`,
    hashtags: ['BLAZE', 'referral', 'presale'],
    imageType: 'stats',
    imageData: {
      headline: '5 Days',
      subheadline: 'Referral leaderboard live',
      gradient: 'orange',
    },
  },
  {
    id: 'w5d4',
    day: 4,
    week: 5,
    phase: 'Presale Countdown',
    type: 'text',
    title: '4 Days',
    content: `4 days remaining.

FAQ time:

Q: What payment methods?
A: USDC, BNB, ETH, or card

Q: Minimum investment?
A: $10

Q: Maximum investment?
A: $2,500

Q: When do I receive tokens?
A: At TGE (Q1 2026)

Q: Is this safe?
A: Smart contract audited. Non-custodial.

🔥 blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'FAQ'],
    imageType: 'announcement',
    imageData: {
      headline: '4 Days',
      subheadline: 'Presale FAQ',
      gradient: 'orange',
    },
  },
  {
    id: 'w5d5',
    day: 5,
    week: 5,
    phase: 'Presale Countdown',
    type: 'image',
    title: '3 Days',
    content: `3 DAYS 🔥

Waitlist just crossed 5,000 signups.

But Founder tier = only 100 spots.

50:1 odds.

Speed matters.

Be ready. Be early. Be a Founder.

🔥 blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'countdown'],
    imageType: 'countdown',
    imageData: {
      headline: '3 Days',
      stat: '5,000+',
      statLabel: 'Waitlist vs 100 Founder spots',
      gradient: 'red',
    },
  },
  {
    id: 'w5d6',
    day: 6,
    week: 5,
    phase: 'Presale Countdown',
    type: 'text',
    title: '2 Days',
    content: `48 hours.

Final reminder checklist:

✓ Waitlist: blazewallet.io
✓ Funds ready in wallet
✓ Browser bookmarked
✓ Notifications on

This is it.

Founder tier. +100% bonus.

See you there.

🔥`,
    hashtags: ['BLAZE', 'presale', '48hours'],
    imageType: 'countdown',
    imageData: {
      headline: '48 Hours',
      subheadline: 'FINAL COUNTDOWN',
      gradient: 'red',
    },
  },
  {
    id: 'w5d7',
    day: 7,
    week: 5,
    phase: 'Presale Countdown',
    type: 'image',
    title: 'Tomorrow',
    content: `TOMORROW 🚨

BLAZE Presale opens in 24 hours.

Timeline:
• 9:00 UTC - Presale goes LIVE
• First 100 = Founder tier (+100%)
• Price: $0.00417

We've been building for months.

Tomorrow, you can join us.

Set your alarms.

🔥 blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'tomorrow', 'launch'],
    imageType: 'countdown',
    imageData: {
      headline: '24 Hours',
      subheadline: 'TOMORROW 9:00 UTC',
      gradient: 'red',
    },
  },

  // ==========================================================================
  // WEEK 6: PRESALE LIVE
  // ==========================================================================
  {
    id: 'w6d1',
    day: 1,
    week: 6,
    phase: 'Presale Live',
    type: 'thread',
    title: 'PRESALE LIVE',
    content: `🔥🔥🔥 BLAZE PRESALE IS LIVE 🔥🔥🔥

This is it. The moment we've been building towards.

👇 Everything you need to know:

1/ HOW TO BUY

• Go to blazewallet.io/presale
• Connect wallet
• Choose amount
• Confirm transaction

Simple.

2/ CURRENT STATUS

Founder tier: FILLING FAST
Price: $0.00417
Bonus: +100%

3/ LIVE TRACKER

We'll post updates every hour.

Follow along as we build BLAZE together.

Let's go 🚀

🔥 blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'LIVE', 'crypto'],
    imageType: 'announcement',
    imageData: {
      headline: '🔥 LIVE',
      subheadline: 'PRESALE IS OPEN',
      gradient: 'fire',
    },
  },
  {
    id: 'w6d1b',
    day: 1,
    week: 6,
    phase: 'Presale Live',
    type: 'image',
    title: 'Hour 1 Update',
    content: `⏰ HOUR 1 UPDATE

Presale stats:
• Raised: $[AMOUNT]
• Buyers: [NUMBER]
• Founder spots remaining: [NUMBER]

Founder tier filling FAST.

Don't wait.

🔥 blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'update'],
    imageType: 'progress',
    imageData: {
      headline: 'Hour 1',
      subheadline: 'PRESALE UPDATE',
      gradient: 'orange',
    },
  },
  {
    id: 'w6d2',
    day: 2,
    week: 6,
    phase: 'Presale Live',
    type: 'image',
    title: 'Day 2 Update',
    content: `🔥 PRESALE DAY 2

Stats update:
💰 Raised: $[AMOUNT]
👥 Buyers: [NUMBER]
📊 Progress: [X]%

Founder tier: [STATUS]

Current tier: [TIER NAME] (+[X]% bonus)

Join now while bonuses last.

🔥 blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'update'],
    imageType: 'progress',
    imageData: {
      headline: 'Day 2',
      subheadline: 'Presale progress',
      gradient: 'orange',
    },
  },
  {
    id: 'w6d3',
    day: 3,
    week: 6,
    phase: 'Presale Live',
    type: 'text',
    title: 'Social Proof',
    content: `The BLAZE community is amazing.

Messages from buyers:

"Finally a wallet for SPENDING crypto" - @user1

"Founder bonus is insane" - @user2

"This is what crypto needs" - @user3

Thank you for believing in our vision.

Still time to join.

🔥 blazewallet.io/presale`,
    hashtags: ['BLAZE', 'community', 'presale'],
    imageType: 'testimonial',
    imageData: {
      headline: 'Community',
      subheadline: 'Voices from buyers',
      gradient: 'dark',
    },
  },
  {
    id: 'w6d4',
    day: 4,
    week: 6,
    phase: 'Presale Live',
    type: 'image',
    title: 'Milestone',
    content: `🎉 MILESTONE REACHED

$[AMOUNT] RAISED!

Thank you to everyone who believed early.

We're building something special.

Presale continues...

Current tier: [TIER] (+[X]% bonus)

🔥 blazewallet.io/presale`,
    hashtags: ['BLAZE', 'milestone', 'presale'],
    imageType: 'stats',
    imageData: {
      headline: '$100K+',
      subheadline: 'MILESTONE REACHED',
      gradient: 'gold',
    },
  },
  {
    id: 'w6d5',
    day: 5,
    week: 6,
    phase: 'Presale Live',
    type: 'text',
    title: 'Reminder',
    content: `Quick reminder:

BLAZE presale is STILL LIVE.

Current bonus: +[X]%

Why join now:
✓ 58% below launch price
✓ Bonus tokens on top
✓ Staking rewards coming
✓ Early supporter benefits

This window won't last forever.

🔥 blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'reminder'],
    imageType: 'announcement',
    imageData: {
      headline: 'Still Live',
      subheadline: 'Presale open',
      gradient: 'orange',
    },
  },
  {
    id: 'w6d6',
    day: 6,
    week: 6,
    phase: 'Presale Live',
    type: 'image',
    title: 'Referral Winners',
    content: `🏆 REFERRAL LEADERBOARD

Top referrers this week:

🥇 @[user1] - [X] referrals
🥈 @[user2] - [X] referrals
🥉 @[user3] - [X] referrals

Bonus allocations incoming!

Your link is in your email.

Keep sharing, keep earning.

🔥 blazewallet.io`,
    hashtags: ['BLAZE', 'referral', 'leaderboard'],
    imageType: 'stats',
    imageData: {
      headline: 'Top Referrers',
      subheadline: 'Leaderboard update',
      gradient: 'gold',
    },
  },
  {
    id: 'w6d7',
    day: 7,
    week: 6,
    phase: 'Presale Live',
    type: 'thread',
    title: 'Week 1 Presale Recap',
    content: `🔥 PRESALE WEEK 1 RECAP

What a week!

Stats:
💰 Total raised: $[AMOUNT]
👥 Total buyers: [NUMBER]
🌍 Countries: [NUMBER]
📊 Progress: [X]%

Top moments:
• Founder tier sold out in [TIME]
• $[X] milestone reached
• [X] referrals activated

This is just the beginning.

Presale continues.

Thank you for building BLAZE with us.

🔥 blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'recap', 'success'],
    imageType: 'stats',
    imageData: {
      headline: 'Week 1',
      subheadline: 'PRESALE RECAP',
      gradient: 'orange',
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
  const postRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  // Fetch live stats
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

  const getGradientClass = (gradient?: string) => {
    switch (gradient) {
      case 'orange': return 'from-orange-500 via-yellow-500 to-orange-600';
      case 'dark': return 'from-slate-900 via-slate-800 to-slate-900';
      case 'blue': return 'from-blue-600 via-blue-500 to-cyan-500';
      case 'green': return 'from-emerald-600 via-emerald-500 to-teal-500';
      case 'purple': return 'from-purple-600 via-purple-500 to-pink-500';
      case 'gold': return 'from-yellow-500 via-amber-500 to-orange-500';
      case 'red': return 'from-red-600 via-red-500 to-orange-500';
      case 'fire': return 'from-orange-600 via-red-500 to-yellow-500';
      default: return 'from-orange-500 via-yellow-500 to-orange-600';
    }
  };

  const getIconComponent = (icon?: string) => {
    switch (icon) {
      case 'qr': return <QrCode className="w-16 h-16" />;
      case 'brain': return <Brain className="w-16 h-16" />;
      case 'shield': return <Shield className="w-16 h-16" />;
      case 'wallet': return <Wallet className="w-16 h-16" />;
      case 'coffee': return <span className="text-6xl">☕</span>;
      default: return <Flame className="w-16 h-16" />;
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
              6 weken aan kant-en-klare content voor X. Klik op een post om de visual te zien.
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
              <h2 className="font-semibold text-gray-900">Content calendar</h2>
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
              {[1, 2, 3, 4, 5, 6].map((week) => (
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
                  <div className="text-xs mt-1 opacity-80">
                    {week === 1 ? 'Awareness' : 
                     week === 2 ? 'Intro' : 
                     week === 3 ? 'Education' : 
                     week === 4 ? 'Buildup' : 
                     week === 5 ? 'Countdown' : 
                     'Launch'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Post List */}
            <div className="space-y-4">
              <h3 className="font-semibold text-gray-900 mb-4">
                Week {selectedWeek}: {weekPosts[0]?.phase}
              </h3>
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
                    <div>
                      <span className="text-xs font-medium text-orange-500 bg-orange-50 px-2 py-1 rounded-full">
                        Day {post.day}
                      </span>
                      <span className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full ml-2">
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
                      <span className="font-semibold text-gray-900">X Post Preview</span>
                    </div>
                    <span className="text-xs text-gray-500">
                      Screenshot deze visual voor X
                    </span>
                  </div>

                  {/* X-Style Visual Post */}
                  <div ref={postRef} className="p-4">
                    {/* Visual Card - This is what they screenshot */}
                    <div 
                      className={`relative rounded-2xl overflow-hidden bg-gradient-to-br ${getGradientClass(selectedPost.imageData?.gradient)}`}
                      style={{ aspectRatio: '1200/675' }}
                    >
                      {/* Background pattern */}
                      <div className="absolute inset-0 opacity-10">
                        <div className="absolute inset-0" style={{
                          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                        }} />
                      </div>

                      {/* Content */}
                      <div className="relative h-full flex flex-col items-center justify-center p-8 text-center text-white">
                        {/* Icon */}
                        <div className="mb-4 opacity-90">
                          {getIconComponent(selectedPost.imageData?.icon)}
                        </div>

                        {/* Stat (if exists) */}
                        {selectedPost.imageData?.stat && (
                          <div className="text-6xl md:text-7xl font-black mb-2 drop-shadow-lg">
                            {selectedPost.imageData.stat}
                          </div>
                        )}

                        {/* Headline */}
                        <h2 className="text-3xl md:text-4xl font-black mb-2 drop-shadow-lg">
                          {selectedPost.imageData?.headline}
                        </h2>

                        {/* Subheadline */}
                        {selectedPost.imageData?.subheadline && (
                          <p className="text-xl md:text-2xl opacity-90 drop-shadow">
                            {selectedPost.imageData.subheadline}
                          </p>
                        )}

                        {/* Stat label */}
                        {selectedPost.imageData?.statLabel && (
                          <p className="text-lg opacity-80 mt-2">
                            {selectedPost.imageData.statLabel}
                          </p>
                        )}

                        {/* BLAZE Logo/Branding */}
                        <div className="absolute bottom-6 left-6 flex items-center gap-2">
                          <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                            <Flame className="w-6 h-6 text-white" />
                          </div>
                          <div className="text-left">
                            <div className="font-bold text-white text-sm">BLAZE</div>
                            <div className="text-white/80 text-xs">blazewallet.io</div>
                          </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-6 right-6 w-20 h-20 bg-white/10 rounded-full blur-2xl" />
                        <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/5 rounded-full blur-3xl" />
                      </div>
                    </div>

                    {/* Post Text Preview */}
                    <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <Flame className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-gray-900">BLAZE Wallet</span>
                            <span className="text-gray-500">@BLAZEwallet</span>
                          </div>
                          <p className="text-gray-800 whitespace-pre-wrap text-sm">
                            {selectedPost.content.substring(0, 280)}
                            {selectedPost.content.length > 280 && '...'}
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
                          Gekopieerd!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4" />
                          Kopieer tekst
                        </>
                      )}
                    </button>
                  </div>

                  {/* Engagement tip */}
                  {selectedPost.engagement && (
                    <div className="px-4 pb-4">
                      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                        <div className="flex items-start gap-2">
                          <Sparkles className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-amber-800">Engagement tip</p>
                            <p className="text-sm text-amber-700">{selectedPost.engagement}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <ImageIcon className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Selecteer een post</h3>
                  <p className="text-gray-500">
                    Klik op een post links om de visual preview te zien
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Stats Graphic Generator */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">
              Live Stats Graphic Generator
            </h3>
            <p className="text-gray-600 mb-6">
              Genereer automatisch een graphic met live stats uit Supabase. Perfect voor progress updates.
            </p>
            
            {/* Live Stats Visual */}
            <div 
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500 via-yellow-500 to-orange-600 max-w-xl"
              style={{ aspectRatio: '1200/675' }}
            >
              {/* Background pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }} />
              </div>

              <div className="relative h-full flex flex-col items-center justify-center p-8 text-center text-white">
                <div className="text-2xl font-bold mb-2 opacity-90">BLAZE Presale Update</div>
                
                <div className="grid grid-cols-3 gap-8 mt-4">
                  <div>
                    <div className="text-4xl font-black">{liveStats.waitlist.toLocaleString()}</div>
                    <div className="text-sm opacity-80">Waitlist</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black">${liveStats.raised.toLocaleString()}</div>
                    <div className="text-sm opacity-80">Committed</div>
                  </div>
                  <div>
                    <div className="text-4xl font-black">{liveStats.buyers}</div>
                    <div className="text-sm opacity-80">Participants</div>
                  </div>
                </div>

                <div className="mt-6 text-lg opacity-90">
                  blazewallet.io/presale
                </div>

                {/* BLAZE branding */}
                <div className="absolute bottom-6 left-6 flex items-center gap-2">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur rounded-xl flex items-center justify-center">
                    <Flame className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-white text-sm">BLAZE</div>
                    <div className="text-white/80 text-xs">Live stats</div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-gray-500 mt-4">
              Deze graphic update automatisch met live data. Screenshot wanneer je wilt posten.
            </p>
          </div>

        </div>
      </main>
    </div>
  );
}

