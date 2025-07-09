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
                Simhachalam Varaha Lakshmi Narasimha Swamy Temple is a famous and powerful Hindu temple near Visakhapatnam, Andhra Pradesh. It is dedicated to Lord Narasimha, an avatar of Lord Vishnu. The temple shows a rare form of the god, combining Varaha (boar) and Narasimha (lion-man). The idol is always covered with sandalwood paste and revealed only once a year during Chandanotsavam. The temple is built on a hill and offers a peaceful and divine atmosphere. Many devotees visit to seek blessings for protection, good health, and happiness.
            </p>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-[#A94A4A] text-white rounded shadow capitalize">
                    <h4 className="font-semibold">Highlight</h4>
                    <p className="capitalize">Simhachalam Temple</p>
                </div>
                <div className="p-4 bg-[#A94A4A] rounded text-white shadow">
                    <h4 className="font-semibold">District</h4>
                    <p>Simhachalam, Andhra Pradesh</p>
                </div>
            </div>
        </div>
    );
}




 function ItinerarySelector() {
  
  const [selected, setSelected] = useState('3')
const itinerary = {
  '3': {
    title: '3‑Day Simhachalam Temple Trip',
    subtitle: 'Hyderabad → Vijayawada → Vizag → Simhachalam',
    days: [
      {
        title: 'Day 1: Hyderabad → Vijayawada',
        steps: [
          { type: 'travel', text: 'Start early morning from Hyderabad by car.' },
          { type: 'food', text: 'Breakfast at Nellore Mess, Suryapet (South Indian tiffins).' },
          { type: 'travel', text: 'Reach Vijayawada by noon.' },
          { type: 'food', text: 'Lunch at Sweet Magic near Benz Circle.' },
          { type: 'temple', text: 'Visit Kanaka Durga Temple in the evening.' },
          { type: 'food', text: 'Dinner at TFL – The Food Lounge, Vijayawada.' },
          { type: 'travel', text: 'Overnight stay in a hotel in Vijayawada.' }
        ]
      },
      {
        title: 'Day 2: Vijayawada → Visakhapatnam (Vizag)',
        steps: [
          { type: 'food', text: 'Breakfast at hotel in Vijayawada.' },
          { type: 'travel', text: 'Drive towards Vizag with a lunch stop at Hotel Vihar, Rajahmundry.' },
          { type: 'travel', text: 'Reach Vizag by evening and check into hotel.' },
          { type: 'explore', text: 'Evening beach walk near RK Beach.' },
          { type: 'food', text: 'Dinner at Venkatadri Vantillu (Andhra cuisine).' }
        ]
      },
      {
        title: 'Day 3: Simhachalam Temple Visit + Return Prep',
        steps: [
          { type: 'food', text: 'Breakfast at hotel in Vizag.' },
          { type: 'temple', text: 'Morning visit to Simhachalam Varaha Lakshmi Narasimha Swamy Temple.' },
          { type: 'food', text: 'Lunch at Raju’s Kitchen near the temple.' },
          { type: 'travel', text: 'Begin return journey to Hyderabad (or rest overnight in Vizag).' }
        ]
      }
    ]
  },

  '5': {
    title: '5‑Day Simhachalam Spiritual & Scenic Tour',
    subtitle: 'Hyderabad → Vijayawada → Rajahmundry → Vizag → Simhachalam',
    days: [
      {
        title: 'Day 1: Hyderabad → Vijayawada',
        steps: [
          { type: 'travel', text: 'Early departure from Hyderabad.' },
          { type: 'food', text: 'Breakfast at 7 Food Court, Nalgonda.' },
          { type: 'travel', text: 'Reach Vijayawada by noon.' },
          { type: 'food', text: 'Lunch at RR Durbar.' },
          { type: 'temple', text: 'Visit Kanaka Durga Temple.' },
          { type: 'explore', text: 'Evening at Bhavani Island.' },
          { type: 'food', text: 'Dinner at Minerva Grand.' }
        ]
      },
      {
        title: 'Day 2: Vijayawada → Rajahmundry',
        steps: [
          { type: 'food', text: 'Breakfast at hotel in Vijayawada.' },
          { type: 'temple', text: 'Stop for darshan at Annavaram Temple on the way.' },
          { type: 'food', text: 'Lunch at Subbayya Gari Hotel, Rajahmundry.' },
          { type: 'explore', text: 'Evening Godavari river cruise.' },
          { type: 'food', text: 'Dinner at hotel in Rajahmundry.' }
        ]
      },
      {
        title: 'Day 3: Rajahmundry → Vizag',
        steps: [
          { type: 'food', text: 'Breakfast at hotel.' },
          { type: 'travel', text: 'Drive to Vizag with lunch stop at Sri Kanya Restaurant, Tuni.' },
          { type: 'explore', text: 'Visit Kailasagiri Hill Park and enjoy the cable car.' },
          { type: 'food', text: 'Dinner at FSM (Flying Spaghetti Monster) or Dharani for Andhra food.' }
        ]
      },
      {
        title: 'Day 4: Simhachalam Temple + Vizag Local',
        steps: [
          { type: 'temple', text: 'Morning darshan at Simhachalam Temple.' },
          { type: 'explore', text: 'Visit Yarada Beach and lunch at The Shack.' },
          { type: 'explore', text: 'Evening visit to Submarine Museum.' },
          { type: 'food', text: 'Dinner at Vista – The Park Hotel (beachside).' }
        ]
      },
      {
        title: 'Day 5: Return to Hyderabad',
        steps: [
          { type: 'food', text: 'Breakfast at hotel in Vizag.' },
          { type: 'food', text: 'Brunch at Sri Bhavani Tiffins, Rajahmundry.' },
          { type: 'food', text: 'Lunch at Srikanya Comforts, Eluru.' },
          { type: 'travel', text: 'Reach Hyderabad by night with optional dinner en route.' }
        ]
      }
    ]
  },

  '7': {
    title: '7‑Day Simhachalam Pilgrimage + Coastal Retreat',
    subtitle: 'Hyderabad → Vijayawada → Rajahmundry → Vizag → Simhachalam + Araku',
    days: [
      {
        title: 'Day 1: Hyderabad → Vijayawada',
        steps: [
          { type: 'travel', text: 'Start early from Hyderabad.' },
          { type: 'food', text: 'Breakfast at Gowri Shankar Tiffins, Suryapet.' },
          { type: 'food', text: 'Lunch at Babai Hotel, Vijayawada.' },
          { type: 'temple', text: 'Visit Kanaka Durga Temple and Prakasam Barrage.' },
          { type: 'food', text: 'Dinner at Barbeque Nation.' }
        ]
      },
      {
        title: 'Day 2: Vijayawada → Rajahmundry',
        steps: [
          { type: 'temple', text: 'Darshan at Annavaram Temple with prasadam lunch en route.' },
          { type: 'travel', text: 'Continue to Rajahmundry and check in.' },
          { type: 'explore', text: 'Evening walk at Godavari Bridge.' },
          { type: 'food', text: 'Dinner at Hotel River Bay.' }
        ]
      },
      {
        title: 'Day 3: Rajahmundry Local Exploration',
        steps: [
          { type: 'temple', text: 'Visit ISKCON Temple and Pushkar Ghat.' },
          { type: 'explore', text: 'Take cultural boat ride with onboard lunch or at Sitara Grand.' },
          { type: 'explore', text: 'Evening stop at Papi Hills viewpoint.' },
          { type: 'food', text: 'Dinner at hotel.' }
        ]
      },
      {
        title: 'Day 4: Rajahmundry → Vizag via Tuni',
        steps: [
          { type: 'food', text: 'Breakfast en route, optional revisit to Annavaram.' },
          { type: 'food', text: 'Lunch at Sri Kanya Comforts, Tuni.' },
          { type: 'explore', text: 'Evening beach walk at RK Beach.' },
          { type: 'food', text: 'Dinner at The Fisherman’s Wharf, Vizag.' }
        ]
      },
      {
        title: 'Day 5: Simhachalam Temple + Vizag Sites',
        steps: [
          { type: 'temple', text: 'Visit Simhachalam Temple in the morning.' },
          { type: 'food', text: 'Lunch at Dakshin (Andhra meals).' },
          { type: 'explore', text: 'Visit Kailasagiri, Rushikonda Beach, and VUDA Park.' },
          { type: 'food', text: 'Dinner at Ming Garden (Chinese cuisine).' }
        ]
      },
      {
        title: 'Day 6: Optional Araku Valley Day Trip',
        steps: [
          { type: 'travel', text: 'Early departure for Araku Valley.' },
          { type: 'explore', text: 'Visit Borra Caves, Coffee Museum, and Padmapuram Gardens.' },
          { type: 'food', text: 'Lunch at Haritha Resort, Araku.' },
          { type: 'travel', text: 'Return to Vizag by evening.' },
          { type: 'food', text: 'Dinner and overnight stay in Vizag.' }
        ]
      },
      {
        title: 'Day 7: Return to Hyderabad',
        steps: [
          { type: 'food', text: 'Breakfast at hotel.' },
          { type: 'travel', text: 'Begin return via road or take train/flight from Vizag.' },
          { type: 'food', text: 'Brunch at Tuni or Annavaram, lunch at Rajahmundry, and dinner near Vijayawada.' },
          { type: 'travel', text: 'Reach Hyderabad by late night.' }
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

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center  text-[#A94A4A] mb-4">
        Hyderabad to Simhachalam Itinerary
      </h1>

      <div className="flex justify-center items-center gap-8  py-5">
        {['3','5','7']?.map((day) => (
          <button
            key={day}
            onClick={() => setSelected(day)}
            className={`px-4 py-2 rounded-full font-medium border transition ${
              selected === day
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
    { name: 'Special darshan ticket', price: 100 },
    { name: 'Garbha‑Gudi express ticket', price: 300 },
    { name: 'Suprabhata', price: 30 },
    { name: 'Nitya Kalyanam', price: 1000 },
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
    "🏖️ Rishikonda Beach",
    "🗿 Kailasagiri Hill Park",
    "🐯 Indira Gandhi Zoological Park",
    "🌄 Dolphin's Nose Viewpoint"
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
                {['lockers','sjksja','jdslsjaol','djkidsji'].map((facility, i) => (
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
        question: "What is special about Simhachalam Temple?",
        answer:
            "The temple is unique because the main deity, Lord Narasimha, appears in a rare combined form of Varaha (boar) and Narasimha (lion-man), and is covered with sandalwood paste throughout the year.",
    },
    {
        question: "When is the deity revealed without sandalwood paste?",
        answer:
            "The idol is uncovered only once a year during the festival of Chandanotsavam, usually in April or May, allowing devotees to see the original form of the deity.",
    },
    {
        question: "What are the temple timings?",
        answer:
            "The temple is usually open from 7:00 AM to 8:30 PM, but timings may vary during festivals and special occasions.",
    },
    {
        question: "How can I reach the temple from Visakhapatnam?",
        answer:
            "Simhachalam Temple is about 18 km from Visakhapatnam and can be reached by car, bus, or auto-rickshaw. Local buses also operate frequently.",
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
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  openIndex === index ? "rotate-180" : ""
                }`}
              />
            </button>
            <div
              className={`px-4 pt-0 overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === index ? "max-h-96 py-2" : "max-h-0"
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
                                src={'/temples/simhachalam.jpg'}
                                alt="Temple"
                                width={400}
                                height={400}
                                className="rounded"
                            />
                            <div className="mt-4 flex flex-col gap-y-1 pb-4">
                                <h1 className="text-2xl font-bold text-gray-800 capitalize">
                                    Simhachalam Varaha Lakshmi Narasimha Swamy Temple
                                </h1>
                                <p className="text-sm text-gray-600 italic">
                                    Simhachalam ,Andhra Pradesh
                                </p>
                                    <Link
                                        href={`tel:9849005495`}
                                        className="text-sm text-gray-800"
                                    >
                                        9849005495
                                    </Link>
                            </div>
                            <Facilities  />
                            <PlacesToVisit  />
                        </div>

                        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow p-6">
                            <TempleInfo  />
                            <SevaDarshanam  />
                            <ItinerarySelector />
                            <FAQ />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

