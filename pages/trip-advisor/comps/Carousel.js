"use client";
import { useState } from 'react';
import Image from 'next/image';
import destinations from '../comps/destinations.json';

export default function Carousel() {
  const [index, setIndex] = useState(0);

  return (
    <div className="w-full max-w-lg mx-auto mt-4">
      <h2 className="text-2xl font-bold mb-2">
        Trending <span className="text-orange-500">Destinations</span>
      </h2>
      <div className="relative rounded-2xl overflow-hidden shadow-lg">
        <Image
          src={'/keralashot.jpg'}
          alt={destinations[index].name}
          width={600}
          height={300}
          className="object-cover w-full h-64"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 p-4 flex flex-col justify-end">
          <h3 className="text-white text-xl font-bold">{destinations[index].name}</h3>
          <p className="text-white text-sm mb-2">
            Properties {destinations[index].properties}
          </p>
          <p className="text-white text-sm">{destinations[index].description.slice(0, 80)}...</p>
          <button className="mt-3 w-fit px-4 py-2 text-sm text-white border rounded-lg hover:bg-white hover:text-black transition">
            Explore
          </button>
        </div>
      </div>
      <div className="flex justify-center mt-3 space-x-2">
        {destinations.map((_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-3 h-3 rounded-full cursor-pointer ${index === i ? 'bg-blue-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
}
