import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BLAZE Wallet - The AI-Powered Crypto Wallet | DeFi Made Simple",
  description: "The most intelligent crypto wallet with 5 advanced AI features. Multi-chain (18 chains), Staking (8-20% APY), Governance, NFTs, Launchpad, and more. Experience the future of DeFi.",
  keywords: "crypto wallet, DeFi, BLAZE token, AI wallet, staking, governance, launchpad, NFT marketplace, multi-chain wallet, Web3, blockchain, smart contract, non-custodial wallet",
  authors: [{ name: "BLAZE Wallet Team" }],
  creator: "BLAZE Wallet",
  publisher: "BLAZE Wallet",
  robots: "index, follow",
  openGraph: {
    title: "BLAZE Wallet - The AI-Powered Crypto Wallet",
    description: "The most intelligent crypto wallet with 5 advanced AI features. Multi-chain support, staking rewards, and complete DeFi functionality.",
    type: "website",
    url: "https://www.blazewallet.io",
    siteName: "BLAZE Wallet",
    images: [
      {
        url: "https://www.blazewallet.io/blaze-logo.png",
        width: 1200,
        height: 630,
        alt: "BLAZE Wallet - AI-Powered Crypto Wallet",
      },
    ],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "BLAZE Wallet - The AI-Powered Crypto Wallet",
    description: "The most intelligent crypto wallet with 5 advanced AI features. Multi-chain support, staking rewards, and complete DeFi functionality.",
    images: ["https://www.blazewallet.io/blaze-logo.png"],
    creator: "@blazewallet_io",
  },
  alternates: {
    canonical: "https://www.blazewallet.io",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
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
    "description": "The most intelligent crypto wallet with 5 advanced AI features. Multi-chain support, staking rewards, and complete DeFi functionality.",
    "url": "https://www.blazewallet.io",
    "author": {
      "@type": "Organization",
      "name": "BLAZE Wallet",
      "url": "https://www.blazewallet.io"
    },
    "featureList": [
      "AI Transaction Assistant",
      "Smart Scam Detector",
      "AI Portfolio Advisor",
      "Predictive Gas Optimizer",
      "Conversational Crypto Assistant",
      "Multi-chain Support (18 chains)",
      "Staking (8-20% APY)",
      "NFT Marketplace",
      "DAO Governance",
      "Launchpad Platform"
    ]
  };

  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "BLAZE Wallet",
    "url": "https://www.blazewallet.io",
    "logo": "https://www.blazewallet.io/blaze-logo-official.png",
    "description": "The most intelligent crypto wallet with AI-powered features",
    "sameAs": [
      "https://twitter.com/blazewallet_io",
      "https://github.com/blazewalletio",
      "https://t.me/blazewallet"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "info@blazewallet.io",
      "contactType": "Customer Support"
    }
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/blaze-logo.png" type="image/png" />
        <link rel="icon" href="/blaze-logo.png" sizes="32x32" type="image/png" />
        <link rel="icon" href="/blaze-logo.png" sizes="16x16" type="image/png" />
        <link rel="apple-touch-icon" href="/blaze-logo.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#F97316" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}



