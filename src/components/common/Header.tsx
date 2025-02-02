'use client';

import { useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import { STATIC_PAGE_ORIGIN_URL } from '@/constants/paths';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import { usePathname } from '@/i18n/routing';
import cn from '@/lib/cn';
import type { LinkType } from '@/types/common';
import { getBasePathWithPresetLocale } from '@/utils/url';

import { Icon } from '../icons/icon';
import NavigationDrawer from './Navigation/Drawer';
import SwitchLanguage from './Navigation/SwitchLanguage';

export default function Header() {
  const t = useTranslations();
  const pathname = usePathname() as string;
  const locale = useCurrentLocale();

  const headerLinks: LinkType[] = [
  ];

  const { scrollY } = useScroll();

  const [isOver, setIsOver] = useState(
    (scrollY as any)?.current > 100,
  );

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest >= 100 && !isOver) {
      setIsOver(true);
    }
    if (latest <= 0 && isOver) {
      setIsOver(false);
    }
  });

  const renderHeaderLink = () => {
    return headerLinks.map((item, index) => {
      const isActive = item.url && pathname.startsWith(item.url);
      const localizedUrl = item.url;

      return (
        <li
          key={`${item.label}_${index}`}
          className="md:hidden lg:block"
        >
          <Link
            href={localizedUrl}
            title={item.label}
            className={cn(
              'relative flex items-center justify-center gap-x-2 transition-all after:w-0',
            )}
          >
            <h1
              className={cn(
                'text-sm font-medium capitalize text-title xl:text-lg',
                isActive && 'text-primary',
              )}
            >
              {item.label}
            </h1>
            {item.icon && <item.icon width={20} height={20} />}
          </Link>
        </li>
      );
    });
  };

  return (
    <header className={cn('relative z-[1000] h-20 w-full')}>
      <div
        className={cn(
          isOver
            ? 'header-scroll border-b border-b-[#ddd]/50 bg-background shadow'
            : 'bg-transparent',
        )}
      >
        <nav
          className={cn(
            'container mx-auto flex items-center justify-between gap-x-10 py-3',
          )}
        >
          <Link href={getBasePathWithPresetLocale(STATIC_PAGE_ORIGIN_URL.HOME, locale)} title="home" className="flex">
            <div className="relative h-[70px] w-[70px] rounded-full bg-white">
              <Image
                src="/favicon/icon.png"
                alt="logo"
                title="logo"
                priority
                width={70}
                height={70}
              />
            </div>
            <div className="flex flex-col gap-y-2">
              <Icon name="arrow-header" className="w-10" />
              <p className="ml-7 font-bold text-primary">
                {t('common.navigation.thisIsMe')}
              </p>
            </div>
          </Link>

          <ul className="flex list-none items-center gap-x-10 transition-all">
            {renderHeaderLink()}
            <li className="md:hidden lg:block">
              <SwitchLanguage />
            </li>

            <li className="flex w-[50px] items-center justify-center md:block lg:hidden">
              <NavigationDrawer />
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
