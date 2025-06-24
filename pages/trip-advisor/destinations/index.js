// import Carousel from '../comps/Carousel';
// import SearchBar from '../comps/SearchBar';
// import DestinationGrid from '../comps/DestinationGrid';

// export default function Home() {
//   return (
//     <div className="p-4">
//       <Carousel />
//       <div className="mt-6 text-2xl font-bold">
//         Explore <span className="text-orange-500">Destinations</span>
//       </div>
//       <div className="flex flex-wrap gap-2 mt-2">
//         {['South India', 'West India', 'North India', 'East India'].map((region) => (
//           <button
//             key={region}
//             className="border px-4 py-1 rounded-full hover:bg-orange-100 text-sm"
//           >
//             {region}    
//           </button>
//         ))}
//       </div>
//       <SearchBar />
//       <DestinationGrid />
//     </div>
//   );
// }
'use client';

import { useState } from 'react';
import { DateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { IoLocationSharp } from 'react-icons/io5';

export default function TripPlanner() {
  const [search, setSearch] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [filteredDestinations, setFilteredDestinations] = useState([
    'Goa',
    'Dandeli',
    'Hyderabad',
    'Manali',
    'Coorg',
  ]);

  const [selectionRange, setSelectionRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const handleSelect = (ranges) => {
    setSelectionRange(ranges.selection);
  };

  const [showCal,setShowCal] = useState(false);

  return (
    <div className="w-full pt-16 flex items-center justify-center p-4">
      <div className="relative w-full rounded-2xl shadow-xl overflow-hidden max-w-3xl">
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/wave.mp4"
          autoPlay
          muted
          loop
        ></video>

        <div className="absolute inset-0 bg-red-100/10 backdrop-blur-[2px]"></div>

        <div className="relative p-6 z-10">
          <h2 className="text-xl font-bold mb-4 text-white">DESTINATIONS</h2>

          <div className="relative mb-4">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowDropdown(true);
              }}
              onFocus={() => setShowDropdown(true)}
              onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
              placeholder="eg. Goa, Dandeli, Hyderabad, etc."
              className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            {showDropdown && (
              <ul className="absolute z-10 w-full bg-white shadow-md rounded-md mt-1 border max-h-48 overflow-y-auto">
                {filteredDestinations
                  .filter((item) =>
                    item.toLowerCase().includes(search.toLowerCase())
                  )
                  .map((item, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex gap-x-2 items-center"
                      onClick={() => {
                        setSearch(item);
                        setShowDropdown(false);
                      }}
                    >
                      <IoLocationSharp color="red" /> {item}
                    </li>
                  ))}
              </ul>
            )}
          </div>

          <div className="text-sm font-semibold text-gray-800 mb-2 flex justify-between">
            <span onClick={()=>{setShowCal(!showCal)}}>CHECK-IN & CHECK-OUT</span>
          </div>

          {showCal && <div className="mb-4 bg-white p-2 rounded-xl shadow">
            <p>{selectionRange.startDate.toDateString}---</p>
            <DateRange
              ranges={[selectionRange]}
              onChange={handleSelect}
              minDate={new Date()}
              rangeColors={['#f97316']}
            />
          </div>
          
        }
        {console.log(selectionRange.startDate.getDate,'l')}

          <button className="w-full bg-blue-400 hover:bg-orange-600 text-white font-semibold py-3 rounded-xl">
            Search
          </button>
        </div>
      </div>
    </div>
  );
}

