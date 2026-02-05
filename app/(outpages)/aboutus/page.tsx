'use client';
import React, { useState, useEffect, useRef } from 'react';
import { 
  MapPin, Phone, Mail, Clock, Shield, Users, Plane, Hotel, 
  FileText, Award, Heart, Globe, ChevronLeft, ChevronRight, 
  Sparkles, Zap, Target, CheckCircle, Star, Menu, X
} from 'lucide-react';

export default function AboutUsPage() {
  const [activeImage, setActiveImage] = useState(0);
  const [menuVisible, setMenuVisible] = useState(false);
 const galleryRef = React.useRef<HTMLDivElement>(null);
  const infiniteMenuRef = useRef<HTMLDivElement>(null);

  const teamImages = [
    'https://images.unsplash.com/photo-1551836026-d5c2c1313051?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w-400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=400&h=400&fit=crop&crop=face',
    'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face',
  ];

  const destinationImages = [
    'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1534008897995-27a23e859048?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=600&h=400&fit=crop',
    'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&h=400&fit=crop',
  ];

  const services = [
    {
      icon: Plane,
      title: "Flight Arrangements",
      description: "Working with trusted airline partners to offer competitive fares and dependable flight options.",
      color: "from-blue-400 to-cyan-400",
      delay: "0"
    },
    {
      icon: Hotel,
      title: "Hotel Bookings",
      description: "Carefully selected accommodation options balancing quality, comfort, and value.",
      color: "from-purple-400 to-pink-400",
      delay: "100"
    },
    {
      icon: Globe,
      title: "Complete Holiday Packages",
      description: "Comprehensive packages from flights to accommodation and beyond.",
      color: "from-green-400 to-emerald-400",
      delay: "200"
    },
    {
      icon: FileText,
      title: "Visa Guidance",
      description: "Expert support with visa requirements and travel documentation.",
      color: "from-orange-400 to-red-400",
      delay: "300"
    },
    {
      icon: Shield,
      title: "Travel Insurance",
      description: "Comprehensive insurance options for peace of mind.",
      color: "from-indigo-400 to-blue-400",
      delay: "400"
    },
    {
      icon: Users,
      title: "Group Tours",
      description: "Organized group tours creating memorable experiences.",
      color: "from-rose-400 to-pink-400",
      delay: "500"
    }
  ];

  const values = [
    {
      icon: Award,
      title: "Value & Transparency",
      description: "Clear pricing and honest communication with no hidden surprises.",
      bounce: "animate-bounce"
    },
    {
      icon: Shield,
      title: "Reliability",
      description: "Trusted partners ensuring dependable service and quality experiences.",
      bounce: "animate-bounce"
    },
    {
      icon: Heart,
      title: "Personalized Service",
      description: "Customized solutions matching your unique needs and preferences.",
      bounce: "animate-bounce"
    },
    {
      icon: Users,
      title: "Expert Support",
      description: "Up-to-date guidance with travel requirements and policies.",
      bounce: "animate-bounce"
    }
  ];

  // Infinite scrolling for gallery

useEffect(() => {
  const gallery = galleryRef.current;
  if (!gallery) return;

  let scrollAmount = 0;
  const scrollSpeed = 1;
  
  const scrollGallery = () => {
    if (gallery) {
      scrollAmount += scrollSpeed;
      if (scrollAmount >= gallery.scrollWidth / 2) {
        scrollAmount = 0;
      }
      gallery.style.transform = `translateX(-${scrollAmount}px)`;
    }
  };

  const interval = setInterval(scrollGallery, 30);
  return () => clearInterval(interval);
}, []);

  // Dome Gallery Rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveImage((prev) => (prev + 1) % teamImages.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      {/* Hero Section with Parallax */}
      <div className="relative h-[70vh] bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1920&h=1080&fit=crop"
            alt="Travel Background"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-8 h-8 bg-white/20 rounded-full animate-ping"></div>
        <div className="absolute top-40 right-20 w-6 h-6 bg-yellow-300/30 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 left-1/4 w-10 h-10 bg-blue-400/20 rounded-full animate-bounce"></div>

        <div className="relative z-10 h-full flex items-center justify-center">
          <div className="text-center px-6 max-w-4xl">
            <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 animate-pulse">
              <Sparkles className="w-4 h-4 mr-2 text-white" />
              <span className="text-white text-sm font-medium">Established 2010</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-slide-up">
              United Travel and Tours Limited
            </h1>
            <p className="text-xl text-orange-100 mb-8 leading-relaxed animate-slide-up" style={{animationDelay: '0.1s'}}>
              Making travel planning simple, clear, and affordable since day one
            </p>
            <a 
              href="#explore" 
              className="inline-flex items-center gap-2 bg-white text-orange-600 hover:bg-orange-50 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl animate-bounce-in"
            >
              Explore Our World <Zap className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Animated Waves */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg className="w-full h-20" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" opacity=".25" fill="white"></path>
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" opacity=".5" fill="white"></path>
            <path d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" fill="white"></path>
          </svg>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative">
        {/* Introduction Card with Bounce Effect */}
        <div className="relative mb-20 group">
          <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 animate-pulse"></div>
          <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center animate-bounce">
                <Target className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-4xl font-bold text-gray-900">Who We Are</h2>
                <div className="w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mt-2"></div>
              </div>
            </div>
            
            <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
              <p className="transform transition-all duration-300 hover:scale-[1.02] hover:translate-x-2">
                <span className="text-3xl text-orange-500 font-bold">United Travel and Tours Limited</span> is a UK-based travel agency located at 2 High Street, Bracknell RG12 1AA, dedicated to making travel planning simple, clear, and affordable.
              </p>
              <p className="transform transition-all duration-300 hover:scale-[1.02] hover:translate-x-2">
                We work closely with each customer to understand their travel goals and turn them into well-planned journeys, whether that means a short solo break, a relaxed family holiday, or a carefully organised group tour.
              </p>
              <p className="transform transition-all duration-300 hover:scale-[1.02] hover:translate-x-2">
                Our focus is always on <span className="font-bold text-orange-500">value, transparency, and reliability</span>, so customers know exactly what they are booking. We believe good travel planning builds confidence.
              </p>
            </div>
          </div>
        </div>

        {/* Circular Dome Gallery - Team Members */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Meet Our <span className="text-orange-500">Expert Team</span>
          </h2>
          
          <div className="relative h-96 flex items-center justify-center">
            {/* Dome Gallery */}
            <div className="relative w-80 h-80">
              {teamImages.map((img, index) => {
                const angle = (index * 360) / teamImages.length;
                const active = index === activeImage;
                const radius = 140;
                const x = radius * Math.cos(angle * Math.PI / 180);
                const y = radius * Math.sin(angle * Math.PI / 180);
                
                return (
                  <div
                    key={index}
                    className={`absolute w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-xl transition-all duration-500 transform cursor-pointer ${
                      active ? 'z-10 scale-125 ring-4 ring-orange-500' : 'z-0'
                    }`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: `translate(-50%, -50%) ${active ? 'scale(1.25)' : 'scale(1)'}`,
                    }}
                    onClick={() => setActiveImage(index)}
                  >
                    <img
                      src={img}
                      alt={`Team member ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                    {active && (
                      <div className="absolute inset-0 bg-gradient-to-t from-orange-500/30 to-transparent flex items-end justify-center pb-2">
                        <span className="text-white text-xs font-bold">Team Expert</span>
                      </div>
                    )}
                  </div>
                );
              })}
              
              {/* Central Active Image */}
              <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl">
                <img
                  src={teamImages[activeImage]}
                  alt="Active team member"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bounce Cards - Our Services */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Our <span className="text-orange-500">Services</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div
                key={index}
                className={`group relative bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-bounce-in`}
                style={{ animationDelay: `${service.delay}ms` }}
              >
                {/* Animated Border */}
                <div className={`absolute inset-0 bg-gradient-to-r ${service.color} rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                {/* Icon with Bounce */}
                <div className={`relative z-10 w-14 h-14 bg-gradient-to-br ${service.color} rounded-xl flex items-center justify-center mb-4 group-hover:animate-bounce`}>
                  <service.icon className="w-7 h-7 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 relative z-10">
                  {service.title}
                </h3>
                <p className="text-gray-600 relative z-10">
                  {service.description}
                </p>
                
                {/* Floating Elements */}
                <div className="absolute top-3 right-3 w-2 h-2 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-3 left-3 w-1 h-1 bg-gradient-to-r from-orange-400 to-red-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Infinite Scrolling Gallery */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Popular <span className="text-orange-500">Destinations</span>
          </h2>
          
          <div className="relative h-64 overflow-hidden rounded-3xl">
            <div 
              ref={galleryRef}
              className="flex absolute left-0"
              style={{ width: '200%' }}
            >
              {[...destinationImages, ...destinationImages].map((img, index) => (
                <div
                  key={index}
                  className="w-80 h-64 mx-2 relative group overflow-hidden rounded-2xl flex-shrink-0"
                >
                  <img
                    src={img}
                    alt={`Destination ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <span className="text-white font-bold">Explore Destination</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Gradient Overlays */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10"></div>
          </div>
        </div>

        {/* Why Choose Us - Enhanced Cards */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Why <span className="text-orange-500">Choose Us</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105 border border-gray-100"
              >
                {/* Animated Background Pattern */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute top-0 left-0 w-20 h-20 bg-orange-400/10 rounded-full blur-xl"></div>
                  <div className="absolute bottom-0 right-0 w-20 h-20 bg-red-400/10 rounded-full blur-xl"></div>
                </div>
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 bg-gradient-to-br from-orange-400 to-red-500 rounded-xl flex items-center justify-center mb-6 ${value.bounce}`}>
                    <value.icon className="w-7 h-7 text-white" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {value.description}
                  </p>
                  
                  {/* Check Badge */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  </div>
                </div>
                
                {/* Hover Effect Line */}
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 group-hover:w-24 h-1 bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Floating Image Menu */}
        <div className="mb-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Travel <span className="text-orange-500">Gallery</span>
          </h2>
          
          <div className="relative">
            <div 
              ref={infiniteMenuRef}
              className="flex gap-4 overflow-x-auto py-4 scrollbar-hide"
              style={{ scrollSnapType: 'x mandatory' }}
            >
              {destinationImages.map((img, index) => (
                <div
                  key={index}
                  className="relative flex-shrink-0 w-64 h-48 rounded-2xl overflow-hidden group cursor-pointer"
                  style={{ scrollSnapAlign: 'start' }}
                >
                  <img
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div className="text-white">
                      <div className="flex items-center gap-2 mb-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <span className="font-bold">Featured Destination</span>
                    </div>
                  </div>
                  
                  {/* Floating Badge */}
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold text-gray-900 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    Hot Deal
                  </div>
                </div>
              ))}
            </div>
            
            {/* Navigation Arrows */}
           <button 
  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
  onClick={() => {
    if (infiniteMenuRef.current) {
      infiniteMenuRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    }
  }}
>
  <ChevronLeft className="w-5 h-5 text-gray-900" />
</button>
<button 
  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 backdrop-blur-sm w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-300"
  onClick={() => {
    if (infiniteMenuRef.current) {
      infiniteMenuRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }}
>
  <ChevronRight className="w-5 h-5 text-gray-900" />
</button>
          </div>
        </div>

        {/* Special Offers Highlight */}
        <div className="relative mb-20 group">
          <div className="absolute -inset-4 bg-gradient-to-r from-orange-500 via-red-500 to-pink-500 rounded-3xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity duration-500 animate-pulse"></div>
          <div className="relative bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-8 shadow-2xl overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -translate-x-24 translate-y-24"></div>
            
            <div className="relative z-10 text-center">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                <Sparkles className="w-4 h-4 text-white" />
                <span className="text-white text-sm font-bold">Limited Time Offer</span>
              </div>
              
              <h2 className="text-4xl font-bold text-white mb-6">
                Special Flight & Hotel Deals
              </h2>
              
              <p className="text-lg text-orange-100 mb-8 max-w-2xl mx-auto leading-relaxed">
                United Travel and Tours Limited is well known for its special flight-and-hotel deals, including popular routes such as London to Kathmandu. These offers are designed to give travellers more choice and better value, while maintaining a high standard of service.
              </p>
              
              <a href="/explore">
                <button className="group/btn inline-flex items-center gap-3 bg-white text-orange-600 hover:bg-orange-50 px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                  Explore Exclusive Deals
                  <Zap className="w-5 h-5 group-hover/btn:animate-pulse" />
                </button>
              </a>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-white rounded-3xl p-8 shadow-2xl">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Get In <span className="text-orange-500">Touch</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce transition-all duration-300">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Our Location</h3>
              <p className="text-gray-600">
                2 High Street<br />
                Bracknell RG12 1AA<br />
                United Kingdom
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce transition-all duration-300">
                <Phone className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Phone</h3>
              <p className="text-gray-600">
                +07 366 234 404<br />
                +44 20 3725 3460<br />
                <span className="text-sm text-gray-500">Mon-Fri: 9AM - 6PM</span>
              </p>
            </div>

            <div className="text-center group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:animate-bounce transition-all duration-300">
                <Mail className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-3 text-lg">Email</h3>
              <p className="text-gray-600">
                info@unitedtravel.co.uk<br />
                <span className="text-sm text-gray-500">We reply within 24 hours</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-gray-50 to-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-400 to-red-500 text-white px-6 py-2 rounded-full mb-6">
            <Sparkles className="w-4 h-4" />
            <span className="font-bold">Ready to Begin Your Journey</span>
          </div>
          
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Plan Your <span className="text-orange-500">Perfect</span> Trip Today
          </h2>
          
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Let us help you create an unforgettable travel experience with honest advice, practical solutions, and friendly support.
          </p>
          
          <div className="flex gap-4 justify-center flex-wrap">
            <a href="/explore">
              <button className="group relative bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                <span className="relative z-10">Browse Destinations</span>
                <div className="absolute inset-0 bg-gradient-to-r from-orange-600 to-red-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </a>
            <a href="/contact">
              <button className="group relative bg-white hover:bg-gray-50 text-gray-900 px-10 py-4 rounded-full font-bold text-lg border-2 border-gray-300 transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <span className="relative z-10">Contact Us</span>
                <div className="absolute inset-0 bg-gray-50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* Add custom animations to global styles */}
      <style jsx>{`
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            opacity: 1;
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
        }
        
        .animate-bounce-in {
          animation: bounce-in 0.8s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
        }
        
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}