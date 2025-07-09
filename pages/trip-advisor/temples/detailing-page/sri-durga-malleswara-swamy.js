// components/TempleDetailsTabs/TempleInfo.jsx
import { IoArrowForwardCircleOutline } from "react-icons/io5";
import ReactMarkdown from 'react-markdown';
import UserDropdown from "./comp/UserDropDown";
// pages/temple/[id].jsx
import { useState } from 'react';
import Image from 'next/image';
import ctr from '../../../../public/chinna-tirupati-murti.webp';
import Link from "next/link";

function TempleInfo({ data }) {
    return (
        <div className="space-y-4">
            <p className="text-lg text-gray-800 leading-relaxed">
                {data}
            </p>
            <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-pink-50 rounded shadow">
                    <h4 className="font-semibold text-pink-600">Highlight</h4>
                    <p>Mini Tirupati Experience</p>
                </div>
                <div className="p-4 bg-pink-50 rounded shadow">
                    <h4 className="font-semibold text-pink-600">District</h4>
                    <p>Eluru, Andhra Pradesh</p>
                </div>
            </div>
        </div>
    );
}

// components/TempleDetailsTabs/SevaDarshanam.jsx
function SevaDarshanam({ data }) {
    const sevaList = [
        { name: 'Athi Seeghra Darshanam', price: 200 },
        { name: 'Suprabhata Seva', price: 300 },
    ];

    const [activeIndex, setActiveIndex] = useState(null);
    const [quantities, setQuantities] = useState(
        sevaList.map(() => ({ adults: 1, children: 0 }))
    );
    const [checkoutData, setCheckoutData] = useState(null);

    const handleQuantityChange = (index, type, value) => {
        const newQuantities = [...quantities];
        newQuantities[index][type] = Number(value);
        setQuantities(newQuantities);
    };

    const handleBookClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const handleSubmit = (index) => {
        const seva = sevaList[index];
        const { adults, children } = quantities[index];
        const total = seva.price * (adults + children);
        const templename = 'sri durga malleswaras wamy';

        const order = {
            templename,
            seva: seva.name,
            adults,
            children,
            price: seva.price,
            total,
            date: new Date().toLocaleString(),
        };

        // Save to sessionStorage (add multiple orders)
        const existing = JSON.parse(sessionStorage.getItem('sevaOrders') || '[]');
        sessionStorage.setItem('sevaOrders', JSON.stringify([...existing, order]));

        setCheckoutData(order); // Open popup
        setActiveIndex(null); // Close form
    };

    const closePopup = () => setCheckoutData(null);

    return (
        <div className="space-y-3 relative">
            <h3 className="text-lg font-semibold text-pink-700">Daily Sevas</h3>
            <ul className='flex flex-col gap-y-6'>
                {sevaList.map((seva, index) => (
                    <li key={index} className='border-2 border-gray-100 shadow-md rounded-lg p-4'>
                        <div className='flex flex-col gap-y-4'>
                            <span className="text-md font-medium">{seva.name}</span>
                            <span>₹ {seva.price.toFixed(2)}</span>
                            <button
                                className='text-white border-2 border-gray-100 rounded-md w-fit px-3 py-1 flex items-center gap-x-2 bg-pink-500'
                                onClick={() => handleBookClick(index)}
                            >
                                Book Now <IoArrowForwardCircleOutline />
                            </button>

                            {activeIndex === index && (
                                <div className="mt-3 space-y-2 animate-fade-in">
                                    <div className='flex items-center gap-3'>
                                        <label className='w-20'>Adults:</label>
                                        <input
                                            type="number"
                                            min={0}
                                            value={quantities[index].adults}
                                            onChange={(e) => handleQuantityChange(index, 'adults', e.target.value)}
                                            className='border rounded px-2 py-1 w-20'
                                        />
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <label className='w-20'>Children:</label>
                                        <input
                                            type="number"
                                            min={0}
                                            value={quantities[index].children}
                                            onChange={(e) => handleQuantityChange(index, 'children', e.target.value)}
                                            className='border rounded px-2 py-1 w-20'
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleSubmit(index)}
                                        className='mt-2 bg-green-600 text-white px-4 py-1 rounded-md'
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {/* Checkout Popup */}
            {checkoutData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl relative">
                        <button onClick={closePopup} className="absolute top-2 right-3 text-red-600 text-xl">✕</button>
                        <h2 className="text-xl font-semibold text-center text-pink-700 mb-4">Order Summary</h2>
                        <div className="space-y-2 text-gray-800">
                            <p><strong>Seva:</strong> {checkoutData.seva}</p>
                            <p><strong>Adults:</strong> {checkoutData.adults}</p>
                            <p><strong>Children:</strong> {checkoutData.children}</p>
                            <p><strong>Price per ticket:</strong> ₹{checkoutData.price}</p>
                            <p><strong>Total:</strong> ₹{checkoutData.total}</p>
                            <p><strong>Date:</strong> {checkoutData.date}</p>
                        </div>
                        <div className="mt-5 flex justify-center">
                            <button onClick={closePopup} className="bg-pink-600 text-white px-4 py-2 rounded-md">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// components/TempleDetailsTabs/Facilities.jsx
function Facilities({ data }) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.split(',').map((facility, i) => (
                <div
                    key={i}
                    className="bg-white border-l-4 border-pink-600 p-4 shadow-sm rounded"
                >
                    <p className="text-gray-700 font-medium">{facility.trim()}</p>
                </div>
            ))}
        </div>
    );
}

// components/TempleDetailsTabs/PlacesToVisit.jsx
function PlacesToVisit({ data }) {
    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold text-pink-700">Nearby Attractions</h3>
            <ul className="text-gray-700 list-inside list-square">
                {data.split(',').map((place, i) => (
                    <li key={i}>{place.trim()}</li>
                ))}
            </ul>
        </div>
    );
}

// components/TempleDetailsTabs/ItineraryDetails.jsx
function ItineraryDetails({ data }) {
    const TempleImgCard = () => {
        return (
            <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
                {/* <p className="flex flex-col items-center">
                    <img height={300} width={300} className="h-32 w-32" src={'/chinna-tirupati-murti.webp'} />
                    <span className="text-sm pt-4">Subramanya Swamy Temple (4kms from Vijayawada )</span>
                </p> */}
                <div

                >

                </div>
                {/* <div
                    className="text-gray-700 leading-relaxed"
                    dangerouslySetInnerHTML={{ __html: data}}
                /> */}
                <div className="leading-loose tracking-wide text-gray-700">

                    {data}
                </div>
            </div>
        )
    }
    return (
        <div className="space-y4">
            
            <div className="bg-white p space-y-6">
                <h2 className="text-2xl font-bold text-pink-600">We have a 3 Day Suggested Itinerary</h2>

                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">🚗 Day 1: Reach Vijayawada and Visit Local Temples</h3>
                    <ul className="space-y-2 list-disc list-inside text-gray-700">
                        <li>Visit <strong>Subramanya Swamy Temple</strong> <span className="text-sm text-gray-500">(3.1 km)</span></li>
                        <li>Visit <strong>Skandagiri Temple</strong> <span className="text-sm text-gray-500">(5.6 km)</span></li>
                        <li>Explore <strong>Undavalli Caves</strong> <span className="text-sm text-gray-500">(5.7 km)</span></li>
                    </ul>
                </div>

                {/* Day 2 */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">📿 Day 2: Amaravathi Day Trip</h3>
                    <ul className="space-y-2 list-disc list-inside text-gray-700">
                        <li><strong>Amaralingeswara Swamy Temple</strong>, Amaravathi <span className="text-sm text-gray-500">(35 km)</span></li>
                        <li><strong>Dhyana Buddha Statue</strong> <span className="text-sm text-gray-500">(11 km)</span></li>
                    </ul>
                </div>

                {/* Day 3 */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">🛕 Day 3: Palakollu & Bhimavaram</h3>
                    <ul className="space-y-2 list-disc list-inside text-gray-700">
                        <li><strong>Ksheera Ramalingeswara Swamy Temple</strong>, Palakollu <span className="text-sm text-gray-500">(140 km)</span></li>
                        <li><strong>Someswara Swamy Temple</strong>, Bhimavaram <span className="text-sm text-gray-500">(24 km)</span></li>
                    </ul>
                </div>

                {/* Food Stops */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">🍽️ Food & Travel Stops</h3>
                    <ul className="space-y-2 list-disc list-inside text-gray-700">
                        <li><strong>Early breakfast</strong> near Suryapet</li>
                        <li>7 Highway Food N Fun Stop</li>
                        <li>Raju Gari Thota</li>
                        <li><strong>Lunch</strong> between Suryapet and Khammam:</li>
                        <ul className="ml-5 list-disc">
                            <li>Kinnera Family Restaurant</li>
                            <li>Hotel Kavali</li>
                            <li>Amma Mess</li>
                        </ul>
                    </ul>
                </div>

                {/* En Route Temples */}
                <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">🔖 En Route Temples from Hyderabad</h3>
                    <ul className="space-y-2 list-disc list-inside text-gray-700">
                        <li><strong>Vedadhri Lakshmi Narasimha Swamy Temple</strong></li>
                        <li><strong>Sri Rama Temple</strong>, Paritala (near Kanchi Kacharla)</li>
                    </ul>
                </div>
            </div>

        </div>
    );
}


const tabs = [
    { name: 'Temple Info', key: 'info' },
    { name: 'Seva & Darshanam', key: 'seva' },
    { name: 'Facilities', key: 'facilities' },
    { name: 'Places to Visit', key: 'places' },
    { name: 'Itinerary Details', key: 'itinerary' },
];

const templeData = {
    image: '/deity.jpg',
    name: 'Sri Durga malleswara swamy',
    deity: '',
    location: 'Vijayawada, Andhra Pradesh',
    info:
        'Sri Durga Malleswara Swamyvarla Devasthanam, is a Hindu temple dedicated to Kanaka Durga. The deity in this temple is also popularly referred as Kanaka Durga. The temple is located in Vijayawada, Andhra Pradesh, India on the Indrakeeladri hill on the banks of Krishna River.[1] Kaalika Purana, Durgaa Sapthashati and other Vedic literature have mentioned about Kanaka Durga on the Indrakeelaadri and have described the deity as Swayambhu, (self-manifested) in Triteeya Kalpa',
    seva: 'Suprabhata Seva, Thomala Seva, Archana, Kalyanotsavam, Dolotsavam',
    facilities: 'Accommodation, prasadam counters, cloakrooms, free meals, medical aid',
    places: 'Bhimavaram Temple, Kolleru Lake, Eluru Gaja Vallabha Temple, Rajahmundry River Cruise',
    itinerary: `### 🗓️ 3-Day Pilgrimage Itinerary: Hyderabad to Vijayawada

#### 🚗 Day 1: Arrival & Local Sightseeing in Vijayawada
- ⚠️ Visit **Subramanya Swamy Temple** (3.1 km)
- ⚠️ Visit **Skandagiri Temple** (5.6 km)
- 🏛 Explore **Undavalli Caves** (5.7 km)

#### 🚘 Day 2: Amaravathi Day Trip
- ⚠️ **Amaralingeswara Swamy Temple**, Amaravathi (35 km)
- 🧘‍♂️ **Dhyana Buddha Statue**, Amaravathi (11 km)

#### 🚖 Day 3: Palakollu & Bhimavaram
- ⚠️ **Ksheera Ramalingeswara Swamy Temple**, Palakollu (140 km)
- ⚠️ **Somaswara Swamy Temple**, Bhimavaram (24 km)

### 🥗 Travel Meal Stops (Hyderabad to Vijayawada)
- **Early Breakfast near Suryapet**
- 7 Highway Food n Fun Stop
- Raju Gari Thota
- **Lunch between Suryapet and Khammam**
  - Kinnera Family Restaurant
  - Hotel Kavali
  - Amma Mess

### ⚠️ En Route Temples from Hyderabad
- ⚠️ **Vedadhri Lakshmi Narasimha Swamy Temple**
- ⚠️ **Sri Rama Temple**, Paritala (near Kanchi Kacharla)`,

    mobile: '9441820717'
};

export default function TempleDetailPage() {
    const [activeTab, setActiveTab] = useState('info');
    const templeNames = ['Dwaraka Tirumala', 'Tirumala', 'Kanaka Durga Temple', 'Simhachalam Temple', 'Mangalagiri Temple', 'Srikalahasti', 'Annavaram', 'Ahobilam'];

    return (
        <>
            <header className="bg-white shadow sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">

                    {/* Logo and Title */}
                    <div className="flex items-center gap-4">
                        <img src="/templelogo.jpg" alt="Logo" className="h-16 w-16" />
                        <span className="font-bold text-xl text-pink-700">AP Temples Portal</span>
                    </div>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
                        <a href="#" className="hover:text-pink-600">Temples</a>
                        <a href="#" className="hover:text-pink-600">Sevas & Darshanam</a>
                        <a href="#" className="hover:text-pink-600">Donations</a>
                        <a href="#" className="hover:text-pink-600">Online Booking</a>
                        <a href="#" className="hover:text-pink-600">Support</a>
                    </nav>

                    {/* Login Dropdown */}
                    <UserDropdown />
                </div>
            </header>

            <div className="bg-pink-600 text-white py-2 overflow-hidden relative group">
                <div className="flex w-max animate-marquee group-hover:pause-marquee">
                    {[...templeNames, ...templeNames].map((name, idx) => (
                        <span key={idx} className="mx-8 font-semibold whitespace-nowrap">
                            {name}
                        </span>
                    ))}
                </div>
            </div>
            <div className="flex min-h-screen bg-gray-100">
                {/* Marquee Header */}
                <aside className="w-64 bg-white shadow p-4 space-y-2">
                    <h2 className="text-xl font-bold text-pink-600 mb-4">Temple Details</h2>
                    {tabs.map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setActiveTab(tab.key)}
                            className={`w-full text-left px-4 py-2 rounded transition font-medium ${activeTab === tab.key
                                ? 'bg-pink-600 text-white'
                                : 'hover:bg-pink-100 text-gray-700'
                                }`}
                        >
                            {tab.name}
                        </button>
                    ))}
                </aside>

                <main className="flex-1 p-6">
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                        <div className="w-full lg:w-1/3">
                            <Image
                                src={"/sri-durga-malleswara-swamy.jpg"}
                                alt={templeData.name}
                                width={400}
                                height={400}
                                className="rounded"
                            />
                            <div className="mt-4 flex flex-col gap-y-1">
                                <h1 className="text-2xl font-bold text-gray-800">{templeData.name}</h1>
                                <p className="text-sm text-gray-600">{templeData.deity}</p>
                                <p className="text-sm text-gray-500 italic">{templeData.location}</p>
                                <Link href={`tel:${templeData.mobile}`} className="text-sm text-gray-800 ">{templeData.mobile}</Link>
                            </div>
                        </div>

                        <div className="w-full lg:w-2/3 bg-white rounded-lg shadow p-6">
                            <h2 className="text-xl font-semibold text-pink-600 mb-4">
                                {tabs.find((tab) => tab.key === activeTab).name}
                            </h2>

                            {activeTab === 'info' && <TempleInfo data={templeData.info} />}
                            {activeTab === 'seva' && <SevaDarshanam data={templeData.seva} />}
                            {activeTab === 'facilities' && <Facilities data={templeData.facilities} />}
                            {activeTab === 'places' && <PlacesToVisit data={templeData.places} />}
                            {activeTab === 'itinerary' && <ItineraryDetails data={templeData.itinerary} />}
                        </div>
                    </div>
                </main>
            </div>
        </>
    );
}
