'use client';
import { use, useEffect } from 'react';
import { notFound } from 'next/navigation';

import DetailsPath from './components/details-path';
import MangaDetails from './components/manga-details';

import useMangaStore from '@/zustand/data/store';

export default function Page({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);

  const { manga, loadingStates, error, fetchManga } = useMangaStore();

  useEffect(() => {
    fetchManga(resolvedParams.slug);
  }, [resolvedParams.slug, fetchManga]);

  if (error) {
    notFound();
  }

  if (loadingStates.singleManga) {
    return (
      <div className="mt-4 flex w-full animate-pulse flex-col items-start justify-start gap-10 overflow-x-hidden md:flex-row">
        <div className="relative aspect-[2/3] w-full max-w-60 overflow-hidden rounded-lg border border-gray-400/45">
          <div className="size-full bg-gray-200"></div>
        </div>
        <div className="flex w-full flex-col gap-4">
          <div className="space-y-4">
            <div>
              <div className="mb-1 block h-6 w-1/2 bg-gray-200"></div>
              <div className="mb-2 block h-4 w-1/3 bg-gray-200"></div>
            </div>
            <div className="flex flex-wrap gap-2">
              <div className="h-5 w-16 rounded-md bg-gray-200"></div>
            </div>
            <div className="space-y-2">
              <div className="mt-2 block h-4 w-1/3 bg-gray-200"></div>
              <div className="mt-2 block h-4 w-1/3 bg-gray-200"></div>
              <div className="mt-2 block h-4 w-1/3 bg-gray-200"></div>
              <div className="mt-2 block h-4 w-1/3 bg-gray-200"></div>
            </div>
            <div>
              <div className="mt-2 h-5 w-16 rounded-md bg-gray-200"></div>
              <div className="mt-2 h-5 w-24 rounded-md bg-gray-200"></div>
            </div>
            <div>
              <div className="mt-2 h-5 w-16 rounded-md bg-gray-200"></div>
              <div className="mt-2 h-5 w-24 rounded-md bg-gray-200"></div>
            </div>
            <div>
              <div className="mt-2 h-5 w-16 rounded-md bg-gray-200"></div>
              <div className="mt-2 block h-4 w-full bg-gray-200"></div>
            </div>
          </div>
          <div className="w-full space-y-4">
            <div className="block h-6 w-1/4 bg-gray-200"></div>
            <div className="block h-24 w-full bg-gray-200"></div>
          </div>
          <div className="flex h-10 w-full items-center justify-start">
            <div className="block h-4 w-3/4 bg-gray-200"></div>
          </div>
        </div>
      </div>
    );
  }

  if (!manga) {
    return null;
  }

  return (
    <div lang="ar" className="container mx-auto px-4 py-8">
      <section className="my-6 flex flex-col items-start justify-start">
        <h2 lang="ar" className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-50">
          تفاصيل المانجا
        </h2>
        <p lang="ar" className="text-sm text-gray-500 dark:text-gray-300">
          استكشف تفاصيل هذه المانجا، بما في ذلك الفصول المتاحة والتقييمات والمعلومات الأساسية
        </p>
      </section>
      <DetailsPath
        title={
          manga.otherTitles.length > 0 && manga.otherTitles[0] !== ' - '
            ? manga.otherTitles[0]
            : manga.title
        }
      />
      <MangaDetails chapters={manga.chapters} manga={manga} />
    </div>
  );
}
