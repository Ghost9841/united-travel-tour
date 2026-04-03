'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Plane, Trash2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

type OngoingFare = {
  id: number;
  title: string;
  description: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  image: string;
  alt: string;
  departure: string;
  arrival: string;
  expires: string;
  status: 'active' | 'draft';
};

export default function OngoingFareDashboardPage() {
  const [fares, setFares] = useState<OngoingFare[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const fetchFares = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/(landingpage)/ongoingfare');
      const data = await res.json();
      if (data.success) setFares(data.data);
      else setFares([]);
    } catch { setFares([]); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this fare?')) return;
    try {
      const res = await fetch(`/api/(landingpage)/ongoingfare/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) setFares(prev => prev.filter(f => f.id !== id));
      else alert(data.error || 'Failed to delete');
    } catch { alert('Failed to delete'); }
  };

  useEffect(() => { fetchFares(); }, []);

  useEffect(() => {
    const errorParam = searchParams.get('error');
    if (errorParam) {
      setError(errorParam);
    }
  }, [searchParams]);

  const active = fares.filter(f => f.status === 'active').length;
  const draft = fares.filter(f => f.status === 'draft').length;

  const filtered = fares.filter(f =>
    f.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.departure.toLowerCase().includes(searchQuery.toLowerCase()) ||
    f.arrival.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading fares...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto p-6">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Ongoing Fares</h1>
          <p className="text-gray-600">Manage ongoing fare campaigns shown on the homepage</p>
        </div>

        {error && <div className="rounded-lg bg-red-100 border border-red-200 text-red-700 p-3 mb-6">{error}</div>}

        {/* Search + Add */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search by title, departure or arrival..."
              value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm" />
          </div>
          <Link href="/dashboard/landingpage/ongoingfare/new"
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-md font-medium">
            <Plus className="w-5 h-5" /> Add Fare
          </Link>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Total Fares', value: fares.length, bg: 'bg-orange-50', color: 'text-orange-600' },
            { label: 'Active', value: active, bg: 'bg-green-50', color: 'text-green-600' },
            { label: 'Draft', value: draft, bg: 'bg-amber-50', color: 'text-amber-600' },
          ].map(({ label, value, bg, color }) => (
            <div key={label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 text-sm font-medium">{label}</span>
                <div className={`p-2 ${bg} rounded-lg`}>
                  <Plane className={`w-5 h-5 ${color}`} />
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
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No fares found</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery ? 'No fares match your search.' : 'Add your first ongoing fare.'}
            </p>
            {!searchQuery && (
              <Link href="/dashboard/landingpage/ongoingfare/new"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg font-medium">
                <Plus className="w-5 h-5" /> Add First Fare
              </Link>
            )}
          </div>
        )}

        {/* Grid */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(fare => (
              <div key={fare.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group">

                {/* Image */}
                <div className="relative h-40 overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100">
                  {fare.image ? (
                    <img src={fare.image} alt={fare.alt || fare.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={e => { e.currentTarget.style.display = 'none'; }} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Plane className="w-12 h-12 text-orange-300" />
                    </div>
                  )}

                  <div className="absolute top-3 left-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${fare.status === 'active' ? 'bg-gray-900 text-white' : 'bg-white/90 text-gray-600 border border-gray-200'
                      }`}>
                      {fare.status === 'active' ? 'Active' : 'Draft'}
                    </span>
                  </div>

                  <div className="absolute top-3 right-3">
                    <button onClick={() => setShowMenu(showMenu === fare.id ? null : fare.id)}
                      className="p-1.5 bg-white rounded-lg shadow-md hover:bg-gray-50">
                      <MoreVertical className="w-4 h-4 text-gray-600" />
                    </button>
                    {showMenu === fare.id && (
                      <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                        <Link href={`/dashboard/landingpage/ongoingfare/${fare.id}`}
                          className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                          Edit
                        </Link>
                        <button onClick={() => { handleDelete(fare.id); setShowMenu(null); }}
                          className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                          <Trash2 className="w-4 h-4" /> Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{fare.title}</h3>

                  {/* Route */}
                  <div className="flex items-center gap-2 mb-3">
                    <Plane className="w-4 h-4 text-blue-500 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{fare.departure}</span>
                    <ArrowRight className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <span className="text-sm font-medium text-gray-700">{fare.arrival}</span>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                    <div>
                      <span className="text-lg font-bold text-orange-500">{fare.discountedPrice}</span>
                      {fare.discount && <span className="text-sm text-green-600 ml-2">{fare.discount}</span>}
                    </div>
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
