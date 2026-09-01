import type { MetadataRoute } from 'next';

import { ROOT_SITE_URL } from '@/constants/url';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    // Served via the /sitemap.xml -> /dynamic-sitemap rewrite in next.config.mjs
    sitemap: `${ROOT_SITE_URL.replace(/\/$/, '')}/sitemap.xml`,
  };
}
