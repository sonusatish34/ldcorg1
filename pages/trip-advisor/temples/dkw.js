'use client';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const images = [
  '/temples/1.jpg',
  '/temples/2.jpg',
  '/temples/3.jpg',
  '/temples/4.jpg',
  '/temples/5.jpg',
];

export default function ImageSwiper() {
  return (
    <div className="w-80 pl-4">
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={10}
        slidesPerView="1"
        style={{ padding: '10px 0' }}
      >
        {images.map((src, index) => (
          <SwiperSlide
            key={index}
            style={{
              width: '300px', // fixed width
              flexShrink: 0,
            }}
            className="rounded overflow-hidden shadow"
          >
            <img src={src} alt={`Slide ${index}`} className="w-80 object-cover h-96" />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
