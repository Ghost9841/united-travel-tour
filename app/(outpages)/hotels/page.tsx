import { MapPin, Star, Wifi, Coffee, Car, Dumbbell, Users, Check } from 'lucide-react';

const hotels = [
  {
    id: 1,
    name: "Luxury Palace Hotel",
    location: "Lisbon, Portugal",
    description: "Experience ultimate luxury in the heart of Lisbon with stunning city views and world-class amenities.",
    pricePerNight: 250,
    originalPrice: 320,
    rating: 5.0,
    reviews: 1432,
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",
    amenities: ["Free WiFi", "Restaurant", "Pool", "Spa", "Gym", "Parking"],
    roomType: "Deluxe Suite",
    capacity: "2-4 guests"
  },
  {
    id: 2,
    name: "Grand View Resort",
    location: "Athens, Greece",
    description: "Modern resort with breathtaking Aegean Sea views and luxurious accommodations.",
    pricePerNight: 180,
    originalPrice: 240,
    rating: 4.8,
    reviews: 987,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
    amenities: ["Free WiFi", "Beach Access", "Pool", "Restaurant", "Bar"],
    roomType: "Ocean View Room",
    capacity: "2-3 guests"
  },
  {
    id: 3,
    name: "Historic Rome Plaza",
    location: "Rome, Italy",
    description: "Stay in a beautifully restored historic building near the Colosseum and Roman Forum.",
    pricePerNight: 200,
    originalPrice: 280,
    rating: 4.7,
    reviews: 1876,
    image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop",
    amenities: ["Free WiFi", "Restaurant", "Rooftop Bar", "Concierge"],
    roomType: "Classic Double Room",
    capacity: "2 guests"
  },
  {
    id: 4,
    name: "Parisian Elegance Hotel",
    location: "Paris, France",
    description: "Boutique hotel with authentic Parisian charm, steps from the Eiffel Tower.",
    pricePerNight: 280,
    originalPrice: 350,
    rating: 4.9,
    reviews: 2103,
    image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800&h=600&fit=crop",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Room Service", "Concierge"],
    roomType: "Premium Room",
    capacity: "2 guests"
  },
  {
    id: 5,
    name: "Venice Canal Hotel",
    location: "Venice, Italy",
    description: "Romantic hotel on the Grand Canal with stunning water views and gondola service.",
    pricePerNight: 220,
    originalPrice: 290,
    rating: 4.8,
    reviews: 1543,
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop",
    amenities: ["Free WiFi", "Canal View", "Restaurant", "Gondola Service"],
    roomType: "Canal View Suite",
    capacity: "2-3 guests"
  },
  {
    id: 6,
    name: "Barcelona Beach Resort",
    location: "Barcelona, Spain",
    description: "Modern beachfront resort with Mediterranean cuisine and stunning seaside views.",
    pricePerNight: 190,
    originalPrice: 250,
    rating: 4.6,
    reviews: 1234,
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop",
    amenities: ["Free WiFi", "Beach Access", "Pool", "Restaurant", "Spa", "Gym"],
    roomType: "Sea View Room",
    capacity: "2-4 guests"
  },
  {
    id: 7,
    name: "Amsterdam Canal House",
    location: "Amsterdam, Netherlands",
    description: "Charming boutique hotel in a historic canal house with modern Dutch design.",
    pricePerNight: 160,
    originalPrice: 210,
    rating: 4.7,
    reviews: 876,
    image: "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800&h=600&fit=crop",
    amenities: ["Free WiFi", "Breakfast Included", "Bike Rental", "Bar"],
    roomType: "Canal House Room",
    capacity: "2 guests"
  },
  {
    id: 8,
    name: "Santorini Sunset Villa",
    location: "Santorini, Greece",
    description: "Luxury villa with infinity pool overlooking the caldera and famous Santorini sunsets.",
    pricePerNight: 350,
    originalPrice: 450,
    rating: 5.0,
    reviews: 1998,
    image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&h=600&fit=crop",
    amenities: ["Private Pool", "Free WiFi", "Breakfast", "Spa", "Butler Service"],
    roomType: "Caldera View Villa",
    capacity: "2-6 guests"
  },
  {
    id: 9,
    name: "Prague Castle View Hotel",
    location: "Prague, Czech Republic",
    description: "Elegant hotel with panoramic views of Prague Castle and the historic old town.",
    pricePerNight: 140,
    originalPrice: 190,
    rating: 4.6,
    reviews: 723,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=800&h=600&fit=crop",
    amenities: ["Free WiFi", "Restaurant", "Bar", "Castle View", "Breakfast"],
    roomType: "Superior Room",
    capacity: "2 guests"
  },
  {
    id: 10,
    name: "Swiss Alps Chalet",
    location: "Interlaken, Switzerland",
    description: "Cozy mountain chalet with stunning alpine views and access to ski slopes.",
    pricePerNight: 300,
    originalPrice: 380,
    rating: 4.9,
    reviews: 1456,
    image: "https://images.unsplash.com/photo-1587061949409-02df41d5e562?w=800&h=600&fit=crop",
    amenities: ["Free WiFi", "Mountain View", "Ski Access", "Sauna", "Restaurant"],
    roomType: "Alpine Suite",
    capacity: "2-4 guests"
  },
  {
    id: 11,
    name: "Vienna Imperial Hotel",
    location: "Vienna, Austria",
    description: "Historic grand hotel with imperial elegance near the famous Ringstrasse.",
    pricePerNight: 210,
    originalPrice: 270,
    rating: 4.8,
    reviews: 1654,
    image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=800&h=600&fit=crop",
    amenities: ["Free WiFi", "Restaurant", "Spa", "Ballroom", "Concierge"],
    roomType: "Imperial Room",
    capacity: "2 guests"
  },
  {
    id: 12,
    name: "Dublin Georgian Hotel",
    location: "Dublin, Ireland",
    description: "Charming Georgian townhouse hotel in the heart of Dublin's cultural quarter.",
    pricePerNight: 150,
    originalPrice: 200,
    rating: 4.5,
    reviews: 892,
    image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800&h=600&fit=crop",
    amenities: ["Free WiFi", "Breakfast", "Pub", "Library", "Fireplace"],
    roomType: "Georgian Room",
    capacity: "2 guests"
  }
];

export default function HotelsListingPage() {
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
            <p className="text-4xl font-bold text-orange-500 mb-2">4.7</p>
            <p className="text-gray-600">Average Rating</p>
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
                  src={hotel.image}
                  alt={hotel.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Room Type Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {hotel.roomType}
                  </span>
                </div>

                {/* Discount Badge */}
                {hotel.originalPrice && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save €{hotel.originalPrice - hotel.pricePerNight}
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
                    <span className="text-sm font-medium">{hotel.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{hotel.rating}</span>
                    <span className="text-sm text-gray-500">({hotel.reviews})</span>
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
                  <div>
                    <p className="text-sm text-gray-500">Per night</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-orange-500">€{hotel.pricePerNight}</span>
                      {hotel.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">€{hotel.originalPrice}</span>
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