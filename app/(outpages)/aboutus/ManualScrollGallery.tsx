import { Star } from 'lucide-react'
import React from 'react'

const ManualScrollGallery = () => {
     const galleryImages = [
    "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1530789253388-582c481c54b0?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
    "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?w=400&h=400&fit=crop",
  ];
  return (
    <div className="relative max-w-7xl mx-auto px-6">
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {galleryImages.map((img, index) => (
      <div
        key={index}
        className="relative w-full h-64 rounded-2xl overflow-hidden group cursor-pointer shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border-4 border-gray-100"
      >
        <img
          src={img}
          alt={`Gallery ${index + 1}`}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        
        {/* Gradient Overlay - Always visible on mobile, hover on desktop */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
          <div className="text-white">
            <div className="flex items-center gap-1 mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <span className="font-bold text-lg">Featured Destination</span>
            <p className="text-sm text-gray-200 mt-1 opacity-90">Explore amazing deals</p>
          </div>
        </div>
        
        {/* Floating Badge */}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-gray-900 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 shadow-lg">
          Hot Deal
        </div>

        {/* Index Number */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold">
          {index + 1}
        </div>
      </div>
    ))}
  </div>
  
  {/* Load More Button */}
  <div className="flex justify-center mt-8">
    <button className="px-8 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full font-semibold hover:from-orange-600 hover:to-red-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1">
      View All Destinations
    </button>
  </div>
</div>
  )
}

export default ManualScrollGallery