'use client';

import React, { useState, useEffect } from 'react';
import { Globe } from 'lucide-react';

interface CircularGalleryProps {
  images: string[];
}

const CircularGallery: React.FC<CircularGalleryProps> = ({ images }) => {
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <div className="inline-flex items-center bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-3">
            <Globe className="w-4 h-4 mr-2" /> 
            Explore Destinations
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Your Journey Awaits
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover breathtaking destinations from around the world
          </p>
        </div>

        {/* 3D Circular Gallery */}
        <div className="relative h-96 flex items-center justify-center perspective-1000">
          <div className="relative w-full h-full preserve-3d animate-spin-slow">
            {images.map((image, index) => {
              const angle = (360 / images.length) * index;
              const radius = 320;
              return (
                <div
                  key={index}
                  className="absolute top-1/2 left-1/2 w-48 h-48 -ml-24 -mt-24"
                  style={{
                    transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                    transformStyle: 'preserve-3d'
                  }}
                >
                  <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 hover:border-orange-400 transition-all duration-300 hover:scale-110">
                    <img 
                      src={image} 
                      alt={`Destination ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .animate-spin-slow {
          animation: rotate3d 30s linear infinite;
        }
        
        @keyframes rotate3d {
          from {
            transform: rotateY(0deg);
          }
          to {
            transform: rotateY(360deg);
          }
        }
      `}</style>
    </section>
  );
};

export default CircularGallery;