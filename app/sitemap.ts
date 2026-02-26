import { MetadataRoute } from 'next';
import { getWalletUpdates } from '@/lib/wallet-updates-server';

function parseSafeDate(value?: string) {
  if (!value) return null;
  const parsed = new Date(value);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.blazewallet.io';
  const baselineDate = new Date('2026-02-26T00:00:00.000Z');
  const { updates } = await getWalletUpdates(1);
  const updatesLastModified = parseSafeDate(updates[0]?.date) || baselineDate;

  return [
    {
      url: baseUrl,
      lastModified: updatesLastModified,
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/whitepaper`,
      lastModified: baselineDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/documentation`,
      lastModified: baselineDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/support`,
      lastModified: baselineDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/support-us`,
      lastModified: baselineDate,
      changeFrequency: 'monthly',
      priority: 0.6,
    },
    {
      url: `${baseUrl}/presale`,
      lastModified: baselineDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/updates`,
      lastModified: updatesLastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/learn`,
      lastModified: baselineDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/learn/crypto-wallet-for-daily-payments`,
      lastModified: baselineDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/learn/pay-with-usdc-qr-code`,
      lastModified: baselineDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/learn/non-custodial-wallet-security`,
      lastModified: baselineDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/learn/crypto-payment-fees-explained`,
      lastModified: baselineDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/learn/avoid-crypto-payment-scams`,
      lastModified: baselineDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/learn/multi-chain-wallet-guide`,
      lastModified: baselineDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/learn/crypto-wallet-vs-exchange-wallet`,
      lastModified: baselineDate,
      changeFrequency: 'monthly',
      priority: 0.75,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: baselineDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: baselineDate,
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified: baselineDate,
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ];
}


