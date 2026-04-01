import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Info, PlaneTakeoff } from 'lucide-react';
import prisma from '@/app/lib/prisma';
import ShareButtons from '@/components/manual-ui/ShareButtons';

async function getRoute(id: string) {
  try {
    const routeId = Number(id);
    if (isNaN(routeId)) return null;
    return await prisma.trendingRoute.findUnique({ where: { id: routeId } });
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
      where: { id: routeId },
    });

    if (!route) {
      return {
        title: 'Flight Not Found | United Travel & Tours',
        description: 'The flight you are looking for could not be found.',
      };
    }

    // Create description from flight data
    const description = `Book your flight from ${route.from} to ${route.to} with ${route.airline}. ${route.travelClass} class with ${route.checkinBaggage} check-in baggage. Enjoy a comfortable ${route.travelClass} flight with ${route.checkinBaggage} check-in baggage.`;

    // For image, you might want to use a default flight-related image or create a dynamic one
    const imageUrl = (route.image && route.image.length > 0 ? route.image : '/') || '/unitedtravellogo300x300pxfull-01.svg';

    return {
      title: `${route.from} to ${route.to} Flight | ${route.airline} | United Travel & Tours`,
      description,
      openGraph: {
        title: `${route.from} to ${route.to} Flight - ${route.airline}`,
        description,
        url: `https://www.unitedtravels.co.uk/offers/${route.id}`,
        siteName: 'United Travel & Tours',
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: `${route.airline} flight from ${route.from} to ${route.to}`,
          },
        ],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: `${route.from} to ${route.to} Flight - ${route.airline}`,
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

  const total = route.baseFare;

  return (
<div className="min-h-screen bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 pt-24 pb-16">   
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link href="/" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-6 mt-8">
          <ChevronLeft className="w-4 h-4" /> Back to Search
        </Link>

<div className="flex items-center justify-between mb-6">
  <h1 className="text-2xl font-bold text-gray-900">Review your flight details</h1>
  <ShareButtons />
</div>
        <div className="flex flex-col lg:flex-row gap-6">

          {/* ── Left ── */}
          <div className="flex-1 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    {route.from}
                    <span className="text-gray-400">⟶</span>
                    {route.to}
                  </h2>
                </div>
                {/* <span className="text-xs border border-gray-300 text-gray-600 px-3 py-1.5 rounded-full">
                  Non Refundable
                </span> */}
              </div>

              <hr className="border-gray-100 mb-5" />

              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                    <PlaneTakeoff className="w-5 h-5 text-white" />
                  </div>
                </div>
                <div className="flex items-center gap-6 text-sm">
                  <div className="text-center border-r border-gray-200 pr-6">
                    <p className="text-xs text-gray-400 mb-0.5">Travel Class</p>
                    <p className="font-semibold text-gray-800">{route.travelClass}</p>
                  </div>
                  <div className="text-center border-r border-gray-200 pr-6">
                    <p className="text-xs text-gray-400 mb-0.5">Check-In Baggage</p>
                    <p className="font-semibold text-gray-800">{route.checkinBaggage}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-xs text-gray-400 mb-0.5">Cabin Baggage</p>
                    <p className="font-semibold text-gray-800">{route.cabinBaggage}</p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="min-w-[100px]">
                  <p className="text-3xl font-bold text-gray-900">{route.departure}</p>
                  <p className="text-sm text-gray-500 mt-1">{route.fromFull}</p>
                  <p className="text-xs text-gray-400">{route.from}</p>
                  <p className="text-xs text-gray-400">{route.fromTerminal}</p>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <div className="flex items-center w-full">
                    <div className="flex-1 border-t-2 border-dashed border-gray-300" />
                    <PlaneTakeoff className="w-5 h-5 text-gray-400 mx-2" />
                  </div>
                </div>
                <div className="min-w-[100px] text-right">
                  <p className="text-3xl font-bold text-gray-900">{route.arrival}</p>
                  <p className="text-sm text-gray-500 mt-1">{route.toFull}</p>
                  <p className="text-xs text-gray-400">{route.to}</p>
                  <p className="text-xs text-gray-400">{route.toTerminal}</p>
                </div>
              </div>

              <hr className="border-gray-100 my-5" />

              <div className="space-y-2.5">
                {[
                  'Business/Visit/Tourist Visa Holders Are Required To Issue Single Return Ticket On Same Airline Only.',
                  'For Change/Transfer of airport/terminal you may require Transit Visa.',
                  'United Travels is not liable for visa information. Travelers are responsible for ensuring eligibility to enter destination & transit countries. Please verify travel rules on regulatory websites before booking & travel.',
                ].map((notice, i) => (
                  <div key={i} className="flex items-start gap-2 bg-blue-50 border border-blue-100 rounded-lg px-4 py-3">
                    <Info className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-700">{notice}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Right ── */}
          <div className="w-full lg:w-72 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-bold text-gray-900">Fare Details</h3>
                <span className="text-xs text-blue-600 font-semibold">1 Traveller</span>
              </div>
              <div className="space-y-3 text-sm">
                {[
                  { label: 'Base Fare',     value: route.baseFare },
                  { label: 'Tax & Charges', value: route.tax },
                  { label: 'Insurance',     value: route.insurance },
                ].map(item => (
                  <div key={item.label} className="flex items-center justify-between text-gray-600">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400 text-base leading-none">+</span>
                      <span>{item.label}</span>
                    </div>
                    <span>{route.currency} {item.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              <hr className="border-gray-100 my-4" />
              <div className="flex items-center justify-between font-bold text-gray-900">
                <span>Total Amount:</span>
                <span className="text-lg">{route.currency} {total.toLocaleString()}</span>
              </div>
            </div>

            <a href="/booknow"
              className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl text-center transition-colors shadow-md">
              BOOK NOW
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}