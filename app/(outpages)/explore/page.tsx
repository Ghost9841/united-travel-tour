'use client'
import { Search, MapPin, Calendar, Users, DollarSign, Star } from 'lucide-react';
import { useState } from 'react';

const destinations = [
  {
    id: 1,
    title: "Romantic Lisbon Getaway",
    description: "Explore the charming streets of Lisbon with a luxury stay, daily breakfast, and guided city tours.",
    location: "Lisbon, Portugal",
    price: 700,
    discountedPrice: 500,
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=600&fit=crop",
    rating: 5,
    category: "City Tour",
    duration: "5 days"
  },
  {
    id: 2,
    title: "Historic Athens Experience",
    description: "Discover ancient wonders of Greece with a premium hotel stay, meals included, and cultural sightseeing.",
    location: "Athens, Greece",
    price: 1000,
    discountedPrice: 800,
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&h=600&fit=crop",
    rating: 5,
    category: "Historical",
    duration: "6 days"
  },
  {
    id: 3,
    title: "Classic Rome Holiday",
    description: "Enjoy the timeless beauty of Rome with a 5-star hotel, breakfast, and guided historical tours.",
    location: "Rome, Italy",
    price: 900,
    discountedPrice: 750,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
    rating: 5,
    category: "Historical",
    duration: "7 days"
  },
  {
    id: 4,
    title: "Paris City of Love",
    description: "A romantic escape to Paris including luxury accommodation, breakfast, and city exploration.",
    location: "Paris, France",
    price: 1200,
    discountedPrice: 950,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    rating: 5,
    category: "Romantic",
    duration: "5 days"
  },
  {
    id: 5,
    title: "Venice Canal Escape",
    description: "Experience Venice's iconic canals with a premium stay, gondola ride, and breakfast included.",
    location: "Venice, Italy",
    price: 1100,
    discountedPrice: 880,
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop",
    rating: 5,
    category: "Romantic",
    duration: "4 days"
  },
  {
    id: 6,
    title: "Barcelona City Highlights",
    description: "Discover Gaudí's masterpieces and vibrant culture with guided tours and premium accommodation.",
    location: "Barcelona, Spain",
    price: 950,
    discountedPrice: 780,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop",
    rating: 4.5,
    category: "City Tour",
    duration: "6 days"
  },
  {
    id: 7,
    title: "Amsterdam Canal Adventure",
    description: "Explore the charming canals, historic houses, and vibrant culture of Amsterdam with guided tours.",
    location: "Amsterdam, Netherlands",
    price: 850,
    discountedPrice: 680,
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop",
    rating: 4.5,
    category: "City Tour",
    duration: "5 days"
  },
  {
    id: 8,
    title: "Santorini Sunset Paradise",
    description: "Experience breathtaking sunsets, white-washed buildings, and crystal blue waters in Santorini.",
    location: "Santorini, Greece",
    price: 1300,
    discountedPrice: 1050,
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop",
    rating: 5,
    category: "Romantic",
    duration: "5 days"
  },
  {
    id: 9,
    title: "Prague Medieval Tour",
    description: "Walk through centuries of history in Prague's stunning old town with castle tours and local cuisine.",
    location: "Prague, Czech Republic",
    price: 750,
    discountedPrice: 580,
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=600&fit=crop",
    rating: 4.5,
    category: "Historical",
    duration: "6 days"
  },
  {
    id: 10,
    title: "Swiss Alps Adventure",
    description: "Experience the majestic Swiss Alps with mountain excursions, scenic trains, and luxury alpine resorts.",
    location: "Interlaken, Switzerland",
    price: 1400,
    discountedPrice: 1150,
    image: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=800&h=600&fit=crop",
    rating: 5,
    category: "Adventure",
    duration: "7 days"
  },
  {
    id: 11,
    title: "Vienna Imperial Experience",
    description: "Discover Vienna's imperial palaces, classical music heritage, and world-famous coffee culture.",
    location: "Vienna, Austria",
    price: 900,
    discountedPrice: 720,
    image: "https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&h=600&fit=crop",
    rating: 4.5,
    category: "Historical",
    duration: "5 days"
  },
  {
    id: 12,
    title: "Dublin Irish Heritage",
    description: "Immerse yourself in Irish culture with pub tours, historical sites, and the scenic Cliffs of Moher.",
    location: "Dublin, Ireland",
    price: 800,
    discountedPrice: 650,
    image: "https://images.unsplash.com/photo-1549918864-48ac978761a4?w=800&h=600&fit=crop",
    rating: 4,
    category: "City Tour",
    duration: "6 days"
  },
  {
    id: 13,
    title: "Budapest Thermal Spa",
    description: "Relax in historic thermal baths and explore Budapest's stunning architecture along the Danube.",
    location: "Budapest, Hungary",
    price: 700,
    discountedPrice: 550,
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&h=600&fit=crop",
    rating: 4.5,
    category: "City Tour",
    duration: "5 days"
  },
  {
    id: 14,
    title: "London Royal Tour",
    description: "Experience royal London with palace tours, West End shows, and iconic landmarks.",
    location: "London, United Kingdom",
    price: 1100,
    discountedPrice: 900,
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800&h=600&fit=crop",
    rating: 5,
    category: "Historical",
    duration: "6 days"
  },
  {
    id: 15,
    title: "Edinburgh Castle & Highlands",
    description: "Explore Edinburgh's medieval fortress and venture into the breathtaking Scottish Highlands.",
    location: "Edinburgh, Scotland",
    price: 950,
    discountedPrice: 780,
    image: "https://images.unsplash.com/photo-1555297332-5004c0f2ce48?w=800&h=600&fit=crop",
    rating: 4.5,
    category: "Historical",
    duration: "7 days"
  },
  {
    id: 16,
    title: "Amalfi Coast Paradise",
    description: "Discover the stunning coastal towns of Positano, Amalfi, and Ravello with Mediterranean cuisine.",
    location: "Amalfi Coast, Italy",
    price: 1250,
    discountedPrice: 1000,
    image: "https://images.unsplash.com/photo-1534113414509-0bd4d66f1c4f?w=800&h=600&fit=crop",
    rating: 5,
    category: "Romantic",
    duration: "6 days"
  },
  {
    id: 17,
    title: "Berlin History & Culture",
    description: "Walk through history from the Berlin Wall to modern art galleries and vibrant nightlife.",
    location: "Berlin, Germany",
    price: 800,
    discountedPrice: 640,
    image: "https://images.unsplash.com/photo-1524422926292-d321c3ff46f2?w=800&h=600&fit=crop",
    rating: 4.5,
    category: "Historical",
    duration: "5 days"
  },
  {
    id: 18,
    title: "Croatian Island Hopping",
    description: "Sail through the Adriatic, exploring Dubrovnik, Split, and the stunning Dalmatian islands.",
    location: "Dubrovnik, Croatia",
    price: 1100,
    discountedPrice: 880,
    image: "https://images.unsplash.com/photo-1555990538-e8d787d1b6db?w=800&h=600&fit=crop",
    rating: 5,
    category: "Adventure",
    duration: "8 days"
  }
];

export default function ExplorePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState('');
  const [duration, setDuration] = useState('');

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         dest.location.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = !selectedLocation || dest.location.includes(selectedLocation);
    const matchesCategory = !selectedCategory || dest.category === selectedCategory;
    const matchesPrice = !priceRange || 
      (priceRange === 'low' && dest.discountedPrice < 600) ||
      (priceRange === 'medium' && dest.discountedPrice >= 600 && dest.discountedPrice < 900) ||
      (priceRange === 'high' && dest.discountedPrice >= 900);
    
    return matchesSearch && matchesLocation && matchesCategory && matchesPrice;
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

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Location Filter */}
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedLocation}
                onChange={(e) => setSelectedLocation(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 appearance-none bg-white cursor-pointer"
              >
                <option value="">All Locations</option>
                <option value="Portugal">Portugal</option>
                <option value="Greece">Greece</option>
                <option value="Italy">Italy</option>
                <option value="France">France</option>
                <option value="Spain">Spain</option>
                <option value="Netherlands">Netherlands</option>
                <option value="Czech Republic">Czech Republic</option>
                <option value="Switzerland">Switzerland</option>
                <option value="Austria">Austria</option>
                <option value="Ireland">Ireland</option>
                <option value="Hungary">Hungary</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="Scotland">Scotland</option>
                <option value="Germany">Germany</option>
                <option value="Croatia">Croatia</option>
              </select>
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 appearance-none bg-white cursor-pointer"
              >
                <option value="">All Categories</option>
                <option value="City Tour">City Tour</option>
                <option value="Historical">Historical</option>
                <option value="Romantic">Romantic</option>
                <option value="Adventure">Adventure</option>
              </select>
            </div>

            {/* Price Range Filter */}
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 appearance-none bg-white cursor-pointer"
              >
                <option value="">All Prices</option>
                <option value="low">Under €600</option>
                <option value="medium">€600 - €900</option>
                <option value="high">€900+</option>
              </select>
            </div>

            {/* Duration Filter */}
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <select
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent text-gray-700 appearance-none bg-white cursor-pointer"
              >
                <option value="">Any Duration</option>
                <option value="short">1-4 days</option>
                <option value="medium">5-7 days</option>
                <option value="long">8+ days</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mt-4 text-gray-600">
            <span className="font-semibold">{filteredDestinations.length}</span> destinations found
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDestinations.map((offer) => (
            <div
              key={offer.id}
              className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
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

                {/* Stars */}
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(offer.rating)
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
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
                  <a href="/booknow">
                    <button className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
                      BOOK NOW
                    </button>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDestinations.length === 0 && (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <Search className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-2">No destinations found</h3>
            <p className="text-gray-500">Try adjusting your filters or search terms</p>
          </div>
        )}
      </div>
    </div>
  );
}