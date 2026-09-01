'use client';

import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import cn from '@/lib/cn';

export const dockItemClass = cn(
  'relative flex size-11 items-center justify-center rounded-full transition-colors',
  'hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
);

export function DockTooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>{children}</TooltipTrigger>
      <TooltipContent side="top" sideOffset={8}>
        <p>{label}</p>
      </TooltipContent>
    </Tooltip>
  );
}
