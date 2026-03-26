'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Eye, Heart, FileText, Edit, Trash2, X, Images } from 'lucide-react';
import Link from 'next/link';

interface Blog {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image: string;
  date: string;
  readTime: string;
  status: 'published' | 'draft';
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export default function OffersDashboard() {
  const [offers, setOffers] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    title: '', excerpt: '', content: '', author: '',
    category: '', image: '', status: 'published' as 'published' | 'draft',
  });

  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/offers');
      const data: ApiResponse<Blog[]> = await response.json();
      if (data.success) setOffers(data.data);
      else setOffers([]);
    } catch { setOffers([]); }
    finally { setLoading(false); }
  };

  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.excerpt || !formData.content) {
      alert('Please fill in all required fields'); return;
    }
    try {
      setIsCreating(true);
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, date: new Date().toISOString().split('T')[0], readTime: '5 min read', views: 0, likes: 0 }),
      });
      const result: ApiResponse<Blog> = await response.json();
      if (result.success && result.data) {
        setOffers([result.data, ...offers]);
        setFormData({ title: '', excerpt: '', content: '', author: '', category: '', image: '', status: 'published' });
        setShowCreateModal(false);
      } else alert('Failed to create: ' + (result.error || 'Unknown error'));
    } catch { alert('Failed to create offer'); }
    finally { setIsCreating(false); }
  };

  const handleDeleteOffer = async (id: number) => {
    if (!confirm('Are you sure?')) return;
    try {
      const response = await fetch(`/api/offers/${id}`, { method: 'DELETE' });
      const result: ApiResponse<null> = await response.json();
      if (result.success) setOffers(offers.filter(b => b.id !== id));
      else alert('Failed to delete: ' + (result.error || 'Unknown error'));
    } catch { alert('Failed to delete offer'); }
  };

  useEffect(() => { fetchOffers(); }, []);

  const publishedOffers = offers.filter(b => b.status === 'published').length;
  const draftOffers = offers.filter(b => b.status === 'draft').length;
  const totalLikes = offers.reduce((sum, b) => sum + (b.likes || 0), 0);
  const filteredOffers = offers.filter(b =>
    b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-600">Loading offers...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto p-6">

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Offers</h1>
          <p className="text-gray-600">Manage your offers and track performance</p>
        </div>

        {/* ── Carousel Images card ── */}
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

        {/* Search + Create */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input type="text" placeholder="Search posts..." value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm" />
          </div>
          <button onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-md font-medium">
            <Plus className="w-5 h-5" /> Create
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {[
            { label: 'Offers Published', value: publishedOffers, icon: FileText, bg: 'bg-orange-50', color: 'text-orange-600' },
            { label: 'Offers Drafts', value: draftOffers, icon: Edit, bg: 'bg-amber-50', color: 'text-amber-600' },
            { label: 'Total Likes', value: totalLikes, icon: Heart, bg: 'bg-red-50', color: 'text-red-600' },
          ].map(({ label, value, icon: Icon, bg, color }) => (
            <div key={label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-3">
                <span className="text-gray-600 text-sm font-medium">{label}</span>
                <div className={`p-2 ${bg} rounded-lg`}><Icon className={`w-5 h-5 ${color}`} /></div>
              </div>
              <p className="text-4xl font-bold text-gray-900">{value}</p>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredOffers.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No offers yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery ? 'No offers match your search.' : 'Start creating your first offer.'}
            </p>
            {!searchQuery && (
              <button onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg font-medium">
                <Plus className="w-5 h-5" /> Create Your First Offer
              </button>
            )}
          </div>
        )}

        {/* Grid */}
        {filteredOffers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map(blog => (
              <div key={blog.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group">
                <div className="relative">
                  {blog.image ? (
                    <div className="h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100">
                      <img src={blog.image} alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={e => { e.currentTarget.style.display = 'none'; }} />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-orange-300" />
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${blog.status === 'published' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-gray-700'}`}>
                      {blog.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="relative">
                      <button onClick={() => setShowMenu(showMenu === blog.id ? null : blog.id)}
                        className="p-2 bg-white rounded-lg hover:bg-gray-50 shadow-md">
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                      {showMenu === blog.id && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          <button onClick={() => { handleDeleteOffer(blog.id); setShowMenu(null); }}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">{blog.excerpt}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1"><Eye className="w-4 h-4" />{blog.views || 0}</span>
                    <span className="flex items-center gap-1"><Heart className="w-4 h-4" />{blog.likes || 0}</span>
                    <span className="ml-auto text-xs">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Create New Offer</h2>
              <button onClick={() => setShowCreateModal(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreateOffer} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Title *</label>
                <input type="text" value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} required
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter offer title" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Author *</label>
                  <input type="text" value={formData.author} onChange={e => setFormData({ ...formData, author: e.target.value })} required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Author name" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category *</label>
                  <input type="text" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} required
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Travel, Tech" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Image URL (Optional)</label>
                <input type="text" value={formData.image} onChange={e => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Status</label>
                <select value={formData.status} onChange={e => setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent">
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Excerpt *</label>
                <textarea value={formData.excerpt} onChange={e => setFormData({ ...formData, excerpt: e.target.value })} required rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Brief excerpt for the offer" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Content *</label>
                <textarea value={formData.content} onChange={e => setFormData({ ...formData, content: e.target.value })} required rows={8}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  placeholder="Write your offer details here..." />
              </div>
              <div className="flex gap-3 pt-4">
                <button type="submit" disabled={isCreating}
                  className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 disabled:opacity-50 transition-all font-medium shadow-lg">
                  {isCreating ? 'Creating...' : 'Create Offer'}
                </button>
                <button type="button" onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 font-medium">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}