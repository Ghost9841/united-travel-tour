'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { MapPin, Star, ArrowLeft, Facebook, Link as LinkIcon, Phone, Mail } from 'lucide-react';
import SpecialOffer from '@/app/api/special-offers/types';

export default function SpecialOfferDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [offer, setOffer] = useState<SpecialOffer | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/special-offers/${id}`);
        const data = await res.json();
        if (data.success) setOffer(data.data);
      } catch (err) {
        console.error('Failed to fetch offer', err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  const copyLink = async () => {
    await navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
    </div>
  );

  if (!offer) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4">
      <p className="text-gray-500 text-lg">Offer not found.</p>
      <Link href="/" className="text-orange-500 hover:underline text-sm">Go back home</Link>
    </div>
  );

  const saving = offer.price > 0 && offer.price !== offer.discountedPrice
    ? offer.price - offer.discountedPrice
    : null;
  const discountPct = offer.price > 0 && saving
    ? Math.round((saving / offer.price) * 100)
    : null;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Hero Image */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <img
          src={offer.image || 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&h=900&fit=crop'}
          alt={offer.title}
          className="w-full h-full object-cover"
          onError={e => {
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&h=900&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        {/* Back button */}
        <Link
          href="/offers/special-offers"
          className="absolute top-6 left-6 flex items-center gap-2 bg-white/90 backdrop-blur-sm text-gray-800 px-4 py-2 rounded-full text-sm font-medium hover:bg-white transition-colors shadow"
        >
          <ArrowLeft className="w-4 h-4" /> Back
        </Link>

        {/* Discount badge */}
        {discountPct && discountPct > 0 && (
          <div className="absolute top-6 right-6 bg-orange-500 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow">
            {discountPct}% OFF
          </div>
        )}

        {/* Title overlay */}
        <div className="absolute bottom-6 left-6 right-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">{offer.title}</h1>
          {offer.location && (
            <div className="flex items-center gap-1.5 mt-2 text-white/90">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{offer.location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 py-10 space-y-6">

        {/* Price + Rating card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-wrap items-center justify-between gap-4">
          <div>
            {offer.discountedPrice > 0 ? (
              <div className="flex items-baseline gap-3">
                <span className="text-4xl font-bold text-orange-500">£{offer.discountedPrice}</span>
                {saving && saving > 0 && (
                  <span className="text-gray-400 line-through text-lg">£{offer.price}</span>
                )}
                <span className="text-sm text-gray-500">per person</span>
              </div>
            ) : (
              <span className="text-xl font-semibold text-gray-600">Contact us for price</span>
            )}
            {saving && saving > 0 && (
              <p className="text-green-600 text-sm font-medium mt-1">You save £{saving}!</p>
            )}
          </div>

          <div className="flex items-center gap-1">
            {[...Array(Math.round(offer.rating))].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
            ))}
            <span className="text-sm text-gray-500 ml-1">{offer.rating}/5</span>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-3">About this offer</h2>
          <p className="text-gray-600 leading-relaxed whitespace-pre-line">{offer.description}</p>
        </div>

        {/* CTA + Share */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <a
              href="tel:02037253460"
              className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold text-sm transition-colors shadow-md"
            >
              <Phone className="w-4 h-4" /> Call to Book
            </a>
            <a
              href="mailto:info@unitedtravels.co.uk"
              className="flex items-center gap-2 border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-xl font-semibold text-sm transition-colors"
            >
              <Mail className="w-4 h-4" /> Email Us
            </a>
          </div>

          {/* Share buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={copyLink}
              className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <LinkIcon className="w-4 h-4" />
              {copied ? 'Copied!' : 'Copy Link'}
            </button>
            <button
              onClick={shareOnFacebook}
              className="flex items-center gap-2 px-4 py-2.5 bg-[#1877F2] hover:bg-[#166FE5] text-white rounded-xl text-sm font-medium transition-colors"
            >
              <Facebook className="w-4 h-4" /> Share
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}