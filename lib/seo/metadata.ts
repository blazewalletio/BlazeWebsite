import type { Metadata } from 'next';
import { SEO_SITE } from '@/lib/seo/content';

type BuildPageMetadataInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
};

function absoluteUrl(path: string) {
  if (!path || path === '/') return SEO_SITE.url;
  return `${SEO_SITE.url}${path.startsWith('/') ? path : `/${path}`}`;
}

export function buildPageMetadata({
  title,
  description,
  path,
  keywords = [],
}: BuildPageMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const fullTitle = `${title} | ${SEO_SITE.name}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: fullTitle,
      description,
      url,
      siteName: SEO_SITE.name,
      type: 'website',
      locale: SEO_SITE.locale,
      images: [
        {
          url: SEO_SITE.ogImage,
          width: 1536,
          height: 1024,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [SEO_SITE.ogImage],
      creator: SEO_SITE.xHandle,
      site: SEO_SITE.xHandle,
    },
  };
}

export const defaultSiteMetadata: Metadata = {
  metadataBase: new URL(SEO_SITE.url),
  title: {
    default: `${SEO_SITE.name}: AI-Powered Crypto Wallet for Everyday Payments`,
    template: `%s | ${SEO_SITE.name}`,
  },
  description: SEO_SITE.description,
  keywords: [
    'crypto wallet',
    'BLAZE wallet',
    'QuickPay',
    'AI crypto wallet',
    'multi-chain wallet',
    'crypto payments',
    'non-custodial wallet',
    'Web3 wallet',
    'BSC wallet',
    'Ethereum wallet',
  ],
  authors: [{ name: `${SEO_SITE.name} Team`, url: SEO_SITE.url }],
  creator: SEO_SITE.name,
  publisher: SEO_SITE.name,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: `${SEO_SITE.name}: AI-Powered Crypto Wallet for Everyday Payments`,
    description: SEO_SITE.description,
    type: 'website',
    url: SEO_SITE.url,
    siteName: SEO_SITE.name,
    locale: SEO_SITE.locale,
    images: [
      {
        url: SEO_SITE.ogImage,
        width: 1536,
        height: 1024,
        alt: `${SEO_SITE.name}: AI-Powered Crypto Wallet for Everyday Payments`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SEO_SITE.name}: AI-Powered Crypto Wallet for Everyday Payments`,
    description: SEO_SITE.description,
    images: [SEO_SITE.ogImage],
    creator: SEO_SITE.xHandle,
    site: SEO_SITE.xHandle,
  },
  alternates: {
    canonical: SEO_SITE.url,
  },
  category: 'Finance',
};

