import { ArrowUpRight } from 'lucide-react';
import { memo } from 'react';

import { LinkPreview } from '@/components/animations/LinkPreview';
import { ROOT_SITE_URL } from '@/constants/url';
import { Link } from '@/i18n/routing';
import type { IProject } from '@/types/project';

import TechChip from './TechChip';
import TypeBadge from './TypeBadge';

const ProjectCard = memo(({ project }: { project: IProject }) => {
  const { date, title, slug, description, type, tech, tools, imageSrc }
    = project;
  const previewLink
    = project.previewLink === '/' ? ROOT_SITE_URL : project.previewLink;

  return (
    <article className="group p-6 rounded-2xl border border-gray-500 transition-all duration-300 bg-card shadow-sm h-full">
      <div className="space-y-4 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">{date}</span>
          <div className="flex gap-2">
            <TypeBadge type={type} />
          </div>
        </div>
        <LinkPreview
          isStatic
          imageSrc={imageSrc}
          url={previewLink}
          target="_blank"
        >
          <h3 className="text-xl font-bold text-primary">{title}</h3>
        </LinkPreview>
        <p className="text-gray-700 leading-relaxed flex-1">{description}</p>
        <div className="flex flex-wrap gap-2">
          {tech.map(tech => (
            <TechChip key={tech} tech={tech} />
          ))}
        </div>
        {tools && (
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium mb-2 text-gray-500">Tools</h4>
            <div className="flex flex-wrap gap-2">
              {tools.map(tool => (
                <TechChip key={tool} tech={tool} variant="tool" />
              ))}
            </div>
          </div>
        )}
        <Link
          href={`/projects/${slug}`}
          scroll
          className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors mt-4"
        >
          View Detail
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </article>
  );
});

export default ProjectCard;
