import fs from 'node:fs';
import path from 'node:path';

import matter from 'gray-matter';
import { notFound } from 'next/navigation';
import { z } from 'zod';

import { DEFAULT_LANGUAGE, LANGUAGE_CODE } from '@/constants/languages';
import type { IProject } from '@/types/project';

const PROJECTS_PATH = path.join(process.cwd(), 'content/projects');

/**
 * Frontmatter is hand-authored, so it is parsed rather than cast. `type` in
 * particular indexes the style maps in TypeBadge/TechChip - a typo there used
 * to render an element with `undefined` classes instead of failing loudly.
 */
const projectFrontmatterSchema = z.object({
  date: z.string(),
  title: z.string(),
  slug: z.string(),
  description: z.string(),
  type: z.enum(['company', 'oss', 'personal']),
  previewLink: z.string(),
  imageSrc: z.string(),
  tech: z.array(z.string()),
  tools: z.array(z.string()).optional(),
  ranking: z.number(),
  keywords: z.string().optional(),
}) satisfies z.ZodType<IProject>;

function parseFrontmatter(data: unknown, filePath: string): IProject {
  const result = projectFrontmatterSchema.safeParse(data);

  if (!result.success) {
    throw new Error(
      `Invalid project frontmatter in ${filePath}: ${result.error.issues
        .map(issue => `${issue.path.join('.')} ${issue.message}`)
        .join('; ')}`,
    );
  }

  return result.data;
}

function readProjectFile(locale: string, filename: string) {
  const filePath = path.join(PROJECTS_PATH, locale, filename);
  const { data, content } = matter(fs.readFileSync(filePath, 'utf8'));

  return { frontmatter: parseFrontmatter(data, filePath), content };
}

function listProjectFiles(locale: string): string[] {
  const localePath = path.join(PROJECTS_PATH, locale);

  if (!fs.existsSync(localePath)) {
    return [];
  }

  return fs.readdirSync(localePath).filter(file => file.endsWith('.md'));
}

export async function getAllProjects(
  locale: string = DEFAULT_LANGUAGE,
): Promise<IProject[]> {
  return listProjectFiles(locale)
    .map(filename => readProjectFile(locale, filename).frontmatter)
    .sort((a, b) => b.ranking - a.ranking);
}

export async function getProjectContent(
  slug: string,
  locale: string = DEFAULT_LANGUAGE,
) {
  const filename = `${slug}.md`;

  if (!fs.existsSync(path.join(PROJECTS_PATH, locale, filename))) {
    notFound();
  }

  return readProjectFile(locale, filename);
}

export async function getProjectPaths() {
  // The dynamic segment is `[locale]`, so the key must be `locale`: Next
  // silently drops entries whose params don't cover every segment, which would
  // leave every project page rendered on demand instead of prerendered.
  return Object.values(LANGUAGE_CODE).flatMap(locale =>
    listProjectFiles(locale).map(file => ({
      slug: file.replace(/\.md$/, ''),
      locale,
    })),
  );
}
