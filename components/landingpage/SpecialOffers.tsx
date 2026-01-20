'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';


 {/* SPECIAL OFFERS LEFT TO ADD */}
const OFFERS = [
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

export default function SpecialOffers() {
  const [idx, setIdx] = useState(0);

  const next = () => setIdx((i) => (i + 1) % OFFERS.length);
  const prev = () => setIdx((i) => (i - 1 + OFFERS.length) % OFFERS.length);

  
  


  // keyboard arrows
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);


  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* heading */}
      <div className="mb-6">
        <div className="text-right">
          <h1 className="text-4xl font-semibold">Special Offers</h1>
          <div className="border-t-2 border-orange-500 w-24 mt-2 mb-4 ml-auto" />
        </div>
        <div className="flex items-center justify-between">
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
          <h4 className="text-gray-600">Check out our special offers and discounts</h4>
        </div>
      </div>
      
    </section>
  );
}