'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

interface HeroImage {
  id: number
  src: string
  alt: string
}

export default function HeroCarousel() {
  const [images, setImages]   = useState<HeroImage[]>([])
  const [loading, setLoading] = useState(true)
  const [api, setApi]         = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  // Fetch from DB
  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch('/api/hero')
        const data = await res.json()
        if (data.success) setImages(data.data)
      } catch (err) {
        console.error('Failed to fetch hero images', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  // Sync current slide index with Embla
  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on('select', () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const goToSlide = useCallback((idx: number) => {
    api?.scrollTo(idx)
  }, [api])

  const nextSlide = useCallback(() => api?.scrollNext(), [api])
  const prevSlide = useCallback(() => api?.scrollPrev(), [api])

  if (loading) return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-900 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin" />
      </div>
    </section>
  )

  if (images.length === 0) return null

  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* Draggable Embla carousel */}
      <Carousel
        setApi={setApi}
        opts={{ loop: true }}
        plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        className="w-full h-full"
      >
        <CarouselContent className="h-screen ml-0">
          {images.map(image => (
            <CarouselItem key={image.id} className="pl-0 relative h-screen">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover select-none"
                draggable={false}
                onError={e => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=1080&fit=crop'
                }}
              />
              <div className="absolute inset-0 bg-black/30" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between px-8 md:px-16 py-16 z-10 pointer-events-none">

        {/* Text */}
        <div className="flex flex-col flex-1 mt-24 md:mt-32">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 drop-shadow-lg max-w-2xl">
            Start your unforgettable journey with us.
          </h1>
          <p className="text-lg md:text-xl text-white drop-shadow-md max-w-xl">
            The best travel for your journey begins now
          </p>
        </div>

        {/* Right-side vertical nav — dots + chevrons */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-6 pointer-events-auto">

          {/* Dots */}
          <div className="flex flex-col gap-4">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`rounded-full transition-all duration-300 ${
                  idx === current
                    ? 'bg-white w-3 h-8'
                    : 'bg-white/50 hover:bg-white/80 w-3 h-3'
                }`}
              />
            ))}
          </div>

          {/* Chevrons */}
          <div className="flex flex-col gap-2">
            <button
              onClick={prevSlide}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition"
              aria-label="Previous slide"
            >
              <ChevronUp className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition"
              aria-label="Next slide"
            >
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}