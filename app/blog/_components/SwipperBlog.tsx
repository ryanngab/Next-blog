// components/blog/SwiperBlog.tsx
"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import React, { useState, useEffect } from "react";

interface Slide {
  id: number;
  image: string;
  title: string;
  author: string;
  date: string;
  content: string;
}

interface SwiperBlogProps {
  carouselData: Slide[];
}

const SwipperBlog: React.FC<SwiperBlogProps> = ({ carouselData }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);

  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [carouselData.length]);

  return (
    <div className="relative overflow-hidden shadow-lg rounded-xl">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carouselData.map((slide) => (
          <div key={slide.id} className="flex-shrink-0 w-full">
            <div className="relative">
             <img
                    src={`https://${slide.image}`}
                    alt={slide.title}
                    className="w-full h-[400px] object-cover"
                    loading="lazy"
                  />
             <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                    <h2 className="mb-2 text-2xl font-bold text-white">{slide.title}</h2>
                    <p className="mb-1 text-gray-200">{slide.author}</p>
                    <p className="text-sm text-gray-300">{slide.date}</p>
                  </div>
                  </div>
          </div>
        ))}
      </div>
      <button
            onClick={prevSlide}
            className="absolute p-2 transition-colors -translate-y-1/2 rounded-full shadow-lg left-4 top-1/2 bg-white/80 hover:bg-white"
            aria-label="Previous slide"
          >
            <ArrowLeft className="text-gray-800" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute p-2 transition-colors -translate-y-1/2 rounded-full shadow-lg right-4 top-1/2 bg-white/80 hover:bg-white"
            aria-label="Next slide"
          >
            <ArrowRight className="text-gray-800" />
          </button>
    </div>
  );
};

export default SwipperBlog;
