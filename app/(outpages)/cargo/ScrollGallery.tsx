'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export function ScrollGallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = scrollContainerRef.current;
    const trigger = containerRef.current;
    if (!container || !trigger) return;

    // Get the scrollable width
    const totalWidth = container.scrollWidth - window.innerWidth;

    gsap.to(container, {
      x: -totalWidth,
      scrollTrigger: {
        trigger: trigger,
        start: 'top top',
        end: () => `+=${totalWidth}`,
        scrub: 1,
        pin: true,
        markers: false,
        onUpdate: (self) => {
          // Ensures smooth scrolling stops at the end
        }
      },
      ease: 'none',
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const services = [
    { id: 1, title: 'Personal Parcels', description: 'Send gifts and personal items to family in Nepal with safe packaging and tracking' },
    { id: 2, title: 'Household Items', description: 'Ship household goods and furniture with careful handling and protective wrapping' },
    { id: 3, title: 'Documents & Papers', description: 'Secure delivery of important documents with insurance protection available' },
    { id: 4, title: 'Excess Baggage', description: 'Affordable solutions for shipping excess baggage or airline overweight items' },
    { id: 5, title: 'Business Cargo', description: 'Commercial goods shipping with invoices, packing lists, and customs guidance' },
    { id: 6, title: 'Insurance Options', description: 'Full coverage insurance to protect your shipment value during transit' },
    { id: 7, title: 'Pickup Services', description: 'Convenient pickup from your location with professional handling' },
    { id: 8, title: 'Customs Support', description: 'Expert guidance on declarations, paperwork, and smooth clearance' },
  ];

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 bg-white dark:bg-slate-800 overflow-hidden"
    >
      <div className="container mx-auto px-4 mb-12">
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-balance mb-4">
          Our Services
        </h2>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Everything you need to ship from London to Nepal - scroll to see all options
        </p>
      </div>

      <div className="overflow-hidden">
        <div
          ref={scrollContainerRef}
          className="flex gap-8 px-4 pb-8"
          style={{ width: 'fit-content' }}
        >
          {services.map((item) => (
            <div
              key={item.id}
              className="flex-shrink-0 w-80 h-96 rounded-2xl bg-white dark:bg-slate-800 border-2 border-primary/20 dark:border-primary/30 p-8 flex flex-col justify-between hover:border-primary/60 transition-all duration-300 hover:shadow-lg dark:hover:shadow-lg/50"
            >
              <div>
                <h3 className="text-2xl font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
              <button className="px-6 py-2 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity w-full">
                Inquire
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
