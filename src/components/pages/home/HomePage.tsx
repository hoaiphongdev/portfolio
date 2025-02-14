'use client';

import { useTranslations } from 'next-intl';

import type { LANGUAGE_CODE } from '@/constants/languages';
import { STATIC_PAGE_ORIGIN_URL } from '@/constants/paths';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import Image from '@/lib/next/image';
import { getBasePathWithPresetLocale } from '@/utils/url';

import InfoCard from './InfoCard';

export default function HomePage() {
  const t = useTranslations('page.home');
  const locale = useCurrentLocale() as keyof typeof LANGUAGE_CODE;

  const experiencesPath = getBasePathWithPresetLocale({
    path: STATIC_PAGE_ORIGIN_URL.EXPERIENCES,
    locale,
    isHomePage: true,
  });

  const projectsPath = getBasePathWithPresetLocale({
    path: STATIC_PAGE_ORIGIN_URL.PROJECTS,
    locale,
    isHomePage: true,
  });

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-2 gap-8 items-center py-8 sm:py-12 md:py-20">
        <div className="order-2 lg:order-1">
          <div className="max-w-2xl">
            <div className="mb-12 flex flex-col gap-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-800mb-4">
                {t('title')}
              </h1>
              <p className="text-gray-600 text-lg sm:text-xl max-w-2xl">
                {t('summary')}
              </p>
            </div>
            {/* <div className="grid grid-cols-3 gap-4 sm:gap-8 mb-12">
              <StatCard number="+12" label="Years of Experience" />
              <StatCard number="+46" label="Projects Completed" />
              <StatCard number="+20" label="Worldwide Clients" />
            </div> */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <InfoCard
                path={projectsPath}
                title={t('projects')}
                bgColor="bg-red-dark"
              />
              <InfoCard
                path={experiencesPath}
                title={t('experience')}
                bgColor="bg-green-dark"
              />
            </div>
          </div>
        </div>
        <div className="order-1 lg:order-2 hidden lg:block">
          <div className="relative w-full h-full min-h-[500px]">
            <Image
              src="/images/home-office.svg"
              alt="home-page"
              fill
              className="object-contain"
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
