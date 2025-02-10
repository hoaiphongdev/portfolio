import { getTranslations } from 'next-intl/server';
import { Fragment } from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Link } from '@/i18n/routing';
import cn from '@/lib/cn';
import type { IBreadcrumbType } from '@/types/common';

import Typography from './Typography';

interface Props {
  breadcrumbs: IBreadcrumbType[];
  containerClassName?: string;
}

export default async function Breadcrumbs({
  breadcrumbs,
  containerClassName = '',
}: Props) {
  const t = await getTranslations('common');

  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-y-1',
        containerClassName,
      )}
    >
      <Typography
        text={t('breadcrumbs')}
        className="text-lg text-secondary md:text-xl"
      />
      <Breadcrumb>
        <BreadcrumbList className="flex items-center justify-center">
          {breadcrumbs.map((item, index) => {
            const isLastItem = index === breadcrumbs.length - 1;
            return (
              <Fragment key={`${item.label}_${index}`}>
                <BreadcrumbItem
                  className={cn(
                    'group',
                    isLastItem ? 'pointer-events-none' : 'underline',
                  )}
                >
                  <Link href={item.url} legacyBehavior title="breadcrumbs">
                    <BreadcrumbLink>
                      <span
                        className={cn(
                          'inline-block text-center text-base font-medium italic text-title',
                          isLastItem
                            ? 'text-secondary'
                            : 'italic underline group-hover:font-medium',
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
