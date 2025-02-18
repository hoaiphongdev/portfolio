import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';

import { DEFAULT_LANGUAGE } from '@/constants/languages';
import type { IProject } from '@/types/project';

const PROJECTS_PATH = path.join(process.cwd(), 'content/projects');

export async function getAllProjects(
  locale: string = DEFAULT_LANGUAGE,
): Promise<IProject[]> {
  try {
    const files = fs.readdirSync(path.join(PROJECTS_PATH, locale)) ?? [];

    const projects = files
      .filter(filename => filename?.endsWith('.md'))
      .map((filename) => {
        const filePath = path.join(PROJECTS_PATH, locale, filename);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContent);

        return data as IProject;
      })
      .sort((a, b) => b.ranking - a.ranking);

    return projects;
  } catch (error) {
    console.error('Error reading projects:', error);
    return [];
  }
}
