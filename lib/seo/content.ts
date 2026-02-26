import { PRESALE_CONSTANTS } from '@/lib/presale-constants';

export const SEO_SITE = {
  name: 'BLAZE Wallet',
  url: 'https://www.blazewallet.io',
  description:
    'Pay with crypto anywhere. QuickPay, AI assistant, scam protection, and multi-chain support for everyday payments.',
  ogImage: 'https://www.blazewallet.io/og-image.png',
  locale: 'en_US',
  xHandle: '@blazewallet_io',
  contactEmail: 'info@blazewallet.io',
  country: 'NL',
  city: 'Groningen',
} as const;

export const SEO_PRODUCT_FACTS = {
  chainsLabel: '18+ blockchains',
  nonCustodialLabel: 'Non-custodial wallet',
  presalePriceLabel: `$${PRESALE_CONSTANTS.presalePrice.toFixed(6)}`,
  launchPriceLabel: `$${PRESALE_CONSTANTS.launchPrice.toFixed(2)}`,
  presaleDiscountLabel: `${PRESALE_CONSTANTS.presaleDiscount}%`,
  minContributionLabel: `$${PRESALE_CONSTANTS.minContribution}`,
  maxContributionLabel: `$${PRESALE_CONSTANTS.maxContribution.toLocaleString()}`,
} as const;

export const SEO_FAQS = [
  {
    question: 'What is the difference between BLAZE Wallet and BLAZE Token?',
    answer:
      'BLAZE Wallet is the core crypto wallet product. BLAZE Token ($BLAZE) is the utility token used inside the BLAZE Wallet ecosystem for cashback, staking, governance, fee discounts, premium benefits, and other token-powered features.',
  },
  {
    question: 'What is BLAZE Wallet?',
    answer:
      'BLAZE is an AI-powered, non-custodial crypto wallet focused on everyday payments. It supports 18+ blockchain networks and includes features such as QuickPay, scam protection, and natural-language wallet actions.',
  },
  {
    question: 'How does QuickPay work?',
    answer:
      'QuickPay lets you scan a QR code, confirm the amount, and send a crypto payment in seconds. Settlement time depends on the selected blockchain and network conditions.',
  },
  {
    question: 'Is BLAZE Wallet safe?',
    answer:
      'BLAZE is non-custodial, which means you control your keys. The product includes authentication and transaction safety checks, and security updates are published on the updates page.',
  },
  {
    question: 'What blockchain networks are supported?',
    answer:
      'BLAZE supports 18+ networks including Ethereum, BSC, Polygon, Arbitrum, Base, Avalanche, Optimism, Fantom, and Cronos.',
  },
  {
    question: 'How does the BLAZE presale flow work?',
    answer: `The presale is for BLAZE Token ($BLAZE), the utility token inside BLAZE Wallet. The intent flow starts at ${SEO_PRODUCT_FACTS.presalePriceLabel} per token (${SEO_PRODUCT_FACTS.presaleDiscountLabel} off the ${SEO_PRODUCT_FACTS.launchPriceLabel} launch price). You can register intent between ${SEO_PRODUCT_FACTS.minContributionLabel} and ${SEO_PRODUCT_FACTS.maxContributionLabel}, and participants get a 48-hour early-access window when presale opens.`,
  },
] as const;

export function buildGlobalSchemas() {
  const softwareAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: SEO_SITE.name,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: SEO_SITE.description,
    url: SEO_SITE.url,
    author: {
      '@type': 'Organization',
      name: SEO_SITE.name,
    },
    featureList: [
      'QuickPay: fast crypto payments via QR code',
      'AI Transaction Assistant',
      'Smart Scam Detector',
      'Gas Optimizer with Smart Scheduling',
      `Multi-chain support (${SEO_PRODUCT_FACTS.chainsLabel})`,
      SEO_PRODUCT_FACTS.nonCustodialLabel,
    ],
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SEO_SITE.name,
    url: SEO_SITE.url,
    logo: `${SEO_SITE.url}/blaze-logo.png`,
    description: SEO_SITE.description,
    foundingDate: '2025',
    address: {
      '@type': 'PostalAddress',
      addressLocality: SEO_SITE.city,
      addressCountry: SEO_SITE.country,
    },
    sameAs: [
      'https://x.com/blazewallet_io',
      'https://github.com/blazewalletio',
      'https://t.me/ai4ldMZv0KgyN2Y8',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      email: SEO_SITE.contactEmail,
      contactType: 'Customer Support',
      availableLanguage: ['English', 'Dutch'],
    },
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SEO_SITE.name,
    url: SEO_SITE.url,
    description: SEO_SITE.description,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SEO_SITE.url}/documentation?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: SEO_FAQS.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: SEO_SITE.url,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Whitepaper',
        item: `${SEO_SITE.url}/whitepaper`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Documentation',
        item: `${SEO_SITE.url}/documentation`,
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Support',
        item: `${SEO_SITE.url}/support`,
      },
    ],
  };

  return {
    softwareAppSchema,
    organizationSchema,
    websiteSchema,
    faqSchema,
    breadcrumbSchema,
  };
}

