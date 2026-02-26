import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Privacy Policy: BLAZE Wallet',
  description:
    'Read how BLAZE Wallet handles personal data, cookies, and privacy rights for users of our website and wallet services.',
  path: '/privacy',
  keywords: [
    'BLAZE privacy policy',
    'crypto wallet privacy',
    'GDPR crypto wallet',
    'data protection policy',
  ],
});

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


