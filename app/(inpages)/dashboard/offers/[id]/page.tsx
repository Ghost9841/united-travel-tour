'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Trash2, Plane, Image as ImageIcon, X } from 'lucide-react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const isNew = (id: string) => id === 'new';

export default function TrendingRouteFormPage() {
  const router   = useRouter();
  const params   = useParams();
  const id       = params.id as string;
  const creating = isNew(id);

  const [loading,  setLoading]  = useState(!creating);
  const [saving,   setSaving]   = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [preview,  setPreview]  = useState('');

const [form, setForm] = useState({
  from:           '',
  to:             '',
  price:          '',
  currency:       '£',
  image:          '',
  airline:        '',
  travelClass:    'Economy',
  checkinBaggage: '',
  cabinBaggage:   '',
  baseFare:       '',
  status:         'active' as 'active' | 'draft',
  order:          '0',
});

  useEffect(() => {
    if (creating) return;
    (async () => {
      try {
        const res  = await fetch(`/api/offers/${id}`);
        const data = await res.json();
        if (data.success && data.data) {
          const d = data.data;
          setForm({
            from:           d.from           ?? '',
            to:             d.to             ?? '',
            price:          d.price?.toString()     ?? '',
            currency:       d.currency       ?? '£',
            image:          d.image          ?? '',
            airline:        d.airline        ?? '',
            travelClass:    d.travelClass    ?? 'Economy',
            checkinBaggage: d.checkinBaggage ?? '',
            cabinBaggage:   d.cabinBaggage   ?? '',
            baseFare:       d.baseFare?.toString()  ?? '',
            status:         d.status         ?? 'active',
            order:          d.order?.toString()     ?? '0',
          });
          setPreview(d.image ?? '');
        } else {
          toast.error('Route not found');
          router.push('/dashboard/offers/');
        }
      } catch {
        toast.error('Failed to load route');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const set = (k: string, v: string) => setForm(p => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.from || !form.to || !form.airline) {
      toast.error('From, To and Airline are required'); return;
    }
    setSaving(true);
    try {
      const body = {
        ...form,
        price:     Number(form.price)     || 0,
        baseFare:  Number(form.baseFare)  || 0,
      };
      const res = await fetch(
        creating ? '/api/offers' : `/api/offers/${id}`,
        { method: creating ? 'POST' : 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) }
      );
      const data = await res.json();
      if (data.success) {
        toast.success(creating ? 'Route created.' : 'Route updated.');
        router.push('/dashboard/offers/');
      } else toast.error(data.error ?? 'Something went wrong.');
    } catch { toast.error('Something went wrong.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      const res  = await fetch(`/api/offers/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast.success('Route deleted.');
        router.push('/dashboard/offers/');
      } else toast.error(data.error ?? 'Failed to delete.');
    } catch { toast.error('Something went wrong.'); }
    finally { setDeleting(false); }
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
            <Link href="/dashboard/offers/"
              className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {creating ? 'Add Trending Route' : 'Edit Route'}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {creating ? 'Add a new trending flight route' : 'Update this route'}
              </p>
            </div>
          </div>

          {!creating && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <button className="flex items-center gap-2 bg-red-500 text-white px-4 py-2.5 rounded-xl hover:bg-red-600 font-semibold text-sm shadow-md">
                  <Trash2 className="w-4 h-4" /> Delete
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete this route?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently remove {form.from} → {form.to}. This cannot be undone.
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

          {/* Route */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Route</h2>
            <p className="text-sm text-gray-500 mb-5">Origin and destination details</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'From City *',     k: 'from',     placeholder: 'e.g., London' },
                { label: 'To City *',       k: 'to',       placeholder: 'e.g., Kathmandu' },
              ].map(({ label, k, placeholder }) => (
                <div key={k}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                  <input value={(form as any)[k]} onChange={e => set(k, e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Flight */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Flight Details</h2>
            <p className="text-sm text-gray-500 mb-5">Airline, schedule and baggage</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Airline *',         k: 'airline',        placeholder: 'Qatar Airways' },
                { label: 'Check-in Baggage',  k: 'checkinBaggage', placeholder: 'Adult - 30 KG' },
                { label: 'Cabin Baggage',     k: 'cabinBaggage',   placeholder: 'Adult - 7 KG' },
              ].map(({ label, k, placeholder }) => (
                <div key={k}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                  <input value={(form as any)[k]} onChange={e => set(k, e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
              ))}



              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Travel Class</label>
                <select value={form.travelClass} onChange={e => set('travelClass', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 text-sm bg-white">
                  <option>Economy</option>
                  <option>Business</option>
                  <option>First Class</option>
                </select>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Pricing</h2>
            <p className="text-sm text-gray-500 mb-5">Fare breakdown shown on the detail page</p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: 'Display Price',  k: 'price',     placeholder: '900' },
                { label: 'Currency',       k: 'currency',  placeholder: '£' },
              ].map(({ label, k, placeholder }) => (
                <div key={k}>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{label}</label>
                  <input type={k === 'currency' ? 'text' : 'number'} min="0"
                    value={(form as any)[k]} onChange={e => set(k, e.target.value)}
                    placeholder={placeholder}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">City Image</h2>
            <p className="text-sm text-gray-500 mb-5">Destination photo shown on the route card</p>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={form.image}
                onChange={e => { set('image', e.target.value); setPreview(e.target.value); }}
                placeholder="https://... or /images/destination.jpeg"
                className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
            </div>
            {preview && (
              <div className="relative mt-4 rounded-xl overflow-hidden border border-gray-100">
                <img src={preview} alt="preview" className="w-full h-40 object-cover"
                  onError={() => setPreview('')} />
                <button type="button" onClick={() => { setPreview(''); set('image', ''); }}
                  className="absolute top-2 right-2 p-1.5 bg-white rounded-lg shadow hover:bg-red-50">
                  <X className="w-3.5 h-3.5 text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Settings</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div>
                  <p className="text-sm font-semibold text-gray-800">Status</p>
                  <p className="text-xs text-gray-500">Active routes appear on the homepage</p>
                </div>
                <select value={form.status} onChange={e => set('status', e.target.value)}
                  className="px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 text-sm bg-white">
                  <option value="active">Active</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
              <div className="p-4 bg-gray-50 rounded-xl">
                <label className="block text-sm font-semibold text-gray-800 mb-1">Display Order</label>
                <p className="text-xs text-gray-500 mb-2">Lower = appears first</p>
                <input type="number" min="0" value={form.order} onChange={e => set('order', e.target.value)}
                  className="w-full px-4 py-2 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 text-sm" />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Link href="/dashboard/offers/"
              className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium text-sm">
              Cancel
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 disabled:opacity-50 font-semibold shadow-md text-sm">
              {saving ? 'Saving...' : <><Save className="w-4 h-4" />{creating ? 'Add Route' : 'Save Changes'}</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}