'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Save, X, MapPin, Image as ImageIcon,
  Globe2, Trash2, Type,
} from 'lucide-react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const isNew = (id: string) => id === 'new';

export default function PopularDestinationFormPage() {
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
    location: '',
    description: '',
    src: '',
    alt: '',
    status: 'active' as 'active' | 'draft',
  });

  useEffect(() => {
    if (creating) return;
    (async () => {
      try {
        const res = await fetch(`/api/popular-destinations/${id}`);
        const data = await res.json();
        if (data.success && data.data) {
          const d = data.data.destination ?? data.data;
          setForm({
            name: d.name ?? '',
            location: d.location ?? '',
            description: d.description ?? '',
            src: d.src ?? '',
            alt: d.alt ?? '',
            status: d.status ?? 'active',
          });
          setImagePreview(d.src ?? '');
        } else {
          toast('Error', { description: 'Destination not found' });
          router.push('/dashboard/popular-destinations');
        }
      } catch {
        toast('Error', { description: 'Failed to load destination' });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const set = (k: string, v: unknown) => setForm(p => ({ ...p, [k]: v }));

  // Auto-generate alt from name if empty
  const handleNameChange = (v: string) => {
    set('name', v);
    if (!form.alt || form.alt === form.name) set('alt', v);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await fetch(
        creating ? '/api/popular-destinations' : `/api/popular-destinations/${id}`,
        {
          method: creating ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast('Success!', { description: creating ? 'Destination created.' : 'Destination updated.' });
        router.push('/dashboard/popular-destinations');
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
      const res = await fetch(`/api/popular-destinations/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast('Success!', { description: 'Destination deleted.' });
        router.push('/dashboard/popular-destinations');
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
            <Link href="/dashboard/popular-destinations"
              className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {creating ? 'Add Popular Destination' : 'Edit Destination'}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {creating ? 'Add a destination to the homepage carousel' : 'Update this carousel destination'}
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
                    This will permanently delete &quot;{form.name}&quot;. It will be removed from the homepage carousel.
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
            <h2 className="text-lg font-bold text-gray-900 mb-1">Destination Info</h2>
            <p className="text-sm text-gray-500 mb-5">Name, location and description shown on hover</p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Name *</label>
                  <div className="relative">
                    <Globe2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input value={form.name} onChange={e => handleNameChange(e.target.value)} required
                      placeholder="e.g., Pasupati Nath"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                    <input value={form.location} onChange={e => set('location', e.target.value)} required
                      placeholder="e.g., Kathmandu, Nepal"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description *</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} required
                  rows={4} placeholder="Describe this destination — shown on card hover..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm resize-none" />
                <p className="text-xs text-gray-400 mt-1">Displayed on the card when the user hovers. Keep it concise and engaging.</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Image</h2>
            <p className="text-sm text-gray-500 mb-5">
              Use a full URL or a local path like{' '}
              <code className="bg-gray-100 px-1.5 py-0.5 rounded text-xs">/2026/pasupati_nath.jpeg</code>
            </p>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Image Path / URL (src) *</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input value={form.src} required
                    onChange={e => { set('src', e.target.value); setImagePreview(e.target.value); }}
                    placeholder="https://... or /2026/your-image.jpeg"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Alt Text *</label>
                <div className="relative">
                  <Type className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input value={form.alt} onChange={e => set('alt', e.target.value)} required
                    placeholder="e.g., Pasupati Nath Temple Kathmandu"
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
                <p className="text-xs text-gray-400 mt-1">Descriptive text for accessibility and SEO. Auto-filled from name.</p>
              </div>

              {/* Preview */}
              {imagePreview && (
                <div className="relative rounded-xl overflow-hidden border border-gray-100">
                  <img src={imagePreview} alt="preview" className="w-full h-56 object-cover"
                    onError={() => setImagePreview('')} />
                  {/* Hover overlay preview */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <p className="font-bold text-base drop-shadow-lg">{form.name || 'Destination Name'}</p>
                    <div className="flex items-center gap-1 text-xs mt-0.5 text-gray-200">
                      <MapPin className="w-3 h-3" />{form.location || 'Location'}
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded-lg">
                    Frontend preview
                  </div>
                  <button type="button" onClick={() => { setImagePreview(''); set('src', ''); }}
                    className="absolute top-2 left-2 p-1.5 bg-white rounded-lg shadow hover:bg-red-50">
                    <X className="w-3.5 h-3.5 text-red-500" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Settings */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-5">Settings</h2>
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div>
                <p className="text-sm font-semibold text-gray-800">Status</p>
                <p className="text-xs text-gray-500">Active destinations appear in the homepage carousel</p>
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
            <Link href="/dashboard/popular-destinations"
              className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm">
              Cancel
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 disabled:opacity-50 transition-all font-semibold shadow-md text-sm">
              {saving ? 'Saving...' : (<><Save className="w-4 h-4" />{creating ? 'Add to Carousel' : 'Save Changes'}</>)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}