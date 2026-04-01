'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Plane, ArrowRight } from 'lucide-react';

interface TrendingRoute {
  id: number;
  from: string;
  to: string;
  price: number;
  currency: string;
  image: string;
}

export default function TrendingRoutes() {
  const [routes, setRoutes] = useState<TrendingRoute[]>([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  const itemsToShow = 4;

  useEffect(() => {
    fetch('/api/offers')
      .then(r => r.json())
      .then(d => { if (d.success) setRoutes(d.data); })
      .catch(err => console.error('Failed to fetch trending routes', err))
      .finally(() => setLoading(false));
  }, []);

  const next = () =>
    setStartIndex(prev =>
      prev + itemsToShow >= routes.length ? 0 : prev + 1
    );

  const prev = () =>
    setStartIndex(prev =>
      prev === 0 ? Math.max(0, routes.length - itemsToShow) : prev - 1
    );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') prev();
      if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [routes.length]);

  const visibleRoutes = routes.slice(startIndex, startIndex + itemsToShow);

  // Loading skeleton
  if (loading) {
    return (
      <section className="max-w-8xl mx-auto px-6 py-10">
        <h1 className="text-4xl font-semibold">Trending Routes</h1>
        <div className="border-t-2 border-orange-500 w-32 mt-2 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded-2xl h-80 bg-gray-100 animate-pulse" />
          ))}
        </div>
      </section>
    );
  }

  // Empty state
  if (routes.length === 0) return null;

  return (
    <section className="max-w-8xl mx-auto px-6 py-10">
      {/* Header */}
      <h1 className="text-4xl font-semibold">Trending Routes</h1>
      <div className="border-t-2 border-orange-500 w-32 mt-2 mb-4" />

      <div className="flex items-center justify-between mb-6">
        <h4 className="text-gray-600">
          Discover our most popular flight routes with the best deals.
        </h4>

        {routes.length > itemsToShow && (
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

      {/* Routes Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {visibleRoutes.map(route => (
          <Link key={route.id} href={`/offers/${route.id}`}>
            <div className="group relative rounded-2xl overflow-hidden cursor-pointer h-80 bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
              {/* Image */}
              <div className="absolute inset-0 transition-transform duration-500 group-hover:scale-110">
                <img
                  src={route.image}
                  alt={`${route.from} to ${route.to}`}
                  className="w-full h-full object-cover"
                  onError={e => {
                    (e.target as HTMLImageElement).src =
                      'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              </div>

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                {/* Route */}
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1 text-sm bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="font-semibold">{route.from}</span>
                    <Plane className="w-3.5 h-3.5 text-orange-400" />
                    <span className="font-semibold">{route.to}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-4">
                  <span className="text-3xl font-bold text-orange-400">
                    {route.currency}
                  </span>
                  <p className="text-xs text-gray-300 mt-1">Starting from</p>
                </div>

                {/* Hover Action */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-600/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-sm text-gray-300">View Details</span>
                  <ArrowRight className="w-4 h-4 text-orange-400 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>

              {/* Default non-hover footer - minimal */}
              <div className="absolute bottom-4 left-4 right-4 text-white group-hover:opacity-0 transition-opacity duration-300">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs bg-black/50 backdrop-blur-sm px-2 py-1 rounded-full">
                    <Plane className="w-3 h-3" />
                    <span>{route.from} → {route.to}</span>
                  </div>
                  <span className="text-lg font-bold text-orange-400 drop-shadow-lg">
                    {route.currency}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}