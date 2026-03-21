'use client';
import { MapPin, Clock, Users, Star, ArrowLeft, Heart, Share2, Tag, CalendarDays, Eye } from 'lucide-react';
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
        const data: ApiResponse<Offer[]> = await response.json();
        if (data.success && data.data) {
          const related = data.data
            .filter((b) => b.status === 'published' && b.category === category && b.id !== id)
            .slice(0, 3);
          setRelatedOffers(related);
        }
      } catch (err) {
        console.error('Failed to load related offers:', err);
      }
    };

    if (id) fetchOffer();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0c08] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-14 h-14 rounded-full border-2 border-amber-400/30 border-t-amber-400 animate-spin mx-auto" />
          <p className="text-amber-400/70 text-sm tracking-[0.2em] uppercase font-light">Loading offer</p>
        </div>
      </div>
    );
  }

  if (error || !offer) {
    return (
      <div className="min-h-screen bg-[#0f0c08] flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="text-7xl">✈️</div>
          <h1 className="text-3xl font-light text-white tracking-wide">Offer Not Found</h1>
          <p className="text-white/40 text-sm">{error || "The offer you're looking for doesn't exist."}</p>
          <a
            href="/offers"
            className="inline-block mt-4 px-8 py-3 border border-amber-400/50 text-amber-400 text-sm tracking-[0.15em] uppercase hover:bg-amber-400 hover:text-black transition-all duration-300"
          >
            Browse All Offers
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0c08] text-white" style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}>

      {/* ── Hero ── */}
      <div className="relative h-[90vh] min-h-[600px] overflow-hidden">
        <img
          src={offer.image}
          alt={offer.title}
          className="absolute inset-0 w-full h-full object-cover scale-105"
          style={{ animation: 'slowZoom 20s ease-out forwards' }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f0c08] via-[#0f0c08]/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0f0c08]/60 via-transparent to-transparent" />

        {/* Back */}
        <div className="absolute top-8 left-6 md:left-12">
          <a
            href="/offers"
            className="inline-flex items-center gap-2 text-white/60 hover:text-amber-400 text-sm tracking-widest uppercase transition-colors duration-300"
            style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
          >
            <ArrowLeft className="w-4 h-4" />
            All Offers
          </a>
        </div>

        {/* Actions */}
        <div className="absolute top-8 right-6 md:right-12 flex items-center gap-3">
          <button
            onClick={() => setLiked(!liked)}
            className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all duration-300 ${liked ? 'bg-red-500 border-red-500' : 'border-white/30 hover:border-red-400'}`}
          >
            <Heart className={`w-4 h-4 ${liked ? 'fill-white text-white' : 'text-white/70'}`} />
          </button>
          <button className="w-10 h-10 rounded-full border border-white/30 hover:border-amber-400 flex items-center justify-center transition-all duration-300">
            <Share2 className="w-4 h-4 text-white/70" />
          </button>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-16 pb-16">
          <div className="max-w-4xl">
            <div className="mb-5">
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 border border-amber-400/60 text-amber-400 text-xs tracking-[0.25em] uppercase"
                style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
              >
                <MapPin className="w-3 h-3" />
                {offer.category}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-[1.1] mb-6 tracking-tight text-white">
              {offer.title}
            </h1>

            <div
              className="flex flex-wrap items-center gap-6 text-white/50 text-sm"
              style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
            >
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400/70" />
                <span>{offer.readTime}</span>
              </div>
              <div className="h-3 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <CalendarDays className="w-4 h-4 text-amber-400/70" />
                <span>{offer.date}</span>
              </div>
              <div className="h-3 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-amber-400/70" />
                <span>{offer.views?.toLocaleString() ?? 0} interested</span>
              </div>
              <div className="h-3 w-px bg-white/20" />
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4 text-amber-400/70" />
                <span>{offer.likes?.toLocaleString() ?? 0} saved</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Body ── */}
      <div className="max-w-5xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

          {/* Main content */}
          <div className="lg:col-span-2 space-y-10">
            {offer.excerpt && (
              <p className="text-xl md:text-2xl font-light text-amber-300/80 leading-relaxed border-l-2 border-amber-400/40 pl-6 italic">
                {offer.excerpt}
              </p>
            )}

            <div className="flex items-center gap-4">
              <div className="h-px bg-gradient-to-r from-amber-400/50 to-transparent flex-1" />
              <span className="text-amber-400/40 text-xs tracking-widest uppercase" style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>Details</span>
              <div className="h-px bg-gradient-to-l from-amber-400/50 to-transparent flex-1" />
            </div>

            <div className="space-y-5">
              {offer.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="text-white/65 leading-[1.9] text-[1.05rem]">
                  {paragraph.split('\n').map((line, lineIdx, arr) => (
                    <span key={lineIdx}>
                      {line}
                      {lineIdx < arr.length - 1 && <br />}
                    </span>
                  ))}
                </p>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* CTA card */}
            <div className="border border-amber-400/20 p-6 space-y-5 bg-white/[0.03]">
              <p className="text-xs tracking-[0.2em] uppercase text-amber-400/60" style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
                Exclusive Offer
              </p>
              <h3 className="text-xl font-light text-white leading-snug">
                Interested in this package?
              </h3>
              <p className="text-white/40 text-sm leading-relaxed" style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
                Speak to one of our travel experts to customise this offer for you.
              </p>
              <a
                href="/contact"
                className="block w-full text-center py-3.5 bg-amber-400 text-black text-sm font-semibold tracking-[0.15em] uppercase hover:bg-amber-300 transition-colors duration-300"
                style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
              >
                Enquire Now
              </a>
              <a
                href="tel:+441234567890"
                className="block w-full text-center py-3 border border-white/20 text-white/60 text-sm tracking-[0.1em] uppercase hover:border-amber-400/50 hover:text-amber-400 transition-all duration-300"
                style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
              >
                Call Us
              </a>
            </div>

            {/* Info card */}
            <div className="border border-white/10 p-6 space-y-4 bg-white/[0.02]" style={{ fontFamily: "'Helvetica Neue', sans-serif" }}>
              <p className="text-xs tracking-[0.2em] uppercase text-white/30">Offer Info</p>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm">
                  <Tag className="w-4 h-4 text-amber-400/60 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white/30 text-xs mb-0.5">Category</p>
                    <p className="text-white/70">{offer.category}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Clock className="w-4 h-4 text-amber-400/60 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white/30 text-xs mb-0.5">Duration</p>
                    <p className="text-white/70">{offer.readTime}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <CalendarDays className="w-4 h-4 text-amber-400/60 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white/30 text-xs mb-0.5">Available From</p>
                    <p className="text-white/70">{offer.date}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <Users className="w-4 h-4 text-amber-400/60 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-white/30 text-xs mb-0.5">Curated by</p>
                    <p className="text-white/70">{offer.author}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Related Offers ── */}
      {relatedOffers.length > 0 && (
        <div className="border-t border-white/10 py-20 px-6 md:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center gap-6 mb-12">
              <div className="h-px bg-amber-400/30 w-8" />
              <h2
                className="text-xs tracking-[0.3em] uppercase text-amber-400/60"
                style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
              >
                Similar Offers
              </h2>
              <div className="h-px bg-white/10 flex-1" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedOffers.map((related) => (
                <a
                  key={related.id}
                  href={`/offers/${related.id}`}
                  className="group block overflow-hidden border border-white/10 hover:border-amber-400/30 transition-all duration-500 bg-white/[0.02] hover:bg-white/[0.04]"
                >
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={related.image}
                      alt={related.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                    <span
                      className="absolute bottom-4 left-4 text-[10px] tracking-[0.2em] uppercase text-amber-400 border border-amber-400/40 px-2.5 py-1"
                      style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
                    >
                      {related.category}
                    </span>
                  </div>
                  <div className="p-5 space-y-2">
                    <h3 className="text-base font-light text-white/80 group-hover:text-amber-300 transition-colors duration-300 leading-snug">
                      {related.title}
                    </h3>
                    <p
                      className="text-white/30 text-xs flex items-center gap-2"
                      style={{ fontFamily: "'Helvetica Neue', sans-serif" }}
                    >
                      <Clock className="w-3 h-3" />
                      {related.readTime}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slowZoom {
          from { transform: scale(1.05); }
          to   { transform: scale(1); }
        }
      `}</style>
    </div>
  );
}