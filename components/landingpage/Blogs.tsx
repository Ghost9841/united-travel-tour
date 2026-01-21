'use client';
import Image from "next/image";

export default function Blogs() {
  return (
    <section className="max-w-8xl mx-auto px-6 py-10">
      {/* heading */}
      <h1 className="text-4xl font-semibold">Our Blogs</h1>
      <div className="border-t-2 border-orange-500 w-20 mt-2 mb-4" />

      <div className="flex items-center justify-between mb-6">
        <h4 className="text-gray-600">An insight the incredible experience in the world.</h4>
      </div>
        <div className="grid md:grid-cols-2 gap-0 bg-white rounded-lg overflow-hidden">
          {/* Image Section */}
          <div className="relative h-96 md:h-auto">
            <Image 
              src="/blog.jpg"
              fill
              alt="Beautiful Italy coastal view"
              className="object-cover rounded-lg"
            />
          </div>

          {/* Content Section */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">
              Beautiful Italy<br />
              Let's travel
            </h2>
            
            <p className="text-gray-700 leading-relaxed mb-6">
              But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system and expound the actual teachings of the great explorer of the truth, the master- builder of human happiness. No one rejects, dislike, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues.
            </p>

            <button className="text-orange-400 hover:text-orange-500 font-medium flex items-center gap-2 transition-colors">
              Read More
              <svg 
                className="w-5 h-5" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </button>
          </div>
        </div>

        <div></div>
    </section>
  );
}