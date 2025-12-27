'use client';

import { useEffect, useState } from 'react';

export default function AuthHandler() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    try {
      const hash = window.location.hash;
      if (!hash || hash.length < 2) return;

      const hashParams = new URLSearchParams(hash.substring(1));
      const type = hashParams.get('type');
      const accessToken = hashParams.get('access_token');

      // If it's a recovery link, redirect to reset password page with the hash
      if (type === 'recovery' && accessToken) {
        setRedirectUrl(`/admin/reset-password${hash}`);
        setShouldRedirect(true);
      }
    } catch (error) {
      console.error('AuthHandler error:', error);
    }
  }, []);

  // Handle redirect after state is set
  useEffect(() => {
    if (shouldRedirect && redirectUrl) {
      window.location.href = redirectUrl;
    }
  }, [shouldRedirect, redirectUrl]);

  return null;
}

