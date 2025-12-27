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
  Users,
  DollarSign,
  Target,
  Clock,
  Sparkles,
  ExternalLink,
} from 'lucide-react';

// =============================================================================
// MARKETING CONTENT - EERLIJKE, PROFESSIONELE CONTENT
// =============================================================================

interface MarketingPost {
  id: string;
  day: number;
  week: number;
  phase: string;
  type: 'text' | 'thread' | 'visual' | 'poll';
  title: string;
  content: string;
  hashtags: string[];
  visual: {
    style: 'dark' | 'light' | 'gradient';
    layout: 'stat' | 'comparison' | 'list' | 'quote' | 'simple' | 'countdown';
    headline: string;
    subheadline?: string;
    stat?: string;
    statLabel?: string;
    items?: string[];
    showLogo?: boolean;
  };
  tip?: string;
}

const MARKETING_POSTS: MarketingPost[] = [
  // ==========================================================================
  // WEEK 1-2: EDUCATION - WAT MAAKT BLAZE UNIEK
  // ==========================================================================
  {
    id: 'w1d1',
    day: 1,
    week: 1,
    phase: 'Education',
    type: 'text',
    title: 'Smart Schedule Intro',
    content: `Wist je dat gas fees op Ethereum tot 10x kunnen variëren op één dag?

Smart Schedule analyseert real-time en voert je transactie uit op het goedkoopste moment.

Automatisch. Tot 40% besparing.

Geen enkele andere wallet doet dit.

blazewallet.io`,
    hashtags: ['BLAZE', 'Ethereum', 'gas', 'DeFi'],
    visual: {
      style: 'dark',
      layout: 'stat',
      headline: 'Smart Schedule',
      subheadline: 'Automatische gas optimalisatie',
      stat: '40%',
      statLabel: 'gemiddelde besparing op gas fees',
    },
    tip: 'Post in de ochtend wanneer gas fees vaak hoger zijn - maakt de boodschap relevanter.',
  },
  {
    id: 'w1d2',
    day: 2,
    week: 1,
    phase: 'Education',
    type: 'text',
    title: 'AI Assistant',
    content: `"Stuur 100 USDC naar @vriend"

Dat is het. Geen menu's. Geen adressen zoeken.

BLAZE AI begrijpt gewoon wat je wilt.

De eerste wallet die je verstaat.

blazewallet.io`,
    hashtags: ['AI', 'BLAZE', 'crypto', 'UX'],
    visual: {
      style: 'dark',
      layout: 'quote',
      headline: '"Stuur 100 USDC naar mama"',
      subheadline: 'BLAZE AI begrijpt wat je bedoelt',
    },
    tip: 'Vraag in de comments: "Wat zou jij tegen je wallet willen zeggen?"',
  },
  {
    id: 'w1d3',
    day: 3,
    week: 1,
    phase: 'Education',
    type: 'visual',
    title: 'QuickPay vs Traditioneel',
    content: `Crypto betalen bij een winkel:

Traditioneel:
→ Vraag om wallet adres
→ Kopieer (hopelijk geen typo)
→ Kies network
→ Stel gas in
→ Wacht op confirmatie

BLAZE QuickPay:
→ Scan QR
→ Bevestig

Niet sneller. Wel veel makkelijker.

blazewallet.io`,
    hashtags: ['QuickPay', 'BLAZE', 'crypto', 'payments'],
    visual: {
      style: 'dark',
      layout: 'comparison',
      headline: 'QuickPay',
      subheadline: 'Betalen zonder gedoe',
      items: ['Scan QR code', 'Bevestig bedrag', 'Klaar'],
    },
  },
  {
    id: 'w1d4',
    day: 4,
    week: 1,
    phase: 'Education',
    type: 'text',
    title: 'Scam Protection',
    content: `$3.8 miljard verloren aan crypto scams in 2024.

BLAZE scant ELKE transactie:

✓ Adres reputatie check
✓ Smart contract analyse
✓ Real-time risk score
✓ Waarschuwing voordat je bevestigt

Je ziet het risico vóórdat je je crypto kwijt bent.

blazewallet.io`,
    hashtags: ['security', 'BLAZE', 'crypto', 'scam'],
    visual: {
      style: 'dark',
      layout: 'stat',
      headline: 'Scam Protection',
      subheadline: 'Real-time risico analyse',
      stat: '$3.8B',
      statLabel: 'verloren aan scams in 2024',
    },
    tip: 'Link naar een recent scam nieuws artikel voor context.',
  },
  {
    id: 'w1d5',
    day: 5,
    week: 1,
    phase: 'Education',
    type: 'text',
    title: 'All-in-One',
    content: `Hoeveel crypto apps heb jij?

• Wallet voor storage
• DEX voor swaps
• Bridge voor cross-chain
• Exchange voor on-ramp
• Andere exchange voor off-ramp

BLAZE: Alles in 1 app.

Swap. Bridge. On-ramp. Off-ramp. 18+ chains.

Eén wallet. Klaar.

blazewallet.io`,
    hashtags: ['BLAZE', 'DeFi', 'crypto', 'wallet'],
    visual: {
      style: 'dark',
      layout: 'list',
      headline: 'Eén wallet. Alles.',
      items: ['Swap & Bridge', 'On-ramp & Off-ramp', '18+ blockchains', 'Fiat ↔ Crypto'],
    },
    tip: 'Poll optie: "Hoeveel crypto apps gebruik jij?" met opties 1-3, 4-6, 7+, Te veel',
  },
  {
    id: 'w1d6',
    day: 6,
    week: 1,
    phase: 'Education',
    type: 'thread',
    title: 'Smart Schedule Deep Dive',
    content: `Hoe Smart Schedule werkt 🧵

1/ Je maakt een transactie in BLAZE

2/ Je stelt je maximum gas prijs in
(bijv. "max 20 gwei")

3/ Smart Schedule monitort de chain

4/ Gas te hoog? → Wachten
Gas onder je max? → Automatisch uitvoeren

5/ Jij doet niks. Wij besparen je geld.

Gemiddelde besparing: 25-40%

Geen enkele andere wallet heeft dit.

blazewallet.io`,
    hashtags: ['SmartSchedule', 'BLAZE', 'gas', 'Ethereum'],
    visual: {
      style: 'gradient',
      layout: 'stat',
      headline: 'Smart Schedule',
      stat: '25-40%',
      statLabel: 'besparing op gas fees',
    },
  },
  {
    id: 'w1d7',
    day: 7,
    week: 1,
    phase: 'Education',
    type: 'text',
    title: 'Week 1 Recap',
    content: `BLAZE in het kort:

✓ Smart Schedule - Automatisch gas besparen
✓ AI Assistant - Praat tegen je wallet
✓ QuickPay - Betalen via QR
✓ Scam Protection - Real-time bescherming
✓ All-in-One - Swap, bridge, on/off-ramp

Dit is geen "nog een wallet".
Dit is de wallet die crypto simpel maakt.

Volgende week: De BLAZE presale.

blazewallet.io`,
    hashtags: ['BLAZE', 'crypto', 'wallet'],
    visual: {
      style: 'gradient',
      layout: 'list',
      headline: 'BLAZE Wallet',
      subheadline: 'Crypto simpel gemaakt',
      items: ['Smart Schedule', 'AI Assistant', 'QuickPay', 'Scam Protection'],
      showLogo: true,
    },
  },

  // Week 2: Meer education + presale teaser
  {
    id: 'w2d1',
    day: 1,
    week: 2,
    phase: 'Education',
    type: 'text',
    title: 'On-ramp & Off-ramp',
    content: `Crypto kopen met je bankrekening.
Crypto verkopen naar je bankrekening.

Allebei in BLAZE. Zonder externe exchanges.

Geen:
❌ Account aanmaken bij Binance
❌ KYC op 3 verschillende platforms
❌ Crypto overmaken tussen apps

Gewoon:
✓ Open BLAZE
✓ Koop of verkoop
✓ Klaar

blazewallet.io`,
    hashtags: ['onramp', 'offramp', 'BLAZE', 'crypto'],
    visual: {
      style: 'dark',
      layout: 'simple',
      headline: 'Fiat ↔ Crypto',
      subheadline: 'Direct in je wallet',
    },
  },
  {
    id: 'w2d2',
    day: 2,
    week: 2,
    phase: 'Education',
    type: 'text',
    title: 'Swap & Bridge',
    content: `ETH op Ethereum.
USDC nodig op Polygon.

Oude manier:
1. Zoek een bridge
2. Verbind wallet
3. Hoop dat het geen scam is
4. Bridge ETH naar Polygon
5. Zoek een DEX
6. Swap ETH naar USDC

BLAZE:
1. "Swap ETH naar USDC op Polygon"
2. Bevestig

Wij regelen de route. Jij betaalt de laagste fees.

blazewallet.io`,
    hashtags: ['swap', 'bridge', 'BLAZE', 'DeFi'],
    visual: {
      style: 'dark',
      layout: 'simple',
      headline: 'Swap & Bridge',
      subheadline: 'Cross-chain in één stap',
    },
  },
  {
    id: 'w2d3',
    day: 3,
    week: 2,
    phase: 'Education',
    type: 'text',
    title: '18 Chains',
    content: `BLAZE ondersteunt 18+ blockchains:

• Ethereum
• BSC
• Polygon
• Arbitrum
• Optimism
• Base
• Avalanche
• Solana
• Fantom
• Cronos
• En meer...

Eén wallet. Al je crypto. Overal.

blazewallet.io`,
    hashtags: ['multichain', 'BLAZE', 'crypto'],
    visual: {
      style: 'dark',
      layout: 'stat',
      headline: '18+ Chains',
      subheadline: 'Eén wallet voor alles',
      stat: '18+',
      statLabel: 'blockchains ondersteund',
    },
  },
  {
    id: 'w2d4',
    day: 4,
    week: 2,
    phase: 'Education',
    type: 'text',
    title: 'Non-Custodial',
    content: `"Not your keys, not your crypto."

BLAZE is 100% non-custodial.

• Jouw private keys blijven op jouw device
• Wij kunnen NOOIT bij je funds
• Alleen JIJ hebt toegang

Geen FTX-situaties. Geen "sorry, failliet".

Jouw crypto. Echt van jou.

blazewallet.io`,
    hashtags: ['noncustodial', 'BLAZE', 'security', 'crypto'],
    visual: {
      style: 'dark',
      layout: 'simple',
      headline: 'Non-Custodial',
      subheadline: 'Jouw keys. Jouw crypto.',
    },
    tip: 'Refereer naar recente exchange problemen voor context.',
  },
  {
    id: 'w2d5',
    day: 5,
    week: 2,
    phase: 'Education',
    type: 'text',
    title: 'Presale Teaser',
    content: `Volgende week: BLAZE Token Presale details.

Wat je kunt verwachten:
• Early bird pricing
• Bonus tiers voor vroege supporters
• Staking rewards tot 20% APY

Join de waitlist om als eerste te horen.

blazewallet.io`,
    hashtags: ['BLAZE', 'presale', 'crypto'],
    visual: {
      style: 'gradient',
      layout: 'simple',
      headline: 'Presale Coming',
      subheadline: 'Details volgende week',
      showLogo: true,
    },
  },
  {
    id: 'w2d6',
    day: 6,
    week: 2,
    phase: 'Education',
    type: 'text',
    title: 'Founder Quote',
    content: `"We hebben BLAZE niet gebouwd om nóg een wallet te maken.

We hebben het gebouwd omdat we zelf gefrustreerd waren. Copy-pasten van adressen. Verkeerde networks. Dure gas fees.

BLAZE is de wallet die wij zelf wilden gebruiken."

- Rick Schlimback, Founder

blazewallet.io`,
    hashtags: ['BLAZE', 'founder', 'crypto'],
    visual: {
      style: 'dark',
      layout: 'quote',
      headline: '"De wallet die wij zelf wilden"',
      subheadline: '- Rick Schlimback, Founder',
    },
  },
  {
    id: 'w2d7',
    day: 7,
    week: 2,
    phase: 'Education',
    type: 'text',
    title: 'Waitlist Update',
    content: `BLAZE Waitlist groeit. 🔥

Bedankt aan iedereen die zich heeft aangemeld.

Volgende week onthullen we de presale details:
• Tokenomics
• Pricing
• Bonus structuur

Nog niet op de waitlist? Nu is het moment.

blazewallet.io`,
    hashtags: ['BLAZE', 'waitlist', 'presale'],
    visual: {
      style: 'gradient',
      layout: 'simple',
      headline: 'Waitlist Growing',
      subheadline: 'Presale details coming soon',
      showLogo: true,
    },
  },

  // ==========================================================================
  // WEEK 3-4: PRESALE BUILDUP
  // ==========================================================================
  {
    id: 'w3d1',
    day: 1,
    week: 3,
    phase: 'Presale Buildup',
    type: 'thread',
    title: 'Tokenomics Reveal',
    content: `BLAZE Token - Volledige Tokenomics 🧵

1/ Total Supply: 1.000.000.000 BLAZE
Vast. Geen inflatie.

2/ Distributie:
• Presale: 12%
• Liquidity: 25%
• Staking rewards: 20%
• Development: 15%
• Marketing: 10%
• Team: 12% (6 maanden vesting)
• Reserve: 6%

3/ Burn Mechanism:
0.1% van elke transactie wordt verbrand.
Supply daalt over tijd.

4/ Presale Prijs: $0.00417
Launch Prijs: $0.01

58% korting voor presale deelnemers.

Meer details: blazewallet.io/presale`,
    hashtags: ['BLAZE', 'tokenomics', 'presale', 'crypto'],
    visual: {
      style: 'dark',
      layout: 'stat',
      headline: 'BLAZE Tokenomics',
      stat: '1B',
      statLabel: 'Total supply - fixed',
    },
  },
  {
    id: 'w3d2',
    day: 2,
    week: 3,
    phase: 'Presale Buildup',
    type: 'visual',
    title: 'Bonus Tiers',
    content: `BLAZE Presale Bonus Tiers:

Founders (eerste 100 kopers): +100% bonus
Early Birds (101-250): +75% bonus
Believers (251-500): +50% bonus
Supporters (501-1000): +35% bonus
Community (1001-2000): +20% bonus
Public (2000+): +10% bonus

Rekenvoorbeeld Founder tier:
Investeer €100 → Ontvang 47.962 BLAZE
Waarde bij launch: €479

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'bonus'],
    visual: {
      style: 'gradient',
      layout: 'stat',
      headline: 'Founder Bonus',
      stat: '+100%',
      statLabel: 'voor de eerste 100 kopers',
    },
  },
  {
    id: 'w3d3',
    day: 3,
    week: 3,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Staking Rewards',
    content: `BLAZE Staking (launch Q1 2026):

Flexible staking: 8% APY
→ Unstake wanneer je wilt

6 maanden lock: 15% APY
→ Hogere rewards, vaste periode

12 maanden lock: 20% APY
→ Maximum rewards

Stake je BLAZE. Verdien meer BLAZE.

blazewallet.io`,
    hashtags: ['staking', 'BLAZE', 'APY', 'DeFi'],
    visual: {
      style: 'dark',
      layout: 'stat',
      headline: 'Staking Rewards',
      stat: '20%',
      statLabel: 'APY (12 maanden lock)',
    },
  },
  {
    id: 'w3d4',
    day: 4,
    week: 3,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Why BLAZE Token',
    content: `Waarom een BLAZE token?

1. Governance
Token holders stemmen over nieuwe features en richting.

2. Fee discounts
Betaal fees met BLAZE voor korting.

3. Staking rewards
Verdien passief inkomen op je holdings.

4. Ecosystem growth
Token waarde groeit mee met BLAZE adoptie.

Dit is niet zomaar een token.
Dit is ownership in het BLAZE ecosysteem.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'token', 'utility', 'crypto'],
    visual: {
      style: 'dark',
      layout: 'list',
      headline: 'BLAZE Token Utility',
      items: ['Governance voting', 'Fee discounts', 'Staking rewards', 'Ecosystem ownership'],
    },
  },
  {
    id: 'w3d5',
    day: 5,
    week: 3,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Investment Case',
    content: `Waarom BLAZE?

✓ Unieke features die geen andere wallet heeft
✓ Werkend product, geen vaporware
✓ Deflationary tokenomics (0.1% burn)
✓ Staking tot 20% APY
✓ 58% presale korting

Plus: Een team dat daadwerkelijk bouwt.

Check onze website. Lees de whitepaper. Doe je eigen research.

blazewallet.io/whitepaper`,
    hashtags: ['BLAZE', 'investment', 'DYOR', 'crypto'],
    visual: {
      style: 'dark',
      layout: 'simple',
      headline: 'DYOR',
      subheadline: 'Lees de whitepaper',
    },
    tip: 'Stimuleer eigen research - bouwt vertrouwen.',
  },
  {
    id: 'w3d6',
    day: 6,
    week: 3,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Presale FAQ',
    content: `BLAZE Presale FAQ:

Wanneer?
→ Q1 2026 (exacte datum via waitlist)

Minimum investering?
→ $10

Maximum investering?
→ $2,500

Betaalmethodes?
→ USDC, BNB, ETH, of creditcard

Wanneer ontvang ik tokens?
→ Bij Token Generation Event (TGE)

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'FAQ'],
    visual: {
      style: 'dark',
      layout: 'simple',
      headline: 'Presale FAQ',
      subheadline: 'Alles wat je moet weten',
    },
  },
  {
    id: 'w3d7',
    day: 7,
    week: 3,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Countdown Announcement',
    content: `BLAZE Presale start over 14 dagen.

100 Founder spots.
+100% bonus.

Duizenden op de waitlist.

De rekening is simpel.

Zet de datum in je agenda.

blazewallet.io`,
    hashtags: ['BLAZE', 'presale', 'countdown'],
    visual: {
      style: 'gradient',
      layout: 'countdown',
      headline: '14 dagen',
      subheadline: 'tot BLAZE Presale',
    },
  },

  // Week 4: Meer buildup
  {
    id: 'w4d1',
    day: 1,
    week: 4,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Product vs Token',
    content: `Veel crypto projecten: token eerst, product later (misschien).

BLAZE: Product eerst.

De wallet is gebouwd. De features werken.
QuickPay, AI Assistant, Smart Schedule - het bestaat.

De token komt erbij voor governance en rewards.

Geen beloftes. Resultaten.

blazewallet.io`,
    hashtags: ['BLAZE', 'crypto', 'building'],
    visual: {
      style: 'dark',
      layout: 'simple',
      headline: 'Product First',
      subheadline: 'Geen beloftes. Resultaten.',
    },
  },
  {
    id: 'w4d2',
    day: 2,
    week: 4,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Referral Program',
    content: `BLAZE Referral Program is live.

Deel je unieke link. Verdien rewards.

Top referrers krijgen:
• Bonus allocatie in de presale
• Early access tot nieuwe features
• Exclusive community role

Je referral link staat in je waitlist email.

Nog niet aangemeld? blazewallet.io`,
    hashtags: ['BLAZE', 'referral', 'rewards'],
    visual: {
      style: 'gradient',
      layout: 'simple',
      headline: 'Referral Rewards',
      subheadline: 'Deel & verdien',
    },
  },
  {
    id: 'w4d3',
    day: 3,
    week: 4,
    phase: 'Presale Buildup',
    type: 'text',
    title: '10 Days',
    content: `10 dagen tot BLAZE presale.

Quick recap wat je krijgt:

• 58% korting vs launch prijs
• Tot +100% bonus tokens
• Governance rights
• Staking rewards tot 20% APY

En een wallet die je daadwerkelijk wilt gebruiken.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'countdown'],
    visual: {
      style: 'gradient',
      layout: 'countdown',
      headline: '10 dagen',
      subheadline: 'BLAZE Presale',
    },
  },
  {
    id: 'w4d4',
    day: 4,
    week: 4,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Community Growth',
    content: `BLAZE community update:

De waitlist groeit elke dag. Uit 25+ landen.

Wat mensen zeggen:

"Eindelijk een wallet die niet 10 stappen nodig heeft"

"Smart Schedule alleen al is het waard"

"Non-custodial + goede UX = zeldzaam"

Bedankt voor de support.

blazewallet.io`,
    hashtags: ['BLAZE', 'community', 'crypto'],
    visual: {
      style: 'dark',
      layout: 'stat',
      headline: 'Community',
      stat: '25+',
      statLabel: 'landen op de waitlist',
    },
  },
  {
    id: 'w4d5',
    day: 5,
    week: 4,
    phase: 'Presale Buildup',
    type: 'text',
    title: '7 Days',
    content: `1 week tot presale.

Checklist:
☐ Op waitlist (wordt als eerste genotified)
☐ Whitepaper gelezen
☐ Funds klaar (USDC, BNB, ETH)

Founder tier: 100 spots.
Bonus: +100%.

blazewallet.io`,
    hashtags: ['BLAZE', 'presale', '7days'],
    visual: {
      style: 'gradient',
      layout: 'countdown',
      headline: '7 dagen',
      subheadline: 'Presale countdown',
    },
  },
  {
    id: 'w4d6',
    day: 6,
    week: 4,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Security Note',
    content: `Security reminder:

De ENIGE officiële BLAZE links:
• Website: blazewallet.io
• Twitter: @BLAZEwallet

Wij vragen NOOIT om je:
• Private keys
• Seed phrase
• Wachtwoorden

Scammers worden actiever rond presales. Stay safe.

blazewallet.io`,
    hashtags: ['BLAZE', 'security', 'scam'],
    visual: {
      style: 'dark',
      layout: 'simple',
      headline: 'Stay Safe',
      subheadline: 'Alleen blazewallet.io',
    },
    tip: 'Belangrijke post - pin deze voor de presale week.',
  },
  {
    id: 'w4d7',
    day: 7,
    week: 4,
    phase: 'Presale Buildup',
    type: 'text',
    title: 'Final Week',
    content: `Volgende week: BLAZE presale gaat live.

Wat je moet weten:
• Maandag: 5 dagen countdown
• Donderdag: Final prep post
• Vrijdag: PRESALE LIVE

Dit wordt de laatste week van educatie.
Daarna is het tijd om te bouwen.

blazewallet.io`,
    hashtags: ['BLAZE', 'presale', 'launch'],
    visual: {
      style: 'gradient',
      layout: 'simple',
      headline: 'Final Week',
      subheadline: 'Presale incoming',
      showLogo: true,
    },
  },

  // ==========================================================================
  // WEEK 5: COUNTDOWN
  // ==========================================================================
  {
    id: 'w5d1',
    day: 1,
    week: 5,
    phase: 'Countdown',
    type: 'text',
    title: '5 Days',
    content: `5 dagen.

Presale prijs: $0.00417
Founder bonus: +100%
Spots: 100

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', '5days'],
    visual: {
      style: 'gradient',
      layout: 'countdown',
      headline: '5',
      subheadline: 'dagen tot presale',
    },
  },
  {
    id: 'w5d2',
    day: 2,
    week: 5,
    phase: 'Countdown',
    type: 'text',
    title: '4 Days',
    content: `4 dagen.

Last minute FAQ:

Kan ik meerdere keren kopen?
→ Ja, tot max $2,500 totaal

Welk network?
→ BSC (BEP-20)

Wanneer trading?
→ Na TGE, datum volgt

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', '4days'],
    visual: {
      style: 'gradient',
      layout: 'countdown',
      headline: '4',
      subheadline: 'dagen tot presale',
    },
  },
  {
    id: 'w5d3',
    day: 3,
    week: 5,
    phase: 'Countdown',
    type: 'text',
    title: '3 Days',
    content: `3 dagen.

Referral leaderboard update:

Top 10 referrers krijgen extra allocatie.
Je link staat in je waitlist email.

Laatste kans om te klimmen.

blazewallet.io`,
    hashtags: ['BLAZE', 'presale', '3days', 'referral'],
    visual: {
      style: 'gradient',
      layout: 'countdown',
      headline: '3',
      subheadline: 'dagen tot presale',
    },
  },
  {
    id: 'w5d4',
    day: 4,
    week: 5,
    phase: 'Countdown',
    type: 'text',
    title: '2 Days',
    content: `48 uur.

Final checklist:
☐ Wallet ready met USDC/BNB/ETH
☐ blazewallet.io/presale bookmarked
☐ Notifications aan voor @BLAZEwallet

Founder tier gaat snel.

blazewallet.io`,
    hashtags: ['BLAZE', 'presale', '48hours'],
    visual: {
      style: 'gradient',
      layout: 'countdown',
      headline: '48',
      subheadline: 'uur tot presale',
    },
  },
  {
    id: 'w5d5',
    day: 5,
    week: 5,
    phase: 'Countdown',
    type: 'text',
    title: '1 Day',
    content: `Morgen.

BLAZE Presale - 09:00 UTC

Wees er op tijd. Founder spots zijn beperkt.

Tot morgen.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'tomorrow'],
    visual: {
      style: 'gradient',
      layout: 'countdown',
      headline: 'Morgen',
      subheadline: '09:00 UTC',
    },
  },
  {
    id: 'w5d6',
    day: 6,
    week: 5,
    phase: 'Countdown',
    type: 'text',
    title: 'Launch Day Eve',
    content: `Over een paar uur.

Alles is klaar. Het team is ready.

Presale gaat live om 09:00 UTC.

Set your alarms.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'launch'],
    visual: {
      style: 'gradient',
      layout: 'simple',
      headline: 'Ready',
      subheadline: '09:00 UTC morgen',
      showLogo: true,
    },
  },
  {
    id: 'w5d7',
    day: 7,
    week: 5,
    phase: 'Countdown',
    type: 'text',
    title: 'Launch Day Morning',
    content: `Vandaag is de dag.

Presale gaat LIVE om 09:00 UTC.

Link: blazewallet.io/presale

See you there.`,
    hashtags: ['BLAZE', 'presale', 'LIVE'],
    visual: {
      style: 'gradient',
      layout: 'simple',
      headline: 'Launch Day',
      subheadline: '09:00 UTC',
      showLogo: true,
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
    type: 'text',
    title: 'PRESALE LIVE',
    content: `BLAZE Presale is LIVE.

blazewallet.io/presale

Founder tier beschikbaar.`,
    hashtags: ['BLAZE', 'presale', 'LIVE'],
    visual: {
      style: 'gradient',
      layout: 'simple',
      headline: 'LIVE',
      subheadline: 'Presale is open',
      showLogo: true,
    },
  },
  {
    id: 'w6d2',
    day: 2,
    week: 6,
    phase: 'Presale Live',
    type: 'text',
    title: 'Update 1',
    content: `Presale Update:

Founder tier: [STATUS]
Raised: $[AMOUNT]
Participants: [NUMBER]

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'update'],
    visual: {
      style: 'gradient',
      layout: 'stat',
      headline: 'Presale Update',
      stat: 'LIVE',
      statLabel: 'Check status op website',
    },
    tip: 'Vul de echte cijfers in uit de admin.',
  },
  {
    id: 'w6d3',
    day: 3,
    week: 6,
    phase: 'Presale Live',
    type: 'text',
    title: 'Thank You',
    content: `Aan iedereen die heeft deelgenomen:

Bedankt voor het vertrouwen.

Dit is pas het begin. We bouwen door.

Wallet launch: Q1 2026
Staking: Q1 2026

Stay tuned.

blazewallet.io`,
    hashtags: ['BLAZE', 'thankyou', 'community'],
    visual: {
      style: 'dark',
      layout: 'simple',
      headline: 'Thank You',
      subheadline: 'We bouwen door',
    },
  },
  {
    id: 'w6d4',
    day: 4,
    week: 6,
    phase: 'Presale Live',
    type: 'text',
    title: 'Progress Update',
    content: `Presale voortgang:

$[AMOUNT] raised
[NUMBER] deelnemers

Huidige tier: [TIER] (+[X]% bonus)

Nog tijd om mee te doen.

blazewallet.io/presale`,
    hashtags: ['BLAZE', 'presale', 'progress'],
    visual: {
      style: 'gradient',
      layout: 'stat',
      headline: 'Progress',
      stat: '$[X]K',
      statLabel: 'raised',
    },
  },
  {
    id: 'w6d5',
    day: 5,
    week: 6,
    phase: 'Presale Live',
    type: 'text',
    title: 'Referral Winners',
    content: `Referral Leaderboard - Finale stand:

🥇 @[user1]
🥈 @[user2]
🥉 @[user3]

Bonus allocaties worden toegevoegd.

Bedankt aan iedereen die heeft gedeeld.

blazewallet.io`,
    hashtags: ['BLAZE', 'referral', 'winners'],
    visual: {
      style: 'gradient',
      layout: 'simple',
      headline: 'Top Referrers',
      subheadline: 'Bedankt voor het delen',
    },
  },
  {
    id: 'w6d6',
    day: 6,
    week: 6,
    phase: 'Presale Live',
    type: 'text',
    title: 'Whats Next',
    content: `Wat komt er na de presale?

Q1 2026:
• iOS & Android app launch
• Token Generation Event (TGE)
• Staking goes live
• Exchange listings

We houden jullie op de hoogte.

blazewallet.io`,
    hashtags: ['BLAZE', 'roadmap', 'future'],
    visual: {
      style: 'dark',
      layout: 'list',
      headline: "What's Next",
      items: ['App launch', 'TGE', 'Staking', 'Listings'],
    },
  },
  {
    id: 'w6d7',
    day: 7,
    week: 6,
    phase: 'Presale Live',
    type: 'text',
    title: 'Week 1 Recap',
    content: `Presale Week 1 - Recap

✓ $[AMOUNT] raised
✓ [NUMBER] deelnemers
✓ [X] landen

Dit is nog maar het begin.

Volgende week: Development updates.

Bedankt voor het geloof in BLAZE.

blazewallet.io`,
    hashtags: ['BLAZE', 'presale', 'recap'],
    visual: {
      style: 'gradient',
      layout: 'simple',
      headline: 'Week 1 Done',
      subheadline: 'We bouwen door',
      showLogo: true,
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

  const getPhaseDescription = (week: number) => {
    switch (week) {
      case 1:
      case 2:
        return 'Focus op educatie: wat maakt BLAZE uniek?';
      case 3:
      case 4:
        return 'Presale buildup: tokenomics, bonussen, community';
      case 5:
        return 'Final countdown: dagelijkse updates';
      case 6:
        return 'Presale live: updates en community';
      default:
        return '';
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
              6 weken aan content voor X. Eerlijke messaging, professionele uitstraling.
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
          <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold text-gray-900">Content Calendar</h2>
                <p className="text-sm text-gray-500 mt-1">{getPhaseDescription(selectedWeek)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedWeek(Math.max(1, selectedWeek - 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 transition-colors"
                  disabled={selectedWeek === 1}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <span className="font-medium text-gray-900 min-w-[100px] text-center">
                  Week {selectedWeek}
                </span>
                <button
                  onClick={() => setSelectedWeek(Math.min(6, selectedWeek + 1))}
                  className="p-2 hover:bg-gray-100 rounded-lg disabled:opacity-50 transition-colors"
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
                  onClick={() => { setSelectedWeek(week); setSelectedPost(null); }}
                  className={`p-3 rounded-xl text-center transition-all ${
                    selectedWeek === week
                      ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg shadow-orange-500/20'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <div className="font-bold text-sm">Week {week}</div>
                  <div className="text-xs mt-1 opacity-80">
                    {week <= 2 ? 'Education' : 
                     week <= 4 ? 'Buildup' : 
                     week === 5 ? 'Countdown' : 
                     'Launch'}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Post List */}
            <div className="space-y-3">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-orange-500" />
                Week {selectedWeek} Posts
              </h3>
              {weekPosts.map((post) => (
                <div
                  key={post.id}
                  onClick={() => setSelectedPost(post)}
                  className={`bg-white rounded-xl p-4 shadow-sm border cursor-pointer transition-all hover:shadow-md ${
                    selectedPost?.id === post.id 
                      ? 'border-orange-500 ring-2 ring-orange-100' 
                      : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-orange-600 bg-orange-50 px-2 py-1 rounded-md">
                          Dag {post.day}
                        </span>
                        <span className="text-xs text-gray-500">
                          {post.type === 'thread' ? '🧵 Thread' : post.type === 'visual' ? '🖼️ Visual' : '📝 Post'}
                        </span>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-1">{post.title}</h4>
                      <p className="text-sm text-gray-500 line-clamp-2">{post.content.substring(0, 100)}...</p>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        const fullText = post.content + '\n\n' + post.hashtags.map(h => '#' + h).join(' ');
                        copyToClipboard(fullText, post.id);
                      }}
                      className="p-2 hover:bg-gray-100 rounded-lg flex-shrink-0 transition-colors"
                      title="Kopieer tekst"
                    >
                      {copiedId === post.id ? (
                        <Check className="w-4 h-4 text-emerald-500" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Right: Preview */}
            <div className="lg:sticky lg:top-8 space-y-6">
              {selectedPost ? (
                <>
                  {/* Visual Preview */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                      <h3 className="font-semibold text-gray-900">Visual Preview</h3>
                      <p className="text-sm text-gray-500">Screenshot voor X (1200x675px)</p>
                    </div>
                    
                    {/* The Visual */}
                    <div className="p-4">
                      <div 
                        className={`relative rounded-2xl overflow-hidden ${
                          selectedPost.visual.style === 'dark' 
                            ? 'bg-slate-900' 
                            : selectedPost.visual.style === 'gradient'
                            ? 'bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500'
                            : 'bg-white border border-gray-200'
                        }`}
                        style={{ aspectRatio: '1200/675' }}
                      >
                        {/* Subtle pattern for dark/gradient */}
                        {selectedPost.visual.style !== 'light' && (
                          <div className="absolute inset-0 opacity-[0.03]">
                            <div className="absolute inset-0" style={{
                              backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                              backgroundSize: '32px 32px'
                            }} />
                          </div>
                        )}

                        {/* Content */}
                        <div className={`relative h-full flex flex-col items-center justify-center p-8 ${
                          selectedPost.visual.style === 'light' ? 'text-gray-900' : 'text-white'
                        }`}>
                          
                          {/* Stat layout */}
                          {selectedPost.visual.layout === 'stat' && (
                            <>
                              {selectedPost.visual.stat && (
                                <div className="text-6xl md:text-7xl font-black mb-2 tracking-tight">
                                  {selectedPost.visual.stat}
                                </div>
                              )}
                              {selectedPost.visual.statLabel && (
                                <div className="text-lg md:text-xl opacity-80 mb-4 text-center max-w-md">
                                  {selectedPost.visual.statLabel}
                                </div>
                              )}
                              <div className="text-2xl md:text-3xl font-bold text-center">
                                {selectedPost.visual.headline}
                              </div>
                              {selectedPost.visual.subheadline && (
                                <div className="text-lg opacity-80 mt-2 text-center">
                                  {selectedPost.visual.subheadline}
                                </div>
                              )}
                            </>
                          )}

                          {/* Simple layout */}
                          {selectedPost.visual.layout === 'simple' && (
                            <>
                              <div className="text-3xl md:text-4xl font-bold text-center mb-2">
                                {selectedPost.visual.headline}
                              </div>
                              {selectedPost.visual.subheadline && (
                                <div className="text-xl opacity-80 text-center">
                                  {selectedPost.visual.subheadline}
                                </div>
                              )}
                            </>
                          )}

                          {/* Quote layout */}
                          {selectedPost.visual.layout === 'quote' && (
                            <>
                              <div className="text-2xl md:text-3xl font-bold text-center italic mb-4 max-w-lg">
                                {selectedPost.visual.headline}
                              </div>
                              {selectedPost.visual.subheadline && (
                                <div className="text-lg opacity-70 text-center">
                                  {selectedPost.visual.subheadline}
                                </div>
                              )}
                            </>
                          )}

                          {/* List layout */}
                          {selectedPost.visual.layout === 'list' && (
                            <>
                              <div className="text-2xl md:text-3xl font-bold text-center mb-6">
                                {selectedPost.visual.headline}
                              </div>
                              {selectedPost.visual.subheadline && (
                                <div className="text-lg opacity-80 text-center mb-4">
                                  {selectedPost.visual.subheadline}
                                </div>
                              )}
                              {selectedPost.visual.items && (
                                <div className="space-y-2">
                                  {selectedPost.visual.items.map((item, i) => (
                                    <div key={i} className="flex items-center gap-3 text-lg">
                                      <div className={`w-2 h-2 rounded-full ${
                                        selectedPost.visual.style === 'light' ? 'bg-orange-500' : 'bg-white'
                                      }`} />
                                      {item}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          )}

                          {/* Comparison layout */}
                          {selectedPost.visual.layout === 'comparison' && (
                            <>
                              <div className="text-2xl md:text-3xl font-bold text-center mb-2">
                                {selectedPost.visual.headline}
                              </div>
                              {selectedPost.visual.subheadline && (
                                <div className="text-lg opacity-80 text-center mb-6">
                                  {selectedPost.visual.subheadline}
                                </div>
                              )}
                              {selectedPost.visual.items && (
                                <div className="flex items-center gap-4">
                                  {selectedPost.visual.items.map((item, i) => (
                                    <div key={i} className="flex items-center gap-2 text-lg">
                                      <span className="font-bold">{i + 1}.</span> {item}
                                      {i < selectedPost.visual.items!.length - 1 && (
                                        <span className="mx-2 opacity-50">→</span>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </>
                          )}

                          {/* Countdown layout */}
                          {selectedPost.visual.layout === 'countdown' && (
                            <>
                              <div className="text-7xl md:text-8xl font-black mb-2 tracking-tight">
                                {selectedPost.visual.headline}
                              </div>
                              {selectedPost.visual.subheadline && (
                                <div className="text-xl md:text-2xl opacity-80 text-center">
                                  {selectedPost.visual.subheadline}
                                </div>
                              )}
                            </>
                          )}

                          {/* Logo */}
                          {selectedPost.visual.showLogo && (
                            <div className="absolute bottom-6 left-6">
                              <Image 
                                src="/blaze-logo.png" 
                                alt="BLAZE" 
                                width={40} 
                                height={40}
                                className="rounded-xl"
                              />
                            </div>
                          )}

                          {/* URL */}
                          <div className={`absolute bottom-6 right-6 text-sm font-medium ${
                            selectedPost.visual.style === 'light' ? 'text-gray-500' : 'text-white/60'
                          }`}>
                            blazewallet.io
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Post Text */}
                  <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 flex items-center justify-between">
                      <h3 className="font-semibold text-gray-900">Post tekst</h3>
                      <button
                        onClick={() => {
                          const fullText = selectedPost.content + '\n\n' + selectedPost.hashtags.map(h => '#' + h).join(' ');
                          copyToClipboard(fullText, 'full-' + selectedPost.id);
                        }}
                        className="flex items-center gap-2 px-3 py-1.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
                      >
                        {copiedId === 'full-' + selectedPost.id ? (
                          <>
                            <Check className="w-4 h-4" />
                            Gekopieerd!
                          </>
                        ) : (
                          <>
                            <Copy className="w-4 h-4" />
                            Kopieer
                          </>
                        )}
                      </button>
                    </div>
                    <div className="p-4">
                      <div className="bg-gray-50 rounded-xl p-4">
                        <p className="text-gray-800 whitespace-pre-wrap text-sm leading-relaxed">
                          {selectedPost.content}
                        </p>
                        <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-gray-200">
                          {selectedPost.hashtags.map((tag) => (
                            <span key={tag} className="text-sm text-blue-600 font-medium">#{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Tip */}
                  {selectedPost.tip && (
                    <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Sparkles className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="font-medium text-amber-800 mb-1">Tip</p>
                          <p className="text-sm text-amber-700">{selectedPost.tip}</p>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
                  <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Selecteer een post</h3>
                  <p className="text-gray-500">
                    Klik op een post om de preview te zien
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Live Stats Graphic */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">Live Stats Graphic</h3>
                <p className="text-sm text-gray-500">Automatisch gegenereerd met actuele data</p>
              </div>
              <a 
                href="/presale" 
                target="_blank"
                className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700"
              >
                <ExternalLink className="w-4 h-4" />
                Open presale pagina
              </a>
            </div>
            
            <div 
              className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-500 max-w-2xl"
              style={{ aspectRatio: '1200/675' }}
            >
              <div className="absolute inset-0 opacity-[0.03]">
                <div className="absolute inset-0" style={{
                  backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                  backgroundSize: '32px 32px'
                }} />
              </div>

              <div className="relative h-full flex flex-col items-center justify-center p-8 text-white">
                <div className="text-xl font-bold mb-6 opacity-90">BLAZE Presale Status</div>
                
                <div className="grid grid-cols-3 gap-12">
                  <div className="text-center">
                    <div className="text-4xl font-black">{liveStats.waitlist.toLocaleString()}</div>
                    <div className="text-sm opacity-80 mt-1">Waitlist</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black">${liveStats.raised.toLocaleString()}</div>
                    <div className="text-sm opacity-80 mt-1">Committed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-black">{liveStats.buyers}</div>
                    <div className="text-sm opacity-80 mt-1">Participants</div>
                  </div>
                </div>

                <div className="absolute bottom-6 left-6">
                  <Image 
                    src="/blaze-logo.png" 
                    alt="BLAZE" 
                    width={36} 
                    height={36}
                    className="rounded-lg"
                  />
                </div>

                <div className="absolute bottom-6 right-6 text-sm font-medium text-white/60">
                  blazewallet.io
                </div>
              </div>
            </div>
          </div>

          {/* Guidelines */}
          <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <h3 className="font-semibold text-gray-900 mb-4">Posting Guidelines</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Timing</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Primair: 15:00-17:00 CET</li>
                  <li>• Secundair: 21:00-23:00 CET</li>
                  <li>• Countdown week: 2x per dag</li>
                </ul>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Engagement</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Reageer op elke reply (eerste uur)</li>
                  <li>• Retweet community mentions</li>
                  <li>• Pin security reminder voor presale</li>
                </ul>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
