import type { NextFetchEvent, NextRequest, NextResponse } from 'next/server';

import type { MiddlewareFactory, MiddlewareType } from './types';

export function chains(functions: MiddlewareFactory[], index = 0): MiddlewareType {
  const current = functions[index];

  if (current) {
    const next = chains(functions, index + 1);
    return current(next);
  }

  return (_: NextRequest, __: NextFetchEvent, response: NextResponse) => {
    return response;
  };
}
