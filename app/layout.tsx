import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.blazewallet.io'),
  title: {
    default: "BLAZE Wallet - AI-Powered Crypto Wallet for Everyday Payments",
    template: "%s | BLAZE Wallet",
  },
  description: "Pay with crypto anywhere in 2 seconds. QuickPay, AI assistant, scam protection & 18 blockchains. The wallet that makes crypto spendable.",
  keywords: [
    "crypto wallet",
    "BLAZE wallet",
    "QuickPay",
    "AI crypto wallet",
    "DeFi wallet",
    "multi-chain wallet",
    "crypto payments",
    "staking rewards",
    "non-custodial wallet",
    "Web3 wallet",
    "blockchain wallet",
    "BLAZE token",
    "BSC wallet",
    "Ethereum wallet",
  ],
  authors: [{ name: "BLAZE Wallet Team", url: "https://www.blazewallet.io" }],
  creator: "BLAZE Wallet",
  publisher: "BLAZE Wallet",
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
    title: "BLAZE Wallet - AI-Powered Crypto Wallet for Everyday Payments",
    description: "Pay with crypto anywhere in 2 seconds. QuickPay, AI assistant, scam protection & 18 blockchains. The wallet that makes crypto spendable.",
    type: "website",
    url: "https://www.blazewallet.io",
    siteName: "BLAZE Wallet",
    images: [
      {
        url: "https://www.blazewallet.io/og-image.png",
        width: 1536,
        height: 1024,
        alt: "BLAZE Wallet - AI-Powered Crypto Wallet for Everyday Payments",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BLAZE Wallet - AI-Powered Crypto Wallet for Everyday Payments",
    description: "Pay with crypto anywhere in 2 seconds. QuickPay, AI assistant, scam protection & 18 blockchains.",
    images: ["https://www.blazewallet.io/og-image.png"],
    creator: "@blazewallet_io",
    site: "@blazewallet_io",
  },
  alternates: {
    canonical: "https://www.blazewallet.io",
  },
  verification: {
    // Add when you have these:
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
  category: "Finance",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Software Application Schema
  const softwareAppSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "BLAZE Wallet",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web, iOS, Android",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "description": "Pay with crypto anywhere in 2 seconds. QuickPay, AI assistant, scam protection & 18 blockchains. The wallet that makes crypto spendable.",
    "url": "https://www.blazewallet.io",
    "author": {
      "@type": "Organization",
      "name": "BLAZE Wallet"
    },
    "featureList": [
      "QuickPay - 2-second crypto payments",
      "AI Transaction Assistant",
      "Smart Scam Detector",
      "Gas Optimizer with Smart Scheduling",
      "Portfolio Advisor & Market Analyzer",
      "Multi-chain Support (18+ blockchains)",
      "Staking Rewards (8-20% APY)",
      "NFT Marketplace",
      "DAO Governance",
      "Non-custodial Security"
    ]
  };

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BLAZE Wallet",
    "url": "https://www.blazewallet.io",
    "logo": "https://www.blazewallet.io/blaze-logo.png",
    "description": "AI-powered crypto wallet for everyday payments",
    "foundingDate": "2025",
    "founders": [{
      "@type": "Person",
      "name": "Rick Schlimback"
    }],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Stavangerweg 13",
      "addressLocality": "Groningen",
      "addressCountry": "NL"
    },
    "sameAs": [
      "https://twitter.com/blazewallet_io",
      "https://github.com/blazewalletio",
      "https://t.me/blazewallet_io"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@blazewallet.io",
      "contactType": "Customer Support",
      "availableLanguage": ["English", "Dutch"]
    }
  };

  // WebSite Schema with SearchAction (enables sitelinks search box)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "BLAZE Wallet",
    "url": "https://www.blazewallet.io",
    "description": "AI-powered crypto wallet for everyday payments",
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://www.blazewallet.io/documentation?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is BLAZE Wallet?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BLAZE is an AI-powered crypto wallet that makes managing your digital assets simple and secure. It supports 18+ blockchain networks, includes advanced AI features like scam detection and natural language transactions, and will offer staking rewards up to 20% APY starting Q1 2026."
        }
      },
      {
        "@type": "Question",
        "name": "How does QuickPay work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "QuickPay lets you pay with crypto anywhere in seconds. Simply scan a QR code, confirm the amount, and the payment is processed in under 2 seconds. It works with stablecoins like USDC and USDT for consistent value."
        }
      },
      {
        "@type": "Question",
        "name": "Is BLAZE Wallet safe?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! BLAZE is a non-custodial wallet, meaning you control your private keys at all times. We use WebAuthn biometric authentication, encrypted local storage, and your funds are never stored on our servers. A CertiK security audit is scheduled for Q1 2026."
        }
      },
      {
        "@type": "Question",
        "name": "What blockchain networks are supported?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BLAZE supports 18+ networks including Ethereum, BSC, Polygon, Arbitrum, Base, Avalanche, Optimism, Fantom, Cronos, and more. We continuously add support for new networks."
        }
      },
      {
        "@type": "Question",
        "name": "When is the BLAZE token presale?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The BLAZE token presale is scheduled for Q1 2026, alongside the launch of our iOS and Android apps. Early supporters will get access to discounted tokens before the public launch."
        }
      }
    ]
  };

  // BreadcrumbList Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://www.blazewallet.io"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Whitepaper",
        "item": "https://www.blazewallet.io/whitepaper"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Documentation",
        "item": "https://www.blazewallet.io/documentation"
      },
      {
        "@type": "ListItem",
        "position": 4,
        "name": "Support",
        "item": "https://www.blazewallet.io/support"
      }
    ]
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Favicon & Icons */}
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="icon" href="/favicon.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/favicon.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="manifest" href="/manifest.json" />
        
        {/* Theme & Mobile */}
        <meta name="theme-color" content="#F97316" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="BLAZE Wallet" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
