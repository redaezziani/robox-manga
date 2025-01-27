'use client';
import { useState, useEffect, useRef } from 'react';

import { ChevronLeft, ChevronRight, Images, Layout, Play, Pause } from 'lucide-react';
import { Keyboard, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { Button } from '@/components/ui/button';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Slider } from '../ui/slider';
import Image from 'next/image';
interface ImageViewerProps {
  images: string[];
}

export default function ImageViewer({ images }: ImageViewerProps) {
  const [viewMode, setViewMode] = useState<'vertical' | 'slider'>('vertical');
  const [autoScroll, setAutoScroll] = useState(false);
  const [scrollSpeed, setScrollSpeed] = useState(3000); // Default scroll speed
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const handleAutoScroll = () => {
    if (!scrollContainerRef.current || !autoScroll) return;

    const interval = setInterval(() => {
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollBy(0, 1); // Scroll vertically
      }
    }, 100 / (scrollSpeed / 10)); // Adjust speed: lower interval = faster scrolling

    return () => clearInterval(interval);
  };

  useEffect(() => {
    if (!autoScroll) return;

    const scrollHandler = handleAutoScroll();
    return scrollHandler;
  }, [autoScroll, scrollSpeed]);

  const handleTouchStart = () => setAutoScroll(false);
  const handleTouchEnd = () => setAutoScroll(true);

  const VerticalMode = () => (
    <div
      ref={scrollContainerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="flex flex-col items-center gap-4 overflow-auto"
      style={{ height: '80vh' }} // Set height for scrolling
    >
      {images.map((image, index) => (
        <div key={index} className="relative border-x border-border border-b w-full max-w-6xl">
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
        <div className="mx-auto mb-4 flex max-w-6xl justify-between items-center gap-2">
          <div
          className='flex gap-2'
          >
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
          {viewMode === 'vertical' && (
            <>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setAutoScroll(!autoScroll)}
              >
                {autoScroll ? <Pause className="size-4" /> : <Play className="size-4" />}
              </Button>
              <Slider
                defaultValue={[25]}
                max={100}
                step={10}
                className="[&>:last-child>span]:rounded w-32"
                aria-label="Slider with square thumb"
                onChange={(e) => setScrollSpeed(Number(e))}
              />
            </>
          )}
        </div>
      </div>
      {viewMode === 'vertical' ? <VerticalMode /> : <SliderMode />}
    </div>
  );
}
