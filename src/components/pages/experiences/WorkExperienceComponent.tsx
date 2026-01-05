import { getTranslations } from 'next-intl/server';

import Typography from '@/components/common/Typography';

import WorkExperienceComponentItem from './WorkExperienceComponentItem';

export interface ExperienceItem {
  title: string;
  subTitle: string;
  description: string;
  time: string;
  previewLink: string;
}

export interface ExperienceSection {
  title: string;
  items: ExperienceItem[];
}

export default async function WorkExperienceComponent() {
  const t = await getTranslations('page.experiences.list');
  const sections = t.raw('sections') as ExperienceSection[];

  return (
    <div className="mt-8 w-full md:mt-12 md:max-w-2xl lg:max-w-4xl">
      <div className="flex w-full flex-col gap-y-8 md:gap-y-14">
        <div className="flex flex-col gap-y-2">
          <Typography text={t('overview.title')} className="uppercase" />
          <ul className="flex list-disc flex-col gap-y-3 px-4 text-sm font-medium text-secondary sm:gap-2 md:gap-3 md:gap-y-4 md:px-0 md:text-base lg:gap-4">
            {t.raw('overview.items').map((item: string, index: number) => (
              <li key={index}>
                <p>{item}</p>
              </li>
            ))}
          </ul>
        </div>
        {sections.map((section, index) => (
          <div key={section.title + index}>
            <WorkExperienceComponentItem
              title={section.title}
              items={section.items}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
