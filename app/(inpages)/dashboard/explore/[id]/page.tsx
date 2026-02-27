'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Save, X, MapPin, DollarSign,
  Image as ImageIcon, Star, Trash2, Calendar, Tag,
} from 'lucide-react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

// Matches frontend exactly
const CATEGORIES = ['City Tour', 'Historical', 'Romantic', 'Adventure'];
const DURATIONS  = ['1-3 days', '4 days', '5 days', '6 days', '7 days', '8-10 days', '2 weeks+'];
const LOCATIONS  = [
  'Portugal', 'Greece', 'Italy', 'France', 'Spain', 'Netherlands',
  'Czech Republic', 'Switzerland', 'Austria', 'Ireland', 'Hungary',
  'United Kingdom', 'Scotland', 'Germany', 'Croatia',
];

const isNew = (id: string) => id === 'new';

export default function ExploreFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const creating = isNew(id);

  const [loading, setLoading] = useState(!creating);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    discountedPrice: '',
    image: '',
    rating: 5,
    category: 'City Tour',
    duration: '5 days',
    status: 'active' as 'active' | 'draft',
  });

  useEffect(() => {
    if (creating) return;
    (async () => {
      try {
        const res = await fetch(`/api/explore/${id}`);
        const data = await res.json();
        if (data.success && data.data) {
          const e = data.data.item ?? data.data;
          setForm({
            title: e.title ?? '',
            description: e.description ?? '',
            location: e.location ?? '',
            price: e.price?.toString() ?? '',
            discountedPrice: e.discountedPrice?.toString() ?? '',
            image: e.image ?? '',
            rating: e.rating ?? 5,
            category: e.category ?? 'City Tour',
            duration: e.duration ?? '5 days',
            status: e.status ?? 'active',
          });
          setImagePreview(e.image ?? '');
        } else {
          toast('Error', { description: 'Item not found' });
          router.push('/dashboard/explore');
        }
      } catch {
        toast('Error', { description: 'Failed to load item' });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const set = (k: string, v: unknown) => setForm(p => ({ ...p, [k]: v }));

  const saving$ = Number(form.price) > 0 && Number(form.discountedPrice) > 0
    ? Number(form.price) - Number(form.discountedPrice) : 0;
  const discountPct = Number(form.price) > 0
    ? Math.round((saving$ / Number(form.price)) * 100) : 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        ...form,
        price: Number(form.price),
        discountedPrice: Number(form.discountedPrice),
      };
      const res = await fetch(
        creating ? '/api/explore' : `/api/explore/${id}`,
        { method: creating ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
      );
      const data = await res.json();
      if (data.success) {
        toast('Success!', { description: creating ? 'Item created.' : 'Item updated.' });
        router.push('/dashboard/explore');
      } else {
        toast('Error', { description: data.error ?? 'Something went wrong.' });
      }
    } catch {
      toast('Error', { description: 'Something went wrong.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res = await fetch(`/api/explore/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast('Success!', { description: 'Item deleted.' });
        router.push('/dashboard/explore');
      } else {
        toast('Error', { description: data.error ?? 'Failed to delete.' });
      }
    } catch {
      toast('Error', { description: 'Something went wrong.' });
    } finally {
      setDeleting(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-4xl mx-auto p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/explore"
              className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {creating ? 'Add Explore Item' : 'Edit Explore Item'}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {creating ? 'Add a new destination package to explore' : 'Update this explore package'}
              </p>
            </div>
          </div>

          {!creating && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2.5 rounded-xl hover:bg-red-600 transition-colors font-semibold text-sm shadow-md">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete &quot;{form.title}&quot;. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} disabled={deleting}
                    className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    {deleting ? 'Deleting...' : 'Delete'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Basic Info */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Package Details</h2>
            <p className="text-sm text-gray-500 mb-5">Title, location, category and description</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title *</label>
                <input value={form.title} onChange={e => set('title', e.target.value)} required
                  placeholder="e.g., Romantic Lisbon Getaway"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                    <input value={form.location} onChange={e => set('location', e.target.value)} required
                      placeholder="e.g., Lisbon, Portugal"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Used by frontend location filter — match country name (e.g., Portugal)</p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category *</label>
                  <div className="relative">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <select value={form.category} onChange={e => set('category', e.target.value)}
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white">
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Duration *</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select value={form.duration} onChange={e => set('duration', e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white">
                    {DURATIONS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description *</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} required
                  rows={4} placeholder="Describe this destination package — what's included, highlights, experience..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm resize-none" />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Pricing</h2>
            <p className="text-sm text-gray-500 mb-5">Original and discounted price — both shown on the frontend card</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Original Price (£) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">£</span>
                  <input type="number" min="0" value={form.price}
                    onChange={e => set('price', e.target.value)} required placeholder="700"
                    className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Discounted Price (£) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 text-sm font-medium">£</span>
                  <input type="number" min="0" value={form.discountedPrice}
                    onChange={e => set('discountedPrice', e.target.value)} required placeholder="500"
                    className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
              </div>
            </div>

            {saving$ > 0 && (
              <div className="mt-4 flex items-center gap-4 p-4 bg-green-50 rounded-xl border border-green-100">
                <div className="text-center">
                  <p className="text-xs text-gray-500">Customer saves</p>
                  <p className="text-2xl font-bold text-green-600">£{saving$}</p>
                </div>
                <div className="w-px h-10 bg-green-200" />
                <div className="text-center">
                  <p className="text-xs text-gray-500">Discount</p>
                  <p className="text-2xl font-bold text-orange-500">{discountPct}% OFF</p>
                </div>
                <div className="w-px h-10 bg-green-200" />
                <div className="text-center">
                  <p className="text-xs text-gray-500">Final price</p>
                  <p className="text-2xl font-bold text-gray-900">£{form.discountedPrice}</p>
                </div>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Rating</h2>
            <p className="text-sm text-gray-500 mb-4">Shown as filled stars on the frontend card (supports 4, 4.5, 5)</p>
            <div className="flex items-center gap-2 mb-2">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} type="button" onClick={() => set('rating', s)}>
                  <Star className={`w-8 h-8 transition-colors ${s <= form.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                </button>
              ))}
              <span className="text-sm text-gray-500 ml-2">{form.rating} / 5</span>
            </div>
            {/* Half star for 4.5 */}
            <div className="flex gap-2 mt-2">
              {[4, 4.5, 5].map(v => (
                <button key={v} type="button" onClick={() => set('rating', v)}
                  className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                    form.rating === v ? 'bg-orange-500 text-white border-orange-500' : 'bg-white text-gray-500 border-gray-200 hover:border-orange-300'
                  }`}>{v}★</button>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Cover Image</h2>
            <p className="text-sm text-gray-500 mb-5">Image shown on the explore card (h-72 on frontend)</p>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={form.image}
                onChange={e => { set('image', e.target.value); setImagePreview(e.target.value); }}
                placeholder="https://images.unsplash.com/..."
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
            </div>
            {imagePreview && (
              <div className="relative mt-4 rounded-xl overflow-hidden border border-gray-100">
                <img src={imagePreview} alt="preview" className="w-full h-48 object-cover"
                  onError={() => setImagePreview('')} />
                <button type="button" onClick={() => { setImagePreview(''); set('image', ''); }}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow hover:bg-red-50">
                  <X className="w-3.5 h-3.5 text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Settings</h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm font-semibold text-gray-800">Status</p>
                <p className="text-xs text-gray-500">Active items appear in the explore page results</p>
              </div>
              <select value={form.status} onChange={e => set('status', e.target.value)}
                className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 text-sm bg-white">
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link href="/dashboard/explore"
              className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm">
              Cancel
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 disabled:opacity-50 transition-all font-semibold shadow-md text-sm">
              {saving ? 'Saving...' : (<><Save className="w-4 h-4" />{creating ? 'Add to Explore' : 'Save Changes'}</>)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}