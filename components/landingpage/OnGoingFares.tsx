'use client';
import { ChevronLeft, ChevronRight, Plane, Clock, Tag } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const ONGOING_FARES = [
  {
    id: 1,
    title: "Kathmandu to London",
    description: "Experience luxury shopping and desert adventures.",
    originalPrice: "£450",
    discountedPrice: "£400",
    discount: "5% OFF",
    duration: "5h 30m",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=400&fit=crop",
    alt: "Dubai skyline",
    departure: "Kathmandu",
    arrival: "London",
    expires: "Ends in 2 days"
  },
  {
    id: 3,
    title: "London to Kathmandu (Two Way)",
    description: "Immerse yourself in India's rich cultural heritage.",
    originalPrice: "£800",
    discountedPrice: "£700",
    discount: "5% OFF",
    duration: "1h 50m",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=400&fit=crop",
    alt: "Delhi architecture",
    departure: "London",
    arrival: "Kathmandu",
    expires: "Ends tomorrow"
  },
  {
    id: 5,
    title: "Kathmandu to London",
    description: "Modern skyscrapers and cultural landmarks.",
    originalPrice: "£520",
    discountedPrice: "£360",
    discount: "33% OFF",
    duration: "4h 45m",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=400&fit=crop",
    alt: "Kuala Lumpur",
    departure: "Kathmandu",
    arrival: "London",
    expires: "Ends in 4 days"
  }
];

export default function CompactFaresBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [currentTranslate, setCurrentTranslate] = useState(0);
  const dragThreshold = 50; // minimum pixels to drag before switching slide

  const handleNavClick = (direction: 'next' | 'prev') => {
    setCurrentIndex((prev) => {
      if (direction === 'next') {
        return (prev + 1) % ONGOING_FARES.length;
      } else {
        return (prev - 1 + ONGOING_FARES.length) % ONGOING_FARES.length;
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

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ONGOING_FARES.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        setCurrentIndex((prev) => (prev - 1 + ONGOING_FARES.length) % ONGOING_FARES.length);
      }
      if (e.key === 'ArrowRight') {
        setCurrentIndex((prev) => (prev + 1) % ONGOING_FARES.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const currentFare = ONGOING_FARES[currentIndex];

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
          transform: `translateX(£{currentTranslate}px)`,
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
          transform: `translateX(£{currentTranslate}px)`,
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
              <div className="flex items-center gap-2 text-gray-300">
                <Clock className="w-4 h-4" />
                <span className="text-white font-medium">{currentFare.duration}</span>
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
          {currentIndex + 1} / {ONGOING_FARES.length}
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
          {ONGOING_FARES.map((_, index) => (
            <button
              key={index}
              onClick={(e) => { e.stopPropagation(); handleDotClick(index); }}
              className={`h-1.5 rounded-full transition-all £{index === currentIndex ? 'bg-orange-500 w-4' : 'bg-white/50 w-1.5 hover:bg-white'}`}
              aria-label={`Go to slide £{index + 1}`}
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