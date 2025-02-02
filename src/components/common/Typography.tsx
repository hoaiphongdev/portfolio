import type { DetailedHTMLProps, HTMLAttributes } from 'react';

import cn from '@/lib/cn';

interface Props
  extends DetailedHTMLProps<
    HTMLAttributes<HTMLHeadingElement>,
    HTMLHeadingElement
  > {
  text: string;
}

export default function Typography({ text, ...others }: Props) {
  return (
    <h2
      {...others}
      className={cn(
        'text-base font-bold text-primary md:text-lg',
        others?.className,
      )}
    >
      {text}
    </h2>
  );
}
