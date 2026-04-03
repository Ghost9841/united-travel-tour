'use client';

import { useEffect, useState } from 'react';
import { ArrowLeft, Edit3, Plus, Trash2 } from 'lucide-react';
import Link from 'next/link';

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

type FormState = OngoingFare | Omit<OngoingFare, 'id'>;

export default function OngoingFareDashboardPage() {
  const [fares, setFares] = useState<OngoingFare[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<number | null>(null);
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

  const fetchFares = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/(landingpage)/ongoingfare');
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to load ongoing fares');
      }
      setFares(data.data || []);
    } catch (err) {
      console.error('fetchFares error:', err);
      setError('Unable to fetch ongoing fares.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFares();
  }, []);

  const resetForm = () => {
    setEditingId(null);
    setForm({
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setMessage(null);

    if (!form.title?.trim() || !form.description?.trim() || !form.image?.trim()) {
      setError('Title, description and image are required.');
      setSaving(false);
      return;
    }

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

    try {
      const path = editingId
        ? `/api/(landingpage)/ongoingfare/${editingId}`
        : '/api/(landingpage)/ongoingfare';
      const method = editingId ? 'PUT' : 'POST';

      const res = await fetch(path, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.error || 'Failed to save fare');
      }

      setMessage(editingId ? 'Ongoing fare updated successfully.' : 'Ongoing fare created successfully.');
      resetForm();
      fetchFares();
    } catch (err) {
      console.error('submission error:', err);
      setError((err as Error).message || 'Failed to save ongoing fare.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (fare: OngoingFare) => {
    setEditingId(fare.id);
    setForm({ ...fare });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this fare?')) return;
    setSaving(true);
    setError(null);
    setMessage(null);

    try {
      const res = await fetch(`/api/(landingpage)/ongoingfare/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.error || 'Failed to delete fare');
      setMessage('Fare deleted successfully.');
      fetchFares();
    } catch (err) {
      console.error('delete error:', err);
      setError((err as Error).message || 'Failed to delete fare.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
      <div className="max-w-6xl mx-auto p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Ongoing Fares Dashboard</h1>
            <p className="text-gray-500 mt-1">Create, edit and delete ongoing fare campaigns.</p>
          </div>
          <Link href="/dashboard/landingpage" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
        </div>

        <div className="space-y-3 mb-6">
          {error && <div className="rounded-lg bg-red-100 border border-red-200 text-red-700 p-3">{error}</div>}
          {message && <div className="rounded-lg bg-green-100 border border-green-200 text-green-700 p-3">{message}</div>}
        </div>

        <form onSubmit={handleSubmit} className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">{editingId ? 'Edit Ongoing Fare' : 'Create Ongoing Fare'}</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
              <input
                type="text"
                value={form.title || ''}
                onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Departure *</label>
              <input
                type="text"
                value={form.departure || ''}
                onChange={(e) => setForm((f) => ({ ...f, departure: e.target.value }))}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Arrival *</label>
              <input
                type="text"
                value={form.arrival || ''}
                onChange={(e) => setForm((f) => ({ ...f, arrival: e.target.value }))}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Expires</label>
              <input
                type="text"
                value={form.expires || ''}
                onChange={(e) => setForm((f) => ({ ...f, expires: e.target.value }))}
                placeholder="e.g., Ends in 2 days"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Original Price</label>
              <input
                type="text"
                value={form.originalPrice || ''}
                onChange={(e) => setForm((f) => ({ ...f, originalPrice: e.target.value }))}
                placeholder="£450"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discounted Price</label>
              <input
                type="text"
                value={form.discountedPrice || ''}
                onChange={(e) => setForm((f) => ({ ...f, discountedPrice: e.target.value }))}
                placeholder="£400"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Discount</label>
              <input
                type="text"
                value={form.discount || ''}
                onChange={(e) => setForm((f) => ({ ...f, discount: e.target.value }))}
                placeholder="5% OFF"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
              <select
                value={form.status || 'active'}
                onChange={(e) => setForm((f) => ({ ...f, status: e.target.value as 'active' | 'draft' }))}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
              >
                <option value="active">active</option>
                <option value="draft">draft</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
              <input
                type="text"
                value={form.image || ''}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                placeholder="https://..."
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Alt text</label>
              <input
                type="text"
                value={form.alt || ''}
                onChange={(e) => setForm((f) => ({ ...f, alt: e.target.value }))}
                placeholder="Dubai skyline"
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                value={form.description || ''}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                rows={3}
                className="w-full rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-300"
              />
            </div>
          </div>

          <div className="mt-4 flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-orange-500 text-white rounded-xl hover:bg-orange-600 transition disabled:opacity-50"
            >
              <Plus className="w-4 h-4" />
              {editingId ? 'Update Fare' : 'Add Fare'}
            </button>

            <button
              type="button"
              onClick={resetForm}
              className="inline-flex items-center px-4 py-2.5 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>
        </form>

        <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold">Ongoing Fare List</h2>
            <span className="text-sm text-gray-500">{fares.length} item{fares.length === 1 ? '' : 's'}</span>
          </div>

          {loading ? (
            <div className="text-center py-8 text-gray-500">Loading fares...</div>
          ) : fares.length === 0 ? (
            <div className="text-center py-8 text-gray-500">No ongoing fares yet.</div>
          ) : (
            <div className="overflow-x-auto rounded-lg">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-3 py-2 font-semibold text-gray-700">#</th>
                    <th className="px-3 py-2 font-semibold text-gray-700">Title</th>
                    <th className="px-3 py-2 font-semibold text-gray-700">Route</th>
                    <th className="px-3 py-2 font-semibold text-gray-700">Price</th>
                    <th className="px-3 py-2 font-semibold text-gray-700">Status</th>
                    <th className="px-3 py-2 font-semibold text-gray-700">Expires</th>
                    <th className="px-3 py-2 font-semibold text-gray-700">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {fares.map((fare, idx) => (
                    <tr key={fare.id} className="border-t border-gray-100 hover:bg-gray-50">
                      <td className="px-3 py-2 text-gray-600">{idx + 1}</td>
                      <td className="px-3 py-2 font-medium text-gray-800">{fare.title}</td>
                      <td className="px-3 py-2 text-gray-600">{fare.departure} → {fare.arrival}</td>
                      <td className="px-3 py-2 text-gray-600">{fare.discountedPrice || fare.originalPrice}</td>
                      <td className="px-3 py-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${fare.status === 'active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'}`}>
                          {fare.status}
                        </span>
                      </td>
                      <td className="px-3 py-2 text-gray-600">{fare.expires}</td>
                      <td className="px-3 py-2 flex gap-2">
                        <button
                          onClick={() => handleEdit(fare)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-gray-300 text-gray-600 hover:bg-gray-100"
                          title="Edit"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(fare.id)}
                          className="inline-flex items-center justify-center w-8 h-8 rounded-md border border-red-300 text-red-600 hover:bg-red-100"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
