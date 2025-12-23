import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Privacy Policy - BLAZE Wallet',
  description: 'How we protect your data. GDPR compliant, non-custodial wallet. Your keys, your crypto, your privacy.',
  keywords: 'BLAZE privacy policy, crypto wallet privacy, GDPR, data protection, non-custodial wallet',
  openGraph: {
    title: 'Privacy Policy - BLAZE Wallet',
    description: 'How we protect your data. GDPR compliant, non-custodial wallet. Your keys, your crypto, your privacy.',
    url: 'https://www.blazewallet.io/privacy',
    type: 'website',
  },
  twitter: {
    title: 'Privacy Policy - BLAZE Wallet',
    description: 'How we protect your data. GDPR compliant, non-custodial wallet. Your keys, your crypto, your privacy.',
  },
  alternates: {
    canonical: 'https://www.blazewallet.io/privacy',
  },
};

export default function PrivacyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

