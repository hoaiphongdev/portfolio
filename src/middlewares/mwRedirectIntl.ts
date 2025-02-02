import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { TRANSLATED_URL } from '@/constants/routes';
import { routing } from '@/i18n/routing';

import type { MiddlewareType } from './types';

export const mwRedirectIntl = (middleware: MiddlewareType): MiddlewareType => {
  return (request: NextRequest, event: NextFetchEvent) => {
    const url = request.nextUrl;
    const pathname = url.pathname;
    const currentLocale = routing.locales.find(
      locale => pathname.startsWith(`/${locale}`),
    ) || routing.defaultLocale;

    const cleanPath = pathname.replace(`/${currentLocale}`, '') || '/';

    for (const [_, localePaths] of Object.entries(TRANSLATED_URL)) {
      const alternativePaths = Object.entries(localePaths)
        .filter(([locale]) => locale !== currentLocale)
        .map(([_, path]) => path);

      if (alternativePaths.includes(cleanPath)) {
        const expectedPath = localePaths[currentLocale];
        const newUrl = new URL(
          `/${currentLocale}${expectedPath}`,
          request.url,
        );
        return NextResponse.redirect(newUrl, { status: 308 });
      }
    }

    const nextResponse = NextResponse.next();
    return middleware(request, event, nextResponse);
  };
};
