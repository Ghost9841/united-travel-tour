import { Calendar, User, Clock, ArrowRight } from 'lucide-react';

const blogPosts = [
  {
    id: 1,
    title: "10 Hidden Gems in Lisbon You Must Visit",
    excerpt: "Discover the secret spots and local favorites that most tourists miss in Portugal's charming capital city.",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800&h=600&fit=crop",
    author: "Sarah Johnson",
    date: "January 15, 2026",
    readTime: "5 min read",
    category: "Travel Tips"
  },
  {
    id: 2,
    title: "The Ultimate Guide to Greek Island Hopping",
    excerpt: "Everything you need to know about planning the perfect island-hopping adventure in the Greek islands.",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800&h=600&fit=crop",
    author: "Michael Chen",
    date: "January 12, 2026",
    readTime: "8 min read",
    category: "Destination Guides"
  },
  {
    id: 3,
    title: "Best Street Food Markets in Rome",
    excerpt: "A foodie's guide to experiencing authentic Roman cuisine at the city's best street food markets.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=800&h=600&fit=crop",
    author: "Elena Romano",
    date: "January 10, 2026",
    readTime: "6 min read",
    category: "Food & Culture"
  },
  {
    id: 4,
    title: "Traveling Europe on a Budget: Complete Guide",
    excerpt: "Practical tips and strategies for exploring Europe without breaking the bank.",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800&h=600&fit=crop",
    author: "David Martinez",
    date: "January 8, 2026",
    readTime: "10 min read",
    category: "Budget Travel"
  },
  {
    id: 5,
    title: "Seasonal Travel: When to Visit European Destinations",
    excerpt: "Discover the best times to visit popular European cities for optimal weather and fewer crowds.",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800&h=600&fit=crop",
    author: "Sophie Laurent",
    date: "January 5, 2026",
    readTime: "7 min read",
    category: "Travel Planning"
  },
  {
    id: 6,
    title: "Photography Guide: Capturing Barcelona's Architecture",
    excerpt: "Tips for photographing Gaudí's masterpieces and Barcelona's stunning architectural wonders.",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800&h=600&fit=crop",
    author: "Carlos Ruiz",
    date: "January 3, 2026",
    readTime: "6 min read",
    category: "Photography"
  },
  {
    id: 7,
    title: "Family-Friendly Activities in Amsterdam",
    excerpt: "The best attractions and activities for families traveling to Amsterdam with children.",
    image: "https://images.unsplash.com/photo-1534351590666-13e3e96b5017?w=800&h=600&fit=crop",
    author: "Anna van der Berg",
    date: "December 30, 2025",
    readTime: "5 min read",
    category: "Family Travel"
  },
  {
    id: 8,
    title: "Cultural Etiquette: Dos and Don'ts in European Cities",
    excerpt: "Navigate European cultures with confidence by understanding local customs and etiquette.",
    image: "https://images.unsplash.com/photo-1555993539-1732b0258235?w=800&h=600&fit=crop",
    author: "Thomas Mueller",
    date: "December 28, 2025",
    readTime: "7 min read",
    category: "Travel Tips"
  },
  {
    id: 9,
    title: "Sustainable Travel: How to Be an Eco-Conscious Tourist",
    excerpt: "Practical ways to reduce your environmental impact while traveling through Europe.",
    image: "https://images.unsplash.com/photo-1541849546-216549ae216d?w=800&h=600&fit=crop",
    author: "Emma Green",
    date: "December 25, 2025",
    readTime: "8 min read",
    category: "Sustainable Travel"
  }
];

const categories = [
  "All Posts",
  "Travel Tips",
  "Destination Guides",
  "Food & Culture",
  "Budget Travel",
  "Travel Planning",
  "Photography",
  "Family Travel",
  "Sustainable Travel"
];

export default function BlogsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20">
        <div className="max-w-8xl mx-auto px-6 mt-16">
          <h1 className="text-5xl font-bold mb-4">Travel Stories & Guides</h1>
          <p className="text-xl text-orange-100">Discover inspiration, tips, and insider knowledge from our travel experts</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-8xl mx-auto px-6 py-12">
        {/* Categories Filter */}
        <div className="mb-12">
          <div className="flex flex-wrap gap-3">
            {categories.map((category, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  idx === 0
                    ? 'bg-orange-500 text-white'
                    : 'bg-white text-gray-700 hover:bg-orange-50 border border-gray-200'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Featured Post */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Featured Post</h2>
          <a
            href={`/blogs/${blogPosts[0].id}`}
            className="group block bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <div className="relative h-64 lg:h-auto overflow-hidden">
                <img
                  src={blogPosts[0].image}
                  alt={blogPosts[0].title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                    {blogPosts[0].category}
                  </span>
                </div>
              </div>

              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>{blogPosts[0].author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{blogPosts[0].date}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                </div>

                <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-orange-500 transition-colors">
                  {blogPosts[0].title}
                </h2>

                <p className="text-gray-600 text-lg mb-6">
                  {blogPosts[0].excerpt}
                </p>

                <div className="flex items-center text-orange-500 font-semibold group-hover:gap-3 transition-all">
                  Read More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </div>
              </div>
            </div>
          </a>
        </div>

        {/* Blog Grid */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Latest Articles</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.slice(1).map((post) => (
            <a
              key={post.id}
              href={`/blogs/${post.id}`}
              className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {post.category}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Meta Info */}
                <div className="flex items-center gap-3 text-xs text-gray-500 mb-3">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3" />
                    <span>{post.author}</span>
                  </div>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    <span>{post.date}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Read Time */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>

                  <div className="flex items-center text-orange-500 font-semibold text-sm group-hover:gap-2 transition-all">
                    Read More
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Load More Articles
          </button>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-16 mt-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-4">Stay Updated with Travel Tips</h2>
          <p className="text-xl text-orange-100 mb-8">
            Subscribe to our newsletter and get the latest travel guides, tips, and exclusive deals delivered to your inbox
          </p>
          <div className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 border-2 border-black focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button className="bg-black text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-lg font-bold transition-colors ">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}