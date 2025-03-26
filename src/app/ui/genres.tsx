import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

interface GenreSwiperProps {
    genres: string[];
    selectedGenres: string[];
    onGenreSelect: (genre: string) => void;
}

const GenreSwiper = ({ genres, selectedGenres, onGenreSelect }: GenreSwiperProps) => {
    return (
        <div className="flex gap-2 overflow-x-auto py-2">
            {genres.map((genre) => (
                <button
                    key={genre}
                    onClick={() => onGenreSelect(genre)}
                    className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
                        selectedGenres.includes(genre)
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-muted-foreground'
                    }`}
                >
                    {genre}
                </button>
            ))}
        </div>
    );
};

export default GenreSwiper;