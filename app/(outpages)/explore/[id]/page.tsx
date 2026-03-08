'use client';
import { MapPin, Star, Check, X, Clock, Shield, Users, Smartphone } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface ExplorePage {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  discountedPrice: number;
  duration: string;
  status: string;
  rating: number;
  views: number;
  likes: number;
  image: string;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export default function ExploreDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [explore, setExplore] = useState<ExplorePage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExplore = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/explore/${id}`);
        const data: ApiResponse<ExplorePage> = await response.json();

        if (data.success && data.data) {
          // Only show active explore items on the public page
          if (data.data.status === 'active') {
            setExplore(data.data);
          } else {
            setError('Explore item not found');
          }
        } else {
          setError(data.error || 'Explore item not found');
        }
      } catch (err) {
        setError('Failed to load explore item');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchExplore();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-500 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-orange-300 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-semibold">Loading explore item...</p>
        </div>
      </div>
    );
  }

  if (error || !explore) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Explore Item Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The explore item you\'re looking for doesn\'t exist.'}</p>
          <a href="/explore" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Back to Explore
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
          <a href="/explore" className="hover:text-orange-500">Explore</a>
          <span className="mx-2">/</span>
          <span className="text-gray-900">{explore.title}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{explore.title}</h1>

        {/* Location and Rating */}
        <div className="flex items-center gap-6 mb-8">
          <div className="flex items-center gap-2 text-gray-600">
            <MapPin className="w-5 h-5 text-orange-500" />
            <span className="font-medium">{explore.location}</span>
          </div>

          <div className="h-6 w-px bg-gray-300" />

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(explore.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-semibold text-gray-900">{explore.rating}</span>
            <span className="text-gray-500">({explore.views} views)</span>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Left Section - Images (3/4 width) */}
          <div className="lg:col-span-3">
            {/* Main Image */}
            <div className="mb-4">
              <img
                src={explore.image}
                alt={explore.title}
                className="w-full h-96 object-cover rounded-2xl"
              />
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
                      <h4 className="font-semibold text-gray-900 mb-1">Mobile booking</h4>
                      <p className="text-sm text-gray-600">Book and manage your experience on the go</p>
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
                      <h4 className="font-semibold text-gray-900 mb-1">Health & safety</h4>
                      <p className="text-sm text-gray-600">Special health and safety measures apply</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Duration</h4>
                      <p className="text-sm text-gray-600">{explore.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Users className="w-5 h-5 text-indigo-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Expert guides</h4>
                      <p className="text-sm text-gray-600">Local experts with deep knowledge</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Experience</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {explore.description.split('\n\n').map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-gray-200 my-8"></div>

            {/* Category Badge */}
            <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Category</h2>
              <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                {explore.category}
              </span>
            </div>

            <div className="border-t-2 border-gray-200 my-8"></div>

            {/* What's Included */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Professional guide services</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">All necessary equipment</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Transportation to/from meeting point</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Refreshments and snacks</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Photography services</span>
                </li>
              </ul>
            </div>

            <div className="border-t-2 border-gray-200 my-8"></div>

            {/* Safety & Health Precautions */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Safety & Health Precautions</h2>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">All participants must follow local health guidelines</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Hand sanitizer available throughout the experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Regular health checks for all staff</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Social distancing maintained where possible</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Enhanced cleaning protocols</span>
                </li>
                <li className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Emergency medical coverage included</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Section - Booking Card (1/4 width) */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-32">
              <div className="mb-6">
                <p className="text-gray-500 text-sm mb-2">From</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-orange-500">£{explore.price}</span>
                  <span className="text-gray-500">/ person</span>
                </div>
                {explore.discountedPrice && explore.discountedPrice < explore.price && (
                  <p className="text-gray-400 line-through text-sm">£{explore.discountedPrice}</p>
                )}
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
