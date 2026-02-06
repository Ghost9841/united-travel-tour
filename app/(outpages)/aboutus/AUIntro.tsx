import React from 'react';
import { Heart } from 'lucide-react';

const Introduction = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 -mt-10 relative z-20 mb-20">
      <div className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
        <div className="relative bg-white rounded-3xl p-8 md:p-12 shadow-2xl border-2 border-orange-100 transform hover:scale-[1.02] transition-all duration-500">
          <div className="flex items-start gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg animate-bounce">
              <Heart className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Who We Are</h2>
              <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full"></div>
            </div>
          </div>
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p className="transform transition-all duration-300 hover:scale-[1.02] hover:translate-x-2">
              <span className="text-2xl text-orange-500 font-bold">United Travel and Tours Limited</span> is a UK-based travel agency located at 2 High Street, Bracknell RG12 1AA, dedicated to making travel planning simple, clear, and affordable.
            </p>
            <p className="transform transition-all duration-300 hover:scale-[1.02] hover:translate-x-2">
              Our focus is always on <span className="font-bold text-orange-500">value, transparency, and reliability</span>, so customers know exactly what they are booking.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Introduction;