import { ProjectDetailComponent } from '@/components/pages/project-detail/ProjectDetailComponent';
import { DEFAULT_LANGUAGE } from '@/constants/languages';
import { getProjectContent, getProjectPaths } from '@/utils/markdow';

interface ProjectPageProps {
  params: {
    slug: string;
    locales: string;
  };
}

// export async function generateMetadata({
//   params,
// }: ProjectPageProps): Promise<Metadata> {
//   const { frontmatter } = await getProjectContent(params.slug, params.locales);

//   return {
//     title: frontmatter.title,
//     description: frontmatter.description,
//   };
// }

export async function generateStaticParams() {
  const paths = await getProjectPaths();
  if (!paths) {
    return [];
  }
  return paths;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug, locales = DEFAULT_LANGUAGE } = params;
  const project = await getProjectContent(slug, locales);

  return <ProjectDetailComponent project={project} />;
}
