'use client';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { useState, useEffect } from 'react';


 {/* SPECIAL OFFERS LEFT TO ADD */}
const OFFERS = [
  {
    id: 1,
    name: 'Pashupatinath Temple',
    location: 'Kathmandu, Nepal',
    src: 'https://images.openai.com/thumbnails/url/LuMSHnicu5mVUVJSUGylr5-al1xUWVCSmqJbkpRnoJdeXJJYkpmsl5yfq5-Zm5ieWmxfaAuUsXL0S7F0Tw5KNLNMj_T3S4s3z45IM_YzSDYuL3f1jjfw1XV1CS4sKS1PzwvMS48wM8o0CjQwyXbzUSsGAG9pJa4',
    alt: 'Pashupatinath Temple Kathmandu',
  },
  {
    id: 2,
    name: 'Swayambhunath Stupa',
    location: 'Kathmandu, Nepal',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Swayambhunath_2018.jpg/1280px-Swayambhunath_2018.jpg',
    alt: 'Swayambhunath Monkey Temple',
  },
  {
    id: 3,
    name: 'Pokhara Lakeside',
    location: 'Pokhara, Nepal',
    src: 'https://www.nepalindependentguide.com/wp-content/uploads/2025/02/Swayambhunath.gif',
    alt: 'Phewa Lake Pokhara',
  },
  {
    id: 4,
    name: 'Mount Everest',
    location: 'Solukhumbu, Nepal',
    src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Swayambhunath_2018.jpg/1280px-Swayambhunath_2018.jpg',
    alt: 'Mount Everest Himalayas',
  },
  {
    id: 5,
    name: 'Bhaktapur Durbar Square',
    location: 'Bhaktapur, Nepal',
    src: 'https://images.unsplash.com/photo-1622044029152-8f8b9e7c5e90?w=1200&h=800&fit=crop',
    alt: 'Bhaktapur Durbar Square',
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
        <div className="flex gap-6 items-center justify-center overflow-hidden px-4">
        {OFFERS.map((destination, i) => (
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