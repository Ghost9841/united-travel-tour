'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Plus, MoreVertical, Eye, Heart, Star, MapPin,
  Trash2, Edit, Globe2, FileText, Calendar,
} from 'lucide-react';

interface ExploreItem {
  id: string;
  title: string;
  description: string;
  location: string;
  price: number;
  discountedPrice: number;
  image: string;
  rating: number;
  category: string;
  duration: string;
  status: 'active' | 'draft';
  views?: number;
  likes?: number;
  createdAt: string;
}

const CATEGORIES = ['City Tour', 'Historical', 'Romantic', 'Adventure'];

const CATEGORY_COLORS: Record<string, string> = {
  'City Tour':  'bg-violet-100 text-violet-700',
  'Historical': 'bg-amber-100 text-amber-700',
  'Romantic':   'bg-pink-100 text-pink-700',
  'Adventure':  'bg-green-100 text-green-700',
};

const MOCK: ExploreItem[] = [
  { id: '1',  title: 'Romantic Lisbon Getaway',      description: 'Explore the charming streets of Lisbon with a luxury stay, daily breakfast, and guided city tours.',                           location: 'Lisbon, Portugal',         price: 700,  discountedPrice: 500,  image: 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=600&fit=crop',  rating: 5,   category: 'City Tour',  duration: '5 days', status: 'active', views: 4200,  likes: 980,  createdAt: new Date(Date.now() - 86400000 * 80).toISOString() },
  { id: '2',  title: 'Historic Athens Experience',   description: 'Discover ancient wonders of Greece with a premium hotel stay, meals included, and cultural sightseeing.',                      location: 'Athens, Greece',           price: 1000, discountedPrice: 800,  image: 'https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&h=600&fit=crop',  rating: 5,   category: 'Historical', duration: '6 days', status: 'active', views: 6100,  likes: 1420, createdAt: new Date(Date.now() - 86400000 * 70).toISOString() },
  { id: '3',  title: 'Classic Rome Holiday',         description: 'Enjoy the timeless beauty of Rome with a 5-star hotel, breakfast, and guided historical tours.',                              location: 'Rome, Italy',              price: 900,  discountedPrice: 750,  image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop',  rating: 5,   category: 'Historical', duration: '7 days', status: 'active', views: 7800,  likes: 2100, createdAt: new Date(Date.now() - 86400000 * 60).toISOString() },
  { id: '4',  title: 'Paris City of Love',           description: 'A romantic escape to Paris including luxury accommodation, breakfast, and city exploration.',                                  location: 'Paris, France',            price: 1200, discountedPrice: 950,  image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop', rating: 5,   category: 'Romantic',   duration: '5 days', status: 'active', views: 11200, likes: 3400, createdAt: new Date(Date.now() - 86400000 * 50).toISOString() },
  { id: '5',  title: 'Venice Canal Escape',          description: "Experience Venice's iconic canals with a premium stay, gondola ride, and breakfast included.",                                location: 'Venice, Italy',            price: 1100, discountedPrice: 880,  image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop', rating: 5,   category: 'Romantic',   duration: '4 days', status: 'active', views: 8900,  likes: 2650, createdAt: new Date(Date.now() - 86400000 * 45).toISOString() },
  { id: '6',  title: 'Barcelona City Highlights',    description: "Discover Gaudí's masterpieces and vibrant culture with guided tours and premium accommodation.",                              location: 'Barcelona, Spain',         price: 950,  discountedPrice: 780,  image: 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop', rating: 4.5, category: 'City Tour',  duration: '6 days', status: 'active', views: 5400,  likes: 1580, createdAt: new Date(Date.now() - 86400000 * 40).toISOString() },
  { id: '7',  title: 'Amsterdam Canal Adventure',    description: 'Explore the charming canals, historic houses, and vibrant culture of Amsterdam with guided tours.',                           location: 'Amsterdam, Netherlands',   price: 850,  discountedPrice: 680,  image: 'https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop', rating: 4.5, category: 'City Tour',  duration: '5 days', status: 'active', views: 4800,  likes: 1230, createdAt: new Date(Date.now() - 86400000 * 35).toISOString() },
  { id: '8',  title: 'Santorini Sunset Paradise',    description: 'Experience breathtaking sunsets, white-washed buildings, and crystal blue waters in Santorini.',                             location: 'Santorini, Greece',        price: 1300, discountedPrice: 1050, image: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop', rating: 5,   category: 'Romantic',   duration: '5 days', status: 'active', views: 9400,  likes: 2870, createdAt: new Date(Date.now() - 86400000 * 30).toISOString() },
  { id: '9',  title: 'Prague Medieval Tour',         description: "Walk through centuries of history in Prague's stunning old town with castle tours and local cuisine.",                       location: 'Prague, Czech Republic',   price: 750,  discountedPrice: 580,  image: 'https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=600&fit=crop', rating: 4.5, category: 'Historical', duration: '6 days', status: 'active', views: 3900,  likes: 1040, createdAt: new Date(Date.now() - 86400000 * 25).toISOString() },
  { id: '10', title: 'Swiss Alps Adventure',         description: 'Experience the majestic Swiss Alps with mountain excursions, scenic trains, and luxury alpine resorts.',                     location: 'Interlaken, Switzerland',  price: 1400, discountedPrice: 1150, image: 'https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop', rating: 5,   category: 'Adventure',  duration: '7 days', status: 'active', views: 7200,  likes: 2180, createdAt: new Date(Date.now() - 86400000 * 20).toISOString() },
  { id: '11', title: 'Vienna Imperial Experience',   description: "Discover Vienna's imperial palaces, classical music heritage, and world-famous coffee culture.",                             location: 'Vienna, Austria',          price: 900,  discountedPrice: 720,  image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=600&fit=crop', rating: 4.5, category: 'Historical', duration: '5 days', status: 'active', views: 4100,  likes: 1090, createdAt: new Date(Date.now() - 86400000 * 15).toISOString() },
  { id: '12', title: 'Dublin Irish Heritage',        description: 'Immerse yourself in Irish culture with pub tours, historical sites, and the scenic Cliffs of Moher.',                       location: 'Dublin, Ireland',          price: 800,  discountedPrice: 650,  image: 'https://images.unsplash.com/photo-1549918864-48ac978761a4?w=800&h=600&fit=crop', rating: 4,   category: 'City Tour',  duration: '6 days', status: 'draft',  views: 2600,  likes: 680,  createdAt: new Date(Date.now() - 86400000 * 10).toISOString() },
  { id: '13', title: 'Budapest Thermal Spa',         description: "Relax in historic thermal baths and explore Budapest's stunning architecture along the Danube.",                             location: 'Budapest, Hungary',        price: 700,  discountedPrice: 550,  image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&h=600&fit=crop', rating: 4.5, category: 'City Tour',  duration: '5 days', status: 'draft',  views: 3100,  likes: 790,  createdAt: new Date(Date.now() - 86400000 * 5).toISOString()  },
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

function ExploreCard({ item, onDelete }: { item: ExploreItem; onDelete: () => void }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const saving = item.price - item.discountedPrice;
  const discountPct = item.price > 0 ? Math.round((saving / item.price) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-52 overflow-hidden">
        <img src={item.image} alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

        {saving > 0 && (
          <div className="absolute top-3 left-3 flex gap-1.5">
            <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">Save £{saving}</span>
            <span className="bg-green-500 text-white px-2.5 py-1 rounded-full text-xs font-bold shadow-sm">{discountPct}% OFF</span>
          </div>
        )}

        <div className="absolute bottom-3 left-3">
          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${
            item.status === 'active' ? 'bg-gray-900 text-white' : 'bg-white/90 text-gray-600 border border-gray-200'
          }`}>{item.status === 'active' ? 'Active' : 'Draft'}</span>
        </div>

        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-full px-2.5 py-1 shadow-sm">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-bold text-gray-800">{item.rating}</span>
        </div>

        <div className="absolute top-3 right-3">
          <div className="relative">
            <button onClick={() => setMenuOpen(o => !o)}
              className="p-1.5 bg-white rounded-lg hover:bg-gray-50 shadow-md transition-colors">
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </button>
            {menuOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                <Link href={`/dashboard/explore/${item.id}`}
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
          <h3 className="text-base font-bold text-gray-900 line-clamp-1 group-hover:text-orange-500 transition-colors">{item.title}</h3>
          <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${CATEGORY_COLORS[item.category] ?? 'bg-gray-100 text-gray-600'}`}>
            {item.category}
          </span>
        </div>

        <div className="flex items-center gap-1 text-sm text-gray-500 mb-2">
          <MapPin className="w-3.5 h-3.5 text-orange-500" />{item.location}
        </div>

        <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-3">
          <Calendar className="w-3.5 h-3.5 text-orange-400" />{item.duration}
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{item.description}</p>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div>
            <p className="text-xs text-gray-400">From</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-orange-500">£{item.discountedPrice}</span>
              {item.price !== item.discountedPrice && (
                <span className="text-xs text-gray-400 line-through">£{item.price}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{formatNumber(item.views ?? 0)}</span>
            <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{formatNumber(item.likes ?? 0)}</span>
          </div>
        </div>
        <div className="mt-2 pt-2 border-t border-gray-100 text-right">
          <span className="text-xs text-gray-400">{formatRelativeTime(new Date(item.createdAt))}</span>
        </div>
      </div>
    </div>
  );
}

export default function ExploreAdminPage() {
  const [items, setItems] = useState<ExploreItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft'>('all');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    // Replace with: const res = await fetch('/api/explore'); const data = await res.json(); setItems(data);
    setTimeout(() => { setItems(MOCK); setLoading(false); }, 600);
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this explore item?')) return;
    // Replace with: await fetch(`/api/explore/${id}`, { method: 'DELETE' });
    setItems(prev => prev.filter(i => i.id !== id));
  };

  const active = items.filter(i => i.status === 'active').length;
  const drafts = items.filter(i => i.status === 'draft').length;
  const totalLikes = items.reduce((s, i) => s + (i.likes ?? 0), 0);
  const avgRating = items.length
    ? (items.reduce((s, i) => s + i.rating, 0) / items.length).toFixed(1) : '0';

  const filtered = items.filter(i => {
    const q = searchQuery.toLowerCase();
    const matchSearch =
      i.title.toLowerCase().includes(q) ||
      i.location.toLowerCase().includes(q) ||
      i.description.toLowerCase().includes(q);
    const matchStatus = filterStatus === 'all' || i.status === filterStatus;
    const matchCategory = !filterCategory || i.category === filterCategory;
    return matchSearch && matchStatus && matchCategory;
  });

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading explore items...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900">Explore</h1>
            <p className="mt-1 text-gray-500">Manage your curated explore destination packages</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Search explore..."
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-56 pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-full text-sm focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm" />
            </div>
            <Link href="/dashboard/explore/new"
              className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-md hover:shadow-lg font-semibold text-sm">
              <Plus className="w-4 h-4" /> Add Item
            </Link>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard label="Active"      value={active}                   icon={Globe2}   accent="bg-orange-50 text-orange-600" />
          <StatCard label="Drafts"      value={drafts}                   icon={FileText} accent="bg-amber-50 text-amber-600" />
          <StatCard label="Avg Rating"  value={avgRating}                icon={Star}     accent="bg-yellow-50 text-yellow-600" />
          <StatCard label="Total Likes" value={formatNumber(totalLikes)} icon={Heart}    accent="bg-red-50 text-red-500" />
        </div>

        {/* Status tabs */}
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

        {/* Category pills — mirrors your frontend filters */}
        <div className="flex flex-wrap gap-2">
          <button onClick={() => setFilterCategory('')}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              !filterCategory ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600'
            }`}>All Categories</button>
          {CATEGORIES.map(cat => (
            <button key={cat} onClick={() => setFilterCategory(cat === filterCategory ? '' : cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                filterCategory === cat ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600'
              }`}>{cat}</button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Globe2 className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
            <p className="text-gray-500 text-sm mb-6">
              {searchQuery ? 'Try a different search term.' : 'Start by adding your first explore item.'}
            </p>
            {!searchQuery && (
              <Link href="/dashboard/explore/new"
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-full hover:bg-orange-600 transition-all font-semibold text-sm shadow-md">
                <Plus className="w-4 h-4" /> Add Item
              </Link>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map(item => (
                <ExploreCard key={item.id} item={item} onDelete={() => handleDelete(item.id)} />
              ))}
            </div>
            <p className="text-center text-xs text-gray-400">
              Showing {filtered.length} of {items.length} items
            </p>
          </>
        )}
      </div>
    </div>
  );
}