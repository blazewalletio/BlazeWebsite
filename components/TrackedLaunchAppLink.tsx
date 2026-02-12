'use client';

import { AnchorHTMLAttributes, MouseEvent, useEffect, useState } from 'react';
import { buildTrackedWalletLaunchUrl, trackWalletLaunchClick } from '@/lib/analytics/client';

type TrackedLaunchAppLinkProps = Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  sourceContext: string;
  baseUrl?: string;
};

export default function TrackedLaunchAppLink({
  sourceContext,
  baseUrl = 'https://my.blazewallet.io',
  children,
  onClick,
  ...props
}: TrackedLaunchAppLinkProps) {
  const [href, setHref] = useState(baseUrl);

  useEffect(() => {
    setHref(buildTrackedWalletLaunchUrl(baseUrl, sourceContext));
  }, [baseUrl, sourceContext]);

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    trackWalletLaunchClick(sourceContext);
    onClick?.(event);
  };

  return (
    <a {...props} href={href} onClick={handleClick}>
      {children}
    </a>
  );
}


