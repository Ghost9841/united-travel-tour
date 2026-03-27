'use client'

import { useState, useEffect, useCallback } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import { CarouselApi } from '../ui/carousel'

interface HeroCarouselImage {
  id: number
  src: string
  alt: string
  order: number
  status: 'active' | 'draft'
}

export default function HeroCarousel() {
    const [images, setImages] = useState<HeroCarouselImage[]>([])
    const [loading, setLoading] = useState(true)
    const [api, setApi] = useState<CarouselApi>()
    const [current, setCurrent] = useState(0)
    const [isAutoPlay, setIsAutoPlay] = useState(true)
  
    useEffect(() => {
      (async () => {
        try {
          const res = await fetch('/api/hero?status=active')
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

    // Auto-play effect using the api
    useEffect(() => {
      if (!isAutoPlay || !api) return

      const timer = setInterval(() => {
        const nextSlide = (current + 1) % images.length
        api.scrollTo(nextSlide)
      }, 5000)

      return () => clearInterval(timer)
    }, [isAutoPlay, api, current, images.length])

    const nextSlide = () => {
      if (!api) return
      const nextSlide = (current + 1) % images.length
      api.scrollTo(nextSlide)
    }

    const prevSlide = () => {
      if (!api) return
      const prevSlide = (current - 1 + images.length) % images.length
      api.scrollTo(prevSlide)
    }
  
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
            {/* Background Images */}
            <div className="relative w-full h-full">
                {images.map((image, index) => (
                    <div
                        key={image.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            className="w-full h-full object-cover"
                        />
                        {/* Dark Overlay */}
                        <div className="absolute inset-0 bg-black/30" />
                    </div>
                ))}
            </div>

            {/* Content Overlay */}
            <div className="absolute inset-0 flex flex-col justify-between px-8 md:px-16 py-16 z-10">
                {/* Text Content */}
                <div className="flex flex-col flex-1 mt-24 md:mt-32">
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 drop-shadow-lg max-w-2xl">
                        Start your unforgettable journey with us.
                    </h1>
                    <p className="text-lg md:text-xl text-white drop-shadow-md max-w-xl">
                        The best travel for your journey begins now
                    </p>
                </div>
                
                {/* Combined Navigation - Dots and Arrows */}
                <div className="flex flex-col items-center gap-6">
                    {/* Vertical nav – centred on the right edge */}
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-6">
                        {/* Dots */}
                        <div className="flex flex-col gap-4">
                            {images.map((_, idx) => (
                                <button
                                    key={idx}
                                    onClick={() => goToSlide(idx)}
                                    className={`rounded-full transition-all duration-300 ${idx === current ? 'bg-white w-3 h-8' : 'bg-white/50 hover:bg-white/80 w-3 h-3'
                                        }`}
                                    aria-label={`Go to slide ${idx + 1}`}
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
            </div>
        </section>
    )
}