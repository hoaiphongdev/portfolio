'use client';

import { motion } from 'framer-motion';

import { usePathname } from '@/i18n/routing';

export default function BaseAnimation({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname() as string;

  return (
    <motion.div
      key={pathname}
      initial={{ opacity: 0, y: 20 }}
      transition={{
        type: 'tween',
        ease: [0.25, 0.25, 0.5, 0.75],
        duration: 1,
      }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="w-full"
    >
      {children}
    </motion.div>
  );
}
