'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Trash2, Plus, Edit3 } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

type OngoingFare = {
  id: number;
  title: string;
  description: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  image: string;
  alt: string;
  departure: string;
  arrival: string;
  expires: string;
  status: 'active' | 'draft';
};

interface OngoingFarePageProps {
  params: { id: string };
}

const isNew = (id: string) => id === 'new';

export default function OngoingFareDetailPage({ params }: OngoingFarePageProps) {
  const router = useRouter();
  const id = params.id;
  const creating = isNew(id);

  const [fare, setFare] = useState<OngoingFare | null>(null);
  const [loading, setLoading] = useState(!creating);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<OngoingFare>>({
    title: '',
    description: '',
    originalPrice: '',
    discountedPrice: '',
    discount: '',
    image: '',
    alt: '',
    departure: '',
    arrival: '',
    expires: '',
    status: 'active',
  });

  const loadFare = async () => {
    if (creating) return;

    const idNum = Number(id);
    if (Number.isNaN(idNum)) {
      setError('Invalid fare ID');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/(landingpage)/ongoingfare/${idNum}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to load fare');
      }

      setFare(data.data);
      setForm({ ...data.data });
    } catch (err) {
      console.error('loadFare error', err);
      setError((err as Error).message || 'Failed to load fare');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadFare();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    if (!form.title?.trim() || !form.description?.trim() || !form.image?.trim()) {
      setError('Title, description, and image are required');
      setSaving(false);
      return;
    }

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        originalPrice: form.originalPrice?.trim() ?? '',
        discountedPrice: form.discountedPrice?.trim() ?? '',
        discount: form.discount?.trim() ?? '',
        image: form.image.trim(),
        alt: form.alt?.trim() ?? '',
        departure: form.departure?.trim() ?? '',
        arrival: form.arrival?.trim() ?? '',
        expires: form.expires?.trim() ?? '',
        status: (form.status as 'active' | 'draft') || 'active',
      };

      const path = creating
        ? '/api/(landingpage)/ongoingfare'
        : `/api/(landingpage)/ongoingfare/${Number(id)}`;
      const method = creating ? 'POST' : 'PUT';

      const res = await fetch(path, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save fare');
      }

      setMessage(creating ? 'Fare created successfully' : 'Fare updated successfully');
      router.push('/dashboard/landingpage/ongoingfare');
    } catch (err) {
      console.error('submit error', err);
      setError((err as Error).message || 'Failed to save fare');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (creating) return;
    if (!confirm('Delete this fare?')) return;
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch(`/api/(landingpage)/ongoingfare/${Number(id)}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to delete fare');
      }

      router.push('/dashboard/landingpage/ongoingfare');
    } catch (err) {
      console.error('delete error', err);
      setError((err as Error).message || 'Failed to delete fare');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading fare...</p>
        </div>
      </div>
    );
  }

  if (error && !creating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 flex items-center justify-center">
        <div className="text-center text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-5xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-gray-900">{creating ? 'Add Ongoing Fare' : 'Edit Ongoing Fare'}</h1>
          <Link href="/dashboard/landingpage/ongoingfare" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4" /> Back to list
          </Link>
        </div>

        <div className="space-y-3 mb-6">
          {message && <div className="rounded-lg bg-green-100 border border-green-200 text-green-700 p-3">{message}</div>}
          {error && <div className="rounded-lg bg-red-100 border border-red-200 text-red-700 p-3">{error}</div>}
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Title *</span>
              <input value={form.title || ''} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Departure</span>
              <input value={form.departure || ''} onChange={(e) => setForm((f) => ({ ...f, departure: e.target.value }))} className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Arrival</span>
              <input value={form.arrival || ''} onChange={(e) => setForm((f) => ({ ...f, arrival: e.target.value }))} className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Expires</span>
              <input value={form.expires || ''} onChange={(e) => setForm((f) => ({ ...f, expires: e.target.value }))} className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Original Price</span>
              <input value={form.originalPrice || ''} onChange={(e) => setForm((f) => ({ ...f, originalPrice: e.target.value }))} placeholder="£450" className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Discounted Price</span>
              <input value={form.discountedPrice || ''} onChange={(e) => setForm((f) => ({ ...f, discountedPrice: e.target.value }))} placeholder="£400" className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Discount</span>
              <input value={form.discount || ''} onChange={(e) => setForm((f) => ({ ...f, discount: e.target.value }))} placeholder="5% OFF" className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300" />
            </label>
            <label className="block">
              <span className="text-sm font-medium text-gray-700">Status</span>
              <select value={form.status || 'active'} onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as 'active' | 'draft' }))} className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300">
                <option value="active">Active</option>
                <option value="draft">Draft</option>
              </select>
            </label>
            <label className="block md:col-span-2">
              <span className="text-sm font-medium text-gray-700">Image URL *</span>
              <input value={form.image || ''} onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))} placeholder="https://..." className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300" />
            </label>
            <label className="block md:col-span-2">
              <span className="text-sm font-medium text-gray-700">Alt Text</span>
              <input value={form.alt || ''} onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))} placeholder="Dubai skyline" className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300" />
            </label>
            <label className="block md:col-span-2">
              <span className="text-sm font-medium text-gray-700">Description *</span>
              <textarea value={form.description || ''} rows={4} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="mt-1 block w-full rounded-lg border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300" />
            </label>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <button type="submit" disabled={saving} className="rounded-lg bg-orange-500 px-4 py-2 text-white hover:bg-orange-600 disabled:opacity-50 inline-flex items-center gap-2">
              {creating ? <Plus className="w-4 h-4" /> : <Edit3 className="w-4 h-4" />}
              {creating ? 'Create Fare' : 'Update Fare'}
            </button>
            {!creating && (
              <button type="button" onClick={handleDelete} disabled={saving} className="rounded-lg border border-red-300 px-4 py-2 text-red-600 hover:bg-red-100 disabled:opacity-50 inline-flex items-center gap-2">
                <Trash2 className="h-4 w-4" /> Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
