// components/TempleDetailsTabs/TempleInfo.jsx
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import ReactMarkdown from 'react-markdown';
// import UserDropdown from "@comp/UserDropDown";
// pages/temple/[id].jsx
import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from "next/link";
import td from '../temples.json';
import { useRouter } from "next/router";
import { da } from "date-fns/locale";
import UserDropdown from "./comp/UserDropDown";
import { CalendarDays, MapPin, Utensils, Mountain } from 'lucide-react'
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';


function TempleInfo({ name }) {
  const templeData = Array.isArray(td?.[name]) ? td[name][0] : {};
  console.log(templeData,'kkkk');
  
  return (
    <div className="space-y-4">
      <p className="font-bold text-2xl text-[#A94A4A]">Temple Information</p>
      <p className="mxs:text-base text-sm text-gray-800 leading-relaxed">
        {templeData?.templeInfo || 'Information not available.'}
      </p>
      <div className="flex gap-4 pt-">
        <div className="p-4 bg-[#A94A4A] text-white rounded shadow capitalize">
          <h4 className="font-semibold">Highlight</h4>
          <p>{templeData?.highlight || 'N/A'}</p>
        </div>
        <div className="p-4 bg-[#A94A4A] rounded text-white shadow">
          <h4 className="font-semibold">District</h4>
          <p>{templeData?.district || 'N/A'}</p>
        </div>
      </div>
    </div>
  );
}

function ItinerarySelector({ name }) {
  const iconMap = {
    food: <Utensils className="w-4 h-4 text-[#A94A4A]" />,
    temple: <MapPin className="w-4 h-4 text-yellow-600" />,
    travel: <CalendarDays className="w-4 h-4 text-blue-600" />,
    explore: <Mountain className="w-4 h-4 text-green-600" />
  };

  console.log(name, 'itinerary');

  const templeData = td[name] && Array.isArray(td[name]) ? td[name][0] : null;
  const temple = templeData ? templeData.itienary : {};

  const keys = Object.keys(temple).sort((a, b) => Number(a) - Number(b));

  const [selected, setSelected] = useState('');

  // Set selected to first available key when keys change
  useEffect(() => {
    if (keys.length > 0 && !selected) {
      setSelected(keys[0]);
    }
  }, [keys, selected]);

  if (!selected || !temple[selected]) {
    return (
      <div className="w-full px-4 py-8 text-center text-gray-500">
        Loading itinerary...
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-3xl lg:text-4xl font-bold text-center text-[#A94A4A] mb-4">
        {templeData?.name || 'Itinerary Unavailable'}
      </h1>

      <div className="flex justify-center items-center gap-8 py-5">
        {keys.map((dayKey) => (
          <button
            key={dayKey}
            onClick={() => setSelected(dayKey)}
            className={`px-4 py-2 rounded-full font-medium border transition ${selected === dayKey
              ? 'bg-[#A94A4A] text-white border-pink-600'
              : 'text-[#A94A4A] bg-white border-pink-600 hover:bg-[#A94A4A] hover:text-white'
              }`}
          >
            {dayKey}-Day Plan
          </button>
        ))}
      </div>

      <div className="bg-white text-lg lg:text-xl shadow rounded-xl px-3 py-4 space-y-6">
        <h2 className=" font-semibold text-[#A94A4A]">
          {temple[selected]?.title || 'Title Unavailable'}
          <span className="text-gray-600 pl-3 ">
            ({temple[selected]?.subtitle || 'Subtitle Unavailable'})
          </span>
        </h2>

        {temple[selected]?.days?.map((day, idx) => (
          <div key={idx} className="bg-gray-50 rounded-xl p-4 border border-gray-200">
            <h3 className=" font-bold mb-3 text-gray-800">
              {day.title || 'Day Title Unavailable'}
            </h3>
            <ul className="space-y-3">
              {day?.steps?.map((step, i) => (
                <li key={i} className="flex items-center gap-2 text-gray-700">
                  <div>{iconMap[step?.type]}</div>
                  <p>{step?.text || 'Step Description Unavailable'}</p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}



function SevaDarshanam({ name }) {
  const sevaList = Array.isArray(td?.[name]) ? td[name][0]?.sevas || [] : [];
  const [activeIndex, setActiveIndex] = useState(null);
  const [quantities, setQuantities] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [pendingOrder, setPendingOrder] = useState(null);

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

  const handleSubmit = (index) => {
    const seva = sevaList[index];
    const templeName = td[name]?.[0]?.name || 'Unknown Temple';
    const { adults, children } = quantities[index] || { adults: 0, children: 0 };
    const total = seva.price * (adults + children);

    const order = {
      templename: templeName,
      seva: seva.name,
      adults,
      children,
      price: seva.price,
      total,
      date: new Date().toLocaleString(),
    };

    setPendingOrder(order);
    setShowDialog(true);
  };

  const confirmOrder = () => {
    const existing = JSON.parse(sessionStorage.getItem('sevaOrders') || '[]');
    sessionStorage.setItem('sevaOrders', JSON.stringify([...existing, pendingOrder]));
    setShowDialog(false);
    setPendingOrder(null);
    alert("✅ Your seva has been booked!");
  };

  return (
    <div className="space-y-3 relative py-10">
      <h3 className="text-2xl font-semibold text-[#A94A4A] text-center py-4">Sevas & Darshanam</h3>
      <ul className="flex flex-wrap items-center justify-center gap-8">
        {sevaList.map((seva, index) => (
          <li key={index} className="border-2 border-gray-100 shadow-md rounded-lg p-2 py-4 w-fit">
            <div className="flex flex-col items-center gap-y-4 w-[280px]">
              <span className="text-md font-medium">{seva.name || 'Seva Name Unavailable'}</span>
              <span>₹ {seva.price?.toFixed(2) || 'Price Unavailable'}</span>
              <button
                className="text-white border-2 border-gray-100 rounded-md w-fit px-3 py-1 flex items-center gap-x-2 bg-[#A94A4A]"
                onClick={() => setActiveIndex(index)}
              >
                Book now <IoArrowForwardCircleOutline />
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

      {/* Confirmation Dialog */}
      {showDialog && pendingOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="p-2">
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
              <h2 className="text-xl font-semibold mb-4 text-[#A94A4A]">Confirm Your Booking</h2>
              <p><strong>Temple:</strong> {pendingOrder.templename}</p>
              <p><strong>Seva:</strong> {pendingOrder.seva}</p>
              <p><strong>Adults:</strong> {pendingOrder.adults}</p>
              <p><strong>Children:</strong> {pendingOrder.children}</p>
              <p><strong>Total:</strong> ₹ {pendingOrder.total.toFixed(2)}</p>
              <div className="flex justify-end mt-6 gap-4">
                <button
                  className="px-4 py-2 bg-gray-300 rounded"
                  onClick={() => {
                    setShowDialog(false);
                    setPendingOrder(null);
                  }}
                >
                  Cancel
                </button>
                <button
                  className="px-4 py-2 bg-[#A94A4A] text-white rounded"
                  onClick={confirmOrder}
                >
                  Confirm Booking
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


function PlacesToVisit({ name }) {
  const places = Array.isArray(td?.[name]) ? td[name][0]?.placesToVisit || [] : [];

  return (
    <div className="pt-4">
      <div className="space-y-4 py-6 px-6 bg-gradient-to-br from-white to-blue-50 shadow-xl rounded-2xl">
        <h3 className="text-2xl font-bold text-indigo-600 border-b pb-2">
          Nearby Attractions
        </h3>
        <ul className="space-y-3">
          {places?.map((place, i) => (
            <li
              key={i}
              className="flex items-center text-base text-gray-800 hover:text-indigo-600 transition-colors duration-200"
            >
              <span className="mr-3">📍</span>
              {place?.label}
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

        {facilities?.map((facility, i) => (
          <div
            key={i}
            className="bg-white border-l-4 border-[#A94A4A] p-4 shadow-sm rounded"
          >
            <p className="text-gray-700 font-medium">{facility?.trim()}</p>
          </div>
        ))}
      </div>
    </div>
  );
}





function FAQ({ name }) {


  const faqs = Array.isArray(td?.[name]) ? td[name][0]?.faq || [] : [];


  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-semibold text-center mb-6">FAQs</h2>
      <div className="space-y-4">
        {faqs?.map((faq, index) => (
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
              className={`px-4 pt-2 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? "max-h-96 py-2" : "max-h-0"
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
  console.log(router.query.templename, 'dsds');

  // const templeNames = [
  //   'Dwaraka Tirumala', 'Tirumala', 'Kanaka Durga Temple',
  //   'Simhachalam Temple', 'Mangalagiri Temple',
  //   'Srikalahasti', 'Annavaram', 'Ahobilam'
  // ];
  const templeNames = [
    { name: 'Dwaraka Tirumala', link: '/trip-advisor/temples/detailing-page/dwaraka-tirumala' },
    { name: 'Tirumala', link: '/trip-advisor/temples/detailing-page/tirumala' }, // No data in provided array, placeholder
    { name: 'Kanaka Durga Temple', link: '/trip-advisor/temples/detailing-page/sri-durga-malleswara-swamy' },
    { name: 'Simhachalam Temple', link: '/trip-advisor/temples/detailing-page/simhachalam-varaha-laxminarasimha-swami-temple' },
    { name: 'Mangalagiri Temple', link: '/trip-advisor/temples/detailing-page/lakshmi-narasimha-swamy-temple-mangalagiri' },
    { name: 'Srikalahasti', link: '/trip-advisor/temples/detailing-page/sri-kalahasthi-swamy-temple' },
    { name: 'Annavaram', link: '/trip-advisor/temples/detailing-page/annavaram-satya-narayana-swamy' }
  ];

  const templeName = router?.query?.templename;
  const templeDataArray = templeName && td?.[templeName];
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
          {[...templeNames, ...templeNames]?.map((item, idx) => (
            <Link href={`${item?.link}`} key={idx} className="mx-8 font-semibold whitespace-nowrap">
              🛕 {item?.name}
            </Link>
          ))}
        </div>
      </div>

      <div className="min-h-screen bg-gray-100">
        <main className=" lg:px-20 px-3">
          <div className="flex flex-col lg:flex-row gap-6 items-start">
            <div className="w-full lg:w-1/3">
              <div className="">
                <Swiper
                  modules={[Navigation, Autoplay]}
                  navigation={true}
                  autoplay={{
                    delay: 1500,
                    disableOnInteraction: false,
                    pauseOnMouseEnter: false, // Ensure it doesn’t pause on hover
                  }}
                  loop={true}
                  spaceBetween={1}
                  slidesPerView="1"
                  style={{ padding: '10px 0' }}
                >
                  {templeData?.images.map((src, index) => (
                    <SwiperSlide
                      key={index}
                      style={{
                        flexShrink: 0,
                      }}
                      className="rounded overflow-hidden shadow lg:w-[400px]"
                    >
                      <Image width={500} height={500} src={src} alt={`Slide ${index}`} className=" object-cover h-[421px]" />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className="mt-4 flex flex-col gap-y-1 pb-5">
                <h1 className="text-2xl font-bold text-gray-800 capitalize">
                  {templeData?.name || "Temple Name Unavailable"}
                </h1>
                <p className="text-sm text-gray-600 italic">
                  {templeData?.district || "District info not available"}
                </p>
                {templeData?.mobileno && (
                  <Link
                    href={`tel:${templeData.mobileno}`}
                    className="text-sm text-gray-800"
                  >
                    {templeData.mobileno}
                  </Link>
                )}
              </div>

              <Facilities name={templeName} />
              <PlacesToVisit name={templeName} />
            </div>

            <div className="w-full lg:w-2/3 bg-white rounded-lg shadow px-4 py-6">
              <TempleInfo name={templeName} />
              <SevaDarshanam name={templeName} />
              <ItinerarySelector name={templeName} />
              <FAQ name={templeName} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

