'use client';
import Travel from '@/app/api/travels/types';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

export type ApiResponse = {
  success: boolean;
  data?: Travel;
  message?: string;
  error?: string;
}

const EditTravelPage = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [travel, setTravel] = useState<Travel | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (id) {
      fetchTravel();
    }
  }, [id]);

  const fetchTravel = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch(`/api/travels/${id}`);
      const data: ApiResponse = await res.json();
      if (data.success && data.data) {
        setTravel(data.data);
      } else {
        setError(data.error || 'Travel package not found');
      }
    } catch (error) {
      console.error("Failed to fetch", error);
      setError('Failed to fetch travel package');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    const formData = new FormData(e.currentTarget);
    const updatedTravel = {
      title: formData.get("title") as string,
      location: formData.get("location") as string,
      price: Number(formData.get("price")),
      originalPrice: Number(formData.get("originalPrice")),
      description: formData.get("description") as string,
      duration: formData.get("duration") as string,
      category: formData.get("category") as string,
      groupSize: formData.get("groupSize") as string,
      image: formData.get("image") as string,
      rating: Number(formData.get("rating")),
      reviews: Number(formData.get("reviews")),
    };

    try {
      const res = await fetch(`/api/travels/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedTravel),
      });
      const data: ApiResponse = await res.json();
      if (data.success && data.data) {
        setTravel(data.data);
        setSuccess('Travel package updated successfully!');
      } else {
        setError(data.error || 'Failed to update travel package');
      }
    } catch (error) {
      console.error("Failed to update", error);
      setError('Failed to update travel package');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this travel package? This action cannot be undone.")) {
      return;
    }

    try {
      const res = await fetch(`/api/travels/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (data.success) {
        router.push('/dashboard/travels');
      } else {
        setError(data.error || 'Failed to delete travel package');
      }
    } catch (error) {
      console.error("Failed to delete", error);
      setError('Failed to delete travel package');
    }
  };

  if (loading) {
    return (
      <main style={{ padding: '2rem' }}>
        <h1>Loading...</h1>
      </main>
    );
  }

  if (error && !travel) {
    return (
      <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ 
          backgroundColor: '#fee', 
          color: '#c00', 
          padding: '1rem', 
          borderRadius: '4px',
          marginBottom: '1rem' 
        }}>
          {error}
        </div>
        <button 
          onClick={() => router.push('/dashboard/travels')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Back to Travels
        </button>
      </main>
    );
  }

  if (!travel) {
    return null;
  }

  return (
    <main style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button 
          onClick={() => router.push('/dashboard/travels')}
          style={{
            padding: '0.5rem 1rem',
            backgroundColor: '#6c757d',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '1rem'
          }}
        >
          ← Back to All Travels
        </button>
        <h1>Edit Travel Package</h1>
      </div>

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

      {success && (
        <div style={{ 
          backgroundColor: '#dff0d8', 
          color: '#3c763d', 
          padding: '1rem', 
          borderRadius: '4px',
          marginBottom: '1rem' 
        }}>
          {success}
        </div>
      )}

      <form 
        onSubmit={handleSubmit}
        style={{ 
          padding: '2rem', 
          border: '1px solid #ddd',
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}
      >
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Title *
            </label>
            <input 
              name="title" 
              defaultValue={travel.title}
              required 
              style={{ 
                padding: '0.5rem', 
                fontSize: '1rem',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Location *
            </label>
            <input 
              name="location" 
              defaultValue={travel.location}
              required 
              style={{ 
                padding: '0.5rem', 
                fontSize: '1rem',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Price *
              </label>
              <input 
                name="price" 
                type="number"
                defaultValue={travel.price}
                required 
                style={{ 
                  padding: '0.5rem', 
                  fontSize: '1rem',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Original Price
              </label>
              <input 
                name="originalPrice" 
                type="number"
                defaultValue={travel.originalPrice}
                style={{ 
                  padding: '0.5rem', 
                  fontSize: '1rem',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Duration
            </label>
            <input 
              name="duration" 
              defaultValue={travel.duration}
              placeholder="e.g., 5 Days / 4 Nights"
              style={{ 
                padding: '0.5rem', 
                fontSize: '1rem',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Category
            </label>
            <input 
              name="category" 
              defaultValue={travel.category}
              placeholder="e.g., City Tour, Beach, Adventure"
              style={{ 
                padding: '0.5rem', 
                fontSize: '1rem',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Group Size
            </label>
            <input 
              name="groupSize" 
              defaultValue={travel.groupSize}
              placeholder="e.g., 2-8 people"
              style={{ 
                padding: '0.5rem', 
                fontSize: '1rem',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Rating
              </label>
              <input 
                name="rating" 
                type="number"
                step="0.1"
                min="0"
                max="5"
                defaultValue={travel.rating}
                style={{ 
                  padding: '0.5rem', 
                  fontSize: '1rem',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
                Reviews Count
              </label>
              <input 
                name="reviews" 
                type="number"
                min="0"
                defaultValue={travel.reviews}
                style={{ 
                  padding: '0.5rem', 
                  fontSize: '1rem',
                  width: '100%',
                  boxSizing: 'border-box'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Image URL
            </label>
            <input 
              name="image" 
              type="url"
              defaultValue={travel.image}
              placeholder="https://..."
              style={{ 
                padding: '0.5rem', 
                fontSize: '1rem',
                width: '100%',
                boxSizing: 'border-box'
              }}
            />
            {travel.image && (
              <img 
                src={travel.image} 
                alt="Preview"
                style={{ 
                  marginTop: '0.5rem',
                  width: '100%',
                  maxWidth: '400px',
                  height: '200px',
                  objectFit: 'cover',
                  borderRadius: '4px'
                }}
              />
            )}
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
              Description
            </label>
            <textarea 
              name="description" 
              defaultValue={travel.description}
              rows={6}
              style={{ 
                padding: '0.5rem', 
                fontSize: '1rem',
                width: '100%',
                boxSizing: 'border-box',
                fontFamily: 'inherit'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'space-between' }}>
            <button 
              type="submit"
              disabled={saving}
              style={{ 
                padding: '0.75rem 2rem', 
                fontSize: '1rem',
                backgroundColor: saving ? '#ccc' : '#0070f3',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: saving ? 'not-allowed' : 'pointer',
                flex: 1
              }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>

            <button 
              type="button"
              onClick={handleDelete}
              style={{ 
                padding: '0.75rem 2rem', 
                fontSize: '1rem',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Delete Package
            </button>
          </div>
        </div>
      </form>
    </main>
  );
}

export default EditTravelPage;