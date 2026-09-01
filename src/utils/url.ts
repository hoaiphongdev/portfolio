import type { LANGUAGE_CODE } from '@/constants/languages';
import { DEFAULT_LANGUAGE } from '@/constants/languages';
import type { Route } from '@/constants/paths';
import { lookupTranslatedPath } from '@/constants/routes';

export const getBasePathWithPresetLocale = ({
  path,
  locale,
  isHomePage = false,
}: {
  path: Route;
  locale: keyof typeof LANGUAGE_CODE;
  isHomePage?: boolean;
}): string => {
  // If default language, return the original path
  if (locale === DEFAULT_LANGUAGE) {
    return path;
  }

  const translatedPath = lookupTranslatedPath(path, locale);

  if (translatedPath) {
    return isHomePage ? `${translatedPath}` : `/${locale}${translatedPath}`;
  }

  return isHomePage ? `/${path}` : `/${locale}${path}`;
};

export const getIsActivePath = (pathname?: string, url?: string): boolean => {
  if (!pathname || !url) {
    return false;
  }

  const cleanPathname = pathname.replace(/\/$/, '');
  const cleanUrl = url.replace(/\/$/, '');

  return cleanPathname === cleanUrl || cleanPathname.startsWith(cleanUrl);
};
