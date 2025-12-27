'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AuthHandler() {
  const router = useRouter();

  useEffect(() => {
    // Check if there are auth tokens in the URL hash
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashParams = new URLSearchParams(window.location.hash.substring(1));
      const type = hashParams.get('type');
      const accessToken = hashParams.get('access_token');

      // If it's a recovery link, redirect to reset password page with the hash
      if (type === 'recovery' && accessToken) {
        router.push(`/admin/reset-password${window.location.hash}`);
      }
    }
  }, [router]);

  return null;
}

