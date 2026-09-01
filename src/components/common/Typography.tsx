import { cva, type VariantProps } from 'class-variance-authority';
import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import cn from '@/lib/cn';

const typographyVariants = cva('', {
  variants: {
    variant: {
      page: 'text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl',
      section:
        'text-lg font-semibold tracking-tight text-foreground md:text-xl',
      eyebrow:
        'font-mono text-xs font-medium uppercase tracking-[0.2em] text-primary',
    },
  },
  defaultVariants: {
    variant: 'section',
  },
});

interface Props
  extends
  DetailedHTMLProps<HTMLAttributes<HTMLHeadingElement>, HTMLHeadingElement>,
  VariantProps<typeof typographyVariants> {
  text: string;
  as?: 'h1' | 'h2' | 'h3' | 'p';
}

export default function Typography({
  text,
  variant,
  as: Tag = 'h2',
  ...others
}: Props) {
  return (
    <Tag
      {...others}
      className={cn(typographyVariants({ variant }), others?.className)}
    >
      {text}
    </Tag>
  );
}
