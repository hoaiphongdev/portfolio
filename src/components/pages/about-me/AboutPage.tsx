import Image from 'next/image';
import { getLocale, getTranslations } from 'next-intl/server';

import { TextHighlight } from '@/components/animations/TextHighlight';
import { TypewriterEffectSmooth } from '@/components/animations/TypeWriterEffect';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import IntroductionFrame from '@/components/common/IntroductionFrame';
import type { LANGUAGE_CODE } from '@/constants/languages';
import { STATIC_PAGE_ORIGIN_URL } from '@/constants/paths';
import type { BreadcrumbType } from '@/types/common';
import { getBasePathWithPresetLocale } from '@/utils/url';

export default async function AboutPageComponents() {
  const t = await getTranslations('');
  const locale = (await getLocale()) as keyof typeof LANGUAGE_CODE;

  const BREAD_CRUMBS: BreadcrumbType[] = [
    {
      label: t('breadcrumbs.about.home'),
      url: getBasePathWithPresetLocale(STATIC_PAGE_ORIGIN_URL.HOME, locale),
    },
    {
      label: t('breadcrumbs.about.about'),
      url: getBasePathWithPresetLocale(STATIC_PAGE_ORIGIN_URL.ABOUT_ME, locale),
    },
  ];

  return (
    <section className="relative mt-4 lg:mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-20">
        <Breadcrumbs
          breadcrumbs={BREAD_CRUMBS}
          containerClassName="pb-28 md:pb-0 md:mb-10 lg:col-span-2 lg:mb-40"
        />
        <div className="relative">
          <IntroductionFrame>{t('page.about.introduction')}</IntroductionFrame>
          <div className="relative hidden h-[350px] w-full md:block lg:w-[80%]">
            <Image
              title="about-image"
              src="/images/chill.png"
              alt="chill"
              width={1000}
              height={500}
              className="sm:object-contain lg:object-cover"
            />
          </div>
        </div>
        <div>
          <TypewriterEffectSmooth
            className="mb:my-12 my-6 pt-6 md:mt-0 md:pt-6 lg:pt-0"
            words={t('page.about.title')
              .split(' ')
              .map(x => ({
                text: x,
                className: 'text-2xl sm:text-3xl md:text-4xl',
              }))}
          />
          <ul className="my-6 flex list-disc flex-col gap-y-4 px-4 font-medium text-secondary sm:gap-y-8 md:my-12 md:px-0 md:px-14 md:text-lg">
            <li className="leading-8">
              <p>
                {t('page.about.description1')}
                <TextHighlight className="mx-1">
                  {t('page.about.position1')}
                </TextHighlight>
                {t('page.about.description2')}
                <TextHighlight className="mx-1 from-red-500 to-red-300/20">
                  {t('page.about.position2')}
                </TextHighlight>
              </p>
            </li>

            <li>
              <p>{t('page.about.description3')}</p>
            </li>

            <li>
              <p>{t('page.about.description4')}</p>
            </li>

            <li>
              <p>{t('page.about.description5')}</p>
            </li>

            <li>
              <p>{t('page.about.description6')}</p>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
