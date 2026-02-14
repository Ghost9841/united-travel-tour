'use client';
import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    id: 1,
    question: "How do I book a travel package with United Travel and Tours?",
    answer: "Booking with us is simple! Browse our available packages on the Explore or Travels page, select your preferred destination, and click 'Book Now'. You'll be guided through our easy booking form where you can choose flights, hotels, and add-on activities. Our team is also available by phone or email to assist you through the process."
  },
  {
    id: 2,
    question: "What is included in your holiday packages?",
    answer: "Our holiday packages typically include return flights, hotel accommodation, daily breakfast, airport transfers, and guided tours. Some packages also include entrance fees to major attractions and travel insurance. Each package clearly outlines what is and isn't included, so you always know exactly what you're getting."
  },
  {
    id: 3,
    question: "Can I customise my travel package?",
    answer: "Absolutely! We understand that every traveller is different. Whether you're travelling solo, as a couple, or as a family group, we can tailor your itinerary to match your preferences and budget. Contact our team directly and we'll work closely with you to create your perfect trip."
  },
  {
    id: 4,
    question: "What is your cancellation and refund policy?",
    answer: "We offer free cancellation up to 24 hours before your departure date for a full refund. Cancellations made within 24 hours may be subject to a cancellation fee depending on the package and airline policy. We strongly recommend purchasing travel insurance to protect your booking against unforeseen circumstances."
  },
  {
    id: 5,
    question: "Do you provide visa assistance and travel documentation support?",
    answer: "Yes! Our team stays up to date with the latest visa requirements and entry regulations for all destinations we offer. We provide step-by-step guidance on the visa application process, required documents, and processing times. While we cannot apply on your behalf, we make sure you are fully prepared well in advance."
  },
  {
    id: 6,
    question: "Do you offer travel insurance?",
    answer: "Yes, we offer comprehensive travel insurance options as part of your booking. Travel insurance covers medical emergencies, trip cancellations, lost luggage, and other unexpected events. We strongly recommend all travellers take out insurance, especially for long-haul and international travel."
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<number | null>(1);

  const toggle = (id: number) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-500 px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <HelpCircle className="w-4 h-4" />
            Got Questions?
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <div className="border-t-4 border-orange-500 w-20 mx-auto mb-4" />
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Everything you need to know about booking with United Travel and Tours. Can't find your answer? Our team is always happy to help.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq) => (
            <div
              key={faq.id}
              className={`bg-white rounded-2xl shadow-sm border-2 transition-all duration-300 overflow-hidden ${
                openId === faq.id ? 'border-orange-500 shadow-md' : 'border-transparent hover:border-orange-200'
              }`}
            >
              {/* Question */}
              <button
                onClick={() => toggle(faq.id)}
                className="w-full flex items-center justify-between p-6 text-left"
              >
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-sm transition-colors duration-300 ${
                    openId === faq.id ? 'bg-orange-500 text-white' : 'bg-orange-100 text-orange-500'
                  }`}>
                    {faq.id}
                  </div>
                  <span className={`text-lg font-semibold transition-colors duration-300 ${
                    openId === faq.id ? 'text-orange-500' : 'text-gray-900'
                  }`}>
                    {faq.question}
                  </span>
                </div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                  openId === faq.id ? 'bg-orange-500 rotate-180' : 'bg-gray-100'
                }`}>
                  <ChevronDown className={`w-5 h-5 transition-colors duration-300 ${
                    openId === faq.id ? 'text-white' : 'text-gray-600'
                  }`} />
                </div>
              </button>

              {/* Answer */}
              <div className={`transition-all duration-300 ease-in-out ${
                openId === faq.id ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-6 pb-6 pl-18">
                  <div className="ml-12 border-l-2 border-orange-200 pl-6">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
}