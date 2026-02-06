'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Calendar, Users, MapPin, PoundSterling, Plane, Clock, CheckCircle, Shield, Headphones, ArrowRight, Star, Zap, Tag } from 'lucide-react';

const ONGOING_FARES = [
  {
    id: 1,
    title: "Kathmandu to London",
    description: "Experience luxury shopping and desert adventures.",
    originalPrice: "£450",
    discountedPrice: "£400",
    discount: "5% OFF",
    duration: "5h 30m",
    image: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800&h=400&fit=crop",
    alt: "Dubai skyline",
    departure: "Kathmandu",
    arrival: "Dubai",
    expires: "Ends in 2 days"
  },
  {
    id: 3,
    title: "London to Kathmandu (Two Way)",
    description: "Immerse yourself in India's rich cultural heritage.",
    originalPrice: "£800",
    discountedPrice: "£700",
    discount: "5% OFF",
    duration: "1h 50m",
    image: "https://images.unsplash.com/photo-1587474260584-136574528ed5?w=800&h=400&fit=crop",
    alt: "Delhi architecture",
    departure: "Lumbini",
    arrival: "Delhi",
    expires: "Ends tomorrow"
  },
  {
    id: 5,
    title: "Kathmandu to London",
    description: "Modern skyscrapers and cultural landmarks.",
    originalPrice: "£520",
    discountedPrice: "£360",
    discount: "33% OFF",
    duration: "4h 45m",
    image: "https://images.unsplash.com/photo-1523482580672-f109ba8cb9be?w=800&h=400&fit=crop",
    alt: "Kuala Lumpur",
    departure: "Nepalgunj",
    arrival: "Kuala Lumpur",
    expires: "Ends in 4 days"
  }
];

const DESTINATIONS = [
  "Dubai, UAE",
  "Bangkok, Thailand",
  "Delhi, India",
  "Doha, Qatar",
  "Kuala Lumpur, Malaysia",
  "Singapore",
  "Tokyo, Japan",
  "Istanbul, Turkey",
  "Paris, France",
  "London, UK",
  "Barcelona, Spain",
  "New York, USA",
  "Sydney, Australia",
  "Cairo, Egypt",
  "Maldives",
  "Kathmandu, Nepal",
  "Lumbini, Nepal",
  "Nepalgunj, Nepal"
];

const TRAVELERS_OPTIONS = [
  { value: "1", label: "1 Passenger" },
  { value: "2", label: "2 Passengers" },
  { value: "3", label: "3 Passengers" },
  { value: "4", label: "4 Passengers" },
  { value: "5", label: "5 Passengers" },
  { value: "6", label: "6-10 Passengers" },
  { value: "10+", label: "10+ Passengers" }
];

const CABIN_CLASSES = [
  { value: "economy", label: "Economy Class", icon: "💺" },
  { value: "premium", label: "Premium Economy", icon: "✨" },
  { value: "business", label: "Business Class", icon: "🛋️" },
  { value: "first", label: "First Class", icon: "👑" }
];

const FLIGHT_TYPES = [
  { value: "one-way", label: "One Way", icon: "➡️" },
  { value: "round-trip", label: "Round Trip", icon: "🔄" },
  { value: "multi-city", label: "Multi City", icon: "📍" }
];

export default function FlightBookNow() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedFlightType, setSelectedFlightType] = useState<string>('round-trip');
  const [selectedCabinClass, setSelectedCabinClass] = useState<string>('economy');
  const [selectedFare, setSelectedFare] = useState<number | null>(null);

  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    phone: '',
    from: '',
    to: '',
    travelers: '',
    cabin_class: 'economy',
    departure_date: '',
    return_date: '',
    flight_type: 'round-trip',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFareSelect = (fareId: number) => {
    setSelectedFare(fareId);
    const fare = ONGOING_FARES.find(f => f.id === fareId);
    if (fare) {
      setFormData(prev => ({
        ...prev,
        from: fare.departure,
        to: fare.arrival
      }));
    }
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    if (!form.current) return;

    // Add selected fare information
    if (selectedFare) {
      const fare = ONGOING_FARES.find(f => f.id === selectedFare);
      if (fare) {
        const fareInput = document.createElement('input');
        fareInput.type = 'hidden';
        fareInput.name = 'selected_fare';
        fareInput.value = `${fare.title} - ${fare.discountedPrice}`;
        form.current.appendChild(fareInput);
      }
    }

    emailjs
      .sendForm(
        'service_unitedtravels',
        'template_mz4e7hk',
        form.current,
        'CvvGr0snxHNqeez6V'
      )
      .then(
        () => {
          setStatus('success');
          setIsSubmitting(false);
          form.current?.reset();
          setFormData({
            user_name: '',
            user_email: '',
            phone: '',
            from: '',
            to: '',
            travelers: '',
            cabin_class: 'economy',
            departure_date: '',
            return_date: '',
            flight_type: 'round-trip',
            message: ''
          });
          setSelectedFare(null);
        },
        (error) => {
          console.error('Failed to send:', error);
          setStatus('error');
          setIsSubmitting(false);
        }
      );
  };

  const formatDateForInput = (date: Date): string => {
    return date.toISOString().split('T')[0];
  };

  const getTodayDate = (): string => {
    return formatDateForInput(new Date());
  };

  const getDateDaysFromNow = (days: number): string => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return formatDateForInput(date);
  };

  const setQuickDeparture = () => {
    setFormData(prev => ({ 
      ...prev, 
      departure_date: getDateDaysFromNow(7) 
    }));
  };

  const setQuickReturn = () => {
    const departureDate = formData.departure_date || getDateDaysFromNow(7);
    const returnDate = getDateDaysFromNow(14);
    setFormData(prev => ({ 
      ...prev, 
      departure_date: departureDate,
      return_date: returnDate
    }));
  };

  const swapLocations = () => {
    setFormData(prev => ({
      ...prev,
      from: prev.to,
      to: prev.from
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-500 via-orange-300 to-orange-500 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto mt-16">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-full mb-6 shadow-lg">
            <Plane className="w-5 h-5" />
            <span className="font-bold">United Travels - Flight Booking</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            Book Your <span className="text-blue-600">Dream Flight</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find exclusive deals on international flights. Limited time offers available!
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Flight Deals */}
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <div className="bg-gradient-to-b from-blue-600 to-blue-800 rounded-2xl p-6 mb-6 shadow-xl">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-white">🔥 Hot Flight Deals</h2>
                  <Zap className="w-6 h-6 text-yellow-300" />
                </div>
                <p className="text-blue-100 mb-6">Limited time offers from Nepal to popular destinations</p>
                
                <div className="space-y-4">
                  {ONGOING_FARES.map((fare) => (
                    <div
                      key={fare.id}
                      className={`bg-white/10 backdrop-blur-sm rounded-xl p-4 border-2 transition-all cursor-pointer hover:scale-[1.02] ${
                        selectedFare === fare.id ? 'border-yellow-400 bg-white/20' : 'border-transparent'
                      }`}
                      onClick={() => handleFareSelect(fare.id)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <span className="font-bold text-white text-lg">{fare.departure}</span>
                            <ArrowRight className="w-4 h-4 text-yellow-300" />
                            <span className="font-bold text-white text-lg">{fare.arrival}</span>
                          </div>
                          <p className="text-blue-100 text-sm">{fare.description}</p>
                        </div>
                        <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                          {fare.discount}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-white">{fare.discountedPrice}</span>
                            <span className="text-blue-200 line-through">{fare.originalPrice}</span>
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <Clock className="w-3 h-3 text-blue-200" />
                            <span className="text-blue-200 text-sm">{fare.duration}</span>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleFareSelect(fare.id);
                          }}
                          className="bg-yellow-400 text-blue-900 font-bold px-4 py-2 rounded-lg hover:bg-yellow-300 transition-colors"
                        >
                          Select Deal
                        </button>
                      </div>
                      
                      <div className="mt-3 pt-3 border-t border-blue-500/30">
                        <div className="flex justify-between items-center">
                          <span className="text-blue-200 text-sm">{fare.expires}</span>
                          <div className="flex items-center gap-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star key={star} className="w-3 h-3 text-yellow-400 fill-current" />
                            ))}
                            <span className="text-white text-sm ml-1">4.9</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Why Book With Us */}
              <div className="bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Shield className="w-6 h-6 text-blue-600" />
                  Flight Booking Benefits
                </h3>
                <div className="space-y-4">
                  {[
                    { icon: "✈️", title: "Direct & Connecting Flights", desc: "Flexible routing options" },
                    { icon: "🔄", title: "Free Date Changes", desc: "Up to 48 hours before departure" },
                    { icon: "🍽️", title: "Meal Preferences", desc: "Special meals available" },
                    { icon: "🎒", title: "Extra Baggage", desc: "Discounted rates" },
                    { icon: "🏨", title: "Hotel Packages", desc: "Special bundle deals" },
                    { icon: "🚗", title: "Airport Transfers", desc: "Seamless connectivity" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="text-2xl">{item.icon}</div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-gray-600 text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Middle Column - Booking Form */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
              <div className="p-8">
                {/* Flight Type Selection */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    <Plane className="w-5 h-5 text-blue-600" />
                    Select Flight Type
                  </h3>
                  <div className="grid grid-cols-3 gap-3">
                    {FLIGHT_TYPES.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => {
                          setSelectedFlightType(type.value);
                          setFormData(prev => ({ ...prev, flight_type: type.value }));
                        }}
                        className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                          selectedFlightType === type.value
                            ? 'border-blue-500 bg-blue-50 transform scale-105 shadow-md'
                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                        }`}
                      >
                        <div className="text-2xl mb-2">{type.icon}</div>
                        <div className="text-sm font-medium text-gray-700">{type.label}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <form ref={form} onSubmit={sendEmail}>
                  {/* Route Selection */}
                  <div className="bg-gradient-to-r from-blue-50 to-transparent p-6 rounded-2xl mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                        <MapPin className="w-5 h-5 text-blue-600" />
                      </div>
                      Flight Route
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
                          From *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="from"
                            id="from"
                            required
                            list="from-destinations"
                            value={formData.from}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
                            placeholder="Departure city"
                          />
                          <datalist id="from-destinations">
                            {DESTINATIONS.map((dest) => (
                              <option key={dest} value={dest} />
                            ))}
                          </datalist>
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            🛫
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
                          To *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="to"
                            id="to"
                            required
                            list="to-destinations"
                            value={formData.to}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
                            placeholder="Arrival city"
                          />
                          <datalist id="to-destinations">
                            {DESTINATIONS.map((dest) => (
                              <option key={dest} value={dest} />
                            ))}
                          </datalist>
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            🛬
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <button
                      type="button"
                      onClick={swapLocations}
                      className="mt-4 flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
                    >
                      <ArrowRight className="w-4 h-4 rotate-90" />
                      Swap Locations
                    </button>
                  </div>

                  {/* Travel Dates */}
                  <div className="bg-gradient-to-r from-orange-50 to-transparent p-6 rounded-2xl mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-orange-600" />
                      </div>
                      Travel Dates
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="departure_date" className="block text-sm font-medium text-gray-700 mb-2">
                          Departure Date *
                        </label>
                        <div className="relative">
                          <input
                            type="date"
                            name="departure_date"
                            id="departure_date"
                            required
                            value={formData.departure_date}
                            onChange={handleInputChange}
                            min={getTodayDate()}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            📅
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={setQuickDeparture}
                          className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                        >
                          Set to next week
                        </button>
                      </div>

                      {selectedFlightType !== 'one-way' && (
                        <div>
                          <label htmlFor="return_date" className="block text-sm font-medium text-gray-700 mb-2">
                            Return Date *
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="return_date"
                              id="return_date"
                              required={selectedFlightType !== 'one-way'}
                              value={formData.return_date}
                              onChange={handleInputChange}
                              min={formData.departure_date || getTodayDate()}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              📅
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={setQuickReturn}
                            className="mt-2 text-sm text-blue-600 hover:text-blue-700 font-medium hover:underline"
                          >
                            Set to 1 week trip
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Passenger Details */}
                  <div className="bg-gradient-to-r from-green-50 to-transparent p-6 rounded-2xl mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                        <Users className="w-5 h-5 text-green-600" />
                      </div>
                      Passenger Details
                    </h3>
                    
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-2">
                          Lead Passenger Name *
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            name="user_name"
                            id="user_name"
                            required
                            value={formData.user_name}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
                            placeholder="Full name as per passport"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            👤
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-2">
                          Number of Passengers *
                        </label>
                        <div className="relative">
                          <select
                            name="travelers"
                            id="travelers"
                            required
                            value={formData.travelers}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white appearance-none"
                          >
                            <option value="">Select passengers</option>
                            {TRAVELERS_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            👥
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="user_email" className="block text-sm font-medium text-gray-700 mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            name="user_email"
                            id="user_email"
                            required
                            value={formData.user_email}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
                            placeholder="Email for confirmation"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            ✉️
                          </div>
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                          Phone Number *
                        </label>
                        <div className="relative">
                          <input
                            type="tel"
                            name="phone"
                            id="phone"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
                            placeholder="+44 1234 567890"
                          />
                          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                            📱
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cabin Class Selection */}
                  <div className="mb-8">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <Tag className="w-5 h-5 text-blue-600" />
                      Select Cabin Class
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {CABIN_CLASSES.map((cabin) => (
                        <button
                          key={cabin.value}
                          type="button"
                          onClick={() => {
                            setSelectedCabinClass(cabin.value);
                            setFormData(prev => ({ ...prev, cabin_class: cabin.value }));
                          }}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                            selectedCabinClass === cabin.value
                              ? 'border-blue-500 bg-blue-50 transform scale-105 shadow-md'
                              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          <div className="text-2xl mb-2">{cabin.icon}</div>
                          <div className="text-sm font-medium text-gray-700">{cabin.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div className="bg-gradient-to-r from-purple-50 to-transparent p-6 rounded-2xl mb-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                        <CheckCircle className="w-5 h-5 text-purple-600" />
                      </div>
                      Special Requests
                    </h3>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                        Meal Preferences, Seat Selection, or Other Requests
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows={3}
                        value={formData.message}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none bg-white"
                        placeholder="E.g., Vegetarian meals, window seat, extra legroom, wheelchair assistance..."
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={`w-full py-4 px-6 rounded-xl font-bold text-white text-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl ${
                        isSubmitting
                          ? 'bg-gray-400 cursor-not-allowed'
                          : 'bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 hover:from-blue-700 hover:via-blue-600 hover:to-blue-700'
                      }`}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center justify-center gap-3">
                          <svg className="animate-spin h-6 w-6 text-white" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          Processing Your Flight Request...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-3">
                          ✈️ Get Flight Quotes Now
                          <Plane className="w-5 h-5" />
                        </span>
                      )}
                    </button>
                    <p className="text-center text-sm text-gray-600 mt-3">
                      Our flight experts will send you the best options within 1 hour
                    </p>
                  </div>

                  {/* Status Messages */}
                  {status === 'success' && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl animate-fadeIn">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-6 h-6 text-green-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-green-800 mb-2">Flight Request Submitted!</h3>
                          <p className="text-green-700 mb-3">
                            Your flight inquiry has been received. Our experts will:
                          </p>
                          <ul className="space-y-2">
                            <li className="flex items-center gap-2 text-green-700">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Send flight options within 1 hour
                            </li>
                            <li className="flex items-center gap-2 text-green-700">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Provide best available fares
                            </li>
                            <li className="flex items-center gap-2 text-green-700">
                              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              Assist with seat selection and extras
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl animate-fadeIn">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                            <Shield className="w-6 h-6 text-red-600" />
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-red-800 mb-2">Submission Failed</h3>
                          <p className="text-red-700 mb-3">
                            Please try one of these alternative options:
                          </p>
                          <div className="flex flex-wrap gap-3 mt-4">
                            <a
                              href="tel:+442037253460"
                              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            >
                              📞 Call Us: +44 20 3725 3460
                            </a>
                            <a
                              href="mailto:flights@unitedtravels.co.uk"
                              className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                            >
                              ✉️ Email: flights@unitedtravels.co.uk
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Trust & Safety */}
            <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                <div className="text-2xl mb-2">🔒</div>
                <div className="font-bold text-gray-900">Secure Booking</div>
                <div className="text-sm text-gray-600">SSL Protected</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                <div className="text-2xl mb-2">⏰</div>
                <div className="font-bold text-gray-900">24/7 Support</div>
                <div className="text-sm text-gray-600">Flight Changes</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                <div className="text-2xl mb-2">💳</div>
                <div className="font-bold text-gray-900">Flexible Payment</div>
                <div className="text-sm text-gray-600">Multiple Options</div>
              </div>
              <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center">
                <div className="text-2xl mb-2">🏆</div>
                <div className="font-bold text-gray-900">Award Winning</div>
                <div className="text-sm text-gray-600">Best Airfare Service</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}