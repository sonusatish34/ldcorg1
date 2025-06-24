

import { fireDb } from '../../public/firebase';
import { getDocs, collection, where, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { GoDotFill } from "react-icons/go";
import Loading from '../components/Loading';
import PostsListing from './blogcomponents/PostsListing';
import BlogLayout from './blogcomponents/BlogLayout';
import RandomPosts from './blogcomponents/RandomPosts';
import Link from 'next/link';
import { MdExpandMore } from "react-icons/md";
import { Listbox, Combobox } from '@headlessui/react';
import { CalendarIcon, ChevronDownIcon, MapPinIcon, ClockIcon, CurrencyRupeeIcon } from '@heroicons/react/20/solid';
import { format } from 'date-fns';

const ComponentName = (props) => {

  const [postlist, setPostlist] = useState([]);
  const [sortedPostlist, setSortedPostlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loader


  const destinations = ['Bali', 'Manali', 'Dubai', 'Thailand', 'Maldives'];
  const durations = ['1-3 Days', '4-7 Days', '8-10 Days', '10+ Days'];

  const [selectedDestination, setSelectedDestination] = useState(destinations[0]);
  const [query, setQuery] = useState('');
  const [selectedDuration, setSelectedDuration] = useState(durations[0]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [error, setError] = useState(null);
  const filteredDestinations =
    query === ''
      ? destinations
      : destinations.filter((d) =>
          d.toLowerCase().includes(query.toLowerCase())
        );


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(collection(fireDb, "blogPost"),
          where("blog_state", "==", "active"),
          where("blogfor", "==", "LDC")
        );
        const postsQuerySnapshot = await getDocs(postsQuery);
        const posts = postsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPostlist(posts);
        setSortedPostlist(sortedPosts);
      } catch (err) {
        setError('Failed to load data');
        console.error(err); // You can also log errors to an external service like Sentry
      } finally {
        setIsLoading(false); // Hide loader after data is fetched or error occurs
      }


    };

    fetchPosts();
  }, []);


  return (
    <div>
      {isLoading ? (
        <Loading />
      ) :
        <BlogLayout catg={"Blog"}>
          <div className='xl:px-32 lg:px-12 flex flex-col items-center helvetica-font'>
            <div className='lg:py-10 py-5 justify-center sm:justify-items-center px-[6px]'>
              <p className="capitalize text-4xl text-center font-semibold lg:pt-3 pb-3 buch-font">Blogs</p>
              <ul className='flex justify-center items-center pt-2 gap-3'>
                <li>Topic</li>
                <li><GoDotFill /></li>
                <li>{postlist?.length} stories</li>
              </ul>
            </div>
            <div className="bg-gradient-to-r from-white to-blue-50 p-6 rounded-3xl shadow-xl w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-4">
      {/* Destination with Search */}
      <div className="w-full md:w-1/4">
        <label className="text-sm text-gray-600 font-medium mb-1 block">Destination</label>
        <Combobox value={selectedDestination} onChange={setSelectedDestination}>
          <div className="relative">
            <div className="relative w-full">
              <Combobox.Input
                onChange={(event) => setQuery(event.target.value)}
                className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-10 shadow-sm hover:ring-2 hover:ring-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                displayValue={(destination) => destination}
                placeholder="Search destinations..."
              />
              <MapPinIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
              <ChevronDownIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <Combobox.Options className="absolute z-10 mt-1 w-full max-h-60 overflow-auto bg-white border rounded-xl shadow-lg">
              {filteredDestinations.length === 0 ? (
                <div className="px-4 py-2 text-gray-500">No destinations found.</div>
              ) : (
                filteredDestinations.map((destination, idx) => (
                  <Combobox.Option
                    key={idx}
                    value={destination}
                    className={({ active }) =>
                      `px-4 py-2 cursor-pointer ${
                        active ? 'bg-blue-100' : ''
                      }`
                    }
                  >
                    {destination}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </div>
        </Combobox>
      </div>

      {/* Duration Dropdown */}
      <div className="w-full md:w-1/4">
        <label className="text-sm text-gray-600 font-medium mb-1 block">Duration</label>
        <Listbox value={selectedDuration} onChange={setSelectedDuration}>
          <div className="relative">
            <Listbox.Button className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-10 text-left shadow-sm hover:ring-2 hover:ring-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500">
              {selectedDuration}
              <ChevronDownIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <ClockIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
            </Listbox.Button>
            <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border rounded-xl shadow-lg">
              {durations.map((duration, idx) => (
                <Listbox.Option
                  key={idx}
                  value={duration}
                  className="cursor-pointer px-4 py-2 hover:bg-blue-100"
                >
                  {duration}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </div>
        </Listbox>
      </div>

      {/* Date Picker */}
      <div className="w-full md:w-1/4">
        <label className="text-sm text-gray-600 font-medium mb-1 block">Start Date</label>
        <div className="relative">
          <input
            type="date"
            className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 shadow-sm hover:ring-2 hover:ring-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSelectedDate(e.target.value)}
            value={selectedDate || ''}
          />
          <CalendarIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
        </div>
      </div>

      {/* Search Button */}
      <div className="w-full md:w-auto md:mt-6">
        <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg transition">
          🔍 Search Packages
        </button>
      </div>
    </div>
            <div className='text-center flex justify-center lg:pt-10 pt-4'>
              <PostsListing data={sortedPostlist} />
            </div>
            <RandomPosts data={postlist} />
          </div>
          <div className=" py-2 pb-9 lg:py-5 flex flex-row xl:pl-36 lg:pl-20 pl-3 helvetica-font">
            <Link href={`/blog/${'travel'}`} className="flex space-x-2">
              <span className="border-2 text-white rounded-full p-2 bg-[#1859c9] text-sm flex items-center space-x-2">
                <span>See more</span>
                <MdExpandMore className="text-lg" />
              </span>
            </Link>
          </div>
        </BlogLayout>
      }
    </div>
  );
};

export default ComponentName;
