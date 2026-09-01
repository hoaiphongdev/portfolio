import { getLocale, getTranslations } from 'next-intl/server';

import { TextHighlight } from '@/components/animations/TextHighlight';
import Breadcrumbs from '@/components/common/Breadcrumbs';
import Certification from '@/components/common/Certification';
import IntroductionFrame from '@/components/common/IntroductionFrame';
import Typography from '@/components/common/Typography';
import type { LANGUAGE_CODE } from '@/constants/languages';
import { STATIC_PAGE_ORIGIN_URL } from '@/constants/paths';
import type { IBreadcrumbType } from '@/types/common';
import { getBasePathWithPresetLocale } from '@/utils/url';

export default async function AboutPageComponents() {
  const t = await getTranslations('');
  const locale = (await getLocale()) as keyof typeof LANGUAGE_CODE;

  const breadcrumbs: IBreadcrumbType[] = [
    {
      label: t('breadcrumbs.about.home'),
      url: getBasePathWithPresetLocale({
        path: STATIC_PAGE_ORIGIN_URL.HOME,
        locale,
      }),
    },
    {
      label: t('breadcrumbs.about.about'),
      url: getBasePathWithPresetLocale({
        path: STATIC_PAGE_ORIGIN_URL.ABOUT_ME,
        locale,
      }),
    },
  ];

  return (
    <section className="relative mt-4 lg:mt-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-x-12 xl:gap-x-20">
        <Breadcrumbs
          breadcrumbs={breadcrumbs}
          containerClassName="pb-6 md:pb-0 md:mb-10 lg:col-span-2"
        />
        <div className="flex flex-col items-center justify-start gap-y-8 pt-6 lg:gap-y-10 lg:pt-10">
          <IntroductionFrame>{t('page.about.introduction')}</IntroductionFrame>
          <Certification variant="compact" />
        </div>
        <div>
          <Typography
            as="h1"
            variant="page"
            text={t('page.about.title')}
            className="my-6 text-center"
          />
          <ul className="my-6 flex list-disc flex-col gap-y-4 px-4 text-foreground/85 marker:text-primary sm:gap-y-8 md:my-12 md:px-14 md:text-lg">
            <li className="leading-8">
              <p>
                {t.rich('page.about.intro', {
                  current: chunks => (
                    <TextHighlight className="mx-1">{chunks}</TextHighlight>
                  ),
                  aspiring: chunks => (
                    <TextHighlight className="mx-1">{chunks}</TextHighlight>
                  ),
                })}
              </p>
            </li>

            {t
              .raw('page.about.highlights')
              .map((item: string, index: number) => (
                <li key={index}>
                  <p>{item}</p>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
