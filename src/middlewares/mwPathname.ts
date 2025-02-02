import type { NextFetchEvent, NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { Network } from '@/constants/network';

import type { MiddlewareType } from './types';

export const mwPathname = (middleware: MiddlewareType): MiddlewareType => {
  return (request: NextRequest, event: NextFetchEvent) => {
    const requestHeaders = new Headers(request.headers);
    const nextResponse = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    nextResponse.headers.set(Network.X_PATHNAME, request.nextUrl.pathname);
    return middleware(request, event, nextResponse);
  };
};
