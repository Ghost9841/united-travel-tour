'use client';

import { useState, useEffect } from 'react';
import { MapPin, Star, Wifi, Coffee, Car, Dumbbell, Users, Check } from 'lucide-react';

interface Hotel {
  id: number;
  name: string;
  location: string;
  description: string;
  pricePerNight: number;
  originalPrice: number;
  rating: number;
  reviews: number;
  images: string[];
  amenities: string[];
  roomType: string;
  capacity: string;
  status: 'active' | 'draft';
  createdAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

export default function HotelsListingPage() {
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const res = await fetch('/api/hotels');
        const data: ApiResponse<Hotel[]> = await res.json();
        if (data.success) {
          // Only show active hotels on the public page
          const activeHotels = data.data.filter(h => h.status === 'active');
          setHotels(activeHotels);
        } else {
          console.error('Failed to fetch hotels:', data.error);
          setHotels([]);
        }
      } catch (error) {
        console.error('Error fetching hotels:', error);
        setHotels([]);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4" />
          <p className="text-gray-500">Loading hotels...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-8xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4 mt-10">Find Your Perfect Stay</h1>
          <p className="text-xl text-orange-100">Handpicked luxury hotels and resorts across Europe's most beautiful destinations</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-6 py-12">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-orange-500 mb-2">500+</p>
            <p className="text-gray-600">Premium Hotels</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-orange-500 mb-2">50+</p>
            <p className="text-gray-600">Cities</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-orange-500 mb-2">24/7</p>
            <p className="text-gray-600">Support</p>
          </div>
        </div>

        {/* Hotels Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Featured Hotels</h2>
          <p className="text-gray-600 mb-8">Discover our curated selection of luxury accommodations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {hotels.map((hotel) => (
            <a
              key={hotel.id}
              href={`/hotels/${hotel.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                      src={hotel.images?.[0] ?? 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Room Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {hotel.roomType}
                  </span>
                </div>

                {/* Discount Badge
                {hotel.originalPrice && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save £{hotel.originalPrice - hotel.pricePerNight}
                    </span>
                  </div>
                )}
                as */}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Location & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">{hotel.location}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                  {hotel.name}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {hotel.description}
                </p>

                {/* Amenities Icons */}
                <div className="flex items-center gap-3 mb-4 text-gray-500">
                  {hotel.amenities.includes("Free WiFi") && <Wifi className="w-4 h-4" />}
                  {hotel.amenities.includes("Restaurant") && <Coffee className="w-4 h-4" />}
                  {hotel.amenities.includes("Parking") && <Car className="w-4 h-4" />}
                  {hotel.amenities.includes("Gym") && <Dumbbell className="w-4 h-4" />}
                  <Users className="w-4 h-4" />
                  <span className="text-xs">{hotel.capacity}</span>
                </div>

                {/* Amenities List */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {hotel.amenities.slice(0, 3).map((amenity, idx) => (
                    <span key={idx} className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded-full">
                      {amenity}
                    </span>
                  ))}
                  {hotel.amenities.length > 3 && (
                    <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                      +{hotel.amenities.length - 3} more
                    </span>
                  )}
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <a href={`/checkout/hotel/${hotel.id}`}>
                    <button className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
                      BOOK NOW
                    </button>
                  </a>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
            Load More Hotels
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Need Help Finding the Perfect Hotel?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Our travel experts are ready to help you find accommodations that match your preferences and budget
          </p>
          <button className="bg-white text-orange-500 hover:bg-orange-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
            Contact Our Experts
          </button>
        </div>
      </div>
    </div>
  );
}