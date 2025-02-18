import { NextResponse } from 'next/server';

import { buildSitemapXml } from '@/utils/sitemap';

export async function GET() {
  try {
    const sitemap = buildSitemapXml({
      excludePaths: ['/admin', '/api'],
      additionalUrls: [
        // {
        //   loc: `${process.env.NEXT_PUBLIC_SITE_URL}/custom-page`,
        //   changefreq: 'monthly',
        //   priority: 0.5,
        // },
      ],
    });

    return new NextResponse(sitemap, {
      headers: {
        'Content-Type': 'text/xml',
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    });
  } catch (error) {
    console.error('Error generating sitemap:', error);
    return new NextResponse('Error generating sitemap', { status: 500 });
  }
}
