import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { DEFAULT_LANGUAGE, LANGUAGE_CODE } from '@/constants/languages';
import { PATHNAMES } from '@/constants/routes';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.values(LANGUAGE_CODE),

  // Used when no locale matches
  defaultLocale: DEFAULT_LANGUAGE,
  pathnames: PATHNAMES,
  localeDetection: true,
  localePrefix: 'as-needed',
  localeCookie: true,
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname }
  = createNavigation(routing);
