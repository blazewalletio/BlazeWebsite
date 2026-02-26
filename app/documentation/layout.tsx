import { Metadata } from 'next';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'BLAZE Documentation: Guides and Tutorials',
  description:
    'Learn how to use BLAZE Wallet with setup guides, QuickPay tutorials, AI feature walkthroughs, and security best practices.',
  path: '/documentation',
  keywords: [
    'BLAZE documentation',
    'crypto wallet guide',
    'QuickPay tutorial',
    'wallet security best practices',
    'AI wallet features',
  ],
});

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

