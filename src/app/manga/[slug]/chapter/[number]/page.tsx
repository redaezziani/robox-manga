'use client';
import { use, useEffect } from 'react';
import { notFound } from 'next/navigation';

import { Loader2 } from 'lucide-react';

import ImageViewer from '@/components/manga/image-viewer';

import useMangaStore from '@/zustand/data/store';

export default function Page({ params }: { params: Promise<{ slug: string; number: string }> }) {
  const resolvedParams = use(params);
  const { chapter, loadingStates, error, fetchChapter } = useMangaStore();
  useEffect(() => {
    fetchChapter(resolvedParams.slug, resolvedParams.number);
  }, [resolvedParams.slug, resolvedParams.number, fetchChapter]);

  if (error) {
    notFound();
  }

  if (loadingStates.singleManga) {
    return (
      <div lang="ar" className="flex h-[50vh] items-center justify-center">
        <div className="flex items-center gap-2">
          <Loader2 className="animate-spin" />
          <span>جاري التحميل...</span>
        </div>
      </div>
    );
  }

  if (!chapter) {
    return null;
  }

  return (
    <div lang="ar" className="container  mx-auto px-4 py-8">
      <section className="sticky my-6 flex flex-col items-start justify-start">
        <h2 lang="ar" className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-50">
          قراءة الفصل
        </h2>
        <p lang="ar" className="text-sm text-gray-500 dark:text-gray-300">
          اقرأ الفصل {resolvedParams.number} من المانجا {resolvedParams.slug}
        </p>
      </section>

      <ImageViewer images={chapter.pages} />
    </div>
  );
}
