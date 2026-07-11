'use client';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HeroOffersCarousel from './CarouselOffers';
import TrendingRoutes from './TrendingRoutes';

type Offer = {
  id: number;
  title: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  status: 'published' | 'draft';
  sourceType?: 'article' | 'hotel';
  href?: string;
};

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Adapts a raw Hotel record into the shared Offer shape used by this page
function hotelToOffer(h: any): Offer {
  return {
    id: h.id,
    title: h.name ?? 'Untitled Hotel',
    excerpt: h.description ? h.description.slice(0, 140) : '',
    image: h.image ?? (Array.isArray(h.images) ? h.images[0] : '') ?? '',
    author: 'Hotel Partner',
    date: h.createdAt ?? new Date().toISOString(),
    readTime: '',
    category: 'Hotel',
    status: h.status === 'active' ? 'published' : 'draft',
    sourceType: 'hotel',
    href: `/hotels/${h.id}`, // adjust to your actual public hotel detail route
  };
}

export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const [offersRes, hotelsRes] = await Promise.all([
          fetch('/api/offers'),
          fetch('/api/hotels'),
        ]);

        const offersData: ApiResponse<Offer[]> = await offersRes.json();
        const hotelsData: ApiResponse<any[]> = await hotelsRes.json();

        const publishedOffers = offersData.success && offersData.data
          ? offersData.data
              .filter(offer => offer.status === 'published')
              .map(offer => ({ ...offer, sourceType: 'article' as const }))
          : [];

        if (!offersData.success) {
          console.error('Failed to fetch offers:', offersData.error);
        }

        const hotelOffers = hotelsData.success && hotelsData.data
          ? hotelsData.data
              .filter(h => h.showInOffers && h.status === 'active')
              .map(hotelToOffer)
          : [];

        if (!hotelsData.success) {
          console.error('Failed to fetch hotels:', hotelsData.error);
        }

        setOffers([...publishedOffers, ...hotelOffers]);
      } catch (error) {
        console.error('Error fetching offers:', error);
        setOffers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, []);

  const filteredOffers = selectedCategory === "All Posts"
    ? offers
    : offers.filter(offer => offer.category === selectedCategory);

  const featuredOffer = filteredOffers[0];
  const otherOffers = filteredOffers.slice(1);

  const categories = ["All Posts", ...Array.from(new Set(offers.map(o => o.category)))];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading offers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeroOffersCarousel/>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-6 py-12">
        <TrendingRoutes/>

        {/* Category filter */}
        {categories.length > 1 && (
          <div className="flex flex-wrap gap-2 mt-12 mb-8">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-colors ${
                  selectedCategory === cat
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {filteredOffers.length === 0 && (
          <p className="text-gray-500 text-center py-16">No offers found in this category.</p>
        )}

        {/* Featured offer */}
        {featuredOffer && (
          <Link
            href={featuredOffer.href ?? `/offers/${featuredOffer.id}`}
            className="group block bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden mb-10 hover:shadow-md transition-shadow"
          >
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-full min-h-[280px] bg-gray-100">
                {featuredOffer.image && (
                  <Image
                    src={featuredOffer.image}
                    alt={featuredOffer.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
                <span className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {featuredOffer.category}
                </span>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                  {featuredOffer.title}
                </h2>
                <p className="text-gray-500 mb-5 line-clamp-3">{featuredOffer.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-5">
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4" /> {featuredOffer.author}
                  </span>
                  {featuredOffer.readTime && (
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-4 h-4" /> {featuredOffer.readTime}
                    </span>
                  )}
                </div>
                <span className="inline-flex items-center gap-2 text-orange-600 font-semibold text-sm">
                  Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Other offers grid */}
        {otherOffers.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherOffers.map(offer => (
              <Link
                key={`${offer.sourceType ?? 'article'}-${offer.id}`}
                href={offer.href ?? `/offers/${offer.id}`}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="relative h-44 bg-gray-100">
                  {offer.image && (
                    <Image
                      src={offer.image}
                      alt={offer.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  )}
                  <span className="absolute top-3 left-3 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                    {offer.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
                    {offer.title}
                  </h3>
                  <p className="text-sm text-gray-500 mb-4 line-clamp-2">{offer.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-400">
                    <span className="flex items-center gap-1">
                      <User className="w-3.5 h-3.5" /> {offer.author}
                    </span>
                    {offer.readTime && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {offer.readTime}
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated with Travel Tips</h2>
          <p className="text-xl text-orange-100 mb-8">
            Subscribe to our newsletter and get the latest travel guides, tips, and exclusive deals delivered to your inbox
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="bg-black text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-lg font-bold transition-colors ">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}