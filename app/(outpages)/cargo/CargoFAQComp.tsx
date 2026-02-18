'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    id: 1,
    question: 'What items can I send to Nepal?',
    answer:
      'You can send personal parcels, gifts, household items, documents, excess baggage, and commercial goods. We handle everything carefully. Some items may have restrictions depending on customs regulations, so we recommend describing your items so we can advise on any requirements.',
  },
  {
    id: 2,
    question: 'How long does it take to deliver to Nepal?',
    answer:
      'Delivery times depend on the shipping method you choose and how quickly customs clears your items. We provide you with clear timelines when you get your quote. Our team guides you on the best option based on your weight, box size, and destination in Nepal.',
  },
  {
    id: 3,
    question: 'Do you offer insurance protection?',
    answer:
      "Yes, we offer insurance-protected shipping options. You can choose cover that matches the value of your shipment, helping protect against loss or damage during transit. We'll explain what details are needed for insurance and what documents may be required."
  },
  {
    id: 4,
    question: 'Can you arrange pickup from my location?',
    answer:
      'Yes, if you need pickup, we can arrange it. Just share your location in the London area and approximate weight of your shipment. We handle the collection professionally to ensure your items are packed securely from the start.',
  },
  {
    id: 5,
    question: 'What guidance do you provide for packing?',
    answer:
      'We provide safe boxing and labeling advice so your items travel securely and avoid delays. If you need help with packing, our team will guide you on proper techniques. We also help describe items clearly for customs so clearance is easier.',
  },
  {
    id: 6,
    question: 'How do I get a quick quote?',
    answer:
      "Just share your pickup area and an approximate weight of your shipment. We'll respond with a clear price and timeline. For business goods, we also advise on invoices and packing lists. No confusing steps, just straightforward help.",
  },
];

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.from(titleRef.current, {
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

    // Stagger animation for FAQ items
    gsap.from(itemsRef.current, {
      duration: 0.8,
      y: 40,
      opacity: 0,
      ease: 'power3.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        markers: false,
      },
    });
  }, []);

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section
      ref={containerRef}
      className="relative w-full py-20 bg-gradient-to-b from-white to-slate-50 dark:from-slate-800 dark:to-slate-900"
    >
      <div className="container mx-auto px-4">
        <h2
          ref={titleRef}
          className="text-4xl md:text-5xl font-bold text-primary text-center text-balance mb-16"
        >
          Frequently Asked Questions
        </h2>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={faq.id}
              ref={(el) => {
                itemsRef.current[index] = el;
              }}
              className="border border-border rounded-lg overflow-hidden bg-card hover:border-primary/50 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(faq.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground text-left">
                  {faq.question}
                </h3>
                <span
                  className={`flex-shrink-0 w-6 h-6 flex items-center justify-center text-primary font-bold transition-transform duration-300 ${
                    openId === faq.id ? 'rotate-180' : ''
                  }`}
                >
                  ▼
                </span>
              </button>

              {openId === faq.id && (
                <div className="px-6 py-4 border-t border-border bg-muted/30">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Have more questions about shipping to Nepal?
          </p>
          <button className="px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Contact Us: 020 3725 3460
          </button>
        </div>
      </div>
    </section>
  );
}
