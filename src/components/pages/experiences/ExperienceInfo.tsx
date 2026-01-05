import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { TextGenerateEffect } from '@/components/animations/TextGenerateEffect';
import { TypewriterEffectSmooth } from '@/components/animations/TypeWriterEffect';
import IntroductionFrame from '@/components/common/IntroductionFrame';
import { PROFILE_URL } from '@/constants/url';

export default async function ExperienceInfo() {
  const t = await getTranslations();

  return (
    <>
      <div className="relative w-full">
        <IntroductionFrame className="md:bottom-0 md:translate-y-full">
          <div className="mt-0 flex flex-col items-center justify-center">
            <Link
              href={PROFILE_URL}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="cursor-pointer font-bold italic text-primary underline"
            >
              {t('page.experiences.resume')}
            </Link>
          </div>
        </IntroductionFrame>
      </div>
      <div>
        <TypewriterEffectSmooth
          className="mb:my-12 my-6 pt-6 md:mt-0 md:pt-6 lg:pt-0"
          words={t('page.experiences.title')
            .split(' ')
            .map(x => ({
              text: x,
              className: 'text-2xl sm:text-3xl md:text-4xl',
            }))}
        />
      </div>
      <ul className="flex list-none flex-col items-center justify-center gap-y-1 text-sm font-medium text-secondary sm:gap-2 md:gap-3 md:text-base lg:gap-4">
        {t
          .raw('page.experiences.descriptions')
          .map((desc: string, index: number) => (
            <li key={index}>
              {index === 0
                ? (
                    <TextGenerateEffect
                      words={desc}
                      wordClassName="text-base text-center"
                    />
                  )
                : (
                    <p className="text-center">{desc}</p>
                  )}
            </li>
          ))}
      </ul>
    </>
  );
}
