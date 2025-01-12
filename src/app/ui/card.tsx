'use client'
import React from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import { propertyTypeToArabic, currencyToArabic } from '@/lib/constants'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Link from 'next/link'
import { motion } from "framer-motion";
import Skeleton from './skelton-card'





interface MangaCardProps {
    data: {
        id: string
        slug: string
        title: string
        cover: string
        status: string
        type: string
        genres: string[]
        description: string
        otherTitles: string[]
    }
}

const MangaCard = ({ data }: MangaCardProps) => {
    return (
        <Link href={`/manga/${data.slug}`} className="block">
            <Card className="group overflow-hidden shadow-none transition-all border-none duration-300 ">
                <div className="relative rounded-lg aspect-[10/14] w-full overflow-hidden">
                    <Skeleton
                    />

                    <Image
                        fill
                        sizes='(min-width: 640px) 640px, 100vw'
                        priority
                        src={data.cover}
                        alt={data.title}
                        className="object-cover transition-all duration-300 "
                    />
                    <div className="absolute top-2 right-2">
                        <span lang="ar" className="rounded-md bg-black/60 px-2 py-1 text-xs text-white">
                            {data.type}
                        </span>
                    </div>
                </div>
                <CardHeader className="p-3">
                    <h3 lang={/[\u0600-\u06FF]/.test(data.otherTitles.length > 0 && data.otherTitles[0] != "-" ? data.otherTitles[0] : data.title) ? "ar" : "en"} className="line-clamp-1 text-lg font-bold">
                        {data.otherTitles.length > 0 && data.otherTitles[0] != "-" ? data.otherTitles[0] : data.title}
                    </h3>
                </CardHeader>
                <CardContent className="p-3 pt-0">
                    <p lang="ar" className="line-clamp-2 text-sm text-gray-600">
                        {data.description}
                    </p>
                </CardContent>
                <CardFooter lang="ar" className="flex items-center justify-between p-3">
                    <div className="flex flex-wrap gap-1">
                        {data.genres.slice(1, 2).map((genre) => (
                            <span
                                key={genre}
                                className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600"
                            >
                                {genre}
                            </span>
                        ))}
                    </div>
                    <span className="text-xs text-gray-500">{data.status}</span>
                </CardFooter>
            </Card>
        </Link>
    )
}

export default MangaCard