'use client';

export default function TripPlanners() {
  
  return (
    <section className="max-w-8xl mx-auto px-6 py-10">
      {/* heading */}
      <h1 className="text-4xl font-semibold">Trip Planners</h1>
      <div className="border-t-2 border-orange-500 w-30 mt-2 mb-4" />

     <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-6">
    <p className="text-gray-600 max-w-md">
      20 years from now you will be more disappointed by the things that you didn't do. Stop regretting and start travelling, start throwing off the bowlines.
    </p>
    
    <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-md transition-colors whitespace-nowrap">
      View all trip plans
    </button>
  </div>
    </section>
  );
}