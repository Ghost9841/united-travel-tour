'use client';
import { Calendar, User, Clock, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
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
      <HeroOffersCarousel/>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-6 py-12">
        <TrendingRoutes/>
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