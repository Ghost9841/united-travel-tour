'use client';

import { useState, useEffect } from 'react';
import { Plus, ArrowLeft, Trash2, Edit, Image as ImageIcon, MoreVertical, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

interface HeroCarouselImage {
  id: number;
  src: string;
  alt: string;
  order: number;
  status: 'active' | 'draft';
  createdAt: string;
}

export default function HeroCarouselImagesPage() {
  const [images, setImages] = useState<HeroCarouselImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [showMenu, setShowMenu] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ src: '', alt: '', order: '', status: 'active' as 'active' | 'draft' });
  const [preview, setPreview] = useState('');

  const fetchImages = async () => {
    try {
      const res = await fetch('/api/hero');
      const data = await res.json();
      if (data.success) setImages(data.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImages(); }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.src.trim()) { alert('Image URL is required'); return; }
    setSaving(true);
    try {
      const res = await fetch('/api/hero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, order: Number(form.order) || 0 }),
      });
      const data = await res.json();
      if (data.success) {
        setImages(prev => [...prev, data.data].sort((a, b) => a.order - b.order));
        setForm({ src: '', alt: '', order: '', status: 'active' });
        setPreview('');
        setShowModal(false);
      } else alert(data.error || 'Failed to create');
    } catch { alert('Failed to create image'); }
    finally { setSaving(false); }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this image?')) return;
    try {
      const res = await fetch(`/api/hero/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) setImages(prev => prev.filter(img => img.id !== id));
      else alert(data.error || 'Failed to delete');
    } catch { alert('Failed to delete'); }
  };

  const toggleStatus = async (img: HeroCarouselImage) => {
    const newStatus = img.status === 'active' ? 'draft' : 'active';
    try {
      const res = await fetch(`/api/hero/${img.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) setImages(prev => prev.map(i => i.id === img.id ? { ...i, status: newStatus } : i));
    } catch { alert('Failed to update status'); }
  };

  const active = images.filter(i => i.status === 'active').length;
  const draft  = images.filter(i => i.status === 'draft').length;

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/landingpage/hero"
              className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Carousel Images</h1>
              <p className="text-gray-500 mt-1">Manage your homepage hero carousel slides</p>
            </div>
          </div>
          <button onClick={() => setShowModal(true)}
            className="flex items-center gap-2 bg-orange-500 text-white px-5 py-2.5 rounded-full hover:bg-orange-600 transition-all shadow-md font-semibold text-sm">
            <Plus className="w-4 h-4" /> Add Image
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          {[
            { label: 'Total Images', value: images.length, color: 'text-gray-900' },
            { label: 'Active',       value: active,        color: 'text-green-600' },
            { label: 'Draft',        value: draft,         color: 'text-amber-600' },
          ].map(({ label, value, color }) => (
            <div key={label} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <p className="text-sm text-gray-500 font-medium mb-1">{label}</p>
              <p className={`text-4xl font-bold ${color}`}>{value}</p>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {images.length === 0 && (
          <div className="bg-white rounded-2xl border border-gray-100 p-16 text-center shadow-sm">
            <div className="w-20 h-20 bg-orange-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <ImageIcon className="w-10 h-10 text-orange-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No carousel images yet</h3>
            <p className="text-gray-500 text-sm mb-6">Add your first image to start building the hero carousel.</p>
            <button onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 bg-orange-500 text-white px-6 py-2.5 rounded-full hover:bg-orange-600 font-semibold text-sm shadow-md">
              <Plus className="w-4 h-4" /> Add Image
            </button>
          </div>
        )}

        {/* Grid */}
        {images.length > 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {images.map(img => (
                <div key={img.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden hover:shadow-xl transition-all group">
                  <div className="relative h-48 bg-gray-100">
                    <img src={img.src} alt={img.alt || 'Carousel image'}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&h=600&fit=crop'; }} />

                    <div className="absolute top-3 left-3">
                      <span className={`px-2.5 py-1 rounded-full text-xs font-semibold shadow-sm ${img.status === 'active' ? 'bg-gray-900 text-white' : 'bg-white/90 text-gray-600 border border-gray-200'}`}>
                        {img.status === 'active' ? 'Active' : 'Draft'}
                      </span>
                    </div>

                    <div className="absolute top-3 right-10">
                      <span className="bg-black/60 text-white text-xs px-2 py-1 rounded-full">#{img.order}</span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <button onClick={() => setShowMenu(showMenu === img.id ? null : img.id)}
                        className="p-1.5 bg-white rounded-lg shadow-md hover:bg-gray-50">
                        <MoreVertical className="w-4 h-4 text-gray-600" />
                      </button>
                      {showMenu === img.id && (
                        <div className="absolute right-0 mt-2 w-44 bg-white rounded-xl shadow-lg border border-gray-100 py-1 z-10">
                          <Link href={`/dashboard/landingpage/hero/${img.id}`}
                            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            <Edit className="w-4 h-4" /> Edit
                          </Link>
                          <button onClick={() => { toggleStatus(img); setShowMenu(null); }}
                            className="w-full px-4 py-2.5 text-left text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                            {img.status === 'active' ? <><EyeOff className="w-4 h-4" /> Set Draft</> : <><Eye className="w-4 h-4" /> Set Active</>}
                          </button>
                          <button onClick={() => { handleDelete(img.id); setShowMenu(null); }}
                            className="w-full px-4 py-2.5 text-left text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                            <Trash2 className="w-4 h-4" /> Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="p-4">
                    <p className="font-semibold text-gray-900 text-sm line-clamp-1">{img.alt || '(no alt text)'}</p>
                    <p className="text-xs text-gray-400 mt-1 truncate">{img.src}</p>
                    <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                      <span className="text-xs text-gray-400">
                        {new Date(img.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </span>
                      <Link href={`/dashboard/landingpage/hero/${img.id}`}
                        className="text-xs text-orange-500 hover:text-orange-600 font-semibold">
                        Edit →
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-gray-400">Showing {images.length} image{images.length !== 1 ? 's' : ''}</p>
          </>
        )}
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900">Add Carousel Image</h2>
              <button onClick={() => { setShowModal(false); setPreview(''); }}
                className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 text-lg leading-none">✕</button>
            </div>
            <form onSubmit={handleCreate} className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Image URL *</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input value={form.src}
                    onChange={e => { setForm(f => ({ ...f, src: e.target.value })); setPreview(e.target.value); }}
                    placeholder="https://... or /2026/herosection/image.jpeg"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
                {preview && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-gray-100 h-36">
                    <img src={preview} alt="preview" className="w-full h-full object-cover"
                      onError={() => setPreview('')} />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Alt Text</label>
                <input value={form.alt} onChange={e => setForm(f => ({ ...f, alt: e.target.value }))}
                  placeholder="e.g., Alpine Village"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                <p className="text-xs text-gray-400 mt-1">Used for accessibility and shown as slide label</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Order</label>
                  <input type="number" min="0" value={form.order}
                    onChange={e => setForm(f => ({ ...f, order: e.target.value }))} placeholder="0"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                  <p className="text-xs text-gray-400 mt-1">Lower = shown first</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Status</label>
                  <select value={form.status} onChange={e => setForm(f => ({ ...f, status: e.target.value as 'active' | 'draft' }))}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 text-sm bg-white">
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving}
                  className="flex-1 bg-orange-500 text-white py-3 rounded-xl hover:bg-orange-600 disabled:opacity-50 font-semibold text-sm shadow-md">
                  {saving ? 'Saving...' : 'Add Image'}
                </button>
                <button type="button" onClick={() => { setShowModal(false); setPreview(''); }}
                  className="px-5 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium text-sm">
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