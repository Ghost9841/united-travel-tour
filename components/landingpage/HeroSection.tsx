'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'
import Navbar from '../NavBar'
import TopThinNavbar from './TopThinNavbar'
import SearchFlightHotelsSection from './SearchFlightsHotelsSection'

const HERO_IMAGES = [
    {
        id: 1,
        src: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop',
        alt: 'Alpine Village',
    },
    {
        id: 2,
        src: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop',
        alt: 'Beach Paradise',
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1920&h=1080&fit=crop',
        alt: 'City Skyline',
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=1080&fit=crop',
        alt: 'Tropical Island',
    },
    {
        id: 5,
        src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=1080&fit=crop',
        alt: 'Tropical Island',
    },
    {
        id: 6,
        src: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&h=1080&fit=crop',
        alt: 'Tropical Island',
    },
]

export default function HeroCarousel() {
    const [currentSlide, setCurrentSlide] = useState(0)
    const [isAutoPlay, setIsAutoPlay] = useState(true)

    useEffect(() => {
        if (!isAutoPlay) return

        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % HERO_IMAGES.length)
        }, 5000)

        return () => clearInterval(timer)
    }, [isAutoPlay])

    const goToSlide = (index: number) => {
        setCurrentSlide(index)
        setIsAutoPlay(false)
    }

    const nextSlide = () => {
        goToSlide((currentSlide + 1) % HERO_IMAGES.length)
    }

    const prevSlide = () => {
        goToSlide((currentSlide - 1 + HERO_IMAGES.length) % HERO_IMAGES.length)
    }

    return (
        <section className="relative w-full h-screen overflow-hidden">
            {/* Top Thin Navbar */}
            {/* <div className=''>
            <TopThinNavbar/>

            </div> */}
            {/* Background Images */}
            <div className="relative w-full h-full">
                {HERO_IMAGES.map((image, index) => (
                    <div
                        key={image.id}
                        className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'
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

            {/* Navigation Bar */}
            {/* <nav className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-16 py-6">
                <Navbar />
            </nav> */}
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
                <SearchFlightHotelsSection/>
            </div>
        </section>
    )
}
// if bottom ma rakhnu paryo bhaney
//                         {/* <div className="flex flex-col items-center gap-6">
//                             {/* Vertical Dots Navigation */}
//                             <div className="flex flex-col gap-4">
//                                 {HERO_IMAGES.map((_, index) => (
//                                     <button
//                                         key={index}
//                                         onClick={() => goToSlide(index)}
//                                         className={`w-3 h-3 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-3 h-8' : 'bg-white/50 hover:bg-white/80'
//                                             }`}
//                                         aria-label={`Go to slide ${index + 1}`}
//                                     />
//                                 ))}
//                             </div>

//                             {/* Vertical Chevron Navigation */}
//                             <div className="flex flex-col gap-2">
//                                 <button
//                                     onClick={prevSlide}
//                                     className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
//                                     aria-label="Previous slide"
//                                 >
//                                     <ChevronUp className="w-6 h-6" />
//                                 </button>
//                                 <button
//                                     onClick={nextSlide}
//                                     className="p-2 rounded-full bg-white/20 hover:bg-white/40 transition-colors text-white"
//                                     aria-label="Next slide"
//                                 >
//                                     <ChevronDown className="w-6 h-6" />
//                                 </button>
//                             </div>
//                         </div> */}