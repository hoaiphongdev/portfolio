import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import ProjectPageComponent from '@/components/pages/projects/ProjectPage';
import type { LANGUAGE_CODE } from '@/constants/languages';
import { STATIC_PAGE_ORIGIN_URL } from '@/constants/paths';
import { getAllProjects } from '@/utils/projects';
import { generateSEOMetadata } from '@/utils/seo';

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({
    locale,
    namespace: 'metadata.projects',
  });

  const safeLocale = locale as keyof typeof LANGUAGE_CODE;

  return generateSEOMetadata({
    title: t('title'),
    description: t('description'),
    locale: safeLocale,
    pathname: STATIC_PAGE_ORIGIN_URL.PROJECTS,
  });
}

export default async function ProjectsPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const projects = await getAllProjects(locale);
  return <ProjectPageComponent projects={projects} />;
}
