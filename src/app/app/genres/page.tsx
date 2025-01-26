'use client';
import React, { useState } from 'react';
import { GenreSelect } from './components/genre-select';
import { useMangaByGenreSWR } from './store/data';
import MangaList from '@/app/ui/card-list';
import MainPageLayout from '@/components/shared-ui/layouts/main-page-layout';

export default function GenresPage() {
  const [selectedGenre, setSelectedGenre] = useState('');
  const { mangas, isLoading } = useMangaByGenreSWR(selectedGenre);

  return (
    <MainPageLayout>
      <div className="container mx-auto px-4 py-8">
        <section className="mb-8">
          <h1 className="mb-4 text-2xl font-bold">تصفح حسب النوع</h1>
          <GenreSelect
            selectedGenre={selectedGenre}
            onGenreChange={setSelectedGenre}
          />
        </section>

        <MangaList
          title={selectedGenre ? `مانجا ${selectedGenre}` : 'اختر نوعاً'}
          mangas={mangas}
          isLoading={isLoading}
        />
      </div>
    </MainPageLayout>
  );
}
