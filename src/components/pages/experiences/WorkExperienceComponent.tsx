import { getTranslations } from 'next-intl/server';

import Typography from '@/components/common/Typography';

import WorkExperienceComponentItem from './WorkExperienceComponentItem';

export default async function WorkExperienceComponent() {
  const t = await getTranslations('page.experiences.list');

  const EXPERIENCES: any[] = [
    {
      title: t('work.title'),
      experiences: [
        {
          title: t('work.dsv.title'),
          subTitle: t('work.dsv.subTitle'),
          description: t.raw('work.dsv.description'),
          time: t('work.dsv.time'),
          previewLink: 'https://www.designveloper.com/',
        },
        {
          title: t('work.saigonMio.title'),
          subTitle: t('work.saigonMio.subTitle'),
          description: t('work.saigonMio.description'),
          time: t('work.saigonMio.time'),
          previewLink: 'https://saigonmio.com/',
        },
        {
          title: t('work.bessfu.title'),
          subTitle: t('work.bessfu.subTitle'),
          description: t('work.bessfu.description'),
          time: t('work.bessfu.time'),
          previewLink: 'https://bessfu.com/',
        },
        {
          title: t('work.snp.title'),
          subTitle: t('work.snp.subTitle'),
          description: t('work.snp.description'),
          time: t('work.snp.time'),
          previewLink: 'https://saigonnewport.com.vn/',
        },
      ],
    },
    {
      title: t('edu.title'),
      experiences: [
        {
          title: t('edu.experiences.title'),
          subTitle: t('edu.experiences.subTitle'),
          description: t('edu.experiences.description'),
          time: t('edu.experiences.time'),
          projects: [],
          logo: '/images/hcmunre.png',
          previewLink: 'https://hcmunre.edu.vn/',
        },
      ],
    },
  ];

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
        {EXPERIENCES.map((item, index) => {
          return (
            <div key={item.title + index}>
              <WorkExperienceComponentItem
                title={item.title}
                workingExperiences={item.experiences}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}
