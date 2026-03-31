'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plane } from 'lucide-react';

interface TrendingRoute {
  id: number;
  from: string;
  fromCode: string;
  to: string;
  toCode: string;
  date: string;
  price: number;
  currency: string;
  image: string;
}

export default function TrendingRoutes() {
  const [routes, setRoutes] = useState<TrendingRoute[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/offers')
      .then(r => r.json())
      .then(d => { if (d.success) setRoutes(d.data); })
      .catch(err => console.error('Failed to fetch trending routes', err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <section className="max-w-8xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Routes With Cheap Prices</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="h-24 rounded-xl bg-gray-100 animate-pulse" />
        ))}
      </div>
    </section>
  );

  if (routes.length === 0) return null;

  return (
    <section className="max-w-8xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Routes With Cheap Prices</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {routes.map(route => (
          <Link key={route.id} href={`/offers/${route.id}`}>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-white group">
              <img
                src={route.image}
                alt={route.to}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&h=120&fit=crop'; }}
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1 text-sm font-semibold text-gray-800 mb-0.5">
                  <span className="truncate">{route.from}</span>
                  <Plane className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span className="truncate">{route.to}</span>
                </div>
                <div className="flex items-center gap-1 text-xs text-blue-600 font-medium mb-1.5">
                  <span>{route.fromCode}</span>
                  <span>→</span>
                  <span>{route.toCode}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{route.date}</span>
                  <span className="text-sm font-bold text-gray-900">{route.currency}{route.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}