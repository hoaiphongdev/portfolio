'use client';

import { useParams } from 'next/navigation';

import { usePathname, useRouter } from '@/i18n/routing';

export function useSwitchLanguage() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams() ?? {};

  const switchLanguage = (newLocale: string) => {
    // Pass the pathname template plus its params, never a pre-substituted
    // string: next-intl resolves a localized path by matching the template
    // against its `pathnames` map, and a substituted path matches nothing.
    router.replace(
      // @ts-expect-error -- `useParams` is untyped, so it cannot be narrowed to
      // the param shape each pathname template expects.
      { pathname, params },
      { locale: newLocale },
    );
  };

  return switchLanguage;
}
