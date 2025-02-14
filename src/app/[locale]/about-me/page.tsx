import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import {
  getAlternatesMetadata,
  getOpenGraphMetadata,
} from '@/app/shared-metadata';
import AboutPageComponents from '@/components/pages/about-me/AboutPage';
import type { LANGUAGE_CODE } from '@/constants/languages';
import { ROOT_SITE_URL } from '@/constants/url';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'metadata.about' });

  const url = `${ROOT_SITE_URL}/${locale}/about`;

  const safeLocale = locale as keyof typeof LANGUAGE_CODE;

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords').split(','),
    icons: [{ rel: 'icon', url: '/logo.png' }],
    openGraph: {
      ...getOpenGraphMetadata(locale),
      title: t('title'),
      description: t('description'),
      url,
      images: [
        {
          url: `/api/og?title=${t('og.title')}&description=${t('og.description')}`,
        },
      ],
    },
    canonical: url,
    alternates: getAlternatesMetadata(safeLocale, url),
  } as Metadata;
}

export default async function AboutPage() {
  return <AboutPageComponents />;
}
