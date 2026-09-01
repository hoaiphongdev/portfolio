import React from 'react';

import FloatingDock from '../common/Navigation/FloatingDock';
import SocialSideBar from '../common/Navigation/SocialSideBar';
import HomeBackdrop from './HomeBackdrop';

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative bg-background">
      <HomeBackdrop />
      {/* `relative` keeps page content painting above the absolutely
          positioned backdrop. */}
      <section className="relative flex min-h-dvh flex-col overflow-hidden pb-24">
        <main className="mx-auto w-full flex-1 px-4 pt-6 md:container md:px-20 md:pt-10">
          {children}
        </main>
      </section>
      <SocialSideBar />
      <FloatingDock />
    </div>
  );
}
