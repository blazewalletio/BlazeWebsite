import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BLAZE Wallet - Set Your Finances Ablaze",
  description: "Revolutionary crypto wallet with DeFi features. Staking, Governance, Launchpad, and more. Join the presale now!",
  keywords: "crypto wallet, DeFi, BLAZE token, staking, governance, launchpad, presale",
  openGraph: {
    title: "BLAZE Wallet - Set Your Finances Ablaze",
    description: "Revolutionary crypto wallet with DeFi features. Join the presale now!",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nl" className="scroll-smooth">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}


