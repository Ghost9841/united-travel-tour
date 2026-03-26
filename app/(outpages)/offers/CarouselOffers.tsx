'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface CarouselImage {
  id: number
  src: string
  alt: string
  order: number
  status: 'active' | 'draft'
}

export default function HeroOffersCarousel() {
  const [images, setImages] = useState<CarouselImage[]>([])
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlay, setIsAutoPlay] = useState(true)

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
    if (!isAutoPlay || images.length === 0) return
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % images.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [isAutoPlay, images.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlay(false)
  }

  const nextSlide = () => goToSlide((currentSlide + 1) % images.length)
  const prevSlide = () => goToSlide((currentSlide - 1 + images.length) % images.length)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft')  prevSlide()
      if (e.key === 'ArrowRight') nextSlide()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [images.length, currentSlide])

  // Loading skeleton
  if (loading) return (
    <section className="relative w-full h-screen overflow-hidden bg-gray-200 animate-pulse">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
      </div>
    </section>
  )

  // Nothing in DB yet — render nothing so the page doesn't break
  if (images.length === 0) return null

  return (
    <section className="relative w-full h-screen overflow-hidden">

      {/* Slides */}
      <div className="relative w-full h-full">
        {images.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              onError={e => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=1080&fit=crop'
              }}
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>
        ))}
      </div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between px-8 md:px-16 py-16 z-10">
        <div className="flex flex-col flex-1 mt-24 md:mt-32">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-serif font-bold text-white mb-4 drop-shadow-lg max-w-2xl">
            Start your unforgettable journey with us.
          </h1>
          <p className="text-lg md:text-xl text-white drop-shadow-md max-w-xl">
            The best travel for your journey begins now
          </p>
        </div>

        {/* Right-side vertical nav */}
        <div className="absolute right-6 top-1/2 -translate-y-1/2 z-30 flex flex-col items-center gap-6">
          <div className="flex flex-col gap-4">
            {images.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                className={`rounded-full transition-all duration-300 ${
                  idx === currentSlide
                    ? 'bg-white w-3 h-8'
                    : 'bg-white/50 hover:bg-white/80 w-3 h-3'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={prevSlide}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition"
              aria-label="Previous slide">
              <ChevronUp className="w-6 h-6" />
            </button>
            <button onClick={nextSlide}
              className="p-2 rounded-full bg-white/20 hover:bg-white/40 text-white transition"
              aria-label="Next slide">
              <ChevronDown className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

    </section>
  )
}