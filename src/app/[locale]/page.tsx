import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import {
  getAlternatesMetadata,
  getOpenGraphMetadata,
} from '@/app/shared-metadata';
import HomePageComponent from '@/components/pages/home/HomePage';
import type { LANGUAGE_CODE } from '@/constants/languages';
import { ROOT_SITE_URL } from '@/constants/url';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: 'metadata.home' });
  const url = `${ROOT_SITE_URL}/${locale}`;

  const safeLocale = locale as keyof typeof LANGUAGE_CODE;
  return {
    title: t('title'),
    keywords: t('keywords').split(','),
    description: t('description'),
    openGraph: {
      ...getOpenGraphMetadata(locale),
      title: t('title'),
      description: t('description'),
      url,
      images: [
        {
          url: `/api/og?title=${t('title')}&description=${t('description')}`,
        },
      ],
    },
    canonical: url,
    alternates: getAlternatesMetadata(safeLocale, url),
  } as Metadata;
}

export default async function HomePage() {
  return <HomePageComponent />;
}
