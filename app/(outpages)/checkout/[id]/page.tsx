import prisma from '@/app/lib/prisma';
import { notFound } from 'next/navigation';
import CheckoutForm from './CheckoutForm';

export default async function CheckoutPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const travel = await prisma.travel.findUnique({ where: { id: Number(id) } });
  if (!travel) notFound();

  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-8">Complete your booking</h1>
        <div className="flex flex-col lg:flex-row gap-8">

          {/* Left — order summary */}
          <div className="w-full lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sticky top-28">
              <img src={travel.image} alt={travel.title}
                className="w-full h-44 object-cover rounded-xl mb-4" />
              <h2 className="text-lg font-bold text-gray-900 mb-1">{travel.title}</h2>
              <p className="text-sm text-gray-500 mb-4">{travel.location} · {travel.duration}</p>
              <hr className="mb-4" />
              <div className="flex justify-between text-sm text-gray-600 mb-2">
                <span>Price per person</span>
                <span>£{travel.price}</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 text-lg mt-3 pt-3 border-t">
                <span>Total</span>
                <span>£{travel.price}</span>
              </div>
            </div>
          </div>

          {/* Right — Stripe form */}
          <div className="flex-1">
            <CheckoutForm
              amount={travel.price}
              currency="gbp"
              outPageTitle={travel.title}
            />
          </div>
        </div>
      </div>
    </div>
  );
}