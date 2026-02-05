'use client';
import { MapPin, Star, Check, X, Wifi, Coffee, Car, Dumbbell, Users, Clock, Shield, Smartphone } from 'lucide-react';
import { useParams } from 'next/navigation';

// This would typically come from an API or database
const hotels = {
  '1': {
    id: 1,
    name: "Luxury Palace Hotel",
    location: "Lisbon, Portugal",
    rating: 5.0,
    reviews: 1432,
    pricePerNight: 250,
    originalPrice: 320,
    roomType: "Deluxe Suite",
    capacity: "2-4 guests",
    mainImage: "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=300&h=200&fit=crop"
    ],
    description: "Experience ultimate luxury in the heart of Lisbon at our prestigious Palace Hotel. This magnificent property combines historic elegance with modern sophistication, offering guests an unforgettable stay in Portugal's capital.\n\nOur Deluxe Suites feature stunning city views, marble bathrooms, and premium amenities. Enjoy world-class dining at our Michelin-starred restaurant, relax in our spa sanctuary, or take a dip in the rooftop infinity pool overlooking the Tagus River.\n\nLocated steps from major attractions including São Jorge Castle and the historic Alfama district, our hotel provides the perfect base for exploring Lisbon's rich culture and vibrant nightlife.",
    amenities: [
      "Free High-Speed WiFi",
      "24/7 Room Service",
      "Michelin-Star Restaurant",
      "Rooftop Infinity Pool",
      "Full-Service Spa",
      "Fitness Center",
      "Valet Parking",
      "Concierge Service",
      "Airport Shuttle",
      "Business Center",
      "Bar & Lounge",
      "Laundry Service"
    ]
  },
  '2': {
    id: 2,
    name: "Grand View Resort",
    location: "Athens, Greece",
    rating: 4.8,
    reviews: 987,
    pricePerNight: 180,
    originalPrice: 240,
    roomType: "Ocean View Room",
    capacity: "2-3 guests",
    mainImage: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1200&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=300&h=200&fit=crop"
    ],
    description: "Discover breathtaking Aegean Sea views at our modern resort in Athens. Combining contemporary design with Greek hospitality, our resort offers the perfect blend of relaxation and cultural exploration.\n\nEach Ocean View Room features private balconies overlooking the stunning coastline, luxurious bedding, and modern amenities. Enjoy Mediterranean cuisine at our beachfront restaurant, unwind by the infinity pool, or explore the nearby ancient ruins.\n\nWith direct beach access and proximity to Athens' historic center, our resort provides an ideal retreat for travelers seeking both relaxation and adventure.",
    amenities: [
      "Free WiFi",
      "Private Beach Access",
      "Infinity Pool",
      "Beachfront Restaurant",
      "Pool Bar",
      "Water Sports",
      "Kids Club",
      "Spa Services",
      "Parking",
      "Tour Desk",
      "Room Service",
      "Fitness Room"
    ]
  },
  '3': {
    id: 3,
    name: "Historic Rome Plaza",
    location: "Rome, Italy",
    rating: 4.7,
    reviews: 1876,
    pricePerNight: 200,
    originalPrice: 280,
    roomType: "Classic Double Room",
    capacity: "2 guests",
    mainImage: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=1200&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=300&h=200&fit=crop"
    ],
    description: "Stay in a beautifully restored historic building in the heart of Rome, just steps from the Colosseum and Roman Forum. Our boutique hotel preserves the charm of old Rome while offering modern comfort and luxury.\n\nOur Classic Double Rooms feature original frescoes, high ceilings, and elegant Italian furnishings. Enjoy authentic Roman cuisine at our rooftop restaurant with panoramic views of the Eternal City.\n\nWith personalized concierge service and a prime location near major attractions, we provide the perfect base for your Roman holiday.",
    amenities: [
      "Free WiFi",
      "Rooftop Restaurant & Bar",
      "Concierge Service",
      "Daily Breakfast",
      "Room Service",
      "Library",
      "Meeting Rooms",
      "Laundry Service",
      "Bike Rental",
      "Tour Booking",
      "Private Parking",
      "Airport Transfer"
    ]
  }
};

export default function HotelDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const hotel = hotels[id as keyof typeof hotels];

  if (!hotel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Hotel Not Found</h1>
          <p className="text-gray-600 mb-6">The hotel you're looking for doesn't exist.</p>
          <a href="/hotels" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Back to All Hotels
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-orange-500">
      {/* Header Section */}
      <div className="max-w-8xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600 mt-20">
          <a href="/" className="hover:text-orange-500">Home</a>
          <span className="mx-2">/</span>
          <a href="/hotels" className="hover:text-orange-500">Hotels</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{hotel.name}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{hotel.name}</h1>
        
        {/* Location and Rating */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5 text-orange-500" />
            <span className="font-medium">{hotel.location}</span>
          </div>
          
          <div className="h-6 w-px bg-gray-300" />
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(hotel.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-gray-900">{hotel.rating}</span>
            <span className="text-gray-500">({hotel.reviews} reviews)</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Section - Images (3/4 width) */}
          <div className="lg:col-span-3">
            {/* Main Image */}
            <div className="mb-4">
              <img
                src={hotel.mainImage}
                alt={hotel.name}
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>

            {/* Gallery Images */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {hotel.galleryImages.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-32 object-cover rounded-lg cursor-pointer hover:opacity-80 transition-opacity"
                />
              ))}
            </div>

            {/* Features Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Free cancellation</h4>
                      <p className="text-sm text-gray-600">Cancel up to 24 hours before check-in</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Mobile check-in</h4>
                      <p className="text-sm text-gray-600">Fast and contactless</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Instant confirmation</h4>
                      <p className="text-sm text-gray-600">Booking confirmed immediately</p>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Health & Safety</h4>
                      <p className="text-sm text-gray-600">Enhanced cleaning protocols</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">24/7 Support</h4>
                      <p className="text-sm text-gray-600">Always here to help</p>
                    </div>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Room Capacity</h4>
                      <p className="text-sm text-gray-600">{hotel.capacity}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Hotel</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {hotel.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-gray-200 my-8"></div>

            {/* Amenities Section */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Hotel Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {hotel.amenities.map((amenity, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-gray-200 my-8"></div>

            {/* Room Details */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Room Details</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Room Type</span>
                  <span className="text-gray-900 font-semibold">{hotel.roomType}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Capacity</span>
                  <span className="text-gray-900 font-semibold">{hotel.capacity}</span>
                </div>
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Bed Type</span>
                  <span className="text-gray-900 font-semibold">King Size</span>
                </div>
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600 font-medium">Room Size</span>
                  <span className="text-gray-900 font-semibold">45 m²</span>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-gray-200 my-8"></div>

            {/* Policies */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Check-in/Check-out */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Check-in/Check-out</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Check-in from 3:00 PM</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Check-out until 11:00 AM</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Late check-out available</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Express check-in/out</span>
                  </li>
                </ul>
              </div>

              {/* Important Information */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Important Information</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">No smoking in rooms</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Pets allowed (extra fee)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Children welcome</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Valid ID required</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t-2 border-gray-200 my-8"></div>

            {/* Safety Measures */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Health & Safety Measures</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Enhanced cleaning between stays</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Hand sanitizer in all public areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Contactless check-in/check-out available</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Social distancing guidelines followed</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Staff wear protective equipment</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Booking Card (1/4 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-32">
              {/* <div className="mb-6">
                <p className="text-gray-500 text-sm mb-2">Price per night</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-orange-500">£{hotel.pricePerNight}</span>
                </div>
                {hotel.originalPrice && (
                  <p className="text-gray-400 line-through text-sm">£{hotel.originalPrice}</p>
                )}
              </div> */}

              {/* Date Selection */}
              <div className="mb-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                  <input type="date" className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500">
                    <option>1 Guest</option>
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                  </select>
                </div>
              </div>

              <a href="/book-now">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-colors mb-4">
                  BOOK NOW
                </button>
              </a>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Best price guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Free cancellation</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Instant confirmation</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-3">Need help with booking?</p>
                <p className="text-lg font-semibold text-gray-900">Call: +44 20 3725 3460</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}