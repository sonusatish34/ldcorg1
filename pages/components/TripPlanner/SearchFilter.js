'use client';

import { useState } from 'react';

export default function SearchFilter() {
  const [showFilters, setShowFilters] = useState(false);
  const [tripDuration, setTripDuration] = useState('');
  const [priceRange, setPriceRange] = useState([1000, 10000]);
  const [destinations, setDestinations] = useState([]);

  const availableDestinations = ['Goa', 'Karnataka', 'Leh', 'Kerala', 'Andaman'];

  const toggleDestination = () => {
    setDestinations(prev =>
      prev.includes(dest) ? prev.filter(d => d !== dest) : [...prev, dest]
    );
  };

  return (
    <div className="bg-gray-100 p-4 rounded-2xl shadow-md">
      <div>
        <input
          type="text"
          placeholder="Search experiences"
          className="w-full p-3 border border-gray-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          onFocus={() => setShowFilters(true)}
        />
      </div>

      {showFilters && (
        <div className="mt-4 space-y-6 transition-all duration-300">
          {/* Trip Duration */}
          <div>
            <label className="block mb-2 font-semibold">Trip Duration</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={tripDuration}
              onChange={e => setTripDuration(e.target.value)}>
              <option value="">Select duration</option>
              <option value="1-3">1-3 Days</option>
              <option value="4-7">4-7 Days</option>
              <option value="8+">8+ Days</option>
            </select>
          </div>

          {/* Price Range */}
          <div>
            <label className="block mb-2 font-semibold">Price Range (₹)</label>
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange[0]}
                onChange={e => setPriceRange([+e.target.value, priceRange[1]])}
                className="w-1/2 p-2 border rounded-lg"
              />
              <span>to</span>
              <input
                type="number"
                value={priceRange[1]}
                onChange={e => setPriceRange([priceRange[0], +e.target.value])}
                className="w-1/2 p-2 border rounded-lg"
              />
            </div>
          </div>

          {/* Destination */}
          <div>
            <label className="block mb-2 font-semibold">Destination</label>
            <div className="flex flex-wrap gap-2">
              {availableDestinations.map(dest => (
                <button
                  key={dest}
                  onClick={() => toggleDestination(dest)}
                  className={`px-4 py-2 rounded-full border ${destinations.includes(dest)
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700'
                    }`}
                >
                  {dest}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-4">
            <button className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition">
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
