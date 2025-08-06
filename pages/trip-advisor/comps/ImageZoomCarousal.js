'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function ImageGallery({ images }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const openLightbox = (index) => {
        setCurrentIndex(index);
        setLightboxOpen(true);
    };

    const closeLightbox = () => setLightboxOpen(false);
    const showPrev = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    const showNext = () => setCurrentIndex((prev) => (prev + 1) % images.length);

    if (!images || images.length === 0) return null;

    return (
        <>
            {/* ✅ MOBILE VIEW - SWIPER CAROUSEL */}
            {/* MOBILE VIEW - SWIPER CAROUSEL */}
            <div className="lg:hidden relative">
                <Swiper
                    modules={[Navigation, Pagination]}
                    slidesPerView={1}
                    spaceBetween={10}
                    pagination={{ clickable: true }}
                    navigation={{
                        prevEl: '.custom-swiper-prev',
                        nextEl: '.custom-swiper-next',
                    }}
                    onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
                    loop={true}
                >
                    {images.map((src, index) => (
                        <SwiperSlide key={index}>
                            <div
                                onClick={() => openLightbox(index)}
                                className="w-full cursor-pointer relative overflow-hidden"
                            >
                                <Image
                                    src={src}
                                    alt={`Image ${index + 1}`}
                                    className="w-full h-72 object-cover"
                                    width={500}
                                    height={500}
                                />
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <button
                    className="custom-swiper-prev absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white p-2 rounded-full focus:outline-none"
                    aria-label="Previous slide"
                >
                    <ChevronLeft />
                </button>
                <button
                    className="custom-swiper-next absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-black/40 text-white p-2 rounded-full focus:outline-none"
                    aria-label="Next slide"
                >
                    <ChevronRight />
                </button>

                <style jsx>{`
    /* Hide default swiper navigation buttons */
    :global(.swiper-button-prev),
    :global(.swiper-button-next) {
      display: none;
    }

    /* Remove blue focus outline */
    .custom-swiper-prev:focus,
    .custom-swiper-next:focus {
      outline: none;
      box-shadow: none;
    }
  `}</style>
            </div>


            {/* ✅ DESKTOP VIEW - IMAGE GRID */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                {/* First large image */}
                <div
                    className="md:col-span-2 h-72 md:h-[500px] relative cursor-pointer"
                    onClick={() => openLightbox(0)}
                >
                    <img
                        src={images[0]}
                        alt="Main"
                        className="w-full h-full object-cover rounded-lg"
                    />
                </div>

                {/* Next 2 images */}
                <div className="flex flex-col gap-4">
                    {images.slice(1, 3).map((src, index) => (
                        <div
                            key={index + 1}
                            className="h-36 md:h-[245px] relative cursor-pointer"
                            onClick={() => openLightbox(index + 1)}
                        >
                            <img
                                src={src}
                                alt={`Thumbnail ${index + 1}`}
                                className="w-full h-full object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>

            {/* ✅ Remaining images (desktop only) */}
            {images.length > 3 && (
                <div className="hidden md:grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4 w-full">
                    {images.slice(3).map((src, index) => (
                        <img
                            key={index + 3}
                            src={src}
                            alt={`Image ${index + 3}`}
                            onClick={() => openLightbox(index + 3)}
                            className="w-full h-60 object-cover rounded cursor-pointer"
                        />
                    ))}
                </div>
            )}

            {/* ✅ LIGHTBOX FULLSCREEN */}
            {lightboxOpen && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
                    <button
                        onClick={closeLightbox}
                        className="absolute top-4 right-4 bg-white/20 hover:bg-white/40 p-2 rounded-full"
                    >
                        <X className="text-white w-6 h-6" />
                    </button>

                    <button
                        onClick={showPrev}
                        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 p-2 rounded-full"
                    >
                        <ChevronLeft className="text-white w-6 h-6" />
                    </button>

                    <Image
                        src={images[currentIndex]}
                        alt={`Image ${currentIndex + 1}`}
                        width={1200}
                        height={800}
                        className="max-w-full max-h-full object-contain rounded"
                    />

                    <button
                        onClick={showNext}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40  p-2 rounded-full"
                    >
                        <ChevronRight className="text-white w-6 h-6" />
                    </button>
                </div>
            )}
        </>
    );
}
