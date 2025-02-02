import { useLocale } from 'next-intl';

import type { LANGUAGE_CODE } from '@/constants/languages';

export function useCurrentLocale() {
  return useLocale() as keyof typeof LANGUAGE_CODE;
}
