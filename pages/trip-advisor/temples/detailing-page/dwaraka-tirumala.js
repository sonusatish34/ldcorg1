'use client'

import { useState } from 'react'
import { CalendarDays, MapPin, Utensils, Mountain } from 'lucide-react'

const itinerary = {
  '1': {
    title: '1‑Day Express Trip',
    subtitle: 'Hyderabad → Vijayawada',
    days: [
      {
        title: 'Full Day Plan',
        steps: [
          { type: 'food', text: 'Early breakfast in Hyderabad: Hot masala dosas & filter coffee.' },
          { type: 'travel', text: 'Drive to Vijayawada (~5 hrs, 275 km via NH 65).' },
          { type: 'temple', text: 'Visit Yadagirigutta: Sri Lakshmi Narasimha Swamy Temple.' },
          { type: 'food', text: 'Lunch at Suruchi Restaurant: Andhra biryani and curries.' },
          { type: 'temple', text: 'Visit Kanaka Durga Temple on Indrakeeladri hill.' },
          { type: 'explore', text: 'Explore Undavalli Caves – rock-cut marvel with reclining Vishnu.' },
          { type: 'explore', text: 'Evening at Prakasam Barrage & Krishnaveni Mandapam.' },
          { type: 'travel', text: 'Return to Hyderabad or optional overnight stay.' }
        ]
      }
    ]
  },
  '3': {
    title: '3‑Day Leisure Trip',
    subtitle: 'Hyderabad → Mangala Giri → Vijayawada',
    days: [
      {
        title: 'Day 1: Hyderabad → Mangala Giri → Vijayawada',
        steps: [
          { type: 'food', text: 'Breakfast in Hyderabad with idly, vada, and coffee.' },
          { type: 'temple', text: 'Stop at Yadagirigutta Temple (~1 hr).' },
          { type: 'temple', text: 'Visit Panakala Narasimha Temple in Mangala Giri.' },
          { type: 'food', text: 'Lunch at local eatery. Arrive Vijayawada, check-in.' },
          { type: 'temple', text: 'Evening Kanaka Durga Temple darshan & walk on Prakasam Barrage.' }
        ]
      },
      {
        title: 'Day 2: Vijayawada Local Sightseeing',
        steps: [
          { type: 'food', text: 'Breakfast at hotel or local café.' },
          { type: 'explore', text: 'Undavalli Caves & Mogalrajapuram or Akkanna-Madanna Caves.' },
          { type: 'food', text: 'Lunch at Suruchi Restaurant.' },
          { type: 'explore', text: 'Victoria Jubilee Museum & Bhavani Island boat ride.' },
          { type: 'explore', text: 'Kondapalli Fort trek. Dinner at river-front restaurant.' }
        ]
      },
      {
        title: 'Day 3: Vijayawada → Nagarjuna Sagar or Return',
        steps: [
          { type: 'food', text: 'Breakfast, then drive (~2 hrs) to Nagarjuna Sagar Dam.' },
          { type: 'explore', text: 'Scenic waterfall visit & lunch near dam.' },
          { type: 'travel', text: 'Drive back to Hyderabad with tea/snack stops.' },
          { type: 'food', text: 'Dinner in Hyderabad.' }
        ]
      }
    ]
  }
}

const iconMap = {
  food: <Utensils className="w-4 h-4 text-pink-600" />,
  temple: <MapPin className="w-4 h-4 text-yellow-600" />,
  travel: <CalendarDays className="w-4 h-4 text-blue-600" />,
  explore: <Mountain className="w-4 h-4 text-green-600" />
}

export default function ItineraryDisplay() {
  const [selected, setSelected] = useState('1')

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center text-pink-700 mb-4">
        Hyderabad to Vijayawada Itinerary
      </h1>

      <div className="flex justify-center gap-4 mb-6">
        {['1', '3'].map((day) => (
          <button
            key={day}
            onClick={() => setSelected(day)}
            className={`px-4 py-2 rounded-full font-medium border transition ${
              selected === day
                ? 'bg-pink-600 text-white border-pink-600'
                : 'text-pink-600 bg-white border-pink-600 hover:bg-pink-50'
            }`}
          >
            {day}-Day Plan
          </button>
        ))}
      </div>

      <div className="bg-white shadow rounded-xl p-6 space-y-6">
        <h2 className="text-2xl font-semibold text-pink-700">
          {itinerary[selected].title} <span className="text-gray-600 text-lg">({itinerary[selected].subtitle})</span>
        </h2>

        {itinerary[selected].days.map((day, idx) => (
          <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className="text-lg font-bold mb-3 text-gray-800">{day.title}</h3>
            <ul className="space-y-3">
              {day.steps.map((step, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-700">
                  <div>{iconMap[step.type]}</div>
                  <p>{step.text}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
