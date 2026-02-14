'use client';
import Travel from '@/app/api/travels/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

export type ApiResponse = {
  success: boolean;
  data: Travel | Travel[];
  message?: string;
}

const TravelsAdminPage = () => {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTravels();
  }, []);

  const fetchTravels = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/travels");
      const data: ApiResponse = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setTravels(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch", error);
    } finally {
      setLoading(false);
    }
  };

  const createTravel = async (newTravelData: Partial<Travel>) => {
    try {
      const res = await fetch("/api/travels", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTravelData),
      });
      const data: ApiResponse = await res.json();
      if (data.success && !Array.isArray(data.data)) {
        setTravels((prevTravels) => [...prevTravels, data.data as Travel]); // ← Fix here
        return { success: true };
      }
    } catch (error) {
      console.error("Failed to create", error);
      return { success: false };
    }
  };

  const deleteTravel = async (id: number) => {
    if (!confirm("Delete this travel?")) return;

    try {
      const res = await fetch(`/api/travels/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setTravels(prev => prev.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error("Failed to delete", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await createTravel({
      title: formData.get("title") as string,
      location: formData.get("location") as string,
      price: Number(formData.get("price")),
      description: formData.get("description") as string,
    });
    if (result?.success) {
      e.currentTarget.reset();
    }
  };

  if (loading) return <main><h1>Loading...</h1></main>;

  return (
    <main>
      <h1>Admin Travels</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <h2>Create New Travel</h2>
        <input name="title" placeholder="Title" required />
        <input name="location" placeholder="Location" required />
        <input name="price" type="number" placeholder="Price" required />
        <textarea name="description" placeholder="Description" />
        <button type="submit">Create</button>
      </form>

      <h2>Existing Travels</h2>
      {travels.map(travel => (
        <div key={travel.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h3>{travel.title}</h3>
          <p>{travel.location}</p>
          <p>${travel.price}</p>
          <Link href={`/dashboard/travels/${travel.id}`}>
            <button>Edit</button>
          </Link>
          <button onClick={() => deleteTravel(travel.id)} style={{ marginLeft: '0.5rem', color: 'red' }}>
            Delete
          </button>
        </div>
      ))}
    </main>
  )
}

export default TravelsAdminPage