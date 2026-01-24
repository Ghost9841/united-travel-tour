'use client';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState, useEffect } from 'react';

const DESTINATIONS = [
  {
    id: 1,
    name: "Urban Explorer",
    location: "City Streets",
    image: "https://images.unsplash.com/photo-1499696010180-025ef28d15bb?auto=format&fit=crop&w=600&q=80",
    alt: "Traveler standing near colorful mural"
  },
  {
    id: 2,
    name: "Beach Sunset",
    location: "Coastal Paradise",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80",
    alt: "Person sitting on rocky beach during sunset"
  },
  {
    id: 3,
    name: "European Streets",
    location: "Historic District",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=600&q=80",
    alt: "Backpacker walking through narrow European street"
  },
  {
    id: 4,
    name: "Urban Adventure",
    location: "City Railway",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=600&q=80",
    alt: "Traveler walking on railway track in urban area"
  },
  {
    id: 5,
    name: "Mountain Explorer",
    location: "Highland Peaks",
    image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=600&q=80",
    alt: "Solo traveler exploring mountain landscape"
  },
  {
    id: 6,
    name: "Desert Cliffs",
    location: "Coastal Desert",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80",
    alt: "Person exploring desert cliffs by the sea"
  }
];

export default function DestinationGallery() {
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
      <h1 className="text-4xl font-semibold">Destination Gallery</h1>
      <div className="border-t-2 border-orange-500 w-32 mt-2 mb-4" />

      <div className="flex items-center justify-between mb-6">
        <h4 className="text-gray-600">Our photo gallery on trip</h4>

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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleDestinations.map((destination) => (
          <div
            key={destination.id}
            className="group relative rounded-2xl overflow-hidden cursor-pointer h-72 bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Image Container */}
            <div className="absolute inset-0 transition-transform duration-500 group-hover:-translate-y-16">
              <img
                src={destination.image}
                alt={destination.alt}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
            </div>

            {/* Details Container - Hidden by default, slides up on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black/95 to-transparent pt-12">
              <h3 className="text-lg font-bold mb-1">{destination.name}</h3>
              <p className="text-sm text-gray-300">{destination.location}</p>
            </div>

            {/* Title visible when not hovering */}
            <div className="absolute bottom-4 left-4 right-4 text-white group-hover:opacity-0 transition-opacity duration-300">
              <p className="font-semibold drop-shadow-lg">{destination.name}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}