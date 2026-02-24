import React from 'react';
import { Star, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative h-[70vh] bg-gradient-to-r from-orange-200 via-orange-200 to-red-200 overflow-hidden ">
      <div className="absolute inset-0 mt-14">
        <img 
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop"
          alt="Travel Background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
      </div>

      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-10 left-10 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-yellow-200 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-20 left-1/3 w-96 h-96 bg-pink-200 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: '4s' }}></div>
      </div>

      <div className="absolute top-20 left-10 w-8 h-8 bg-white/20 rounded-full animate-ping"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-yellow-300/30 rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 left-1/4 w-10 h-10 bg-blue-400/20 rounded-full animate-bounce"></div>

      <div className="relative z-10 h-full flex items-center justify-center mt-16">
        <div className="text-center px-6 max-w-4xl">
          <div className="inline-flex items-center bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium mb-4 animate-pulse">
            <Star className="w-4 h-4 mr-2" /> 
            UK-Based Travel Agency
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 animate-slide-up leading-tight">
            About United Travel and Tours Limited
          </h1>
          <p className="text-xl text-orange-100 max-w-3xl mx-auto mb-8 animate-slide-up" style={{animationDelay: '0.1s'}}>
            Making travel planning simple, clear, and affordable since day one
          </p>
          <a 
            href="#explore" 
            className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-bounce-in"
          >
            Explore Our World <Zap className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;