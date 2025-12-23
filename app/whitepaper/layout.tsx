import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BLAZE Whitepaper - Vision, Tokenomics & Roadmap',
  description: 'Complete whitepaper: QuickPay technology, token distribution, staking rewards up to 20% APY, and our roadmap to global crypto payments.',
  keywords: 'BLAZE whitepaper, crypto whitepaper, tokenomics, QuickPay, staking rewards, DeFi roadmap, BLAZE token',
  openGraph: {
    title: 'BLAZE Whitepaper - Vision, Tokenomics & Roadmap',
    description: 'Complete whitepaper: QuickPay technology, token distribution, staking rewards up to 20% APY, and our roadmap to global crypto payments.',
    url: 'https://www.blazewallet.io/whitepaper',
    type: 'article',
  },
  twitter: {
    title: 'BLAZE Whitepaper - Vision, Tokenomics & Roadmap',
    description: 'Complete whitepaper: QuickPay technology, token distribution, staking rewards up to 20% APY, and our roadmap to global crypto payments.',
  },
  alternates: {
    canonical: 'https://www.blazewallet.io/whitepaper',
  },
};

export default function WhitepaperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

