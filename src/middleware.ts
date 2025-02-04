import { chains } from './middlewares/chains';
import { mwIntl } from './middlewares/mwIntl';
import { mwPathname } from './middlewares/mwPathname';

const mw = [mwPathname, mwIntl];

export const middleware = chains(mw);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/'],
};
