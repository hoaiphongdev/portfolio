import Link from 'next/link';
import { getTranslations } from 'next-intl/server';

import { Button } from '@/components/ui/button';

export default async function NotFound() {
  const t = await getTranslations('common.navigation');

  return (
    <section className="flex min-h-[70vh] w-full flex-col items-center justify-center gap-y-6 text-center">
      <p className="font-mono text-8xl font-medium text-primary/20 sm:text-9xl">
        404
      </p>
      <p className="text-lg text-muted-foreground">
        This page could not be found.
      </p>
      <Button asChild>
        <Link href="/">{t('home')}</Link>
      </Button>
    </section>
  );
}
