'use client';

import { Check } from 'lucide-react';
import { useTranslations } from 'next-intl';
import * as React from 'react';

import {
  dockItemClass,
  DockTooltip,
} from '@/components/common/Navigation/DockItem';
import { usePalette } from '@/components/providers/palette';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { PALETTES } from '@/constants/palettes';
import cn from '@/lib/cn';

export default function PaletteSwitcher() {
  const t = useTranslations('common.palette');
  const { palette, setPalette } = usePalette();
  const [open, setOpen] = React.useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <DockTooltip label={t('label')}>
        <PopoverTrigger asChild>
          <button
            type="button"
            aria-label={t('label')}
            className={cn(
              dockItemClass,
              'text-muted-foreground hover:text-foreground',
            )}
          >
            <span
              aria-hidden
              className="bg-primary ring-border size-4 rounded-full ring-1"
            />
          </button>
        </PopoverTrigger>
      </DockTooltip>
      <PopoverContent side="top" sideOffset={12} collisionPadding={12}>
        <p className="text-muted-foreground px-1 pb-2 text-xs font-medium">
          {t('label')}
        </p>
        <ul className="grid list-none grid-cols-5 gap-1 p-0">
          {PALETTES.map(({ id, preview }) => {
            const isActive = palette === id;

            return (
              <li key={id}>
                <button
                  type="button"
                  aria-label={t(id)}
                  aria-pressed={isActive}
                  onClick={() => {
                    setPalette(id);
                    setOpen(false);
                  }}
                  className={cn(
                    'hover:bg-accent focus-visible:ring-ring flex size-11 items-center justify-center rounded-full transition-colors focus-visible:outline-none focus-visible:ring-2',
                  )}
                >
                  <span
                    aria-hidden
                    className={cn(
                      'relative flex size-6 items-center justify-center rounded-full',
                      isActive
                      && 'ring-ring ring-offset-popover ring-2 ring-offset-2',
                    )}
                  >
                    <span
                      className="absolute inset-0 rounded-full dark:hidden"
                      style={{ backgroundColor: preview.light }}
                    />
                    <span
                      className="absolute inset-0 hidden rounded-full dark:block"
                      style={{ backgroundColor: preview.dark }}
                    />
                    {isActive && (
                      <Check className="relative size-3.5 text-white dark:text-zinc-900" />
                    )}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </PopoverContent>
    </Popover>
  );
}
