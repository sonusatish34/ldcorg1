import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import one from '../../public/temples/1.jpg'
import two from '../../public/temples/2.jpg'
import three from '../../public/temples/3.jpg'
import four from '../../public/temples/4.jpg'
const temples = [
    {
        name: 'Sri Durga malleswara swamy',
        location: 'Vijayawada, Aandhara Pradesh',
        image: one
    },
    {
        name: 'Kanipakam Ganesha Temple',
        location: 'Vijayawada, Aandhara Pradesh',
        image: two
    },
    {
        name: 'Tirumala Tirupati Swamy Temple',
        location: 'Vijayawada, Aandhara Pradesh',
        image: three
    },
    {
        name: 'Sree Abhayanjaneya Swamy Temple',
        location: 'Vijayawada, Aandhara Pradesh',
        image: two
    },
    {
        name: 'Sree Sapthagiri Venkateshwara Temple',
        location: 'Vijayawada, Aandhara Pradesh',
        image: 'https://holidaysdna.com/wp-content/uploads/temples-in-india-1.jpg'
    },
    {
        name: 'Sree Sapthagiri Venkateshwara Temple',
        location: 'Vijayawada, Aandhara Pradesh',
        image: 'https://holidaysdna.com/wp-content/uploads/temples-in-india-1.jpg'
    },
    {
        name: 'Sree Sapthagiri Venkateshwara Temple',
        location: 'Vijayawada, Aandhara Pradesh',
        image: 'https://holidaysdna.com/wp-content/uploads/temples-in-india-1.jpg'
    },
    {
        name: 'Sree Sapthagiri Venkateshwara Temple',
        location: 'Vijayawada, Aandhara Pradesh',
        image: 'https://holidaysdna.com/wp-content/uploads/temples-in-india-1.jpg'
    },
    {
        name: 'Sree Sapthagiri Venkateshwara Temple',
        location: 'Vijayawada, Aandhara Pradesh',
        image: 'https://holidaysdna.com/wp-content/uploads/temples-in-india-1.jpg'
    },
    {
        name: 'Sree Sapthagiri Venkateshwara Temple',
        location: 'Vijayawada, Aandhara Pradesh',
        image: 'https://holidaysdna.com/wp-content/uploads/temples-in-india-1.jpg'
    },
    {
        name: 'Sree Sapthagiri Venkateshwara Temple',
        location: 'Vijayawada, Aandhara Pradesh',
        image: 'https://holidaysdna.com/wp-content/uploads/temples-in-india-1.jpg'
    },
];

export default function TemplesPage() {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Sticky Navbar */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolling ? 'bg-white shadow-md' : 'bg-transparent'} py-3 px-6 flex justify-between items-center`}>
                <div className="text-xl font-bold text-pink-600">Puja Services</div>
                <div className="space-x-4 text-sm text-gray-700 font-medium">
                    <Link href="#">Home</Link>
                    <Link href="#">About Us</Link>
                    <Link href="#">Services</Link>
                    <Link href="#">Temples</Link>
                    <Link href="#">Contact</Link>
                </div>
            </nav>
            <header className="pt-24 bg-cover bg-center text-white p-6 text-center relative" style={{ backgroundImage: "url('https://network10.in/uploads/post_img/174842796528259.webp')" }}>
                {/* <header className="pt-24 bg-gradient-to-r from-pink-600 to-yellow-500 text-white p-6 text-center"> */}
                {/* <div className="absolute inset-0 bg-black bg-opacity-10 backdrop-blur-[px]"></div> */}
                <div className='z-20'>

                <h1 className="text-3xl font-bold">Temples</h1>
                <p className="text-sm mt-2">Explore our partner temples across Andhara Pradesh</p>
                <div className="mt-4 flex justify-center">
                    <input
                        type="text"
                        placeholder="Enter God Name or Location"
                        className="px-4 py-2 rounded-l-md w-80 text-black"
                    />
                    <button className="bg-pink-700 px-4 py-2 rounded-r-md">
                        🔍
                    </button>
                </div>
                </div>
            </header>

            <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 lg:px-20 lg:py-10 gap-10 p-6">
                {temples.map((temple, idx) => (
                    <div
                        key={idx}
                        className="bg-white shadow-xl rounded-xl overflow-hidden transform transition hover:scale-105"
                    >
                        <div className="h-56 w-full relative">
                            <Image src={temple.image} alt={temple.name} layout="fill" objectFit="cover" />
                        </div>
                        <div className="p-4">
                            <h2 className="text-lg font-semibold text-gray-800">{temple.name}</h2>
                            <p className="text-sm text-gray-500">{temple.location}</p>
                            <button className="mt-4 w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700">
                                MORE
                            </button>
                        </div>
                    </div>
                ))}
            </main>
        </div>
    );
}
