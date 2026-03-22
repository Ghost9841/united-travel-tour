'use client';

import SpecialOffer from '@/app/api/special-offers/types';
import { ChevronLeft, ChevronRight, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function SpecialOffers() {
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 4;

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/special-offers?status=active');
        const data = await res.json();
        if (data.success) setOffers(data.data);
      } catch (err) {
        console.error('Failed to fetch special offers', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const next = () =>
    setStartIndex(prev =>
      prev + itemsToShow >= offers.length ? 0 : prev + 1
    );

  const prev = () =>
    setStartIndex(prev =>
      prev === 0 ? Math.max(0, offers.length - itemsToShow) : prev - 1
    );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [offers.length]);

  const visibleOffers = offers.slice(startIndex, startIndex + itemsToShow);

  // ─── Loading skeleton ────────────────────────────────────────────────────────
  if (loading) {
    return (
      <section className="max-w-8xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-semibold">Special Offers</h1>
        <div className="border-t-2 border-orange-500 w-32 mt-2 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl h-96 bg-gray-100 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  // ─── Empty state ─────────────────────────────────────────────────────────────
  if (offers.length === 0) return null;

  return (
    <section className="max-w-8xl mx-auto px-6 py-10">
      {/* Header */}
      <h1 className="text-4xl font-semibold">Special Offers</h1>
      <div className="border-t-2 border-orange-500 w-32 mt-2 mb-4" />

      <div className="flex items-center justify-between mb-6">
        <h4 className="text-gray-600">
          Check out our special offers and discounts for your next adventure.
        </h4>

        {offers.length > itemsToShow && (
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
        )}
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleOffers.map(offer => (
          <div
            key={offer.id}
            className="group relative rounded-2xl overflow-hidden cursor-pointer h-96 bg-white shadow-lg hover:shadow-2xl transition-all duration-500"
          >
            {/* Image */}
            <div className="absolute inset-0 transition-transform duration-500 group-hover:-translate-y-32">
              <img
                src={offer.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop'}
                alt={offer.title}
                className="w-full h-full object-cover"
                onError={e => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Save badge */}
              {offer.price > 0 && offer.price !== offer.discountedPrice && (
                <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                  Save £{offer.price - offer.discountedPrice}
                </div>
              )}
            </div>

            {/* Hover detail panel */}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black/95 to-transparent pt-20">
              {offer.location && (
                <div className="flex items-center gap-1 text-sm mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{offer.location}</span>
                </div>
              )}

              <h3 className="text-xl font-bold mb-3">{offer.title}</h3>

              <div className="flex gap-1 mb-3">
                {[...Array(Math.round(offer.rating))].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              <p className="text-sm text-gray-300 mb-4 line-clamp-3">{offer.description}</p>

              <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                <div>
                  {offer.discountedPrice > 0 ? (
                    <>
                      <span className="text-2xl font-bold text-orange-400">
                        £{offer.discountedPrice}
                      </span>
                      <p className="text-xs text-gray-400 mt-1">Per person</p>
                    </>
                  ) : (
                    <span className="text-sm text-gray-300">Contact for price</span>
                  )}
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-gray-700 gap-3">
                  <div className="flex gap-2">  {/* Added wrapper with gap */}
                    <Link href={`/offers/special-offers/${offer.id}`}>
                      <button className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors text-sm">
                        VIEW DETAILS
                      </button>
                    </Link>
                    <Link href={'/booknow'}>
                      <button className="px-5 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors text-sm">
                        BOOK NOW
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            {/* Default (non-hover) footer */}
            <div className="absolute bottom-4 left-4 right-4 text-white group-hover:opacity-0 transition-opacity duration-300">
              <h3 className="font-semibold text-lg drop-shadow-lg">{offer.title}</h3>
              <div className="flex items-center justify-between mt-2">
                {offer.location && (
                  <div className="flex items-center gap-1 text-sm">
                    <MapPin className="w-3 h-3" />
                    <span className="drop-shadow-lg">{offer.location}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 ml-auto">
                  {offer.discountedPrice > 0 ? (
                    <span className="text-xl font-bold text-orange-400 drop-shadow-lg">
                      £{offer.discountedPrice}
                    </span>
                  ) : (
                    <span className="text-sm text-gray-200 drop-shadow-lg">Contact for price</span>
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