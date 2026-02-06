import React from 'react';
import { Star, Zap } from 'lucide-react';

const HeroSection = () => {
  return (
    <div className="relative h-[70vh] bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 overflow-hidden ">
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

      <div className="relative z-10 h-full flex items-center justify-center">
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

      <div className="absolute bottom-0 left-0 right-0">
        <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="white"></path>
          <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="white"></path>
          <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;