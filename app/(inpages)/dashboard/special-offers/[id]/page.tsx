'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Save, X, MapPin, DollarSign,
  Image as ImageIcon, Star, Trash2, Ticket,
} from 'lucide-react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const isNew = (id: string) => id === 'new';

export default function SpecialOfferFormPage() {
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
    status: 'active' as 'active' | 'draft',
  });

  useEffect(() => {
    if (creating) return;
    (async () => {
      try {
        const res = await fetch(`/api/special-offers/${id}`);
        const data = await res.json();
        if (data.success && data.data) {
          const o = data.data.offer ?? data.data;
          setForm({
            title: o.title ?? '',
            description: o.description ?? '',
            location: o.location ?? '',
            price: o.price?.toString() ?? '',
            discountedPrice: o.discountedPrice?.toString() ?? '',
            image: o.image ?? '',
            rating: o.rating ?? 5,
            status: o.status ?? 'active',
          });
          setImagePreview(o.image ?? '');
        } else {
          toast('Error', { description: 'Offer not found' });
          router.push('/dashboard/special-offers');
        }
      } catch {
        toast('Error', { description: 'Failed to load offer' });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const set = (k: string, v: unknown) => setForm(p => ({ ...p, [k]: v }));

  const saving$ = Number(form.price) > 0
    ? Number(form.price) - Number(form.discountedPrice)
    : 0;
  const discountPct = Number(form.price) > 0 && Number(form.discountedPrice) > 0
    ? Math.round(((Number(form.price) - Number(form.discountedPrice)) / Number(form.price)) * 100)
    : 0;

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
        creating ? '/api/special-offers' : `/api/special-offers/${id}`,
        {
          method: creating ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast('Success!', { description: creating ? 'Offer created.' : 'Offer updated.' });
        router.push('/dashboard/special-offers');
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
      const res = await fetch(`/api/special-offers/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast('Success!', { description: 'Offer deleted.' });
        router.push('/dashboard/special-offers');
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
            <Link href="/dashboard/special-offers"
              className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {creating ? 'Add New Offer' : 'Edit Offer'}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {creating ? 'Fill in the details to create a special offer' : 'Update this special offer'}
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
            <h2 className="text-lg font-bold text-gray-900 mb-1">Offer Details</h2>
            <p className="text-sm text-gray-500 mb-5">Title, location and full description</p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Offer Title *</label>
                <div className="relative">
                  <Ticket className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input value={form.title} onChange={e => set('title', e.target.value)} required
                    placeholder="e.g., London ⇄ Kathmandu ⇄ London (Two Way)"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input value={form.location} onChange={e => set('location', e.target.value)}
                    placeholder="e.g., London, Kathmandu  (leave empty if not applicable)"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
                <p className="text-xs text-gray-400 mt-1">Leave empty for offers with no specific location (e.g., luggage add-on)</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description *</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} required
                  rows={6} placeholder="Full offer description — include all terms, baggage info, booking instructions..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm resize-none" />
                <p className="text-xs text-gray-400 mt-1">This text appears on hover on the frontend card. Be thorough.</p>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Pricing</h2>
            <p className="text-sm text-gray-500 mb-5">Set the original and discounted price. Leave both as 0 for "Contact for price" offers.</p>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Original Price (£)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">£</span>
                  <input type="number" min="0" value={form.price}
                    onChange={e => set('price', e.target.value)} placeholder="1000"
                    className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Discounted Price (£)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 text-sm font-medium">£</span>
                  <input type="number" min="0" value={form.discountedPrice}
                    onChange={e => set('discountedPrice', e.target.value)} placeholder="900"
                    className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
              </div>
            </div>

            {/* Live discount preview */}
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
            {Number(form.price) === 0 && Number(form.discountedPrice) === 0 && (
              <div className="mt-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <p className="text-sm text-gray-500 text-center">
                  💬 This offer will show <strong>"Contact for price"</strong> on the frontend
                </p>
              </div>
            )}
          </div>

          {/* Rating */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Rating</h2>
            <p className="text-sm text-gray-500 mb-5">Star rating shown on the offer card</p>
            <div className="flex items-center gap-3 mb-3">
              {[1, 2, 3, 4, 5].map(s => (
                <button key={s} type="button" onClick={() => set('rating', s)}>
                  <Star className={`w-8 h-8 transition-colors ${s <= form.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                </button>
              ))}
              <span className="text-sm text-gray-500 ml-2">{form.rating} / 5 stars</span>
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Offer Image</h2>
            <p className="text-sm text-gray-500 mb-5">
              Use a URL or a local path (e.g. <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">/2026/populardestination/ktmtolondon.jpeg</code>)
            </p>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={form.image}
                onChange={e => { set('image', e.target.value); setImagePreview(e.target.value); }}
                placeholder="https://... or /2026/populardestination/image.jpeg"
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
                <p className="text-xs text-gray-500">Active offers appear on the frontend carousel</p>
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
            <Link href="/dashboard/special-offers"
              className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm">
              Cancel
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 disabled:opacity-50 transition-all font-semibold shadow-md text-sm">
              {saving ? 'Saving...' : (<><Save className="w-4 h-4" />{creating ? 'Create Offer' : 'Save Changes'}</>)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}