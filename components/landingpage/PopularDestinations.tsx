'use client';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';

const DESTINATIONS = [
  {
    id: 1,
    name: "Monument of Berlin",
    location: "Berlin, Germany",
    description: "A powerful historical landmark reflecting Berlin's rich past, culture, and architectural legacy.",
    src: "https://images.unsplash.com/photo-1524422926292-d321c3ff46f2?w=1200&h=800&fit=crop",
    alt: "Berlin Cathedral"
  },
  {
    id: 2,
    name: "Millennium Bridge",
    location: "London, United Kingdom",
    description: "A modern pedestrian bridge offering stunning views of the Thames and London's iconic skyline.",
    src: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&fit=crop",
    alt: "Millennium Bridge London"
  },
  {
    id: 3,
    name: "Rialto Bridge",
    location: "Venice, Italy",
    description: "One of Venice's oldest bridges, connecting history, romance, and vibrant canal life.",
    src: "https://images.unsplash.com/photo-1514921295671-29d763e5ded7?w=1200&h=800&fit=crop",
    alt: "Rialto Bridge Venice"
  },
  {
    id: 4,
    name: "Sacré-Cœur",
    location: "Paris, France",
    description: "A breathtaking basilica perched above Paris, offering panoramic city views and timeless beauty.",
    src: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1200&h=800&fit=crop",
    alt: "Sacré-Cœur Paris"
  },
  {
    id: 5,
    name: "Colosseum",
    location: "Rome, Italy",
    description: "An ancient Roman amphitheater symbolizing the grandeur, history, and drama of the Roman Empire.",
    src: "https://images.unsplash.com/photo-1552832860-cfde47f1dda5?w=1200&h=800&fit=crop",
    alt: "Colosseum Rome"
  }
];

export default function PopularDestinations() {
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 4;

  const next = () => {
    setStartIndex((prev) => 
      prev + itemsToShow >= DESTINATIONS.length ? 0 : prev + 1
    );
  };

  const prev = () => {
    setStartIndex((prev) => 
      prev === 0 ? Math.max(0, DESTINATIONS.length - itemsToShow) : prev - 1
    );
  };

  // keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const visibleDestinations = DESTINATIONS.slice(startIndex, startIndex + itemsToShow);

  return (
    <section className="max-w-8xl mx-auto px-6 py-10">
      {/* heading */}
      <h1 className="text-4xl font-semibold">Popular Destinations</h1>
      <div className="border-t-2 border-orange-500 w-32 mt-2 mb-4" />

      <div className="flex items-center justify-between mb-6">
        <h4 className="text-gray-600">Most popular destinations around the world, from historical places to natural wonders.</h4>

        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="p-3 rounded-md bg-gray-800 hover:bg-gray-700 text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="p-3 rounded-md bg-orange-500 hover:bg-orange-600 text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleDestinations.map((destination) => (
          <div
            key={destination.id}
            className="group relative rounded-2xl overflow-hidden cursor-pointer h-80 bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Image Container */}
            <div className="absolute inset-0 transition-transform duration-500 group-hover:-translate-y-20">
              <img
                src={destination.src}
                alt={destination.alt}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Details Container - Hidden by default, slides up on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black/95 to-transparent pt-16">
              <h3 className="text-lg font-bold mb-2">{destination.name}</h3>
              <div className="flex items-center gap-1.5 text-sm mb-2">
                <MapPin className="w-4 h-4" />
                <span>{destination.location}</span>
              </div>
              <p className="text-xs text-gray-300 line-clamp-2">{destination.description}</p>
            </div>

            {/* Title visible when not hovering */}
            <div className="absolute bottom-4 left-4 right-4 text-white group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="font-semibold drop-shadow-lg">{destination.name}</h3>
              <div className="flex items-center gap-1 text-sm mt-1">
                <MapPin className="w-3 h-3" />
                <span className="text-sm drop-shadow-lg">{destination.location}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}