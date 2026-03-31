import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, Info, PlaneTakeoff } from 'lucide-react';
import prisma from '@/app/lib/prisma';

async function getRoute(id: string) {
  try {
    const routeId = Number(id);
    if (isNaN(routeId)) return null;
    return await prisma.trendingRoute.findUnique({ where: { id: routeId } });
  } catch {
    return null;
  }
}

export default async function FlightDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const route = await getRoute(id);

  if (!route) notFound();

  const total = route.baseFare + route.tax + route.insurance;

  return (
<div className="min-h-screen bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600 pt-24 pb-16">   
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <Link href="/" className="inline-flex items-center gap-1 text-sm text-blue-600 hover:text-blue-700 mb-6">
          <ChevronLeft className="w-4 h-4" /> Back to Search
        </Link>

        <h1 className="text-2xl font-bold text-gray-900 mb-6">Review your flight details</h1>

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
                  <div className="flex items-center gap-3 text-sm text-gray-500 mt-1">
                    <span>• {route.date}</span>
                    <span>• Duration {route.duration}</span>
                    <span>• {route.stops}</span>
                  </div>
                </div>
                <span className="text-xs border border-gray-300 text-gray-600 px-3 py-1.5 rounded-full">
                  Non Refundable
                </span>
              </div>

              <hr className="border-gray-100 mb-5" />

              <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-red-600 rounded-lg flex items-center justify-center">
                    <PlaneTakeoff className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{route.airline}</p>
                    <p className="text-xs text-gray-400">{route.flightNo}</p>
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
                  <p className="text-xs text-gray-400 mb-1">
                    {route.duration.replace('h ', ' Hr. ').replace('m', ' Min.')}
                  </p>
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

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="bg-green-400 px-5 py-3">
                <h3 className="font-bold text-white">Promo Code</h3>
              </div>
              <div className="p-5">
                <div className="flex gap-2 mb-4">
                  <input type="text" placeholder="Enter promocode"
                    className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent" />
                  <button className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors">
                    Apply
                  </button>
                </div>
                <p className="text-xs text-gray-500 font-medium mb-3">Choose from the offers below</p>
                <div className="space-y-3">
                  {[
                    { code: 'ZEROFEE',     save: 650, desc: '#NoConvenienceFee. Choose this promo to get a discount of £650' },
                    { code: 'UNITEDMARCH', save: 400, desc: '#UnitedSpecial - Choose this promo to enjoy a discount of £400' },
                  ].map(promo => (
                    <label key={promo.code} className="flex items-start gap-3 cursor-pointer">
                      <input type="radio" name="promo" className="mt-0.5 accent-blue-600" />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-gray-900">{promo.code}</span>
                          <span className="text-xs text-green-600 font-semibold">Save {promo.save}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">{promo.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
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