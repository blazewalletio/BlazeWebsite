import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Terms of Service: BLAZE Wallet',
  description: 'Terms and conditions for using BLAZE Wallet. Read our user agreement and service terms.',
  keywords: 'BLAZE terms of service, crypto wallet terms, user agreement, service terms',
  openGraph: {
    title: 'Terms of Service: BLAZE Wallet',
    description: 'Terms and conditions for using BLAZE Wallet. Read our user agreement and service terms.',
    url: 'https://www.blazewallet.io/terms',
    type: 'website',
  },
  twitter: {
    title: 'Terms of Service: BLAZE Wallet',
    description: 'Terms and conditions for using BLAZE Wallet. Read our user agreement and service terms.',
  },
  alternates: {
    canonical: 'https://www.blazewallet.io/terms',
  },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}


