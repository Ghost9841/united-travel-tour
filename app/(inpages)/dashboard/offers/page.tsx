'use client';

import { useState, useEffect } from 'react';
import { Search, Plus, MoreVertical, Eye, Heart, FileText, Edit, Trash2, X } from 'lucide-react';

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
    title: '',
    excerpt: '',
    content: '',
    author: '',
    category: '',
    image: '',
    status: 'published' as 'published' | 'draft',
  });

  // Fetch all offers - GET function
  const fetchOffers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/offers');
      const data: ApiResponse<Blog[]> = await response.json();
      if (data.success) {
        setOffers(data.data);
      } else {
        console.error('Failed to fetch offers:', data.error);
        setOffers([]);
      }
    } catch (error) {
      console.error('Error fetching offers:', error);
      setOffers([]);
    } finally {
      setLoading(false);
    }
  };

  // Create new offer - POST function
  const handleCreateOffer = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title || !formData.excerpt || !formData.content) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setIsCreating(true);
      const response = await fetch('/api/offers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          date: new Date().toISOString().split('T')[0],
          readTime: '5 min read',
          views: 0,
          likes: Math.floor(Math.random() * 200),
        }),
      });

      const result: ApiResponse<Blog> = await response.json();
      if (result.success && result.data) {
        setOffers([result.data, ...offers]);
        setFormData({
          title: '',
          excerpt: '',
          content: '',
          author: '',
          category: '',
          image: '',
          status: 'published',
        });
        setShowCreateModal(false);
      } else {
        alert('Failed to create offer: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error creating offer:', error);
      alert('Failed to create offer');
    } finally {
      setIsCreating(false);
    }
  };

  // Delete offer - DELETE function
  const handleDeleteOffer = async (id: number) => {
    if (!confirm('Are you sure you want to delete this offer?')) {
      return;
    }

    try {
      const response = await fetch(`/api/offers/${id}`, {
        method: 'DELETE',
      });

      const result: ApiResponse<null> = await response.json();
      if (result.success) {
        setOffers(offers.filter((blog) => blog.id !== id));
      } else {
        alert('Failed to delete offer: ' + (result.error || 'Unknown error'));
      }
    } catch (error) {
      console.error('Error deleting offer:', error);
      alert('Failed to delete offer');
    }
  };

  useEffect(() => {
    fetchOffers();
  }, []);

  // Calculate stats
  const publishedOffers = offers.filter(b => b.status === 'published').length;
  const draftOffers = offers.filter(b => b.status === 'draft').length;
  const totalLikes = offers.reduce((sum, b) => sum + (b.likes || 0), 0);

  // Filter offers based on search
  const filteredOffers = offers.filter(blog =>
    blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading offers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">My Offers</h1>
          <p className="text-gray-600">Manage your offers and track performance</p>
        </div>

        {/* Search and Create Button */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent shadow-sm"
            />
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-md hover:shadow-lg font-medium"
          >
            <Plus className="w-5 h-5" />
            Create
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600 text-sm font-medium">Offers Published</span>
              <div className="p-2 bg-orange-50 rounded-lg">
                <FileText className="w-5 h-5 text-orange-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">{publishedOffers}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600 text-sm font-medium">Offers Drafts</span>
              <div className="p-2 bg-amber-50 rounded-lg">
                <Edit className="w-5 h-5 text-amber-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">{draftOffers}</p>
          </div>
          
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <span className="text-gray-600 text-sm font-medium">Total Likes</span>
              <div className="p-2 bg-red-50 rounded-lg">
                <Heart className="w-5 h-5 text-red-600" />
              </div>
            </div>
            <p className="text-4xl font-bold text-gray-900">{totalLikes}</p>
          </div>
        </div>

        {/* Empty State */}
        {filteredOffers.length === 0 && !loading && (
          <div className="bg-white rounded-2xl border border-gray-200 p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-gradient-to-br from-orange-100 to-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <FileText className="w-10 h-10 text-orange-600" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">No offers yet</h3>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              {searchQuery 
                ? 'No offers match your search. Try a different query.' 
                : 'Start creating your first offer and share it with your customers.'}
            </p>
            {!searchQuery && (
              <button
                onClick={() => setShowCreateModal(true)}
                className="inline-flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 transition-all shadow-lg hover:shadow-xl font-medium"
              >
                <Plus className="w-5 h-5" />
                Create Your First Offer
              </button>
            )}
          </div>
        )}

        {/* Offers Grid */}
        {filteredOffers.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredOffers.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group"
              >
                {/* Status Badge and Menu */}
                <div className="relative">
                  {blog.image ? (
                    <div className="h-48 overflow-hidden bg-gradient-to-br from-orange-100 to-amber-100">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-48 bg-gradient-to-br from-orange-100 via-amber-100 to-yellow-100 flex items-center justify-center">
                      <FileText className="w-16 h-16 text-orange-300" />
                    </div>
                  )}
                  
                  <div className="absolute top-4 left-4">
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      blog.status === 'published' 
                        ? 'bg-gray-900 text-white' 
                        : 'bg-gray-200 text-gray-700'
                    }`}>
                      {blog.status === 'published' ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  
                  <div className="absolute top-4 right-4">
                    <div className="relative">
                      <button
                        onClick={() => setShowMenu(showMenu === blog.id ? null : blog.id)}
                        className="p-2 bg-white rounded-lg hover:bg-gray-50 transition-colors shadow-md"
                      >
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                      
                      {showMenu === blog.id && (
                        <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-10">
                          <button
                            onClick={() => {
                              handleDeleteOffer(blog.id);
                              setShowMenu(null);
                            }}
                            className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2"
                          >
                            <Trash2 className="w-4 h-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {blog.title}
                  </h3>
                  
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center gap-4 text-sm text-gray-500 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{blog.views || 0}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{blog.likes || 0}</span>
                    </div>
                    <div className="ml-auto text-xs">
                      {new Date(blog.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Create Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Create New Offer</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateOffer} className="p-6 space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter offer title"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Author *
                  </label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Author name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Category *
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="e.g., Travel, Tech"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Image URL (Optional)
                </label>
                <input
                  type="text"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="https://example.com/image.jpg"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as 'published' | 'draft' })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Excerpt *
                </label>
                <textarea
                  value={formData.excerpt}
                  onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows={3}
                  placeholder="Brief excerpt for the offer"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                  rows={8}
                  placeholder="Write your offer details here..."
                  required
                />
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isCreating}
                  className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-xl hover:bg-orange-600 disabled:opacity-50 transition-all font-medium shadow-lg"
                >
                  {isCreating ? 'Creating...' : 'Create Offer'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
                >
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