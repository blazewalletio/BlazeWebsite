import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BLAZE Support - Help Center & Contact',
  description: 'Get help with BLAZE Wallet. Contact our team via email or Telegram. Average response time under 24 hours.',
  keywords: 'BLAZE support, crypto wallet help, contact BLAZE, customer service, wallet support',
  openGraph: {
    title: 'BLAZE Support - Help Center & Contact',
    description: 'Get help with BLAZE Wallet. Contact our team via email or Telegram. Average response time under 24 hours.',
    url: 'https://www.blazewallet.io/support',
    type: 'website',
  },
  twitter: {
    title: 'BLAZE Support - Help Center & Contact',
    description: 'Get help with BLAZE Wallet. Contact our team via email or Telegram. Average response time under 24 hours.',
  },
  alternates: {
    canonical: 'https://www.blazewallet.io/support',
  },
};

export default function SupportLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

