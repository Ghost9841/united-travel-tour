import React from 'react';
import { CheckCircle } from 'lucide-react';
import values  from './values';
import ValueCard from './ValueCard';

const ValuesSection = () => {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why <span className="text-orange-500">Choose Us</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-orange-500 to-orange-300 rounded-full mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {values.map((item, index) => (
            <ValueCard key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValuesSection;