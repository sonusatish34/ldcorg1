// components/TempleDetailsTabs/TempleInfo.jsx
 function TempleInfo({ data }) {
  return (
    <div className="space-y-4">
      <p className="text-lg text-gray-800 leading-relaxed">
        {data}
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-pink-50 rounded shadow">
          <h4 className="font-semibold text-pink-600">Highlight</h4>
          <p>Mini Tirupati Experience</p>
        </div>
        <div className="p-4 bg-pink-50 rounded shadow">
          <h4 className="font-semibold text-pink-600">District</h4>
          <p>Eluru, Andhra Pradesh</p>
        </div>
      </div>
    </div>
  );
}

// components/TempleDetailsTabs/SevaDarshanam.jsx
 function SevaDarshanam({ data }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-pink-700">Daily Sevas</h3>
      <ul className='flex gap-x-3'>
        <li className='border-2 border-gray-100 shadow-md rounded-lg p-2'>
          <p className='flex flex-col gap-y-4'>
            <span>Athi Seeghra Darshanam</span>
            <span>Rs. 200.00</span>
          </p>
        </li>
        <li className='border-2 border-gray-100 shadow-md rounded-lg p-2'>
          <p className='flex flex-col gap-y-4'>
            <span>Athi Seeghra Darshanam</span>
            <span>Rs. 200.00</span>
          </p>
        </li>
      </ul>
    </div>
  );
}

// components/TempleDetailsTabs/Facilities.jsx
 function Facilities({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {data.split(',').map((facility, i) => (
        <div
          key={i}
          className="bg-white border-l-4 border-pink-600 p-4 shadow-sm rounded"
        >
          <p className="text-gray-700 font-medium">{facility.trim()}</p>
        </div>
      ))}
    </div>
  );
}

// components/TempleDetailsTabs/PlacesToVisit.jsx
 function PlacesToVisit({ data }) {
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold text-pink-700">Nearby Attractions</h3>
      <ul className="text-gray-700 list-inside list-square">
        {data.split(',').map((place, i) => (
          <li key={i}>{place.trim()}</li>
        ))}
      </ul>
    </div>
  );
}

// components/TempleDetailsTabs/ItineraryDetails.jsx
 function ItineraryDetails({ data }) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-pink-700">Suggested Plan</h3>
      {data.split(';').map((step, i) => (
        <div
          key={i}
          className="p-3 bg-gray-50 rounded border border-gray-200 shadow-sm"
        >
          {step.trim()}
        </div>
      ))}
    </div>
  );
}

// pages/temple/[id].jsx
import { useState } from 'react';
import Image from 'next/image';
import ctr from '../../../../public/chinna-tirupati-murti.webp';


const tabs = [
  { name: 'Temple Info', key: 'info' },
  { name: 'Seva & Darshanam', key: 'seva' },
  { name: 'Facilities', key: 'facilities' },
  { name: 'Places to Visit', key: 'places' },
  { name: 'Itinerary Details', key: 'itinerary' },
];

const templeData = {
  image: '/deity.jpg',
  name: 'Dwaraka Tirumala',
  deity: 'Sri Venkateswara Swamy Vari Devasthanam',
  location: 'Dwaraka Tirumala',
  info:
    'Dwaraka Tirumala is a census town in Eluru district of the Indian state of Andhra Pradesh... This is often referred by the locals as Chinna Tirupati, meaning mini Tirupati',
  seva: 'Suprabhata Seva, Thomala Seva, Archana, Kalyanotsavam, Dolotsavam',
  facilities: 'Accommodation, prasadam counters, cloakrooms, free meals, medical aid',
  places: 'Bhimavaram Temple, Kolleru Lake, Eluru Gaja Vallabha Temple, Rajahmundry River Cruise',
  itinerary: 'Day 1: Arrival → Darshan → Local visit; Day 2: Return',
};

export default function TempleDetailPage() {
  const [activeTab, setActiveTab] = useState('info');

  return (
    <div className="flex min-h-screen bg-gray-100">
      <aside className="w-64 bg-white shadow p-4 space-y-2">
        <h2 className="text-xl font-bold text-pink-600 mb-4">Temple Details</h2>
        {tabs.map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`w-full text-left px-4 py-2 rounded transition font-medium ${
              activeTab === tab.key
                ? 'bg-pink-600 text-white'
                : 'hover:bg-pink-100 text-gray-700'
            }`}
          >
            {tab.name}
          </button>
        ))}
      </aside>

      <main className="flex-1 p-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          <div className="w-full lg:w-1/3">
            <Image
              src={ctr}
              alt={templeData.name}
              width={400}
              height={500}
              className="rounded shadow"
            />
            <div className="mt-4">
              <h1 className="text-2xl font-bold text-gray-800">{templeData.name}</h1>
              <p className="text-sm text-gray-600">{templeData.deity}</p>
              <p className="text-sm text-gray-500 italic">{templeData.location}</p>
            </div>
          </div>

          <div className="w-full lg:w-2/3 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-pink-600 mb-4">
              {tabs.find((tab) => tab.key === activeTab).name}
            </h2>

            {activeTab === 'info' && <TempleInfo data={templeData.info} />}
            {activeTab === 'seva' && <SevaDarshanam data={templeData.seva} />}
            {activeTab === 'facilities' && <Facilities data={templeData.facilities} />}
            {activeTab === 'places' && <PlacesToVisit data={templeData.places} />}
            {activeTab === 'itinerary' && <ItineraryDetails data={templeData.itinerary} />}
          </div>
        </div>
      </main>
    </div>
  );
}
