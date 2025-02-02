'use client';

import { AnimatePresence } from 'framer-motion';

import BaseAnimation from '@/components/animations/BaseAnimation';

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <AnimatePresence mode="wait">
      <BaseAnimation>{children}</BaseAnimation>
    </AnimatePresence>
  );
}
