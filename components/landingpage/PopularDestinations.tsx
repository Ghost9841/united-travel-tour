'use client';
import { ChevronLeft, ChevronRight, MapPin} from 'lucide-react';
import { useState, useEffect } from 'react';

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

export default function PopularDestinations() {
  const [idx, setIdx] = useState(0);

  const next = () => setIdx((i) => (i + 1) % DESTINATIONS.length);
  const prev = () => setIdx((i) => (i - 1 + DESTINATIONS.length) % DESTINATIONS.length);


  const visibleDestinations = DESTINATIONS.slice(idx, idx + 4);

  // keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const { src, alt, name, location } = DESTINATIONS[idx];

  return (
    <section className="max-w-8xl mx-auto px-6 py-10">
      {/* heading */}
      <h1 className="text-4xl font-semibold">Popular Destinations</h1>
      <div className="border-t-2 border-orange-500 w-2xs mt-2 mb-4" />

      <div className="flex items-center justify-between mb-6">
        <h4 className="text-gray-600">Most popular destinations around the world, from historical places to natural wonders.</h4>

        <div className="flex items-center gap-3">
          <button
            onClick={prev}
            className="p-3 rounded-full bg-gray-900 hover:bg-gray-800 text-white transition"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={next}
            className="p-3 rounded-full bg-orange-500 hover:bg-orange-600 text-white transition"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
       <div className="flex gap-6 items-center justify-center overflow-hidden px-4">
        {visibleDestinations.map((destination, i) => (
          <div
            key={`${destination.id}-${i}`}
            className="shrink-0 transition-all duration-500 ease-out"
            style={{
              transform: i === 1 ? 'scale(1.05)' : 'scale(0.95)',
              opacity: i === 1 ? 1 : 0.85,
            }}
          >
            <div className="relative w-75 h-105 rounded-2xl overflow-hidden group cursor-pointer  bg-white">
              <img
                src={destination.src}
                alt={destination.alt}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              
              
              {/* Text Content */}
              <div className="absolute bottom-6 left-6 text-white z-10">
                <h3 className="text-xl font-semibold mb-2">{destination.name}</h3>
                <div className="flex items-center gap-1.5 text-sm">
                  <MapPin className="w-4 h-4" />
                  <span>{destination.location}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}