'use client';
import { MapPin, Star, Check, X, Clock, Shield, Users, Smartphone } from 'lucide-react';
import { useParams } from 'next/navigation';

// This would typically come from an API or database
const travelPackages = {
  '1': {
    id: 1,
    name: "Romantic Lisbon Getaway",
    location: "Lisbon, Portugal",
    rating: 4.8,
    reviews: 1245,
    price: 500,
    originalPrice: 700,
    duration: "5 Days / 4 Nights",
    mainImage: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1525207934214-58e69a8f8a0b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1548707309-dcebeab9ea9b?w=300&h=200&fit=crop"
    ],
    description: "Embark on an unforgettable journey through the charming streets of Lisbon, where historic architecture meets modern Portuguese culture. This carefully curated 5-day experience offers the perfect blend of guided tours, leisure time, and authentic local experiences.\n\nDiscover the enchanting neighborhoods of Alfama and Bairro Alto, ride the iconic yellow trams, and indulge in world-class Portuguese cuisine. Visit stunning landmarks including the Belém Tower, Jerónimos Monastery, and São Jorge Castle while learning about Portugal's rich maritime history.\n\nYour luxury accommodation includes daily breakfast, and our expert local guides will ensure you experience the best of Lisbon's culture, from traditional Fado music performances to scenic viewpoints offering breathtaking panoramic views of the city."
  },
  '2': {
    id: 2,
    name: "Historic Athens Experience",
    location: "Athens, Greece",
    rating: 4.9,
    reviews: 982,
    price: 800,
    originalPrice: 1000,
    duration: "6 Days / 5 Nights",
    mainImage: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=1200&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1576020799627-aeac74d58064?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1601581875309-fafbf2d3ed3a?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?w=300&h=200&fit=crop"
    ],
    description: "Step back in time and explore the birthplace of Western civilization. This comprehensive 6-day tour takes you through Athens' most iconic landmarks and hidden gems.\n\nVisit the magnificent Acropolis, Parthenon, and Ancient Agora while learning about Greek mythology and history. Wander through the charming Plaka neighborhood and enjoy authentic Greek cuisine in traditional tavernas.\n\nYour journey includes premium accommodation, expert guides, and all entrance fees to major archaeological sites. Experience the perfect blend of ancient history and modern Greek culture."
  },
  '3': {
    id: 3,
    name: "Classic Rome Holiday",
    location: "Rome, Italy",
    rating: 4.7,
    reviews: 1567,
    price: 750,
    originalPrice: 900,
    duration: "7 Days / 6 Nights",
    mainImage: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&h=800&fit=crop",
    galleryImages: [
      "https://images.unsplash.com/photo-1531572753322-ad063cecc140?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1529260830199-42c24126f198?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1525874684015-58379d421a52?w=300&h=200&fit=crop",
      "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=300&h=200&fit=crop"
    ],
    description: "Experience the eternal city in all its glory. This week-long Roman holiday combines iconic landmarks with authentic Italian experiences.\n\nExplore the Colosseum, Roman Forum, Vatican City, and Sistine Chapel with expert guides. Stroll through charming neighborhoods like Trastevere, and enjoy cooking classes featuring traditional Italian cuisine.\n\nStay in a luxurious 5-star hotel in the heart of Rome, with daily breakfast and guided tours of the city's most celebrated monuments and hidden treasures."
  }
};

export default function TravelDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  // Get the destination data based on ID
  const destination = travelPackages[id as keyof typeof travelPackages];

  // If destination not found, show error
  if (!destination) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Destination Not Found</h1>
          <p className="text-gray-600 mb-6">The travel package you're looking for doesn't exist.</p>
          <a href="/travels" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Back to All Packages
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
          <a href="/travels" className="hover:text-orange-500">Travels</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{destination.name}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{destination.name}</h1>
        
        {/* Location and Rating */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5 text-orange-500" />
            <span className="font-medium">{destination.location}</span>
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
                {/* Column 1 */}
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

                {/* Column 2 */}
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

                {/* Column 3 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Live Tour Guide</h4>
                      <p className="text-sm text-gray-600">English, Spanish, Portuguese</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {destination.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-gray-200 my-8"></div>

            {/* Activity Section */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Activity Highlights</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Guided walking tours through historic neighborhoods</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Visit to major landmarks and monuments</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Traditional cultural evening experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Local transportation included</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Authentic local cuisine tasting</span>
                </li>
              </ul>
            </div>

            <div className="border-t-2 border-gray-200 my-8"></div>

            {/* What's Included / Not Included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Included */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What's Included</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">5-star hotel accommodation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Daily breakfast buffet</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Professional English-speaking guide</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">All entrance fees to monuments</span>
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

              {/* Not Included */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4">What's Not Included</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">International flight tickets</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Lunch and dinner meals</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Personal expenses and shopping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Tips for guides and drivers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Optional activities not mentioned</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t-2 border-gray-200 my-8"></div>

            {/* Safety & Health Precautions */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Safety & Health Precautions</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">All participants must follow local COVID-19 guidelines and regulations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Hand sanitizer available throughout the tour</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Regular temperature checks for all staff and participants</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Social distancing maintained where possible</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Enhanced cleaning protocols for vehicles and accommodations</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Travel insurance included covering medical emergencies</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Booking Card (1/4 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-32">
              {/* <div className="mb-6">
                <p className="text-gray-500 text-sm mb-2">From</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-orange-500">£{destination.price}</span>
                  <span className="text-gray-500">/ person</span>
                </div>
                {destination.originalPrice && (
                  <p className="text-gray-400 line-through text-sm">£{destination.originalPrice}</p>
                )}
              </div> */}

              <a href="/booknow">
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
                <p className="text-lg font-semibold text-gray-900">Call us: +44 20 3725 3460</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}