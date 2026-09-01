import { chains } from './middlewares/chains';
import { mwIntl } from './middlewares/mwIntl';

const mw = [mwIntl];

export const middleware = chains(mw);

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)', '/'],
};
