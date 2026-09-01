import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import IntroductionFrame from '@/components/common/IntroductionFrame';
import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import { PROFILE_URL } from '@/constants/url';

export default async function ExperienceInfo() {
  const t = await getTranslations();

  return (
    <>
      <IntroductionFrame className="my-8">
        <Button asChild variant="outline" size="sm" className="mt-2">
          <Link
            href={PROFILE_URL}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            {t('page.experiences.resume')}
          </Link>
        </Button>
      </IntroductionFrame>
      <Typography
        as="h1"
        variant="page"
        text={t('page.experiences.title')}
        className="my-6 text-center"
      />
      <ul className="flex list-none flex-col items-center justify-center gap-y-1 text-sm text-muted-foreground sm:gap-2 md:gap-3 md:text-base lg:gap-4">
        {t
          .raw('page.experiences.descriptions')
          .map((desc: string, index: number) => (
            <li key={index}>
              <p className="text-center">{desc}</p>
            </li>
          ))}
      </ul>
    </>
  );
}
