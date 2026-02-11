import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const type = requestUrl.searchParams.get('type');

  if (code) {
    const supabase = createClient();
    await supabase.auth.exchangeCodeForSession(code);
  }

  // If it's a recovery, redirect to reset password page
  if (type === 'recovery') {
    return NextResponse.redirect(new URL('/admin/reset-password', requestUrl.origin));
  }

  // Default redirect to admin
  return NextResponse.redirect(new URL('/admin', requestUrl.origin));
}


