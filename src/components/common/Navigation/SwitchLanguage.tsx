'use client';

import { useLocale } from 'next-intl';

import { Separator } from '@/components/ui/separator';
import { LANGUAGE_CODE } from '@/constants/languages';
import { usePathname, useRouter } from '@/i18n/routing';
import cn from '@/lib/cn';

export default function SwitchLanguage() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLanguageChange = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <div className="flex h-5 items-center space-x-4 text-sm">
      <button
        type="button"
        onClick={() => handleLanguageChange(LANGUAGE_CODE.vi)}
        className={cn(
          'cursor-pointer text-lg font-bold',
          locale === LANGUAGE_CODE.vi && 'text-primary',
        )}
      >
        VI
      </button>
      <Separator orientation="vertical" className="h-full w-[2px] bg-[#ccc]" />
      <button
        type="button"
        onClick={() => handleLanguageChange(LANGUAGE_CODE.en)}
        className={cn(
          'cursor-pointer text-lg font-bold',
          locale === LANGUAGE_CODE.en && 'text-primary',
        )}
      >
        EN
      </button>
    </div>
  );
}
