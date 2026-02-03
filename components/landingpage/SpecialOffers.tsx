'use client'
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const specialOffers = [
  {
    title: "Romantic Lisbon Getaway",
    description: "Explore the charming streets of Lisbon with a luxury stay, daily breakfast, and guided city tours.",
    location: "Lisbon, Portugal",
    price: 700,
    discountedPrice: 500,
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=600&fit=crop",
    rating: 5
  },
  {
    title: "Historic Athens Experience",
    description: "Discover ancient wonders of Greece with a premium hotel stay, meals included, and cultural sightseeing.",
    location: "Athens, Greece",
    price: 1000,
    discountedPrice: 800,
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&h=600&fit=crop",
    rating: 5
  },
  {
    title: "Classic Rome Holiday",
    description: "Enjoy the timeless beauty of Rome with a 5-star hotel, breakfast, and guided historical tours.",
    location: "Rome, Italy",
    price: 900,
    discountedPrice: 750,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
    rating: 5
  },
  {
    title: "Paris City of Love",
    description: "A romantic escape to Paris including luxury accommodation, breakfast, and city exploration.",
    location: "Paris, France",
    price: 1200,
    discountedPrice: 950,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    rating: 5
  },
  {
    title: "Venice Canal Escape",
    description: "Experience Venice's iconic canals with a premium stay, gondola ride, and breakfast included.",
    location: "Venice, Italy",
    price: 1100,
    discountedPrice: 880,
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop",
    rating: 5
  }
];

export default function SpecialOffers() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;

  const next = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= specialOffers.length ? 0 : prev + 1
    );
  };

  const prev = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? Math.max(0, specialOffers.length - itemsPerView) : prev - 1
    );
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const visibleOffers = specialOffers.slice(currentIndex, currentIndex + itemsPerView);
  
  // Fill remaining slots if at the end
  while (visibleOffers.length < itemsPerView && specialOffers.length >= itemsPerView) {
    visibleOffers.push(specialOffers[visibleOffers.length - currentIndex]);
  }

  return (
    <section className="max-w-8xl mx-auto px-6 py-12 bg-gray-50">
      {/* Header */}
      <div className="mb-8">
        <div className="text-right mb-4">
          <h1 className="text-5xl font-bold text-gray-900">Special Offers</h1>
          <div className="border-t-4 border-orange-500 w-32 mt-3 ml-auto" />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={prev}
              className="p-3 rounded-lg bg-gray-800 hover:bg-gray-700 text-white transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={next}
              className="p-3 rounded-lg bg-orange-500 hover:bg-orange-600 text-white transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
          <p className="text-gray-500 text-lg">Check out our special offer and discounts</p>
        </div>
      </div>

      {/* Cards Container */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {visibleOffers.map((offer, index) => (
          <div
            key={`${offer.title}-${currentIndex + index}`}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
          >
            {/* Image */}
            <div className="relative h-64 overflow-hidden">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-6">
              {/* Location */}
              <div className="flex items-center gap-1 text-gray-600 mb-2">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{offer.location}</span>
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-3">
                {[...Array(offer.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Description */}
              <p className="text-gray-700 text-sm mb-4 line-clamp-3">
                {offer.description}
              </p>

              {/* Footer */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-500 text-sm">From</p>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-orange-500">
                      £{offer.discountedPrice}
                    </span>
                    {offer.price !== offer.discountedPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        £{offer.price}
                      </span>
                    )}
                  </div>
                </div>
                <button className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
                  DETAILS
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}