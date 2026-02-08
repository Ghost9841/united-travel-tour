'use client';
import React, { useRef, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { destinationImages } from './images';

interface InfiniteGalleryProps {
  images: string[];
}

const InfiniteGallery: React.FC<InfiniteGalleryProps> = ({ images }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const infiniteMenuRef = useRef<HTMLDivElement>(null);
  



  // Infinite scrolling for destination gallery
  useEffect(() => {
    const gallery = galleryRef.current;
    if (!gallery) return;

    let scrollAmount = 0;
    const scrollSpeed = 1;
    
    const scrollGallery = () => {
      if (gallery) {
        scrollAmount += scrollSpeed;
        if (scrollAmount >= gallery.scrollWidth / 2) {
          scrollAmount = 0;
        }
        gallery.style.transform = `translateX(-${scrollAmount}px)`;
      }
    };

    const interval = setInterval(scrollGallery, 30);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-medium mb-3">
          <Star className="w-4 h-4 mr-2" /> 
          Popular Destinations
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
          Explore Our Featured Locations
        </h2>
      </div>

      {/* Auto-Scroll Gallery */}
      <div className="relative h-64 overflow-hidden rounded-3xl mb-8">
        <div 
          ref={galleryRef}
          className="flex absolute left-0"
          style={{ width: '200%' }}
        >
          {[...destinationImages, ...destinationImages].map((img, index) => (
            <div
              key={index}
              className="w-80 h-64 mx-2 relative group overflow-hidden rounded-2xl flex-shrink-0"
            >
              <img
                src={img}
                alt={`Destination ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white font-bold">Explore Destination</span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
      </div>

     
    </section>
  );
};

export default InfiniteGallery;