// pages/all-manga.tsx
import React from 'react';
import MainPageLayout from '@/components/shared-ui/layouts/main-page-layout';
import MangaList from './ui/manga-list';

const AllMangaPage = () => {
    return (
        <MainPageLayout

        >
            <div className="container relative mx-auto  flex w-full flex-col gap-2" dir="rtl">
                <section className=" flex flex-col items-start justify-start">
                    <h3 lang="ar" className="text-lg font-semibold text-gray-600 dark:text-gray-200">
                        عالمك المفضل للمانجا العربية
                    </h3>
                    <p lang="ar" className="text-sm text-gray-500 dark:text-gray-300">
                        انضم إلينا في رحلة استكشاف عالم المانجا الساحر
                    </p>
                </section>
                <div className="flex flex-col mt-5 gap-4">
                    <MangaList />
                </div>
            </div>
        </MainPageLayout>
    );
};

export default AllMangaPage;