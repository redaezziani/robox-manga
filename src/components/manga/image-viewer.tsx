'use client';
import { useState } from 'react';

import { ChevronLeft, ChevronRight, Images, Layout } from 'lucide-react';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/components/ui/button';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface ImageViewerProps {
  images: string[];
}

export default function ImageViewer({ images }: ImageViewerProps) {
  const [viewMode, setViewMode] = useState<'vertical' | 'slider'>('vertical');

  const VerticalMode = () => (
    <div className="flex flex-col items-center gap-4">
      {images.map((image, index) => (
        <div key={index} className="relative w-full max-w-3xl">
          <img
            src={image}
            alt={`Page ${index + 1}`}
            loading={index < 3 ? 'eager' : 'lazy'}
            className="h-auto w-full"
          />
        </div>
      ))}
    </div>
  );

  const SliderMode = () => (
    <div className="group relative mx-auto w-full max-w-3xl">
      <div className="absolute -top-12 flex w-full justify-between">
        <button className="bg-background/80 hover:bg-background/90 swiper-button-next z-10 rounded-lg p-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ChevronLeft className="size-6" />
        </button>
        <button className="bg-background/80 hover:bg-background/90 swiper-button-prev z-10 rounded-lg p-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <ChevronRight className="size-6" />
        </button>
      </div>
      <Swiper
        modules={[Navigation, Pagination, Keyboard]}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        pagination={{
          type: 'fraction',
          renderFraction: (currentClass, totalClass) => `
                        <div class="bg-background/80 px-4 py-2 rounded-lg">
                            <span class="${currentClass}"></span>
                            <span> / </span>
                            <span class="${totalClass}"></span>
                        </div>
                    `,
        }}
        keyboard={{
          enabled: true,
          onlyInViewport: true,
        }}
        dir="rtl"
        className="w-full rounded-lg"
      >
        {[...images].map((image, index) => (
          <SwiperSlide key={index}>
            <div className="relative flex aspect-[3/4] w-full items-center justify-center">
              <img
                src={image}
                alt={`Page ${images.length - index}`}
                className="size-full object-contain"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );

  return (
    <div className="w-full">
      <div className="bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-20 py-2 backdrop-blur">
        <div className="mx-auto mb-4 flex max-w-3xl justify-end gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('vertical')}
            className={viewMode === 'vertical' ? 'bg-primary text-primary-foreground' : ''}
          >
            <Layout className="size-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setViewMode('slider')}
            className={viewMode === 'slider' ? 'bg-primary text-primary-foreground' : ''}
          >
            <Images className="size-4" />
          </Button>
        </div>
      </div>
      {viewMode === 'vertical' ? <VerticalMode /> : <SliderMode />}
    </div>
  );
}
