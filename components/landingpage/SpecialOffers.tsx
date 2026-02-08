'use client'
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import { useState, useEffect } from 'react';

const specialOffers = [
  {
    id: 1,
    title: "London ⇄ Kathmandu ⇄ London (Two Way)",
    description: "Fly London ⇄ Kathmandu ⇄ London with Qatar Airways from £900 (subject to availability). Includes 40KG baggage. Limited seats, so book early. Call 020 3725 3460 for dates, fare rules, and quick booking support. Terms apply.",
    location: "London, Kathmandu",
    price: 1000,
    discountedPrice: 900,
    image: "/2026/populardestination/ktmtolondon.jpeg",
    rating: 5
  },
  {
    id: 2,
    title: "London ⇄ Kathmandu",
    description: "Fly London ⇄ Kathmandu with Qatar Airways at promo fares from £370 (subject to availability). Enjoy a generous 40KG baggage allowance and smooth connections, great service, and comfortable flights. Limited seats available, so book early to secure the best deal. Call 020 3725 3460 today for dates, fare rules, and instant booking support. Terms apply.",
    location: "London, Kathmandu",
    price: 400,
    discountedPrice: 370,
    image: "/2026/populardestination/ktmtolondon_2.jpeg",
    rating: 5
  },
  {
    id: 3,
    title: "Classic Rome Holiday",
    description: "Enjoy the timeless beauty of Rome with a 5-star hotel, breakfast, and guided historical tours.",
    location: "Rome, Italy",
    price: 900,
    discountedPrice: 750,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
    rating: 5
  },
  {
    id: 4,
    title: "Paris City of Love",
    description: "A romantic escape to Paris including luxury accommodation, breakfast, and city exploration.",
    location: "Paris, France",
    price: 1200,
    discountedPrice: 950,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    rating: 5
  },
  {
    id: 5,
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
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 4;

  const next = () => {
    setStartIndex((prev) => 
      prev + itemsToShow >= specialOffers.length ? 0 : prev + 1
    );
  };

  const prev = () => {
    setStartIndex((prev) => 
      prev === 0 ? Math.max(0, specialOffers.length - itemsToShow) : prev - 1
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

  const visibleOffers = specialOffers.slice(startIndex, startIndex + itemsToShow);

  return (
    <section className="max-w-8xl mx-auto px-6 py-10">
      {/* Header */}
      <h1 className="text-4xl font-semibold">Special Offers</h1>
      <div className="border-t-2 border-orange-500 w-32 mt-2 mb-4" />

      <div className="flex items-center justify-between mb-6">
        <h4 className="text-gray-600">Check out our special offers and discounts for your next adventure.</h4>

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

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleOffers.map((offer) => (
          <div
            key={offer.id}
            className="group relative rounded-2xl overflow-hidden cursor-pointer h-96 bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Image Container */}
            <div className="absolute inset-0 transition-transform duration-500 group-hover:-translate-y-32">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-full object-cover"
              />
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              
              {/* Discount Badge */}
              {offer.price !== offer.discountedPrice && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Save £{offer.price - offer.discountedPrice}
                </div>
              )}
            </div>

            {/* Details Container - Hidden by default, slides up on hover */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black/95 to-transparent pt-20">
              <div className="flex items-center gap-1 text-sm mb-2">
                <MapPin className="w-4 h-4" />
                <span>{offer.location}</span>
              </div>
              
              <h3 className="text-xl font-bold mb-3">{offer.title}</h3>
              
              <div className="flex gap-1 mb-3">
                {[...Array(offer.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              
              <p className="text-sm text-gray-300 mb-4 line-clamp-3">
                {offer.description}
              </p>
              
              <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-orange-400">
                      £{offer.discountedPrice}
                    </span>
                    {offer.price !== offer.discountedPrice && (
                      <span className="text-gray-400 line-through text-sm">
                        £{offer.price}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Per person</p>
                </div>
                <button className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors text-sm">
                  BOOK NOW
                </button>
              </div>
            </div>

            {/* Title visible when not hovering */}
            <div className="absolute bottom-4 left-4 right-4 text-white group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="font-semibold text-lg drop-shadow-lg">{offer.title}</h3>
              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center gap-1 text-sm">
                  <MapPin className="w-3 h-3" />
                  <span className="drop-shadow-lg">{offer.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold text-orange-400 drop-shadow-lg">
                    £{offer.discountedPrice}
                  </span>
                  {offer.price !== offer.discountedPrice && (
                    <span className="text-gray-300 line-through text-sm">
                      £{offer.price}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}