import { getLocale, getTranslations } from 'next-intl/server';

import Breadcrumbs from '@/components/common/Breadcrumbs';
import type { LANGUAGE_CODE } from '@/constants/languages';
import { STATIC_PAGE_ORIGIN_URL } from '@/constants/paths';
import type { IBreadcrumbType } from '@/types/common';
import { getBasePathWithPresetLocale } from '@/utils/url';

import ExperienceInfo from './ExperienceInfo';
import WorkExperienceComponent from './WorkExperienceComponent';

export default async function ExperiencesPage() {
  const t = await getTranslations();
  const locale = (await getLocale()) as keyof typeof LANGUAGE_CODE;

  const breadcrumbs: IBreadcrumbType[] = [
    {
      label: t('breadcrumbs.experiences.home'),
      url: getBasePathWithPresetLocale(STATIC_PAGE_ORIGIN_URL.HOME, locale),
    },
    {
      label: t('breadcrumbs.experiences.experiences'),
      url: getBasePathWithPresetLocale(
        STATIC_PAGE_ORIGIN_URL.EXPERIENCES,
        locale,
      ),
    },
  ];

  return (
    <section className="relative mt-4 min-h-screen lg:mt-8">
      <div className="flex flex-col items-center justify-center pb-10 md:pb-20">
        <Breadcrumbs breadcrumbs={breadcrumbs} containerClassName="pb-28" />
        <ExperienceInfo />
        <WorkExperienceComponent />
      </div>
    </section>
  );
}
