'use client';
import React from 'react';
import Image from "next/legacy/image";
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import Skeleton from './skelton-card';
import Link from 'next/link';

interface KeepReadingCardProps {
    data: {
        manga: {
            id: string;
            title: string;
            cover: string;
            slug: string;
            type: string;
            status: string;
            coverThumbnail: string;
        };
        chapter: {
            id: string;
            number: number;
            name: string;
        };
        page: number;
        updatedAt: string;
    };
}

const KeepReadingCard = ({ data }: KeepReadingCardProps) => {
    return (
        <Link
            prefetch={true}
            href={`/app/manga/${data.manga.id}/chapter/${data.chapter.id}?page=${data.page}`}
            className="block"
        >
            <Card className="group overflow-hidden bg-transparent dark:bg-transparent border-none shadow-none">
                <div className="relative aspect-[10/14] w-full overflow-hidden rounded-lg">
                    <Skeleton />
                    <Image
                        src={data.manga.coverThumbnail}
                        alt={data.manga.title}
                        style={{ objectFit: "cover" }}
                        loading='lazy'
                        priority={false}
                        placeholder='blur'
                        blurDataURL={data.manga.coverThumbnail}
                        quality={100}
                        layout="fill"
                    />
                    <div className="absolute right-2 top-2">
                        <span lang="ar" className="rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                            {data.manga.type}
                        </span>
                    </div>
                </div>
                <CardHeader className="p-3">
                    <h3 lang="ar" className="line-clamp-1 text-lg font-bold">
                        {data.manga.title}
                    </h3>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <p lang="ar" className="text-sm text-primary">
                        الفصل {data.chapter.number}
                    </p>
                    <p lang="ar" className="text-xs text-gray-500">
                        الصفحة {data.page}
                    </p>
                </CardContent>
                <CardFooter lang="ar" className="flex items-center justify-between p-3">
                    <span className="text-xs text-gray-500">
                        {new Date(data.updatedAt).toLocaleDateString('ar-EG')}
                    </span>
                    <span className="text-xs text-gray-500">{data.manga.status}</span>
                </CardFooter>
            </Card>
        </Link>
    );
};

export default KeepReadingCard;
