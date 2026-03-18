/**
 * Copy for waitlist presale drip emails. Each key = one send moment (24h, 3d, … after post-series, or apr30 17:00 UTC).
 * Each mail uses a different angle to trigger action; together they form a logical series.
 */
export type PresaleDripKey =
  | '24h'
  | '3d'
  | '5d'
  | '7d'
  | '10d'
  | '14d'
  | '17d'
  | '20d'
  | '23d'
  | '26d'
  | '29d'
  | '33d'
  | '36d'
  | '40d'
  | 'apr30';

export interface DripCopy {
  subject: string;
  headline: string;
  body: string;
}

const PRESALE_DRIP_COPY: Record<PresaleDripKey, DripCopy> = {
  '24h': {
    subject: '⏰ 24 hours in – the presale is open. Don’t get left behind',
    headline: 'The presale has been open for everyone for 24 hours',
    body: 'While others are still thinking about it, you can act. The BLAZE presale is live for everyone – same presale price, same bonus tiers. The only thing that changes over time is how many people are ahead of you in the queue. Secure your $BLAZE now and lock in your tier before the rush.',
  },
  '3d': {
    subject: '🔥 3 days in – early buyers are already in. Join them',
    headline: 'Early buyers are already in – where do you want to be?',
    body: 'For three days the presale has been open. Early supporters aren’t waiting for the “right moment” – they’re securing their tokens and their bonus tier now. There’s no better moment than today: same price, same bonuses, and you’re still in time to be part of the first wave before TGE and distribution.',
  },
  '5d': {
    subject: '🔒 This price disappears after April 30 – lock it in now',
    headline: 'This presale price is only available until 30 April',
    body: 'After April 30, this price is gone. The Token Generation Event follows and tokens are distributed – but the presale window is closed. Right now you can still buy at $0.008333 per BLAZE (58% off launch) and claim bonus tokens based on your tier. Don’t leave money on the table.',
  },
  '7d': {
    subject: '✨ One week of presale – bonus tiers are still wide open',
    headline: 'One week in – bonus tiers are still there for you',
    body: 'A week into the public presale, the bonus tiers are still active. Founders, Early Birds, Pioneers – the earlier you buy, the higher your tier and the more extra tokens you get. Buy once, lock in your tier, and you’re set for TGE. Make this week count.',
  },
  '10d': {
    subject: '🎯 You’re one step away from your $BLAZE',
    headline: 'You’re one step away from owning $BLAZE',
    body: 'You’ve been on the list. You’ve seen the presale open. The only thing left is to complete your purchase. Add funds to your BLAZE Wallet, open the presale section, and pay with crypto or via the deposit address. In a few minutes you could be holding your allocation. Why wait?',
  },
  '14d': {
    subject: '📅 Two weeks in – the window is still open',
    headline: 'Two weeks in – the presale window is still open',
    body: 'Two weeks ago we opened the presale for everyone. The window doesn’t stay open forever: it closes on 30 April. After that it’s TGE and distribution – no more presale, no more bonus tiers at this price. If you’ve been on the fence, this is your reminder: the chance is real and time-limited.',
  },
  '17d': {
    subject: '🚀 TGE is coming – get in before distribution',
    headline: 'TGE and token distribution are around the corner',
    body: 'After the presale closes on 30 April, the Token Generation Event takes place and tokens are distributed to everyone who bought in. The question is: will you be on that list? Buying now means you’re in before TGE, at the presale price, with your bonus tier locked in. Don’t watch from the sidelines.',
  },
  '20d': {
    subject: '💪 Most people wait. You can act today.',
    headline: 'Most people wait. You can act today.',
    body: 'The difference between “I wish I had” and “I’m in” is one decision. The presale is live, the steps are simple, and the bonus tiers are still there. Transfer to your BLAZE Wallet, open the presale, and complete your purchase. No complicated process – just a clear opportunity that ends 30 April.',
  },
  '23d': {
    subject: '⏳ Under a week until we hit the final stretch',
    headline: 'We’re entering the final stretch',
    body: 'In less than a week we’re in the last days of April – and the last days of the presale. After 30 April there’s no more presale price and no more bonus tiers like this. If you’ve been meaning to buy or add more, now is the moment. The countdown is real.',
  },
  '26d': {
    subject: '🏁 A few days left to secure your tier',
    headline: 'A few days left to secure your tier',
    body: 'The presale closes 30 April. That means only a few days left to lock in your allocation and your bonus tier. Every day you wait is one less day to act. Get into the presale section, choose your amount, and pay with crypto or via the deposit address. Your future self will thank you.',
  },
  '29d': {
    subject: '📌 Tomorrow is the last full day of April',
    headline: 'Tomorrow is the last full day of April',
    body: 'After tomorrow it’s 30 April – the last day of the presale. Then it’s TGE and token distribution. If you haven’t bought yet or want to add more, this is it. Same presale price, same bonus tiers, but the clock is about to run out. Don’t miss the cut-off.',
  },
  '33d': {
    subject: '📆 One week to go until April 30',
    headline: 'One week to go until April 30',
    body: 'In one week the presale closes. No more presale price, no more bonus tiers – just TGE and distribution for those who are in. You still have time to join them. Open your BLAZE Wallet, go to the presale, and complete your purchase. This is the home stretch.',
  },
  '36d': {
    subject: '⏰ Four days until the presale closes',
    headline: 'Four days until the presale closes',
    body: 'In four days the presale ends. After 30 April the only way to get BLAZE is at launch price – no presale discount, no bonus tiers. Right now you can still secure your allocation at $0.008333 per token and claim your tier bonus. Four days to decide; then the door closes.',
  },
  '40d': {
    subject: '🔥 Three days left – last chance for bonus tiers',
    headline: 'Three days left – last chance for bonus tiers',
    body: 'Three days. That’s what’s left of the presale. After that, bonus tiers and presale pricing are gone. If you’ve been waiting for a sign – this is it. Add funds, open the presale, and buy. Minimum $100, maximum $10,000 per wallet. Simple, limited, and ending soon.',
  },
  apr30: {
    subject: '🕔 Today: last hours of the presale – ends tonight',
    headline: 'Today: last hours of the presale',
    body: 'This is it. The presale closes today. After tonight there’s no more presale price and no more bonus tiers – only TGE and distribution for everyone who’s already in. Only a few hours left. If you’ve been on the fence, this is the last chance: open my.blazewallet.io, go to the presale, and complete your purchase before the window closes for good.',
  },
};

export function getPresaleDripCopy(key: PresaleDripKey): DripCopy {
  return PRESALE_DRIP_COPY[key];
}

export const PRESALE_DRIP_KEYS: PresaleDripKey[] = [
  '24h',
  '3d',
  '5d',
  '7d',
  '10d',
  '14d',
  '17d',
  '20d',
  '23d',
  '26d',
  '29d',
  '33d',
  '36d',
  '40d',
  'apr30',
];
