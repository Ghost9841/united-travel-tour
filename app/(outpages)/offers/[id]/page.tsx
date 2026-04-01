import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { 
  ChevronLeft, 
  Info, 
  PlaneTakeoff, 
  Luggage, 
  Briefcase, 
  CreditCard,
  Clock,
  Calendar,
  AlertCircle,
  Star,
  Shield,
  RefreshCw
} from 'lucide-react';
import prisma from '@/app/lib/prisma';
import ShareButtons from '@/components/manual-ui/ShareButtons';

async function getRoute(id: string) {
  try {
    const routeId = Number(id);
    if (isNaN(routeId)) return null;
    return await prisma.trendingRoute.findUnique({ 
      // Ensure we only get active routes
      where: { 
        id: routeId,
        status: 'active'
      }
    });
  } catch {
    return null;
  }
}

// Generate metadata for SEO and social sharing
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  try {
    const routeId = Number(id);
    if (isNaN(routeId)) {
      return {
        title: 'Flight Not Found | United Travel & Tours',
        description: 'The flight you are looking for could not be found.',
      };
    }

    const route = await prisma.trendingRoute.findUnique({
      where: { id: routeId, status: 'active' },
    });

    if (!route) {
      return {
        title: 'Flight Not Found | United Travel & Tours',
        description: 'The flight you are looking for could not be found.',
      };
    }

    const description = `Book your ${route.travelClass} class flight from ${route.from} to ${route.to} with ${route.airline}. Includes ${route.checkinBaggage} check-in baggage and ${route.cabinBaggage} cabin baggage. Best prices guaranteed at United Travel & Tours.`;

    const imageUrl = route.image && route.image.length > 0 ? route.image : '/unitedtravellogo300x300pxfull-01.svg';

    return {
      title: `${route.from} to ${route.to} | ${route.travelClass} Class Flight with ${route.airline} | United Travel & Tours`,
      description,
      openGraph: {
        title: `${route.from} to ${route.to} Flight - ${route.airline} (${route.travelClass} Class)`,
        description,
        url: `https://www.unitedtravels.co.uk/offers/${route.id}`,
        siteName: 'United Travel & Tours',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${route.airline} ${route.travelClass} class flight from ${route.from} to ${route.to}`,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${route.from} to ${route.to} - ${route.travelClass} Class`,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: `https://www.unitedtravels.co.uk/offers/${route.id}`,
      },
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: 'United Travel & Tours - Book Flights Online',
      description: 'Book your flights with United Travel & Tours. Best deals on domestic and international flights.',
    };
  }
}

export default async function FlightDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const route = await getRoute(id);

  if (!route) notFound();

  const total = route.price;

  return (
<div className="min-h-screen bg-gradient-to-br from-orange-500 via-amber-500 to-orange-500 pt-24 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back Navigation */}
        <Link 
          href="/" 
          className="inline-flex items-center gap-2 text-gray-600 hover:text-orange-600 mb-6 mt-8 transition-colors group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> 
          Back to Search
        </Link>

        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">Review Your Flight</h1>
            </div>
            <p className="text-gray-600">Complete your booking with the best available fare</p>
          </div>
          <ShareButtons />
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Flight Details */}
          <div className="flex-1 space-y-6">
            {/* Main Flight Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow">
              {/* Airline Header */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-md">
                      <PlaneTakeoff className="w-6 h-6 text-orange-600" />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-lg">{route.airline}</h2>
                      <p className="text-orange-100 text-sm">{route.travelClass} Class</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-2xl font-bold">{route.currency}{total.toLocaleString()}</p>
                    <p className="text-orange-100 text-xs">per traveler</p>
                  </div>
                </div>
              </div>

              {/* Flight Route */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="text-center flex-1">
                    <p className="text-3xl font-bold text-gray-900 mb-1">{route.from}</p>
                    <p className="text-sm text-gray-500">Departure</p>
                  </div>
                  <div className="flex-1 flex flex-col items-center px-4">
                    <div className="relative w-full">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t-2 border-dashed border-gray-300"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <div className="bg-orange-100 rounded-full p-2">
                          <PlaneTakeoff className="w-5 h-5 text-orange-600" />
                        </div>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-2">Direct Flight</p>
                  </div>
                  <div className="text-center flex-1">
                    <p className="text-3xl font-bold text-gray-900 mb-1">{route.to}</p>
                    <p className="text-sm text-gray-500">Arrival</p>
                  </div>
                </div>

                {/* Baggage Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 p-4 bg-gray-50 rounded-xl">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Luggage className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Check-in Baggage</p>
                      <p className="font-semibold text-gray-900">{route.checkinBaggage}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-green-600" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Cabin Baggage</p>
                      <p className="font-semibold text-gray-900">{route.cabinBaggage}</p>
                    </div>
                  </div>
                </div>

                {/* Important Notices */}
                <div className="space-y-3">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2 mb-3">
                    <AlertCircle className="w-4 h-4 text-orange-500" />
                    Important Information
                  </h3>
                  {[
                    'Business/Visit/Tourist Visa Holders must book a single return ticket on the same airline only.',
                    'Airport/terminal changes may require a transit visa. Please verify requirements.',
                    'Visa requirements are subject to change. Travelers must verify entry requirements before booking.',
                    'United Travel & Tours recommends travel insurance for all bookings.',
                  ].map((notice, i) => (
                    <div key={i} className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 hover:bg-blue-100 transition-colors">
                      <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-blue-700 leading-relaxed">{notice}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Additional Features */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { icon: Shield, title: 'Secure Booking', desc: '256-bit SSL encryption' },
                { icon: RefreshCw, title: 'Free Cancellation', desc: 'Up to 24 hours before' },
                { icon: CreditCard, title: 'Best Price', desc: 'Price match guaranteed' },
              ].map((feature, i) => (
                <div key={i} className="bg-white rounded-xl p-4 text-center border border-gray-100 hover:shadow-md transition-shadow">
                  <feature.icon className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <p className="font-semibold text-gray-900 text-sm">{feature.title}</p>
                  <p className="text-xs text-gray-500 mt-1">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column - Booking Summary */}
          <div className="w-full lg:w-96 space-y-6">
            {/* Fare Details Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 sticky top-28">
              <div className="p-6 border-b border-gray-100">
                <h3 className="font-bold text-gray-900 text-lg">Fare Summary</h3>
                <p className="text-sm text-gray-500 mt-1">Price breakdown</p>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between text-gray-600">
                  <span>Base Fare</span>
                  <span className="font-medium">{route.currency} {total.toLocaleString()}</span>
                </div>
                

                
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-gray-900 text-lg">Total Amount</span>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-orange-600">{route.currency} {total.toLocaleString()}</span>
                      <p className="text-xs text-gray-500">per traveler</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="p-6 pt-0">
                <Link
                  href="/booknow"
                  className="block w-full bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold py-4 rounded-xl text-center transition-all transform hover:scale-[1.02] shadow-md"
                >
                  Proceed to Book Now
                </Link>
                <p className="text-xs text-center text-gray-500 mt-4">
                  No hidden fees • Secure payment • Instant confirmation
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="bg-white rounded-xl p-4 text-center border border-gray-100">
              <div className="flex items-center justify-center gap-4">
                <div className="text-center">
                  <div className="text-green-600 text-xl font-bold">4.8</div>
                  <div className="text-xs text-gray-500">★★★★★</div>
                  <div className="text-xs text-gray-400">2k+ reviews</div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-blue-600 text-xl font-bold">24/7</div>
                  <div className="text-xs text-gray-500">Support</div>
                </div>
                <div className="w-px h-8 bg-gray-200"></div>
                <div className="text-center">
                  <div className="text-orange-600 text-xl font-bold">✓</div>
                  <div className="text-xs text-gray-500">Verified</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}