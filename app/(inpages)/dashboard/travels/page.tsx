'use client';
import Travel from '@/app/api/travels/types';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

export type ApiResponse = {
  success: boolean;
  data: Travel | Travel[];
  message?: string;
  error?: string;
}

const TravelsAdminPage = () => {
  const [travels, setTravels] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchTravels();
  }, []);

  const fetchTravels = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch("/api/travels");
      const data: ApiResponse = await res.json();
      if (data.success && Array.isArray(data.data)) {
        setTravels(data.data);
      } else {
        setError('Failed to fetch travels');
      }
    } catch (error) {
      console.error("Failed to fetch", error);
      setError('Failed to fetch travels');
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
        setTravels((prevTravels) => [...prevTravels, data.data as Travel]);
        return { success: true };
      } else {
        setError(data.error || 'Failed to create travel');
        return { success: false };
      }
    } catch (error) {
      console.error("Failed to create", error);
      setError('Failed to create travel');
      return { success: false };
    }
  };

  const deleteTravel = async (id: number) => {
    if (!confirm("Are you sure you want to delete this travel package?")) return;

    try {
      const res = await fetch(`/api/travels/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        setTravels(prev => prev.filter(t => t.id !== id));
      } else {
        setError(data.error || 'Failed to delete travel');
      }
    } catch (error) {
      console.error("Failed to delete", error);
      setError('Failed to delete travel');
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const result = await createTravel({
      title: formData.get("title") as string,
      location: formData.get("location") as string,
      price: Number(formData.get("price")),
      originalPrice: Number(formData.get("originalPrice")) || Number(formData.get("price")),
      description: formData.get("description") as string,
      duration: formData.get("duration") as string || "N/A",
      category: formData.get("category") as string || "Uncategorized",
      groupSize: formData.get("groupSize") as string || "1-10 people",
      image: formData.get("image") as string || "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=600&fit=crop",
    });
    if (result?.success) {
      e.currentTarget.reset();
    }
  };

  if (loading) return (
    <main style={{ padding: '2rem' }}>
      <h1>Loading...</h1>
    </main>
  );

  return (
    <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>Travel Packages Admin</h1>

      {error && (
        <div style={{ 
          backgroundColor: '#fee', 
          color: '#c00', 
          padding: '1rem', 
          borderRadius: '4px',
          marginBottom: '1rem' 
        }}>
          {error}
        </div>
      )}

      <form 
        onSubmit={handleSubmit} 
        style={{ 
          marginBottom: '3rem', 
          padding: '2rem', 
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}
      >
        <h2>Create New Travel Package</h2>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <input 
            name="title" 
            placeholder="Title" 
            required 
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <input 
            name="location" 
            placeholder="Location" 
            required 
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <input 
            name="price" 
            type="number" 
            placeholder="Price" 
            required 
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <input 
            name="originalPrice" 
            type="number" 
            placeholder="Original Price (optional)" 
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <input 
            name="duration" 
            placeholder="Duration (e.g., 5 Days / 4 Nights)" 
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <input 
            name="category" 
            placeholder="Category (e.g., City Tour)" 
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <input 
            name="groupSize" 
            placeholder="Group Size (e.g., 2-8 people)" 
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <input 
            name="image" 
            placeholder="Image URL" 
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <textarea 
            name="description" 
            placeholder="Description" 
            rows={4}
            style={{ padding: '0.5rem', fontSize: '1rem' }}
          />
          <button 
            type="submit"
            style={{ 
              padding: '0.75rem', 
              fontSize: '1rem',
              backgroundColor: '#0070f3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Create Travel Package
          </button>
        </div>
      </form>

      <h2>Existing Travel Packages ({travels.length})</h2>
      <div style={{ display: 'grid', gap: '1rem' }}>
        {travels.map(travel => (
          <div 
            key={travel.id} 
            style={{ 
              border: '1px solid #ddd', 
              padding: '1.5rem', 
              borderRadius: '8px',
              backgroundColor: 'white',
              display: 'flex',
              gap: '1rem',
              alignItems: 'start'
            }}
          >
            <img 
              src={travel.image} 
              alt={travel.title}
              style={{ 
                width: '200px', 
                height: '150px', 
                objectFit: 'cover',
                borderRadius: '4px'
              }}
            />
            <div style={{ flex: 1 }}>
              <h3 style={{ marginTop: 0 }}>{travel.title}</h3>
              <p style={{ margin: '0.5rem 0', color: '#666' }}>
                📍 {travel.location}
              </p>
              <p style={{ margin: '0.5rem 0' }}>
                {travel.description}
              </p>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <span><strong>Price:</strong> ${travel.price}</span>
                {travel.originalPrice !== travel.price && (
                  <span style={{ textDecoration: 'line-through', color: '#999' }}>
                    ${travel.originalPrice}
                  </span>
                )}
                <span><strong>Duration:</strong> {travel.duration}</span>
                <span><strong>Category:</strong> {travel.category}</span>
                <span><strong>Group:</strong> {travel.groupSize}</span>
                <span><strong>Rating:</strong> ⭐ {travel.rating} ({travel.reviews} reviews)</span>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem' }}>
                <Link href={`/dashboard/travels/${travel.id}`}>
                  <button style={{
                    padding: '0.5rem 1rem',
                    backgroundColor: '#0070f3',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}>
                    Edit
                  </button>
                </Link>
                <button 
                  onClick={() => deleteTravel(travel.id)} 
                  style={{ 
                    padding: '0.5rem 1rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {travels.length === 0 && !loading && (
        <p style={{ textAlign: 'center', color: '#666', padding: '2rem' }}>
          No travel packages found. Create your first one above!
        </p>
      )}
    </main>
  );
}

export default TravelsAdminPage;