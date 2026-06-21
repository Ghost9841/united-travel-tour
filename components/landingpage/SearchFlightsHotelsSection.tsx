'use client';

import React, { useState } from 'react';
import { Plane, Building2, Hotel, Luggage, ArrowLeftRight } from 'lucide-react';
import { useRouter } from 'next/router';

type TabType = 'flights' | 'holidays' | 'hotels' | 'flightHotel';
type TripType = 'return' | 'oneWay' | 'multicity';

const TABS: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: 'flights', label: 'Flights', icon: Plane },
  { id: 'holidays', label: 'Holidays', icon: Building2 },
  { id: 'hotels', label: 'Hotels', icon: Hotel },
  { id: 'flightHotel', label: 'Flight + Hotel', icon: Luggage },
];

const SearchFlightHotelsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('flights');
  const [tripType, setTripType] = useState<TripType>('return');

  const [from, setFrom] = useState('London (LON)');
  const [to, setTo] = useState('Kathmandu (KTM)');
  const [departDate, setDepartDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [passengers, setPassengers] = useState(1);
  const [travelClass, setTravelClass] = useState('Economy');
  const [showPassengers, setShowPassengers] = useState(false);
  const router = useRouter();

  const swapLocations = () => {
    setFrom(to);
    setTo(from);
  };

  const handleSearch = () => {
    router.push("/explore");
  };

  return (
    <div className="w-full max-w-6xl mx-auto font-sans">
      {/* Header / Tab bar on dark navy banner */}
      <div className="relative rounded-t-2xl overflow-hidden bg-[#0b2545]">
        {/* background image layer */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-40"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1558005530-a7958896ec60?q=80&w=1600&auto=format&fit=crop')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2545] via-[#0b2545]/80 to-transparent" />

        <div className="relative flex items-stretch">
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-white text-[#0b2545] rounded-tr-2xl'
                    : 'text-white/85 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={2} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Search card */}
      <div className="bg-white rounded-b-2xl rounded-tr-2xl shadow-xl px-6 pt-5 pb-6">
        {/* Trip type radios */}
        <div className="flex items-center gap-8 mb-5">
          {(
            [
              { id: 'return', label: 'Return' },
              { id: 'oneWay', label: 'One Way' },
              { id: 'multicity', label: 'Multi-city' },
            ] as { id: TripType; label: string }[]
          ).map((opt) => (
            <label key={opt.id} className="flex items-center gap-2 cursor-pointer select-none">
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center transition-colors ${
                  tripType === opt.id ? 'border-orange-500' : 'border-gray-300'
                }`}
              >
                {tripType === opt.id && <span className="w-2 h-2 rounded-full bg-orange-500" />}
              </span>
              <input
                type="radio"
                name="tripType"
                className="hidden"
                checked={tripType === opt.id}
                onChange={() => setTripType(opt.id)}
              />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>

        {/* Form row */}
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          {/* From */}
          <div className="flex-1 min-w-0">
            <label className="block text-xs text-gray-500 mb-1">From</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="w-full text-sm font-semibold text-gray-900 bg-transparent border-b border-gray-200 pb-2 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Swap */}
          <div className="hidden lg:flex items-center justify-center pb-2">
            <button
              type="button"
              onClick={swapLocations}
              aria-label="Swap locations"
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-[#0b2545] hover:bg-gray-50 transition-colors"
            >
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* To */}
          <div className="flex-1 min-w-0">
            <label className="block text-xs text-gray-500 mb-1">To</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="w-full text-sm font-semibold text-gray-900 bg-transparent border-b border-gray-200 pb-2 focus:outline-none focus:border-orange-500"
            />
          </div>

          {/* Depart */}
          <div className="flex-1 min-w-0">
            <label className="block text-xs text-gray-500 mb-1">Depart</label>
            <input
              type="date"
              value={departDate}
              onChange={(e) => setDepartDate(e.target.value)}
              className="w-full text-sm font-semibold text-gray-900 bg-transparent border-b border-gray-200 pb-2 focus:outline-none focus:border-orange-500 [color-scheme:light]"
              placeholder="Select Date"
            />
          </div>

          {/* Return */}
          {tripType === 'return' && (
            <div className="flex-1 min-w-0">
              <label className="block text-xs text-gray-500 mb-1">Return</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full text-sm font-semibold text-gray-900 bg-transparent border-b border-gray-200 pb-2 focus:outline-none focus:border-orange-500 [color-scheme:light]"
                placeholder="Select Date"
              />
            </div>
          )}

          {/* Passengers & Class */}
          <div className="flex-1 min-w-0 relative">
            <label className="block text-xs text-gray-500 mb-1">Passengers &amp; Class</label>
            <button
              type="button"
              onClick={() => setShowPassengers(!showPassengers)}
              className="w-full text-left text-sm font-semibold text-gray-900 bg-transparent border-b border-gray-200 pb-2 focus:outline-none hover:border-orange-300 transition-colors"
            >
              {passengers} Passenger{passengers > 1 ? 's' : ''}, {travelClass}
            </button>

            {showPassengers && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setShowPassengers(false)} />
                <div className="absolute top-full left-0 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-xl z-50 p-4">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-gray-700">Passengers</span>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setPassengers(Math.max(1, passengers - 1))}
                        className="w-7 h-7 rounded-full border border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500 transition-colors"
                      >
                        −
                      </button>
                      <span className="w-5 text-center text-sm font-semibold">{passengers}</span>
                      <button
                        type="button"
                        onClick={() => setPassengers(Math.min(9, passengers + 1))}
                        className="w-7 h-7 rounded-full border border-gray-300 text-gray-600 hover:border-orange-500 hover:text-orange-500 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="mb-4">
                    <span className="block text-sm text-gray-700 mb-2">Class</span>
                    <div className="flex flex-col gap-1.5">
                      {['Economy', 'Premium Economy', 'Business', 'First'].map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => setTravelClass(c)}
                          className={`text-left text-sm px-2 py-1.5 rounded-md transition-colors ${
                            travelClass === c
                              ? 'bg-orange-50 text-orange-600 font-medium'
                              : 'text-gray-600 hover:bg-gray-50'
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => setShowPassengers(false)}
                    className="w-full py-2 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-md transition-colors"
                  >
                    Done
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Search button */}
          <div className="shrink-0">
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 px-7 py-3.5 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold rounded-xl transition-colors whitespace-nowrap"
            >
              Search Flights
              <Plane className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchFlightHotelsSection;