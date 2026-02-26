import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'BLAZE Support: Help Center and Contact',
  description:
    'Get help with BLAZE Wallet via support guides, email, and Telegram. Find answers for setup, security, and payment flows.',
  path: '/support',
  keywords: [
    'BLAZE support',
    'crypto wallet help',
    'wallet support center',
    'BLAZE contact',
  ],
});

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


