// MangaList.tsx
'use client'
import React from 'react'
import MangaCard from './card'
import SkeletonCard from './skeleton-card'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, A11y } from 'swiper/modules'
import { ChevronLeft, ChevronRight, Loader2 } from 'lucide-react'
import { Manga } from '@/types/manga'
import Link from 'next/link'

interface MangaListProps {
    title?: string
    mangas: Manga[]
    isLoading: boolean
    skeletonCount?: number
}

const MangaList = ({ title, mangas, isLoading, skeletonCount = 7 }: MangaListProps) => {
    const renderContent = () => {
        if (isLoading) {
            return Array(skeletonCount).fill(0).map((_, index) => (
                <SwiperSlide key={`skeleton-${index}`}>
                    <SkeletonCard />
                </SwiperSlide>
            ))
        }

        return mangas?.map((manga) => (
            <SwiperSlide key={manga.id}>
                <MangaCard data={manga} />
            </SwiperSlide>
        ))
    }

    return (
        <div lang='ar' className="container flex-col space-y-1 relative mx-auto px-4">
            {title && (
                <h3 className="text-xl text-gray-700 font-bold">
                    {title}
                </h3>
            )}
            <div className="w-full flex pb-4 justify-between items-end">
                <Link
                    href={'/all'}
                    lang='ar'
                    className='text-sm text-gray-500'
                >عرض الكل
                </Link>
                <div className="flex gap-4">
                    <button className="prev-button rounded-full bg-white border-gray-400/45 border p-2 text-gray-700">
                        <ChevronRight size={18} />
                    </button>
                    <button className="next-button rounded-full bg-white border-gray-400/45 border p-2 text-gray-700">
                        <ChevronLeft size={18} />
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Navigation, Pagination, A11y]}
                spaceBetween={20}
                navigation={{
                    prevEl: '.prev-button',
                    nextEl: '.next-button',
                }}
                pagination={false}
                breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 10 },
                    480: { slidesPerView: 2, spaceBetween: 15 },
                    768: { slidesPerView: 2, spaceBetween: 15 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    1280: { slidesPerView: 7, spaceBetween: 20 }
                }}
                className="py-8"
            >
                {renderContent()}
            </Swiper>
        </div>
    )
}

export default MangaList