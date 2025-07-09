// components/TempleDetailsTabs/TempleInfo.jsx
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import ReactMarkdown from 'react-markdown';
// import UserDropdown from "@comp/UserDropDown";
// pages/temple/[id].jsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ctr from '../../../public/chinna-tirupati-murti.webp';
import Link from "next/link";
import td from './temples.json';
import { useRouter } from "next/router";
import { da } from "date-fns/locale";
import UserDropdown from "./detailing-page/comp/UserDropDown";
import ImageSwiper from "./detailing-page/comp/ImageSwiper";
import { CalendarDays, MapPin, Utensils, Mountain } from 'lucide-react'
import { ChevronDownIcon } from "@heroicons/react/24/solid";


function TempleInfo({ name }) {
    return (
        <div className="space-y-4">
            <p className="font-bold text-2xl">Temple Information</p>
            <p className="text-lg text-gray-800 leading-relaxed">
                Dwaraka Tirumala is a famous temple town in Andhra Pradesh, known for the shrine of Lord Venkateswara, also called Chinna Tirupati. It is a peaceful place where thousands of devotees come to pray and seek blessings. The temple is located on a small hill and surrounded by greenery, making it a beautiful and spiritual place. Many people visit this temple during festivals and special occasions. The place is well-connected by road and is a great destination for a short spiritual trip with family or friends.
            </p>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#A94A4A] text-white rounded shadow capitalize">
                    <h4 className="font-semibold">Highlight</h4>
                    <p>Dwaraka Tirumala</p>
                </div>
                <div className="p-4 bg-[#A94A4A] rounded text-white shadow">
                    <h4 className="font-semibold">Chittor, Andhra Pradesh</h4>
                    <p>{'N/A'}</p>
                </div>
            </div>
        </div>
    );
}




function ItinerarySelector() {
    const itinerary = {
        '1': {
            title: '1‑Day Dwaraka Tirumala Darshan Plan',
            subtitle: 'Hyderabad → Dwaraka Tirumala (Same Day / Overnight)',
            days: [
                {
                    title: '1‑Day Itinerary: Hyderabad → Dwaraka Tirumala → Eluru/Hyderabad',
                    steps: [
                        { type: 'travel', text: 'Start early from Hyderabad around 5:00 AM.' },
                        { type: 'food', text: 'Breakfast at N Grill Restaurant, Suryapet (7:30 AM).' },
                        { type: 'travel', text: 'Continue the drive towards Eluru enjoying the scenic highway.' },
                        { type: 'food', text: 'Lunch at Hotel Abhiruchi, Eluru (12:30 PM).' },
                        { type: 'travel', text: 'Drive from Eluru to Dwaraka Tirumala (approx 45 mins).' },
                        { type: 'temple', text: 'Darshan at Lord Venkateswara Temple (Chinna Tirupati) at 2:00 PM.' },
                        { type: 'explore', text: 'Explore prasadam counters and temple surroundings.' },
                        { type: 'travel', text: 'Leave for Eluru around 6:00 PM.' },
                        { type: 'food', text: 'Dinner at Rama Vilas Veg Restaurant, Eluru.' },
                        { type: 'travel', text: 'Optionally stay overnight in Eluru or return to Hyderabad based on energy.' }
                    ]
                }
            ]
        },
        '3': {
            title: '3‑Day Dwaraka Tirumala Leisure Tour',
            subtitle: 'Hyderabad → Eluru → Dwaraka Tirumala (With Sightseeing)',
            days: [
                {
                    title: 'Day 1: Hyderabad → Eluru',
                    steps: [
                        { type: 'travel', text: 'Start from Hyderabad at 6:00 AM.' },
                        { type: 'food', text: 'Breakfast at 7 Food Court, Nalgonda Highway (around 8:00 AM).' },
                        { type: 'travel', text: 'Drive towards Eluru, arriving by 1:00 PM.' },
                        { type: 'food', text: 'Lunch at Kinnera Grand, Eluru.' },
                        { type: 'travel', text: 'Check-in at hotel in Eluru (e.g., Hotel Grand Arya).' },
                        { type: 'explore', text: 'Visit Eluru Ashram or Mini Tank Bund by evening.' },
                        { type: 'food', text: 'Dinner at Babai Hotel, Eluru (famous for Andhra meals).' }
                    ]
                },
                {
                    title: 'Day 2: Eluru → Dwaraka Tirumala → Eluru',
                    steps: [
                        { type: 'food', text: 'Breakfast at hotel in Eluru.' },
                        { type: 'travel', text: 'Depart for Dwaraka Tirumala around 8:00 AM (1 hr drive).' },
                        { type: 'temple', text: 'Darshan at Dwaraka Tirumala Temple (9:00 AM).' },
                        { type: 'explore', text: 'Visit temple gopuram, surroundings and relax.' },
                        { type: 'food', text: 'Lunch at Temple Annadanam or prasadam counters.' },
                        { type: 'explore', text: 'Optional visit to Godavari riverbank or relax at temple cottages.' },
                        { type: 'explore', text: 'Evening visit to Kotilingala Revu (quiet scenic spot).' },
                        { type: 'travel', text: 'Return to Eluru by 6:30 PM.' },
                        { type: 'food', text: 'Dinner at Aromas Restaurant, Eluru.' }
                    ]
                },
                {
                    title: 'Day 3: Eluru → Hyderabad (With Nature Stop)',
                    steps: [
                        { type: 'food', text: 'Breakfast at hotel and check out.' },
                        { type: 'explore', text: 'Visit Kolleru Lake Viewpoint (birdwatching, 30 min drive).' },
                        { type: 'food', text: 'Lunch at Highway Grand, Nandigama (on return route).' },
                        { type: 'travel', text: 'Drive back towards Hyderabad via Vijayawada highway.' },
                        { type: 'food', text: 'Evening tea/snacks at Gourmet Tiffins, Suryapet.' },
                        { type: 'travel', text: 'Reach Hyderabad by 7:00 PM.' }
                    ]
                }
            ]
        }
    };


    const iconMap = {
        food: <Utensils className="w-4 h-4 text-[#A94A4A]" />,
        temple: <MapPin className="w-4 h-4 text-yellow-600" />,
        travel: <CalendarDays className="w-4 h-4 text-blue-600" />,
        explore: <Mountain className="w-4 h-4 text-green-600" />
    };
    const [selected, setSelected] = useState('1')


    return (
        <div className="max-w-5xl mx-auto px-4 py-8">
            <h1 className="text-4xl font-bold text-center  text-[#A94A4A] mb-4">
                Hyderabad to Dwaraka Tirumala Itinerary
            </h1>

            <div className="flex justify-center items-center gap-8  py-5">
                {['1', '3']?.map((day) => (
                    <button
                        key={day}
                        onClick={() => setSelected(day)}
                        className={`px-4 py-2 rounded-full font-medium border transition ${selected === day
                                ? 'bg-[#A94A4A] text-white border-pink-600'
                                : 'text-[#A94A4A] bg-white border-pink-600 hover:bg-[#A94A4A] hover:text-white'
                            }`}
                    >
                        {day}-Day Plan
                    </button>
                ))}
            </div>

            <div className="bg-white shadow rounded-xl p-6 space-y-6">
                <h2 className="text-2xl font-semibold text-[#A94A4A]">
                    {itinerary[selected].title} <span className="text-gray-600 text-lg">({itinerary[selected].subtitle})</span>
                </h2>

                {itinerary[selected].days?.map((day, idx) => (
                    <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
                        <h3 className="text-lg font-bold mb-3 text-gray-800">{day.title}</h3>
                        <ul className="space-y-3">
                            {day.steps?.map((step, i) => (
                                <li key={i} className="flex items-center jus gap-2 text-gray-700">
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



const sevaList = [
    { name: 'Athi Seegra Darshanam', price: 200 },
    { name: 'Seegra Darshanam', price: 100 },
];

function SevaDarshanam({ name }) {
    // ✅ Manually provided Sevas and Prices

    const [activeIndex, setActiveIndex] = useState(null);
    const [quantities, setQuantities] = useState([]);
    const [checkoutData, setCheckoutData] = useState(null);

    useEffect(() => {
        if (sevaList.length > 0) {
            setQuantities(sevaList.map(() => ({ adults: 1, children: 0 })));
        }
    }, [sevaList]);

    const handleQuantityChange = (index, type, value) => {
        const newQuantities = [...quantities];
        if (!newQuantities[index]) return;
        newQuantities[index][type] = Number(value);
        setQuantities(newQuantities);
    };

    const handleBookClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const handleSubmit = (index) => {
        const seva = sevaList[index];
        const templename = name || 'Unknown Temple';
        const { adults, children } = quantities[index] || { adults: 0, children: 0 };
        const total = seva.price * (adults + children);

        const order = {
            templename,
            seva: seva.name,
            adults,
            children,
            price: seva.price,
            total,
            date: new Date().toLocaleString(),
        };

        const existing = JSON.parse(sessionStorage.getItem('sevaOrders') || '[]');
        sessionStorage.setItem('sevaOrders', JSON.stringify([...existing, order]));

        setCheckoutData(order);
        setActiveIndex(null);
    };

    const closePopup = () => setCheckoutData(null);

    return (
        <div className="space-y-3 relative py-10">
            <h3 className="text-2xl font-semibold text-[#A94A4A]">Sevas & Darshanam</h3>
            <ul className="flex flex-wrap gap-8">
                {sevaList.map((seva, index) => (
                    <li key={index} className="border-2 border-gray-100 shadow-md rounded-lg p-4">
                        <div className="flex flex-col items-center gap-y-4 w-[280px]">
                            <span className="text-md font-medium">{seva.name}</span>
                            <span>₹ {seva.price.toFixed(2)}</span>
                            <button
                                className="text-white border-2 border-gray-100 rounded-md w-fit px-3 py-1 flex items-center gap-x-2 bg-[#A94A4A]"
                                onClick={() => handleBookClick(index)}
                            >
                                Book Now <IoArrowForwardCircleOutline />
                            </button>

                            {activeIndex === index && (
                                <div className="border border-gray-100 p-2 rounded-md space-y-2 animate-fade-in">
                                    <div className="flex items-center gap-3">
                                        <label className="w-20">Adults:</label>
                                        <input
                                            type="number"
                                            min={0}
                                            value={quantities[index]?.adults || 0}
                                            onChange={(e) => handleQuantityChange(index, 'adults', e.target.value)}
                                            className="border rounded px-2 py-1 w-20"
                                        />
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <label className="w-20">Children:</label>
                                        <input
                                            type="number"
                                            min={0}
                                            value={quantities[index]?.children || 0}
                                            onChange={(e) => handleQuantityChange(index, 'children', e.target.value)}
                                            className="border rounded px-2 py-1 w-20"
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleSubmit(index)}
                                        className="mt-2 bg-green-600 text-white px-4 py-1 rounded-md"
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {checkoutData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl relative">
                        <button onClick={closePopup} className="absolute top-2 right-3 text-red-600 text-xl">✕</button>
                        <h2 className="text-xl font-semibold text-center text-[#A94A4A] mb-4">Order Summary</h2>
                        <div className="space-y-2 text-gray-800">
                            <p><strong>Temple:</strong> {checkoutData.templename}</p>
                            <p><strong>Seva:</strong> {checkoutData.seva}</p>
                            <p><strong>Adults:</strong> {checkoutData.adults}</p>
                            <p><strong>Children:</strong> {checkoutData.children}</p>
                            <p><strong>Price per ticket:</strong> ₹{checkoutData.price}</p>
                            <p><strong>Total:</strong> ₹{checkoutData.total}</p>
                            <p><strong>Date:</strong> {checkoutData.date}</p>
                        </div>
                        <div className="mt-5 flex justify-center">
                            <button onClick={closePopup} className="bg-[#A94A4A] text-white px-4 py-2 rounded-md">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}



function PlacesToVisit() {
  const places = [
    "🦢 Kolleru Lake",
    "🐦 Kolleru Bird Sanctuary",
    "🏛️ Guntupalli Caves",
    "🕍 Somaramam Temple"
  ];

  return (
    <div className="pt-4">
      <div className="space-y-4 py-6 px-6 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-2xl">
        <h3 className="text-2xl font-bold text-blue-600 border-b pb-2">
          Nearby Attractions
        </h3>
        <ul className="space-y-3">
          {places.map((place, i) => (
            <li
              key={i}
              className="flex items-center text-lg text-gray-800 hover:text-blue-600 transition-colors duration-200"
            >
              <span className="mr-3">📍</span>
              {place}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}



function Facilities({ name }) {
    const facilities = Array.isArray(td?.[name]) ? td[name][0]?.facilities || [] : [];

    return (
        <div className="p-3 bg-white rounded-md">
            <p className="font-semibold text-xl py-2">Facilities</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {["Accommodation", "Cloakrooms", "Medical Aid", "Prasadam Counters", "Free Meals"].map((facility, i) => (
                    <div
                        key={i}
                        className="bg-white border-l-4 border-[#A94A4A] p-4 shadow-sm rounded"
                    >
                        <p className="text-gray-700 font-medium">{facility.trim()}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

function FAQ() {

    const faqs = [
        {
            question: "What is Dwaraka Tirumala famous for?",
            answer:
                "Dwaraka Tirumala is famous for the temple of Lord Venkateswara, also known as Chinna Tirupati. It is a popular pilgrimage site in Andhra Pradesh.",
        },
        {
            question: "What are the temple timings of Dwaraka Tirumala?",
            answer:
                "The temple is usually open from 4:00 AM to 9:00 PM. However, timings may vary during festivals and special events.",
        },
        {
            question: "How to reach Dwaraka Tirumala?",
            answer:
                "Dwaraka Tirumala is well-connected by road. It is about 40 km from Eluru and can be reached easily by bus, taxi, or private car.",
        },
        {
            question: "Is there any dress code to enter the temple?",
            answer:
                "Yes, visitors are advised to wear traditional and modest clothes while visiting the temple to maintain the sacred atmosphere.",
        }
    ];
    const [openIndex, setOpenIndex] = useState(null);

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="max-w-2xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-semibold text-center mb-6">FAQs</h2>
            <div className="space-y-4">
                {faqs.map((faq, index) => (
                    <div
                        key={index}
                        className="border rounded-md overflow-hidden transition-all duration-300"
                    >
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="w-full flex justify-between items-center p-4 bg-gray-100 hover:bg-gray-200 transition"
                        >
                            <span className="text-left font-medium">{faq.question}</span>
                            <ChevronDownIcon
                                className={`w-5 h-5 transform transition-transform duration-300 ${openIndex === index ? "rotate-180" : ""
                                    }`}
                            />
                        </button>
                        <div
                            className={`px-4 pt-0 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 py-2" : "max-h-0"
                                }`}
                        >
                            <p className="text-gray-700">{faq.answer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}




export default function TempleDetailPage() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState('info');

    const templeNames = [
        'Dwaraka Tirumala', 'Tirumala', 'Kanaka Durga Temple',
        'Simhachalam Temple', 'Mangalagiri Temple',
        'Srikalahasti', 'Annavaram', 'Ahobilam'
    ];

    const templateName = router?.query?.templename;
    const templeDataArray = templateName && td?.[templateName];
    const templeData = Array.isArray(templeDataArray) ? templeDataArray[0] : null;

    return (
        <div className="helvetica-font">
            <header className="bg-white shadow sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                    <div className="flex items-center gap-4">
                        <Link href="/trip-advisor/temples">
                            <img src="/templelogo.jpg" alt="Logo" className="h-16 w-16" />
                        </Link>
                    </div>
                    <nav className="hidden md:flex items-center gap-6 text-base font-medium text-gray-700">
                        <a href="#" className="hover:text-[#A94A4A]">Temples</a>
                        <a href="#" className="hover:text-[#A94A4A]">Sevas & Darshanam</a>
                        <a href="#" className="hover:text-[#A94A4A]">Donations</a>
                        <a href="#" className="hover:text-[#A94A4A]">Online Booking</a>
                        <a href="#" className="hover:text-[#A94A4A]">Support</a>
                    </nav>
                    <UserDropdown />
                </div>
            </header>

            <div className="bg-[#A94A4A] text-white py-2 overflow-hidden relative group">
                <div className="flex w-max animate-marquee group-hover:pause-marquee">
                    {[...templeNames, ...templeNames]?.map((name, idx) => (
                        <Link href={'/dkl'} key={idx} className="mx-8 font-semibold whitespace-nowrap">
                            🛕 {name}
                        </Link>
                    ))}
                </div>
            </div>

            <div className="flex min-h-screen bg-gray-100">
                <main className="flex lg:px-20 p-6">
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                        <div className="w-full lg:w-1/3">
                            <Image
                                src={'/temples/kanipakam.jpg'}
                                alt="Temple"
                                width={400}
                                height={400}
                                className="rounded"
                            />
                            <div className="mt-4 flex flex-col gap-y-1 pb-4">
                                <h1 className="text-2xl font-bold text-gray-800 capitalize">
                                    Dwaraka Tirumala Temple
                                </h1>
                                <p className="text-sm text-gray-600 italic">
                                    Eluru ,Andhra Pradesh
                                </p>
                                <Link
                                    href={`tel:9849005496`}
                                    className="text-sm text-gray-800"
                                >
                                    9849005496
                                </Link>
                            </div>
                            <Facilities />
                            <PlacesToVisit />
                        </div>

                        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow p-6">
                            <TempleInfo />
                            <SevaDarshanam />
                            <ItinerarySelector />
                            <FAQ />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

