'use client';
import { Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, ArrowLeft, MapPin, DollarSign, Star, Phone, Mail, Globe, Shield, Heart, TrendingUp } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface Offer {
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
  // Travel-specific fields (if your API returns them)
  destination?: string;
  duration?: string;
  price?: number;
  originalPrice?: number;
  discount?: number;
  included?: string[];
  availableSeats?: number;
  rating?: number;
  highlights?: string[];
}

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

export default function OffersDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [offer, setOffer] = useState<Offer | null>(null);
  const [relatedOffers, setRelatedOffers] = useState<Offer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [liked, setLiked] = useState(false);
  const [showShare, setShowShare] = useState(false);

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/offers/${id}`);
        const data: ApiResponse<Offer> = await response.json();

        if (data.success && data.data) {
          if (data.data.status === 'published') {
            setOffer(data.data);
            fetchRelatedOffers(data.data.category);
          } else {
            setError('Travel offer not found');
          }
        } else {
          setError(data.error || 'Travel offer not found');
        }
      } catch (err) {
        setError('Failed to load travel offer');
      } finally {
        setLoading(false);
      }
    };

    const fetchRelatedOffers = async (category: string) => {
      try {
        const response = await fetch('/api/offers');
        const data: ApiResponse<Offer[]> = await response.json();
        if (data.success && data.data) {
          const related = data.data
            .filter(b => b.status === 'published' && b.category === category && b.id !== id)
            .slice(0, 3);
          setRelatedOffers(related);
        }
      } catch (err) {
        console.error('Failed to load related offers:', err);
      }
    };

    if (id) {
      fetchOffer();
    }
  }, [id]);

  const handleLike = async () => {
    if (!offer) return;
    try {
      const response = await fetch(`/api/offers/${id}/like`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        setLiked(!liked);
        setOffer({
          ...offer,
          likes: liked ? offer.likes - 1 : offer.likes + 1
        });
      }
    } catch (err) {
      console.error('Failed to like offer:', err);
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = `Check out this amazing travel offer: ${offer?.title}`;
    
    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(url)}&title=${encodeURIComponent(offer?.title || '')}`;
        break;
    }
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-semibold">Loading amazing travel offers...</p>
        </div>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-6">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <MapPin className="w-10 h-10 text-teal-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Offer Not Found</h1>
            <p className="text-gray-600 mb-6">{error || 'The travel offer you\'re looking for doesn\'t exist or has expired.'}</p>
            <a href="/offers" className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-300 shadow-md hover:shadow-lg">
              <ArrowLeft className="w-5 h-5" />
              Browse All Offers
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-teal-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        <a href="/offers" className="inline-flex items-center gap-2 text-teal-600 hover:text-teal-700 font-medium transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to All Offers
        </a>
      </div>

      {/* Main Content */}
      <article className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2">
            {/* Category Badge */}
            <div className="mb-4">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-md">
                <MapPin className="w-4 h-4" />
                {offer.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              {offer.title}
            </h1>

            {/* Meta Info */}
            <div className="flex flex-wrap items-center justify-between gap-4 text-gray-600 mb-8 pb-8 border-b border-gray-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-teal-400 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {offer.author.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{offer.author}</p>
                  <div className="flex items-center gap-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{new Date(offer.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{offer.readTime}</span>
                    </div>
                    <span>•</span>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4" />
                      <span>{offer.views} views</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Interaction Buttons */}
              <div className="flex items-center gap-3">
                <button 
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300 ${
                    liked ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
                  <span>{offer.likes}</span>
                </button>
                
                <div className="relative">
                  <button 
                    onClick={() => setShowShare(!showShare)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                  >
                    <Share2 className="w-5 h-5" />
                    <span>Share</span>
                  </button>
                  
                  {showShare && (
                    <div className="absolute right-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-2 z-10">
                      <button onClick={() => handleShare('facebook')} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg w-full">
                        <Facebook className="w-4 h-4 text-blue-600" />
                        <span>Facebook</span>
                      </button>
                      <button onClick={() => handleShare('twitter')} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg w-full">
                        <Twitter className="w-4 h-4 text-blue-400" />
                        <span>Twitter</span>
                      </button>
                      <button onClick={() => handleShare('linkedin')} className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 rounded-lg w-full">
                        <Linkedin className="w-4 h-4 text-blue-700" />
                        <span>LinkedIn</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Featured Image */}
            <div className="mb-8">
              <img
                src={offer.image}
                alt={offer.title}
                className="w-full h-[400px] object-cover rounded-2xl shadow-xl"
              />
            </div>

            {/* Offer Details Card */}
            {offer.price && (
              <div className="bg-gradient-to-r from-teal-500 to-blue-500 rounded-2xl p-6 mb-8 text-white shadow-xl">
                <div className="flex flex-wrap justify-between items-center gap-4">
                  <div>
                    <p className="text-sm opacity-90">Starting from</p>
                    <div className="flex items-baseline gap-2">
                      {offer.originalPrice && (
                        <span className="text-2xl line-through opacity-75">${offer.originalPrice}</span>
                      )}
                      <span className="text-4xl font-bold">${offer.price}</span>
                      {offer.discount && (
                        <span className="bg-white text-teal-600 px-2 py-1 rounded-lg text-sm font-semibold">
                          Save {offer.discount}%
                        </span>
                      )}
                    </div>
                    {offer.duration && (
                      <p className="text-sm mt-1 flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        {offer.duration} days
                      </p>
                    )}
                  </div>
                  
                  <div className="text-right">
                    {offer.availableSeats && (
                      <p className="text-sm opacity-90">Available Seats</p>
                    )}
                    <p className="text-2xl font-bold">{offer.availableSeats || 'Limited'}</p>
                    <button className="mt-2 bg-white text-teal-600 px-6 py-2 rounded-xl font-semibold hover:shadow-lg transition-shadow">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Article Content */}
            <div className="prose prose-lg max-w-none">
              {offer.content.split('\n\n').map((paragraph, idx) => (
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

            {/* Highlights Section */}
            {offer.highlights && offer.highlights.length > 0 && (
              <div className="mt-12 bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <Star className="w-6 h-6 text-yellow-500 fill-current" />
                  Tour Highlights
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {offer.highlights.map((highlight, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-teal-500 rounded-full"></div>
                      <span className="text-gray-700">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Included/Excluded Section */}
            {offer.included && offer.included.length > 0 && (
              <div className="mt-8 bg-white rounded-2xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">What's Included</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {offer.included.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="w-5 h-5 bg-teal-500 rounded-full flex items-center justify-center text-white text-xs">✓</div>
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl p-6 shadow-lg mb-8 sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <Phone className="w-5 h-5 text-teal-500" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Mail className="w-5 h-5 text-teal-500" />
                  <span>travel@example.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-700">
                  <Globe className="w-5 h-5 text-teal-500" />
                  <span>www.traveloffers.com</span>
                </div>
                <button className="w-full mt-4 bg-gradient-to-r from-teal-500 to-blue-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transition-all">
                  Contact Travel Expert
                </button>
              </div>
            </div>

            {/* Guarantee Card */}
            <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-2xl p-6 shadow-lg">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="w-8 h-8 text-teal-600" />
                <h3 className="text-lg font-bold text-gray-900">Best Price Guarantee</h3>
              </div>
              <p className="text-gray-600 text-sm">
                Found a better price elsewhere? We'll match it and give you an additional 10% off!
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related Offers */}
      {relatedOffers.length > 0 && (
        <div className="bg-white py-16 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 flex items-center gap-2">
              <TrendingUp className="w-8 h-8 text-teal-500" />
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedOffers.map((related) => (
                <a
                  key={related.id}
                  href={`/offers/${related.id}`}
                  className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-100"
                >
                  <div className="relative h-56 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-teal-500 to-blue-500 text-white px-3 py-1 rounded-full text-sm font-semibold shadow-md">
                        {related.category}
                      </span>
                    </div>
                    {related.price && (
                      <div className="absolute bottom-4 right-4 bg-white rounded-lg px-3 py-1 shadow-lg">
                        <span className="text-teal-600 font-bold">${related.price}</span>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 group-hover:text-teal-500 transition-colors line-clamp-2 mb-2">
                      {related.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                      {related.excerpt}
                    </p>
                    {related.duration && (
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Clock className="w-4 h-4" />
                        <span>{related.duration} days tour</span>
                      </div>
                    )}
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