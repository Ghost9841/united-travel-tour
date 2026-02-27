'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Save, X, MapPin, DollarSign, Clock, Users,
  Tag, Image as ImageIcon, Globe2, Star, Trash2,
} from 'lucide-react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const CATEGORIES = ['Beach', 'Mountain', 'City', 'Cultural', 'Adventure', 'Wildlife', 'Desert', 'Island'];
const DURATIONS = ['1-3 days', '3-5 days', '5-7 days', '1-2 weeks', '2+ weeks'];
const SEASONS = ['Spring', 'Summer', 'Autumn', 'Winter', 'Year-round'];

const isNew = (id: string) => id === 'new';

export default function DestinationFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const creating = isNew(id);

  const [loading, setLoading] = useState(!creating);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [form, setForm] = useState({
    name: '',
    country: '',
    description: '',
    imageUrl: '',
    category: 'Beach',
    rating: 4.5,
    price: '',
    duration: '3-5 days',
    bestSeason: 'Summer',
    status: 'active' as 'active' | 'draft',
    featured: false,
  });

  useEffect(() => {
    if (creating) return;
    (async () => {
      try {
        const res = await fetch(`/api/destinations/${id}`);
        const data = await res.json();
        if (data.success && data.data) {
          const d = data.data.destination ?? data.data;
          setForm({
            name: d.name ?? '',
            country: d.country ?? '',
            description: d.description ?? '',
            imageUrl: d.imageUrl ?? '',
            category: d.category ?? 'Beach',
            rating: d.rating ?? 4.5,
            price: d.price?.toString() ?? '',
            duration: d.duration ?? '3-5 days',
            bestSeason: d.bestSeason ?? 'Summer',
            status: d.status ?? 'active',
            featured: d.featured ?? false,
          });
          setImagePreview(d.imageUrl ?? '');
        } else {
          toast('Error', { description: 'Destination not found' });
          router.push('/dashboard/destinations');
        }
      } catch {
        toast('Error', { description: 'Failed to load destination' });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const set = (k: string, v: unknown) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = { ...form, price: Number(form.price) };
      const res = await fetch(
        creating ? '/api/destinations' : `/api/destinations/${id}`,
        {
          method: creating ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast('Success!', { description: creating ? 'Destination created.' : 'Destination updated.' });
        router.push('/dashboard/destinations');
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
      const res = await fetch(`/api/destinations/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast('Success!', { description: 'Destination deleted.' });
        router.push('/dashboard/destinations');
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
            <Link href="/dashboard/destinations"
              className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {creating ? 'Add New Destination' : 'Edit Destination'}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {creating ? 'Fill in the details to add a destination' : 'Update the destination details'}
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
                    This will permanently delete &quot;{form.name}&quot;. This action cannot be undone.
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
            <h2 className="text-lg font-bold text-gray-900 mb-1">Basic Information</h2>
            <p className="text-sm text-gray-500 mb-5">Essential details about the destination</p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Destination Name *</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} required
                    placeholder="e.g., Santorini"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Country *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input value={form.country} onChange={e => set('country', e.target.value)} required
                      placeholder="e.g., Greece"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description *</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} required
                  rows={4} placeholder="Describe this destination..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm resize-none" />
              </div>
            </div>
          </div>

          {/* Details */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Details & Pricing</h2>
            <p className="text-sm text-gray-500 mb-5">Category, price, duration and season</p>
            <div className="grid grid-cols-2 gap-4">
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
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price (USD) *</label>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="number" min="0" value={form.price} onChange={e => set('price', e.target.value)} required
                    placeholder="1200"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Duration *</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select value={form.duration} onChange={e => set('duration', e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white">
                    {DURATIONS.map(d => <option key={d}>{d}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Best Season *</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select value={form.bestSeason} onChange={e => set('bestSeason', e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white">
                    {SEASONS.map(s => <option key={s}>{s}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="mt-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Rating: <span className="text-orange-500">{form.rating} ★</span>
              </label>
              <input type="range" min="1" max="5" step="0.1" value={form.rating}
                onChange={e => set('rating', Number(e.target.value))}
                className="w-full accent-orange-500" />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1.0</span><span>5.0</span></div>
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Cover Image</h2>
            <p className="text-sm text-gray-500 mb-5">Add an image URL for this destination</p>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={form.imageUrl}
                onChange={e => { set('imageUrl', e.target.value); setImagePreview(e.target.value); }}
                placeholder="https://example.com/image.jpg"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
            </div>
            {imagePreview && (
              <div className="relative mt-4 rounded-xl overflow-hidden border border-gray-100">
                <img src={imagePreview} alt="preview" className="w-full h-48 object-cover"
                  onError={() => setImagePreview('')} />
                <button type="button" onClick={() => { setImagePreview(''); set('imageUrl', ''); }}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow hover:bg-red-50">
                  <X className="w-3.5 h-3.5 text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Settings</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Status</p>
                  <p className="text-xs text-gray-500">Active destinations are visible to users</p>
                </div>
                <select value={form.status} onChange={e => set('status', e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 text-sm bg-white">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-xl border border-amber-100">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Featured Destination</p>
                  <p className="text-xs text-gray-500">Show on homepage highlights</p>
                </div>
                <button type="button" onClick={() => set('featured', !form.featured)}
                  className={`relative w-11 h-6 rounded-full transition-colors ${form.featured ? 'bg-orange-500' : 'bg-gray-200'}`}>
                  <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${form.featured ? 'translate-x-5' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link href="/dashboard/destinations"
              className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm">
              Cancel
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 disabled:opacity-50 transition-all font-semibold shadow-md text-sm">
              {saving ? 'Saving...' : (<><Save className="w-4 h-4" />{creating ? 'Create Destination' : 'Save Changes'}</>)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}