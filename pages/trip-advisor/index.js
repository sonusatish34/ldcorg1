import React, { useState, useEffect } from 'react';
import { CalendarIcon, MapPinIcon, ClockIcon, CurrencyRupeeIcon } from '@heroicons/react/20/solid';
import Image from 'next/image';
import Loading from '../components/Loading';
import Hamb from './comps/Hamb';
import TravelPlanModal from './comps/TravelPlanModal';
import { IoLocationSharp } from "react-icons/io5";
import DestinationGrid from './comps/DestinationGrid';
import GetInspiration from './comps/GetInspiration';
import PopularTrips from './comps/PopularTrips';
import JourneySection from './comps/JourneySection';
import { useEditor } from '@tiptap/react';
import { fireDb } from '../../public/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import trisoml from '@/public/trips2.json';
import Calendar from 'react-calendar';  // Import the calendar component

const ComponentName = () => {
  const [search, setSearch] = useState('');
  const [typedText, setTypedText] = useState('');
  const [destinationIndex, setDestinationIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [destList, setDestList] = useState([]);

  const destinations = [
    "Vizag",
    "Bangalore",
    "goa",
    "Hyderabad",
    "Dandeli",
    "Ooty",
    "Kodaikanal",
  ];

  const [showCalendar, setShowCalendar] = useState(false);
  const [showEndCalendar, setShowEndCalendar] = useState(false);

  const handleStartDateClick = () => {
    setShowCalendar(true);
    setShowEndCalendar(false);  
  };

  const handleEndDateClick = () => {
    setShowEndCalendar(true);
    setShowCalendar(false);  
  };

  const handleDateChange = (date, isStartDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);  // Set today's time to 00:00:00 for comparison

    // Check if the selected date is at least 1 day after today
    if (date <= today) {
      alert("Please select a date that is at least one day after today.");
      return;
    }

    // Handle Start Date
    if (isStartDate) {
      setSelectedCheckIn(date);

      // If selected start date is set, ensure end date is later than start date
      if (selectedCheckOut && date >= selectedCheckOut) {
        alert("End date should be after the start date.");
        setSelectedCheckOut(null);  // Clear end date if it's invalid
      }
    } else {  // Handle End Date
      // Ensure end date is later than start date
      if (date <= selectedCheckIn) {
        alert("End date should be after the start date.");
        return;
      }
      setSelectedCheckOut(date);
    }

    // Close calendar after selection
    setShowCalendar(false);
    setShowEndCalendar(false);
  };

  const [selectedCheckIn, setSelectedCheckIn] = useState(null);
  const [selectedCheckOut, setSelectedCheckOut] = useState(null);

  const filteredDestinations = Object.keys(trisoml).filter((key) =>
    key.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const current = destinations[destinationIndex];
    let timeout;

    if (!isDeleting) {
      timeout = setTimeout(() => {
        setTypedText(current.slice(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === current.length) {
          setTimeout(() => setIsDeleting(true), 1000);
        }
      }, 150);
    } else {
      timeout = setTimeout(() => {
        setTypedText(current.slice(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex === 0) {
          setIsDeleting(false);
          setDestinationIndex((destinationIndex + 1) % destinations.length);
        }
      }, 80);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, destinationIndex]);
const [loaded, setLoaded] = useState(false);

const handleLoad = () => {
  setLoaded(true);
};
  const ThemeCard = ({ title, image }) => (
    <div className="overflow-hidden rounded-xl cursor-pointer flex flex-col justify-center items-center">
    <Image
  src={image}
  alt={title}
  width={400}
  height={300}
  className="h-20 w-20 lg:h-40 lg:w-40 object-cover rounded-full lg:rounded-lg"
  blurDataURL={image}
  placeholder="blur"
/>

    <h3 className="text-black text-sm pt-2">{title}</h3>
  </div>
  );

  return (
    <div className="inter-font">
      {isLoading ? (
        <Loading />
      ) : (
        <div className="xl:px-32 lg:px-12 flex flex-col justify-center pt-2 ">
          <Hamb />
          {/* Filters Section */}
          <div className="min-h-sm pt-20 flex items-center justify-center p-4">
            <div className="relative w-full rounded-2xl shadow-xl overflow-hidden">
              <video
                className="absolute inset-0 w-full h-full object-cover"
                src="/123.mp4"
                autoPlay
                loop
                muted
                playsInline  // Ensures smooth playback on mobile devices
              />
              <div className="absolute inset-0 bg-red-100/1 backdrop-blur-[1px]"></div>
              <div className="relative px-8 py-12 z-10 bg-re">
                <div className="relative mb-4">
                  <div className="w-full mt-10 relative">
                    <div className="flex items-center px-4 py-3 rounded-full bg-white shadow-md relative">
                      {/* Input Field */}
                      <input
                        type="text"
                        value={search}
                        onChange={(e) => {
                          setSearch(e.target.value);
                          setShowDropdown(true);
                        }}
                        onFocus={() => setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                        className="w-full bg-transparent focus:outline-none text-gray-800 placeholder-transparent"
                        placeholder="eg. Goa, Dandeli, Hyderabad"
                      />
                      {/* Animated Placeholder */}
                      {search === '' && (
                        <div className="absolute left-12 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                          Search for <span className="text-black text-sm pl-1 font-semibold">{typedText}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  {showDropdown && (
                    <ul className="absolute z-10 w-full bg-white shadow-md rounded-md mt-1 border max-h-48 overflow-y-auto">
                      {filteredDestinations.length >= 1 ? (
                        filteredDestinations.map((item, idx) => (
                          <li
                            key={idx}
                            className="px-4 py-2 capitalize hover:bg-gray-100 cursor-pointer flex gap-x-2 items-center"
                            onClick={() => {
                              setSearch(item); // Set selected key as search
                              setShowDropdown(false); // Hide dropdown after selection
                            }}
                          >
                            <IoLocationSharp color="red" /> {item?.replaceAll('-', ' ')}
                          </li>
                        ))
                      ) : (
                        <li className="px-4 py-2 text-gray-500">No results found</li>
                      )}
                    </ul>
                  )}
                </div>

                <div className="flex justify-between text-white text-sm mb-2 font-semibold uppercase py-2">
                  <span>Start Date</span>
                  <span>End Date</span>
                </div>

                <div className="flex justify-between mb-4 text-white">
                  <div className="w-[48%]">
                    <button onClick={handleStartDateClick} className="w-full px-3 py-2 border rounded-md text-sm">
                      {selectedCheckIn ? selectedCheckIn.toDateString() : 'Select Date'}
                    </button>

                    {showCalendar && (
                      <Calendar
                        onChange={(date) => handleDateChange(date, true)}
                        value={selectedCheckIn}
                        selectRange={false}
                      />
                    )}
                  </div>

                  <div className="w-[48%]">
                    <button onClick={handleEndDateClick} className="w-full px-3 py-2 border rounded-md text-sm">
                      {selectedCheckOut ? selectedCheckOut.toDateString() : 'Select Date'}
                    </button>

                    {showEndCalendar && (
                      <Calendar
                        onChange={(date) => handleDateChange(date, false)}
                        value={selectedCheckOut}
                        selectRange={false}
                      />
                    )}
                  </div>
                </div>

                <button className="w-full bg-blue-400 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl">
                  Search
                </button>
              </div>
            </div>
          </div>
          <JourneySection />
          <DestinationGrid />
          <div className="w-full px-4 py-5">
            <p className="text-left pb-5 font-semibold text-base lg:text-4xl">Match Your Mood to a Destination</p>
            <div className="flex gap-x-3 overflow-x-auto snap-x snap-mandatory scrollbar-hide py-2">
              {['Family', 'Solo', 'Honeymoon', 'Friends', 'Adventure', 'Temples'].map((title, idx) => (
                <div key={idx} className="snap-start shrink-0">
                  <ThemeCard title={title} image={`/${idx + 1}.webp`} />
                </div>
              ))}
            </div>
          </div>
          <GetInspiration />
          <PopularTrips />
          <p>{trisoml[1]}</p>
        </div>
      )}
    </div>
  );
};

export default ComponentName;
