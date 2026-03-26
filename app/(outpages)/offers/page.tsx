'use client';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import HeroOffersCarousel from './CarouselOffers';

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
};

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}


export default function OffersPage() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("All Posts");

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const res = await fetch('/api/offers');
        const data: ApiResponse<Offer[]> = await res.json();
        if (data.success && data.data) {
          // Only show published offers on the public page
          const publishedOffers = data.data.filter(offer => offer.status === 'published');
          setOffers(publishedOffers);
        } else {
          console.error('Failed to fetch offers:', data.error);
          setOffers([]);
        }
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
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-8xl mx-auto px-6 mt-16">
          <h1 className="text-5xl font-bold mb-4">Exclusive Offers & Travel Deals</h1>
          <p className="text-xl text-orange-100">Discover top deals, trips, and special offers from our travel experts</p>
        </div>
      </div>
      <HeroOffersCarousel/>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-6 py-12">
       

        {/* Featured Post */}
        {featuredOffer && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Offer</h2>
            <a
              href={`/offers/${featuredOffer.id}`}
              className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="relative h-64 lg:h-auto overflow-hidden">
                  <img
                    src={featuredOffer.image}
                    alt={featuredOffer.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                      {featuredOffer.category}
                    </span>
                  </div>
                </div>

                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" />
                      <span>{featuredOffer.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{featuredOffer.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      <span>{featuredOffer.readTime}</span>
                    </div>
                  </div>

                  <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-orange-500 transition-colors">
                    {featuredOffer.title}
                  </h2>

                  <p className="text-gray-600 text-lg mb-6">
                    {featuredOffer.excerpt}
                  </p>

                  <div className="flex items-center text-orange-500 font-semibold group-hover:gap-3 transition-all">
                    Read More
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </div>
                </div>
              </div>
            </a>
          </div>
        )}

        {/* Offer Grid */}
        {otherOffers.length > 0 && (
          <>
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Offers</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {otherOffers.map((offer) => (
                <a
                  key={offer.id}
                  href={`/offers/${offer.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  {/* Image */}
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {offer.category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{offer.author}</span>
                      </div>
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{offer.date}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                      {offer.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {offer.excerpt}
                    </p>
                    {/* Read Time */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <div className="flex items-center gap-1 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{offer.readTime}</span>
                      </div>

                      <div className="flex items-center text-orange-500 font-semibold text-sm group-hover:gap-2 transition-all">
                        Read More
                        <ArrowRight className="w-4 h-4 ml-1" />
                      </div>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </>
        )}

        {filteredOffers.length === 0 && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No offers found in this category.</p>
          </div>
        )}

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Load More Offers
          </button>
        </div>
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