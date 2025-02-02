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
import type { LinkType } from '@/types/common';

export default function SocialSideBar() {
  const t = useTranslations('common.social');

  const SOCIAL_LINKS: LinkType[] = [
    {
      label: t('fb'),
      url: MY_SOCIAL_LINK.FB,
      icon: () => <Icon name="facebook" className="text-white" />,
    },
    {
      label: t('github'),
      url: MY_SOCIAL_LINK.GITHUB,
      icon: () => <Icon name="github" className="text-white" />,
    },
    {
      label: t('linkedin'),
      url: MY_SOCIAL_LINK.LINKEDIN,
      icon: () => <Icon name="linkedin" className="text-white" />,
    },
  ];

  return (
    <aside className="hidden md:fixed md:left-6 md:top-1/2 md:flex md:-translate-y-1/2 md:flex-col md:gap-y-4">
      <p className="text-center text-sm font-medium text-title xl:text-base">
        H
        <br />
        O
        <br />
        À
        <br />
        i
        <br />
        .
        <br />
        P
        <br />
        H
        <br />
        O
        <br />
        N
        <br />
        G
        <br />
        ...
      </p>

      {SOCIAL_LINKS.map((item, index) => (
        <TooltipProvider key={`${item.url}_${index}`} delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <a
                target="_blank"
                type="button"
                href={item.url}
                aria-label={`Go to ${item.label}`}
                className={cn(
                  'group rounded-[10px] border border-[#ccc] bg-title p-2 outline-none transition-all hover:bg-primary hover:shadow-md',
                  index === 0 && 'bg-primary',
                )}
              >
                <item.icon
                  fill="white"
                  stroke="#75787e"
                  className="group-hover:fill-white group-hover:stroke-title md:h-4 md:w-4 xl:h-5 xl:w-5"
                />

                <span className="sr-only">
                  Go to
                  {item.label}
                </span>
              </a>
            </TooltipTrigger>
            <TooltipContent>
              <p className="text-base lg:text-lg">
                {item.label}
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      ))}
    </aside>
  );
}
