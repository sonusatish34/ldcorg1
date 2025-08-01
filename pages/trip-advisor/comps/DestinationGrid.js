'use client';

import Image from 'next/image';
import { useState } from 'react';

const destinations = [
  {
    name: 'Vizag',
    price: '₹11,295',
    image: 'https://vsez.gov.in/wp-content/uploads/2025/05/VIZAG.jpg',
    highlight: true,
    link:''
  },
  {
    name: 'Goa',
    price: '₹6,133',
    image: 'https://opinionexpress.in/assets/images/article/goa-is-back-to-its-peak.jpg',
  },
  {
    name: 'Bangalore',
    price: '₹6,551',
    image: 'https://kots.s3.amazonaws.com/uploads/kots/blogs/full/17055520726163Bengaluru-s-Real-Estate-Renaissance-A-Glimpse-into-2023.jpg',
  },
  {
    name: 'Tamilnadu',
    price: '₹6,916',
    image: 'https://media.assettype.com/theceo/2024-05/daa15412-aa3e-4e3a-bcec-d4506286a716/TAMIL_nadu_ceo.jpg?w=1200&h=675&auto=format%2Ccompress&fit=max&enlarge=true',
  },
];

export default function DestinationGrid() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="w-full px-4 py-4 lg:py-10 bg-white rounded-xl">
      <h2 className="text-xl lg:text-4xl font-bold mb-4">Plan as per the best destinations in India</h2>

      <div className="grid lg:grid-cols-2 gap-3 lg:gap-6 lg:pt-5">
        {destinations.map((dest, index) => (
          <div
            key={index}
            className="rounded-xl overflow-hidden relative"
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <img
              src={dest.image}
              alt={dest.name}
              width={300}
              height={200}
              className="h-[220px] mxs:h-[320px] object-cover w-full"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent text-white p-3 text-sm">
              <h3 className="font-semibold">{dest.name}</h3>
              <p className="text-[13px]">From <strong>{dest.price}</strong> /- per day</p>
              {hoveredIndex === index && (
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
