


import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FaMapPin } from "react-icons/fa";
import { SiGooglemaps } from "react-icons/si";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/autoplay'; // Optional: autoplay styles
import 'swiper/css/pagination';

const temples = [
    {
        name: 'Sri Durga malleswara swamy',
        location: 'Vijayawada, Andhra Pradesh',
        image: [
            "/temples/kanaka-durga1.webp",
            "/temples/kanaka-durga2.jpg",
            "/temples/kanaka-durga3.jpg"
        ],
        link: '/trip-advisor/temples/detailing-page/sri-durga-malleswara-swamy',
        maplink: 'https://maps.app.goo.gl/Hv1cAKHisAJmPAGn7'
    },
    {
        name: 'Kanipakam vinayaka temple',
        location: 'Chittoor, Andhra Pradesh',
        image: [
            "/temples/kanipakam.jpg",
            "/temples/kanipakam2.jpg",
            "/temples/kanipakam3.jpg"
        ],
        link: '/trip-advisor/temples/detailing-page/kanipakam-vinayaka-temple',
        maplink: 'https://maps.app.goo.gl/WRwUYKoag3nDnUeB9'
    },
    {
        name: 'sri kalahasthi swamy temple',
        location: 'Chittoor, Andhra Pradesh',
        image: [
            "/temples/sri-kalahasti.jpg",
            "/temples/srikalahasti1.jpg",
            "/temples/srikalahasti2.jpg"
        ],
        link: '/trip-advisor/temples/detailing-page/sri-kalahasthi-swamy-temple',
        maplink: 'https://maps.app.goo.gl/w74WWV6xYPUQd3VJ9'
    },
    {
        name: 'Sri malakarjuna swamy srisailam',
        location: 'Kurnool , Andhra Pradesh',
        image: [
            "/temples/srisailam1.jpg",
            "/temples/srisailam2.jpg",
            "/temples/srisailam3.webp"
        ],
        link: '/trip-advisor/temples/detailing-page/sri-malakarjuna-swamy-srisailam',
        maplink: 'https://maps.app.goo.gl/g6eiss1kn2wib9wA8'
    },
    {
        name: 'Mahanandi swamy temple',
        location: 'Nandyal, Andhra Pradesh',
        image: [
            "/temples/mahanandi1.jpg",
            "/temples/mahanandi2.jpeg",
            "/temples/mahanandi3.jpg"
        ],
        link: '/trip-advisor/temples/detailing-page/mahanandi-swamy-temple',
        maplink: 'https://maps.app.goo.gl/jeKH7fdthBuAz4H6A'
    },
    {
        name: 'kasapuram nettikanti anjaneya swamy temple',
        location: 'Anantapur, Andhra Pradesh',
        image: [
            "/temples/kasapuram1.jpeg",
            "/temples/kasapuram2.jpg",
            "/temples/kasapuram3.jpg"
        ],
        link: '/trip-advisor/temples/detailing-page/kasapuram-nettikanti-anjaneya-swamy-temple',
        maplink: 'https://maps.app.goo.gl/PUQxLDjANxrwMFut7'
    },
    {
        name: 'Dwaraka tirumala',
        location: 'Eluru , Andhra Pradesh',
        image: [
            "/temples/dwarakatirumala1.jpg",
            "/temples/dwarakatirumala2.jpg",
            "/temples/dwarakatirumala3.jpg"
        ],
        link: '/trip-advisor/temples/detailing-page/dwaraka-tirumala',
        maplink: 'https://maps.app.goo.gl/UbDQyNo5B199vBsNA'
    },
    {
        name: 'Annavaram satya narayana swamy',
        location: 'Kakinada, Andhra Pradesh',
        image: [
            "/temples/annavaram1.jpg",
            "/temples/annavaram2.jpg",
            "/temples/annavaram3.jpeg"
        ],
        link: '/trip-advisor/temples/detailing-page/annavaram-satya-narayana-swamy',
        maplink: 'https://maps.app.goo.gl/H1TyqkhLDcL9onyA6'
    },
    {
        name: 'Simhachalam varaha laxminarasimha swami temple',
        location: 'Visakhapatnam, Andhra Pradesh',
        image: [
            "/temples/simhachalam1.jpg",
            "/temples/simhachalam2.jpg",
            "/temples/simhachalam3.jpg"
        ],
        link: '/trip-advisor/temples/detailing-page/simhachalam-varaha-laxminarasimha-swami-temple',
        maplink: 'https://maps.app.goo.gl/YPJeCzveAFdLVksZA '
    },
    {
        name: 'Kanaka Mahalakshmi',
        location: 'Visakhapatnam , Andhra Pradesh',
        image: [
            "/temples/kanakamahalakmi.jpg",
            "/temples/kanakamahalakmi1.webp"
        ],
        link: '/trip-advisor/temples/detailing-page/kanaka-mahalakshmi',
        maplink: 'https://maps.app.goo.gl/KLLXMRFt9fpzaTjy9'
    },
    {
        name: 'lakshmi narasimha swamy temple mangalagiri',
        location: 'Guntur,Andhra Pradesh',
        image: [
            "/temples/kanaka-durga1.webp",
            "/temples/kanaka-durga2.jpg",
            "/temples/kanaka-durga3.jpg"
        ],
        link: '/trip-advisor/temples/detailing-page/lakshmi-narasimha-swamy-temple-mangalagiri',
        maplink: 'https://maps.app.goo.gl/Nc6ntfwParNBkKSy5'
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
            <header className="pt-24 pb-10 bg-cover bg-center text-white text-center relative" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/thumbnails/047/523/047/large/devotional-background-with-bells-and-mandala-video.jpg')" }}>
                <div className="bg-black/40 absolute inset-0 z-0" />
                <div className="z-10 relative">
                    <h1 className="text-4xl font-bold mb-2">Temples in Andhra Pradesh</h1>
                    <p className="text-lg">Explore famous temples and book your tickets online</p>
                    <div className="mt-6 flex justify-center items-center lg:px-72 px-10">
                        <input
                            type="text"
                            placeholder="Search by temple name"
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
            <main className=" lg:px-28 py-10 grid gap-10 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 place-items-center">
                {filteredTemples.length > 0 ? filteredTemples.map((temple, idx) => (
                    <div
                        key={idx}
                        className="bg-white shadow-lg rounded-xl overflow-hidden transform transition lg:hover:scale-[1.03] hover:shadow-2xl duration-300 h-[500px] w-[350px]"
                    >
                        <div className="h-72 w-full relative">
                            {/* Temple Image Slider */}
                            <Link href={temple.link}>
                                <Swiper
                                    modules={[Autoplay]}
                                    autoplay={{
                                        delay: 1500 + idx * 1000,
                                        disableOnInteraction: false,
                                    }}
                                    loop={true}
                                    spaceBetween={1}
                                    slidesPerView={1}
                                    style={{ padding: '0px 0' }}
                                >
                                    {temple?.image?.map((src, index) => (
                                        <SwiperSlide key={index}>
                                            <Image
                                                width={500}
                                                height={500}
                                                src={src}
                                                alt={`Slide ${index}`}
                                                className="object-cover h-72"
                                            />
                                        </SwiperSlide>
                                    ))}
                                </Swiper>

                            </Link>

                        </div>
                        <div className="p-4 flex flex-col gap-y-1 justify-between h-40">
                            <div className='pt-1'>
                                <h2 className="text-lg font-bold text-gray-800 capitalize truncate">{temple.name}</h2>
                                <p className="text-sm text-gray-500 flex flex-col gap-y-1">{
                                    temple.location.split(',').map((part, index) => (
                                        <span key={index} className="text-gray-700">
                                            {part.trim()}
                                        </span>
                                    ))
                                }</p>
                            </div>
                            <Link href={temple?.maplink ? temple.maplink : '/'} className='flex gap-x-2 py-2 items-center border w-fit p-2 rounded-md shadow'><span><SiGooglemaps color='red' /></span><span>Location</span></Link>
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
