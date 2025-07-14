'use client'
import React, { useState } from 'react'
import { FaClock, FaUtensils, FaHotel, FaMapMarkedAlt, FaChevronDown, FaChevronUp } from 'react-icons/fa'

const VijayawadaItinerary = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-4xl mx-auto my-8 border">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">📍 Vijayawada Travel Itinerary</h2>
      
      <div className="text-gray-700">
        <p><FaMapMarkedAlt className="inline mr-2 text-blue-500" />Kanaka Durga Temple, Bhavani Island, Undavalli Caves, Kondapalli Fort, more...</p>
        <p className="mt-2"><FaClock className="inline mr-2 text-green-500" />Duration: 1 to 3 Days</p>
        <p><FaUtensils className="inline mr-2 text-red-500" />Includes: Breakfast, Lunch, Dinner – Local Andhra Cuisine</p>
      </div>

      {/* Toggle Button */}
      <button 
        onClick={() => setOpen(!open)} 
        className="mt-4 flex items-center text-blue-600 hover:text-blue-800 font-medium"
      >
        {open ? <FaChevronUp className="mr-2" /> : <FaChevronDown className="mr-2" />}
        {open ? 'Hide Full Itinerary' : 'Open Full Itinerary'}
      </button>

      {/* Full Itinerary */}
      {open && (
        <div className="mt-6 space-y-6">
          {/* Day 1 */}
          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">🗓️ Day 1 – Explore Vijayawada</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>07:00 AM –</strong> South Indian breakfast (₹600–₹700 for 5)</li>
              <li><strong>08:30 AM –</strong> Kanaka Durga Temple (Free, 1 hr)</li>
              <li><strong>10:00 AM –</strong> Prakasam Barrage + Bhavani Island (Boat ride + optional water sports)</li>
              <li><strong>12:00 PM –</strong> Undavalli Caves (₹5–10 entry)</li>
              <li><strong>01:00 PM –</strong> Andhra thali lunch (₹1000–₹1500)</li>
              <li><strong>02:00 PM –</strong> Bapu Museum visit (₹10–20)</li>
              <li><strong>03:00 PM –</strong> Gandhi Hill viewpoint (₹10–20)</li>
              <li><strong>04:00 PM –</strong> Kondapalli Fort (₹5 per adult)</li>
              <li><strong>06:00 PM –</strong> Shopping at Besant Road or PVP Mall</li>
              <li><strong>07:30 PM –</strong> Dinner at local restaurant (₹1500–₹2000)</li>
              <li><FaHotel className="inline mr-2 text-indigo-500" />Stay: Gateway Hotel – ₹4000</li>
            </ul>
          </div>

          {/* Day 2 */}
          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">🗓️ Day 2 – History & Fun</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Breakfast:</strong> Idli Dosa & Co – ₹500</li>
              <li><strong>Prakasam Barrage</strong> – Free Entry</li>
              <li><strong>Kondapalli Fort</strong> – ₹20 per person + toy shop visit</li>
              <li><strong>Lunch:</strong> Sweet Magic – ₹1500</li>
              <li><strong>Haailand Theme Park</strong> – ₹750/person (₹3750 total)</li>
              <li><strong>Dinner:</strong> R.R. Durbar – ₹1000</li>
              <li><FaHotel className="inline mr-2 text-indigo-500" />Stay: Treebo Empire – ₹3000</li>
            </ul>
          </div>

          {/* Day 3 */}
          <div className="bg-gray-50 p-4 rounded shadow-sm">
            <h3 className="text-xl font-semibold text-purple-700 mb-2">🗓️ Day 3 – Culture & Leisure</h3>
            <ul className="list-disc list-inside space-y-1">
              <li><strong>Breakfast:</strong> Sri Ramayya Mess – ₹450</li>
              <li><strong>Mangalagiri Temple</strong> + handloom shopping</li>
              <li><strong>Rajiv Gandhi Park</strong> – ₹10/person</li>
              <li><strong>Lunch:</strong> Minerva Grand – ₹1500</li>
              <li><strong>INOX Movie @ PVP Mall</strong> – ₹1250 + ₹500 snacks</li>
              <li><strong>Evening Tea:</strong> Barista MG Road – ₹700</li>
              <li><strong>Dinner:</strong> TFL Rooftop Dining – ₹1300</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default VijayawadaItinerary;
