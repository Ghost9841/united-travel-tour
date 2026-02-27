import React from 'react';

const Introduction = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-20 my-8 md:my-12">
      <div className="relative group">
        {/* Animated glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        
        {/* Main card */}
        <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-orange-100 transform hover:scale-[1.02] transition-all duration-500">
          
          {/* Header with heart icon */}
          <div className="flex items-start gap-4 mb-8 flex-wrap">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg animate-bounce">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="white" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className="w-8 h-8"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/>
              </svg>
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Who We Are</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full"></div>
            </div>
          </div>

          {/* Content section with all provided text */}
          <div className="space-y-6 text-gray-700 leading-relaxed text-base md:text-lg">
            
            {/* Paragraph 1: UK-based introduction */}
            <p className="transition-all duration-300 hover:translate-x-2">
              <span className="text-2xl text-orange-500 font-bold">United Travel and Tours Limited</span> is a UK-based travel agency located at{' '}
              <span className="font-semibold">2 High Street, Bracknell RG12 1AA</span>, dedicated to making travel planning simple, clear, and affordable.
            </p>
            
            {/* Paragraph 2: Bracknell-based, opened 2025 */}
            <p className="transition-all duration-300 hover:translate-x-2">
              <span className="font-semibold text-orange-600">United Travel and Tours Limited</span> is a Bracknell-based travel agency,{' '}
              <span className="font-semibold">opened in 2025</span>, focused on giving customers the best service and the best fares.{' '}
              From our office at <span className="underline decoration-orange-200 decoration-2">2 High St, Bracknell RG12 1AA</span>, we help people book flights, hotels,{' '}
              and complete holiday packages with clear advice and friendly support from start to finish.
            </p>
            
            {/* Paragraph 3: What travellers want */}
            <p className="transition-all duration-300 hover:translate-x-2">
              We know most travellers want two things: <span className="font-bold text-orange-500">a fair price and a smooth booking experience.</span>{' '}
              That's why we work hard to find strong flight options and deals, explain everything in a simple way,{' '}
              and handle the details properly, so you can travel with confidence. Whether you're planning a family trip,{' '}
              business travel, or a holiday, we're here to make it easier.
            </p>
            
            {/* Paragraph 4: Focus on value (highlighted) */}
            <p className="transition-all duration-300 hover:translate-x-2 border-l-4 border-orange-400 pl-4 italic bg-orange-50/50 py-1 rounded-r">
              Our focus is always on <span className="font-bold text-orange-500">value, transparency, and reliability</span> — so customers know exactly what they are booking.
            </p>
            
            {/* Contact section */}
            <div className="pt-4 mt-4 flex flex-col sm:flex-row sm:items-center gap-4 border-t-2 border-orange-100/80">
              <div className="flex items-center gap-2">
                <span className="bg-orange-100 p-2 rounded-full">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="20" 
                    height="20" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="#f97316" 
                    strokeWidth="2"
                  >
                    <rect x="5" y="2" width="14" height="20" rx="2" ry="2"/>
                    <line x1="12" y1="18" x2="12" y2="18" stroke="#f97316"/>
                  </svg>
                </span>
                <span className="font-medium">For bookings & enquiries:</span>
              </div>
              <a 
                href="tel:+4402037253460" 
                className="text-xl md:text-2xl font-bold text-gray-800 hover:text-orange-600 transition flex items-center gap-2"
              >
                <span className="bg-gradient-to-r from-orange-500 to-orange-400 bg-clip-text text-transparent">020 3725 3460</span>
                <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">call or WhatsApp</span>
              </a>
            </div>
            
            {/* Address footer */}
            <p className="text-sm text-gray-400 flex items-center gap-1 pt-2">
              <span className="w-1.5 h-1.5 bg-orange-400 rounded-full"></span>{' '}
              United Travel and Tours Limited · 2 High Street, Bracknell RG12 1AA · UK
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative badge */}
      <div className="flex justify-end mt-4 -mr-2 opacity-70">
        <span className="bg-white/80 text-orange-600 text-xs px-4 py-1 rounded-full border border-orange-200 shadow-sm backdrop-blur-sm">
          ✈️ established 2025 · at your service
        </span>
      </div>
    </div>
  );
};

export default Introduction;