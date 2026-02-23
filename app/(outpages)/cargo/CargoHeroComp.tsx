'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate hero elements on mount
    const tl = gsap.timeline();

    tl.from(titleRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
    })
      .from(
        subtitleRef.current,
        {
          duration: 0.8,
          y: 30,
          opacity: 0,
          ease: 'power3.out',
        },
        '-=0.5'
      )
      .from(
        ctaRef.current,
        {
          duration: 0.8,
          y: 30,
          opacity: 0,
          ease: 'power3.out',
        },
        '-=0.5'
      );
  }, []);

  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/cargo-hero.jpg)',
          backgroundAttachment: 'fixed'
        }}
      />
      
      {/* Transparent Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 container mx-auto px-4 py-20">
        <div className="flex flex-col items-center justify-center text-center">
          {/* Main Content */}
          <div className="max-w-3xl">
            <h1
              ref={titleRef}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-white text-balance leading-tight mb-6"
            >
              Send Cargo from London to Nepal
            </h1>
            <p
              ref={subtitleRef}
              className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed text-balance"
            >
              Special rates and a service team that keeps things simple. We help you ship personal parcels and business cargo with careful handling, clear guidance, and reliable delivery support.
            </p>
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
                <a href="/contactus">
                Get a Quote
                </a>
              </button>
              <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-primary transition-all">
                                <a href="/contactus">
                Contact Us
                </a>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
