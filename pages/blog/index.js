
import { fireDb } from '../../public/firebase';
// import { getDocs, collection, where, query, doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import { doc, getDoc, setDoc, updateDoc, increment, serverTimestamp } from "firebase/firestore";
import React, { useEffect, useState } from 'react';
import { GoDotFill } from "react-icons/go";
import Loading from '../components/Loading';
import PostsListing from './blogcomponents/PostsListing';
import BlogLayout from './blogcomponents/BlogLayout';
import RandomPosts from './blogcomponents/RandomPosts';
import Link from 'next/link';
import { MdExpandMore } from "react-icons/md";
import { Listbox } from '@headlessui/react';
import { CalendarIcon, ChevronDownIcon, MapPinIcon, ClockIcon } from '@heroicons/react/20/solid';
import { format } from 'date-fns';
const ComponentName = (props) => {

  const [postlist, setPostlist] = useState([]);
  const [sortedPostlist, setSortedPostlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loader


  const destinations = ['Bali', 'Manali', 'Dubai', 'Tailand', 'Maldives'];
  const durations = ['1-3 Days', '4-7 Days', '8-10 Days', '10+ Days'];

  const [selectedDestination, setSelectedDestination] = useState(destinations[0]);
  const [selectedDuration, setSelectedDuration] = useState(durations[0]);
  const [selectedDate, setSelectedDate] = useState(null);


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
        // setError('Failed to load data');
        console.error(err); // You can also log errors to an external service like Sentry
      } finally {
        setIsLoading(false); // Hide loader after data is fetched or error occurs
      }


    };

    fetchPosts();
  }, []);



  // useEffect(() => {
  //   const trackPageView = async () => {
  //     const alreadyTracked = sessionStorage.getItem("blogPageViewed");

  //     if (alreadyTracked) return; // 👈 Skip if already tracked in this session

  //     const pageRef = doc(fireDb, "analytics", "blogPage");
  //     const docSnap = await getDoc(pageRef);

  //     if (docSnap.exists()) {
  //       await updateDoc(pageRef, {
  //         views: increment(1),
  //         lastVisited: serverTimestamp(),
  //       });
  //     } else {
  //       await setDoc(pageRef, {
  //         views: 1,
  //         lastVisited: serverTimestamp(),
  //       });
  //     }

  //     sessionStorage.setItem("blogPageViewed", "true"); // 👈 Mark as viewed
  //   };

  //   trackPageView();
  // }, []);

  useEffect(() => {
    const trackPageView = async () => {
      const ipRes = await fetch("https://api.ipify.org?format=json");
      const { ip } = await ipRes.json();

      // const internalIps = ["103.96.17.223", "49.204.11.34"];
      const internalIps = [""];

      if (internalIps.includes(ip)) return;

      const alreadyTracked = sessionStorage.getItem("blogPageViewed");
      if (alreadyTracked) return;

      const pageRef = doc(fireDb, "analytics", "blogPage");
      const docSnap = await getDoc(pageRef);

      if (docSnap.exists()) {
        await updateDoc(pageRef, {
          views: increment(1),
          lastVisited: serverTimestamp(),
        });
      } else {
        await setDoc(pageRef, {
          views: 1,
          lastVisited: serverTimestamp(),
        });
      }

      sessionStorage.setItem("blogPageViewed", "true"); // 👈 Mark as viewed

      // ... your Firestore logic here
    };

    trackPageView();
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
            <div className="bg-gradient-to-r from-white to-blue-50 p-6 rounded-3xl shadow-xl w-full max-w-6xl mx-auto grid grid-cols-2 lg:flex   items-center gap-4">
              {/* Destination */}
              <div className="w-full md:w-1/4">
                <label className="text-sm text-gray-600 font-medium mb-1 block">Destina--tion</label>
                <Listbox value={selectedDestination} onChange={setSelectedDestination}>
                  <div className="relative">
                    <Listbox.Button className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-10 text-left shadow-sm hover:ring-2 hover:ring-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500">
                      {selectedDestination}
                      <ChevronDownIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <MapPinIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border rounded-xl shadow-lg overflow-hidden">
                      {destinations.map((destination, idx) => (
                        <Listbox.Option
                          key={idx}
                          value={destination}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                        >
                          {destination}
                        </Listbox.Option>
                      ))}
                    </Listbox.Options>
                  </div>
                </Listbox>
              </div>

              {/* Duration */}
              <div className="w-full md:w-1/4">
                <label className="text-sm text-gray-600 font-medium mb-1 block">Dur00ation</label>
                <Listbox value={selectedDuration} onChange={setSelectedDuration}>
                  <div className="relative">
                    <Listbox.Button className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-10 text-left shadow-sm hover:ring-2 hover:ring-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500">
                      {selectedDuration}
                      <ChevronDownIcon className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <ClockIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                    </Listbox.Button>
                    <Listbox.Options className="absolute z-10 mt-1 w-full bg-white border rounded-xl shadow-lg overflow-hidden">
                      {durations.map((duration, idx) => (
                        <Listbox.Option
                          key={idx}
                          value={duration}
                          className="px-4 py-2 cursor-pointer hover:bg-blue-100"
                        >
                          {duration}00
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
                    value={selectedDate || ''}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 shadow-sm hover:ring-2 hover:ring-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <CalendarIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                </div>
              </div>
              <div className="w-full md:w-1/4">
                <label className="text-sm text-gray-600 font-medium mb-1 block">End Date</label>
                <div className="relative">
                  <input
                    type="date"
                    value={selectedDate || ''}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 shadow-sm hover:ring-2 hover:ring-blue-400 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <CalendarIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400" />
                </div>
              </div>

              {/* Search Button */}
            </div>
            <div className="w-full md:mt-6 flex justify-center pt-4 px-2">
              <button className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold px-8 py-3 w-full rounded-xl shadow-lg transition">
                🔍 Search Packages
              </button>
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
