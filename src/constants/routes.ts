import { LANGUAGE_CODE } from './languages';
import { DYNAMIC_PAGE_ORIGIN_URL, STATIC_PAGE_ORIGIN_URL } from './paths';

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

/**
 * The same map as `TRANSLATED_URL`, widened for callers that look paths up by a
 * plain string (SEO metadata). `TRANSLATED_URL` itself stays literal-typed
 * because `defineRouting` derives `Link`'s href types from it.
 */
export const PATHNAMES: Record<string, Record<string, string>> = TRANSLATED_URL;

/**
 * Look a translated path up by its origin path.
 *
 * `TRANSLATED_URL` is handed to `defineRouting` verbatim so `Link`/`router`
 * keep their literal-key type-safety; this helper is the one place allowed to
 * index it with a plain string.
 */
export function lookupTranslatedPath(
  originPath: string,
  locale: string,
): string | undefined {
  const translations = (
    TRANSLATED_URL as Record<string, Record<string, string> | undefined>
  )[originPath];

  return translations?.[locale];
}
