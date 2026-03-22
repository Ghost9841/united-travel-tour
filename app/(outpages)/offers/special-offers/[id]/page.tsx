import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MapPin, Star, Phone, Mail, Check, Clock, Tag } from 'lucide-react';
import prisma from '@/app/lib/prisma';
import ShareButtons from '@/components/manual-ui/ShareButtons';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;

  try {
    const offerId = Number(id);
    if (isNaN(offerId)) return { title: 'Offer Not Found | United Travel & Tours' };

    const offer = await prisma.specialOffer.findUnique({ where: { id: offerId } });
    if (!offer) return { title: 'Offer Not Found | United Travel & Tours' };

    const description = offer.description?.substring(0, 160) + '...';
    const imageUrl = offer.image || '/unitedtravellogo300x300pxfull-01.svg';

    return {
      title: `${offer.title} | United Travel & Tours`,
      description,
      openGraph: {
        title: offer.title,
        description,
        url: `https://www.unitedtravels.co.uk/offers/special-offers/${offer.id}`,
        siteName: 'United Travel & Tours',
        images: [{ url: imageUrl, width: 1200, height: 630, alt: offer.title }],
        locale: 'en_US',
        type: 'website',
      },
      twitter: {
        card: 'summary_large_image',
        title: offer.title,
        description,
        images: [imageUrl],
      },
      alternates: {
        canonical: `https://www.unitedtravels.co.uk/offers/special-offers/${offer.id}`,
      },
    };
  } catch {
    return { title: 'United Travel & Tours' };
  }
}

async function getOffer(id: string) {
  try {
    const offerId = Number(id);
    if (isNaN(offerId)) return null;
    return await prisma.specialOffer.findUnique({ where: { id: offerId } });
  } catch {
    return null;
  }
}

export default async function SpecialOfferDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const offer = await getOffer(id);

  if (!offer) notFound();

  const saving = offer.price > 0 && offer.price !== offer.discountedPrice
    ? offer.price - offer.discountedPrice
    : null;
  const discountPct = saving && offer.price > 0
    ? Math.round((saving / offer.price) * 100)
    : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-400 via-orange-500 to-orange-600">
      <div className="max-w-8xl mx-auto px-6 py-8">

        {/* Breadcrumb */}
        <div className="mb-6 text-sm text-white mt-20">
          <a href="/" className="hover:text-orange-200">Home</a>
          <span className="mx-2">/</span>
          <a href="/offers/special-offers" className="hover:text-orange-200">Special Offers</a>
          <span className="mx-2">/</span>
          <span className="text-white/80">{offer.title}</span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-white mb-4">{offer.title}</h1>

        {/* Location + Rating + Share */}
        <div className="flex items-center gap-6 mb-8 flex-wrap">
          {offer.location && (
            <div className="flex items-center gap-2 text-white">
              <MapPin className="w-5 h-5" />
              <span className="font-medium">{offer.location}</span>
            </div>
          )}
          <div className="h-6 w-px bg-white/30" />
          <ShareButtons />
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">

          {/* ── Left 3/4 ── */}
          <div className="lg:col-span-3">

            {/* Hero image */}
            <div className="mb-4">
              <img
                src={offer.image || '/unitedtravellogo300x300pxfull-01.svg'}
                alt={offer.title}
                className="w-full h-96 object-cover rounded-2xl"
              />
            </div>

            {/* Quick-facts bar */}
            <div className="bg-white rounded-2xl p-6 shadow-md mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                <div className="flex items-start gap-3">
                  <Check className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Instant Confirmation</h4>
                    <p className="text-sm text-gray-600">Booking confirmed immediately</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-blue-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">24/7 Support</h4>
                    <p className="text-sm text-gray-600">Always here to help</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Tag className="w-5 h-5 text-orange-500 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Contact Number</h4>
                    <p className="text-sm text-gray-600">02037253460</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-8 shadow-md mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">About This Offer</h2>
              <div className="space-y-4 text-gray-700 leading-relaxed">
                {offer.description.split('\n\n').map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>

            <div className="border-t-2 border-gray-200 my-8" />
            {/* Terms */}
            <div className="bg-white rounded-2xl p-8 shadow-md">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms &amp; Conditions</h2>
              <ul className="space-y-3">
                {[
                  'Fares are subject to availability and may change without notice.',
                  'Prices shown are per person unless stated otherwise.',
                  'All bookings are subject to airline terms and conditions.',
                  'United Travel & Tours acts as an agent — final fare confirmed at time of ticketing.',
                  'For full fare rules, contact our team before booking.',
                ].map((term, i) => (
                  <li key={i} className="flex items-start gap-3 text-gray-700 text-sm">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                    {term}
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* ── Right sticky sidebar ── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl p-6 shadow-lg sticky top-32">

              {/* Price */}
              <div className="mb-6">
                <p className="text-gray-500 text-sm mb-2">
                  {offer.discountedPrice > 0 ? 'Price from' : 'Pricing'}
                </p>
                {offer.discountedPrice > 0 ? (
                  <>
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-4xl font-bold text-orange-500">£{offer.discountedPrice}</span>
                      {saving && saving > 0 && (
                        <span className="text-gray-400 line-through text-sm">£{offer.price}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">Per person</p>
                    {saving && saving > 0 && (
                      <p className="text-green-600 text-sm font-medium mt-1">You save £{saving}!</p>
                    )}
                    {discountPct && (
                      <span className="inline-block mt-2 bg-orange-100 text-orange-600 text-xs font-bold px-2.5 py-1 rounded-full">
                        {discountPct}% OFF
                      </span>
                    )}
                  </>
                ) : (
                  <p className="text-lg font-semibold text-gray-700">Contact us for price</p>
                )}
              </div>

              {/* CTA */}
              <a href="tel:02037253460">
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-lg transition-colors mb-3 flex items-center justify-center gap-2">
                  <Phone className="w-4 h-4" /> Call to Book
                </button>
              </a>
              <a href="mailto:info@unitedtravels.co.uk">
                <button className="w-full border-2 border-orange-500 text-orange-500 hover:bg-orange-50 font-bold py-3.5 rounded-lg transition-colors mb-6 flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4" /> Email Us
                </button>
              </a>

              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Best price guarantee</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>No hidden fees</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Check className="w-4 h-4 text-green-500" />
                  <span>Instant confirmation</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-1">Need help?</p>
                <p className="text-lg font-semibold text-gray-900">+44 20 3725 3460</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}