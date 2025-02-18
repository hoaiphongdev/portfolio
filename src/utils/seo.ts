import type { Metadata } from 'next';

import { DEFAULT_LANGUAGE, LANGUAGE_CODE } from '@/constants/languages';
import { PATHNAMES, TRANSLATED_URL } from '@/constants/routes';
import { ROOT_SITE_URL } from '@/constants/url';

type PathRecord = Record<string, string>;

interface SEOMetadataProps {
  title: string;
  description: string;
  locale: string;
  pathname: string;
  slug?: string;
  imageUrl?: string;
}

export function getOriginalPath(
  pathname: string,
  locale: string,
  slug?: string,
): string {
  if (slug) {
    for (const [dynamicRoute, translatedPaths] of Object.entries(
      TRANSLATED_URL,
    )) {
      const paths = translatedPaths as PathRecord;
      if (dynamicRoute.includes('[slug]')) {
        const pathWithoutSlug = pathname.replace(`/${slug}`, '');
        if (paths[locale]?.replace('[slug]', '') === pathWithoutSlug) {
          return dynamicRoute;
        }
      }
    }
  }

  for (const [originalPath, translatedPaths] of Object.entries(PATHNAMES)) {
    const paths = translatedPaths as PathRecord;
    if (typeof paths === 'object' && paths[locale]) {
      if (paths[locale] === pathname) {
        return originalPath;
      }
    }
  }

  return pathname;
}

export function generateAlternateLanguages(
  originalPath: string,
  locale: string,
  slug?: string,
): Record<string, string> {
  const alternates: Record<string, string> = {};

  if (originalPath === '/') {
    const locales = Object.keys(LANGUAGE_CODE).filter(
      lang => lang !== locale,
    );
    locales.forEach((lang) => {
      alternates[lang]
        = `${ROOT_SITE_URL}${lang === DEFAULT_LANGUAGE ? '' : `/${lang}`}`;
    });
    return alternates;
  }

  if (!PATHNAMES[originalPath] || typeof PATHNAMES[originalPath] !== 'object') {
    return alternates;
  }

  const translatedPaths = PATHNAMES[originalPath] as PathRecord;

  Object.entries(translatedPaths).forEach(([lang, path]) => {
    if (lang === locale) {
      return;
    }

    let finalPath = path;
    if (slug && path.includes('[slug]')) {
      finalPath = path.replace('[slug]', slug);
    }

    alternates[lang] = `${ROOT_SITE_URL}${
      lang === DEFAULT_LANGUAGE ? '' : `/${lang}`
    }${finalPath}`;
  });

  return alternates;
}

export function getCanonicalUrl(
  originalPath: string,
  locale: string,
  pathname: string,
  slug?: string,
): string {
  if (originalPath === '/' || pathname === '/') {
    return `${ROOT_SITE_URL}${locale === DEFAULT_LANGUAGE ? '' : `/${locale}`}`;
  }

  if (PATHNAMES[originalPath] && typeof PATHNAMES[originalPath] === 'object') {
    const translatedPaths = PATHNAMES[originalPath] as PathRecord;
    if (translatedPaths[locale]) {
      let path = translatedPaths[locale];
      if (slug && path.includes('[slug]')) {
        path = path.replace('[slug]', slug);
      }

      return `${ROOT_SITE_URL}${
        locale === DEFAULT_LANGUAGE ? '' : `/${locale}`
      }${path}`;
    }
  }

  return `${ROOT_SITE_URL}${
    locale === DEFAULT_LANGUAGE ? '' : `/${locale}`
  }${pathname}`;
}

export function generateSEOMetadata({
  title,
  description,
  locale,
  pathname,
  slug,
  imageUrl,
}: SEOMetadataProps): Metadata {
  const originalPath = getOriginalPath(pathname, locale, slug);
  const alternateLanguages = generateAlternateLanguages(
    originalPath,
    locale,
    slug,
  );
  const canonicalUrl = getCanonicalUrl(originalPath, locale, pathname, slug);

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateLanguages,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      images: imageUrl ? [{ url: imageUrl }] : undefined,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: imageUrl ? [imageUrl] : undefined,
    },
  };
}
