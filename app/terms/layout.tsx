import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Terms of Service: BLAZE Wallet',
  description:
    'Read the terms and conditions for using BLAZE Wallet, including service scope, responsibilities, and legal terms.',
  path: '/terms',
  keywords: [
    'BLAZE terms of service',
    'crypto wallet terms',
    'wallet legal terms',
    'user agreement',
  ],
});

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


