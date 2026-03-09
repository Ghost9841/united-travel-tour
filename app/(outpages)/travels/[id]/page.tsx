'use client';
import { MapPin, Star, Check, X, Clock, Shield, Users, Smartphone, Calendar, Users2, Tag } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Travel } from '@prisma/client';



interface ApiResponse {
  success: boolean;
  data?: {
    travel: Travel;
  };
  error?: string;
}

export default function TravelDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [travel, setTravel] = useState<Travel | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTravel = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/travels/${id}`);
        const data: ApiResponse = await response.json();

        if (data.success && data.data?.travel) {
          setTravel(data.data.travel);
        } else {
          setError(data.error || 'Travel package not found');
        }
      } catch (err) {
        setError('Failed to load travel package');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchTravel();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-500 border-t-orange-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-orange-800 font-semibold">Loading travel package...</p>
        </div>
      </div>
    );
  }

  if (error || !travel) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Travel Package Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The travel package you\'re looking for doesn\'t exist.'}</p>
          <Link href="/travels" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors inline-block">
            Back to All Packages
          </Link>
        </div>
      </div>
    );
  }

  // Parse description paragraphs
  const descriptionParagraphs = travel.description ? travel.description.split('\n\n') : ['No description available.'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/40 via-blue-700 to-orange-500">
      {/* Header Section */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600 mt-20">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/travels" className="hover:text-orange-500 transition-colors">Travels</Link>
          <span className="mx-2">/</span>
          <span className="text-gray-900 font-medium">{travel.title}</span>
        </div>

        {/* Title and Category */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{travel.title}</h1>
          <span className="bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
            {travel.category}
          </span>
        </div>
        
        {/* Location and Rating */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5 text-orange-500" />
            <span className="font-medium">{travel.location}</span>
          </div>
          
          <div className="hidden sm:block h-6 w-px bg-gray-300" />
          
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(travel.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-gray-900">{travel.rating.toFixed(1)}</span>
            <span className="text-gray-500">({travel.reviews} {travel.reviews === 1 ? 'review' : 'reviews'})</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Section - Content (3/4 width) */}
          <div className="lg:col-span-3">
            {/* Main Image */}
            <div className="mb-6">
              <img
                src={travel.image}
                alt={travel.title}
                className="w-full h-[400px] object-cover rounded-2xl shadow-lg"
              />
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500">Duration</p>
                    <p className="font-semibold text-gray-900">{travel.duration}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <Users2 className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500">Group Size</p>
                    <p className="font-semibold text-gray-900">{travel.groupSize}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-semibold text-gray-900">{travel.category}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Features</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Column 1 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Free cancellation</h4>
                      <p className="text-sm text-gray-600">Cancel up to 24 hours in advance for a full refund</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Smartphone className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Mobile ticketing</h4>
                      <p className="text-sm text-gray-600">Use your phone as your ticket</p>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Travel insurance</h4>
                      <p className="text-sm text-gray-600">Comprehensive coverage included</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Duration</h4>
                      <p className="text-sm text-gray-600">{travel.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Group Size</h4>
                      <p className="text-sm text-gray-600">{travel.groupSize}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Instant confirmation</h4>
                      <p className="text-sm text-gray-600">Book with immediate confirmation</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Tour</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {descriptionParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-gray-200 my-8"></div>

            {/* Highlights Section */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Tour Highlights</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Expert local guide throughout the journey</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Visit iconic landmarks and hidden gems</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Authentic cultural experiences</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Comfortable transportation included</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Local cuisine tasting opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Free time for personal exploration</span>
                </li>
              </ul>
            </div>

            <div className="border-t-2 border-gray-200 my-8"></div>

            {/* What's Included / Not Included */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {/* Included */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <Check className="w-6 h-6 text-green-500" />
                  What's Included
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Accommodation as per itinerary</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Professional guide services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Transportation between destinations</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Entrance fees to attractions</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{travel.duration} of expert guidance</span>
                  </li>
                </ul>
              </div>

              {/* Not Included */}
              <div className="bg-white rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                  <X className="w-6 h-6 text-red-500" />
                  What's Not Included
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">International flights</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Travel visa fees</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Personal expenses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Meals not specified in itinerary</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Optional activities and gratuities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Right Section - Booking Card (1/4 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-32">
              <div className="mb-6">
                <p className="text-gray-500 text-sm mb-2">Starting from</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-orange-500">£{travel.price}</span>
                  <span className="text-gray-500">/ person</span>
                </div>
                {travel.originalPrice > travel.price && (
                  <div className="flex items-center gap-2">
                    <p className="text-gray-400 line-through text-sm">£{travel.originalPrice}</p>
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                      Save £{(travel.originalPrice - travel.price).toFixed(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span>{travel.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users2 className="w-4 h-4 text-orange-500" />
                  <span>{travel.groupSize}</span>
                </div>
              </div>

              <Link href="/booknow">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl transition-colors mb-4 text-lg">
                  BOOK NOW
                </button>
              </Link>

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
                <p className="text-sm text-gray-600 mb-2">Need help booking?</p>
                <p className="text-lg font-semibold text-gray-900">+44 20 3725 3460</p>
                <p className="text-xs text-gray-500 mt-1">Mon-Fri, 9am-6pm</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}