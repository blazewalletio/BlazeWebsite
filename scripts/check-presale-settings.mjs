#!/usr/bin/env node
/**
 * Check Supabase site_settings for presale automation.
 * Run from project root with env loaded, e.g.:
 *   node --env-file=.env.local scripts/check-presale-settings.mjs
 * or (bash): export $(grep -v '^#' .env.local | xargs) && node scripts/check-presale-settings.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';

// Load .env.local if present
const envPath = resolve(process.cwd(), '.env.local');
if (existsSync(envPath)) {
  const content = readFileSync(envPath, 'utf8');
  content.split('\n').forEach((line) => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) {
      const key = m[1].trim();
      let val = m[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'")))
        val = val.slice(1, -1);
      process.env[key] = val;
    }
  });
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!url || !key) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Use .env.local or set env vars.');
  process.exit(1);
}

const supabase = createClient(url, key);

async function main() {
  const { data, error } = await supabase
    .from('site_settings')
    .select('key, value')
    .in('key', ['presale_date', 'commitment_campaign_only_live']);

  if (error) {
    console.error('Supabase error:', error.message);
    process.exit(1);
  }

  const settings = Object.fromEntries((data || []).map((r) => [r.key, r.value]));
  const presaleDateRaw = settings.presale_date;
  const onlyLive = settings.commitment_campaign_only_live;

  // presale_date in JSONB can be string; sometimes double-quoted
  let presaleDateStr = typeof presaleDateRaw === 'string' ? presaleDateRaw : presaleDateRaw != null ? String(presaleDateRaw) : '';
  if (presaleDateStr.startsWith('"') && presaleDateStr.endsWith('"'))
    presaleDateStr = presaleDateStr.slice(1, -1);

  const presaleDate = new Date(presaleDateStr);
  const isPresaleDateValid = !Number.isNaN(presaleDate.getTime());
  const isMarch16_12UTC =
    isPresaleDateValid &&
    presaleDate.getUTCDate() === 16 &&
    presaleDate.getUTCMonth() === 2 &&
    presaleDate.getUTCHours() === 12 &&
    presaleDate.getUTCMinutes() === 0;

  const onlyLiveOk = onlyLive === true || onlyLive === 'true';

  console.log('\n--- Presale settings (Supabase site_settings) ---\n');
  console.log('presale_date:');
  console.log('  raw value:', JSON.stringify(presaleDateRaw));
  console.log('  parsed:   ', isPresaleDateValid ? presaleDate.toISOString() : '(invalid)');
  console.log('  OK (16 March 2026 12:00 UTC):', isMarch16_12UTC ? 'YES' : 'NO');
  console.log('');
  console.log('commitment_campaign_only_live:');
  console.log('  raw value:', JSON.stringify(onlyLive));
  console.log('  OK (true):', onlyLiveOk ? 'YES' : 'NO');
  console.log('');
  if (isMarch16_12UTC && onlyLiveOk) {
    console.log('Result: Settings are correct. The presale LIVE email will be sent automatically on 16 March at 12:00 UTC.\n');
  } else {
    console.log('Result: Something needs to be fixed.');
    if (!isMarch16_12UTC)
      console.log('  - Set presale_date to 2026-03-16T12:00:00Z in site_settings.');
    if (!onlyLiveOk)
      console.log('  - Set commitment_campaign_only_live to true in site_settings (or run the migration).');
    console.log('');
  }
}

main();
