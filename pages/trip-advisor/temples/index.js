


import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';

const temples = [
    {
        name: 'Sri Durga malleswara swamy',
        location: 'Vijayawada, Aandhara Pradesh',
        image: "/temples/kanaka-durga.jpg",
        link: '/trip-advisor/temples/sri-durga-malleswara-swamy'
    },
    {
        name: 'Kanipakam vinayaka temple',
        location: 'Chittoor, Aandhara Pradesh',
        image: "/temples/kanipakam.jpg",
        link: '/trip-advisor/temples/kanipakam-vinayaka-temple'
    },
    {
        name: 'sri kalahasthi swamy temple',
        location: 'Chittoor, Aandhara Pradesh',
        image: "/temples/sri-kalahasti.jpg",
        link: '/trip-advisor/temples/sri-kalahasthi-swamy-temple'
    },
    {
        name: 'Sri malakarjuna swamy srisailam',
        location: 'Kurnool , Aandhara Pradesh',
        image: "/temples/srisailam.jpg",
        link: '/trip-advisor/temples/sri-malakarjuna-swamy-srisailam'
    },
    {
        name: 'Mahanandi swamy temple',
        location: 'Nandyal, Aandhara Pradesh',
        image: "/temples/mahanandi.jpg",
        link: '/trip-advisor/temples/mahanandi-swamy-temple'
    },
    {
        name: 'kasapuram nettikanti anjaneya swamy temple',
        location: 'Anantapur, Aandhara Pradesh',
        image: "/temples/kaskapuram.jpg",
        link: '/trip-advisor/temples/kasapuram-nettikanti-anjaneya-swamy-temple'
    },
    {
        name: 'Dwaraka tirumala',
        location: 'Eluru , Aandhara Pradesh',
        image: "/temples/dwaraka-tirumala.jpg",
        link: '/trip-advisor/temples/dwaraka-tirumala'
    },
    {
        name: 'Annavaram satya narayana swamy',
        location: 'Kakinada, Aandhara Pradesh',
        image: "/temples/annavaram.jpg",
        link: '/trip-advisor/temples/annavaram-satya-narayana-swamy'
    },
    {
        name: 'Simhachalam varaha laxminarasimha swami temple',
        location: 'Visakhapatnam, Aandhara Pradesh',
        image: "/temples/simhachalam.jpg",
        link: '/trip-advisor/temples/simhachalam-varaha-laxminarasimha-swami-temple'
    },
    {
        name: 'Kanaka Mahalakshmi',
        location: 'Visakhapatnam , Aandhara Pradesh',
        image: "/temples/kanakamahalakmi.jpg",
        link: '/trip-advisor/temples/kanaka-mahalakshmi'
    },
    {
        name: 'lakshmi narasimha swamy temple mangalagiri',
        location: 'Guntur, Aandhara Pradesh',
        image: "/temples/kanaka-durga.jpg",
        link: '/trip-advisor/temples/lakshmi-narasimha-swamy-temple-mangalagiri'
    },
];


export default function TemplesPage() {
    const [scrolling, setScrolling] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredTemples, setFilteredTemples] = useState(temples);

    useEffect(() => {
        const handleScroll = () => {
            setScrolling(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        const lowerSearch = searchTerm.toLowerCase();
        setFilteredTemples(
            temples.filter(temple =>
                temple.name.toLowerCase().includes(lowerSearch) ||
                temple.location.toLowerCase().includes(lowerSearch)
            )
        );
    }, [searchTerm]);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Navbar */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolling ? 'bg-white shadow-md' : 'bg-transparent'} py-4 px-6 flex justify-between items-center`}>
                <div className="text-2xl font-bold text-pink-700">Devotional Services</div>
                <div className="space-x-6 text-sm text-gray-800 font-medium hidden md:flex">
                    <Link href="#">Home</Link>
                    <Link href="#">About Us</Link>
                    <Link href="#">Services</Link>
                    <Link href="#">Temples</Link>
                    <Link href="#">Contact</Link>
                </div>
            </nav>

            {/* Hero/Header Section */}
            <header className="pt-24 pb-10 bg-cover bg-center text-white text-center relative" style={{ backgroundImage: "url('https://network10.in/uploads/post_img/174842796528259.webp')" }}>
                <div className="bg-black/40 absolute inset-0 z-0" />
                <div className="z-10 relative">
                    <h1 className="text-4xl font-bold mb-2">Temples in Andhra Pradesh</h1>
                    <p className="text-lg">Explore famous temples and book your tickets online</p>
                    <div className="mt-6 flex justify-center items-center max-w-md mx-auto">
                        <input
                            type="text"
                            placeholder="Search by temple name or location"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="px-4 py-2 w-full rounded-l-md text-black shadow focus:outline-none"
                        />
                        <button className="bg-pink-700 px-4 py-2 rounded-r-md text-white font-semibold">
                            🔍
                        </button>
                    </div>
                </div>
            </header>

            {/* Main Grid */}
            <main className="px-6 lg:px-28 py-10 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
                {filteredTemples.length > 0 ? filteredTemples.map((temple, idx) => (
                    <div
                        key={idx}
                        className="bg-white shadow-lg rounded-xl overflow-hidden transform transition hover:scale-[1.03] hover:shadow-2xl duration-300"
                    >
                        <div className="h-60 w-full relative">
                            <Image src={temple.image} alt={temple.name} layout="fill" objectFit="cover" />
                        </div>
                        <div className="p-4 flex flex-col justify-between h-40">
                            <div>
                                <h2 className="text-lg font-bold text-gray-800 capitalize truncate">{temple.name}</h2>
                                <p className="text-sm text-gray-500">{temple.location}</p>
                            </div>
                            <Link href={temple.link} className="mt-4 inline-block text-center bg-[#537D8D] hover:bg-[#41606c] transition text-white py-2 rounded-lg">
                                Book Tickets
                            </Link>
                        </div>
                    </div>
                )) : (
                    <div className="col-span-full text-center text-gray-600 text-xl py-10">
                        No temples found for "<strong>{searchTerm}</strong>"
                    </div>
                )}
            </main>
        </div>
    );
}
