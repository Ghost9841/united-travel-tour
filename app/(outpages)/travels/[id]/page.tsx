import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, Star, Check, X, Clock, Shield, Users, Smartphone, Calendar, Users2, Tag } from 'lucide-react';
import { Travel } from '@prisma/client';
import Link from 'next/link';
import prisma from '@/app/lib/prisma';
import ShareButtons from '@/components/manual-ui/ShareButtons';

// Generate metadata for SEO and social sharing
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  try {
    const travelId = Number(id);
    if (isNaN(travelId)) {
      return {
        title: 'Travel Package Not Found | United Travel & Tours',
        description: 'The travel package you are looking for could not be found.',
      };
    }

    const travel = await prisma.travel.findUnique({
      where: { id: travelId },
    });

    if (!travel) {
      return {
        title: 'Travel Package Not Found | United Travel & Tours',
        description: 'The travel package you are looking for could not be found.',
      };
    }

    // Create description from travel data
    const description = travel.description
      ? travel.description.split('\n\n')[0]?.substring(0, 160) + '...'
      : `Discover ${travel.title} in ${travel.location}. Book your dream vacation today!`;

    const imageUrl = travel.image || '/unitedtravellogo300x300pxfull-01.svg';

    return {
      title: `${travel.title} | United Travel & Tours`,
      description,
      openGraph: {
        title: travel.title,
        description,
        url: `https://www.unitedtravels.co.uk/travels/${travel.id}`,
        siteName: 'United Travel & Tours',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: travel.title,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: travel.title,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: `https://www.unitedtravels.co.uk/travels/${travel.id}`,
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

// Fetch travel data server-side
async function getTravel(id: string): Promise<Travel | null> {
  try {
    const travelId = Number(id);
    if (isNaN(travelId)) return null;

    const travel = await prisma.travel.findUnique({
      where: { id: travelId },
    });

    return travel;
  } catch (error) {
    console.error('Error fetching travel:', error);
    return null;
  }
}

interface TravelDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function TravelDetailPage({ params }: TravelDetailPageProps) {
  const { id } = await params;
  const travel = await getTravel(id);

  if (!travel) {
    notFound();
  }

  // Parse description paragraphs
  const descriptionParagraphs = travel.description ? travel.description.split('\n\n') : ['No description available.'];

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 via-blue-300 to-orange-500">
      {/* Header Section */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-gray-600 mt-20">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/travels" className="hover:text-orange-500 transition-colors">Travels</Link>
          <span className="mx-2">/</span>
          <span className="text-white font-medium">{travel.title}</span>
        </div>

        {/* Title and Category */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{travel.title}</h1>
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
          <ShareButtons/>
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