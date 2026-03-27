'use client'

import { useState, useEffect, useCallback } from 'react'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import Autoplay from 'embla-carousel-autoplay'

interface CarouselImage {
  id: number
  src: string
  alt: string
  order: number
  status: 'active' | 'draft'
}

export default function HeroCarousel() {
  const [images, setImages]   = useState<CarouselImage[]>([])
  const [loading, setLoading] = useState(true)
  const [api, setApi]         = useState<CarouselApi>()
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    (async () => {
      try {
        const res  = await fetch('/api/offers/carouselimages?status=active')
        const data = await res.json()
        if (data.success) setImages(data.data)
      } catch (err) {
        console.error('Failed to fetch carousel images', err)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  useEffect(() => {
    if (!api) return
    setCurrent(api.selectedScrollSnap())
    api.on('select', () => setCurrent(api.selectedScrollSnap()))
  }, [api])

  const goToSlide = useCallback((idx: number) => {
    api?.scrollTo(idx)
  }, [api])

  if (loading) return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-200 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    </section>
  )

  if (images.length === 0) return null

  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* Draggable carousel — Embla handles touch/mouse drag */}
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
              <div className="absolute inset-0 bg-black/35" />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>


      {/* Bottom dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goToSlide(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`rounded-full transition-all duration-300 ${
              idx === current
                ? 'bg-white w-8 h-3'
                : 'bg-white/50 hover:bg-white/80 w-3 h-3'
            }`}
          />
        ))}
      </div>

    </section>
  )
}