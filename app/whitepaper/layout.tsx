import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'BLAZE Whitepaper: Vision, Tokenomics, and Roadmap',
  description:
    'Read the BLAZE whitepaper with QuickPay architecture, tokenomics, security principles, and roadmap milestones for everyday crypto payments.',
  path: '/whitepaper',
  keywords: [
    'BLAZE whitepaper',
    'crypto wallet whitepaper',
    'tokenomics',
    'QuickPay architecture',
    'BLAZE roadmap',
  ],
});

export default function WhitepaperLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


