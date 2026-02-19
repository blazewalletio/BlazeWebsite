import { NextResponse } from 'next/server';
import { createAdminClient, createClient } from '@/lib/supabase/server';
import { lookupCountryCodeFromIp } from '@/lib/geo/ip-country';

type BackfillTarget = 'waitlist' | 'commitments';

function jsonError(message: string, status = 400) {
  return NextResponse.json({ success: false, error: message }, { status });
}

export async function POST(request: Request) {
  try {
    // Require an authenticated admin user session (same auth model as other admin pages).
    const authClient = createClient();
    const { data: authData } = await authClient.auth.getUser();
    if (!authData?.user) return jsonError('Unauthorized', 401);

    const body = await request.json().catch(() => ({}));
    const target = String(body?.target || '') as BackfillTarget;
    const limit = typeof body?.limit === 'number' ? Math.max(1, Math.min(200, body.limit)) : 200;
    const dryRun = Boolean(body?.dryRun);

    if (target !== 'waitlist' && target !== 'commitments') {
      return jsonError('Invalid target. Use "waitlist" or "commitments".');
    }

    const supabase = createAdminClient();
    const results: Array<{ id: string; email?: string; updated: boolean; country_code?: string | null; error?: string }> =
      [];

    if (target === 'waitlist') {
      const { data: rows, error } = await supabase
        .from('waitlist')
        .select('id,email,ip_address,country_code')
        .is('country_code', null)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) return jsonError(`Failed to fetch waitlist rows: ${error.message}`, 500);

      for (const r of rows || []) {
        const lookup = await lookupCountryCodeFromIp((r as any)?.ip_address);
        if (!lookup.countryCode) {
          results.push({ id: String((r as any).id), email: (r as any).email, updated: false, error: lookup.error });
          continue;
        }

        if (!dryRun) {
          const { error: updateError } = await supabase
            .from('waitlist')
            .update({ country_code: lookup.countryCode })
            .eq('id', (r as any).id);
          if (updateError) {
            results.push({
              id: String((r as any).id),
              email: (r as any).email,
              updated: false,
              error: updateError.message,
            });
            continue;
          }
        }

        results.push({
          id: String((r as any).id),
          email: (r as any).email,
          updated: true,
          country_code: lookup.countryCode,
        });

        // Gentle pacing to avoid hitting provider rate limits.
        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    }

    if (target === 'commitments') {
      // Commitments don't store IP directly. If a waitlist_id exists, enrich using the linked waitlist row's IP.
      const { data: rows, error } = await supabase
        .from('commitments')
        .select('id,email,waitlist_id,country_code')
        .is('country_code', null)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) return jsonError(`Failed to fetch commitment rows: ${error.message}`, 500);

      const waitlistIds = (rows || [])
        .map((r: any) => String(r?.waitlist_id || '').trim())
        .filter(Boolean);

      let waitlistIpById = new Map<string, string | null>();
      if (waitlistIds.length > 0) {
        const { data: wlRows, error: wlError } = await supabase
          .from('waitlist')
          .select('id,ip_address')
          .in('id', waitlistIds);
        if (wlError) return jsonError(`Failed to fetch waitlist IPs: ${wlError.message}`, 500);

        waitlistIpById = new Map((wlRows || []).map((w: any) => [String(w.id), (w.ip_address as string | null) ?? null]));
      }

      for (const r of rows || []) {
        const wlId = String((r as any)?.waitlist_id || '').trim();
        const ip = wlId ? waitlistIpById.get(wlId) || null : null;
        const lookup = await lookupCountryCodeFromIp(ip);
        if (!lookup.countryCode) {
          results.push({ id: String((r as any).id), email: (r as any).email, updated: false, error: lookup.error });
          continue;
        }

        if (!dryRun) {
          const { error: updateError } = await supabase
            .from('commitments')
            .update({ country_code: lookup.countryCode })
            .eq('id', (r as any).id);
          if (updateError) {
            results.push({
              id: String((r as any).id),
              email: (r as any).email,
              updated: false,
              error: updateError.message,
            });
            continue;
          }
        }

        results.push({
          id: String((r as any).id),
          email: (r as any).email,
          updated: true,
          country_code: lookup.countryCode,
        });

        await new Promise((resolve) => setTimeout(resolve, 250));
      }
    }

    const updated = results.filter((r) => r.updated).length;
    const skipped = results.length - updated;

    return NextResponse.json({
      success: true,
      target,
      dryRun,
      processed: results.length,
      updated,
      skipped,
      results,
    });
  } catch (err: any) {
    console.error('Backfill country error:', err);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}


