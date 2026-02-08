'use client';
import React from 'react';
import HeroSection from './AUHeroSection';
import Introduction from './AUIntro';
import ServicesSection from './AUServices';
import GallerySection from './GallerySelection';
import ValuesSection from './ValuesSelection';
import InfiniteGallery from './InfiniteGallery';
import ManualScrollGallery from './ManualScrollGallery';
import { infiniteImages } from './images';


export default function AboutUsPage() {
  
  return (
    <div className="min-h-screen bg-gray-50 overflow-hidden">
      <HeroSection />
      <Introduction />
      <ServicesSection />
      <GallerySection />
      <ValuesSection />
      <InfiniteGallery images={infiniteImages} />
<ManualScrollGallery/>
      
      {/* Add Custom Styles */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }

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
    </div>
  );
}