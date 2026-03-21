import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, Star, Check, X, Wifi, Coffee, Car, Dumbbell, Users, Clock, Shield, Smartphone } from 'lucide-react';
import { Hotel } from '@prisma/client';
import prisma from '@/app/lib/prisma';

// Generate metadata for SEO and social sharing
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  try {
    const hotelId = Number(id);
    if (isNaN(hotelId)) {
      return {
        title: 'Hotel Not Found | United Travel & Tours',
        description: 'The hotel you are looking for could not be found.',
      };
    }

    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
    });

    if (!hotel) {
      return {
        title: 'Hotel Not Found | United Travel & Tours',
        description: 'The hotel you are looking for could not be found.',
      };
    }

    // Create description from hotel data
    const description = hotel.description
      ? hotel.description.split('\n\n')[0]?.substring(0, 160) + '...'
      : `Book your stay at ${hotel.name} in ${hotel.location}. Luxury accommodation with excellent amenities!`;

    const imageUrl = hotel.image || '/unitedtravellogo300x300pxfull-01.svg';

    return {
      title: `${hotel.name} | United Travel & Tours`,
      description,
      openGraph: {
        title: hotel.name,
        description,
        url: `https://www.unitedtravels.co.uk/hotels/${hotel.id}`,
        siteName: 'United Travel & Tours',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: hotel.name,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: hotel.name,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: `https://www.unitedtravels.co.uk/hotels/${hotel.id}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'United Travel & Tours - A Travel Agency',
      description: 'A Travel Agency for All The United Travel & Tours',
    };
  }
}

// Fetch hotel data server-side
async function getHotel(id: string): Promise<Hotel | null> {
  try {
    const hotelId = Number(id);
    if (isNaN(hotelId)) return null;

    const hotel = await prisma.hotel.findUnique({
      where: { id: hotelId },
    });

    return hotel;
  } catch (error) {
    console.error('Error fetching hotel:', error);
    return null;
  }
}

interface HotelDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function HotelDetailPage({ params }: HotelDetailPageProps) {
  const { id } = await params;
  const hotel = await getHotel(id);

  if (!hotel) {
    notFound();
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
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>

            {/* Gallery Images - Using variations of the main image */}
            <div className="grid grid-cols-4 gap-4 mb-8">
              {[1, 2, 3, 4].map((idx) => (
                <img
                  key={idx}
                  src={hotel.image}
                  alt={`Gallery ${idx}`}
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