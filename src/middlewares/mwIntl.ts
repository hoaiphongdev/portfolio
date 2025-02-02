import type { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

import type { MiddlewareType } from './types';

export const mwIntl = (): MiddlewareType => {
  const intlMiddleware = createMiddleware(routing);

  return (
    request: NextRequest,
  ) => {
    return intlMiddleware(request) as NextResponse;
  };
};
