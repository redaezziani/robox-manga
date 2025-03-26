import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles

interface GenreSwiperProps {
    genres: string[];
    selectedGenres: string[];
    onGenreSelect: (genre: string) => void;
}

const GenreSwiper = ({ genres, selectedGenres, onGenreSelect }: GenreSwiperProps) => {
    return (
        <Swiper
            slidesPerView="auto"
            spaceBetween={8}
            className="w-full py-2"
        >
            {genres.slice(2).map(genre => (
                <SwiperSlide key={genre} className="!w-auto">
                    <button
                        onClick={() => onGenreSelect(genre)}
                        className={`whitespace-nowrap rounded-full px-4 py-1 text-sm ${
                            selectedGenres.includes(genre)
                                ? 'bg-primary/80 text-primary-foreground'
                                : 'bg-muted text-muted-foreground'
                        }`}
                    >
                        {genre}
                    </button>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default GenreSwiper;