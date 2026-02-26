import type { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'BLAZE Learn: Crypto Wallet Guides for Everyday Payments',
  description:
    'Learn crypto wallet basics, QR code payments, and non-custodial security with practical BLAZE guides for everyday users.',
  path: '/learn',
  keywords: [
    'crypto wallet guides',
    'learn crypto payments',
    'QR code crypto payment guide',
    'non-custodial wallet education',
  ],
});

export default function LearnLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

