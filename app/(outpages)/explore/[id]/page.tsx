import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, Star, Check, X, Clock, Shield, Users, Smartphone, Calendar, Users2, Tag, Eye } from 'lucide-react';
import { ExplorePage } from '@prisma/client';
import Link from 'next/link';
import prisma from '@/app/lib/prisma';
import ShareButtons from '@/components/manual-ui/ShareButtons';

// Generate metadata for SEO and social sharing
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  try {
    const exploreId = Number(id);
    if (isNaN(exploreId)) {
      return {
        title: 'Explore Item Not Found | United Travel & Tours',
        description: 'The explore item you are looking for could not be found.',
      };
    }

    const explore = await prisma.explorePage.findUnique({
      where: { id: exploreId },
    });

    if (!explore) {
      return {
        title: 'Explore Item Not Found | United Travel & Tours',
        description: 'The explore item you are looking for could not be found.',
      };
    }

    // Create description from explore data
    const description = explore.description
      ? explore.description.split('\n\n')[0]?.substring(0, 160) + '...'
      : `Discover ${explore.title} in ${explore.location}. An amazing experience awaits!`;

    const imageUrl = explore.image || '/unitedtravellogo300x300pxfull-01.svg';

    return {
      title: `${explore.title} | United Travel & Tours`,
      description,
      openGraph: {
        title: explore.title,
        description,
        url: `https://www.unitedtravels.co.uk/explore/${explore.id}`,
        siteName: 'United Travel & Tours',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: explore.title,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: explore.title,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: `https://www.unitedtravels.co.uk/explore/${explore.id}`,
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

// Fetch explore data server-side
async function getExplore(id: string): Promise<ExplorePage | null> {
  try {
    const exploreId = Number(id);
    if (isNaN(exploreId)) return null;

    const explore = await prisma.explorePage.findUnique({
      where: { id: exploreId },
    });

    return explore;
  } catch (error) {
    console.error('Error fetching explore:', error);
    return null;
  }
}

interface ExploreDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function ExploreDetailPage({ params }: ExploreDetailPageProps) {
  const { id } = await params;
  const explore = await getExplore(id);

  if (!explore) {
    notFound();
  }

  // Parse description paragraphs
  const descriptionParagraphs = explore.description ? explore.description.split('\n\n') : ['No description available.'];

  return (
<div className="min-h-screen bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600">   
      {/* Header Section */}
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-white/80 mt-20">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span className="mx-2">/</span>
          <Link href="/explore" className="hover:text-white transition-colors">Explore</Link>
          <span className="mx-2">/</span>
          <span className="text-white font-medium">{explore.title}</span>
        </div>

        {/* Title and Category */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <h1 className="text-3xl sm:text-4xl font-bold text-white">{explore.title}</h1>
          <span className="bg-white/20 text-white backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
            {explore.category}
          </span>
        </div>
        
        {/* Location and Rating */}
        <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-8">
          <div className="flex items-center gap-2 text-white/80">
            <MapPin className="w-5 h-5 text-white" />
            <span className="font-medium">{explore.location}</span>
          </div>
          
          <div className="hidden sm:block h-6 w-px bg-white/30" />
          <ShareButtons/>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Section - Content (3/4 width) */}
          <div className="lg:col-span-3">
            {/* Main Image */}
            <div className="mb-6">
              <img
                src={explore.image}
                alt={explore.title}
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
                    <p className="font-semibold text-gray-900">{explore.duration}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <Tag className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500">Category</p>
                    <p className="font-semibold text-gray-900">{explore.category}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
                <div className="flex items-center gap-3">
                  <Eye className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="text-sm text-gray-500">Popularity</p>
                    <p className="font-semibold text-gray-900">{explore.views} views</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features Card */}
            <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Experience Features</h3>
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
                      <h4 className="font-semibold text-gray-900 mb-1">Mobile booking</h4>
                      <p className="text-sm text-gray-600">Book and manage on the go</p>
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Shield className="w-5 h-5 text-purple-500 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">Health & safety</h4>
                      <p className="text-sm text-gray-600">Enhanced safety measures in place</p>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Experience</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {descriptionParagraphs.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-gray-200 my-8"></div>

            {/* Highlights Section */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Experience Highlights</h2>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Professional local guide</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">All equipment provided</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Transportation included</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Refreshments provided</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Photo opportunities</span>
                </li>
                <li className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">Small group experience</span>
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
                    <span className="text-gray-700">Professional guide services</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">All necessary equipment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Transportation to/from meeting point</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Refreshments and snacks</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Photography services</span>
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
                    <span className="text-gray-700">Personal expenses</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Gratuities for guides</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Hotel pickup/drop-off</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Travel insurance</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <X className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">Optional add-ons</span>
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
                <p className="text-gray-500 text-sm mb-2">Starting from</p>
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-4xl font-bold text-orange-500">£{explore.price}</span>
                  <span className="text-gray-500">/ person</span>
                </div>
                {explore.discountedPrice && explore.discountedPrice < explore.price && (
                  <div className="flex items-center gap-2">
                    <p className="text-gray-400 line-through text-sm">£{explore.discountedPrice}</p>
                    <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded">
                      Save £{(explore.price - explore.discountedPrice).toFixed(0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4 text-orange-500" />
                  <span>{explore.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Eye className="w-4 h-4 text-orange-500" />
                  <span>{explore.views} people viewed this</span>
                </div>
              </div>

              <Link href={`/checkout/explore/${explore.id}`}>
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