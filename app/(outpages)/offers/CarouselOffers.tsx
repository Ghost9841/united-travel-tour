'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, MapPin, Star } from 'lucide-react';
import Link from 'next/link';
import SpecialOffer from '@/app/api/special-offers/types';

export default function SpecialOffersCarousel() {
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

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

  useEffect(() => {
    if (!isAutoPlay || offers.length === 0) return;
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % offers.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isAutoPlay, offers.length]);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlay(false);
  };

  const nextSlide = () => goToSlide((currentSlide + 1) % offers.length);
  const prevSlide = () => goToSlide((currentSlide - 1 + offers.length) % offers.length);

  if (loading) {
    return (
      <section className="relative w-full h-[600px] bg-gray-100 animate-pulse rounded-2xl">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
        </div>
      </section>
    );
  }

  if (offers.length === 0) return null;

  const offer = offers[currentSlide];
  const saving = offer.price > 0 && offer.price !== offer.discountedPrice
    ? offer.price - offer.discountedPrice
    : null;

  return (
    <section className="px-6 py-10">
      <h1 className="text-4xl font-semibold">Special Offers</h1>
      <div className="border-t-2 border-orange-500 w-32 mt-2 mb-6" />
      <p className="text-gray-600 mb-6">Check out our special offers and discounts for your next adventure.</p>

      <div className="relative w-full h-[560px] overflow-hidden rounded-2xl">

        {/* Slides */}
        {offers.map((o, index) => (
          <div
            key={o.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={o.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=1080&fit=crop'}
              alt={o.title}
              className="w-full h-full object-cover"
              onError={e => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1920&h=1080&fit=crop';
              }}
            />
            <div className="absolute inset-0 bg-black/45" />
          </div>
        ))}

        {/* Content overlay */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end px-10 pb-12 pointer-events-none">

          {/* Save badge */}
          {saving && saving > 0 && (
            <span className="mb-4 self-start bg-orange-500 text-white text-sm font-bold px-4 py-1.5 rounded-full">
              Save £{saving}
            </span>
          )}

          {/* Location */}
          {offer.location && (
            <div className="flex items-center gap-1.5 text-white/80 text-sm mb-2">
              <MapPin className="w-4 h-4" />
              <span>{offer.location}</span>
            </div>
          )}

          {/* Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg max-w-2xl mb-3">
            {offer.title}
          </h2>

          {/* Stars */}
          <div className="flex gap-1 mb-3">
            {[...Array(Math.round(offer.rating))].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            ))}
          </div>

          {/* Description */}
          <p className="text-white/80 max-w-xl text-sm line-clamp-2 mb-5">
            {offer.description}
          </p>

          {/* Price + Buttons */}
          <div className="flex items-center gap-4 pointer-events-auto">
            {offer.discountedPrice > 0 ? (
              <span className="text-3xl font-bold text-orange-400">£{offer.discountedPrice}</span>
            ) : (
              <span className="text-lg text-white/80">Contact for price</span>
            )}

            <Link
              href={`/offers/special-offers/${offer.id}`}
              className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-semibold transition-colors text-sm"
            >
              VIEW DETAILS
            </Link>
            <Link
              href="/booknow"
              className="px-6 py-2.5 bg-white/20 hover:bg-white/30 border border-white/40 text-white rounded-lg font-semibold transition-colors text-sm"
            >
              BOOK NOW
            </Link>
          </div>
        </div>

        {/* Right-side vertical nav — dots + chevrons */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-20 flex flex-col items-center gap-6">

          {/* Dots */}
          <div className="flex flex-col gap-4">
            {offers.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? 'bg-white w-3 h-8'
                    : 'bg-white/50 hover:bg-white/80 w-3 h-3'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Chevrons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition"
              aria-label="Previous slide"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition"
              aria-label="Next slide"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}