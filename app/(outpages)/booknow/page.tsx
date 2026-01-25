'use client'

import { useState } from 'react'

export default function BookNowPage() {
  const [bookingData, setBookingData] = useState({
    tripType: 'round-trip',
    departureCity: '',
    arrivalCity: '',
    departureDate: '',
    returnDate: '',
    travelers: 1,
    flightClass: 'economy',
    selectedFlight: null as { id: string; airline: string; departure: string; arrival: string; price: number } | null,
    selectedHotel: null as { id: string; name: string; nights: number; pricePerNight: number } | null,
    selectedActivities: [] as { id: string; name: string; price: number }[],
    specialRequests: '',
  })

  const [step, setStep] = useState<'form' | 'summary'>('form')

  const handleFormSubmit = (data: typeof bookingData) => {
    setBookingData(data)
    setStep('summary')
  }

  const handleConfirmBooking = () => {
    console.log('Booking confirmed:', bookingData)
    alert('Booking confirmed! You will receive a confirmation email shortly.')
  }

  const handleBackToForm = () => {
    setStep('form')
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Book Your Dream Journey
          </h1>
          <p className="text-lg text-gray-600">
            {step === 'form' ? 'Fill in your travel details below' : 'Review your booking details'}
          </p>
        </div>

        {/* Step Indicator */}
        <div className="flex justify-center gap-4 mb-12">
          <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg ${step === 'form' ? 'bg-blue-600 text-white' : 'bg-green-600 text-white'}`}>
            1
          </div>
          <div className={`w-12 h-1 mt-6 ${step === 'summary' ? 'bg-blue-600' : 'bg-gray-300'}`} />
          <div className={`flex items-center justify-center w-12 h-12 rounded-full font-bold text-lg ${step === 'summary' ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
            2
          </div>
        </div>

        {/* Form or Summary */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {step === 'form' ? (
              <BookingForm initialData={bookingData} onSubmit={handleFormSubmit} />
            ) : (
              <BookingSummary
                data={bookingData}
                onConfirm={handleConfirmBooking}
                onBack={handleBackToForm}
              />
            )}
          </div>

          {/* Side Panel - Cost Breakdown */}
          {step === 'summary' && (
            <div className="bg-white rounded-2xl p-8 shadow-lg h-fit sticky top-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Cost Breakdown</h3>
              <div className="space-y-4 mb-6">
                {bookingData.selectedFlight && (
                  <div className="flex justify-between pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Flight</span>
                    <span className="font-semibold text-gray-900">
                      ${bookingData.selectedFlight.price * bookingData.travelers}
                    </span>
                  </div>
                )}
                {bookingData.selectedHotel && (
                  <div className="flex justify-between pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Hotel ({bookingData.selectedHotel.nights} nights)</span>
                    <span className="font-semibold text-gray-900">
                      ${bookingData.selectedHotel.pricePerNight * bookingData.selectedHotel.nights}
                    </span>
                  </div>
                )}
                {bookingData.selectedActivities.length > 0 && (
                  <div className="flex justify-between pb-4 border-b border-gray-200">
                    <span className="text-gray-600">Activities</span>
                    <span className="font-semibold text-gray-900">
                      ${bookingData.selectedActivities.reduce((sum, a) => sum + a.price, 0)}
                    </span>
                  </div>
                )}
              </div>

              <div className="bg-blue-50 rounded-xl p-4 mb-6">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-gray-900">Total:</span>
                  <span className="text-3xl font-bold text-blue-600">
                    $
                    {(bookingData.selectedFlight?.price ?? 0) * bookingData.travelers +
                      (bookingData.selectedHotel?.pricePerNight ?? 0) *
                        (bookingData.selectedHotel?.nights ?? 0) +
                      bookingData.selectedActivities.reduce((sum, a) => sum + a.price, 0)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleConfirmBooking}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition-colors mb-3"
              >
                Confirm Booking
              </button>
              <button
                onClick={handleBackToForm}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-6 rounded-lg transition-colors"
              >
                Back to Edit
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

import React from "react"
import { ChevronDown } from 'lucide-react'

const FLIGHTS = [
  { id: 'f1', airline: 'United Airways', departure: '08:00 AM', arrival: '02:30 PM', price: 350 },
  { id: 'f2', airline: 'Delta Airlines', departure: '10:30 AM', arrival: '05:00 PM', price: 320 },
  { id: 'f3', airline: 'American Airlines', departure: '02:00 PM', arrival: '08:30 PM', price: 380 },
  { id: 'f4', airline: 'Emirates', departure: '06:00 PM', arrival: '11:45 PM', price: 420 },
]

const HOTELS = [
  { id: 'h1', name: 'Luxury Palace Hotel', nights: 3, pricePerNight: 250, rating: 5 },
  { id: 'h2', name: 'Grand View Resort', nights: 3, pricePerNight: 180, rating: 4.5 },
  { id: 'h3', name: 'City Center Hotel', nights: 3, pricePerNight: 120, rating: 4 },
  { id: 'h4', name: 'Budget Comfort Inn', nights: 3, pricePerNight: 80, rating: 3.5 },
]

const ACTIVITIES = [
  { id: 'a1', name: 'City Walking Tour', price: 45 },
  { id: 'a2', name: 'Museum Visit', price: 35 },
  { id: 'a3', name: 'Adventure Sports Package', price: 120 },
  { id: 'a4', name: 'Local Cuisine Cooking Class', price: 65 },
  { id: 'a5', name: 'Sunset Cruise', price: 85 },
  { id: 'a6', name: 'Mountain Hiking', price: 55 },
]

interface BookingFormProps {
  initialData: any
  onSubmit: (data: any) => void
}

export function BookingForm({ initialData, onSubmit }: BookingFormProps) {
  const [formData, setFormData] = useState(initialData)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }))
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleActivityToggle = (activity: { id: string; name: string; price: number }) => {
    const isSelected = formData.selectedActivities.some((a: any) => a.id === activity.id)
    setFormData((prev: any) => ({
      ...prev,
      selectedActivities: isSelected
        ? prev.selectedActivities.filter((a: any) => a.id !== activity.id)
        : [...prev.selectedActivities, activity],
    }))
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.departureCity) newErrors.departureCity = 'Departure city is required'
    if (!formData.arrivalCity) newErrors.arrivalCity = 'Arrival city is required'
    if (!formData.departureDate) newErrors.departureDate = 'Departure date is required'
    if (formData.tripType === 'round-trip' && !formData.returnDate) {
      newErrors.returnDate = 'Return date is required'
    }
    if (!formData.selectedFlight) newErrors.selectedFlight = 'Please select a flight'
    if (!formData.selectedHotel) newErrors.selectedHotel = 'Please select a hotel'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Trip Type */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Trip Details</h2>

        <div className="space-y-4 mb-6">
          <div className="flex gap-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                value="round-trip"
                checked={formData.tripType === 'round-trip'}
                onChange={handleInputChange}
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-medium">Round Trip</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="tripType"
                value="one-way"
                checked={formData.tripType === 'one-way'}
                onChange={handleInputChange}
                className="w-5 h-5"
              />
              <span className="text-gray-700 font-medium">One Way</span>
            </label>
          </div>
        </div>

        {/* Departure and Arrival */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Departure City *</label>
            <input
              type="text"
              name="departureCity"
              value={formData.departureCity}
              onChange={handleInputChange}
              placeholder="e.g., New York (JFK)"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.departureCity ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.departureCity && <p className="text-red-500 text-sm mt-1">{errors.departureCity}</p>}
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Arrival City *</label>
            <input
              type="text"
              name="arrivalCity"
              value={formData.arrivalCity}
              onChange={handleInputChange}
              placeholder="e.g., Paris (CDG)"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.arrivalCity ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.arrivalCity && <p className="text-red-500 text-sm mt-1">{errors.arrivalCity}</p>}
          </div>
        </div>

        {/* Dates */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Departure Date *</label>
            <input
              type="date"
              name="departureDate"
              value={formData.departureDate}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.departureDate ? 'border-red-500' : 'border-gray-300'
              }`}
            />
            {errors.departureDate && <p className="text-red-500 text-sm mt-1">{errors.departureDate}</p>}
          </div>

          {formData.tripType === 'round-trip' && (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Return Date *</label>
              <input
                type="date"
                name="returnDate"
                value={formData.returnDate}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  errors.returnDate ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.returnDate && <p className="text-red-500 text-sm mt-1">{errors.returnDate}</p>}
            </div>
          )}

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Travelers</label>
            <input
              type="number"
              name="travelers"
              min="1"
              max="6"
              value={formData.travelers}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Flight Selection */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Flight *</h2>
        {errors.selectedFlight && <p className="text-red-500 mb-4">{errors.selectedFlight}</p>}

        <div className="space-y-3">
          {FLIGHTS.map((flight) => (
            <label
              key={flight.id}
              className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.selectedFlight?.id === flight.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="flight"
                checked={formData.selectedFlight?.id === flight.id}
                onChange={() => setFormData((prev: any) => ({ ...prev, selectedFlight: flight }))}
                className="w-5 h-5"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{flight.airline}</p>
                <p className="text-sm text-gray-600">
                  {flight.departure} - {flight.arrival}
                </p>
              </div>
              <p className="text-xl font-bold text-blue-600">${flight.price}</p>
            </label>
          ))}
        </div>
      </div>

      {/* Hotel Selection */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Hotel *</h2>
        {errors.selectedHotel && <p className="text-red-500 mb-4">{errors.selectedHotel}</p>}

        <div className="space-y-3">
          {HOTELS.map((hotel) => (
            <label
              key={hotel.id}
              className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.selectedHotel?.id === hotel.id
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name="hotel"
                checked={formData.selectedHotel?.id === hotel.id}
                onChange={() => setFormData((prev: any) => ({ ...prev, selectedHotel: hotel }))}
                className="w-5 h-5"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{hotel.name}</p>
                <p className="text-sm text-gray-600">
                  {hotel.nights} nights • Rating: {hotel.rating} ⭐
                </p>
              </div>
              <p className="text-xl font-bold text-blue-600">${hotel.pricePerNight}/night</p>
            </label>
          ))}
        </div>
      </div>

      {/* Activities Selection */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add Activities (Optional)</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {ACTIVITIES.map((activity) => (
            <label
              key={activity.id}
              className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
                formData.selectedActivities.some((a: any) => a.id === activity.id)
                  ? 'border-blue-600 bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="checkbox"
                checked={formData.selectedActivities.some((a: any) => a.id === activity.id)}
                onChange={() => handleActivityToggle(activity)}
                className="w-5 h-5"
              />
              <div className="flex-1">
                <p className="font-semibold text-gray-900">{activity.name}</p>
              </div>
              <p className="font-bold text-blue-600">${activity.price}</p>
            </label>
          ))}
        </div>
      </div>

      {/* Special Requests */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Special Requests (Optional)</h2>
        <textarea
          name="specialRequests"
          value={formData.specialRequests}
          onChange={handleInputChange}
          placeholder="Any special requests or preferences for your trip?"
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg"
      >
        Continue to Summary
      </button>
    </form>
  )
}


import { CheckCircle, MapPin, Calendar, Users, Plane, Hotel, Briefcase } from 'lucide-react'

interface BookingSummaryProps {
  data: {
    tripType: string
    departureCity: string
    arrivalCity: string
    departureDate: string
    returnDate: string
    travelers: number
    flightClass: string
    selectedFlight: { id: string; airline: string; departure: string; arrival: string; price: number } | null
    selectedHotel: { id: string; name: string; nights: number; pricePerNight: number } | null
    selectedActivities: { id: string; name: string; price: number }[]
    specialRequests: string
  }
  onConfirm: () => void
  onBack: () => void
}

export function BookingSummary({ data, onConfirm, onBack }: BookingSummaryProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  const totalPrice =
    (data.selectedFlight?.price ?? 0) * data.travelers +
    (data.selectedHotel?.pricePerNight ?? 0) * (data.selectedHotel?.nights ?? 0) +
    data.selectedActivities.reduce((sum, a) => sum + a.price, 0)

  return (
    <div className="space-y-8">
      {/* Summary Header */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border-l-4 border-green-500">
        <div className="flex items-center gap-4 mb-4">
          <CheckCircle className="w-8 h-8 text-green-500" />
          <h2 className="text-3xl font-bold text-gray-900">Booking Summary</h2>
        </div>
        <p className="text-gray-600">
          Please review all the details below before confirming your booking.
        </p>
      </div>

      {/* Trip Overview */}
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
          <MapPin className="w-6 h-6 text-blue-600" />
          Trip Overview
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm text-gray-600 mb-1">Departure</p>
            <p className="text-xl font-bold text-gray-900">{data.departureCity}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Arrival</p>
            <p className="text-xl font-bold text-gray-900">{data.arrivalCity}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Trip Type</p>
            <p className="text-lg font-semibold text-gray-900 capitalize">
              {data.tripType === 'round-trip' ? 'Round Trip' : 'One Way'}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Travelers</p>
            <p className="text-lg font-semibold text-gray-900">{data.travelers} person(s)</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1">Departure Date</p>
            <p className="text-lg font-semibold text-gray-900">{formatDate(data.departureDate)}</p>
          </div>
          {data.returnDate && (
            <div>
              <p className="text-sm text-gray-600 mb-1">Return Date</p>
              <p className="text-lg font-semibold text-gray-900">{formatDate(data.returnDate)}</p>
            </div>
          )}
        </div>
      </div>

      {/* Flight Details */}
      {data.selectedFlight && (
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Plane className="w-6 h-6 text-blue-600" />
            Flight Details
          </h3>

          <div className="bg-blue-50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Airline</p>
                <p className="text-xl font-bold text-gray-900">{data.selectedFlight.airline}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Class</p>
                <p className="text-lg font-semibold text-gray-900 capitalize">{data.flightClass}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Departure Time</p>
                <p className="text-lg font-semibold text-gray-900">{data.selectedFlight.departure}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Arrival Time</p>
                <p className="text-lg font-semibold text-gray-900">{data.selectedFlight.arrival}</p>
              </div>
            </div>
          </div>

          <div className="mt-4 text-right">
            <p className="text-sm text-gray-600">Price per person</p>
            <p className="text-3xl font-bold text-blue-600">
              ${data.selectedFlight.price} × {data.travelers} = $
              {data.selectedFlight.price * data.travelers}
            </p>
          </div>
        </div>
      )}

      {/* Hotel Details */}
      {data.selectedHotel && (
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Hotel className="w-6 h-6 text-blue-600" />
            Hotel Details
          </h3>

          <div className="bg-blue-50 rounded-xl p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-sm text-gray-600 mb-1">Hotel Name</p>
                <p className="text-xl font-bold text-gray-900">{data.selectedHotel.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Duration</p>
                <p className="text-lg font-semibold text-gray-900">{data.selectedHotel.nights} nights</p>
              </div>
            </div>
          </div>

          <div className="mt-4 text-right">
            <p className="text-sm text-gray-600">Price per night</p>
            <p className="text-3xl font-bold text-blue-600">
              ${data.selectedHotel.pricePerNight} × {data.selectedHotel.nights} = $
              {data.selectedHotel.pricePerNight * data.selectedHotel.nights}
            </p>
          </div>
        </div>
      )}

      {/* Activities */}
      {data.selectedActivities.length > 0 && (
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
            <Briefcase className="w-6 h-6 text-blue-600" />
            Selected Activities
          </h3>

          <div className="space-y-3">
            {data.selectedActivities.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center justify-between p-4 bg-blue-50 rounded-lg"
              >
                <p className="font-semibold text-gray-900">{activity.name}</p>
                <p className="font-bold text-blue-600">${activity.price}</p>
              </div>
            ))}
          </div>

          <div className="mt-4 text-right">
            <p className="text-sm text-gray-600">Total activities</p>
            <p className="text-2xl font-bold text-blue-600">
              ${data.selectedActivities.reduce((sum, a) => sum + a.price, 0)}
            </p>
          </div>
        </div>
      )}

      {/* Special Requests */}
      {data.specialRequests && (
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">Special Requests</h3>
          <p className="text-gray-700 whitespace-pre-wrap italic">{data.specialRequests}</p>
        </div>
      )}

      {/* Total Price */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 shadow-lg text-white">
        <div className="flex items-center justify-between">
          <h3 className="text-3xl font-bold">Total Booking Price</h3>
          <p className="text-5xl font-bold">${totalPrice}</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={onBack}
          className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-4 px-6 rounded-lg transition-colors text-lg"
        >
          Back to Edit
        </button>
        <button
          onClick={onConfirm}
          className="flex-1 bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-6 rounded-lg transition-colors text-lg"
        >
          Confirm & Pay
        </button>
      </div>
    </div>
  )
}
