'use client';

import Image from 'next/image';
import { format } from 'date-fns';
import { ar } from 'date-fns/locale';
import { Badge } from '@/components/ui/badge';
import {
  Eye,
  BookOpen,
  Calendar,
  Activity,
  Star,
  Users,
  Paintbrush,
  ScrollText,
  Layers
} from 'lucide-react';
import ChaptersList from './chapters-list';
import { useMangaDetailsSWR } from '../store/data';
import MangaDetailsSkeleton from './MangaSkeleton';

interface MangaDetailsProps {
  slug: string;
}

export default function MangaDetails({ slug }: MangaDetailsProps) {
  const { manga, isLoading, error } = useMangaDetailsSWR(slug);

  if (isLoading) {
    return <MangaDetailsSkeleton />;
  }

  if (error || !manga) {
    return <div>Error loading manga details. Please try again later.</div>;
  }

  return (
    <div className="mt-4 flex w-full flex-col items-start justify-start gap-10 overflow-x-hidden md:flex-row">
      <div className="relative aspect-[2/3] w-full max-w-60 overflow-hidden rounded-lg border border-gray-400/45">
        <Image
          placeholder='blur'
          blurDataURL={manga.coverThumbnail}
          src={manga.cover}
          alt={manga.title}
          fill
          className="object-cover"
          priority
        />
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
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Eye className="w-4 h-4" /> المشاهدات: {manga.views}
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> النوع: {manga.type}
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Calendar className="w-4 h-4" /> تاريخ الإصدار: {format(new Date(manga.releaseDate), 'PP', { locale: ar })}
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Activity className="w-4 h-4" /> الحالة: {manga.status}
            </p>
            <p className="text-muted-foreground text-sm flex items-center gap-2">
              <Star className="w-4 h-4" /> التقييم: {manga.rating.toFixed(1)} / 5
            </p>
          </div>

          <div className="flex w-full justify-start -mt-1 items-start flex-col gap-2">
          {manga.authors.length > 0 && (
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" /> المؤلفون
              </h3>
              <p className="text-muted-foreground text-sm">{manga.authors.join('، ')}</p>
            </div>
          )}

          {manga.artists.length > 0 && (
            <div>
              <h3 className="font-semibold flex items-center gap-2">
                <Paintbrush className="w-4 h-4" /> الرسامون
              </h3>
              <p className="text-muted-foreground text-sm">{manga.artists.join('، ')}</p>
            </div>
          )}
         </div>
          </section>

          <div>
            <h3 className="font-semibold flex items-center gap-2">
              <ScrollText className="w-4 h-4" /> القصة
            </h3>
            <p className="text-muted-foreground max-w-2xl text-sm">{manga.description}</p>
          </div>
        </div>
        {manga.chapters.length > 0 && (
          <div className="w-full space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Layers className="w-5 h-5" /> الفصول
            </h2>
            <ChaptersList mangaId={manga.slug} chapters={manga.chapters} />
          </div>
        )}
        {manga.chapters.length === 0 && (
          <div className="flex h-10 w-full items-center justify-start">
            <p className="text-muted-foreground text-lg">لا توجد فصول متاحة حاليًا</p>
          </div>
        )}
      </div>
    </div>
  );
}
