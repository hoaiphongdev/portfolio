'use client';

import { MenuIcon, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useCallback, useMemo, useState } from 'react';

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { VisuallyHidden } from '@/components/ui/visually-hidden';
import { STATIC_PAGE_ORIGIN_URL } from '@/constants/paths';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import { Link, usePathname } from '@/i18n/routing';
import cn from '@/lib/cn';
import type { ILinkType } from '@/types/common';
import { getBasePathWithPresetLocale, getIsActivePath } from '@/utils/url';

import SwitchLanguage from './SwitchLanguage';

export default function NavigationDrawer() {
  const t = useTranslations('common.drawer');

  const pathname = usePathname() as string;

  const locale = useCurrentLocale();

  const [openDrawer, setOpenDrawer] = useState(false);

  const drawerLink: ILinkType[] = useMemo(() => {
    return [
      {
        label: t('home'),
        url: getBasePathWithPresetLocale({
          path: STATIC_PAGE_ORIGIN_URL.HOME,
          locale,
        }),
      },
      {
        label: t('experiences'),
        url: getBasePathWithPresetLocale({
          path: STATIC_PAGE_ORIGIN_URL.EXPERIENCES,
          locale,
        }),
      },
      {
        label: t('projects'),
        url: getBasePathWithPresetLocale({
          path: STATIC_PAGE_ORIGIN_URL.PROJECTS,
          locale,
        }),
      },
      {
        label: t('about'),
        url: getBasePathWithPresetLocale({
          path: STATIC_PAGE_ORIGIN_URL.ABOUT_ME,
          locale,
        }),
      },
    ];
  }, [t, locale]);

  const renderDrawerLink = useCallback(() => {
    return drawerLink.map((item, index) => {
      const isActive = getIsActivePath(pathname, item.url);

      return (
        <li key={`${item.label}_${index}`}>
          <Link
            href={item.url}
            className="flex items-center justify-center gap-x-2"
            onClick={() => item.url && setOpenDrawer(false)}
          >
            <h3
              className={cn(
                'text-xl font-medium capitalize text-title',
                isActive && 'text-primary',
              )}
            >
              {item.label}
            </h3>
          </Link>
        </li>
      );
    });
  }, [drawerLink, pathname, setOpenDrawer]); // Add dependencies

  return (
    <Drawer
      open={openDrawer}
      onOpenChange={setOpenDrawer}
      direction="bottom"
      closeThreshold={0.5}
    >
      <VisuallyHidden>
        <DrawerTitle>Setting</DrawerTitle>
      </VisuallyHidden>
      <DrawerTrigger asChild>
        <MenuIcon />
      </DrawerTrigger>
      <DrawerContent className="z-[1000] h-full w-full">
        <VisuallyHidden>
          <DrawerDescription>Description Settings</DrawerDescription>
        </VisuallyHidden>
        <nav className="relative mx-auto flex h-full w-full max-w-sm">
          <DrawerClose asChild className="absolute right-0 top-0">
            <X />
          </DrawerClose>
          <ul className="flex h-full w-full flex-col items-center justify-center gap-y-8">
            {renderDrawerLink()}
            <li className="mt-10">
              <SwitchLanguage />
            </li>
          </ul>
        </nav>
      </DrawerContent>
    </Drawer>
  );
}
