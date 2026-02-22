import React, { useEffect, useRef } from 'react';
import Image from 'next/image';

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let scrollInterval: NodeJS.Timeout;

    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (carousel.scrollLeft + carousel.clientWidth >= carousel.scrollWidth) {
          carousel.scrollLeft = 0; // Reset to start if end is reached
        } else {
          carousel.scrollLeft += carousel.clientWidth; // Scroll one image width
        }
      }, 3000); // Scroll every 3 seconds
    };

    const stopScrolling = () => {
      clearInterval(scrollInterval);
    };

    startScrolling();

    carousel.addEventListener('mouseenter', stopScrolling);
    carousel.addEventListener('mouseleave', startScrolling);

    return () => {
      stopScrolling();
      carousel.removeEventListener('mouseenter', stopScrolling);
      carousel.removeEventListener('mouseleave', startScrolling);
    };
  }, [images]);

  return (
    <section className="py-12 bg-gray-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-center bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent mb-12">
          Our Amazing Prizes
        </h2>
        <div
          ref={carouselRef}
          className="flex overflow-x-auto snap-x snap-mandatory hide-scrollbar rounded-xl shadow-lg border border-gray-700"
        >
          {images.map((src, index) => (
            <div key={index} className="flex-shrink-0 w-full snap-center relative aspect-video">
              <Image
                src={src}
                alt={`Prize ${index + 1}`}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-2xl font-bold">Prize {index + 1}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ImageCarousel;
