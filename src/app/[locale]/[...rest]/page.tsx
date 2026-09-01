import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';

export const dynamic = 'force-static';

export default function CatchAllPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  notFound();
}
