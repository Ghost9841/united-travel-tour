import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface ServiceCardProps {
  service: {
    id: number;
    title: string;
    description: string;
    icon: React.ComponentType<any>;
    bgColor: string;
    cardBg: string;
    iconColor: string;
    accentColor: string;
    borderColor: string;
    image: string;
  };
  index: number;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, index }) => {
  const Icon = service.icon;
  
  return (
    <div key={service.id} className="relative group" style={{ animationDelay: `${index * 0.1}s` }}>
      <div className={`absolute -top-2 left-1/2 transform -translate-x-1/2 w-4 h-4 ${service.accentColor} rounded-full shadow-lg border-2 border-white z-20`}>
        <div className="w-2 h-2 bg-white rounded-full absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-ping"></div>
      </div>

      <div className={`${service.cardBg} h-full rounded-3xl overflow-hidden relative transition-all duration-500 hover:shadow-2xl hover:-translate-y-3 hover:scale-105 border ${service.borderColor}`}>
        <div className="relative h-48 overflow-hidden">
          <img 
            src={service.image} 
            alt={service.title}
            className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
          
          <div className={`absolute top-4 right-4 w-10 h-10 ${service.accentColor} rounded-full flex items-center justify-center text-sm font-bold text-white shadow-xl`}>
            {service.id}
          </div>

          <div className="absolute bottom-4 left-4">
            <div className={`w-14 h-14 ${service.bgColor} rounded-2xl flex items-center justify-center shadow-xl border-2 border-white`}>
              <Icon className={`w-7 h-7 ${service.iconColor}`} />
            </div>
          </div>
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {service.title}
          </h3>
          <p className="text-gray-600 text-sm leading-relaxed mb-4">
            {service.description}
          </p>

          <button className={`inline-flex items-center gap-2 ${service.accentColor} text-white text-sm font-medium px-5 py-2.5 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group/btn`}>
            Learn More
            <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </button>

          <div className="absolute top-20 right-6 w-2 h-2 bg-white/40 rounded-full animate-ping"></div>
          <div className="absolute bottom-8 right-8 w-3 h-3 bg-white/30 rounded-full"></div>
          
          <div className="absolute top-6 left-6">
            <Sparkles className="w-4 h-4 text-white/50 animate-pulse" />
          </div>
        </div>

        <div className={`absolute inset-0 ${service.accentColor} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
      </div>
    </div>
  );
};

export default ServiceCard;