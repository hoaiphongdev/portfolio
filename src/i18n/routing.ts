import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

import { DEFAULT_LANGUAGE, LANGUAGE_CODE } from '@/constants/languages';
import { TRANSLATED_URL } from '@/constants/routes';

// Convert TRANSLATED_URL to the format next-intl expects
const pathnames = Object.entries(TRANSLATED_URL).reduce(
  (acc, [key, translations]) => {
    acc[key] = translations;
    return acc;
  },
  {} as Record<string, Record<string, string>>,
);

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: Object.values(LANGUAGE_CODE),

  // Used when no locale matches
  defaultLocale: DEFAULT_LANGUAGE,
  pathnames,
  localeDetection: false,
  alternateLinks: false,
  localePrefix: 'as-needed',
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, useRouter, usePathname, getPathname }
  = createNavigation(routing);
