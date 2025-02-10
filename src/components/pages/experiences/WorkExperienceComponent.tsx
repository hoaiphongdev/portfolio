import { getTranslations } from 'next-intl/server';

import Typography from '@/components/common/Typography';
import { EXPERIENCES_DATA } from '@/constants/data/experiences';

import WorkExperienceComponentItem from './WorkExperienceComponentItem';

export default async function WorkExperienceComponent() {
  const t = await getTranslations('page.experiences.list');

  return (
    <div className="mt-8 w-full md:mt-12 md:max-w-2xl lg:max-w-4xl">
      <div className="flex w-full flex-col gap-y-8 md:gap-y-14">
        <div className="flex flex-col gap-y-2">
          <Typography text={t('overview.title')} className="uppercase" />
          <ul className="flex list-disc flex-col gap-y-3 px-4 text-sm font-medium text-secondary sm:gap-2 md:gap-3 md:gap-y-4 md:px-0 md:text-base lg:gap-4">
            <li>
              <p>{t('overview.description1')}</p>
            </li>

            <li>
              <p>{t('overview.description2')}</p>
            </li>

            <li>
              <p>{t('overview.description3')}</p>
            </li>

            <li>
              <p>{t('overview.description4')}</p>
            </li>

            <li>
              <p>{t('overview.description5')}</p>
            </li>

            <li>
              <p>{t('overview.description6')}</p>
            </li>

            <li>
              <p>{t('overview.description7')}</p>
            </li>
          </ul>
        </div>
        {EXPERIENCES_DATA.map((item, index) => {
          return (
            <div key={t(item.title) + index}>
              <WorkExperienceComponentItem
                title={t(item.title)}
                workingExperiences={item.items}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
