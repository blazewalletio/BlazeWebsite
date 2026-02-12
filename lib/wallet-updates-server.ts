import 'server-only';

import { PRODUCT_UPDATES, type ProductUpdate } from '@/lib/product-updates';

type GitHubCommit = {
  sha: string;
  commit: {
    message: string;
    author: {
      date: string;
    };
  };
};

const WALLET_REPO_OWNER = 'blazewalletio';
const WALLET_REPO_NAME = 'BlazeWallet21-10';
const WALLET_COMMITS_URL = `https://api.github.com/repos/${WALLET_REPO_OWNER}/${WALLET_REPO_NAME}/commits`;

function buildTagsFromTitle(title: string): string[] {
  const normalized = title.toLowerCase();
  const tags = ['wallet'];
  if (normalized.includes('fix')) tags.push('fix');
  if (normalized.includes('feat')) tags.push('feature');
  if (normalized.includes('cache')) tags.push('cache');
  if (normalized.includes('debug') || normalized.includes('logging')) tags.push('debug');
  if (normalized.includes('price')) tags.push('pricing');
  return Array.from(new Set(tags));
}

function normalizeCommitTitle(message: string): string {
  const firstLine = message.split('\n')[0]?.trim() || 'Wallet update';
  return firstLine.length > 110 ? `${firstLine.slice(0, 107)}...` : firstLine;
}

export async function getWalletUpdates(limit = 8): Promise<{
  updates: ProductUpdate[];
  source: 'github' | 'fallback';
}> {
  try {
    const headers: HeadersInit = {
      Accept: 'application/vnd.github+json',
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`${WALLET_COMMITS_URL}?per_page=${limit}`, {
      headers,
      next: { revalidate: 300 },
    });

    if (!res.ok) {
      throw new Error(`GitHub API returned ${res.status}`);
    }

    const commits = (await res.json()) as GitHubCommit[];
    const updates: ProductUpdate[] = commits.map((entry) => {
      const title = normalizeCommitTitle(entry.commit.message);
      return {
        date: entry.commit.author.date.slice(0, 10),
        title,
        summary: `Wallet repository update from ${WALLET_REPO_OWNER}/${WALLET_REPO_NAME}.`,
        tags: buildTagsFromTitle(title),
        commitHash: entry.sha.slice(0, 8),
        commitUrl: `https://github.com/${WALLET_REPO_OWNER}/${WALLET_REPO_NAME}/commit/${entry.sha}`,
      };
    });

    return { updates, source: 'github' };
  } catch (error) {
    console.error('Failed to fetch wallet updates from GitHub API:', error);
    return { updates: PRODUCT_UPDATES, source: 'fallback' };
  }
}


