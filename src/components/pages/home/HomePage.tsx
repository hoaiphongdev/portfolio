'use client';

import { useTranslations } from 'next-intl';
import type { ReactNode } from 'react';

import CodeLaptop from '@/components/animations/CodeLaptop';
import Typography from '@/components/common/Typography';
import cn from '@/lib/cn';

function SloganWord({
  className,
  accent = false,
  children,
}: {
  className?: string;
  accent?: boolean;
  children: ReactNode;
}) {
  return (
    <span
      aria-hidden
      className={cn(
        'pointer-events-none absolute select-none whitespace-nowrap font-mono text-base font-medium uppercase tracking-[0.3em] md:text-2xl',
        accent ? 'text-primary' : 'text-foreground/80',
        className,
      )}
    >
      {children}
    </span>
  );
}

export default function HomePage() {
  const t = useTranslations('page.home');

  const slogan = [
    t('slogan.w1'),
    t('slogan.w2'),
    t('slogan.w3'),
    t('slogan.w4'),
  ];

  return (
    <section className="relative flex h-[calc(100dvh_-_7.5rem)] flex-col items-center justify-center overflow-hidden md:h-[calc(100dvh_-_8.5rem)]">
      <p className="sr-only">{slogan.join(' ')}</p>
      <div className="relative">
        <CodeLaptop
          className="size-[min(90vw,calc(100dvh_-_11.5rem))] md:size-[min(70vw,calc(100dvh_-_14rem))] md:max-h-[880px] md:max-w-[880px]"
          aria-label={t('canvasAlt')}
        />
        <SloganWord className="left-[2%] top-[6%] md:-left-[14%] md:top-[10%]">
          {slogan[0]}
        </SloganWord>
        <SloganWord accent className="right-0 top-[42%] md:-right-[16%]">
          {slogan[1]}
        </SloganWord>
        <SloganWord className="bottom-[26%] left-[4%] md:-left-[10%] md:bottom-[30%]">
          {slogan[2]}
        </SloganWord>
        <SloganWord className="bottom-[4%] right-[6%] md:-right-[12%] md:bottom-[8%]">
          {slogan[3]}
        </SloganWord>
      </div>
      <div className="mt-3 flex flex-col items-center gap-y-1 text-center md:mt-4">
        <Typography
          as="h1"
          variant="eyebrow"
          text="NGUYỄN HOÀI PHONG"
          className="text-sm md:text-base"
        />
        <p className="text-xs text-muted-foreground md:text-sm">{t('title')}</p>
      </div>
    </section>
  );
}
