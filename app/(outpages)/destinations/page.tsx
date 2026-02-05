import { MapPin, Star, Clock, Users, Plane } from 'lucide-react';

const destinations = [
  {
    id: 1,
    name: "Lisbon, Portugal",
    country: "Portugal",
    description: "Experience the charm of Portugal's coastal capital with its historic neighborhoods, stunning views, and vibrant culture.",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=600&fit=crop",
    price: 899,
    originalPrice: 1199,
    rating: 4.8,
    reviews: 2543,
    duration: "5 Days",
    groupSize: "2-15 people",
    category: "City Break"
  },
  {
    id: 2,
    name: "Athens, Greece",
    country: "Greece",
    description: "Explore ancient wonders and modern Greek culture in the birthplace of Western civilization.",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&h=600&fit=crop",
    price: 1099,
    originalPrice: 1399,
    rating: 4.9,
    reviews: 1876,
    duration: "6 Days",
    groupSize: "2-12 people",
    category: "Historical"
  },
  {
    id: 3,
    name: "Rome, Italy",
    country: "Italy",
    description: "Discover the Eternal City's ancient ruins, Renaissance art, and world-class cuisine.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
    price: 1199,
    originalPrice: 1499,
    rating: 4.7,
    reviews: 3210,
    duration: "7 Days",
    groupSize: "2-10 people",
    category: "Cultural"
  },
  {
    id: 4,
    name: "Paris, France",
    country: "France",
    description: "Fall in love with the City of Light's romantic atmosphere, iconic landmarks, and culinary delights.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    price: 1399,
    originalPrice: 1799,
    rating: 5.0,
    reviews: 4521,
    duration: "5 Days",
    groupSize: "2-8 people",
    category: "Romantic"
  },
  {
    id: 5,
    name: "Barcelona, Spain",
    country: "Spain",
    description: "Immerse yourself in Gaudí's architectural wonders and vibrant Catalan culture by the Mediterranean.",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop",
    price: 999,
    originalPrice: 1299,
    rating: 4.8,
    reviews: 2876,
    duration: "6 Days",
    groupSize: "2-12 people",
    category: "City Break"
  },
  {
    id: 6,
    name: "Santorini, Greece",
    country: "Greece",
    description: "Experience breathtaking sunsets and stunning volcanic landscapes on this iconic Greek island.",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop",
    price: 1499,
    originalPrice: 1899,
    rating: 5.0,
    reviews: 3654,
    duration: "5 Days",
    groupSize: "2-6 people",
    category: "Island Getaway"
  },
  {
    id: 7,
    name: "Amsterdam, Netherlands",
    country: "Netherlands",
    description: "Explore charming canals, world-class museums, and vibrant neighborhoods in this Dutch capital.",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop",
    price: 899,
    originalPrice: 1199,
    rating: 4.7,
    reviews: 1987,
    duration: "5 Days",
    groupSize: "2-10 people",
    category: "City Break"
  },
  {
    id: 8,
    name: "Prague, Czech Republic",
    country: "Czech Republic",
    description: "Step into a fairy tale in this medieval city with stunning architecture and rich history.",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=600&fit=crop",
    price: 799,
    originalPrice: 1099,
    rating: 4.6,
    reviews: 1543,
    duration: "6 Days",
    groupSize: "2-15 people",
    category: "Historical"
  },
  {
    id: 9,
    name: "Venice, Italy",
    country: "Italy",
    description: "Float through romantic canals and discover the unique beauty of this floating city.",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop",
    price: 1299,
    originalPrice: 1599,
    rating: 4.9,
    reviews: 2765,
    duration: "4 Days",
    groupSize: "2-8 people",
    category: "Romantic"
  }
];

export default function DestinationsPage() {
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
                  
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{destination.rating}</span>
                    <span className="text-sm text-gray-500">({destination.reviews})</span>
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