'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Plane, Trash2, X, Images, Route } from 'lucide-react';
import Link from 'next/link';

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
  airline: string;
  flightNo: string;
  duration: string;
  stops: string;
  status: 'active' | 'draft';
  order: number;
  createdAt: string;
}

export default function TrendingRoutesDashboard() {
  const [routes, setRoutes]         = useState<TrendingRoute[]>([]);
  const [loading, setLoading]       = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu]     = useState<number | null>(null);

  const fetchRoutes = async () => {
    try {
      setLoading(true);
      const res  = await fetch('/api/offer');
      const data = await res.json();
      if (data.success) setRoutes(data.data);
      else setRoutes([]);
    } catch { setRoutes([]); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this route?')) return;
    try {
      const res  = await fetch(`/api/offers/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) setRoutes(prev => prev.filter(r => r.id !== id));
      else alert(data.error || 'Failed to delete');
    } catch { alert('Failed to delete'); }
  };

  useEffect(() => { fetchRoutes(); }, []);

  const active = routes.filter(r => r.status === 'active').length;
  const draft  = routes.filter(r => r.status === 'draft').length;

  const filtered = routes.filter(r =>
    r.from.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.to.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.airline.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.fromCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    r.toCode.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading routes...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto p-6">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Trending Routes</h1>
          <p className="text-gray-600">Manage trending flight routes shown on the homepage</p>
        </div>

        {/* Hero carousel quick-access card */}
        <Link href="/dashboard/offers/carouselimage">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 mb-8 flex items-center gap-5 group cursor-pointer">
            <div className="p-4 bg-orange-50 rounded-2xl group-hover:bg-orange-100 transition-colors flex-shrink-0">
              <Images className="w-8 h-8 text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                Hero Carousel Images
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                Add, reorder, and manage the images shown in the homepage hero carousel
              </p>
            </div>
            <span className="text-orange-400 text-sm font-semibold group-hover:translate-x-1 transition-transform flex-shrink-0">
              Manage →
            </span>
          </div>
        </Link>

        {/* Search + Add */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search by city, code or airline..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm" />
          </div>
          <Link href="/dashboard/offers/new"
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-md font-medium">
            <Plus className="w-5 h-5" /> Add Route
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Routes', value: routes.length, bg: 'bg-orange-50', color: 'text-orange-600' },
            { label: 'Active',        value: active,        bg: 'bg-green-50',  color: 'text-green-600' },
            { label: 'Draft',         value: draft,         bg: 'bg-amber-50',  color: 'text-amber-600' },
          ].map(({ label, value, bg, color }) => (
            <div key={label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 text-sm font-medium">{label}</span>
                <div className={`p-2 ${bg} rounded-lg`}>
                  <Route className={`w-5 h-5 ${color}`} />
                </div>
              </div>
              <p className="text-4xl font-bold text-gray-900">{value}</p>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Plane className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No routes found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery ? 'No routes match your search.' : 'Add your first trending route.'}
            </p>
            {!searchQuery && (
              <Link href="/dashboard/offers/new"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg font-medium">
                <Plus className="w-5 h-5" /> Add First Route
              </Link>
            )}
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(route => (
              <div key={route.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group">

                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100">
                  {route.image ? (
                    <img src={route.image} alt={route.to}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={e => { e.currentTarget.style.display = 'none'; }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Plane className="w-12 h-12 text-orange-300" />
                    </div>
                  )}

                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${
                      route.status === 'active' ? 'bg-gray-900 text-white' : 'bg-white/90 text-gray-600 border border-gray-200'
                    }`}>
                      {route.status === 'active' ? 'Active' : 'Draft'}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <button onClick={() => setShowMenu(showMenu === route.id ? null : route.id)}
                      className="p-1.5 bg-white rounded-lg shadow-md hover:bg-gray-50">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                    {showMenu === route.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                        <Link href={`/dashboard/offers/trending/${route.id}`}
                          className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          Edit
                        </Link>
                        <button onClick={() => { handleDelete(route.id); setShowMenu(null); }}
                          className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Route */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-base font-bold text-gray-900">{route.from}</span>
                    <Plane className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-base font-bold text-gray-900">{route.to}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-blue-600 font-medium mb-3">
                    <span>{route.fromCode}</span>
                    <span>→</span>
                    <span>{route.toCode}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                    <span>{route.airline} · {route.flightNo}</span>
                    <span>{route.duration}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <span className="text-xs text-gray-400">{route.date}</span>
                    <span className="text-lg font-bold text-orange-500">{route.currency}{route.price.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}