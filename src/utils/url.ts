import type { LANGUAGE_CODE } from '@/constants/languages';
import { DEFAULT_LANGUAGE } from '@/constants/languages';
import type { Route } from '@/constants/paths';
import {
  DYNAMIC_ROUTE_MAPPING,
  STATIC_PAGE_ORIGIN_URL,
} from '@/constants/paths';
import { TRANSLATED_URL } from '@/constants/routes';
import { ROOT_SITE_URL } from '@/constants/url';

import { isClientSide } from './common';

export const isDefaultLocale = (lang: string): boolean =>
  lang === DEFAULT_LANGUAGE;

export const getLanguageFromPath = (path: string): string => {
  const languageRegex = /^\/([a-z]{2})(\/).*$/;
  const result = path.match(languageRegex);
  return result ? result[1] : '';
};

export const getLanguageFromBrowser = (): string => {
  if (!isClientSide) {
    return '';
  }

  return window.navigator.language.slice(0, 2);
};

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

  const translatedPath = TRANSLATED_URL[path]?.[locale];

  if (translatedPath) {
    return isHomePage ? `${translatedPath}` : `/${locale}${translatedPath}`;
  }

  return isHomePage ? `/${path}` : `/${locale}${path}`;
};

export const getUrlWithoutLanguage = (pathname: string): string => {
  const language = getLanguageFromPath(pathname);
  return language ? pathname.substring(3) : pathname;
};

export const getDefaultLocaleUrl = (pathname: string): string => {
  const language = getLanguageFromPath(pathname);
  const pathWithoutLanguage = language ? pathname.substring(3) : pathname;

  if (pathWithoutLanguage === '') {
    return '/';
  }

  for (const [originUrl, translations] of Object.entries(TRANSLATED_URL)) {
    for (const [_, translatedPath] of Object.entries(translations)) {
      if (pathWithoutLanguage === translatedPath) {
        return originUrl;
      }
    }
  }

  return pathWithoutLanguage;
};

export const getIsActivePath = (pathname?: string, url?: string): boolean => {
  if (!pathname || !url) {
    return false;
  }

  const cleanPathname = pathname.replace(/\/$/, '');
  const cleanUrl = url.replace(/\/$/, '');

  return cleanPathname === cleanUrl || cleanPathname.startsWith(cleanUrl);
};

interface GetCanonicalParams {
  locale: keyof typeof LANGUAGE_CODE;
  pathname: Route;
  slug?: string;
}

export const getCanonical = ({
  locale,
  pathname,
  slug,
}: GetCanonicalParams): string => {
  const baseUrl = ROOT_SITE_URL.replace(/\/$/, '');

  if (pathname in DYNAMIC_ROUTE_MAPPING && slug) {
    const baseStaticPath
      = DYNAMIC_ROUTE_MAPPING[pathname as keyof typeof DYNAMIC_ROUTE_MAPPING];

    const baseLocalizedPath = getBasePathWithPresetLocale({
      path: baseStaticPath,
      locale,
      isHomePage: false,
    });

    return `${baseUrl}${baseLocalizedPath}/${slug}`.replace(
      /([^:]\/)\/+/g,
      '$1',
    );
  }

  const localizedPath = getBasePathWithPresetLocale({
    path: pathname,
    locale,
    isHomePage: pathname === STATIC_PAGE_ORIGIN_URL.HOME,
  });

  if (pathname === STATIC_PAGE_ORIGIN_URL.HOME && locale === DEFAULT_LANGUAGE) {
    return baseUrl;
  }

  return `${baseUrl}${localizedPath}`.replace(/([^:]\/)\/+/g, '$1');
};
