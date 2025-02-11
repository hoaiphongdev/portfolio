'use client';

import Masonry from 'react-masonry-css';

import { PROJECTS_DATA } from '@/constants/data/projects';

import ProjectCard from './ProjectCard';

export function ProjectList() {
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
      {PROJECTS_DATA.map(project => (
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
