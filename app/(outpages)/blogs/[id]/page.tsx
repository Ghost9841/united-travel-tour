'use client';
import { Calendar, User, Clock, Share2, Facebook, Twitter, Linkedin, ArrowLeft } from 'lucide-react';
import { useParams } from 'next/navigation';

const blogPosts = {
  '1': {
    id: 1,
    title: "10 Hidden Gems in Lisbon You Must Visit",
    excerpt: "Discover the secret spots and local favorites that most tourists miss in Portugal's charming capital city.",
    image: "https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=1200&h=800&fit=crop",
    author: "Sarah Johnson",
    authorImage: "https://i.pravatar.cc/150?img=1",
    date: "January 15, 2026",
    readTime: "5 min read",
    category: "Travel Tips",
    content: `
      <p>Lisbon, Portugal's sun-drenched capital, is a city that effortlessly blends historic charm with modern vibrancy. While popular attractions like the Belém Tower and São Jorge Castle draw crowds of tourists, the city's true magic lies in its hidden corners—the secret spots where locals gather and authentic Portuguese culture thrives.</p>

      <h2>1. Miradouro de Santa Luzia</h2>
      <p>Tucked away in the Alfama district, this scenic viewpoint offers breathtaking panoramic views of the Tagus River and terracotta rooftops below. The beautifully tiled walls and charming pergola make it a perfect spot for peaceful contemplation away from tourist crowds.</p>

      <h2>2. LX Factory</h2>
      <p>This creative hub, nestled under the 25 de Abril Bridge, is a former industrial complex transformed into a vibrant cultural space. Explore independent boutiques, street art, cozy cafes, and innovative restaurants that showcase Lisbon's contemporary creative scene.</p>

      <h2>3. Jardim da Estrela</h2>
      <p>While many tourists flock to Parque Eduardo VII, locals prefer this peaceful garden sanctuary. With its duck pond, elaborate bandstand, and shaded pathways, it's the perfect place to relax with a book or enjoy a picnic on a sunny afternoon.</p>

      <h2>4. Feira da Ladra</h2>
      <p>Every Tuesday and Saturday, this flea market comes alive with vendors selling everything from vintage records to antique tiles. It's a treasure hunter's paradise and offers an authentic glimpse into local life in Lisbon.</p>

      <h2>5. Time Out Market Lisboa</h2>
      <p>While increasingly popular, this food hall in the Mercado da Ribeira showcases the best of Portuguese cuisine under one roof. Sample dishes from Michelin-starred chefs alongside traditional favorites in a lively, market-style atmosphere.</p>

      <h2>6. Palácio dos Marqueses de Fronteira</h2>
      <p>This 17th-century palace remains relatively undiscovered by tourists. Its stunning azulejo tiles and serene gardens provide a peaceful escape and a fascinating glimpse into Portuguese aristocratic life.</p>

      <h2>7. Alfama's Hidden Taverns</h2>
      <p>Venture into Alfama's narrow alleyways to discover intimate taverns where locals gather for wine and conversation. These authentic spots offer the best Fado music experiences, far from the touristy dinner shows.</p>

      <h2>8. Convento do Carmo Ruins</h2>
      <p>The skeletal remains of this Gothic church, destroyed in the 1755 earthquake, create a hauntingly beautiful open-air museum. The roofless nave and arches frame the sky in a way that's both melancholic and magnificent.</p>

      <h2>9. National Tile Museum</h2>
      <p>Housed in a former monastery, this museum celebrates Portugal's rich azulejo tradition. The stunning tile panels and peaceful cloisters offer a cultural experience that's both educational and visually spectacular.</p>

      <h2>10. Mercado de Campo de Ourique</h2>
      <p>This neighborhood market blends traditional vendors with modern food stalls. It's where Lisboetas shop for fresh produce and enjoy casual meals, offering an authentic local experience away from the tourist trail.</p>

      <h3>Final Thoughts</h3>
      <p>Lisbon's hidden gems reveal a city that's so much more than its famous landmarks. By venturing off the beaten path, you'll discover the authentic soul of this captivating capital and create memories that go beyond typical tourist experiences. Take your time, get lost in the narrow streets, and let Lisbon surprise you with its secret treasures.</p>
    `
  },
  '2': {
    id: 2,
    title: "The Ultimate Guide to Greek Island Hopping",
    excerpt: "Everything you need to know about planning the perfect island-hopping adventure in the Greek islands.",
    image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=1200&h=800&fit=crop",
    author: "Michael Chen",
    authorImage: "https://i.pravatar.cc/150?img=2",
    date: "January 12, 2026",
    readTime: "8 min read",
    category: "Destination Guides",
    content: `
      <p>Greek island hopping is a dream for many travelers—turquoise waters, whitewashed villages, ancient ruins, and delicious Mediterranean cuisine. With over 200 inhabited islands scattered across the Aegean and Ionian Seas, planning your perfect itinerary can feel overwhelming. This comprehensive guide will help you navigate the Greek islands like a seasoned traveler.</p>

      <h2>Choosing Your Islands</h2>
      <p>The key to successful island hopping is selecting islands that complement each other and are well-connected by ferry routes. Popular combinations include Santorini-Mykonos-Paros, or Crete-Santorini-Naxos for a more relaxed pace.</p>

      <h2>Best Time to Visit</h2>
      <p>May to June and September to October offer the perfect balance of good weather, fewer crowds, and lower prices. July and August are peak season with higher prices and packed beaches, though the party atmosphere is unbeatable if that's your scene.</p>

      <h2>Ferry vs. Flight</h2>
      <p>Most island hopping is done by ferry. Book tickets in advance during summer months, but remain flexible as weather can affect schedules. Domestic flights are faster but more expensive and limit you to islands with airports.</p>

      <h2>Sample 10-Day Itinerary</h2>
      <p>Day 1-3: Athens - Explore the Acropolis and Plaka neighborhood<br>
      Day 4-5: Santorini - Sunset in Oia, wine tasting, volcanic beaches<br>
      Day 6-7: Naxos - Traditional villages, pristine beaches, local cuisine<br>
      Day 8-9: Paros - Charming fishing villages, water sports<br>
      Day 10: Return to Athens</p>

      <h2>Packing Essentials</h2>
      <p>Pack light! You'll be moving between islands frequently. Bring comfortable walking shoes, sun protection, swimwear, and a light jacket for evening breezes. Most islands are casual, so leave fancy outfits at home.</p>

      <h2>Budget Tips</h2>
      <p>Stay in family-run guesthouses instead of hotels, eat at local tavernas away from waterfront tourist traps, and travel with overnight ferries to save on accommodation. June and September offer better deals than peak July-August.</p>

      <h3>Conclusion</h3>
      <p>Greek island hopping combines adventure, relaxation, and cultural discovery in equal measure. With proper planning and a flexible attitude, you'll create memories that last a lifetime. Embrace the slower pace, savor the local food, and let the magic of the Greek islands captivate you.</p>
    `
  },
  '3': {
    id: 3,
    title: "Best Street Food Markets in Rome",
    excerpt: "A foodie's guide to experiencing authentic Roman cuisine at the city's best street food markets.",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=1200&h=800&fit=crop",
    author: "Elena Romano",
    authorImage: "https://i.pravatar.cc/150?img=3",
    date: "January 10, 2026",
    readTime: "6 min read",
    category: "Food & Culture",
    content: `
      <p>Rome's culinary scene extends far beyond traditional trattorias and fine dining restaurants. The city's street food markets offer an authentic taste of Roman life, where locals gather to enjoy traditional dishes, fresh produce, and the vibrant atmosphere that defines the Eternal City.</p>

      <h2>Testaccio Market</h2>
      <p>This covered market is a favorite among Romans. Here you'll find everything from supplì (fried rice balls) to fresh pasta, local cheeses, and seasonal vegetables. Don't miss Mordi e Vai for their iconic sandwiches filled with traditional Roman offal dishes.</p>

      <h2>Campo de' Fiori</h2>
      <p>By day, this historic square hosts a colorful produce market. While touristy, it remains a excellent spot for fresh fruit, vegetables, and artisanal products. Visit early morning for the best selection and most authentic atmosphere.</p>

      <h2>Mercato Centrale Roma</h2>
      <p>Located near Termini Station, this modern food hall showcases the best of Italian regional cuisine. While not a traditional street market, it offers high-quality street food in a contemporary setting with numerous vendors under one roof.</p>

      <h2>Must-Try Street Foods</h2>
      <p>Supplì - Fried rice balls with tomato sauce and mozzarella<br>
      Pizza al Taglio - Rectangular pizza sold by weight<br>
      Trapizzino - Triangle-shaped pizza pocket with various fillings<br>
      Porchetta - Slow-roasted pork sandwich<br>
      Maritozzo - Sweet bun filled with whipped cream</p>

      <h2>Insider Tips</h2>
      <p>Visit markets in the morning when vendors are setting up and products are freshest. Bring cash as many vendors don't accept cards. Don't be shy—vendors love to chat about their products and offer samples.</p>

      <h3>Final Thoughts</h3>
      <p>Rome's street food markets provide a window into the city's authentic culinary culture. Away from tourist restaurants, you'll discover the flavors that Romans have enjoyed for generations. Come hungry, bring curiosity, and prepare to fall in love with Roman street food.</p>
    `
  }
};

const relatedPosts = [
  {
    id: 4,
    title: "Traveling Europe on a Budget",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&h=300&fit=crop",
    category: "Budget Travel"
  },
  {
    id: 5,
    title: "When to Visit European Destinations",
    image: "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=400&h=300&fit=crop",
    category: "Travel Planning"
  },
  {
    id: 6,
    title: "Photography Guide: Barcelona",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?w=400&h=300&fit=crop",
    category: "Photography"
  }
];

export default function BlogsDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  
  const post = blogPosts[id as keyof typeof blogPosts];

  if (!post) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Post Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <a href="/blogs" className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
            Back to All Blogs
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back Button */}
      <div className="max-w-4xl mx-auto px-6 pt-24 pb-4">
        <a href="/blogs" className="inline-flex items-center gap-2 text-orange-500 hover:text-orange-600 font-medium">
          <ArrowLeft className="w-5 h-5" />
          Back to Blog
        </a>
      </div>

      {/* Article Header */}
      <article className="max-w-4xl mx-auto px-6 pb-16">
        {/* Category Badge */}
        <div className="mb-4">
          <span className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
            {post.category}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
          {post.title}
        </h1>

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8 pb-8 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <img src={post.authorImage} alt={post.author} className="w-12 h-12 rounded-full" />
            <div>
              <p className="font-semibold text-gray-900">{post.author}</p>
              <div className="flex items-center gap-3 text-sm">
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{post.date}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Share Buttons */}
          <div className="ml-auto flex items-center gap-3">
            <span className="text-sm font-medium">Share:</span>
            <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-colors">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-sky-500 hover:text-white flex items-center justify-center transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="w-10 h-10 rounded-full bg-gray-100 hover:bg-blue-700 hover:text-white flex items-center justify-center transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Featured Image */}
        <div className="mb-12">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-96 object-cover rounded-2xl"
          />
        </div>

        {/* Article Content */}
        <div 
          className="prose prose-lg max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
          style={{
            lineHeight: '1.8',
          }}
        />

        {/* Author Bio */}
        <div className="mt-16 p-8 bg-white rounded-2xl shadow-md">
          <div className="flex items-start gap-6">
            <img src={post.authorImage} alt={post.author} className="w-20 h-20 rounded-full flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">About {post.author}</h3>
              <p className="text-gray-600 mb-4">
                Travel writer and photographer with a passion for discovering hidden gems and authentic experiences. Specializes in European destinations and sustainable travel.
              </p>
              <div className="flex gap-3">
                <a href="#" className="text-orange-500 hover:text-orange-600 font-medium">View all posts →</a>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((related) => (
              <a
                key={related.id}
                href={`/blogs/${related.id}`}
                className="group bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={related.image}
                    alt={related.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {related.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
                    {related.title}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}