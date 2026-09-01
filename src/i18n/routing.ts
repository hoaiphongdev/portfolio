import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { DEFAULT_LANGUAGE, LANGUAGE_CODE } from '@/constants/languages';
import { TRANSLATED_URL } from '@/constants/routes';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.values(LANGUAGE_CODE),

  // Used when no locale matches
  defaultLocale: DEFAULT_LANGUAGE,
  // Passed through verbatim: routing through a widened
  // `Record<string, Record<string, string>>` would erase the literal keys that
  // make `Link` reject an unlocalized href.
  pathnames: TRANSLATED_URL,
  localeDetection: false,
  alternateLinks: false,
  localePrefix: 'as-needed',
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, useRouter, usePathname, getPathname }
  = createNavigation(routing);
