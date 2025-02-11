import { LinkPreview } from '@/components/animations/LinkPreview';
import type { IProject } from '@/constants/data/projects';

import TechChip from './TechChip';
import TypeBadge from './TypeBadge';

export default function ProjectCard({ project }: { project: IProject }) {
  return (
    <div className="group relative p-6 rounded-2xl border border-gray-500 transition-all duration-300 bg-card shadow-sm h-fit">
      <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-blue-100/20 to-purple-100/20 opacity-0 transition-opacity duration-300" />
      <div className="relative space-y-4 h-full flex flex-col">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600 font-medium">
            {project.date}
          </span>
          <div className="flex gap-2">
            <TypeBadge type={project.type} />
          </div>
        </div>
        <LinkPreview
          isStatic
          imageSrc={project.imageSrc}
          url={project.previewLink}
        >
          <h3 className="text-xl font-bold text-primary">{project.title}</h3>
        </LinkPreview>
        <p className="text-gray-700 leading-relaxed flex-1">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {project.tech.map(tech => (
            <TechChip key={tech} tech={tech} />
          ))}
        </div>
        {project.tools && (
          <div className="pt-4 border-t border-gray-100">
            <h4 className="text-sm font-medium mb-2 text-gray-500">Tools</h4>
            <div className="flex flex-wrap gap-2">
              {project.tools.map(tool => (
                <TechChip key={tool} tech={tool} variant="tool" />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
