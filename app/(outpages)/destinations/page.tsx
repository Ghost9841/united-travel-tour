'use client';

import { useState, useEffect } from 'react';
import { MapPin, Star, Clock, Users, Plane } from 'lucide-react';

interface Destination {
  id: number;
  name: string;
  country: string;
  description: string;
  image: string;
  price: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  duration: string;
  groupSize: string;
  category: string;
  status: 'active' | 'draft';
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        const res = await fetch('/api/destinations');
        const data: ApiResponse<Destination[]> = await res.json();
        if (data.success) {
          // Only show active destinations on the public page
          const activeDestinations = data.data.filter(d => d.status === 'active');
          setDestinations(activeDestinations);
        } else {
          console.error('Failed to fetch destinations:', data.error);
          setDestinations([]);
        }
      } catch (error) {
        console.error('Error fetching destinations:', error);
        setDestinations([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-8xl mx-auto px-6 mt-16">
          <h1 className="text-5xl font-bold mb-4">Explore Top Destinations</h1>
          <p className="text-xl text-orange-100">Discover the world's most captivating places with our expertly curated destination guides</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-6 py-12">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-orange-500 mb-2">100+</p>
            <p className="text-gray-600">Destinations</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-orange-500 mb-2">50+</p>
            <p className="text-gray-600">Countries</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-orange-500 mb-2">15k+</p>
            <p className="text-gray-600">Happy Travelers</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-orange-500 mb-2">4.8</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
        </div>

        {/* Destinations Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Popular Destinations</h2>
          <p className="text-gray-600 mb-8">Explore our handpicked selection of must-visit destinations around the world</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <a
              key={destination.id}
              href={`/destinations/${destination.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {destination.category}
                  </span>
                </div>

                {/* Discount Badge */}
                {destination.originalPrice && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save £{destination.originalPrice - destination.price}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Location & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">{destination.country}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                  {destination.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {destination.description}
                </p>

                {/* Details */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{destination.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{destination.groupSize}</span>
                  </div>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">Starting from</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-orange-500">£{destination.price}</span>
                      {destination.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">£{destination.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-medium transition-colors">
                    Explore
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
            Load More Destinations
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Can't Find Your Dream Destination?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Contact our travel experts to create a personalized itinerary tailored just for you
          </p>
          <button className="bg-white text-orange-500 hover:bg-orange-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
            Get Custom Itinerary
          </button>
        </div>
      </div>
    </div>
  );
}