import React from 'react';
import { CheckCircle } from 'lucide-react';

interface ValueCardProps {
  item: {
    icon: React.ComponentType<any>;
    title: string;
    description: string;
    color: string;
  };
}

const ValueCard: React.FC<ValueCardProps> = ({ item }) => {
  const Icon = item.icon;
  
  return (
    <div className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 border-2 border-gray-100">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <div className="absolute top-0 left-0 w-20 h-20 bg-orange-400/10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-20 h-20 bg-red-400/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="relative z-10">
        <div className={`w-16 h-16 bg-${item.color}-100 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:animate-bounce transition-all duration-300`}>
          <Icon className={`w-8 h-8 text-${item.color}-600`} />
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
        <p className="text-gray-600 leading-relaxed">{item.description}</p>
        
        {/* Check Badge */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <CheckCircle className="w-5 h-5 text-green-500" />
        </div>
      </div>
      
      {/* Hover Effect Line */}
      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500"></div>
    </div>
  );
};

export default ValueCard;