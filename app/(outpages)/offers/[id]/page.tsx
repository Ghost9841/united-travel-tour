'use client';
import { Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  category: string;
  status: string;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export default function OffersDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [offer, setOffer] = useState<Blog | null>(null);
  const [relatedOffers, setRelatedOffers] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/offers/${id}`);
        const data: ApiResponse<Blog> = await response.json();

        if (data.success && data.data) {
          // Only show published offers on the public page
          if (data.data.status === 'published') {
            setOffer(data.data);
            // Fetch related offers
            fetchRelatedOffers(data.data.category);
          } else {
            setError('Offer not found');
          }
        } else {
          setError(data.error || 'Offer not found');
        }
      } catch (err) {
        setError('Failed to load offer');
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedOffers = async (category: string) => {
      try {
        const response = await fetch('/api/offers');
        const data: ApiResponse<Blog[]> = await response.json();
        if (data.success && data.data) {
          // Get published offers from same category, excluding current offer
          const related = data.data
            .filter(b => b.status === 'published' && b.category === category && b.id !== id)
            .slice(0, 3);
          setRelatedOffers(related);
        }
      } catch (err) {
        // Silently fail for related offers
        console.error('Failed to load related offers:', err);
      }
    };

    if (id) {
      fetchOffer();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-orange-500 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-white border-t-orange-300 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white font-semibold">Loading blog post...</p>
        </div>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Offer Not Found</h1>
          <p className="text-gray-600 mb-6">{error || 'The offer you\'re looking for doesn\'t exist.'}</p>
          <a href="/offers" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Back to All Offers
          </a>
        </div>
      </div>
    );
  }

  const post = offer;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-400 via-yellow-300 to-pink-400">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-4">
        <a href="/offers" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium">
          <ArrowLeft className="w-5 h-5" />
          Back to Offers
        </a>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-6 pb-16">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img src={`https://i.pravatar.cc/150?img=${post.id}`} alt={post.author} className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-semibold text-gray-900">{post.author}</p>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm font-medium">Share:</span>
            <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors">
              <Facebook className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-2xl"
          />
        </div>

        {/* Article Content */}
        <div className="prose prose-lg max-w-none">
          {post.content.split('\n\n').map((paragraph, idx) => (
            <p key={idx} className="mb-6 text-gray-700 leading-relaxed">
              {paragraph.split('\n').map((line, lineIdx) => (
                <span key={lineIdx}>
                  {line}
                  {lineIdx < paragraph.split('\n').length - 1 && <br />}
                </span>
              ))}
            </p>
          ))}
        </div>

       
      </article>

      {/* Related Posts */}
      {relatedOffers.length > 0 && (
        <div className="bg-gray-100 py-16">
          <div className="max-w-6xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Offers</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedOffers.map((related) => (
                <a
                  key={related.id}
                  href={`/offers/${related.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {related.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                      {related.title}
                    </h3>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}