'use client';
import { use, useEffect } from 'react';


import MangaDetails from './components/manga-details';
import CommentsSection from './components/comments';


export default function Page({ params }: { params: Promise<{ slug: string }> }) {
    const resolvedParams = use(params);
    return (
        <div lang="ar" className="container mx-auto mt-20 px-4 py-8">
            <section className="my-6 flex flex-col items-start justify-start">
                <h2 lang="ar" className="mt-3 text-lg font-semibold text-gray-800 dark:text-gray-50">
                    تفاصيل المانجا
                </h2>
                <p lang="ar" className="text-sm text-gray-500 dark:text-gray-300">
                    استكشف تفاصيل هذه المانجا، بما في ذلك الفصول المتاحة والتقييمات والمعلومات الأساسية
                </p>
            </section>

            <MangaDetails
                slug={resolvedParams.slug}
            />
            <CommentsSection
                mangaId={resolvedParams.slug}
            />
        </div>
    );
}
