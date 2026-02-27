'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Plus, MoreVertical, Eye, Heart, Star, MapPin,
  Trash2, Edit, Globe2, Mountain, Umbrella, Camera,
  TrendingUp, DollarSign, Clock, Users, FileText,
} from 'lucide-react';

interface Destination {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl?: string;
  category: string;
  rating: number;
  price: number;
  duration: string;
  bestSeason: string;
  status: 'active' | 'draft';
  views?: number;
  likes?: number;
  featured?: boolean;
  createdAt: string;
}

const CATEGORY_COLORS: Record<string, string> = {
  Beach: 'bg-cyan-100 text-cyan-700',
  Mountain: 'bg-slate-100 text-slate-700',
  City: 'bg-violet-100 text-violet-700',
  Cultural: 'bg-amber-100 text-amber-700',
  Adventure: 'bg-orange-100 text-orange-700',
  Wildlife: 'bg-green-100 text-green-700',
  Desert: 'bg-yellow-100 text-yellow-700',
  Island: 'bg-teal-100 text-teal-700',
};

const MOCK: Destination[] = [
  {
    id: '1', name: 'Santorini', country: 'Greece',
    description: 'Iconic white-washed buildings perched on volcanic cliffs above the stunning Aegean Sea.',
    imageUrl: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&auto=format&fit=crop',
    category: 'Island', rating: 4.9, price: 2400, duration: '5-7 days', bestSeason: 'Summer',
    status: 'active', views: 12400, likes: 3820, featured: true,
    createdAt: new Date(Date.now() - 86400000 * 90).toISOString(),
  },
  {
    id: '2', name: 'Machu Picchu', country: 'Peru',
    description: 'Ancient Incan citadel set high in the Andes Mountains, shrouded in mist and mystery.',
    imageUrl: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=600&auto=format&fit=crop',
    category: 'Cultural', rating: 4.8, price: 1800, duration: '3-5 days', bestSeason: 'Spring',
    status: 'active', views: 9800, likes: 2910, featured: true,
    createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
  },
  {
    id: '3', name: 'Bali', country: 'Indonesia',
    description: 'Lush tropical paradise with terraced rice fields, ancient temples and world-class surf.',
    imageUrl: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=600&auto=format&fit=crop',
    category: 'Beach', rating: 4.7, price: 1200, duration: '1-2 weeks', bestSeason: 'Summer',
    status: 'active', views: 18200, likes: 5640, featured: false,
    createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
  },
  {
    id: '4', name: 'Patagonia', country: 'Argentina',
    description: 'Remote wilderness at the southern tip of South America — dramatic peaks and glaciers.',
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&auto=format&fit=crop',
    category: 'Adventure', rating: 4.9, price: 3200, duration: '1-2 weeks', bestSeason: 'Summer',
    status: 'draft', views: 4200, likes: 1390, featured: false,
    createdAt: new Date(Date.now() - 86400000 * 15).toISOString(),
  },
  {
    id: '5', name: 'Kyoto', country: 'Japan',
    description: "Japan's cultural heart — thousands of Buddhist temples, geisha districts and bamboo groves.",
    imageUrl: 'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=600&auto=format&fit=crop',
    category: 'Cultural', rating: 4.8, price: 2100, duration: '5-7 days', bestSeason: 'Spring',
    status: 'active', views: 15600, likes: 4720, featured: true,
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: '6', name: 'Sahara Desert', country: 'Morocco',
    description: 'Endless golden dunes stretching to the horizon, with camel treks and starlit camps.',
    imageUrl: 'https://images.unsplash.com/photo-1509316785289-025f5b846b35?w=600&auto=format&fit=crop',
    category: 'Desert', rating: 4.6, price: 1500, duration: '3-5 days', bestSeason: 'Autumn',
    status: 'active', views: 7300, likes: 2180, featured: false,
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
];

function formatRelativeTime(date: Date): string {
  const d = Math.floor((Date.now() - date.getTime()) / 86400000);
  if (d === 0) return 'Today';
  if (d === 1) return 'Yesterday';
  if (d < 30) return `${d} days ago`;
  const m = Math.floor(d / 30);
  return m < 12 ? `${m} month${m > 1 ? 's' : ''} ago` : `${Math.floor(m / 12)}y ago`;
}

function formatNumber(n: number) {
  return n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n);
}

function StatCard({ label, value, icon: Icon, accent }: {
  label: string; value: string | number; icon: React.ElementType; accent: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-500 text-sm font-medium">{label}</span>
        <div className={`p-2 rounded-xl ${accent}`}><Icon className="w-5 h-5" /></div>
      </div>
      <p className="text-4xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

function DestinationCard({ dest, onDelete }: { dest: Destination; onDelete: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-52 overflow-hidden">
        {dest.imageUrl ? (
          <img src={dest.imageUrl} alt={dest.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
            <Globe2 className="w-16 h-16 text-orange-300" />
          </div>
        )}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
            dest.status === 'active' ? 'bg-gray-900 text-white' : 'bg-white/90 text-gray-600 border border-gray-200'
          }`}>{dest.status === 'active' ? 'Active' : 'Draft'}</span>
          {dest.featured && (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-400 text-amber-900 shadow-sm">⭐ Featured</span>
          )}
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold text-gray-800">{dest.rating}</span>
        </div>
        <div className="absolute top-3 right-3">
          <div className="relative">
            <button onClick={() => setMenuOpen(o => !o)}
              className="p-1.5 bg-white rounded-lg hover:bg-gray-50 shadow-md transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                <Link href={`/dashboard/destinations/${dest.id}`}
                  className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                  <Edit className="w-4 h-4" /> Edit
                </Link>
                <button onClick={() => { onDelete(); setMenuOpen(false); }}
                  className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-2 mb-1">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-orange-500 transition-colors">
            {dest.name}
          </h3>
          <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_COLORS[dest.category] ?? 'bg-gray-100 text-gray-600'}`}>
            {dest.category}
          </span>
        </div>
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <MapPin className="w-3.5 h-3.5 text-orange-500" />{dest.country}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{dest.description}</p>
        <div className="flex items-center gap-3 text-xs text-gray-500 mb-4">
          <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5" />
            <span className="font-semibold text-gray-800">${dest.price.toLocaleString()}</span>
          </span>
          <span className="w-px h-3 bg-gray-200" />
          <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{dest.duration}</span>
          <span className="w-px h-3 bg-gray-200" />
          <span className="flex items-center gap-1"><Users className="w-3.5 h-3.5" />{dest.bestSeason}</span>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{formatNumber(dest.views ?? 0)}</span>
            <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{formatNumber(dest.likes ?? 0)}</span>
          </div>
          <span className="text-xs">{formatRelativeTime(new Date(dest.createdAt))}</span>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ query, onCreate }: { query: string; onCreate: () => void }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
      <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
        <Globe2 className="w-10 h-10 text-orange-400" />
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">No destinations found</h3>
      <p className="text-gray-500 text-sm mb-6">
        {query ? 'Try a different search term or filter.' : 'Start by adding your first destination.'}
      </p>
      {!query && (
        <button onClick={onCreate}
          className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all font-semibold text-sm shadow-md">
          <Plus className="w-4 h-4" /> Add Destination
        </button>
      )}
    </div>
  );
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft'>('all');

  useEffect(() => {
    // Replace with: const res = await fetch('/api/destinations'); const data = await res.json(); setDestinations(data);
    setTimeout(() => { setDestinations(MOCK); setLoading(false); }, 600);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this destination?')) return;
    // Replace with: await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
    setDestinations(prev => prev.filter(d => d.id !== id));
  };

  const active = destinations.filter(d => d.status === 'active').length;
  const drafts = destinations.filter(d => d.status === 'draft').length;
  const featured = destinations.filter(d => d.featured).length;
  const totalLikes = destinations.reduce((s, d) => s + (d.likes ?? 0), 0);

  const filtered = destinations.filter(d => {
    const q = searchQuery.toLowerCase();
    const matchSearch = d.name.toLowerCase().includes(q) || d.country.toLowerCase().includes(q) || d.category.toLowerCase().includes(q);
    const matchStatus = filterStatus === 'all' || d.status === filterStatus;
    return matchSearch && matchStatus;
  });

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading destinations...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Destinations</h1>
            <p className="mt-1 text-gray-500">Manage your travel destinations and track performance</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text" placeholder="Search destinations..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-56 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
              />
            </div>
            <Link href="/dashboard/destinations/new"
              className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-lg font-semibold text-sm">
              <Plus className="w-4 h-4" /> Add Destination
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Active" value={active} icon={Globe2} accent="bg-orange-50 text-orange-600" />
          <StatCard label="Drafts" value={drafts} icon={FileText} accent="bg-amber-50 text-amber-600" />
          <StatCard label="Featured" value={featured} icon={Star} accent="bg-yellow-50 text-yellow-600" />
          <StatCard label="Total Likes" value={formatNumber(totalLikes)} icon={Heart} accent="bg-red-50 text-red-500" />
        </div>

        {/* Filter tabs */}
        <div className="flex items-center gap-1 border-b border-gray-200">
          {(['all', 'active', 'draft'] as const).map(tab => (
            <button key={tab} onClick={() => setFilterStatus(tab)}
              className={`relative px-4 py-2.5 text-sm font-medium capitalize transition-colors ${
                filterStatus === tab
                  ? 'text-orange-600 after:absolute after:bottom-[-1px] after:left-0 after:h-0.5 after:w-full after:bg-orange-500'
                  : 'text-gray-500 hover:text-gray-800'
              }`}>
              {tab}
              {tab !== 'all' && (
                <span className="ml-1.5 rounded-full bg-gray-100 px-1.5 py-0.5 text-xs font-normal text-gray-600">
                  {tab === 'active' ? active : drafts}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <EmptyState query={searchQuery} onCreate={() => {}} />
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(dest => (
                <DestinationCard key={dest.id} dest={dest} onDelete={() => handleDelete(dest.id)} />
              ))}
            </div>
            <p className="text-center text-xs text-gray-400">
              Showing {filtered.length} of {destinations.length} destinations
            </p>
          </>
        )}
      </div>
    </div>
  );
}