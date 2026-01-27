import { MapPin, Star, Clock, Users } from 'lucide-react';

const travelPackages = [
  {
    id: 1,
    title: "Romantic Lisbon Getaway",
    location: "Lisbon, Portugal",
    description: "Explore the charming streets of Lisbon with a luxury stay, daily breakfast, and guided city tours.",
    price: 500,
    originalPrice: 700,
    duration: "5 Days / 4 Nights",
    rating: 4.8,
    reviews: 1245,
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=600&fit=crop",
    category: "City Tour",
    groupSize: "2-8 people"
  },
  {
    id: 2,
    title: "Historic Athens Experience",
    location: "Athens, Greece",
    description: "Discover ancient wonders of Greece with a premium hotel stay, meals included, and cultural sightseeing.",
    price: 800,
    originalPrice: 1000,
    duration: "6 Days / 5 Nights",
    rating: 4.9,
    reviews: 982,
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&h=600&fit=crop",
    category: "Historical",
    groupSize: "4-12 people"
  },
  {
    id: 3,
    title: "Classic Rome Holiday",
    location: "Rome, Italy",
    description: "Enjoy the timeless beauty of Rome with a 5-star hotel, breakfast, and guided historical tours.",
    price: 750,
    originalPrice: 900,
    duration: "7 Days / 6 Nights",
    rating: 4.7,
    reviews: 1567,
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
    category: "Historical",
    groupSize: "2-10 people"
  },
  {
    id: 4,
    title: "Paris City of Love",
    location: "Paris, France",
    description: "A romantic escape to Paris including luxury accommodation, breakfast, and city exploration.",
    price: 950,
    originalPrice: 1200,
    duration: "5 Days / 4 Nights",
    rating: 5.0,
    reviews: 2103,
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    category: "Romantic",
    groupSize: "2-6 people"
  },
  {
    id: 5,
    title: "Venice Canal Escape",
    location: "Venice, Italy",
    description: "Experience Venice's iconic canals with a premium stay, gondola ride, and breakfast included.",
    price: 880,
    originalPrice: 1100,
    duration: "4 Days / 3 Nights",
    rating: 4.8,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop",
    category: "Romantic",
    groupSize: "2-8 people"
  },
  {
    id: 6,
    title: "Barcelona City Highlights",
    location: "Barcelona, Spain",
    description: "Discover Gaudí's masterpieces and vibrant culture with guided tours and premium accommodation.",
    price: 780,
    originalPrice: 950,
    duration: "6 Days / 5 Nights",
    rating: 4.6,
    reviews: 1432,
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop",
    category: "City Tour",
    groupSize: "4-15 people"
  },
  {
    id: 7,
    title: "Amsterdam Canal Adventure",
    location: "Amsterdam, Netherlands",
    description: "Explore the charming canals, historic houses, and vibrant culture of Amsterdam.",
    price: 680,
    originalPrice: 850,
    duration: "5 Days / 4 Nights",
    rating: 4.7,
    reviews: 945,
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop",
    category: "City Tour",
    groupSize: "2-10 people"
  },
  {
    id: 8,
    title: "Santorini Sunset Paradise",
    location: "Santorini, Greece",
    description: "Experience breathtaking sunsets and white-washed buildings in the most romantic Greek island.",
    price: 1050,
    originalPrice: 1300,
    duration: "5 Days / 4 Nights",
    rating: 5.0,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop",
    category: "Romantic",
    groupSize: "2-6 people"
  },
  {
    id: 9,
    title: "Prague Medieval Tour",
    location: "Prague, Czech Republic",
    description: "Walk through centuries of history in Prague's stunning old town with castle tours.",
    price: 580,
    originalPrice: 750,
    duration: "6 Days / 5 Nights",
    rating: 4.6,
    reviews: 723,
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=600&fit=crop",
    category: "Historical",
    groupSize: "4-12 people"
  }
];

export default function TravelsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-8xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4">Discover Amazing Travel Packages</h1>
          <p className="text-xl text-orange-100">Handpicked destinations with expertly curated itineraries for unforgettable experiences</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-6 py-12">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-orange-500 mb-2">50+</p>
            <p className="text-gray-600">Destinations</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-orange-500 mb-2">10k+</p>
            <p className="text-gray-600">Happy Travelers</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-orange-500 mb-2">4.8</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-orange-500 mb-2">100%</p>
            <p className="text-gray-600">Satisfaction</p>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">All Travel Packages</h2>
          <p className="text-gray-600 mb-8">Browse through our carefully selected travel experiences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelPackages.map((pkg) => (
            <a
              key={pkg.id}
              href={`/travels/${pkg.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {pkg.category}
                  </span>
                </div>

                {/* Discount Badge */}
                {pkg.originalPrice && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save €{pkg.originalPrice - pkg.price}
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
                    <span className="text-sm font-medium">{pkg.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{pkg.rating}</span>
                    <span className="text-sm text-gray-500">({pkg.reviews})</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                  {pkg.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {pkg.description}
                </p>

                {/* Details */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{pkg.groupSize}</span>
                  </div>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-orange-500">€{pkg.price}</span>
                      {pkg.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">€{pkg.originalPrice}</span>
                      )}
                    </div>
                  </div>
                  
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
            Load More Packages
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Let us create a custom travel package tailored specifically to your preferences
          </p>
          <button className="bg-white text-orange-500 hover:bg-orange-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
            Request Custom Package
          </button>
        </div>
      </div>
    </div>
  );
}