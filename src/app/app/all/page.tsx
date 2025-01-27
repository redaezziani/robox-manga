// pages/all-manga.tsx
import React from 'react';
import MainPageLayout from '@/components/shared-ui/layouts/main-page-layout';
import MangaClientWrapper from './components/MangaClientWrapper';

const AllMangaPage = () => {
  return (
    <MainPageLayout>
      <div className="container relative mx-auto mt-10 flex w-full flex-col gap-2 px-4">
        <section className="my-6 flex flex-col items-start justify-start">
          <h3 lang="ar" className="text-lg font-semibold text-gray-600 dark:text-gray-200">
            عالمك المفضل للمانجا العربية
          </h3>
          <p lang="ar" className="text-sm text-gray-500 dark:text-gray-300">
            انضم إلينا في رحلة استكشاف عالم المانجا الساحر
          </p>
        </section>
        
        <MangaClientWrapper />
      </div>
    </MainPageLayout>
  );
};

export default AllMangaPage;