'use client';
import React, { useEffect, useState } from 'react';
import MainPageLayout from '@/components/shared-ui/layouts/main-page-layout';
import MangaList from '../ui/card-list';
import { usePopularMangaSWR, useLatestMangaSWR, useGenresSWR, useMangaByGenresFilterSWR, useKeepReadingSWR } from '../store/data';
import GenreSwiper from '../ui/genres';
import KeepReadingSlider from '../ui/keep-reading-slider';

const HomePage = () => {
    const { popularMangas, isLoading: popularLoading } = usePopularMangaSWR();
    const { latestMangas, isLoading: latestLoading } = useLatestMangaSWR();
    const { genres, isLoading: genresLoading } = useGenresSWR();
    console.log(genres);
    const { keepReading, isLoading: keepReadingLoading } = useKeepReadingSWR();

    const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
    const { mangasByGenre, meta, isLoading: genreMangaLoading } = useMangaByGenresFilterSWR(selectedGenres);

    const handleGenreSelect = (genre: string) => {
        setSelectedGenres(prev => {
            if (prev.includes(genre)) {
                return prev.filter(g => g !== genre);
            }
            return [...prev, genre];
        });
    };

    useEffect(() => {
        if (genres && genres.length > 0) {
            setSelectedGenres([genres[3]]);
        }
    }, [genres]);

    return (
        <MainPageLayout>
            <div className="container relative mx-auto  flex w-full flex-col gap-2 ">
                <div
                className=' h-96 relative w-full rounded mt-14 bg-muted '
                >
                    <svg className="absolute inset-0 size-full stroke-neutral-900/20 dark:stroke-neutral-100/20" fill="none"><defs><pattern id=":r2:" x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M-3 13 15-5M-5 5l18-18M-1 21 17 3"></path></pattern></defs><rect stroke="none" fill="url(#:r2:)" width="100%" height="100%"></rect></svg>
                </div>
                <section className="my-3 flex flex-col items-start justify-start">
                    <h3 lang="ar" className="mt-2 text-lg font-semibold text-gray-600">
                        عالمك المفضل للمانجا العربية
                    </h3>
                    <p lang="ar" className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-300">
                        انضم إلينا في رحلة استكشاف عالم المانجا الساحر. نقدم لك أفضل القصص المصورة بترجمة عربية
                        احترافية،
                    </p>
                </section>

            </div>

            <div className="flex w-full flex-col gap-y-2">
                {keepReading &&   (
                    <KeepReadingSlider
                        items={keepReading}
                        isLoading={keepReadingLoading}
                    />
                )}
                
                <MangaList
                    title="المانجا الشائعة"
                    mangas={popularMangas}
                    isLoading={popularLoading}
                />
                <MangaList
                    title="آخر الإضافات"
                    mangas={latestMangas}
                    isLoading={latestLoading}
                />
               <GenreSwiper 
                    genres={genres ?? []} 
                    selectedGenres={selectedGenres}
                    onGenreSelect={handleGenreSelect}
                />

                {selectedGenres.length > 0 && (
                    <MangaList
                        title={`مانجا ${selectedGenres.join(' و ')}`}
                        mangas={mangasByGenre}
                        isLoading={genreMangaLoading}
                        meta={meta}
                    />
                )}
            </div>
        </MainPageLayout>
    );
};

export default HomePage;
