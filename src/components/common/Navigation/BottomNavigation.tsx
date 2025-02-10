'use client';

import { DoorOpen } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { STATIC_PAGE_ORIGIN_URL } from '@/constants/paths';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import { Link, usePathname } from '@/i18n/routing';
import cn from '@/lib/cn';
import type { ILinkType } from '@/types/common';
import { getBasePathWithPresetLocale, getIsActivePath } from '@/utils/url';

import NavigationDrawer from './Drawer';

export default function BottomNavigation() {
  const t = useTranslations('common.navigation');
  const locale = useCurrentLocale();

  const pathname = usePathname() as string;

  const mobileLink: ILinkType[] = [
    {
      label: t('home'),
      url: getBasePathWithPresetLocale(STATIC_PAGE_ORIGIN_URL.HOME, locale),
      icon: DoorOpen,
    },
  ];

  const renderLink = () => {
    return mobileLink.map((item, index) => {
      const isActive = getIsActivePath(pathname, item.url);

      return (
        <li
          key={`${item.label}_${index}`}
          className={cn('flex-1 rounded-[40px]', isActive && 'bg-primary')}
        >
          <Link
            href={item.url}
            className="flex h-full items-center justify-center gap-x-1 sm:gap-x-2"
          >
            {item.icon && (
              <item.icon
                className={cn(isActive ? 'stroke-white' : 'stroke-title')}
              />
            )}
            <h3
              className={cn(
                'text-xs font-medium capitalize sm:text-sm',
                isActive && 'text-white',
              )}
            >
              {item.label}
            </h3>
          </Link>
        </li>
      );
    });
  };

  return (
    <nav className="fixed bottom-3 left-0 z-10 h-[50px] w-full rounded-[40px] px-2">
      <ul className="flex h-full list-none items-stretch justify-between overflow-hidden rounded-[40px] border border-solid border-primary bg-white p-1.5">
        {renderLink()}
        <li className="flex w-[50px] items-center justify-center">
          <NavigationDrawer />
        </li>
      </ul>
    </nav>
  );
}
