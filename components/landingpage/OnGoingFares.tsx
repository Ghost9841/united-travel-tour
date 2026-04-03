'use client';
import { ChevronLeft, ChevronRight, Plane, Clock, Tag } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

interface OngoingFareItem {
  id: number;
  title: string;
  description: string;
  originalPrice: string;
  discountedPrice: string;
  discount: string;
  image: string;
  alt: string;
  departure: string;
  arrival: string;
  expires: string;
  status?: string;
}


export default function CompactFaresBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const [ongoingFares, setOngoingFares] = useState<OngoingFareItem[]>(ONGOING_FARES);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dragThreshold = 50; // minimum pixels to drag before switching slide

  const activeFares = ongoingFares.length ? ongoingFares : ONGOING_FARES;
  const totalSlides = activeFares.length;

  const handleNavClick = (direction: 'next' | 'prev') => {
    setCurrentIndex((prev) => {
      if (totalSlides === 0) return 0;
      if (direction === 'next') {
        return (prev + 1) % totalSlides;
      } else {
        return (prev - 1 + totalSlides) % totalSlides;
      }
    });
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Drag handlers
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    setIsAutoPlaying(false);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const diff = clientX - startX;
    setCurrentTranslate(diff);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    // If dragged more than threshold, change slide
    if (currentTranslate < -dragThreshold) {
      // Dragged left, go to next
      handleNavClick('next');
    } else if (currentTranslate > dragThreshold) {
      // Dragged right, go to previous
      handleNavClick('prev');
    }

    setCurrentTranslate(0);
    setTimeout(() => setIsAutoPlaying(true), 3000);
  };

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    handleDragStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleDragMove(e.clientX);
  };

  const handleMouseUp = () => {
    handleDragEnd();
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleDragEnd();
    }
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleDragStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleDragMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleDragEnd();
  };

  useEffect(() => {
    let didCancel = false;

    const loadFares = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/(landingpage)/ongoingfare?status=active');
        const json = await res.json();

        if (!res.ok) {
          throw new Error(json?.error || 'Failed to fetch ongoing fares');
        }

        const data: OngoingFareItem[] = json.data || [];

        if (!didCancel) {
          setOngoingFares(data.length ? data : ONGOING_FARES);
          if (data.length && currentIndex >= data.length) {
            setCurrentIndex(0);
          }
        }
      } catch (fetchError) {
        console.error('Error loading ongoing fares:', fetchError);
        if (!didCancel) {
          setError('Unable to load fare banners.');
          setOngoingFares(ONGOING_FARES);
        }
      } finally {
        if (!didCancel) setIsLoading(false);
      }
    };

    loadFares();

    return () => {
      didCancel = true;
    };
  }, [currentIndex]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || totalSlides === 0) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (totalSlides === 0) return;
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % totalSlides);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  const currentFare = activeFares[currentIndex] || activeFares[0];

  if (isLoading) {
    return (
      <section className="relative w-full bg-gray-900 overflow-hidden rounded-2xl mx-auto max-w-7xl mt-4 mb-6 h-[280px] sm:h-[320px] flex items-center justify-center">
        <div className="text-white text-sm">Loading ongoing fares...</div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative w-full bg-gray-900 overflow-hidden rounded-2xl mx-auto max-w-7xl mt-4 mb-6 h-[280px] sm:h-[320px] flex items-center justify-center">
        <div className="text-red-300 text-sm">{error}</div>
      </section>
    );
  }

  return (
    <section 
      className="relative w-full bg-gray-900 overflow-hidden rounded-2xl mx-auto max-w-7xl mt-4 mb-6 h-[280px] sm:h-[320px] select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 transition-transform duration-200"
        style={{ 
          transform: `translateX(${currentTranslate}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        <img
          src={currentFare.image}
          alt={currentFare.alt}
          className="w-full h-full object-cover opacity-60 pointer-events-none"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div 
        className="relative h-full flex items-center px-6 sm:px-10 transition-transform duration-200"
        style={{ 
          transform: `translateX(${currentTranslate}px)`,
          transition: isDragging ? 'none' : 'transform 0.3s ease-out'
        }}
      >
        <div className="flex-1 max-w-2xl pointer-events-none">
          {/* Top Row: Timer & Discount */}
          <div className="flex flex-wrap items-center gap-3 mb-3">
            <div className="inline-flex items-center gap-1.5 bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium">
              <Clock className="w-3 h-3" />
              {currentFare.expires}
            </div>
            <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              {currentFare.discount}
            </span>
          </div>

          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
            {currentFare.title}
          </h2>

          {/* Description - Hidden on mobile */}
          <p className="text-sm text-gray-300 mb-4 hidden sm:block max-w-md">
            {currentFare.description}
          </p>

          {/* Price & Route Info */}
          <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-4">
            {/* <div className="flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-bold text-white">
                {currentFare.discountedPrice}
              </span>
              <span className="text-sm text-gray-400 line-through">
                {currentFare.originalPrice}
              </span>
            </div> */}

            <div className="hidden sm:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2 text-gray-300">
                <Plane className="w-4 h-4" />
                <span className="text-white font-medium">{currentFare.departure} → {currentFare.arrival}</span>
              </div>
            </div>
          </div>

          {/* CTA */}
          <a href="/booknow/travels">
          <button 
            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-semibold hover:from-orange-600 hover:to-orange-700 transition-all duration-300 shadow-lg pointer-events-auto"
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
            onClick={(e) => e.stopPropagation()}
            >
            Book Now
          </button>
            </a>
        </div>

        {/* Slide Counter */}
        <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-white text-xs font-medium">
          {totalSlides === 0 ? 0 : currentIndex + 1} / {totalSlides}
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-4 right-4 flex items-center gap-2 z-10">
        <button
          onClick={(e) => { e.stopPropagation(); handleNavClick('prev'); }}
          className="p-3 rounded-md bg-orange-500 hover:bg-orange-600 text-white transition-colors"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <div className="flex gap-1.5">
          {activeFares.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); handleDotClick(index); }}
              className={`h-1.5 rounded-full transition-all ${index === currentIndex ? 'bg-orange-500 w-4' : 'bg-white/50 w-1.5 hover:bg-white'}`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        <button
          onClick={(e) => { e.stopPropagation(); handleNavClick('next'); }}
          className="p-3 rounded-md bg-orange-500 hover:bg-orange-600 text-white transition-colors"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Promo Tag */}
      <div className="absolute bottom-0 left-0 bg-gradient-to-r from-orange-500/90 to-red-500/90 px-4 py-1.5 rounded-tr-lg">
        <div className="flex items-center gap-2">
          <Tag className="w-3 h-3 text-white" />
          <span className="text-white text-xs font-medium">Free cancellation</span>
        </div>
      </div>
    </section>
  );
}