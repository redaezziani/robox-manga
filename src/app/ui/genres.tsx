import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';

const GenreSwiper = ({ genres }) => {
  return (
    <div className="container mx-auto px-4">
      <Swiper
        slidesPerView="auto"
        spaceBetween={12}
        className="w-full"
      >
        {genres?.map((genre) => (
          <SwiperSlide 
            key={genre}
            className="!w-auto"
          >
            <span
              className="inline-block px-2 rounded-full border border-gray-400/45 p-0.5 text-xs text-gray-500"
              value={genre}
            >
              {genre}
            </span>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default GenreSwiper;