import { MapPin, Phone, Mail, Clock, Shield, Users, Plane, Hotel, FileText, Award, Heart, Globe } from 'lucide-react';

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 text-white py-20 mt-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-5xl font-bold mb-4">About United Travel and Tours Limited</h1>
          <p className="text-xl text-orange-100">Making travel planning simple, clear, and affordable since day one</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Introduction */}
        <div className="bg-white rounded-2xl p-8 shadow-md mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Who We Are</h2>
          <div className="space-y-4 text-gray-700 leading-relaxed text-lg">
            <p>
              United Travel and Tours Limited is a UK-based travel agency located at 2 High Street, Bracknell RG12 1AA, dedicated to making travel planning simple, clear, and affordable. We work closely with each customer to understand their travel goals and turn them into well-planned journeys, whether that means a short solo break, a relaxed family holiday, or a carefully organised group tour.
            </p>
            <p>
              Our focus is always on value, transparency, and reliability, so customers know exactly what they are booking. At United Travel and Tours Limited, we believe good travel planning builds confidence. Our goal is to earn long-term trust by offering honest advice, practical solutions, and friendly support, so our customers can focus on enjoying their journey.
            </p>
          </div>
        </div>

        {/* Our Services */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Plane className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Flight Arrangements</h3>
              <p className="text-gray-600">
                Working with trusted airline partners to offer competitive fares and dependable flight options without compromising on quality or comfort.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Hotel className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Hotel Bookings</h3>
              <p className="text-gray-600">
                Carefully selected accommodation options that balance quality, comfort, and value for every type of traveler.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Globe className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Complete Holiday Packages</h3>
              <p className="text-gray-600">
                Comprehensive travel packages that take care of all the details, from flights to accommodation and beyond.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Visa Guidance</h3>
              <p className="text-gray-600">
                Expert support with visa requirements and travel documentation to help you prepare properly and avoid stress.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Travel Insurance</h3>
              <p className="text-gray-600">
                Comprehensive travel insurance options to protect your journey and give you peace of mind.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Group Tours</h3>
              <p className="text-gray-600">
                Carefully organized group tours with attention to detail and focus on creating memorable experiences.
              </p>
            </div>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-white rounded-2xl p-8 shadow-md mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Why Choose Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Award className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Value & Transparency</h3>
                <p className="text-gray-600">
                  We prioritize clear pricing and honest communication, so you always know exactly what you're booking with no hidden surprises.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Shield className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Reliability</h3>
                <p className="text-gray-600">
                  Working with trusted partners ensures dependable service and quality experiences throughout your journey.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Heart className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Personalized Service</h3>
                <p className="text-gray-600">
                  We take time to understand your travel goals and create customized solutions that match your needs and preferences.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-orange-500" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">Expert Support</h3>
                <p className="text-gray-600">
                  Our team stays up to date with travel requirements and airline policies, providing guidance when you need it most.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Special Offers Highlight */}
        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-2xl p-8 shadow-md mb-12 text-white">
          <div className="text-center">
            <h2 className="text-3xl font-bold mb-4">Special Flight & Hotel Deals</h2>
            <p className="text-lg text-orange-100 mb-6">
              United Travel and Tours Limited is well known for its special flight-and-hotel deals, including popular routes such as London to Kathmandu. These offers are designed to give travellers more choice and better value, while maintaining a high standard of service throughout the booking process.
            </p>
            <a href="/explore">
              <button className="bg-white text-orange-500 hover:bg-orange-50 px-8 py-3 rounded-lg font-bold transition-colors">
                Explore Our Deals
              </button>
            </a>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-2xl p-8 shadow-md">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Get In Touch</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Our Location</h3>
              <p className="text-gray-600">
                2 High Street<br />
                Bracknell RG12 1AA<br />
                United Kingdom
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Phone</h3>
              <p className="text-gray-600">
                +44 1234 567 890<br />
                <span className="text-sm">Mon-Fri: 9AM - 6PM</span>
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Email</h3>
              <p className="text-gray-600">
                info@unitedtravel.co.uk<br />
                <span className="text-sm">We reply within 24 hours</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Plan Your Journey?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Let us help you create an unforgettable travel experience with honest advice, practical solutions, and friendly support.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/explore">
              <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg font-bold transition-colors">
                Browse Destinations
              </button>
            </a>
            <a href="/contact">
              <button className="bg-white hover:bg-gray-50 text-gray-900 px-8 py-3 rounded-lg font-bold border-2 border-gray-300 transition-colors">
                Contact Us
              </button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}