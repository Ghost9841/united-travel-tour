'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Plus, MoreVertical, Eye, Heart, MapPin,
  Trash2, Edit, Globe2, FileText, Image as ImageIcon,
} from 'lucide-react';

interface PopularDestination {
  id: string;
  name: string;
  location: string;
  description: string;
  src: string;
  alt: string;
  status: 'active' | 'draft';
  views?: number;
  likes?: number;
  createdAt: string;
}

const MOCK: PopularDestination[] = [
  {
    id: '1', name: 'Pasupati Nath', location: 'Kathmandu, Nepal',
    description: 'Pashupatinath Temple is one of the most sacred Hindu temples in the world, dedicated to Lord Shiva in his form as Pashupati.',
    src: '/2026/pasupati_nath.jpeg', alt: 'Pasupati Nath Temple',
    status: 'active', views: 5400, likes: 1230,
    createdAt: new Date(Date.now() - 86400000 * 90).toISOString(),
  },
  {
    id: '2', name: 'Millennium Bridge', location: 'London, United Kingdom',
    description: 'A modern pedestrian bridge offering stunning views of the Thames and London\'s iconic skyline.',
    src: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=1200&h=800&fit=crop', alt: 'Millennium Bridge London',
    status: 'active', views: 8200, likes: 2100,
    createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
  },
  {
    id: '3', name: 'Rara Lake', location: 'Mugu & Jumla, Nepal',
    description: 'Rara Lake, also known as Mahendra Lake, is the largest fresh water lake in the Nepalese Himalayas.',
    src: '/2026/rara_lake.jpeg', alt: 'Rara Lake Nepal',
    status: 'active', views: 4100, likes: 980,
    createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
  },
  {
    id: '4', name: 'Phewa Lake', location: 'Pokhara Valley',
    description: 'Phewa Lake is the third largest lake in Nepal and the largest in Gandaki Province.',
    src: '/2026/phewa_lake.jpeg', alt: 'Phewa Lake Pokhara',
    status: 'active', views: 6700, likes: 1780,
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: '5', name: 'Patan Durbar Square', location: 'Patan, Nepal',
    description: 'An ancient royal square showcasing some of the finest examples of Newari architecture and craftsmanship.',
    src: 'https://images.unsplash.com/photo-1552832860-cfde47f1dda5?w=1200&h=800&fit=crop', alt: 'Patan Durbar Square',
    status: 'draft', views: 2900, likes: 640,
    createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
  },
];

function formatRelativeTime(date: Date) {
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

function DestCard({ dest, onDelete }: { dest: PopularDestination; onDelete: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {dest.src ? (
          <img src={dest.src} alt={dest.alt}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=800&h=600&fit=crop'; }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
            <Globe2 className="w-16 h-16 text-orange-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Status */}
        <div className="absolute top-3 left-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold shadow-sm ${
            dest.status === 'active' ? 'bg-gray-900 text-white' : 'bg-white/90 text-gray-600 border border-gray-200'
          }`}>{dest.status === 'active' ? 'Active' : 'Draft'}</span>
        </div>

        {/* Menu */}
        <div className="absolute top-3 right-3">
          <div className="relative">
            <button onClick={() => setMenuOpen(o => !o)}
              className="p-1.5 bg-white rounded-lg hover:bg-gray-50 shadow-md transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                <Link href={`/dashboard/popular-destinations/${dest.id}`}
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

        {/* Name overlay on image bottom */}
        <div className="absolute bottom-3 left-3 right-3 text-white">
          <p className="font-bold text-base drop-shadow-lg line-clamp-1">{dest.name}</p>
          <div className="flex items-center gap-1 text-xs mt-0.5 text-gray-200">
            <MapPin className="w-3 h-3" />{dest.location}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <p className="text-sm text-gray-600 line-clamp-2 mb-3">{dest.description}</p>

        {/* Alt text pill */}
        <div className="flex items-center gap-1.5 mb-4">
          <ImageIcon className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          <span className="text-xs text-gray-400 truncate font-mono">{dest.alt || '—'}</span>
        </div>

        {/* Stats footer */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{formatNumber(dest.views ?? 0)}</span>
            <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{formatNumber(dest.likes ?? 0)}</span>
          </div>
          <span className="text-xs">{formatRelativeTime(new Date(dest.createdAt))}</span>
        </div>
      </div>
    </div>
  );
}

export default function PopularDestinationsPage() {
  const [destinations, setDestinations] = useState<PopularDestination[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft'>('all');

  useEffect(() => {
    // Replace with: const res = await fetch('/api/popular-destinations'); const data = await res.json(); setDestinations(data);
    setTimeout(() => { setDestinations(MOCK); setLoading(false); }, 600);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this destination?')) return;
    // Replace with: await fetch(`/api/popular-destinations/${id}`, { method: 'DELETE' });
    setDestinations(prev => prev.filter(d => d.id !== id));
  };

  const active = destinations.filter(d => d.status === 'active').length;
  const drafts = destinations.filter(d => d.status === 'draft').length;
  const totalLikes = destinations.reduce((s, d) => s + (d.likes ?? 0), 0);

  const filtered = destinations.filter(d => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      d.name.toLowerCase().includes(q) ||
      d.location.toLowerCase().includes(q) ||
      d.description.toLowerCase().includes(q);
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
            <h1 className="text-4xl font-bold text-gray-900">Popular Destinations</h1>
            <p className="mt-1 text-gray-500">Manage the carousel destinations shown on the homepage</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search destinations..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-56 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm" />
            </div>
            <Link href="/dashboard/popular-destinations/new"
              className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-lg font-semibold text-sm">
              <Plus className="w-4 h-4" /> Add Destination
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Total" value={destinations.length} icon={Globe2} accent="bg-orange-50 text-orange-600" />
          <StatCard label="Active" value={active} icon={MapPin} accent="bg-amber-50 text-amber-600" />
          <StatCard label="Drafts" value={drafts} icon={FileText} accent="bg-yellow-50 text-yellow-600" />
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
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe2 className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No destinations found</h3>
            <p className="text-gray-500 text-sm mb-6">
              {searchQuery ? 'Try a different search term.' : 'Add your first popular destination.'}
            </p>
            {!searchQuery && (
              <Link href="/dashboard/popular-destinations/new"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all font-semibold text-sm shadow-md">
                <Plus className="w-4 h-4" /> Add Destination
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(dest => (
                <DestCard key={dest.id} dest={dest} onDelete={() => handleDelete(dest.id)} />
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