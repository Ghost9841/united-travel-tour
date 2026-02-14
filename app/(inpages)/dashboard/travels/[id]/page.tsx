'use client';
import Travel from '@/app/api/travels/types';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

export default function EditTravelPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  
  const [travel, setTravel] = useState<Travel | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchTravel();
  }, [id]);

  const fetchTravel = async () => {
    try {
      const res = await fetch(`/api/travels/${id}`);
      const data = await res.json();
      if (data.success) {
        setTravel(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    
    const formData = new FormData(e.currentTarget);
    
    try {
      const res = await fetch(`/api/travels/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.get("title"),
          location: formData.get("location"),
          price: Number(formData.get("price")),
          description: formData.get("description"),
        }),
      });

      if (res.ok) {
        router.push('/dashboard/travels');
      }
    } catch (error) {
      console.error("Failed to update", error);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <main><h1>Loading...</h1></main>;
  if (!travel) return <main><h1>Travel not found</h1></main>;

  return (
    <main>
      <Link href="/dashboard/travels">← Back to list</Link>
      <h1>Edit Travel</h1>
      
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input name="title" defaultValue={travel.title} required />
        </div>
        <div>
          <label>Location</label>
          <input name="location" defaultValue={travel.location} required />
        </div>
        <div>
          <label>Price</label>
          <input name="price" type="number" defaultValue={travel.price} required />
        </div>
        <div>
          <label>Description</label>
          <textarea name="description" defaultValue={travel.description} />
        </div>
        <button type="submit" disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </main>
  );
}