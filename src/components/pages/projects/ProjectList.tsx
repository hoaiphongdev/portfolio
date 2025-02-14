'use client';

import Masonry from 'react-masonry-css';

import type { IProject } from '@/types/project';

import ProjectCard from './ProjectCard';

interface ProjectListProps {
  projects: IProject[];
}

export function ProjectList({ projects }: ProjectListProps) {
  const breakpointColumnsObj = {
    default: 3,
    1024: 2,
    640: 1,
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="flex -ml-4"
      columnClassName="pl-4 bg-clip-padding"
    >
      {projects.map(project => (
        <div
          key={project.title}
          className="mb-5 holographic-card transition-all duration-500 ease-in-out hover:scale-105"
        >
          <ProjectCard project={project} />
        </div>
      ))}
    </Masonry>
  );
}
