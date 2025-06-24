'use client';

import Image from 'next/image';
import { useState } from 'react';
const destinations = [
  {
    name: 'Jammu & Kashmir',
    price: '₹11,295',
    image: '/images/jammu.jpg',
    highlight: true,
  },
  {
    name: 'Ladakh',
    price: '₹6,133',
    image: '/images/ladakh.jpg',
  },
  {
    name: 'Kerala',
    price: '₹6,551',
    image: '/images/kerala.jpg',
  },
  {
    name: 'Rajasthan',
    price: '₹6,916',
    image: '/images/rajasthan.jpg',
  },
];

export default function DestinationGrid() {
  const [showPrice, setShowPrice] = useState(false);
  return (
    <div className="w-full px-4 py-4 bg-white rounded-xl">
      <h2 className="text-xl font-bold mb-4">Plan as per the best destinations in India</h2>
      <div className="grid grid-cols-2 gap-3">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden relative"
            onMouseEnter={() => setShowPrice(true)}
            onMouseLeave={() => setShowPrice(false)}
          >
            <Image
              src={'/keralashot.jpg'}
              alt={dest.name}
              width={300}
              height={200}
              className="h-[140px] object-cover w-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-3 text-sm">
              <h3 className="font-semibold">{dest.name}</h3>
              <p className="text-[13px]">From <strong>{dest.price}</strong> /- per day</p>
              {showPrice && (
                <button className="mt-2 bg-yellow-400 text-black font-bold px-3 py-1 text-sm rounded">
                  Plan a trip
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-yellow-400 text-center py-3 rounded-full cursor-pointer text-black font-semibold text-sm">
        Try our free trip planner now!
      </div>
    </div>
  );
}
