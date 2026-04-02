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
          name: hotel.name,
          image: hotel.images?.[0] || '',
          price: hotel.pricePerNight,
          location: hotel.location,
        };
      }
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
    <div className="min-h-screen bg-muted pt-24 pb-16">
      <div className="max-w-8xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Complete your booking</h1>
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left — order summary */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-muted rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-28">
              <img src={checkoutData.image} alt={checkoutData.title}
                className="w-full h-44 object-cover rounded-xl mb-4" />
              <h2 className="text-lg font-bold text-gray-900 mb-1">{checkoutData.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{checkoutData.location} · {checkoutData.duration}</p>
              <hr className="mb-4" />
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Price</span>
                <span>£{checkoutData.price}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-lg mt-3 pt-3 border-t">
                <span>Total</span>
                <span>£{checkoutData.price}</span>
              </div>
            </div>
          </div>

          {/* Right — Stripe form */}
          <div className="flex-1">
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
  );
}