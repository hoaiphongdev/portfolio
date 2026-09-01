'use client';

import { useTranslations } from 'next-intl';

import { Icon } from '@/components/icons/icon';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { MY_SOCIAL_LINK } from '@/constants/common';
import cn from '@/lib/cn';
import type { ILinkType } from '@/types/common';

export default function SocialSideBar() {
  const t = useTranslations('common.social');

  const socialLinks: ILinkType[] = [
    {
      label: t('github'),
      url: MY_SOCIAL_LINK.GITHUB,
      icon: () => <Icon name="github" className="text-current" />,
    },
    {
      label: t('linkedin'),
      url: MY_SOCIAL_LINK.LINKEDIN,
      icon: () => <Icon name="linkedin" className="text-current" />,
    },
  ];

  return (
    <aside className="hidden md:fixed md:left-6 md:top-1/2 md:flex md:-translate-y-1/2 md:flex-col md:gap-y-4">
      {socialLinks.map((item, index) => (
        <TooltipProvider key={`${item.url}_${index}`} delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                target="_blank"
                rel="noopener noreferrer"
                type="button"
                href={item.url}
                aria-label={`Go to ${item.label}`}
                className={cn(
                  'group rounded-lg border border-border bg-card p-2 text-muted-foreground outline-none transition-colors hover:border-primary/40 hover:text-primary focus-visible:ring-1 focus-visible:ring-ring',
                )}
              >
                {item.icon()}
                <span className="sr-only">
                  Go to
                  {item.label}
                </span>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p>{item.label}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </aside>
  );
}
