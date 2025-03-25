'use client';
import React from 'react';
import KeepReadingCard from './keep-reading-card';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';

interface KeepReadingSliderProps {
    items: Array<{
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
    }>;
    isLoading: boolean;
}

const KeepReadingSlider = ({ items, isLoading }: KeepReadingSliderProps) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="container mx-auto px-4">
            <h2 lang="ar" className="mb-2 text-xl font-bold">متابعة القراءة</h2>
            <Swiper
                modules={[Navigation]}
                navigation
                spaceBetween={16}
                slidesPerView={2}
                breakpoints={{
                    320: { slidesPerView: 2, spaceBetween: 10 },
                    480: { slidesPerView: 2, spaceBetween: 15 },
                    768: { slidesPerView: 2, spaceBetween: 15 },
                    1024: { slidesPerView: 3, spaceBetween: 20 },
                    1280: { slidesPerView: 9, spaceBetween: 20 },
                  }}
                className="px-8"
            >
                {items.map((item) => (
                    <SwiperSlide key={`${item.manga.id}-${item.chapter.id}`}>
                        <KeepReadingCard data={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default KeepReadingSlider;
