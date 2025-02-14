export interface IProject {
  date: string;
  title: string;
  slug: string;
  description: string;
  type: 'company' | 'oss' | 'personal';
  previewLink: string;
  imageSrc: string;
  tech: string[];
  tools?: string[];
  ranking: number;
}
