'use client';
import Image from 'next/image';

import { format } from 'date-fns';
import { ar } from 'date-fns/locale';

import { Badge } from '@/components/ui/badge';

import ChaptersList from './chapters-list';

interface MangaDetailsProps {
  manga: {
    title: string;
    otherTitles: string[];
    description: string;
    cover: string;
    authors: string[];
    artists: string[];
    type: string;
    releaseDate: string;
    status: string;
    genres: string[];
    rating: number;
    id: string;
    slug: string;
  };
  chapters: {
    id: string;
    title: string;
    slug: string;
    number: number;
    releaseDate: string;
    mangaId: string;
  }[];
}

export default function MangaDetails({ manga, chapters }: MangaDetailsProps) {
  return (
    <div className="mt-4 flex w-full flex-col items-start justify-start gap-10 overflow-x-hidden   md:flex-row">
      <div className="relative aspect-[2/3] w-full max-w-60 overflow-hidden rounded-lg border border-gray-400/45">
        <Image src={manga.cover} alt={manga.title} fill className="object-cover" priority />
      </div>
      <div className="flex w-full flex-col gap-4">
        <div className=" space-y-4">
          <div>
            <h1 className="text-2xl font-bold">{manga.title}</h1>
            {manga.otherTitles.length > 0 && (
              <p className="text-muted-foreground text-sm">{manga.otherTitles[0]}</p>
            )}
          </div>

          <div className="flex flex-wrap gap-2 max-w-lg">
            {manga.genres.slice(1).map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>

         <section className="w-full grid grid-cols-2 md:grid-cols-1 gap-4 items-start justify-start content-start">
         <div className="space-y-2">
            <p className="text-muted-foreground text-sm">النوع: {manga.type}</p>
            <p className="text-muted-foreground text-sm">
              تاريخ الإصدار: {format(new Date(manga.releaseDate), 'PP', { locale: ar })}
            </p>
            <p className="text-muted-foreground text-sm">الحالة: {manga.status}</p>
            <p className="text-muted-foreground text-sm">التقييم: {manga.rating.toFixed(1)} / 5</p>
          </div>

          <div className="flex w-full justify-start -mt-1 items-start flex-col gap-2">
          {manga.authors.length > 0 && (
            <div>
              <h3 className="font-semibold">المؤلفون</h3>
              <p className="text-muted-foreground text-sm">{manga.authors.join('، ')}</p>
            </div>
          )}

          {manga.artists.length > 0 && (
            <div>
              <h3 className="font-semibold">الرسامون</h3>
              <p className="text-muted-foreground text-sm">{manga.artists.join('، ')}</p>
            </div>
          )}
         </div>
          </section>

          <div>
            <h3 className="font-semibold">القصة</h3>
            <p className="text-muted-foreground max-w-2xl text-sm">{manga.description}</p>
          </div>
        </div>
        {chapters.length > 0 && (
          <div className=" w-full space-y-4">
            <h2 className="text-xl font-bold">الفصول</h2>
            <ChaptersList mangaId={manga.slug} chapters={chapters} />
          </div>
        )}
        {chapters.length === 0 && (
          <div className="flex h-10 w-full items-center justify-start">
            <p className="text-muted-foreground text-lg">لا توجد فصول متاحة حاليًا</p>
          </div>
        )}
      </div>
    </div>
  );
}
