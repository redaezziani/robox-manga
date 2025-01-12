'use client'
import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, Keyboard } from 'swiper/modules'
import { Button } from '@/components/ui/button'
import { Layout, Images, ChevronRight, ChevronLeft } from 'lucide-react'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface ImageViewerProps {
    images: string[]
}

export default function ImageViewer({ images }: ImageViewerProps) {
    const [viewMode, setViewMode] = useState<'vertical' | 'slider'>('vertical')

    const VerticalMode = () => (
        <div className="flex flex-col items-center gap-4">
            {images.map((image, index) => (
                <div key={index} className="relative w-full max-w-3xl">
                    <img
                        src={image}
                        alt={`Page ${index + 1}`}
                        loading={index < 3 ? "eager" : "lazy"}
                        className="w-full h-auto"
                    />
                </div>
            ))}
        </div>
    )

    const SliderMode = () => (
        <div className="w-full max-w-3xl mx-auto relative group">
            <div className="absolute -top-12 flex justify-between w-full">
                <button 
                    className="z-10 bg-background/80 hover:bg-background/90 p-2 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 swiper-button-next"
                >
                    <ChevronLeft className="h-6 w-6" />
                </button>
                <button 
                    className="z-10 bg-background/80 hover:bg-background/90 p-2 rounded-lg transition-all duration-300 opacity-0 group-hover:opacity-100 swiper-button-prev"
                >
                    <ChevronRight className="h-6 w-6" />
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
                    `
                }}
                keyboard={{ 
                    enabled: true,
                    onlyInViewport: true
                }}
                dir="rtl"
                className="w-full rounded-lg"
            >
                {[...images].map((image, index) => (
                    <SwiperSlide key={index}>
                        <div className="relative w-full aspect-[3/4] flex items-center justify-center">
                            <img
                                src={image}
                                alt={`Page ${images.length - index}`}
                                className="w-full h-full object-contain"
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )

    return (
        <div className="w-full">
            <div className="sticky top-0 z-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2">
                <div className="flex justify-end gap-2 mb-4 max-w-3xl mx-auto">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setViewMode('vertical')}
                        className={viewMode === 'vertical' ? 'bg-primary text-primary-foreground' : ''}
                    >
                        <Layout className="h-4 w-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setViewMode('slider')}
                        className={viewMode === 'slider' ? 'bg-primary text-primary-foreground' : ''}
                    >
                        <Images className="h-4 w-4" />
                    </Button>
                </div>
            </div>
            {viewMode === 'vertical' ? <VerticalMode /> : <SliderMode />}
        </div>
    )
}
