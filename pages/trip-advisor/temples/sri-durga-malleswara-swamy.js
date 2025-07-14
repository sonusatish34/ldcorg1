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
        Vijayawada Temple, also known as Kanaka Durga Temple, is a famous and powerful temple in Andhra Pradesh. It is located on Indrakeeladri Hill beside the Krishna River. The temple is dedicated to Goddess Kanaka Durga, who is believed to protect her devotees and fulfil their wishes. Many people visit this temple, especially during the Dasara festival. The view from the top is beautiful, and you can see the whole city and the river. The temple has a peaceful and spiritual feeling, and it is easy to reach by road, rail, or flight. A visit to Vijayawada feels complete only after seeing this divine place.
      </p>
      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-[#A94A4A] text-white rounded shadow capitalize">
          <h4 className="font-semibold">Highlight</h4>
          <p>Goddess Kanaka Durga</p>
        </div>
        <div className="p-4 bg-[#A94A4A] rounded text-white shadow">
          <h4 className="font-semibold">Vijayawada, Andhra Pradesh</h4>
          <p>{'N/A'}</p>
        </div>
      </div>
    </div>
  );
}




function ItinerarySelector() {
  const itinerary = {
    '1': {
      title: '1‑Day Express Trip',
      subtitle: 'Hyderabad → Vijayawada',
      days: [
        {
          title: 'Full Day Plan',
          steps: [
            { type: 'food', text: 'Early breakfast in Hyderabad: Hot masala dosas & filter coffee.' },
            { type: 'travel', text: 'Drive to Vijayawada (~5 hrs, 275 km via NH 65).' },
            { type: 'temple', text: 'Visit Yadagirigutta: Sri Lakshmi Narasimha Swamy Temple.' },
            { type: 'food', text: 'Lunch at Suruchi Restaurant: Andhra biryani and curries.' },
            { type: 'temple', text: 'Visit Kanaka Durga Temple on Indrakeeladri hill.' },
            { type: 'explore', text: 'Explore Undavalli Caves – rock-cut marvel with reclining Vishnu.' },
            { type: 'explore', text: 'Evening at Prakasam Barrage & Krishnaveni Mandapam.' },
            { type: 'travel', text: 'Return to Hyderabad or optional overnight stay.' }
          ]
        }
      ]
    },
    '3': {
      title: '3‑Day Leisure Trip',
      subtitle: 'Hyderabad → Mangala Giri → Vijayawada',
      days: [
        {
          title: 'Day 1: Hyderabad → Mangala Giri → Vijayawada',
          steps: [
            { type: 'food', text: 'Breakfast in Hyderabad with idly, vada, and coffee.' },
            { type: 'temple', text: 'Stop at Yadagirigutta Temple (~1 hr).' },
            { type: 'temple', text: 'Visit Panakala Narasimha Temple in Mangala Giri.' },
            { type: 'food', text: 'Lunch at local eatery. Arrive Vijayawada, check-in.' },
            { type: 'temple', text: 'Evening Kanaka Durga Temple darshan & walk on Prakasam Barrage.' }
          ]
        },
        {
          title: 'Day 2: Vijayawada Local Sightseeing',
          steps: [
            { type: 'food', text: 'Breakfast at hotel or local café.' },
            { type: 'explore', text: 'Undavalli Caves & Mogalrajapuram or Akkanna-Madanna Caves.' },
            { type: 'food', text: 'Lunch at Suruchi Restaurant.' },
            { type: 'explore', text: 'Victoria Jubilee Museum & Bhavani Island boat ride.' },
            { type: 'explore', text: 'Kondapalli Fort trek. Dinner at river-front restaurant.' }
          ]
        },
        {
          title: 'Day 3: Vijayawada → Nagarjuna Sagar or Return',
          steps: [
            { type: 'food', text: 'Breakfast, then drive (~2 hrs) to Nagarjuna Sagar Dam.' },
            { type: 'explore', text: 'Scenic waterfall visit & lunch near dam.' },
            { type: 'travel', text: 'Drive back to Hyderabad with tea/snack stops.' },
            { type: 'food', text: 'Dinner in Hyderabad.' }
          ]
        }
      ]
    }
  }

  const iconMap = {
    food: <Utensils className="w-4 h-4 text-[#A94A4A]" />,
    temple: <MapPin className="w-4 h-4 text-yellow-600" />,
    travel: <CalendarDays className="w-4 h-4 text-blue-600" />,
    explore: <Mountain className="w-4 h-4 text-green-600" />
  }
  const [selected, setSelected] = useState('1')


  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center  text-[#A94A4A] mb-4">
        Hyderabad to Vijayawada Itinerary
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
  { name: 'Suprabhata Seva', price: 200 },
  { name: 'Archana Seva', price: 150 },
  { name: 'Special Darshanam', price: 500 },
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
    const templename = name;
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
{        console.log(checkoutData,'djsk')
}        
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






function PlacesToVisit({ name }) {
  const places = [
    { label: "🕉️ Kanaka Durga Temple" },
    { label: "🌉 Prakasam Barrage" },
    { label: "🕊️ Gandhi Hill" },
    { label: "🌴 Bhavani Island" }
  ];

  return (
    <div className="pt-4">
      <div className="space-y-4 py-6 px-5 bg-gradient-to-br from-white to-gray-100 shadow-lg rounded-xl">
        <h3 className="text-2xl font-bold text-[#A94A4A] border-b pb-2">Nearby Attractions</h3>
        <ul className="space-y-3">
          {places.map((place, i) => (
            <li
              key={i}
              className="flex items-center text-lg text-gray-800 hover:text-[#A94A4A] transition-all duration-200"
            >
              <span className="mr-2">📍</span>
              {place.label}
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
      question: "What is the best time to visit Kanaka Durga Temple?",
      answer:
        "The temple is open throughout the year, but the best time to visit is during the Dasara Navaratri festival, usually in September or October, when grand celebrations take place.",
    },
    {
      question: "What are the temple timings?",
      answer:
        "The temple usually opens from 4:00 AM to 9:00 PM every day. However, timings may change during festivals or special pujas.",
    },
    {
      question: "Is there any dress code to visit the temple?",
      answer:
        "Yes, visitors are advised to wear traditional and modest clothing. Men should wear dhoti or pants with a shirt, and women should wear saree, salwar kameez, or long skirts.",
    },
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

  const templateName = "Sri Durga Malleswara Swamy";
  
  if (!templateName) {
    return <p className="p-8 text-center text-gray-600">Loading temple details...</p>;
  }
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
                src={'/temples/kanaka-durga.jpg'}
                alt="Temple"
                width={400}
                height={400}
                className="rounded"
              />
              <div className="mt-4 flex flex-col gap-y-1 pb-4">
                <h1 className="text-2xl font-bold text-gray-800 capitalize">
                  {"Sri Durga malleswara swamy"}
                </h1>
                <p className="text-sm text-gray-600 italic">
                  Vijayawada,Andhra Pradesh
                </p>

                <Link
                  href={`tel:80327329832`}
                  className="text-sm text-gray-800"
                >
                  80327329832
                </Link>
              </div>
              <Facilities />
              <PlacesToVisit />
            </div>

            <div className="w-full lg:w-2/3 bg-white rounded-lg shadow p-6">
              <TempleInfo name={templateName} />
              <SevaDarshanam name={templateName} />
              <ItinerarySelector />
              <FAQ />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

