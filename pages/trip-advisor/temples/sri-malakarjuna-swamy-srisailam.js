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
                Sri Mallikarjuna Swamy Temple in Srisailam is a very famous and holy temple in Andhra Pradesh. It is one of the 12 Jyotirlingas of Lord Shiva and also one of the 18 Shakti Peethas. The temple is located on a hill and surrounded by beautiful forests. Lord Shiva is worshipped here as Mallikarjuna and Goddess Parvati as Bhramaramba. Many people visit this temple for blessings, peace, and spiritual power. The temple has ancient carvings, a big courtyard, and a peaceful atmosphere. It is a great place for both pilgrims and nature lovers. Srisailam is also known for its ropeway, dam, and boating in the Krishna River.
            </p>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#A94A4A] text-white rounded shadow capitalize">
                    <h4 className="font-semibold">Highlight</h4>
                    <p className="capitalize">Sri Mallikarjuna Swamy Temple</p>
                </div>
                <div className="p-4 bg-[#A94A4A] rounded text-white shadow">
                    <h4 className="font-semibold">District</h4>
                    <p>Kurnool, Andhra Pradesh</p>
                </div>
            </div>
        </div>
    );
}




function ItinerarySelector() {
    const itinerary = {
        '1': {
            title: '1‑Day Srisailam Darshan Plan',
            subtitle: 'Hyderabad → Srisailam (Same Day Return)',
            days: [
                {
                    title: '1‑Day Itinerary: Hyderabad → Srisailam → Hyderabad',
                    steps: [
                        { type: 'travel', text: 'Start early from Hyderabad around 5:00 AM.' },
                        { type: 'food', text: 'Breakfast at Hill Park Restaurant, Kalwakurthy (around 7:00 AM).' },
                        { type: 'temple', text: 'Darshan at Sri Mallikarjuna Swamy and Bhramar Amba Devi temples (by 10:30 AM).' },
                        { type: 'food', text: 'Lunch at Haritha Hotel, Srisailam (1:00 PM).' },
                        { type: 'explore', text: 'Visit Pathala Ganga via ropeway or steps.' },
                        { type: 'explore', text: 'Optional: Short visit to Sikharam viewpoint.' },
                        { type: 'travel', text: 'Begin return journey by 4:30 PM.' },
                        { type: 'food', text: 'Snack break at Forest Checkpost Cafe, Domal Penta.' },
                        { type: 'food', text: 'Dinner at Hotel Abhiruchi, Kalwakurthy (around 8:00 PM).' },
                        { type: 'travel', text: 'Reach Hyderabad by 10:30 PM.' }
                    ]
                }
            ]
        },
        '3': {
            title: '3‑Day Srisailam Nature & Temple Tour',
            subtitle: 'Hyderabad → Srisailam (Trek, Safari & Caves)',
            days: [
                {
                    title: 'Day 1: Hyderabad → Srisailam',
                    steps: [
                        { type: 'travel', text: 'Depart from Hyderabad by 6:00 AM.' },
                        { type: 'food', text: 'Breakfast at 7 Food Court, Kalwakurthy (8:00 AM).' },
                        { type: 'explore', text: 'Scenic ghat road drive; stop at Octopus Viewpoint.' },
                        { type: 'travel', text: 'Reach Srisailam by 12:30 PM; check-in at Haritha Resort.' },
                        { type: 'food', text: 'Lunch at Haritha Restaurant.' },
                        { type: 'temple', text: 'Evening darshan at Sri Mallikarjuna & Bhramaramba Devi Temples.' },
                        { type: 'explore', text: 'Sunset trek to Sikharam (around 2 km).' },
                        { type: 'food', text: 'Dinner at Sri Sai Mess or resort restaurant.' }
                    ]
                },
                {
                    title: 'Day 2: Forest Safari + Akkamahadevi Caves',
                    steps: [
                        { type: 'food', text: 'Early breakfast by 7:30 AM.' },
                        { type: 'explore', text: 'Safari at Srisailam Tiger Reserve (9:00 AM – 11:00 AM).' },
                        { type: 'food', text: 'Lunch at Forest View Restaurant.' },
                        { type: 'explore', text: 'Pathala Ganga Ropeway + boat + trek to Akkamahadevi Caves.' },
                        { type: 'food', text: 'Evening snacks near ropeway station.' },
                        { type: 'food', text: 'Dinner at Shivam Dhaba or resort.' }
                    ]
                },
                {
                    title: 'Day 3: Nature Spots & Return',
                    steps: [
                        { type: 'explore', text: 'Morning trek to Phaladhara Panchadhara springs.' },
                        { type: 'food', text: 'Breakfast at stay (9:30 AM).' },
                        { type: 'explore', text: 'Visit Akkamahadevi Caves again (optional).' },
                        { type: 'explore', text: 'Visit Mallela Theertham Waterfalls (short forest hike).' },
                        { type: 'food', text: 'Lunch at Hotel Surya Grand, Kalwakurthy (2:00 PM).' },
                        { type: 'food', text: 'Evening tea at Hill Park on NH765.' },
                        { type: 'travel', text: 'Arrive in Hyderabad by 6:30 PM.' }
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
                Hyderabad to Srisailam Itinerary
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
    { name: 'Athiseeghra Darshan (Only Alankara Darshan )', price: 300 },
    { name: 'Seeghra Darshanam', price: 150 },
    { name: 'Sparsha Darshanam ( Single Person Only)', price: 500 },
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
    "🌊 Pathala Ganga River",
    "🕯️ Akka Mahadevi Caves",
    "🌄 Srisailam Viewpoints",
    "🐅 Srisailam Tiger Reserve"
  ];

  return (
    <div className="pt-4">
      <div className="space-y-4 py-6 px-6 bg-gradient-to-br from-white to-indigo-50 shadow-xl rounded-2xl">
        <h3 className="text-2xl font-bold text-indigo-600 border-b pb-2">
          Nearby Attractions
        </h3>
        <ul className="space-y-3">
          {places.map((place, i) => (
            <li
              key={i}
              className="flex items-center text-lg text-gray-800 hover:text-indigo-600 transition-colors duration-200"
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
            question: "What is special about Sri Mallikarjuna Swamy Temple?",
            answer:
                "This temple is one of the 12 Jyotirlingas of Lord Shiva and one of the 18 Shakti Peethas, making it a very powerful and sacred place for Hindus.",
        },
        {
            question: "What are the temple timings for darshan?",
            answer:
                "The temple is usually open from 4:30 AM to 10:00 PM, with specific timings for Suprabhata Seva, Archana, and evening Aarti. It's best to check the official website or local updates before visiting.",
        },
        {
            question: "How can I reach Srisailam Temple?",
            answer:
                "You can reach Srisailam by road from Hyderabad (around 215 km). Buses and private vehicles are available. The nearest railway station is Markapur Road, and the nearest airport is in Hyderabad.",
        },
        {
            question: "Is there any online booking for darshan or accommodation?",
            answer:
                "Yes, online booking is available for darshan tickets and rooms through the official temple website: www.srisailadevasthanam.org.",
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
                                src={'/temples/srisailam.jpg'}
                                alt="Temple"
                                width={400}
                                height={400}
                                className="rounded"
                            />
                            <div className="mt-4 flex flex-col gap-y-1 pb-4">
                                <h1 className="text-2xl font-bold text-gray-800 capitalize">
                                    Sri malakarjuna swamy srisailam
                                </h1>
                                <p className="text-sm text-gray-600 italic">
                                    Kurnool ,Andhra Pradesh
                                </p>
                                <Link
                                    href={`tel:9849005496`}
                                    className="text-sm text-gray-800"
                                >
                                    +91 - 9849005496
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

