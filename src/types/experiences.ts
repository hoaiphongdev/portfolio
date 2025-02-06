import type { StaticImageData } from 'next/image';

export interface ExperienceProjectType {
  time: string;
  title: string;
  subTitle: string;
  description: string;
  tags?: TagItemType[];
}

export interface ExperienceItemType {
  time: string;
  title: string;
  subTitle: string;
  description: string;
  logo: string | StaticImageData;
  projects: ExperienceProjectType[];
  previewLink?: string;
}

export interface TagItemType {
  title: string;
  icon: any;
  previewLink?: string;
}
