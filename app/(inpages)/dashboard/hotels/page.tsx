'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Plus, MoreVertical, Star, MapPin,
  Trash2, Edit, Wifi, Coffee, Car, Dumbbell, Users,
  Hotel, FileText, Check,
} from 'lucide-react';

interface HotelItem {
  id: number;
  name: string;
  location: string;
  description: string;
  pricePerNight: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  roomType: string;
  capacity: string;
  status: 'active' | 'draft';
  views?: number;
  likes?: number;
  createdAt: string;
  updatedAt?: string;
}

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

function AmenityIcon({ amenity }: { amenity: string }) {
  const a = amenity.toLowerCase();
  if (a.includes('wifi')) return <Wifi className="w-3.5 h-3.5" />;
  if (a.includes('restaurant') || a.includes('breakfast')) return <Coffee className="w-3.5 h-3.5" />;
  if (a.includes('parking')) return <Car className="w-3.5 h-3.5" />;
  if (a.includes('gym')) return <Dumbbell className="w-3.5 h-3.5" />;
  return <Check className="w-3.5 h-3.5" />;
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

function HotelCard({ hotel, onDelete }: { hotel: HotelItem; onDelete: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const discount = hotel.originalPrice - hotel.pricePerNight;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-52 overflow-hidden">
        {hotel.images && hotel.images.length > 0 ? (
          <img src={hotel.images[0]} alt={hotel.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
            <Hotel className="w-16 h-16 text-orange-300" />
          </div>
        )}
        {/* Room type badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
            {hotel.roomType}
          </span>
        </div>
        {/* Status */}
        <div className="absolute bottom-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
            hotel.status === 'active' ? 'bg-gray-900 text-white' : 'bg-white/90 text-gray-600 border border-gray-200'
          }`}>{hotel.status === 'active' ? 'Active' : 'Draft'}</span>
        </div>
        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold text-gray-800">{hotel.rating}</span>
          <span className="text-xs text-gray-500">({hotel.reviews})</span>
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
                <Link href={`/dashboard/hotels/${hotel.id}`}
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
        <h3 className="text-lg font-bold text-gray-900 line-clamp-1 group-hover:text-orange-500 transition-colors mb-1">
          {hotel.name}
        </h3>
        <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
          <MapPin className="w-3.5 h-3.5 text-orange-500" />{hotel.location}
        </div>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{hotel.description}</p>

        {/* Amenity icons */}
        <div className="flex items-center gap-2 text-gray-400 mb-3">
          {hotel.amenities.slice(0, 4).map(a => (
            <span key={a} title={a}><AmenityIcon amenity={a} /></span>
          ))}
          {hotel.amenities.length > 4 && (
            <span className="text-xs text-gray-400">+{hotel.amenities.length - 4}</span>
          )}
        </div>

        {/* Amenity pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {hotel.amenities.slice(0, 3).map(a => (
            <span key={a} className="text-xs bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full">{a}</span>
          ))}
          {hotel.amenities.length > 3 && (
            <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">+{hotel.amenities.length - 3}</span>
          )}
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Users className="w-3.5 h-3.5" />{hotel.capacity}
          </div>
          <div className="text-right">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-orange-500">£{hotel.pricePerNight}</span>
              <span className="text-xs text-gray-400 line-through">£{hotel.originalPrice}</span>
            </div>
            <span className="text-xs text-gray-400">per night</span>
          </div>
        </div>

        <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100 text-sm text-gray-400">
          <span className="text-xs">{formatRelativeTime(new Date(hotel.createdAt))}</span>
        </div>
      </div>
    </div>
  );
}

export default function HotelsPage() {
  const [hotels, setHotels] = useState<HotelItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft'>('all');

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch('/api/hotels');
        const data = await res.json();
        if (data.success) {
          const transformedData = data.data.map((item: any) => ({
            ...item,
            status: item.status || 'active',
            views: item.views || Math.floor(Math.random() * 15000),
            likes: item.likes || Math.floor(Math.random() * 5000),
          }));
          setHotels(transformedData);
        } else {
          console.error('Failed to fetch hotels:', data.error);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this hotel?')) return;
    try {
      const res = await fetch(`/api/hotels/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        setHotels(prev => prev.filter(h => h.id !== id));
      } else {
        console.error('Failed to delete hotel:', data.error);
        alert('Failed to delete hotel: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting hotel:', error);
      alert('Error deleting hotel');
    }
  };

  const active = hotels.filter(h => h.status === 'active').length;
  const drafts = hotels.filter(h => h.status === 'draft').length;

  const filtered = hotels.filter(h => {
    const q = searchQuery.toLowerCase();
    const matchSearch = h.name.toLowerCase().includes(q) || h.location.toLowerCase().includes(q) || h.roomType.toLowerCase().includes(q);
    const matchStatus = filterStatus === 'all' || h.status === filterStatus;
    return matchSearch && matchStatus;
  });

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading hotels...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Hotels</h1>
            <p className="mt-1 text-gray-500">Manage your hotel listings and track performance</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search hotels..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-56 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm" />
            </div>
            <Link href="/dashboard/hotels/new"
              className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-lg font-semibold text-sm">
              <Plus className="w-4 h-4" /> Add Hotel
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Active Hotels" value={active} icon={Hotel} accent="bg-orange-50 text-orange-600" />
          <StatCard label="Drafts" value={drafts} icon={FileText} accent="bg-amber-50 text-amber-600" />
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
              <Hotel className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No hotels found</h3>
            <p className="text-gray-500 text-sm mb-6">
              {searchQuery ? 'Try a different search term.' : 'Start by adding your first hotel.'}
            </p>
            {!searchQuery && (
              <Link href="/dashboard/hotels/new"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all font-semibold text-sm shadow-md">
                <Plus className="w-4 h-4" /> Add Hotel
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(hotel => (
                <HotelCard key={hotel.id} hotel={hotel} onDelete={() => handleDelete(hotel.id)} />
              ))}
            </div>
            <p className="text-center text-xs text-gray-400">
              Showing {filtered.length} of {hotels.length} hotels
            </p>
          </>
        )}
      </div>
    </div>
  );
}