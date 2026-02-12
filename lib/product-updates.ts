export type ProductStatusItem = {
  label: string;
  value: string;
  helper: string;
};

export type ProductUpdate = {
  date: string;
  title: string;
  summary: string;
  tags: string[];
  commitHash?: string;
  commitUrl?: string;
};

export const PRODUCT_STATUS: ProductStatusItem[] = [
  {
    label: "Source repository",
    value: "BlazeWallet-Github",
    helper: "Configured wallet release source",
  },
  {
    label: "Wallet branch",
    value: "v21-10",
    helper: "Current production branch baseline",
  },
  {
    label: "Supported networks",
    value: "18+",
    helper: "Multi-chain support across major EVM + Solana",
  },
  {
    label: "Release feed source",
    value: "Wallet commits",
    helper: "Derived from wallet git history, not website commits",
  },
  {
    label: "Latest wallet update",
    value: "Live feed",
    helper: "Resolved from GitHub API with fallback snapshot",
  },
];

export const PRODUCT_UPDATES: ProductUpdate[] = [
  {
    date: "2025-12-29",
    title: "Full no-cache headers and THQ logging",
    summary:
      "Wallet update adds full no-cache response handling with THQ-specific logging to prevent stale price and market data behavior.",
    tags: ["wallet", "cache", "logging"],
    commitHash: "28a7787d",
    commitUrl: "https://github.com/blazewalletio/BlazeWallet21-10/commit/28a7787d",
  },
  {
    date: "2025-12-29",
    title: "Cache-busting added directly to CoinGecko calls",
    summary:
      "Wallet price fetch flow now applies direct cache-busting query strategy to CoinGecko endpoints for fresher market responses.",
    tags: ["wallet", "pricing", "api"],
    commitHash: "99d400d4",
    commitUrl: "https://github.com/blazewalletio/BlazeWallet21-10/commit/99d400d4",
  },
  {
    date: "2025-12-29",
    title: "Complete cache elimination in price pipeline",
    summary:
      "Wallet release removes remaining cache layers across client and server in the price pipeline to enforce always-fresh market values.",
    tags: ["wallet", "cache", "reliability"],
    commitHash: "5cc63f46",
    commitUrl: "https://github.com/blazewalletio/BlazeWallet21-10/commit/5cc63f46",
  },
  {
    date: "2025-12-29",
    title: "Ethereum-focused debug observability improvements",
    summary:
      "Wallet debugging was expanded with comprehensive Ethereum logging to improve issue triage around chain-specific price and portfolio behavior.",
    tags: ["wallet", "ethereum", "debug"],
    commitHash: "363db2d0",
    commitUrl: "https://github.com/blazewalletio/BlazeWallet21-10/commit/363db2d0",
  },
];


