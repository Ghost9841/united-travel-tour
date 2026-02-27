'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Save, X, MapPin, DollarSign, BedDouble,
  Users, Image as ImageIcon, Hotel, Star, Trash2, Check,
} from 'lucide-react';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { toast } from 'sonner';

const ROOM_TYPES = [
  'Single Room', 'Double Room', 'Twin Room', 'Deluxe Suite',
  'Ocean View Room', 'Canal View Suite', 'Classic Double Room',
  'Premium Room', 'Alpine Suite', 'Imperial Room',
  'Caldera View Villa', 'Georgian Room', 'Superior Room', 'Canal House Room',
];

const CAPACITIES = ['1 guest', '2 guests', '2-3 guests', '2-4 guests', '2-6 guests', '3-4 guests', '4-6 guests'];

const ALL_AMENITIES = [
  'Free WiFi', 'Restaurant', 'Pool', 'Spa', 'Gym', 'Parking',
  'Bar', 'Room Service', 'Concierge', 'Airport Shuttle', 'Beach Access',
  'Breakfast Included', 'Bike Rental', 'Rooftop Bar', 'Butler Service',
  'Sauna', 'Business Center', 'Laundry Service', 'Pet Friendly', 'Kids Club',
];

const isNew = (id: string) => id === 'new';

export default function HotelFormPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const creating = isNew(id);

  const [loading, setLoading] = useState(!creating);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [imagePreview, setImagePreview] = useState('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: '',
    location: '',
    description: '',
    image: '',
    pricePerNight: '',
    originalPrice: '',
    rating: 4.5,
    reviews: 0,
    roomType: ROOM_TYPES[0],
    capacity: CAPACITIES[3],
    status: 'active' as 'active' | 'draft',
  });

  useEffect(() => {
    if (creating) return;
    (async () => {
      try {
        const res = await fetch(`/api/hotels/${id}`);
        const data = await res.json();
        if (data.success && data.data) {
          const h = data.data.hotel ?? data.data;
          setForm({
            name: h.name ?? '',
            location: h.location ?? '',
            description: h.description ?? '',
            image: h.image ?? '',
            pricePerNight: h.pricePerNight?.toString() ?? '',
            originalPrice: h.originalPrice?.toString() ?? '',
            rating: h.rating ?? 4.5,
            reviews: h.reviews ?? 0,
            roomType: h.roomType ?? ROOM_TYPES[0],
            capacity: h.capacity ?? CAPACITIES[3],
            status: h.status ?? 'active',
          });
          setSelectedAmenities(h.amenities ?? []);
          setImagePreview(h.image ?? '');
        } else {
          toast('Error', { description: 'Hotel not found' });
          router.push('/dashboard/hotels');
        }
      } catch {
        toast('Error', { description: 'Failed to load hotel' });
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const set = (k: string, v: unknown) => setForm(p => ({ ...p, [k]: v }));

  const toggleAmenity = (a: string) =>
    setSelectedAmenities(prev => prev.includes(a) ? prev.filter(x => x !== a) : [...prev, a]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const body = {
        ...form,
        pricePerNight: Number(form.pricePerNight),
        originalPrice: Number(form.originalPrice),
        amenities: selectedAmenities,
      };
      const res = await fetch(
        creating ? '/api/hotels' : `/api/hotels/${id}`,
        {
          method: creating ? 'POST' : 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      if (data.success) {
        toast('Success!', { description: creating ? 'Hotel created.' : 'Hotel updated.' });
        router.push('/dashboard/hotels');
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
      const res = await fetch(`/api/hotels/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast('Success!', { description: 'Hotel deleted.' });
        router.push('/dashboard/hotels');
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
            <Link href="/dashboard/hotels"
              className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
              <ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {creating ? 'Add New Hotel' : 'Edit Hotel'}
              </h1>
              <p className="text-sm text-gray-500 mt-0.5">
                {creating ? 'Fill in the details to add a hotel listing' : 'Update the hotel details'}
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
            <p className="text-sm text-gray-500 mb-5">Name, location and description</p>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Hotel Name *</label>
                  <input value={form.name} onChange={e => set('name', e.target.value)} required
                    placeholder="e.g., Luxury Palace Hotel"
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Location *</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-orange-400" />
                    <input value={form.location} onChange={e => set('location', e.target.value)} required
                      placeholder="e.g., Lisbon, Portugal"
                      className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description *</label>
                <textarea value={form.description} onChange={e => set('description', e.target.value)} required
                  rows={4} placeholder="Describe this hotel..."
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm resize-none" />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Pricing & Room Details</h2>
            <p className="text-sm text-gray-500 mb-5">Set prices, room type and capacity</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Price Per Night (£) *</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">£</span>
                  <input type="number" min="0" value={form.pricePerNight}
                    onChange={e => set('pricePerNight', e.target.value)} required placeholder="250"
                    className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Original Price (£)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">£</span>
                  <input type="number" min="0" value={form.originalPrice}
                    onChange={e => set('originalPrice', e.target.value)} placeholder="320"
                    className="w-full pl-7 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Room Type *</label>
                <div className="relative">
                  <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select value={form.roomType} onChange={e => set('roomType', e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white">
                    {ROOM_TYPES.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Capacity *</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <select value={form.capacity} onChange={e => set('capacity', e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent text-sm bg-white">
                    {CAPACITIES.map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Rating */}
            <div className="mt-5">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                Rating: <span className="text-orange-500">{form.rating} ★</span>
              </label>
              <input type="range" min="1" max="5" step="0.1" value={form.rating}
                onChange={e => set('rating', Number(e.target.value))}
                className="w-full accent-orange-500" />
              <div className="flex justify-between text-xs text-gray-400 mt-1"><span>1.0</span><span>5.0</span></div>
            </div>
          </div>

          {/* Amenities */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">
              Amenities
              <span className="ml-2 text-sm font-normal text-gray-400">({selectedAmenities.length} selected)</span>
            </h2>
            <p className="text-sm text-gray-500 mb-5">Select all amenities this hotel offers</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-orange-50 rounded-xl border border-orange-100">
              {ALL_AMENITIES.map(a => (
                <label key={a} className="flex items-center gap-2 cursor-pointer group/item">
                  <input type="checkbox" checked={selectedAmenities.includes(a)}
                    onChange={() => toggleAmenity(a)} className="accent-orange-500 w-4 h-4 rounded" />
                  <span className="text-sm text-gray-700 group-hover/item:text-orange-600 transition-colors">{a}</span>
                </label>
              ))}
            </div>
            {selectedAmenities.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-4">
                {selectedAmenities.map(a => (
                  <span key={a} className="inline-flex items-center gap-1.5 bg-orange-100 text-orange-700 text-xs px-2.5 py-1 rounded-full font-medium">
                    {a}
                    <button type="button" onClick={() => toggleAmenity(a)}>
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Image */}
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
            <h2 className="text-lg font-bold text-gray-900 mb-1">Hotel Image</h2>
            <p className="text-sm text-gray-500 mb-5">Add a cover image URL</p>
            <div className="relative">
              <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input value={form.image}
                onChange={e => { set('image', e.target.value); setImagePreview(e.target.value); }}
                placeholder="https://example.com/hotel.jpg"
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
                <p className="text-xs text-gray-500">Active listings are visible to users</p>
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
            <Link href="/dashboard/hotels"
              className="px-6 py-3 border-2 border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium text-sm">
              Cancel
            </Link>
            <button type="submit" disabled={saving}
              className="flex items-center gap-2 bg-orange-500 text-white px-8 py-3 rounded-xl hover:bg-orange-600 disabled:opacity-50 transition-all font-semibold shadow-md text-sm">
              {saving ? 'Saving...' : (<><Save className="w-4 h-4" />{creating ? 'Create Hotel' : 'Save Changes'}</>)}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}