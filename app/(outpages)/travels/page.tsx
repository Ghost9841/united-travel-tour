'use client';

import Travel, { ApiResponse } from '@/app/api/travels/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

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
      
      console.log("GET response:", data); // Debug log
      
      if (data.success && data.data?.travels) {
        setTravels(data.data.travels);
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
      
      console.log("POST response:", data); // Debug log
      
      if (data.success && data.data?.travels?.[0]) {
        setTravels((prevTravels: Travel[]) => [...prevTravels, data.data!.travels[0]]);
        return { success: true };
      }
      return { success: false };
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
      duration: formData.get("duration") as string,
      category: formData.get("category") as string,
      groupSize: formData.get("groupSize") as string,
      image: formData.get("image") as string,
    });
    
    if (result?.success) {
      e.currentTarget.reset();
    }
  };

  if (loading) return <main style={{ padding: '2rem' }}><h1>Loading...</h1></main>;

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ marginBottom: '2rem' }}>Admin Travels</h1>

      <form 
        onSubmit={handleSubmit} 
        style={{ 
          marginBottom: '2rem', 
          padding: '1.5rem', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          background: '#f9f9f9'
        }}
      >
        <h2 style={{ marginTop: 0 }}>Create New Travel</h2>
        
        <div style={{ marginBottom: '1rem' }}>
          <input 
            name="title" 
            placeholder="Title" 
            required 
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          <input 
            name="location" 
            placeholder="Location" 
            required 
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          <input 
            name="price" 
            type="number" 
            placeholder="Price" 
            required 
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          <input 
            name="duration" 
            placeholder="Duration (e.g., 5 Days / 4 Nights)" 
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          <input 
            name="category" 
            placeholder="Category (e.g., City Tour)" 
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          <input 
            name="groupSize" 
            placeholder="Group Size (e.g., 2-8 people)" 
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          <input 
            name="image" 
            placeholder="Image URL" 
            style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem' }}
          />
          <textarea 
            name="description" 
            placeholder="Description" 
            rows={3}
            style={{ width: '100%', padding: '0.5rem' }}
          />
        </div>
        
        <button 
          type="submit"
          style={{
            padding: '0.75rem 1.5rem',
            background: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Create Travel
        </button>
      </form>

      <h2>Existing Travels ({travels.length})</h2>
      
      {travels.length === 0 ? (
        <p style={{ color: '#666' }}>No travels found. Create one above!</p>
      ) : (
        travels.map(travel => (
          <div 
            key={travel.id} 
            style={{ 
              border: '1px solid #ccc', 
              padding: '1.5rem', 
              marginBottom: '1rem',
              borderRadius: '8px',
              background: 'white'
            }}
          >
            <h3 style={{ marginTop: 0 }}>{travel.title}</h3>
            <p><strong>Location:</strong> {travel.location}</p>
            <p><strong>Price:</strong> ${travel.price} <span style={{ textDecoration: 'line-through', color: '#999' }}>${travel.originalPrice}</span></p>
            <p><strong>Duration:</strong> {travel.duration}</p>
            <p><strong>Category:</strong> {travel.category}</p>
            <p style={{ color: '#666', fontSize: '0.9rem' }}>{travel.description}</p>
            
            <div style={{ marginTop: '1rem' }}>
              <Link href={`/dashboard/travels/${travel.id}`}>
                <button style={{ marginRight: '0.5rem' }}>Edit</button>
              </Link>
              <button 
                onClick={() => deleteTravel(travel.id)} 
                style={{ color: 'red' }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </main>
  );
};

export default TravelsAdminPage;