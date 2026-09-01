import Link from 'next/link';
import { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import cn from '@/lib/cn';
import type { IBreadcrumbType } from '@/types/common';

interface Props {
  breadcrumbs: IBreadcrumbType[];
  containerClassName?: string;
}

export default async function Breadcrumbs({
  breadcrumbs,
  containerClassName = '',
}: Props) {
  return (
    <div className={cn('flex items-center', containerClassName)}>
      <Breadcrumb>
        <BreadcrumbList className="flex items-center">
          {breadcrumbs.map((item, index) => {
            const isLastItem = index === breadcrumbs.length - 1;
            return (
              <Fragment key={`${item.label}_${index}`}>
                <BreadcrumbItem
                  className={cn(isLastItem && 'pointer-events-none')}
                >
                  <Link href={item.url} legacyBehavior title="breadcrumbs">
                    <BreadcrumbLink>
                      <span
                        className={cn(
                          'inline-block text-sm transition-colors',
                          isLastItem
                            ? 'font-medium text-foreground'
                            : 'text-muted-foreground hover:text-foreground',
                        )}
                      >
                        {item.label}
                      </span>
                      {item.icon && item.icon}
                    </BreadcrumbLink>
                  </Link>
                </BreadcrumbItem>

                {!isLastItem && <BreadcrumbSeparator />}
              </Fragment>
            );
          })}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
}
