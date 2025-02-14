import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import { notFound } from 'next/navigation';

import { LANGUAGE_CODE } from '@/constants/languages';
import type { IProject } from '@/types/project';

const PROJECTS_PATH = path.join(process.cwd(), 'content/projects');

export async function getProjectContent(slug: string, lang: string = 'en') {
  const filePath = path.join(PROJECTS_PATH, lang, `${slug}.md`);

  try {
    if (!fs.existsSync(filePath)) {
      return notFound();
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    return {
      frontmatter: data as IProject,
      content,
    };
  } catch {
    return notFound();
  }
}

export async function getProjectPaths() {
  const paths: { slug: string; lang: string }[] = [];

  Object.values(LANGUAGE_CODE).forEach((lang) => {
    const langPath = path.join(PROJECTS_PATH, lang);
    const files = fs.readdirSync(langPath);

    files.forEach((file) => {
      const slug = file.replace('.md', '');
      paths.push({ slug, lang });
    });
  });

  return paths;
}
