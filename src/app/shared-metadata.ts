import { LANGUAGE_CODE } from '@/constants/languages';

export function getOpenGraphMetadata(locale: string) {
  const baseMetadata: any = {
    type: 'website',
    siteName: 'Phạm Hoàng Sơn',
  };

  const localeMetadata: any = {
    en: {
      locale: 'en_US',
      titleTemplate: '%s | Productic',
      defaultTitle: 'Productic',
    },
    vi: {
      locale: 'vi_VN',
      titleTemplate: '%s | Productic',
      defaultTitle: 'Productic',
    },
  };

  return {
    ...baseMetadata,
    ...localeMetadata[locale],
  };
}

export function getAlternatesMetadata(locale: keyof typeof LANGUAGE_CODE, url?: string) {
  const baseMetadata: any = {
    canonical: url ?? '/',
  };

  return {
    ...baseMetadata,
    language: { [locale]: LANGUAGE_CODE[locale] },
  };
}
