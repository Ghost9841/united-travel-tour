'use client';
import { MapPin, Star, Check, X, Clock, Shield, Users, Smartphone, Plane, Hotel } from 'lucide-react';
import { useParams } from 'next/navigation';

const destinations = {
  '1': {
    id: 1,
    name: "Lisbon, Portugal",
    country: "Portugal",
    rating: 4.8,
    reviews: 2543,
    price: 899,
    originalPrice: 1199,
    duration: "5 Days / 4 Nights",
    mainImage: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1525207934214-58e69a8f8a0b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=300&h=200&fit=crop"
    ],
    description: "Experience the magic of Lisbon, Portugal's sun-kissed capital perched on seven hills overlooking the Atlantic Ocean. This carefully designed 5-day journey takes you through the city's most enchanting neighborhoods, from the medieval streets of Alfama to the trendy cafes of Bairro Alto.\n\nDiscover iconic landmarks like the Belém Tower and Jerónimos Monastery, ride historic trams through winding streets, and enjoy breathtaking viewpoints. Savor authentic Portuguese cuisine, from fresh seafood to the famous pastéis de nata, while experiencing the soulful sounds of Fado music in traditional taverns.\n\nOur expert local guides will reveal hidden gems and share fascinating stories about Lisbon's maritime heritage, making this an unforgettable cultural immersion in one of Europe's most charming capitals."
  },
  '2': {
    id: 2,
    name: "Athens, Greece",
    country: "Greece",
    rating: 4.9,
    reviews: 1876,
    price: 1099,
    originalPrice: 1399,
    duration: "6 Days / 5 Nights",
    mainImage: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1576020799627-aeac74d58064?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=300&h=200&fit=crop"
    ],
    description: "Journey to Athens, the cradle of Western civilization, where ancient history meets vibrant modern culture. This comprehensive 6-day exploration takes you through 2,500 years of history, from the magnificent Acropolis to the bustling Plaka neighborhood.\n\nMarvel at the Parthenon, explore the Ancient Agora where Socrates once walked, and discover world-class museums housing priceless antiquities. Wander through charming neighborhoods filled with tavernas serving authentic Greek cuisine, and experience the warm hospitality that Greece is famous for.\n\nWith expert archaeological guides and carefully planned itineraries, you'll gain deep insights into Greek mythology, philosophy, and the democratic ideals that shaped our world."
  },
  '3': {
    id: 3,
    name: "Rome, Italy",
    country: "Italy",
    rating: 4.7,
    reviews: 3210,
    price: 1199,
    originalPrice: 1499,
    duration: "7 Days / 6 Nights",
    mainImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&h=200&fit=crop"
    ],
    description: "Experience the grandeur of Rome, the Eternal City, where every street corner reveals layers of history spanning three millennia. This immersive 7-day journey takes you from the glory of ancient Rome to the splendor of the Renaissance and Baroque periods.\n\nExplore the Colosseum, Roman Forum, and Palatine Hill with expert guides who bring history to life. Visit the Vatican Museums and Sistine Chapel, toss a coin in the Trevi Fountain, and discover the artworks of Michelangelo and Bernini. Enjoy authentic Roman cuisine in traditional trattorias and experience the dolce vita lifestyle.\n\nStay in a luxury hotel near major attractions, with all entrance fees and guided tours included for a seamless, enriching experience in the heart of Italy."
  }
};

export default function DestinationDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const destination = destinations[id as keyof typeof destinations];

  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Destination Not Found</h1>
          <p className="text-gray-600 mb-6">The destination you're looking for doesn't exist.</p>
          <a href="/destinations" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Back to All Destinations
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-6 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600 mt-20">
          <a href="/" className="hover:text-orange-500">Home</a>
          <span className="mx-2">/</span>
          <a href="/destinations" className="hover:text-orange-500">Destinations</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{destination.name}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{destination.name}</h1>
        
        {/* Location and Rating */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5 text-orange-500" />
            <span className="font-medium">{destination.country}</span>
          </div>
          
          <div className="h-6 w-px bg-gray-300" />
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(destination.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-gray-900">{destination.rating}</span>
            <span className="text-gray-500">({destination.reviews} reviews)</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Section - Images (3/4 width) */}
          <div className="lg:col-span-3">
            {/* Main Image */}
            <div className="mb-4">
              <img
                src={destination.mainImage}
                alt={destination.name}
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>

            {/* Gallery Images */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {destination.galleryImages.map((img, idx) => (
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
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Free cancellation</h4>
                      <p className="text-sm text-gray-600">Cancel up to 24 hours in advance to receive a full refund</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Mobile ticketing</h4>
                      <p className="text-sm text-gray-600">Use your phone as your ticket</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Instant confirmation</h4>
                      <p className="text-sm text-gray-600">Receive confirmation immediately</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Health precautions</h4>
                      <p className="text-sm text-gray-600">Special health and safety measures apply</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Duration</h4>
                      <p className="text-sm text-gray-600">{destination.duration}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Live Tour Guide</h4>
                      <p className="text-sm text-gray-600">English, Spanish, French</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Destination</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {destination.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-gray-200 my-8"></div>

            {/* Highlights Section */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Destination Highlights</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Expert-guided tours of major landmarks and attractions</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Authentic local experiences and cultural immersion</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Traditional cuisine tasting and food tours</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Premium accommodation in central locations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">All transportation and entrance fees included</span>
                </li>
              </ul>
            </div>

            <div className="border-t-2 border-gray-200 my-8"></div>

            {/* What's Included / Not Included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Luxury accommodation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Daily breakfast</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Professional tour guides</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">All entrance fees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Airport transfers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Travel insurance</span>
                  </li>
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What's Not Included</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">International flights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Lunch and dinner</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Personal expenses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Gratuities</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Optional activities</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t-2 border-gray-200 my-8"></div>

            {/* Safety Measures */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Safety & Health Precautions</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">All health and safety guidelines followed</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Hand sanitizer available throughout tours</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Regular temperature checks</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Social distancing maintained</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Enhanced cleaning protocols</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Travel insurance covering emergencies</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Booking Card (1/4 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-32">
              <div className="mb-6">
                <p className="text-gray-500 text-sm mb-2">Starting from</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-orange-500">€{destination.price}</span>
                  <span className="text-gray-500">/ person</span>
                </div>
                {destination.originalPrice && (
                  <p className="text-gray-400 line-through text-sm">€{destination.originalPrice}</p>
                )}
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
                <p className="text-sm text-gray-600 mb-3">Need help booking?</p>
                <p className="text-lg font-semibold text-gray-900">Call us: +1 234 567 890</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}