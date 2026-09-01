'use client';

import { STATIC_PAGE_ORIGIN_URL } from '@/constants/paths';
import { usePathname } from '@/i18n/routing';

export default function HomeBackdrop() {
  const pathname = usePathname();
  // Exact match, not `getIsActivePath`: that prefix-matches, so '/' would hit
  // every route. A missing pathname hides the backdrop rather than showing it
  // everywhere.
  const isHome
    = pathname != null
      && pathname.replace(/\/$/, '')
      === STATIC_PAGE_ORIGIN_URL.HOME.replace(/\/$/, '');

  if (!isHome) {
    return null;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,hsl(var(--primary)/0.07),transparent)]"
    />
  );
}
