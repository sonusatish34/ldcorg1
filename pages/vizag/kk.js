// pages/index.tsx
import React from 'react';
import Image from 'next/image';
import Map from './Map'
const cars = [
    {
        id: 1,
        name: 'Swift Dzire',
        address: 'H No 12/3, Green Hills, Kukatpally, Hyderabad - 500072',
        phone: '+91 9876543210',
    },
    {
        id: 2,
        name: 'Hyundai Creta',
        address: 'Plot No 55, Madhapur, Near Inorbit Mall, Hyderabad - 500081',
        phone: '+91 9876543211',
    },
    {
        id: 3,
        name: 'Tata Nexon',
        address: 'Lane 2, Banjara Hills, Hyderabad - 500034',
        phone: '+91 9876543212',
    },
    {
        id: 4,
        name: 'Toyota Innova',
        address: 'Road No 3, Jubilee Hills, Hyderabad - 500033',
        phone: '+91 9876543213',
    },
];

export default function Home() {
    return (
        <div>
            <h1 className="text-3xl font-bold mb-6 text-black">Available Cars in Hyderabad</h1>
            <div className="flex flex-col md:flex-row h-screen">
                {/* Left List */}
                <div className="w-full md:w-2/5 overflow-y-auto p-6 bg-white">
                    {cars.map((car) => (
                        <div
                            key={car.id}
                            className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
                        >
                            <h2 className="text-xl font-semibold text-black">{car.name}</h2>
                            <p className="text-gray-700 mt-1">{car.address}</p>
                            <p className="text-gray-600 mt-1">{car.phone}</p>
                            <p className="text-gray-500 mt-1">Available until 11:00 PM</p>
                            <div className="flex gap-2 mt-3">
                                <button className="bg-red-600 text-white px-3 py-1 rounded">Navigate</button>
                                <button className="bg-gray-800 text-white px-3 py-1 rounded">Website</button>
                                <button className="bg-green-600 text-white px-3 py-1 rounded">Book</button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Right Static Map */}
                <div className="w-full md:w-3/ h-[400px] md:h-full relative">
                    <Image
                        src="/map-placeholder.png"
                        alt="Map"
                        layout="fill"
                        objectFit="cover"
                    />
                    <Map />
                </div>
            </div>
        </div>
    );
}
