import { Star } from 'lucide-react';

const tripPlanners = [
  {
    place: "Paris City Tour",
    pricePerDay: 95,
    rating: 5,
    stars: [1, 1, 1, 1, 1],
    duration: "7 Days tour",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=800&q=80"
  },
  {
    place: "Rome Historical Walk",
    pricePerDay: 85,
    rating: 4.5,
    stars: [1, 1, 1, 1, 0.5],
    duration: "5 Days tour",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=800&q=80"
  },
  {
    place: "Athens Ancient Wonders",
    pricePerDay: 80,
    rating: 4.8,
    stars: [1, 1, 1, 1, 0.5],
    duration: "6 Days tour",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?auto=format&fit=crop&w=800&q=80"
  }
];

export default function TripPlanners() {
  return (
    <section className="max-w-8xl mx-auto px-6 py-10">
      <div className="flex gap-12 items-start">
        {/* Left Column - Text Content */}
        <div className="flex-shrink-0 w-72">
          <h1 className="text-4xl font-semibold mb-3">Trip Planners</h1>
          <div className="border-t-2 border-orange-500 w-32 mb-6" />
          
          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            20 years from now you will be more disappointed by the things that you didn't do. Stop regretting and start travelling, start throwing off the bowlines.
          </p>
          
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md transition-colors text-sm">
            View all trip plans
          </button>
        </div>

        {/* Right Column - Cards */}
        <div className="flex gap-5 flex-1">
          {tripPlanners.map((trip, index) => (
            <div
              key={index}
              className="group relative flex-1 bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer h-96"
            >
              {/* Image Container */}
              <div className="absolute inset-0 transition-transform duration-500 group-hover:-translate-y-24">
                <img
                  src={trip.image}
                  alt={trip.place}
                  className="w-full h-full object-cover"
                />
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
              </div>

              {/* Details Container - Hidden by default, slides up on hover */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 bg-gradient-to-t from-black via-black/95 to-transparent pt-16">
                <div className="mb-1">
                  <span className="text-xs font-semibold text-orange-400 uppercase tracking-wider">
                    Guided Tour
                  </span>
                  <div className="text-sm text-gray-300 text-right">
                    €{trip.pricePerDay}/Day
                  </div>
                </div>
                
                <h3 className="text-lg font-bold mb-2">{trip.place}</h3>
                
                {/* Stars */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {trip.stars.map((star, i) => (
                      <Star
                        key={i}
                        className={`w-3 h-3 ${
                          star === 1
                            ? 'fill-yellow-400 text-yellow-400'
                            : star === 0.5
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-400'
                        }`}
                        style={
                          star === 0.5
                            ? {
                                clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)'
                              }
                            : {}
                        }
                      />
                    ))}
                  </div>
                  <span className="text-xs">{trip.duration}</span>
                </div>
              </div>

              {/* Title visible when not hovering */}
              <div className="absolute bottom-4 left-4 right-4 text-white group-hover:opacity-0 transition-opacity duration-300">
                <h3 className="text-lg font-bold drop-shadow-lg">{trip.place}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}