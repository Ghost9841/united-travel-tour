import React, { useRef, useState, useEffect } from 'react';
import { Globe, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import CircularGallery from './CircularGallery';


export const galleryImages = [
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=400&h=400&fit=crop",
  ];

const GallerySection = () => {
  
  

  return (
    <>
      <CircularGallery images={galleryImages} />
    </>
  );
};

export default GallerySection;