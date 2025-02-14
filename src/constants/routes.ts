import { LANGUAGE_CODE } from './languages';
import { DYNAMIC_PAGE_ORIGIN_URL, STATIC_PAGE_ORIGIN_URL } from './paths';

export const NON_TRANSLATED_URL = {} as const;

export const TRANSLATED_URL = {
  [STATIC_PAGE_ORIGIN_URL.ABOUT_ME]: {
    [LANGUAGE_CODE.en]: '/about-me',
    [LANGUAGE_CODE.vi]: '/ve-toi',
  },
  [STATIC_PAGE_ORIGIN_URL.EXPERIENCES]: {
    [LANGUAGE_CODE.en]: '/experiences',
    [LANGUAGE_CODE.vi]: '/kinh-nghiem',
  },
  [STATIC_PAGE_ORIGIN_URL.PROJECTS]: {
    [LANGUAGE_CODE.en]: '/projects',
    [LANGUAGE_CODE.vi]: '/du-an',
  },
  [DYNAMIC_PAGE_ORIGIN_URL.PROJECT_DETAIL]: {
    [LANGUAGE_CODE.en]: '/projects/[slug]',
    [LANGUAGE_CODE.vi]: '/du-an/[slug]',
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
