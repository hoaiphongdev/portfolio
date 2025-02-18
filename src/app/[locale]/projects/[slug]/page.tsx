import type { Metadata } from 'next';

import { ProjectDetailComponent } from '@/components/pages/project-detail/ProjectDetailComponent';
import type { LANGUAGE_CODE } from '@/constants/languages';
import { DEFAULT_LANGUAGE } from '@/constants/languages';
import { DYNAMIC_PAGE_ORIGIN_URL } from '@/constants/paths';
import { getProjectContent, getProjectPaths } from '@/utils/markdow';
import { generateSEOMetadata } from '@/utils/seo';

interface ProjectPageProps {
  params: {
    slug: string;
    locale: string;
  };
}

export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { frontmatter } = await getProjectContent(params.slug, params.locale);
  const safeLocale = params.locale as keyof typeof LANGUAGE_CODE;

  return generateSEOMetadata({
    title: frontmatter.title,
    description: frontmatter.description,
    locale: safeLocale,
    pathname: DYNAMIC_PAGE_ORIGIN_URL.PROJECT_DETAIL,
    slug: params.slug,
    imageUrl: frontmatter.imageSrc,
  });
}

export async function generateStaticParams() {
  const paths = await getProjectPaths();
  return paths || [];
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, locale = DEFAULT_LANGUAGE } = params;
  const project = await getProjectContent(slug, locale);

  return <ProjectDetailComponent project={project} />;
}
