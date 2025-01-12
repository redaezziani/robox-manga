'use client'
import Image from 'next/image'
import { format } from 'date-fns'
import { ar } from 'date-fns/locale'
import { Badge } from '@/components/ui/badge'
import ChaptersList from './chapters-list'

interface MangaDetailsProps {
    manga: {
        title: string
        otherTitles: string[]
        description: string
        cover: string
        authors: string[]
        artists: string[]
        type: string
        releaseDate: string
        status: string
        genres: string[]
        rating: number
    }
    chapters: {
        id: string
        title: string
        slug: string
        number: number
        releaseDate: string
        mangaId: string
    }[]
}

export default function MangaDetails({ manga, chapters }: MangaDetailsProps) {
    return (
        <div className="flex flex-col mt-4 md:flex-row overflow-x-hidden w-full justify-start items-start   gap-10">
            <div className="relative border border-gray-400/45 max-w-60 aspect-[2/3] w-full overflow-hidden rounded-lg">
                <Image
                    src={manga.cover}
                    alt={manga.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="flex w-full gap-4 flex-col">
                <div className=" space-y-4">
                    <div>
                        <h1 className="text-2xl font-bold">{manga.title}</h1>
                        {manga.otherTitles.length > 0 && (
                            <p className="text-sm text-muted-foreground">{manga.otherTitles[0]}</p>
                        )}
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {manga.genres.slice(1).map((genre) => (
                            <Badge key={genre} variant="secondary">
                                {genre}
                            </Badge>
                        ))}
                    </div>

                    <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">النوع: {manga.type}</p>
                        <p className="text-sm text-muted-foreground">
                            تاريخ الإصدار: {format(new Date(manga.releaseDate), 'PP', { locale: ar })}
                        </p>
                        <p className="text-sm text-muted-foreground">الحالة: {manga.status}</p>
                        <p className="text-sm text-muted-foreground">
                            التقييم: {manga.rating.toFixed(1)} / 5
                        </p>
                    </div>

                    {manga.authors.length > 0 && (
                        <div>
                            <h3 className="font-semibold">المؤلفون</h3>
                            <p className="text-sm text-muted-foreground">
                                {manga.authors.join('، ')}
                            </p>
                        </div>
                    )}

                    {manga.artists.length > 0 && (
                        <div>
                            <h3 className="font-semibold">الرسامون</h3>
                            <p className="text-sm text-muted-foreground">
                                {manga.artists.join('، ')}
                            </p>
                        </div>
                    )}

                    <div>
                        <h3 className="font-semibold">القصة</h3>
                        <p className="text-sm max-w-2xl text-muted-foreground">{manga.description}</p>
                    </div>
                </div>
               {chapters.length > 0 && ( <div className=" space-y-4 w-full">
                    <h2 className="text-xl font-bold">الفصول</h2>
                    <ChaptersList chapters={chapters} />
                </div>
                )}
                {chapters.length === 0 && (
                    <div className="flex items-center h-10 justify-start w-full">
                        <p className="text-lg text-muted-foreground">لا توجد فصول متاحة حاليًا</p>
                    </div>
                )}

            </div>


        </div>

    )
}
