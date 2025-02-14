'use client';

import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/routing';
import type { IProject } from '@/types/project';

import TechChip from '../projects/TechChip';
import TypeBadge from '../projects/TypeBadge';
import { MarkdownContent } from './MarkdownContent';

interface ProjectDetailProps {
  project: {
    frontmatter: IProject;
    content: string;
  };
}

export function ProjectDetailComponent({ project }: ProjectDetailProps) {
  const { frontmatter, content } = project;

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container max-w-4xl py-12"
    >
      {/* Hero Section */}
      <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-border">
        <Image
          src={frontmatter.imageSrc}
          alt={frontmatter.title}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Project Header */}
      <div className="mt-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <span className="text-sm text-gray-dark">{frontmatter.date}</span>
          <TypeBadge type={frontmatter.type} />
        </div>

        <Link
          href={frontmatter.previewLink}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button
            variant="outline"
            className="border-blue-dark text-blue-dark hover:bg-blue-light"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Preview Project
          </Button>
        </Link>

        <h1 className="mt-4 text-4xl font-bold text-title">
          {frontmatter.title}
        </h1>
        <p className="mt-4 text-lg text-gray-dark">{frontmatter.description}</p>
      </div>

      {/* Tech Stack */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-title">Technologies</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {frontmatter.tech.map(tech => (
            <TechChip key={tech} tech={tech} />
          ))}
        </div>
      </div>

      {/* Tools */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold text-title">Tools</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {frontmatter.tools?.map(tool => (
            <TechChip key={tool} tech={tool} variant="tool" />
          ))}
        </div>
      </div>

      {/* Project Content */}
      <div className="mt-12">
        <MarkdownContent content={content} />
      </div>
    </motion.article>
  );
}
