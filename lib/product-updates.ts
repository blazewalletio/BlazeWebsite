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
};

export const PRODUCT_STATUS: ProductStatusItem[] = [
  {
    label: "Wallet build",
    value: "v21-10",
    helper: "Current production branch baseline",
  },
  {
    label: "Supported networks",
    value: "18+",
    helper: "Multi-chain support across major EVM + Solana",
  },
  {
    label: "Website data sync",
    value: "Aligned",
    helper: "Presale, pricing, caps and FAQ are source-synced",
  },
  {
    label: "Last website sync",
    value: "2026-02-12",
    helper: "Latest consistency pass against wallet repo",
  },
];

export const PRODUCT_UPDATES: ProductUpdate[] = [
  {
    date: "2026-02-12",
    title: "Presale constants and pricing unified",
    summary:
      "Website now uses one source of truth for presale price ($0.008333), soft cap ($200,000), hard cap ($1,000,000), and contribution limits.",
    tags: ["presale", "consistency", "api"],
  },
  {
    date: "2026-02-12",
    title: "Cross-page waitlist/participant offset consistency",
    summary:
      "Leaderboard total participants and waitlist counter now use the same admin-configured display offset logic.",
    tags: ["waitlist", "leaderboard", "admin"],
  },
  {
    date: "2026-02-12",
    title: "Presale UX harmonized with homepage style",
    summary:
      "Presale page visuals, section hierarchy, countdown visibility, and commitment flow were aligned with the homepage design system.",
    tags: ["ui", "presale", "conversion"],
  },
  {
    date: "2026-02-12",
    title: "Email styling unified across all send flows",
    summary:
      "All website-generated emails now render through a single shared wallet-style shell for consistent branding and readability.",
    tags: ["email", "brand", "operations"],
  },
];


