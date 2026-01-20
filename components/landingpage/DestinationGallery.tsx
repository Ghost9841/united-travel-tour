'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
} from '@/components/ui/carousel';
import Autoplay from "embla-carousel-autoplay"

const DESTINATIONS = [
  {
    id: 1,
    name: 'Monument of Berlin',
    location: 'Berlin, Germany',
    src: 'https://images.unsplash.com/photo-1524422926292-d321c3ff46f2?w=1200&h=800&fit=crop',
    alt: 'Berlin Cathedral',
  },
  {
    id: 2,
    name: 'Millennium Bridge',
    location: 'London, United Kingdom',
    src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&fit=crop',
    alt: 'Millennium Bridge London',
  },
  {
    id: 3,
    name: 'Rialto Bridge',
    location: 'Venice, Italy',
    src: 'https://images.unsplash.com/photo-1514921295671-29d763e5ded7?w=1200&h=800&fit=crop',
    alt: 'Rialto Bridge Venice',
  },
  {
    id: 4,
    name: 'Sacré-Cœur',
    location: 'Paris, France',
    src: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop',
    alt: 'Sacré-Cœur Paris',
  },
  {
    id: 5,
    name: 'Colosseum',
    location: 'Rome, Italy',
    src: 'https://images.unsplash.com/photo-1552832860-cfde47f1dda5?w=1200&h=800&fit=crop',
    alt: 'Colosseum Rome',
  },
];

export default function DestinationGallery() {
  const [idx, setIdx] = useState(0);

  const next = () => setIdx((i) => (i + 1) % DESTINATIONS.length);
  const prev = () => setIdx((i) => (i - 1 + DESTINATIONS.length) % DESTINATIONS.length);

  
  const visibleDestinations = DESTINATIONS.slice(idx, idx + 4);


  // keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') api?.scrollPrev();
      if (e.key === 'ArrowRight') api?.scrollNext();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [api]);

  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* heading */}
      <h1 className="text-4xl font-semibold">Destination Gallery</h1>
      <div className="border-t-2 border-orange-500 w-20 mt-2 mb-4" />

      <div className="flex items-center justify-between mb-6">
        <h4 className="text-gray-600">Our photo gallery on trip</h4>

        <div className="flex items-center gap-3">
          <button
            onClick={() => api?.scrollPrev()}
            className="p-3 rounded-full bg-gray-900 hover:bg-gray-800 text-white transition"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => api?.scrollNext()}
            className="p-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleDestinations.map((destination) => (
            <div
              key={destination.id}
              className="relative aspect-[3/4] rounded-2xl overflow-hidden group cursor-pointer"
            >
              <img
                src={destination.src}
                alt={destination.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="absolute bottom-4 left-4 text-white">
                  <p className="font-semibold">{destination.name}</p>
                  <p className="text-sm opacity-90">{destination.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
    </section>
  );
}