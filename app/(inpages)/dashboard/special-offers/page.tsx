'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Plus, MoreVertical, Eye, Heart, Star, MapPin,
  Trash2, Edit, Tag, DollarSign, FileText, Percent, Ticket,
} from 'lucide-react';

interface SpecialOffer {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  discountedPrice: number;
  image: string;
  rating: number;
  status: 'active' | 'draft';
  views?: number;
  likes?: number;
  createdAt: string;
}

const MOCK: SpecialOffer[] = [
  {
    id: '1',
    title: 'London ⇄ Kathmandu ⇄ London (Two Way)',
    description: 'Fly London ⇄ Kathmandu ⇄ London with Qatar Airways from £900 (subject to availability). Includes 40KG baggage. Limited seats, so book early. Call 020 3725 3460 for dates, fare rules, and quick booking support. Terms apply.',
    location: 'London, Kathmandu',
    price: 1000, discountedPrice: 900, rating: 5,
    image: '/2026/populardestination/ktmtolondon.jpeg',
    status: 'active', views: 4200, likes: 980,
    createdAt: new Date(Date.now() - 86400000 * 60).toISOString(),
  },
  {
    id: '2',
    title: 'London ⇄ Kathmandu',
    description: 'Fly London ⇄ Kathmandu with Qatar Airways at promo fares from £370 (subject to availability). Enjoy a generous 40KG baggage allowance and smooth connections. Limited seats available, so book early.',
    location: 'London, Kathmandu',
    price: 400, discountedPrice: 370, rating: 5,
    image: '/2026/populardestination/ktmtolondon_2.jpeg',
    status: 'active', views: 6100, likes: 1420,
    createdAt: new Date(Date.now() - 86400000 * 45).toISOString(),
  },
  {
    id: '3',
    title: 'Extra Add Luggage',
    description: 'Need extra baggage for your flight? United Travels can help you add checked baggage fast and hassle-free. Avoid last-minute airport charges by arranging it in advance.',
    location: '',
    price: 0, discountedPrice: 0, rating: 5,
    image: '/2026/populardestination/luggage.jpeg',
    status: 'active', views: 2800, likes: 540,
    createdAt: new Date(Date.now() - 86400000 * 30).toISOString(),
  },
  {
    id: '4',
    title: 'Fly Anywhere',
    description: 'Planning to fly anywhere, with any airline? Contact United Travel and Tours Limited for fast, friendly help and great fares. We specialise in routes to India, Nepal, Pakistan, Bhutan, and Bangladesh.',
    location: 'London',
    price: 0, discountedPrice: 0, rating: 5,
    image: '/2026/populardestination/udyoplane.jpeg',
    status: 'active', views: 5300, likes: 1230,
    createdAt: new Date(Date.now() - 86400000 * 20).toISOString(),
  },
  {
    id: '5',
    title: 'Venice Canal Escape',
    description: 'Experience Venice\'s iconic canals with a premium stay, gondola ride, and breakfast included.',
    location: 'Venice, Italy',
    price: 1100, discountedPrice: 880, rating: 5,
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop',
    status: 'draft', views: 1900, likes: 420,
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

function OfferCard({ offer, onDelete }: { offer: SpecialOffer; onDelete: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const saving = offer.price > 0 && offer.price !== offer.discountedPrice
    ? offer.price - offer.discountedPrice
    : null;
  const discountPct = offer.price > 0
    ? Math.round(((offer.price - offer.discountedPrice) / offer.price) * 100)
    : null;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      {/* Image */}
      <div className="relative h-52 overflow-hidden">
        {offer.image ? (
          <img
            src={offer.image} alt={offer.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop'; }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-orange-100 to-amber-100 flex items-center justify-center">
            <Ticket className="w-16 h-16 text-orange-300" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

        {/* Save badge */}
        {saving && saving > 0 && (
          <div className="absolute top-3 left-3">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
              Save £{saving}
            </span>
          </div>
        )}

        {/* Discount % */}
        {discountPct && discountPct > 0 && (
          <div className="absolute top-3 left-24">
            <span className="bg-green-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">
              {discountPct}% OFF
            </span>
          </div>
        )}

        {/* Status */}
        <div className="absolute bottom-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
            offer.status === 'active'
              ? 'bg-gray-900 text-white'
              : 'bg-white/90 text-gray-600 border border-gray-200'
          }`}>{offer.status === 'active' ? 'Active' : 'Draft'}</span>
        </div>

        {/* Rating */}
        <div className="absolute bottom-3 right-3 flex items-center gap-0.5 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
          {[...Array(offer.rating)].map((_, i) => (
            <Star key={i} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
          ))}
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
                <Link href={`/dashboard/special-offers/${offer.id}`}
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

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-bold text-gray-900 line-clamp-1 group-hover:text-orange-500 transition-colors mb-1">
          {offer.title}
        </h3>

        {offer.location && (
          <div className="flex items-center gap-1 text-sm text-gray-500 mb-3">
            <MapPin className="w-3.5 h-3.5 text-orange-500" />
            {offer.location}
          </div>
        )}

        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{offer.description}</p>

        {/* Price */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          {offer.discountedPrice > 0 ? (
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-bold text-orange-500">£{offer.discountedPrice}</span>
                {offer.price !== offer.discountedPrice && (
                  <span className="text-sm text-gray-400 line-through">£{offer.price}</span>
                )}
              </div>
              <p className="text-xs text-gray-400">Per person</p>
            </div>
          ) : (
            <span className="text-sm font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
              Contact for price
            </span>
          )}
        </div>

        {/* Stats footer */}
        <div className="flex items-center justify-between pt-3 mt-2 border-t border-gray-100 text-sm text-gray-400">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{formatNumber(offer.views ?? 0)}</span>
            <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{formatNumber(offer.likes ?? 0)}</span>
          </div>
          <span className="text-xs">{formatRelativeTime(new Date(offer.createdAt))}</span>
        </div>
      </div>
    </div>
  );
}

export default function SpecialOffersPage() {
  const [offers, setOffers] = useState<SpecialOffer[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft'>('all');

  useEffect(() => {
    // Replace with: const res = await fetch('/api/special-offers'); const data = await res.json(); setOffers(data);
    setTimeout(() => { setOffers(MOCK); setLoading(false); }, 600);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this offer?')) return;
    // Replace with: await fetch(`/api/special-offers/${id}`, { method: 'DELETE' });
    setOffers(prev => prev.filter(o => o.id !== id));
  };

  const active = offers.filter(o => o.status === 'active').length;
  const drafts = offers.filter(o => o.status === 'draft').length;
  const totalLikes = offers.reduce((s, o) => s + (o.likes ?? 0), 0);
  const totalSavings = offers.reduce((s, o) => s + Math.max(0, o.price - o.discountedPrice), 0);

  const filtered = offers.filter(o => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      o.title.toLowerCase().includes(q) ||
      o.description.toLowerCase().includes(q) ||
      o.location.toLowerCase().includes(q);
    const matchStatus = filterStatus === 'all' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading offers...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Special Offers</h1>
            <p className="mt-1 text-gray-500">Manage your deals, discounts and promotions</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search offers..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-56 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm" />
            </div>
            <Link href="/dashboard/special-offers/new"
              className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-lg font-semibold text-sm">
              <Plus className="w-4 h-4" /> Add Offer
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Active Offers"  value={active}                      icon={Ticket}    accent="bg-orange-50 text-orange-600" />
          <StatCard label="Drafts"         value={drafts}                      icon={FileText}  accent="bg-amber-50 text-amber-600" />
          <StatCard label="Total Savings"  value={`£${totalSavings}`}          icon={Percent}   accent="bg-green-50 text-green-600" />
          <StatCard label="Total Likes"    value={formatNumber(totalLikes)}    icon={Heart}     accent="bg-red-50 text-red-500" />
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
              <Ticket className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No offers found</h3>
            <p className="text-gray-500 text-sm mb-6">
              {searchQuery ? 'Try a different search term.' : 'Start by adding your first special offer.'}
            </p>
            {!searchQuery && (
              <Link href="/dashboard/special-offers/new"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all font-semibold text-sm shadow-md">
                <Plus className="w-4 h-4" /> Add Offer
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(offer => (
                <OfferCard key={offer.id} offer={offer} onDelete={() => handleDelete(offer.id)} />
              ))}
            </div>
            <p className="text-center text-xs text-gray-400">
              Showing {filtered.length} of {offers.length} offers
            </p>
          </>
        )}
      </div>
    </div>
  );
}