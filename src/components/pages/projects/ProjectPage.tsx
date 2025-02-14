import { getLocale, getTranslations } from 'next-intl/server';

import { TypewriterEffectSmooth } from '@/components/animations/TypeWriterEffect';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import type { LANGUAGE_CODE } from '@/constants/languages';
import { STATIC_PAGE_ORIGIN_URL } from '@/constants/paths';
import type { IBreadcrumbType } from '@/types/common';
import type { IProject } from '@/types/project';
import { getBasePathWithPresetLocale } from '@/utils/url';

import { ProjectList } from './ProjectList';

interface ProjectPageProps {
  projects: IProject[];
}
export default async function ProjectPageComponent({
  projects,
}: ProjectPageProps) {
  const t = await getTranslations('');
  const locale = (await getLocale()) as keyof typeof LANGUAGE_CODE;

  const breadcrumbs: IBreadcrumbType[] = [
    {
      label: t('breadcrumbs.projects.home'),
      url: getBasePathWithPresetLocale({
        path: STATIC_PAGE_ORIGIN_URL.HOME,
        locale,
      }),
    },
    {
      label: t('breadcrumbs.projects.projects'),
      url: getBasePathWithPresetLocale({
        path: STATIC_PAGE_ORIGIN_URL.PROJECTS,
        locale,
      }),
    },
  ];

  return (
    <section className="relative mt-4 min-h-screen lg:mt-8">
      <div className="flex flex-col items-center justify-center pb-10 md:pb-20">
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          containerClassName="pb-28 md:pb-0 md:mb-10 lg:col-span-2"
        />
        <div>
          <TypewriterEffectSmooth
            words={t('page.projects.title')
              .split(' ')
              .map(x => ({
                text: x,
                className: 'text-2xl sm:text-3xl md:text-4xl',
              }))}
          />
        </div>
        <ProjectList projects={projects} />
      </div>
    </section>
  );
}
