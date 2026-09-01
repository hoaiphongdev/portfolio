'use client';

import type { LucideIcon } from 'lucide-react';
import {
  BriefcaseBusiness,
  FileText,
  FolderGit2,
  Home,
  Moon,
  Sun,
  UserRound,
} from 'lucide-react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useTheme } from 'next-themes';

import {
  dockItemClass,
  DockTooltip,
} from '@/components/common/Navigation/DockItem';
import PaletteSwitcher from '@/components/common/Navigation/PaletteSwitcher';
import { TooltipProvider } from '@/components/ui/tooltip';
import { LANGUAGE_CODE } from '@/constants/languages';
import { STATIC_PAGE_ORIGIN_URL } from '@/constants/paths';
import { PROFILE_URL } from '@/constants/url';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import { useSwitchLanguage } from '@/hooks/useSwitchLanguage';
import { usePathname } from '@/i18n/routing';
import cn from '@/lib/cn';
import { getBasePathWithPresetLocale, getIsActivePath } from '@/utils/url';

interface DockLink {
  label: string;
  url: string;
  icon: LucideIcon;
  exact?: boolean;
  external?: boolean;
}

export default function FloatingDock() {
  const t = useTranslations('common.navigation');
  const locale = useCurrentLocale();
  const pathname = usePathname() ?? '/';
  const { resolvedTheme, setTheme } = useTheme();
  const switchLanguage = useSwitchLanguage();

  const targetLocale
    = locale === LANGUAGE_CODE.en ? LANGUAGE_CODE.vi : LANGUAGE_CODE.en;

  const links: DockLink[] = [
    {
      label: t('home'),
      url: getBasePathWithPresetLocale({
        path: STATIC_PAGE_ORIGIN_URL.HOME,
        locale,
      }),
      icon: Home,
      exact: true,
    },
    {
      label: t('projects'),
      url: getBasePathWithPresetLocale({
        path: STATIC_PAGE_ORIGIN_URL.PROJECTS,
        locale,
      }),
      icon: FolderGit2,
    },
    {
      label: t('experiences'),
      url: getBasePathWithPresetLocale({
        path: STATIC_PAGE_ORIGIN_URL.EXPERIENCES,
        locale,
      }),
      icon: BriefcaseBusiness,
    },
    {
      label: t('aboutMe'),
      url: getBasePathWithPresetLocale({
        path: STATIC_PAGE_ORIGIN_URL.ABOUT_ME,
        locale,
      }),
      icon: UserRound,
    },
    {
      label: t('resume'),
      url: PROFILE_URL,
      icon: FileText,
      external: true,
    },
  ];

  const isActive = (link: DockLink) => {
    if (link.external) {
      return false;
    }
    if (link.exact) {
      // `getIsActivePath` prefix-matches, which makes '/' active everywhere.
      return pathname.replace(/\/$/, '') === link.url.replace(/\/$/, '');
    }
    return getIsActivePath(pathname, link.url);
  };

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-50 flex justify-center pb-[max(0.75rem,env(safe-area-inset-bottom))]"
    >
      <TooltipProvider delayDuration={200}>
        <ul className="flex list-none items-center gap-0 rounded-full border border-border bg-card/80 p-1.5 shadow-lg backdrop-blur-md sm:gap-1 sm:px-2">
          {links.map((link) => {
            const active = isActive(link);
            return (
              <li key={link.label}>
                <DockTooltip label={link.label}>
                  <Link
                    href={link.url}
                    aria-label={link.label}
                    aria-current={active ? 'page' : undefined}
                    {...(link.external
                      ? { target: '_blank', rel: 'noopener noreferrer' }
                      : {})}
                    className={cn(
                      dockItemClass,
                      active
                        ? 'text-primary'
                        : 'text-muted-foreground hover:text-foreground',
                    )}
                  >
                    <link.icon className="size-5 motion-safe:transition-transform motion-safe:hover:scale-110" />
                    {active && (
                      <span className="absolute bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-primary" />
                    )}
                  </Link>
                </DockTooltip>
              </li>
            );
          })}
          <li aria-hidden className="mx-0.5 h-6 w-px bg-border sm:mx-1" />
          <li>
            <DockTooltip label={t('toggleTheme')}>
              <button
                type="button"
                aria-label={t('toggleTheme')}
                onClick={() =>
                  setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
                className={cn(
                  dockItemClass,
                  'text-muted-foreground hover:text-foreground',
                )}
              >
                <Sun className="size-5 dark:hidden" />
                <Moon className="hidden size-5 dark:block" />
              </button>
            </DockTooltip>
          </li>
          <li>
            <PaletteSwitcher />
          </li>
          <li>
            <DockTooltip label={targetLocale.toUpperCase()}>
              <button
                type="button"
                aria-label={`Switch language to ${targetLocale.toUpperCase()}`}
                onClick={() => switchLanguage(targetLocale)}
                className={cn(
                  dockItemClass,
                  'font-mono text-xs font-semibold text-muted-foreground hover:text-foreground',
                )}
              >
                {targetLocale.toUpperCase()}
              </button>
            </DockTooltip>
          </li>
        </ul>
      </TooltipProvider>
    </nav>
  );
}
