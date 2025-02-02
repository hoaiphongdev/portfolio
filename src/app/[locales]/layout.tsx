import '@/styles/globals.css';

import type { Metadata } from 'next';
import localFont from 'next/font/local';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';

import {
  getAlternatesMetadata,
  getOpenGraphMetadata,
} from '@/app/shared-metadata';
import FluidMotionCursor from '@/components/animations/FluidCursorMotion';
import DefaultLayout from '@/components/layouts/DefaultLayout';
import { ThemeProvider } from '@/components/providers/theme';
import { ROOT_SITE_URL } from '@/constants/url';
import cn from '@/lib/cn';

const Mali = localFont({
  src: [
    {
      path: '../../../public/fonts/Mali/Mali-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Mali/Mali-Italic.ttf',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../../public/fonts/Mali/Mali-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/Mali/Mali-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-mali',
});

export const metadata: Metadata = {
  metadataBase: new URL(ROOT_SITE_URL),
  title: {
    template: '%s - Hoai Phong',
    default: 'Frontend Developer',
  },
  description: 'This site is my personal space',
  openGraph: getOpenGraphMetadata('vi'),
  alternates: getAlternatesMetadata('vi'),
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [
      { url: '/favicon/apple-icon-57x57.png', sizes: '57x57' },
      { url: '/favicon/apple-icon-60x60.png', sizes: '60x60' },
      { url: '/favicon/apple-icon-72x72.png', sizes: '72x72' },
      { url: '/favicon/apple-icon-76x76.png', sizes: '76x76' },
      { url: '/favicon/apple-icon-114x114.png', sizes: '114x114' },
      { url: '/favicon/apple-icon-120x120.png', sizes: '120x120' },
      { url: '/favicon/apple-icon-144x144.png', sizes: '144x144' },
      { url: '/favicon/apple-icon-152x152.png', sizes: '152x152' },
      { url: '/favicon/apple-icon-180x180.png', sizes: '180x180' },
    ],
    other: [
      {
        rel: 'msapplication-TileImage',
        url: '/favicon/ms-icon-144x144.png',
      },
    ],
  },
};

// export function generateStaticParams() {
//   return Object.values(LANGUAGE_CODE).map(locale => ({ locale }));
// }

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages} locale={locale}>
      <html
        lang={locale}
        suppressHydrationWarning
        className={cn(
          'h-screen scroll-pt-[3.5rem] overflow-x-hidden bg-background font-sans antialiased',
          Mali.variable,
        )}
      >
        <body suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <DefaultLayout>
              {children}
              <FluidMotionCursor />
            </DefaultLayout>
          </ThemeProvider>
        </body>
      </html>
    </NextIntlClientProvider>
  );
}
