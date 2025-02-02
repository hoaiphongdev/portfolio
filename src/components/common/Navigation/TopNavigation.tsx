'use client';

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
} from 'framer-motion';
import { useTranslations } from 'next-intl';
import { useState } from 'react';

import cn from '@/lib/cn';

export default function TopNavigation() {
  const t = useTranslations('common.headerMobile');

  const { scrollY } = useScroll();

  const [isOver, setIsOver] = useState(
    (scrollY as any)?.current > 100,
  );

  useMotionValueEvent(scrollY, 'change', (latest) => {
    if (latest >= 100 && !isOver) {
      setIsOver(true);
    }
    if (latest <= 0 && isOver) {
      setIsOver(false);
    }
  });

  return (
    <header className="relative z-50 h-20 w-full">
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            boxShadow: 'none',
          }}
          animate={{
            boxShadow:
              '0px 2px 3px -1px rgba(0, 0, 0, 0.1), 0px 1px 0px 0px rgba(25, 28, 33, 0.02), 0px 0px 0px 1px rgba(25, 28, 33, 0.08)',
          }}
          transition={{
            duration: 0.25,
          }}
          className={cn(
            'flex w-full flex-col items-center justify-center gap-y-1 bg-background py-3',
            isOver
              ? 'header-scroll border-b border-b-[#ddd]/50 shadow'
              : 'bg-transparent',
          )}
        >
          <p className="text-xl font-bold uppercase text-black/70">
            {t('title')}
          </p>
          <p className="font-medium text-black/70">
            {t('description')}
          </p>
        </motion.div>
      </AnimatePresence>
    </header>
  );
}
