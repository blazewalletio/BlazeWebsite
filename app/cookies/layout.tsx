import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Cookie Policy: BLAZE Wallet',
  description:
    'Learn which cookies BLAZE uses, what they do, and how to manage your cookie preferences on blazewallet.io.',
  path: '/cookies',
  keywords: [
    'BLAZE cookie policy',
    'website cookies',
    'cookie preferences',
    'privacy settings',
  ],
});

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


