'use client'
import React, { useEffect } from 'react'
import MainPageLayout from '@/components/shared-ui/layouts/main-page-layout'
import MangaList from './ui/card-list'
import useMangaStore from '@/zustand/data/store'

const HomePage = () => {
    const { 
        popularMangas, 
        latestMangas, 
        loadingStates,
        fetchPopularMangas, 
        fetchLatestMangas 
    } = useMangaStore()

    useEffect(() => {
        fetchPopularMangas()
        fetchLatestMangas()
    }, [fetchPopularMangas, fetchLatestMangas])

    return (
        <MainPageLayout>
            <div className="flex container mx-auto mt-10 flex-col gap-2 relative px-4 w-full">
                <section className="flex mt-6 mb-6 flex-col items-start justify-start">
                    
                    <h3
                        lang="ar"
                        className="text-lg mt-2 font-semibold text-gray-600">
                        عالمك المفضل للمانجا العربية
                    </h3>
                    <p
                        lang="ar"
                        className="text-sm mt-2 text-gray-500 dark:text-gray-300 leading-relaxed">
                        انضم إلينا في رحلة استكشاف عالم المانجا الساحر. نقدم لك أفضل القصص المصورة بترجمة عربية احترافية، 
                         
                    </p>
                </section>
            </div>

            <div className="flex flex-col w-full gap-y-4">
                <MangaList
                    title="المانجا الشائعة"
                    mangas={popularMangas}
                    isLoading={loadingStates.popularMangas}
                />
                <MangaList
                    title="آخر الإضافات"
                    mangas={latestMangas}
                    isLoading={loadingStates.latestMangas}
                />
            </div>
        </MainPageLayout>
    )
}

export default HomePage
