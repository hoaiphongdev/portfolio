import { cva } from 'class-variance-authority';

import cn from '@/lib/cn';
import type { IProject } from '@/types/project';

const typeBadgeVariants = cva(
  'inline-flex items-center rounded-full px-3 py-1 font-mono text-xs font-medium',
  {
    variants: {
      type: {
        company: 'bg-cyan-500/10 text-cyan-700 dark:text-cyan-300',
        oss: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
        personal: 'bg-primary/10 text-accent-foreground',
      },
    },
  },
);

export default function TypeBadge({ type }: { type: IProject['type'] }) {
  return (
    <span className={cn(typeBadgeVariants({ type }))}>
      {type.toUpperCase()}
    </span>
  );
}
