'use client'
import { Search, MapPin, Calendar, Users, PoundSterling, Star, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Destination {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  discountedPrice: number;
  image: string;
  rating: number;
  category: string;
  duration: string;
  status?: string;
  views?: number;
  likes?: number;
  createdAt?: string;
  updatedAt?: string;
}

export default function ExplorePage() {
  const [destinations, setDestinations] = useState<Destination[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [duration, setDuration] = useState('');

  useEffect(() => {
    const fetchDestinations = async () => {
      try {
        setLoading(true);
        const response = await fetch('/api/explore');
        const data = await response.json();

        if (data.success) {
          // Transform API data to match component expectations
          const transformedData = data.data.map((item: any) => ({
            ...item,
            duration: item.duration || "5 Days / 4 Nights",
            status: item.status || 'active',
            views: item.views || 0,
            likes: item.likes || 0,
          }));
          setDestinations(transformedData);
        } else {
          setError(data.error || 'Failed to load destinations');
        }
      } catch (err) {
        setError('Failed to load destinations');
        console.error('Error fetching destinations:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDestinations();
  }, []);

  const filteredDestinations = destinations.filter(dest => {
    // Only show active destinations
    if (dest.status !== 'active') return false;

    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !selectedLocation || dest.location.includes(selectedLocation);
    const matchesCategory = !selectedCategory || dest.category === selectedCategory;
    const matchesPrice = !priceRange ||
      (priceRange === 'low' && dest.discountedPrice < 600) ||
      (priceRange === 'medium' && dest.discountedPrice >= 600 && dest.discountedPrice < 900) ||
      (priceRange === 'high' && dest.discountedPrice >= 900);

    const matchesDuration = !duration ||
      (duration === 'short' && dest.duration.includes('1-3') || dest.duration.includes('4 days')) ||
      (duration === 'medium' && dest.duration.includes('5') || dest.duration.includes('6') || dest.duration.includes('7')) ||
      (duration === 'long' && dest.duration.includes('8'));

    return matchesSearch && matchesLocation && matchesCategory && matchesPrice && matchesDuration;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-6 mt-16">
          <h1 className="text-5xl font-bold mb-4">Explore Destinations</h1>
          <p className="text-lg text-orange-100">Discover your next adventure from our curated collection of destinations</p>
        </div>
      </div>

      {/* Search and Filters Section */}
      <div className="max-w-7xl mx-auto px-6 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6">
          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search destinations, cities, or experiences..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700"
              />
            </div>
          </div>


          {/* Results Count */}
          {!loading && !error && (
            <div className="mt-4 text-gray-600">
              <span className="font-semibold">{filteredDestinations.length}</span> destinations found
            </div>
          )}
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <div className="text-center">
              <Loader2 className="w-12 h-12 animate-spin text-orange-500 mx-auto mb-4" />
              <p className="text-gray-600">Loading destinations...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-16">
            <div className="text-red-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">Error loading destinations</h3>
            <p className="text-gray-500">{error}</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDestinations.map((offer) => (
                <Link
                  key={offer.id}
                  href={`/explore/${offer.id}`}
                  className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 block"
                >
                  {/* Image */}
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Location */}
                    <div className="flex items-center gap-1 text-gray-600 mb-2">
                      <MapPin className="w-4 h-4" />
                      <span className="text-sm">{offer.location}</span>
                    </div>
                    
                    {/* Title */}
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{offer.title}</h3>

                    {/* Description */}
                    <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                      {offer.description}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-gray-500 text-sm">From</p>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl font-bold text-orange-500">
                            £{offer.discountedPrice}
                          </span>
                          {offer.price !== offer.discountedPrice && (
                            <span className="text-gray-400 line-through text-sm">
                              £{offer.price}
                            </span>
                          )}
                        </div>
                      </div>
                      <div onClick={(e) => e.stopPropagation()}>
                        <Link href={`/checkout/explore/${offer.id}`}>
                          <button className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
                            BOOK NOW
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* No Results */}
            {filteredDestinations.length === 0 && destinations.length > 0 && (
              <div className="text-center py-16">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-2xl font-semibold text-gray-700 mb-2">No destinations found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}