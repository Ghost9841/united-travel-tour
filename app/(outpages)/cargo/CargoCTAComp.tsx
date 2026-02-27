'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function CTA() {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(contentRef.current, {
      duration: 1,
      y: 50,
      opacity: 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        markers: false,
      },
    });
  }, []);

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 bg-white dark:bg-slate-800"
    >
      <div className="container mx-auto px-4">
        <div
          ref={contentRef}
          className="relative rounded-3xl bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary-foreground rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-foreground rounded-full blur-3xl"></div>
          </div>

          <div className="relative z-10 px-8 md:px-16 py-16 md:py-24">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                Ready to Send Your Cargo?
              </h2>
              <p className="text-lg md:text-xl mb-8 opacity-95 text-balance">
                Whether it's personal parcels, household items, or business goods—we make shipping from London to Nepal simple and affordable. Get a quick quote today.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-primary rounded-lg font-semibold hover:shadow-lg transition-shadow">
                 <a href="/contactus">
                  Get a Quote
                 </a>
                </button>
                <button className="px-8 py-4 border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition-all">
                 <a href="wa.me/447366234404">
                   Call 020 3725 3460
                  </a>
                </button>
              </div>

              <p className="text-sm mt-8 opacity-85">
                Share your pickup area and approximate weight • Quick response • Special rates available
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
