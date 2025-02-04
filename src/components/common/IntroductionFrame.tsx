import Image from 'next/image';
import type { ReactNode } from 'react';

import cn from '@/lib/cn';

interface Props {
  children: ReactNode;
  className?: string;
  frameClassName?: string;
}

export default async function IntroductionFrame({
  children,
  className,
  frameClassName,
}: Props) {
  return (
    <div
      className={cn(
        'relative z-20 flex items-center justify-center md:absolute md:bottom-1/2 md:left-3/4 md:translate-y-1/2 lg:bottom-full lg:translate-y-full',
        className,
      )}
    >
      <div
        className={cn(
          'absolute -top-[110%] left-[calc(50%+80px)] flex h-[100px] w-[175px] -translate-x-1/2 justify-center sm:w-[225px] md:-top-[125%] md:h-[125px] md:w-[300px]',
          frameClassName,
        )}
      >
        <Image
          title="frame-chat-image"
          src="/images/frame-chat-2.png"
          alt="logo"
          width={300}
          height={200}
        />
        <div className="absolute left-1/2 top-1/3 z-[1000] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center gap-y-0.5 text-xs font-medium text-title md:text-sm lg:text-base">
          {children}
        </div>
      </div>
      <Image
        title="frame-chat-image"
        className="h-20 w-20 rounded-[100%] bg-white sm:h-24 sm:w-24"
        src="/favicon/icon.png"
        alt="logo"
        width={80}
        height={80}
      />
    </div>
  );
}
