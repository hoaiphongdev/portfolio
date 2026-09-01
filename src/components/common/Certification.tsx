import { ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import Typography from '@/components/common/Typography';
import { Button } from '@/components/ui/button';
import { CREDLY_AWS_DEVELOPER_ASSOCIATE_URL } from '@/constants/url';
import cn from '@/lib/cn';

const CERT_BADGE_SRC = '/images/certs/aws-developer-associate.png';

interface Props {
  /** `card` is the prominent Experiences layout, `compact` the About chip. */
  variant?: 'card' | 'compact';
  className?: string;
}

export default async function Certification({
  variant = 'card',
  className,
}: Props) {
  const t = await getTranslations('common.certifications');

  if (variant === 'compact') {
    return (
      <section
        aria-label={t('heading')}
        className={cn('flex w-full flex-col items-center gap-y-3', className)}
      >
        <Typography variant="eyebrow" text={t('heading')} />
        <Link
          href={CREDLY_AWS_DEVELOPER_ASSOCIATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-x-3 rounded-lg border border-border bg-card px-4 py-3 shadow-sm outline-none transition-colors hover:border-primary/40 focus-visible:ring-1 focus-visible:ring-ring"
        >
          <Image
            src={CERT_BADGE_SRC}
            alt=""
            width={40}
            height={40}
            className="size-10 shrink-0 select-none object-contain"
          />
          <span className="flex flex-col text-left">
            <span className="text-sm font-medium text-card-foreground transition-colors group-hover:text-primary">
              {t('aws.name')}
            </span>
            <span className="font-mono text-xs text-muted-foreground">
              {t('aws.issuer')}
            </span>
          </span>
          <ExternalLink
            aria-hidden="true"
            className="ml-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-primary"
          />
          <span className="sr-only">{t('verifyLabel')}</span>
        </Link>
      </section>
    );
  }

  return (
    <section
      aria-label={t('heading')}
      className={cn('flex w-full flex-col gap-y-4', className)}
    >
      <Typography variant="eyebrow" text={t('heading')} />
      <article className="flex flex-col items-center gap-4 rounded-xl border border-border bg-card p-6 text-center shadow-sm transition-colors duration-300 hover:border-primary/40 sm:flex-row sm:gap-6 sm:text-left">
        <Image
          src={CERT_BADGE_SRC}
          alt={t('aws.badgeAlt')}
          width={96}
          height={96}
          className="size-24 shrink-0 select-none object-contain"
        />
        <div className="flex flex-col gap-y-1">
          <h3 className="text-base font-semibold tracking-tight text-card-foreground md:text-lg">
            {t('aws.name')}
          </h3>
          <p className="font-mono text-xs text-muted-foreground md:text-sm">
            {t('aws.issuer')}
          </p>
        </div>
        <Button asChild variant="outline" size="sm" className="sm:ml-auto">
          <Link
            href={CREDLY_AWS_DEVELOPER_ASSOCIATE_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t('verifyLabel')}
            <ExternalLink aria-hidden="true" className="ml-2 size-4" />
          </Link>
        </Button>
      </article>
    </section>
  );
}
