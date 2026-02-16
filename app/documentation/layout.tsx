import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'BLAZE Documentation: Guides & Tutorials',
  description: 'Learn how to use BLAZE Wallet. Setup guides, QuickPay tutorials, AI features, and security best practices.',
  keywords: 'BLAZE documentation, crypto wallet guide, QuickPay tutorial, wallet setup, AI wallet features, security guide',
  openGraph: {
    title: 'BLAZE Documentation: Guides & Tutorials',
    description: 'Learn how to use BLAZE Wallet. Setup guides, QuickPay tutorials, AI features, and security best practices.',
    url: 'https://www.blazewallet.io/documentation',
    type: 'website',
  },
  twitter: {
    title: 'BLAZE Documentation: Guides & Tutorials',
    description: 'Learn how to use BLAZE Wallet. Setup guides, QuickPay tutorials, AI features, and security best practices.',
  },
  alternates: {
    canonical: 'https://www.blazewallet.io/documentation',
  },
};

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

