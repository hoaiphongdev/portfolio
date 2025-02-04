import type { NextRequest } from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { routing } from '@/i18n/routing';

import type { MiddlewareType } from './types';

export const mwIntl = (): MiddlewareType => {
  return async (request: NextRequest) => {
    const intlMiddleware = createMiddleware(routing);

    return intlMiddleware(request);
  };
};
