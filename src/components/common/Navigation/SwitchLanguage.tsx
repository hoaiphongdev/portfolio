'use client';

import { useLocale } from 'next-intl';

import { Separator } from '@/components/ui/separator';
import { LANGUAGE_CODE } from '@/constants/languages';
import { Link, usePathname } from '@/i18n/routing';
import cn from '@/lib/cn';

export default function SwitchLanguage() {
  const locale = useLocale();

  const pathname = usePathname();

  return (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <Link
        href={pathname}
        locale={LANGUAGE_CODE.vi}
      >
        <h2
          className={cn(
            'cursor-pointer text-lg font-bold',
            locale === LANGUAGE_CODE.vi! && 'text-primary',
          )}
        >
          VI
        </h2>
      </Link>
      <Separator orientation="vertical" className="h-full w-[2px] bg-[#ccc]" />
      <Link
        href={pathname}
        locale={LANGUAGE_CODE.en}
      >
        <h2
          className={cn(
            'cursor-pointer text-lg font-bold',
            locale === LANGUAGE_CODE.en && 'text-primary',
          )}
        >
          EN
        </h2>
      </Link>
    </div>
  );
}
