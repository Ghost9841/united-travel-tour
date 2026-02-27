'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

export function Details() {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'center center',
        scrub: 0.5,
        markers: false,
      },
    });

    tl.from(titleRef.current, {
      duration: 1,
      y: 60,
      opacity: 0,
      ease: 'power3.out',
    })
      .from(
        imageRef.current,
        {
          duration: 1,
          x: -50,
          opacity: 0,
          ease: 'power3.out',
        },
        '-=0.8'
      )
      .from(
        contentRef.current,
        {
          duration: 1,
          x: 50,
          opacity: 0,
          ease: 'power3.out',
        },
        '-=0.8'
      );
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800"
    >
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-primary text-balance mb-16"
        >
          Why Choose United Travel and Tours
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image Section */}
          <div
            ref={imageRef}
            className="relative h-96 md:h-full rounded-2xl overflow-hidden bg-gradient-to-br from-primary to-accent flex items-center justify-center"
          >

             <Image src="/cargo_detail.avif" alt="Cargo" width={256} height={384}
             className="h-full w-full object-cover" />

          </div>

          {/* Content Section */}
          <div ref={contentRef} className="space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-primary">
                Clear Guidance & Reliable Delivery
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                We help customers ship personal parcels and business cargo with careful handling, clear guidance, and reliable delivery support. Whether you need pickup, packing advice, customs help, or insurance, we keep things simple and straightforward.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-primary">What We Offer</h3>
              <ul className="space-y-3">
                {[
                  'Safe packing guidance and boxing advice',
                  'Full insurance-protected shipping options',
                  'Customs and paperwork support',
                  'Convenient pickup services available',
                  'Special rates based on weight and location',
                  'Clear, transparent pricing with no hidden costs',
                ].map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                      ✓
                    </span>
                    <span className="text-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button  className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
             <a href="/contactus">
              Get a Quote Today
             </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
