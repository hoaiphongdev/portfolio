'use client';

import { motion } from 'framer-motion';
import React from 'react';

import cn from '@/lib/cn';

export const TextHighlight = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <motion.span
      initial={{
        backgroundSize: '0% 100%',
      }}
      animate={{
        backgroundSize: '100% 100%',
      }}
      transition={{
        duration: 2,
        ease: 'linear',
        delay: 0.5,
      }}
      style={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'left center',
        display: 'inline',
      }}
      className={cn(
        `to-primary/70 relative inline-block rounded-lg bg-gradient-to-r from-indigo-300 px-1 pb-1 `,
        className,
      )}
    >
      {children}
    </motion.span>
  );
};
