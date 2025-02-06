import { ArrowRight } from 'lucide-react';

import type { LANGUAGE_CODE } from '@/constants/languages';
import { STATIC_PAGE_ORIGIN_URL } from '@/constants/paths';
import { useCurrentLocale } from '@/hooks/useCurrentLocale';
import { Link } from '@/i18n/routing';
import { getBasePathWithPresetLocale } from '@/utils/url';

interface InfoCardProps {
  title: string;
  bgColor: string;
}

export default function InfoCard({ title, bgColor }: InfoCardProps) {
  const locale = useCurrentLocale() as keyof typeof LANGUAGE_CODE;
  const experiencesPath = getBasePathWithPresetLocale(
    STATIC_PAGE_ORIGIN_URL.EXPERIENCES,
    locale,
    true,
  );

  return (
    <Link
      href={experiencesPath}
      className={`${bgColor} rounded-xl p-6 relative overflow-hidden transition-transform hover:scale-105`}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-white text-xl font-bold mb-2">{title}</h3>
        <div className="mt-auto">
          <div className="rounded-lg p-2 bg-white/10 w-10 h-10 flex items-center justify-center">
            <svg
              className="w-5 h-5 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <ArrowRight />
            </svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
