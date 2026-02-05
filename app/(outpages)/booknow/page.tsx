'use client';

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Calendar, Users, MapPin, PoundSterling, Plane, Clock, CheckCircle, Shield, Headphones } from 'lucide-react';

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
  "Maldives"
];

const TRAVELERS_OPTIONS = [
  { value: "1", label: "1 Traveler" },
  { value: "2", label: "2 Travelers" },
  { value: "3", label: "3 Travelers" },
  { value: "4", label: "4 Travelers" },
  { value: "5", label: "5 Travelers" },
  { value: "6", label: "6-10 Travelers" },
  { value: "10+", label: "10+ Travelers" }
];

const BUDGET_RANGES = [
  { value: "500-1000", label: "£500 - £1,000" },
  { value: "1000-3000", label: "£1,000 - £3,000" },
  { value: "3000-5000", label: "£3,000 - £5,000" },
  { value: "5000-10000", label: "£5,000 - £10,000" },
  { value: "10000+", label: "£10,000+" },
  { value: "custom", label: "Custom Budget" }
];

const TRAVEL_TYPES = [
  { value: "leisure", label: "Leisure / Vacation", icon: "🏖️" },
  { value: "business", label: "Business", icon: "💼" },
  { value: "honeymoon", label: "Honeymoon", icon: "💑" },
  { value: "family", label: "Family Trip", icon: "👨‍👩‍👧‍👦" },
  { value: "adventure", label: "Adventure", icon: "🧗" },
  { value: "cruise", label: "Cruise", icon: "🚢" }
];

export default function ModernBookNow() {
  const form = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [selectedType, setSelectedType] = useState<string>('leisure');
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    phone: '',
    destination: '',
    travelers: '',
    budget: '',
    departure_date: '',
    return_date: '',
    message: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus('idle');

    if (!form.current) return;

    // Create a hidden input for travel type
    const travelTypeInput = document.createElement('input');
    travelTypeInput.type = 'hidden';
    travelTypeInput.name = 'travel_type';
    travelTypeInput.value = selectedType;
    form.current.appendChild(travelTypeInput);

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
            destination: '',
            travelers: '',
            budget: '',
            departure_date: '',
            return_date: '',
            message: ''
          });
          setSelectedType('leisure');
          // Remove the hidden input after submission
          form.current?.removeChild(travelTypeInput);
        },
        (error) => {
          console.error('Failed to send:', error);
          setStatus('error');
          setIsSubmitting(false);
          // Remove the hidden input on error too
          form.current?.removeChild(travelTypeInput);
        }
      );
  };

  // Helper functions for date calculations
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

  const getDateDaysAfter = (startDate: string, daysToAdd: number): string => {
    if (!startDate) return getDateDaysFromNow(daysToAdd);
    const date = new Date(startDate);
    date.setDate(date.getDate() + daysToAdd);
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
    const returnDate = getDateDaysAfter(departureDate, 7);
    
    setFormData(prev => ({ 
      ...prev, 
      departure_date: departureDate,
      return_date: returnDate
    }));
  };

  // Add custom styles for fadeIn animation
  const fadeInStyle = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-fadeIn {
      animation: fadeIn 0.5s ease-out;
    }
  `;

  return (
    <>
      <style jsx global>{fadeInStyle}</style>
      <div className="min-h-screen bg-gradient-to-b from-blue-500 via-orange-400 to-orange-500 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto mt-16">
          {/* Header Section */}
          <div className="text-center mb-12 mt-8">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4">
              <Plane className="w-4 h-4" />
              <span className="text-sm font-medium">United Travels & Tours</span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Start Your <span className="text-blue-600">Dream Journey</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get personalized travel quotes from our experts. Fill in your details and we'll craft the perfect itinerary for you.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Side - Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-100">
                {/* Progress Indicator */}
                <div className="px-8 pt-8">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-sm font-medium text-gray-700">Booking Form</div>
                    <div className="text-sm text-gray-500">Step 1 of 3</div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full"></div>
                  </div>
                </div>

                <form ref={form} onSubmit={sendEmail} className="p-8">
                  {/* Travel Type Selection */}
                  <div className="mb-10">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span>🎯</span> What type of trip are you planning?
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                      {TRAVEL_TYPES.map((type) => (
                        <button
                          key={type.value}
                          type="button"
                          onClick={() => setSelectedType(type.value)}
                          className={`p-4 rounded-xl border-2 transition-all duration-300 text-center ${
                            selectedType === type.value
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

                  {/* Form Sections */}
                  <div className="space-y-8">
                    {/* Personal Information */}
                    <div className="bg-gradient-to-r from-blue-50 to-transparent p-6 rounded-2xl">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                          <Users className="w-5 h-5 text-blue-600" />
                        </div>
                        Personal Information
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="user_name" className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
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
                              placeholder="John Smith"
                            />
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              👤
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
                              placeholder="john@example.com"
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

                        <div>
                          <label htmlFor="travelers" className="block text-sm font-medium text-gray-700 mb-2">
                            Number of Travelers *
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
                              <option value="">Select travelers</option>
                              {TRAVELERS_OPTIONS.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              👥
                            </div>
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                              ▼
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Travel Details */}
                    <div className="bg-gradient-to-r from-orange-50 to-transparent p-6 rounded-2xl">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                          <MapPin className="w-5 h-5 text-orange-600" />
                        </div>
                        Travel Details
                      </h3>
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="destination" className="block text-sm font-medium text-gray-700 mb-2">
                            Destination *
                          </label>
                          <div className="relative">
                            <input
                              type="text"
                              name="destination"
                              id="destination"
                              required
                              list="destinations"
                              value={formData.destination}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white"
                              placeholder="Where do you want to go?"
                            />
                            <datalist id="destinations">
                              {DESTINATIONS.map((dest) => (
                                <option key={dest} value={dest} />
                              ))}
                            </datalist>
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              🗺️
                            </div>
                          </div>
                        </div>

                        <div>
                          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
                            Budget Range (Per Person)
                          </label>
                          <div className="relative">
                            <select
                              name="budget"
                              id="budget"
                              value={formData.budget}
                              onChange={handleInputChange}
                              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none bg-white appearance-none"
                            >
                              <option value="">Select budget range</option>
                              {BUDGET_RANGES.map((range) => (
                                <option key={range.value} value={range.value}>
                                  {range.label}
                                </option>
                              ))}
                            </select>
                            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                              💷
                            </div>
                            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                              ▼
                            </div>
                          </div>
                        </div>

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

                        <div>
                          <label htmlFor="return_date" className="block text-sm font-medium text-gray-700 mb-2">
                            Return Date *
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="return_date"
                              id="return_date"
                              required
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
                      </div>
                    </div>

                    {/* Additional Details */}
                    <div className="bg-gradient-to-r from-green-50 to-transparent p-6 rounded-2xl">
                      <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        Additional Information
                      </h3>
                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                          Special Requests or Preferences
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all outline-none resize-none bg-white"
                          placeholder="Tell us about your preferences (dietary needs, accessibility requirements, special occasions, preferred activities, etc.)"
                        />
                        <div className="mt-2 text-sm text-gray-500">
                          The more details you provide, the better we can tailor your experience.
                        </div>
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
                            Processing Your Request...
                          </span>
                        ) : (
                          <span className="flex items-center justify-center gap-3">
                            ✈️ Get Your Custom Quote Now
                            <Clock className="w-5 h-5" />
                          </span>
                        )}
                      </button>
                      <p className="text-center text-sm text-gray-600 mt-3">
                        Our travel experts will contact you within 2 hours
                      </p>
                    </div>

                    {/* Status Messages */}
                    {status === 'success' && (
                      <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl animate-fadeIn">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                              <CheckCircle className="w-6 h-6 text-green-600" />
                            </div>
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-green-800 mb-2">Request Submitted Successfully!</h3>
                            <p className="text-green-700 mb-3">
                              Thank you for choosing United Travels & Tours. Our travel expert will:
                            </p>
                            <ul className="space-y-2">
                              <li className="flex items-center gap-2 text-green-700">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Contact you within 2 hours with initial options
                              </li>
                              <li className="flex items-center gap-2 text-green-700">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Send personalized itinerary suggestions
                              </li>
                              <li className="flex items-center gap-2 text-green-700">
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                                Provide best available rates
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {status === 'error' && (
                      <div className="p-6 bg-gradient-to-r from-red-50 to-pink-50 border border-red-200 rounded-2xl animate-fadeIn">
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
                                href="mailto:info@unitedtravels.co.uk"
                                className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
                              >
                                ✉️ Email: info@unitedtravels.co.uk
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </form>
              </div>
            </div>

            {/* Right Side - Benefits & Info */}
            <div className="space-y-8">
              {/* Benefits Card */}
              <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-2xl p-8 text-white shadow-2xl">
                <h2 className="text-2xl font-bold mb-6">Why Book With Us?</h2>
                <div className="space-y-6">
                  {[
                    { icon: "⚡", title: "Instant Response", desc: "Get quotes within 2 hours" },
                    { icon: "💰", title: "Best Price Guarantee", desc: "Lowest prices or we match it" },
                    { icon: "🛡️", title: "Travel Insurance", desc: "Comprehensive coverage included" },
                    { icon: "⭐", title: "24/7 Support", desc: "Dedicated travel concierge" },
                    { icon: "🎯", title: "Custom Itineraries", desc: "Tailored to your preferences" },
                    { icon: "🔄", title: "Flexible Changes", desc: "Free date changes up to 30 days" }
                  ].map((benefit, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <div className="text-2xl">{benefit.icon}</div>
                      <div>
                        <h3 className="font-semibold text-lg">{benefit.title}</h3>
                        <p className="text-blue-200 text-sm">{benefit.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Contact */}
              <div className="bg-white rounded-2xl p-8 shadow-xl border border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                  <Headphones className="w-6 h-6 text-blue-600" />
                  Need Immediate Help?
                </h3>
                <div className="space-y-4">
                  <a
                    href="tel:+442037253460"
                    className="flex items-center gap-4 p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center group-hover:bg-blue-200 transition-colors">
                      <span className="text-xl">📞</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Call Us Now</div>
                      <div className="text-blue-600 font-bold text-lg">+44 20 3725 3460</div>
                    </div>
                  </a>
                  <a
                    href="mailto:info@unitedtravels.co.uk"
                    className="flex items-center gap-4 p-4 bg-orange-50 rounded-xl hover:bg-orange-100 transition-colors group"
                  >
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                      <span className="text-xl">✉️</span>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Email Us</div>
                      <div className="text-orange-600 font-bold">info@unitedtravels.co.uk</div>
                    </div>
                  </a>
                  <div className="flex items-center gap-4 p-4 bg-green-50 rounded-xl">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <Clock className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Office Hours</div>
                      <div className="text-green-700">Mon-Sun: 8 AM - 10 PM</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
                <h4 className="font-semibold text-gray-900 mb-4 text-center">Trusted By</h4>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: "⭐ 4.9/5 Rating", color: "from-yellow-500 to-yellow-600" },
                    { label: "🔒 SSL Secure", color: "from-green-500 to-green-600" },
                    { label: "🎖️ 15+ Years", color: "from-blue-500 to-blue-600" },
                    { label: "👥 50k+ Clients", color: "from-purple-500 to-purple-600" }
                  ].map((badge, index) => (
                    <div
                      key={index}
                      className={`bg-gradient-to-r ${badge.color} text-white text-center py-3 rounded-xl font-medium`}
                    >
                      {badge.label}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}