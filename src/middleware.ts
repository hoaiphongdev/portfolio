import { chains } from './middlewares/chains';
import { mwIntl } from './middlewares/mwIntl';
import { mwPathname } from './middlewares/mwPathname';
import { mwRedirectIntl } from './middlewares/mwRedirectIntl';

const mw = [mwPathname, mwRedirectIntl, mwIntl];

export const middleware = chains(mw);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|images|assets|favicon.ico|sw.js).*)',
    '/',
    '/(vi|en)/:path*',
  ],
};
