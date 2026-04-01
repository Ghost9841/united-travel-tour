'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search, Plus, MoreVertical, Eye, Heart, Star, MapPin,
  Trash2, Edit, Globe2, FileText, Calendar,
} from 'lucide-react';

interface ExploreItem {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  discountedPrice: number;
  image: string;
  rating: number;
  category: string;
  duration?: string;
  status?: 'active' | 'draft';
  views?: number;
  likes?: number;
  createdAt: string;
  updatedAt: string;
}

interface Category {
  id: number;
  name: string;
  color?: string;
  description?: string;
}


function getCategoryColor(categoryName: string, categories: Category[]): string {
  const category = categories.find(c => c.name === categoryName);
  return category?.color ?? 'bg-gray-100 text-gray-600';
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

function ExploreCard({ item, onDelete, categories }: { item: ExploreItem; onDelete: () => void; categories: Category[] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const saving = item.price - item.discountedPrice;
  const discountPct = item.price > 0 ? Math.round((saving / item.price) * 100) : 0;

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="relative h-52 overflow-hidden">
        <img src={item.image} alt={item.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />

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
          <span className={`shrink-0 text-xs font-medium px-2.5 py-1 rounded-full ${getCategoryColor(item.category, categories)}`}>
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
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'active' | 'draft'>('all');
  const [filterCategory, setFilterCategory] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesRes = await fetch('/api/categories');
        const categoriesData = await categoriesRes.json();
        if (categoriesData.success) {
          setCategories(categoriesData.data);
        }

        // Fetch explore items
        const res = await fetch('/api/explore');
        const data = await res.json();
        if (data.success) {
          // Transform API data to match component expectations
          const transformedData = data.data.map((item: any) => ({
            ...item,
            duration: item.duration || "5 Days / 4 Nights", // Default duration
            status: item.status || 'active', // Default status
            views: item.views || Math.floor(Math.random() * 10000), // Mock views for now
            likes: item.likes || Math.floor(Math.random() * 3000), // Mock likes for now
          }));
          setItems(transformedData);
        } else {
          console.error('Failed to fetch explore data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this explore item?')) return;

    try {
      const res = await fetch(`/api/explore?id=${id}`, { method: 'DELETE' });
      const data = await res.json();

      if (data.success) {
        setItems(prev => prev.filter(i => i.id !== id));
      } else {
        console.error('Failed to delete explore item:', data.error);
        alert('Failed to delete item: ' + data.error);
      }
    } catch (error) {
      console.error('Error deleting explore item:', error);
      alert('Error deleting item');
    }
  };

  const active = items.filter(i => i.status === 'active').length;
  const drafts = items.filter(i => i.status === 'draft').length;

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
          {categories.map(cat => (
            <button key={cat.id} onClick={() => setFilterCategory(cat.name === filterCategory ? '' : cat.name)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                filterCategory === cat.name ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-600 border-gray-200 hover:border-orange-300 hover:text-orange-600'
              }`}>{cat.name}</button>
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
                <ExploreCard key={item.id} item={item} onDelete={() => handleDelete(item.id)} categories={categories} />
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