'use client';

import { useEffect, useState } from "react";
import Hamb from "../../comps/Hamb";
import { fireDb } from '../../../../public/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import { useRouter } from "next/router";
import Link from "next/link";
export default function Home() {
  const [postlist, setPostlist] = useState([])
  const router = useRouter();
  // console.log(router,'kl');
  const { categoryname } = router.query;
  console.log(categoryname, 'koloo');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postsQuery = query(collection(fireDb, "trips"), where("populartags", "array-contains", categoryname.trim()));
        const postsQuerySnapshot = await getDocs(postsQuery);
        const posts = postsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(posts, 'lol');
        setPostlist(posts);
      }
      catch {
        // console.error(err); 
      }
    };

    fetchData();
  }, [categoryname]);


  return (
    <div>
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src="https://elements-resized.envatousercontent.com/envato-dam-assets-production/EVA/TRX/bc/78/f2/1c/80/v1_E10/E1055YS8.jpg?w=500&cf_fit=scale-down&mark-alpha=18&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark4.png&q=85&format=auto&s=b4bbba63447b38df0407a578d50458cadc25364d6ad72afb8f8c1a0f4efb0e5c"
          alt="Beach"
          className="absolute inset-0 h-full w-full object-cover z-0"
        />

        <div className="relative z-10">
          <Hamb />
          <div className="flex items-center justify-center h-screen px-4 text-center">
            <div className="text-white flex flex-col items-center justify-center ">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider capitalize leading-snug">
                {categoryname}<br />
                <br />
              </h1>
              <p className="mt-6 text-white font-medium tracking-widest text-sm">SCROLL</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-30 z-0" />
      </div>
      <div className="px-2">
        <p className="uppercase text-center py-4 font-semibold text-xl">Food isn’t just found on plates. Booking your own culinary journey is.
        </p>
        <p className="italic text-center py-2">Sure, you’ve eaten well before. But this time, it’s not just about tasting something new..</p>
        <p className="py-2 text-center leading-6">
          This journey is about something deeper—a full immersion into flavors, traditions, and recipes passed down through generations. Culinary travel isn’t one-size-fits-all. Whether you're sampling street food in Bangkok or mastering pasta from a nonna in Tuscany.
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-2">
        {postlist.map((item, index) => (
          <div key={index} className="w-full px-2 py-4">
            <div className="flex flex-col justify-center items-center bg-white w-full border-2 border-gray-100 rounded ">

              <img
                src={item.coverimages[0]}
                alt={item.title}
                className="w-full h-60 object-cover rounded-t-md" // 👈 Change h-60 to desired fixed height
              />

              <div className="text-white py-3 w-full bg-black bg-opacity-60 px-4">
                <h2 className="text-lg font-semibold leading-snug mb-2 capitalize text-white">
                  {item.title}
                </h2>
                <Link
                  href={`/trip-advisor/categories/${categoryname}/${item.slug}`}
                  className="px-4 py-1 border border-white text-white text-sm font-semibold rounded hover:bg-white hover:text-black transition"
                >
                  EXPLORE TRIP
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
