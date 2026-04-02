import prisma from '@/app/lib/prisma';
import { notFound } from 'next/navigation';
import CheckoutForm from './CheckoutForm';

type CheckoutItem = {
  title?: string;
  name?: string;
  image: string;
  price: number;
  location?: string;
  country?: string;
  duration?: string;
};

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ type: string; id: string }>;
}) {
  const { type, id } = await params;

  let item: CheckoutItem | null = null;

  switch (type) {
    case 'travel':
      item = await prisma.travel.findUnique({
        where: { id: Number(id) },
      });
      break;

    case 'destination':
      item = await prisma.destination.findUnique({
        where: { id: Number(id) },
      });
      break;

    case 'explore':
      item = await prisma.explorePage.findUnique({
        where: { id: Number(id) },
      });
      break;

    case 'hotel':
      const hotel = await prisma.hotel.findUnique({
        where: { id: Number(id) },
      });
      if (hotel) {
        item = {
          title: hotel.name,
          image: hotel.images?.[0] || '',
          price: hotel.pricePerNight,
          location: hotel.location,
        };
      }
      break;
      case 'offer':
        item = await prisma.trendingRoute.findUnique({
          where: { id: Number(id) },
        });
        break;

    default:
      notFound();
  }

  if (!item) notFound();

  const checkoutData = {
    title: item.title ?? item.name ?? 'Untitled',
    image: item.image,
    price: item.price,
    location: item.location ?? item.country ?? '',
    duration: item.duration ?? '',
  };

  return (
    <div className="min-h-screen bg-primary pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4">

        <h1 className="text-3xl font-bold text-gray-900 mb-10">
          Complete your booking
        </h1>

        <div className="flex flex-col lg:flex-row gap-10">

          {/* LEFT SIDE */}
          <div className="flex-1 space-y-6">

            {/* HERO IMAGE */}
            <div className="relative rounded-2xl overflow-hidden shadow-lg">
              <img
                src={checkoutData.image}
                alt={checkoutData.title}
                className="w-full h-[300px] md:h-[420px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

              {/* TEXT OVER IMAGE */}
              <div className="absolute bottom-5 left-5 text-white">
                <h2 className="text-2xl md:text-3xl font-bold">
                  {checkoutData.title}
                </h2>
                <p className="text-sm opacity-90">
                  {checkoutData.location}
                </p>
              </div>
            </div>

            {/* DETAILS CARD */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  Booking Details
                </h3>
                <p className="text-gray-500 text-sm">
                  Review your selected package before payment
                </p>
              </div>

              <hr />

              {/* INFO */}
              <div className="space-y-3 text-sm">

                <div className="flex justify-between">
                  <span className="text-gray-500">Location</span>
                  <span className="font-medium">{checkoutData.location}</span>
                </div>

                {checkoutData.duration && (
                  <div className="flex justify-between">
                    <span className="text-gray-500">Duration</span>
                    <span className="font-medium">{checkoutData.duration}</span>
                  </div>
                )}

              </div>

              <hr />

              {/* PRICE */}
              <div className="flex justify-between items-center">
                <span className="text-lg text-gray-700">Price</span>
                <span className="text-2xl font-bold text-orange-600">
                  £{checkoutData.price}
                </span>
              </div>

            </div>

          </div>

          {/* RIGHT SIDE */}
          <div className="w-full lg:w-[420px]">

            <div className="sticky top-28 space-y-6">

              {/* TOTAL CARD */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">

                <h3 className="font-semibold text-gray-900 mb-4">
                  Payment Summary
                </h3>

                <div className="flex justify-between text-sm text-gray-600 mb-3">
                  <span>Subtotal</span>
                  <span>£{checkoutData.price}</span>
                </div>

                <div className="border-t pt-4 flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>£{checkoutData.price}</span>
                </div>

              </div>

              {/* STRIPE FORM */}
              <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
                <CheckoutForm
                  amount={checkoutData.price}
                  currency="gbp"
                  outPageTitle={checkoutData.title}
                  type={type}
                  id={id}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}