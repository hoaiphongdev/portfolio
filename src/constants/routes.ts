import { LANGUAGE_CODE } from './languages';
import { STATIC_PAGE_ORIGIN_URL } from './paths';

export const NON_TRANSLATED_URL = {} as const;

export const TRANSLATED_URL = {
  [STATIC_PAGE_ORIGIN_URL.ABOUT_ME]: {
    [LANGUAGE_CODE.en]: '/about-me',
    [LANGUAGE_CODE.vi]: '/ve-toi',
  },
};

export const PATHNAMES = {
  ...Object.fromEntries(
    Object.values(NON_TRANSLATED_URL).map(path => [path, path]),
  ),
  ...Object.fromEntries(
    Object.entries(TRANSLATED_URL).map(([originalPath, paths]) => [
      originalPath,
      paths,
    ]),
  ),
} as const;
