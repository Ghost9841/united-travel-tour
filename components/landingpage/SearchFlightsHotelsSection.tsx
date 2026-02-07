'use client';
import React, { useState } from 'react';
import { Calendar, MapPin, Users, Plane, Hotel, ArrowLeftRight } from 'lucide-react';

type TabType = 'flights' | 'hotels';
type TripType = 'return' | 'oneWay' | 'multicity';

const SearchFlightHotelsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('flights');
  
  // Flight states
  const [tripType, setTripType] = useState<TripType>('return');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [adults, setAdults] = useState(1);
  const [youth, setYouth] = useState(0);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [travelClass, setTravelClass] = useState('Economy Class');
  const [airline, setAirline] = useState('All Airlines');
  const [directFlights, setDirectFlights] = useState(false);
  const [flexibleDates, setFlexibleDates] = useState(false);
  
  // Hotel states
  const [destination, setDestination] = useState('');
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [rooms, setRooms] = useState(1);
  const [hotelAdults, setHotelAdults] = useState(2);
  const [hotelChildren, setHotelChildren] = useState(0);
  const [showGuestDropdown, setShowGuestDropdown] = useState(false);

  const handleSearch = () => {
    if (activeTab === 'flights') {
      console.log('Searching flights:', { 
        tripType, from, to, departureDate, returnDate, 
        passengers: { adults, youth, children, infants },
        travelClass, airline, directFlights, flexibleDates
      });
    } else {
      console.log('Searching hotels:', { destination, checkIn, checkOut, rooms, hotelAdults, hotelChildren });
    }
  };

  const swapLocations = () => {
    const temp = from;
    setFrom(to);
    setTo(temp);
  };

  return (
    <div className="w-full max-w-7xl">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-200">
          <button
            onClick={() => setActiveTab('flights')}
            className={`flex items-center justify-center gap-2 px-10 py-4 font-medium text-base transition-all ${
              activeTab === 'flights'
                ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Plane className="w-5 h-5" />
            <span>Flights</span>
          </button>
          <button
            onClick={() => setActiveTab('hotels')}
            className={`flex items-center justify-center gap-2 px-10 py-4 font-medium text-base transition-all ${
              activeTab === 'hotels'
                ? 'text-orange-500 border-b-2 border-orange-500 bg-orange-50'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
            }`}
          >
            <Hotel className="w-5 h-5" />
            <span>Hotels</span>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'flights' ? (
            <>
              {/* Trip Type & Options */}
              <div className="flex items-center gap-6 mb-5">
                {/* Trip Type Radio Buttons */}
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      checked={tripType === 'return'}
                      onChange={() => setTripType('return')}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Return</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      checked={tripType === 'oneWay'}
                      onChange={() => setTripType('oneWay')}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">One Way</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="tripType"
                      checked={tripType === 'multicity'}
                      onChange={() => setTripType('multicity')}
                      className="w-4 h-4 text-orange-500 focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Multicity</span>
                  </label>
                </div>

                {/* Checkboxes */}
                <div className="flex items-center gap-6 ml-auto">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={directFlights}
                      onChange={(e) => setDirectFlights(e.target.checked)}
                      className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Direct Flights Only</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={flexibleDates}
                      onChange={(e) => setFlexibleDates(e.target.checked)}
                      className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500"
                    />
                    <span className="text-sm font-medium text-gray-700">Flexi (+/- 3 Days)</span>
                  </label>
                </div>
              </div>

              {/* Flight Search Form - Row 1 */}
              <div className="grid grid-cols-3 gap-4 mb-4">
                {/* Leaving From */}
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Leaving From
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={from}
                      onChange={(e) => setFrom(e.target.value)}
                      placeholder="London, London Heathrow Arpt [LHR], United"
                      className="w-full pl-10 pr-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Swap Button */}
                <div className="flex items-end justify-center pb-3">
                  <button
                    onClick={swapLocations}
                    className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                    aria-label="Swap locations"
                  >
                    <ArrowLeftRight className="w-5 h-5 text-orange-500" />
                  </button>
                </div>

                {/* Arrive To */}
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Arrive To
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
                      placeholder="Dubai, Dubai Intl Arpt [DXB], United Arab Emir"
                      className="w-full pl-10 pr-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Departure Date */}
                <div className="col-span-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Departure Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="date"
                      value={departureDate}
                      onChange={(e) => setDepartureDate(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Return Date */}
                {tripType === 'return' && (
                  <div className="col-span-1">
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      Return Date
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Flight Search Form - Row 2 */}
              <div className="flex gap-4 items-end">
                {/* Adult */}
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Adult (&gt; 15)
                  </label>
                  <select
                    value={adults}
                    onChange={(e) => setAdults(Number(e.target.value))}
                    className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
                      <option key={num} value={num}>{num}</option>
                    ))}
                  </select>
                </div>

                {/* Youth */}
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Youth (12-15)
                  </label>
                  <select
                    value={youth}
                    onChange={(e) => setYouth(Number(e.target.value))}
                    className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {['Youth', 0, 1, 2, 3, 4, 5].map((num, idx) => (
                      <option key={idx} value={idx === 0 ? 0 : num}>{num}</option>
                    ))}
                  </select>
                </div>

                {/* Children */}
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Children (2-11)
                  </label>
                  <select
                    value={children}
                    onChange={(e) => setChildren(Number(e.target.value))}
                    className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {['Children', 0, 1, 2, 3, 4, 5].map((num, idx) => (
                      <option key={idx} value={idx === 0 ? 0 : num}>{num}</option>
                    ))}
                  </select>
                </div>

                {/* Infant */}
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Infant (&lt;2)
                  </label>
                  <select
                    value={infants}
                    onChange={(e) => setInfants(Number(e.target.value))}
                    className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    {['Infant', 0, 1, 2].map((num, idx) => (
                      <option key={idx} value={idx === 0 ? 0 : num}>{num}</option>
                    ))}
                  </select>
                </div>

                {/* Travel Class */}
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Travel Class
                  </label>
                  <select
                    value={travelClass}
                    onChange={(e) => setTravelClass(e.target.value)}
                    className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option>Economy Class</option>
                    <option>Premium Economy</option>
                    <option>Business Class</option>
                    <option>First Class</option>
                  </select>
                </div>

                {/* Airline Preference */}
                <div className="flex-1">
                  <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                    Airline Preference
                  </label>
                  <select
                    value={airline}
                    onChange={(e) => setAirline(e.target.value)}
                    className="w-full px-3 py-3 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  >
                    <option>All Airlines</option>
                    <option>Emirates</option>
                    <option>British Airways</option>
                    <option>Qatar Airways</option>
                    <option>Etihad Airways</option>
                  </select>
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-colors whitespace-nowrap uppercase tracking-wide"
                >
                  Search Flights
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Hotel Search Form - Two Row Layout */}
              <div className="space-y-4">
                {/* Row 1: Destination and Guests */}
                <div className="grid grid-cols-12 gap-4">
                  {/* Destination */}
                  <div className="col-span-7">
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      Destination
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="Dubai, United Arab Emirates"
                        className="w-full pl-11 pr-4 py-3.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Guests and Rooms */}
                  <div className="col-span-5 relative">
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      Guests and Rooms
                    </label>
                    <div className="relative">
                      <Users className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10 pointer-events-none" />
                      <button
                        type="button"
                        onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                        className="w-full pl-11 pr-10 py-3.5 text-sm text-left border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent bg-white hover:border-gray-400 transition-colors"
                      >
                        <span className="text-gray-700">Room: {rooms}, Adults: {hotelAdults}, Child: {hotelChildren}</span>
                      </button>
                      
                      {/* Chevron Icon */}
                      <svg 
                        className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none transition-transform ${showGuestDropdown ? 'rotate-180' : ''}`}
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>

                      {/* Dropdown */}
                      {showGuestDropdown && (
                        <>
                          {/* Backdrop to close dropdown when clicking outside */}
                          <div 
                            className="fixed inset-0 z-40" 
                            onClick={() => setShowGuestDropdown(false)}
                          />
                          
                          <div className="absolute top-full left-0 mt-2 w-80 bg-white border border-gray-300 rounded-lg shadow-xl z-50 p-5">
                            <div className="space-y-4">
                              {/* Room Header */}
                              <div>
                                <h4 className="text-sm font-semibold text-gray-800 mb-4">Rooms - {rooms}</h4>
                                
                                {/* Adults */}
                                <div className="flex items-center justify-between mb-4">
                                  <span className="text-sm font-medium text-gray-700">Adults:</span>
                                  <div className="flex items-center gap-4">
                                    <button
                                      type="button"
                                      onClick={() => setHotelAdults(Math.max(1, hotelAdults - 1))}
                                      className="w-9 h-9 rounded-full border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center text-gray-600 transition-colors font-medium text-lg"
                                    >
                                      −
                                    </button>
                                    <span className="w-8 text-center font-semibold text-base">{hotelAdults}</span>
                                    <button
                                      type="button"
                                      onClick={() => setHotelAdults(Math.min(10, hotelAdults + 1))}
                                      className="w-9 h-9 rounded-full border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center text-gray-600 transition-colors font-medium text-lg"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>

                                {/* Children */}
                                <div className="flex items-center justify-between">
                                  <span className="text-sm font-medium text-gray-700">Children:</span>
                                  <div className="flex items-center gap-4">
                                    <button
                                      type="button"
                                      onClick={() => setHotelChildren(Math.max(0, hotelChildren - 1))}
                                      className="w-9 h-9 rounded-full border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center text-gray-600 transition-colors font-medium text-lg"
                                    >
                                      −
                                    </button>
                                    <span className="w-8 text-center font-semibold text-base">{hotelChildren}</span>
                                    <button
                                      type="button"
                                      onClick={() => setHotelChildren(Math.min(10, hotelChildren + 1))}
                                      className="w-9 h-9 rounded-full border-2 border-gray-300 hover:border-orange-500 hover:text-orange-500 flex items-center justify-center text-gray-600 transition-colors font-medium text-lg"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </div>

                              {/* Add Another Room */}
                              <button
                                type="button"
                                onClick={() => setRooms(rooms + 1)}
                                className="text-orange-500 hover:text-orange-600 text-sm font-semibold hover:underline"
                              >
                                Add another room
                              </button>

                              {/* Done Button */}
                              <div className="flex justify-end pt-2 border-t border-gray-200">
                                <button
                                  type="button"
                                  onClick={() => setShowGuestDropdown(false)}
                                  className="px-8 py-2.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-colors"
                                >
                                  Done
                                </button>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Row 2: Check In, Check Out, Rooms, and Search Button */}
                <div className="grid grid-cols-12 gap-4">
                  {/* Check In */}
                  <div className="col-span-3">
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      Check In
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={checkIn}
                        onChange={(e) => setCheckIn(e.target.value)}
                        placeholder="mm/dd/yyyy"
                        className="w-full pl-11 pr-4 py-3.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Check Out */}
                  <div className="col-span-3">
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      Check Out
                    </label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="date"
                        value={checkOut}
                        onChange={(e) => setCheckOut(e.target.value)}
                        placeholder="mm/dd/yyyy"
                        className="w-full pl-11 pr-4 py-3.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Room Number Display */}
                  <div className="col-span-3">
                    <label className="block text-xs font-semibold text-gray-600 mb-2 uppercase tracking-wide">
                      Rooms
                    </label>
                    <div className="relative">
                      <Hotel className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="number"
                        min="1"
                        max="10"
                        value={rooms}
                        onChange={(e) => setRooms(Number(e.target.value))}
                        className="w-full pl-11 pr-4 py-3.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="col-span-3 flex items-end">
                    <button
                      onClick={handleSearch}
                      className="w-full px-6 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-bold rounded-lg transition-colors uppercase tracking-wide shadow-lg shadow-orange-500/30"
                    >
                      Search Hotels
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchFlightHotelsSection;