import type { LANGUAGE_CODE } from '@/constants/languages';
import { DEFAULT_LANGUAGE } from '@/constants/languages';
import { STATIC_PAGE_ORIGIN_URL } from '@/constants/paths';
import { TRANSLATED_URL } from '@/constants/routes';

import { isClientSide } from './common';

/**
 * Checks if the given language code is the default language
 * @param {string} lang - The language code to check (e.g., 'en', 'es')
 * @returns {boolean} True if the language is the default language, false otherwise
 * @example
 * isDefaultLocale('en') // returns true if 'en' is DEFAULT_LANGUAGE
 * isDefaultLocale('es') // returns false if 'en' is DEFAULT_LANGUAGE
 */
export const isDefaultLocale = (lang: string): boolean => lang === DEFAULT_LANGUAGE;

/**
 * Extracts the language code from a URL path
 * @param {string} path - The URL path to extract language from
 * @returns {string} The two-letter language code if found, empty string otherwise
 * @example
 * getLanguageFromPath('/es/about') // returns 'es'
 * getLanguageFromPath('/about') // returns ''
 */
export const getLanguageFromPath = (path: string): string => {
  const languageRegex = /^\/([a-z]{2})(\/).*$/;
  const result = path.match(languageRegex);
  return result ? result[1] : '';
};

/**
 * Gets the user's browser language
 * @returns {string} Two-letter language code from browser, empty string if server-side
 * @example
 * // If browser language is English
 * getLanguageFromBrowser() // returns 'en'
 */
export const getLanguageFromBrowser = (): string => {
  if (!isClientSide) {
    return '';
  }

  return window.navigator.language.slice(0, 2);
};

/**
 * Generates a localized path with the given locale
 * @param {string} path - The original path
 * @param {keyof typeof LANGUAGE_CODE} locale - The target locale
 * @returns {string} Localized path with prefix if non-default language
 * @example
 * getBasePathWithPresetLocale('/about', 'es') // returns '/es/sobre'
 * getBasePathWithPresetLocale('/about', 'en') // returns '/about'
 */
export const getBasePathWithPresetLocale = (path: string, locale: keyof typeof LANGUAGE_CODE): string => {
  if (locale === DEFAULT_LANGUAGE) {
    return path;
  }

  const translateUrl = TRANSLATED_URL[path];
  if (translateUrl) {
    return `/${locale}${translateUrl[locale]}`;
  }

  return `/${locale}${path}`;
};

/**
 * Removes the language prefix from a URL path
 * @param {string} pathname - The full pathname with possible language prefix
 * @returns {string} Path without language prefix
 * @example
 * getUrlWithoutLanguage('/es/about') // returns '/about'
 * getUrlWithoutLanguage('/about') // returns '/about'
 */
export const getUrlWithoutLanguage = (pathname: string): string => {
  const language = getLanguageFromPath(pathname);
  return language ? pathname.substring(3) : pathname;
};

/**
 * Converts a localized URL to its default language equivalent
 * @param {string} pathname - The current pathname
 * @returns {string} The URL in default language
 * @example
 * // If TRANSLATED_URL maps '/about' to '/sobre' for Spanish
 * getDefaultLocaleUrl('/es/sobre') // returns '/about'
 * getDefaultLocaleUrl('/about') // returns '/about'
 */
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

/**
 * Determines if a given URL path is active based on the current pathname
 * @param {string} currentPath - The current pathname
 * @param {string} itemPath - The path to check against
 * @returns {boolean} True if the path is active, false otherwise
 * @example
 * getIsActivePath('/es/about', '/es/about', '/') // returns true
 * getIsActivePath('/es/about/1', '/es/about', '/') // returns true
 * getIsActivePath('/es/blog', '/es/about', '/') // returns false
 */
export const getIsActivePath = (
  currentPath: string,
  itemPath: string,
): boolean => {
  const currentPathWithoutLocale = getDefaultLocaleUrl(currentPath);
  const itemPathWithoutLocale = getDefaultLocaleUrl(itemPath);

  const isHomePage = itemPathWithoutLocale === STATIC_PAGE_ORIGIN_URL.HOME;
  return isHomePage || currentPathWithoutLocale.startsWith(itemPathWithoutLocale);
};
