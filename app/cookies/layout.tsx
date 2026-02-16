import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Cookie Policy: BLAZE Wallet',
  description: 'Information about cookies on blazewallet.io. Manage your preferences and learn what data we collect.',
  keywords: 'BLAZE cookies, cookie policy, website cookies, privacy preferences',
  openGraph: {
    title: 'Cookie Policy: BLAZE Wallet',
    description: 'Information about cookies on blazewallet.io. Manage your preferences and learn what data we collect.',
    url: 'https://www.blazewallet.io/cookies',
    type: 'website',
  },
  twitter: {
    title: 'Cookie Policy: BLAZE Wallet',
    description: 'Information about cookies on blazewallet.io. Manage your preferences and learn what data we collect.',
  },
  alternates: {
    canonical: 'https://www.blazewallet.io/cookies',
  },
};

export default function CookiesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


