import React, { useRef, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface InfiniteGalleryProps {
  images: string[];
}

const InfiniteGallery: React.FC<InfiniteGalleryProps> = ({ images }) => {
  const galleryRef = useRef<HTMLDivElement>(null);
  const infiniteMenuRef = useRef<HTMLDivElement>(null);
  
  const destinationImages = [
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
  ];


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

      {/* Manual Scroll Gallery */}
      <div className="relative max-w-7xl mx-auto px-6">
        <div 
          ref={infiniteMenuRef}
          className="flex gap-4 overflow-x-auto py-4 scrollbar-hide"
          style={{ scrollSnapType: 'x mandatory' }}
        >
          {images.map((img, index) => (
            <div
              key={index}
              className="relative flex-shrink-0 w-80 h-56 rounded-2xl overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-4 border-gray-100"
              style={{ scrollSnapAlign: 'start' }}
            >
              <img
                src={img}
                alt={`Gallery ${index + 1}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <div className="flex items-center gap-2 mb-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </div>
                  <span className="font-bold">Featured Destination</span>
                </div>
              </div>
              
              {/* Floating Badge */}
              <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                Hot Deal
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Arrows */}
        <button 
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 z-20"
          onClick={() => {
            if (infiniteMenuRef.current) {
              infiniteMenuRef.current.scrollBy({ left: -300, behavior: 'smooth' });
            }
          }}
        >
          <ChevronLeft className="w-5 h-5 text-gray-900" />
        </button>
        <button 
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300 z-20"
          onClick={() => {
            if (infiniteMenuRef.current) {
              infiniteMenuRef.current.scrollBy({ left: 300, behavior: 'smooth' });
            }
          }}
        >
          <ChevronRight className="w-5 h-5 text-gray-900" />
        </button>
      </div>
    </section>
  );
};

export default InfiniteGallery;