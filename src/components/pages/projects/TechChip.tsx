import { cva, type VariantProps } from 'class-variance-authority';

import cn from '@/lib/cn';

const techChipVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-1 font-mono text-xs font-medium',
  {
    variants: {
      variant: {
        tech: 'bg-primary/10 text-primary',
        tool: 'bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'tech',
    },
  },
);

interface Props extends VariantProps<typeof techChipVariants> {
  tech: string;
}

export default function TechChip({ tech, variant }: Props) {
  return <span className={cn(techChipVariants({ variant }))}>{tech}</span>;
}
