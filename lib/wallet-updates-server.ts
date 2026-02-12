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

const DEFAULT_WALLET_REPO = 'blazewalletio/BlazeWallet21-10';
const walletRepoSlug = process.env.WALLET_RELEASE_REPO || DEFAULT_WALLET_REPO;
const [WALLET_REPO_OWNER, WALLET_REPO_NAME] = walletRepoSlug.split('/');
const WALLET_REPO_LABEL = process.env.WALLET_RELEASE_REPO_LABEL || 'BlazeWallet-Github';
const WALLET_COMMITS_URL = `https://api.github.com/repos/${WALLET_REPO_OWNER}/${WALLET_REPO_NAME}/commits`;
const WALLET_RELEASE_BRANCH = process.env.WALLET_RELEASE_BRANCH || 'main';
const WALLET_COMMITS_PAGE_URL = `https://github.com/${WALLET_REPO_OWNER}/${WALLET_REPO_NAME}/commits/${WALLET_RELEASE_BRANCH}`;

export function getWalletReleaseBranch() {
  return WALLET_RELEASE_BRANCH;
}

export function getWalletCommitsPageUrl() {
  return WALLET_COMMITS_PAGE_URL;
}

export function getWalletRepoLabel() {
  return WALLET_REPO_LABEL;
}

export function getWalletRepoSlug() {
  return `${WALLET_REPO_OWNER}/${WALLET_REPO_NAME}`;
}

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
      'User-Agent': 'blaze-website-updates-feed',
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`${WALLET_COMMITS_URL}?per_page=${limit}&sha=${encodeURIComponent(WALLET_RELEASE_BRANCH)}`, {
      headers,
      cache: 'no-store',
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


