import Image from 'next/image';
import type { ReactNode } from 'react';

import cn from '@/lib/cn';

interface Props {
  children: ReactNode;
  className?: string;
}

export default async function IntroductionFrame({
  children,
  className,
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-y-4 text-center',
        className,
      )}
    >
      <Image
        title="avatar"
        className="size-20 rounded-full bg-card ring-2 ring-primary/30"
        src="/favicon/icon.png"
        alt="Hoài Phong avatar"
        width={80}
        height={80}
      />
      <div className="flex flex-col items-center justify-center gap-y-0.5 text-sm text-muted-foreground">
        {children}
      </div>
    </div>
  );
}
