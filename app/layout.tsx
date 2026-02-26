import { Inter } from "next/font/google";
import "./globals.css";
import CookieConsent from "@/components/CookieConsent";
import ScrollProgress from "@/components/ScrollProgress";
import ChatWidget from "@/components/ChatWidget";
import AuthHandler from "@/components/AuthHandler";
import ClientOnly from "@/components/ClientOnly";
import AnalyticsBootstrap from "@/components/AnalyticsBootstrap";
import XPixelManager from "@/components/XPixelManager";
import MetaPixelManager from "@/components/MetaPixelManager";
import { buildGlobalSchemas } from "@/lib/seo/content";
import { defaultSiteMetadata } from "@/lib/seo/metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata = defaultSiteMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { softwareAppSchema, organizationSchema, websiteSchema, faqSchema, breadcrumbSchema } = buildGlobalSchemas();

  return (
    <html lang="en" translate="no" className="scroll-smooth notranslate" suppressHydrationWarning>
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
        <meta name="google" content="notranslate" />
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
      <body className={inter.className} suppressHydrationWarning>
        <AuthHandler />
        <ClientOnly>
          <AnalyticsBootstrap />
          <XPixelManager />
          <MetaPixelManager />
          <ScrollProgress />
        </ClientOnly>
        {children}
        <ClientOnly>
          <CookieConsent />
          <ChatWidget />
        </ClientOnly>
      </body>
    </html>
  );
}
