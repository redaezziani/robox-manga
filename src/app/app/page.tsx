'use client';
import React, { useEffect, useState } from 'react';
import MainPageLayout from '@/components/shared-ui/layouts/main-page-layout';
import MangaList from '../ui/card-list';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { usePopularMangaSWR, useLatestMangaSWR, useGenresSWR, useMangaByGenreSWR } from '../store/data';

const HomePage = () => {
    const { popularMangas, isLoading: popularLoading } = usePopularMangaSWR();
    const { latestMangas, isLoading: latestLoading } = useLatestMangaSWR();
    const { genres, isLoading: genresLoading } = useGenresSWR();
    const [selectedGenre, setSelectedGenre] = useState('');

    const { mangasByGenre, isLoading: genreMangaLoading } = useMangaByGenreSWR(selectedGenre);


    useEffect(() => {
        if (genres && genres.length > 0 && !selectedGenre) {
            setSelectedGenre(genres[0]);
        }
    }, [genres]);

    return (
        <MainPageLayout>
            <div className="container relative mx-auto mt-10 flex w-full flex-col gap-2 px-4">
                <section className="my-6 flex flex-col items-start justify-start">
                    <h3 lang="ar" className="mt-2 text-lg font-semibold text-gray-600">
                        عالمك المفضل للمانجا العربية
                    </h3>
                    <p lang="ar" className="mt-2 text-sm leading-relaxed text-gray-500 dark:text-gray-300">
                        انضم إلينا في رحلة استكشاف عالم المانجا الساحر. نقدم لك أفضل القصص المصورة بترجمة عربية
                        احترافية،
                    </p>
                </section>

            </div>

            <div className="flex w-full flex-col gap-y-4">
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
                <div className="container mx-auto px-4">
                    <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                        <SelectTrigger className="w-[280px]">
                            <SelectValue placeholder="اختر نوع المانجا" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                {genres?.map((genre) => (
                                    <SelectItem key={genre} value={genre}>
                                        {genre}
                                    </SelectItem>
                                ))}
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>

                {selectedGenre && mangasByGenre.length > 0 && (
                    <MangaList
                        title={`مانجا ${selectedGenre}`}
                        mangas={mangasByGenre}
                        isLoading={genreMangaLoading}
                    />
                )}
            </div>
        </MainPageLayout>
    );
};

export default HomePage;
