// components/blog/SwiperBlog.tsx
'use client';

import SkeletonLoaderImg from '@/components/loaders/SkeletonLoaderImg';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import React, { useState, useEffect, useCallback } from 'react';

interface Slide {
  id: number;
  photo_url: string;
  name: string;
  author: string;
  created_at: string;
  content: string;
}

const SwipperBlog: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);
  const [carouselData, setSwipperData] = useState<any[]>([]);

  const nextSlide = useCallback(
    () => setCurrentSlide((prev) => (prev + 1) % carouselData.length),
    [carouselData.length]
  );

  const prevSlide = useCallback(
    () =>
      setCurrentSlide(
        (prev) => (prev - 1 + carouselData.length) % carouselData.length
      ),
    [carouselData.length]
  );

  useEffect(() => {
    const fetchSwipperData = async () => {
      try {
        const response = await fetch('/api/products/');
        const data = await response.json();

        if (data.error) {
          console.error(data.error);
        } else {
          const swipperPosts = data.filter((item: any) => item.swipper);
          setSwipperData(swipperPosts);
        }
      } catch (error) {
        console.error('Error fetching swipper data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSwipperData();
  }, []);
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [carouselData.length, nextSlide]);

  if (loading) return <SkeletonLoaderImg />;
  return (
    <div className="relative overflow-hidden rounded-xl shadow-lg">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {carouselData.map((slide) => (
          <div key={slide.id} className="w-full flex-shrink-0">
            <div className="relative">
              <img
                src={`${slide.photo_url}`}
                alt={slide.name}
                className={`h-[400px] w-full object-cover`}
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <h2 className="mb-2 text-2xl font-bold text-white">
                  {slide.name}
                </h2>
                <p className="mb-1 text-gray-200">{slide.author}</p>
                <p className="text-sm text-gray-300">
                  {new Date(slide.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-colors hover:bg-white"
        aria-label="Previous slide"
      >
        <ArrowLeft className="text-gray-800" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow-lg transition-colors hover:bg-white"
        aria-label="Next slide"
      >
        <ArrowRight className="text-gray-800" />
      </button>
    </div>
  );
};

export default SwipperBlog;
