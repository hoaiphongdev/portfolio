import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import HomePageComponent from '@/components/pages/home/HomePage';
import type { LANGUAGE_CODE } from '@/constants/languages';
import { STATIC_PAGE_ORIGIN_URL } from '@/constants/paths';
import { generateSEOMetadata } from '@/utils/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'metadata.home',
  });

  const safeLocale = locale as keyof typeof LANGUAGE_CODE;

  return generateSEOMetadata({
    title: t('title'),
    description: t('description'),
    locale: safeLocale,
    pathname: STATIC_PAGE_ORIGIN_URL.HOME,
  });
}

export default function HomePage() {
  return <HomePageComponent />;
}
