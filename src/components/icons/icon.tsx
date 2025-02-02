import React from 'react';

import cn from '@/lib/cn';

import { IconRegistry } from './icon-registry';
import type { IIconProps } from './types/icon-types';

export const Icon = ({
  name,
  color = 'currentColor',
  strokeWidth = 2,
  className,
}: IIconProps) => {
  const IconComponent = IconRegistry[name];

  if (!IconComponent) {
    console.error(`Icon "${name}" not found in registry`);
    return null;
  }

  return (
    <IconComponent
      color={color}
      strokeWidth={strokeWidth}
      className={cn('inline-block', className)}
      aria-hidden="true"
    />
  );
};
