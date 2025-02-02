import { LANGUAGE_CODE } from './languages';
import { STATIC_PAGE_ORIGIN_URL } from './paths';

export const NON_TRANSLATED_URL = {
} as const;

export const TRANSLATED_URL = {
  [STATIC_PAGE_ORIGIN_URL.HOME]: {
    [LANGUAGE_CODE.en]: '/',
    [LANGUAGE_CODE.vi]: '/vi',
  },
};

export const PATHNAMES = {
  ...Object.fromEntries(
    Object.values(NON_TRANSLATED_URL).map(path => [path, path]),
  ),
  ...Object.fromEntries(
    Object.entries(TRANSLATED_URL).map(([_, paths]) => [
      paths[LANGUAGE_CODE.en],
      paths,
    ]),
  ),
} as const;
