'use client';
import{ ApiResponse } from '@/app/api/travels/types';
import { Travel } from '@prisma/client';
import { MapPin, Star, Clock, Users } from 'lucide-react';
import { useEffect,useState } from 'react';


export default function TravelsPage() {
  const [travelPackages,setTravelPackages] = useState<Travel[]>([]);
  const [loading, setLoading] = useState(true);
  

   useEffect(()=> {
    const fetchTravels = async () => {
      try {
      const res = await fetch("/api/travels");
      const data: ApiResponse = await res.json();
      setLoading(true)
      console.log("GET response:", data); // Debug log
      
      if (data.success && data.data?.travels) {
        setTravelPackages(data.data?.travels);
      }
    } catch (error){
      console.error("Failed to fetch data",error);
    } finally {
      setLoading(false);
    }
  }
  fetchTravels();
  },[]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-8xl mx-auto px-6">
          <h1 className="text-5xl font-bold mb-4 mt-10">Discover Amazing Travel Packages</h1>
          <p className="text-xl text-orange-100">Handpicked destinations with expertly curated itineraries for unforgettable experiences</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-6 py-12">
        {/* Stats Bar */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-orange-500 mb-2">50+</p>
            <p className="text-gray-600">Destinations</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-orange-500 mb-2">10k+</p>
            <p className="text-gray-600">Happy Travelers</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-orange-500 mb-2">4.8</p>
            <p className="text-gray-600">Average Rating</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-md text-center">
            <p className="text-4xl font-bold text-orange-500 mb-2">100%</p>
            <p className="text-gray-600">Satisfaction</p>
          </div>
        </div>

        {/* Packages Grid */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">All Travel Packages</h2>
          <p className="text-gray-600 mb-8">Browse through our carefully selected travel experiences</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {travelPackages.map((pkg) => (
            <a
              key={pkg.id}
              href={`/travels/${pkg.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {pkg.category}
                  </span>
                </div>

                {/* Discount Badge */}
                {pkg.originalPrice && (
                  <div className="absolute top-4 right-4">
                    <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                      Save £{pkg.originalPrice - pkg.price}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Location & Rating */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-1 text-gray-600">
                    <MapPin className="w-4 h-4 text-orange-500" />
                    <span className="text-sm font-medium">{pkg.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-900">{pkg.rating}</span>
                    <span className="text-sm text-gray-500">({pkg.reviews})</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
                  {pkg.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {pkg.description}
                </p>

                {/* Details */}
                <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{pkg.duration}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    <span>{pkg.groupSize}</span>
                  </div>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  {/* <div>
                    <p className="text-sm text-gray-500">From</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-bold text-orange-500">£{pkg.price}</span>
                      {pkg.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">£{pkg.originalPrice}</span>
                      )}
                    </div>
                  </div> */}
                  
                   <a href="/booknow">
                    <button className="px-6 py-2.5 bg-orange-500 hover:bg-orange-600 text-white rounded-lg font-medium transition-colors">
                      BOOK NOW
                    </button>
                  </a>
                  <button className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-medium transition-colors">
                    View Details
                  </button>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 px-8 py-3 rounded-lg font-semibold transition-colors">
            Load More Packages
          </button>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Let us create a custom travel package tailored specifically to your preferences
          </p>
          <button className="bg-white text-orange-500 hover:bg-orange-50 px-8 py-4 rounded-lg font-bold text-lg transition-colors">
            Request Custom Package
          </button>
        </div>
      </div>
    </div>
  );
}