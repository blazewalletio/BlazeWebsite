import { NextResponse } from 'next/server';
import { getWalletUpdates } from '@/lib/wallet-updates-server';

export async function GET() {
  const { updates, source } = await getWalletUpdates(12);
  return NextResponse.json({
    source,
    count: updates.length,
    updates,
  });
}


