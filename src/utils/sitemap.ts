import fs from 'node:fs';
import path from 'node:path';

import { DEFAULT_LANGUAGE, LANGUAGE_CODE } from '@/constants/languages';
import { STATIC_PAGE_ORIGIN_URL } from '@/constants/paths';
import { TRANSLATED_URL } from '@/constants/routes';
import { ROOT_SITE_URL } from '@/constants/url';

interface SitemapURL {
  loc: string;
  lastmod?: string;
  changefreq?:
    | 'always'
    | 'hourly'
    | 'daily'
    | 'weekly'
    | 'monthly'
    | 'yearly'
    | 'never';
  priority?: number;
}

interface SitemapConfig {
  excludePaths?: string[];
  additionalUrls?: SitemapURL[];
}

const PROJECTS_PATH = path.join(process.cwd(), 'content/projects');
const DEFAULT_CHANGEFREQ = {
  HOME: 'daily',
  STATIC: 'weekly',
  DYNAMIC: 'weekly',
} as const;

const DEFAULT_PRIORITY = {
  HOME: 1.0,
  STATIC: 0.8,
  DYNAMIC: 0.7,
} as const;

function getLocalizedUrl(
  path: string,
  locale: string,
  baseUrl: string,
): string {
  return `${baseUrl}${locale === DEFAULT_LANGUAGE ? '' : `/${locale}`}${path}`;
}

function getTranslatedPath(originalPath: string, locale: string): string {
  return TRANSLATED_URL[originalPath]?.[locale] || originalPath;
}

function getHomeUrls(baseUrl: string): SitemapURL[] {
  return Object.keys(LANGUAGE_CODE).map(locale => ({
    loc: getLocalizedUrl('', locale, baseUrl),
    changefreq: DEFAULT_CHANGEFREQ.HOME,
    priority: DEFAULT_PRIORITY.HOME,
  }));
}

function getStaticUrls(baseUrl: string): SitemapURL[] {
  const urls: SitemapURL[] = [];
  const locales = Object.keys(LANGUAGE_CODE);

  Object.entries(STATIC_PAGE_ORIGIN_URL).forEach(([_, path]) => {
    if (path === '/') {
      return;
    }

    locales.forEach((locale) => {
      const translatedPath = getTranslatedPath(path, locale);
      urls.push({
        loc: getLocalizedUrl(translatedPath, locale, baseUrl),
        changefreq: DEFAULT_CHANGEFREQ.STATIC,
        priority: DEFAULT_PRIORITY.STATIC,
      });
    });
  });

  return urls;
}

function getProjectUrls(baseUrl: string): SitemapURL[] {
  const urls: SitemapURL[] = [];
  const locales = Object.keys(LANGUAGE_CODE);

  locales.forEach((locale) => {
    const langPath = path.join(PROJECTS_PATH, locale);
    if (!fs.existsSync(langPath)) {
      return;
    }

    const files = fs.readdirSync(langPath);
    files.forEach((file) => {
      const slug = file.replace('.md', '');
      const filePath = path.join(langPath, file);
      const stats = fs.statSync(filePath);

      const projectBasePath = getTranslatedPath(
        STATIC_PAGE_ORIGIN_URL.PROJECTS,
        locale,
      );

      urls.push({
        loc: getLocalizedUrl(`${projectBasePath}/${slug}`, locale, baseUrl),
        lastmod: stats.mtime.toISOString(),
        changefreq: DEFAULT_CHANGEFREQ.DYNAMIC,
        priority: DEFAULT_PRIORITY.DYNAMIC,
      });
    });
  });

  return urls;
}

function generateUrlXml(url: SitemapURL): string {
  return `
    <url>
      <loc>${url.loc}</loc>
      ${url.lastmod ? `<lastmod>${url.lastmod}</lastmod>` : ''}
      ${url.changefreq ? `<changefreq>${url.changefreq}</changefreq>` : ''}
      ${url.priority ? `<priority>${url.priority}</priority>` : ''}
    </url>`;
}

function withXMLTemplate(content: string): string {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset 
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:news="http://www.google.com/schemas/sitemap-news/0.9"
      xmlns:xhtml="http://www.w3.org/1999/xhtml"
      xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
      xmlns:video="http://www.google.com/schemas/sitemap-video/1.1"
    >
      ${content}
    </urlset>`;
}

export function validateSitemapUrl(url: SitemapURL): void {
  if (!url.loc) {
    throw new Error('URL location is required');
  }
  if (url.priority && (url.priority < 0 || url.priority > 1)) {
    throw new Error('Priority must be between 0.0 and 1.0');
  }
  if (url.lastmod && Number.isNaN(Date.parse(url.lastmod))) {
    throw new Error('Invalid lastmod date format');
  }
}

export function buildSitemapXml(config: SitemapConfig = {}): string {
  const { excludePaths = [], additionalUrls = [] } = config;

  const allUrls = [
    ...getHomeUrls(ROOT_SITE_URL),
    ...getStaticUrls(ROOT_SITE_URL),
    ...getProjectUrls(ROOT_SITE_URL),
    ...additionalUrls,
  ].filter(url => !excludePaths.some(path => url.loc.includes(path)));

  allUrls.forEach(validateSitemapUrl);

  const urlElements = allUrls.map(generateUrlXml).join('');
  return withXMLTemplate(urlElements);
}

export const withIndexXmlTemplate = (content: string): string => {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${content}
    </sitemapindex>`;
};
