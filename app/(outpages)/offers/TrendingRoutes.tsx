'use client';

import Link from 'next/link';
import { Plane } from 'lucide-react';

export const TRENDING_ROUTES = [
  {
    id: 1,
    from: 'Mumbai',     fromCode: 'BOM',
    to: 'Bangalore',    toCode: 'BLR',
    date: '05/04/2026', price: 5152,
    currency: '£',
    image: 'https://images.unsplash.com/photo-1529253355930-ddbe423a2ac7?w=200&h=120&fit=crop',
    airline: 'IndiGo', flightNo: '6E-441', duration: '1h 55m', stops: 'Non Stop',
    departure: '06:00', arrival: '07:55',
    fromFull: 'Mumbai [BOM]', toFull: 'Bangalore [BLR]',
    fromTerminal: 'Terminal 1', toTerminal: 'Terminal 2',
    travelClass: 'Economy', checkinBaggage: 'Adult - 15 KG', cabinBaggage: 'Adult - 7 KG',
    baseFare: 4800, tax: 300, insurance: 52,
  },
  {
    id: 2,
    from: 'Chennai',    fromCode: 'MAA',
    to: 'Singapore',   toCode: 'SIN',
    date: '10/04/2026', price: 12000,
    currency: '£',
    image: 'https://images.unsplash.com/photo-1565967511849-76a60a516170?w=200&h=120&fit=crop',
    airline: 'Air India', flightNo: 'AI-348', duration: '4h 35m', stops: 'Non Stop',
    departure: '06:30', arrival: '13:35',
    fromFull: 'Chennai [MAA]', toFull: 'Singapore [SIN]',
    fromTerminal: 'Terminal 2', toTerminal: 'Terminal 2',
    travelClass: 'Economy', checkinBaggage: 'Adult - 25 KG', cabinBaggage: 'Adult - 7 KG',
    baseFare: 11000, tax: 1000, insurance: 53,
  },
  {
    id: 3,
    from: 'Mumbai',     fromCode: 'BOM',
    to: 'Chennai',      toCode: 'MAA',
    date: '05/04/2026', price: 4297,
    currency: '£',
    image: 'https://images.unsplash.com/photo-1582510003544-4d00b7f74220?w=200&h=120&fit=crop',
    airline: 'SpiceJet', flightNo: 'SG-109', duration: '1h 50m', stops: 'Non Stop',
    departure: '08:15', arrival: '10:05',
    fromFull: 'Mumbai [BOM]', toFull: 'Chennai [MAA]',
    fromTerminal: 'Terminal 1', toTerminal: 'Terminal 1',
    travelClass: 'Economy', checkinBaggage: 'Adult - 15 KG', cabinBaggage: 'Adult - 7 KG',
    baseFare: 3900, tax: 350, insurance: 47,
  },
  {
    id: 4,
    from: 'Mumbai',     fromCode: 'BOM',
    to: 'Dubai',        toCode: 'DXB',
    date: '10/04/2026', price: 16682,
    currency: '£',
    image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=200&h=120&fit=crop',
    airline: 'Emirates', flightNo: 'EK-500', duration: '3h 15m', stops: 'Non Stop',
    departure: '09:45', arrival: '13:00',
    fromFull: 'Mumbai [BOM]', toFull: 'Dubai [DXB]',
    fromTerminal: 'Terminal 2', toTerminal: 'Terminal 3',
    travelClass: 'Economy', checkinBaggage: 'Adult - 30 KG', cabinBaggage: 'Adult - 7 KG',
    baseFare: 15000, tax: 1600, insurance: 82,
  },
  {
    id: 5,
    from: 'Mumbai',     fromCode: 'BOM',
    to: 'New Delhi',    toCode: 'DEL',
    date: '05/04/2026', price: 6103,
    currency: '£',
    image: 'https://images.unsplash.com/photo-1587474260584-136574528ed5?w=200&h=120&fit=crop',
    airline: 'Vistara', flightNo: 'UK-995', duration: '2h 10m', stops: 'Non Stop',
    departure: '07:00', arrival: '09:10',
    fromFull: 'Mumbai [BOM]', toFull: 'New Delhi [DEL]',
    fromTerminal: 'Terminal 2', toTerminal: 'Terminal 3',
    travelClass: 'Economy', checkinBaggage: 'Adult - 15 KG', cabinBaggage: 'Adult - 7 KG',
    baseFare: 5600, tax: 450, insurance: 53,
  },
  {
    id: 6,
    from: 'Mumbai',     fromCode: 'BOM',
    to: 'Muscat',       toCode: 'MCT',
    date: '10/04/2026', price: 10082,
    currency: '£',
    image: 'https://images.unsplash.com/photo-1578895101408-1a36b834405b?w=200&h=120&fit=crop',
    airline: 'Oman Air', flightNo: 'WY-231', duration: '2h 55m', stops: 'Non Stop',
    departure: '11:30', arrival: '14:25',
    fromFull: 'Mumbai [BOM]', toFull: 'Muscat [MCT]',
    fromTerminal: 'Terminal 2', toTerminal: 'Terminal 1',
    travelClass: 'Economy', checkinBaggage: 'Adult - 23 KG', cabinBaggage: 'Adult - 7 KG',
    baseFare: 9200, tax: 830, insurance: 52,
  },
  {
    id: 7,
    from: 'Cochin',     fromCode: 'COK',
    to: 'Abu Dhabi',    toCode: 'AUH',
    date: '10/04/2026', price: 18514,
    currency: '£',
    image: 'https://images.unsplash.com/photo-1548608762-9de78b3c9e98?w=200&h=120&fit=crop',
    airline: 'Etihad', flightNo: 'EY-231', duration: '3h 30m', stops: 'Non Stop',
    departure: '14:00', arrival: '17:30',
    fromFull: 'Cochin [COK]', toFull: 'Abu Dhabi [AUH]',
    fromTerminal: 'Terminal 1', toTerminal: 'Terminal 3',
    travelClass: 'Economy', checkinBaggage: 'Adult - 23 KG', cabinBaggage: 'Adult - 7 KG',
    baseFare: 16800, tax: 1650, insurance: 64,
  },
  {
    id: 8,
    from: 'Kolkata',    fromCode: 'CCU',
    to: 'Mumbai',       toCode: 'BOM',
    date: '05/04/2026', price: 7385,
    currency: '£',
    image: 'https://images.unsplash.com/photo-1558431382-27e303142255?w=200&h=120&fit=crop',
    airline: 'IndiGo', flightNo: '6E-702', duration: '2h 40m', stops: 'Non Stop',
    departure: '05:45', arrival: '08:25',
    fromFull: 'Kolkata [CCU]', toFull: 'Mumbai [BOM]',
    fromTerminal: 'Terminal 1', toTerminal: 'Terminal 1',
    travelClass: 'Economy', checkinBaggage: 'Adult - 15 KG', cabinBaggage: 'Adult - 7 KG',
    baseFare: 6800, tax: 530, insurance: 55,
  },
];

export default function TrendingRoutes() {
  return (
    <section className="max-w-8xl mx-auto px-6 py-10">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Trending Routes With Cheap Prices</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {TRENDING_ROUTES.map(route => (
          <Link key={route.id} href={`/flights/${route.id}`}>
            <div className="flex items-center gap-3 border border-gray-200 rounded-xl p-3 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer bg-white group">
              {/* City image */}
              <img
                src={route.image}
                alt={route.to}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                onError={e => { (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=200&h=120&fit=crop'; }}
              />

              {/* Info */}
              <div className="flex-1 min-w-0">
                {/* City names + plane */}
                <div className="flex items-center gap-1 text-sm font-semibold text-gray-800 mb-0.5">
                  <span className="truncate">{route.from}</span>
                  <Plane className="w-3.5 h-3.5 text-blue-500 flex-shrink-0" />
                  <span className="truncate">{route.to}</span>
                </div>

                {/* IATA codes */}
                <div className="flex items-center gap-1 text-xs text-blue-600 font-medium mb-1.5">
                  <span>{route.fromCode}</span>
                  <span>→</span>
                  <span>{route.toCode}</span>
                </div>

                {/* Date + price */}
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{route.date}</span>
                  <span className="text-sm font-bold text-gray-900">£{route.price.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}