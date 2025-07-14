// 'use client';

// import { useEffect, useState } from "react";
// import Hamb from "../../comps/Hamb";
// import { fireDb } from '../../../../public/firebase';
// import { getDocs, collection, query, where } from 'firebase/firestore';
// import { useRouter } from "next/router";
// import Link from "next/link";
// import dmsl from '../../categories/[categoryname]/[blogname]/categories.json'
// export default function Home() {
//   // const [postlist, setPostlist] = useState([])
//   const router = useRouter();
//   // console.log(router,'kl');
//   const { categoryname } = router.query;
//   console.log(dmsl, 'dmsl');

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const postsQuery = query(collection(fireDb, "trips"));
//         const postsQuerySnapshot = await getDocs(postsQuery);
//         const posts = postsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         console.log(posts, 'lol');
//       }
//       catch {
//         // console.error(err); 
//       }
//     };

//     fetchData();
//   }, [categoryname]);
//   const postlist=  [
//     {
//       title:'vizag-coastal-and-cultural-tour',
//       coverimages:['/1.webp'],
//       slug:'vizag-coastal-and-cultural-tour'
//     },
//     {
//       title:'kisjdks',
//       coverimages:['/2.webp'],
//       slug:''
//     },
//     {
//       title:'kisjdks',
//       coverimages:['/2.webp'],
//       slug:''
//     },
//   ]


//   return (
//     <div>
//       <div className="relative h-screen w-full overflow-hidden">
//         <img
//           src="/travel.jpg"
//           alt="Beach"
//           className="absolute inset-0 h-full w-full object-cover z-0"
//         />

//         <div className="relative z-10">
//           <Hamb />
//           <div className="flex items-center justify-center h-screen px-4 text-center">
//             <div className="text-white flex flex-col items-center justify-center ">
//               <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider capitalize leading-snug">
//                 {categoryname}<br />
//                 <br />
//               </h1>
//               <p className="mt-6 text-white font-medium tracking-widest text-sm">SCROLL</p>
//             </div>
//           </div>
//         </div>
//         <div className="absolute inset-0 bg-black opacity-30 z-0" />
//       </div>
//       <div className="px-2">
//         <p className="uppercase text-center py-4 font-semibold text-xl">Travel isn’t just about getting from place to place. Booking your own journey of discovery is.
//         </p>
//         <p className="italic text-center py-2">Sure, you’ve traveled before. But this time, it’s not just about seeing something new…</p>
//         <p className="py-2 text-center leading-6">
//           This journey is about something deeper—a full immersion into cultures, landscapes, and stories passed down through generations. Travel isn’t one-size-fits-all. Whether you're wandering souks in Marrakech or hiking hidden trails in Patagonia.
//         </p>
//       </div>
//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:px-20">
//         {postlist.map((item, index) => (
//           <div key={index} className="w-full px-2 py-4 rounded-md">
//             <div className="flex flex-col justify-center items-center bg-white w-full border-2 border-gray-100 rounded ">
//               <img
//                 src={item.coverimages[0]}
//                 alt={item.title}
//                 className="w-full h-60 object-cover rounded-t-md" // 👈 Change h-60 to desired fixed height
//               />
//               <div className="text-white py-3 w-full bg-black bg-opacity-60 px-4">
//                 <h2 className="text-lg font-semibold leading-snug mb-2 capitalize text-white">
//                   {item.title}
//                 </h2>
//                 <Link
//                   href={`/trip-advisor/categories/${categoryname}/${item.slug}`}
//                   className="px-4 py-1 border border-white text-white text-sm font-semibold rounded hover:bg-white hover:text-black transition"
//                 >
//                   EXPLORE TRIP
//                 </Link>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>

//     </div>
//   );
// }

'use client';

import { useEffect } from "react";
import Hamb from "../../comps/Hamb";
import { useRouter } from "next/router";
import Link from "next/link";
import dmsl from '../../categories/[categoryname]/[blogname]/categories.json';

export default function Home() {
  const router = useRouter();
  const { categoryname } = router.query;

  // If categoryname is not yet loaded or invalid
  if (!categoryname || !dmsl[categoryname]) {
    return <div className="text-center mt-20 text-xl">Loading...</div>;
  }

  const categoryData = dmsl[categoryname];
  const { title, subtitle, description, trips } = categoryData;

  return (
    <div>
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src="/travel.jpg"
          alt="Beach"
          className="absolute inset-0 h-full w-full object-cover z-0"
        />

        <div className="relative z-10">
          <Hamb />
          <div className="flex items-center justify-center h-screen px-4 text-center">
            <div className="text-white flex flex-col items-center justify-center ">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider capitalize leading-snug">
                {categoryname}
                <br /><br />
              </h1>
              <p className="mt-6 text-white font-medium tracking-widest text-sm">SCROLL</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-30 z-0" />
      </div>

      <div className="px-2">
        <p className="uppercase text-center py-4 font-semibold text-xl">{title}</p>
        <p className="italic text-center py-2">{subtitle}</p>
        <p className="py-2 text-center leading-6">{description}</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:px-20">
        {trips.map((item, index) => (
          <div key={index} className="w-full px-2 py-4 ">
            <div className="flex flex-col gap-y-2 justify-center items-center bg-white w-full border-2 border-gray-100 rounded-md ">
              <img
                src={item.imagelink} // you can also include this path in the JSON to avoid hardcoding
                alt={item.imageAlt}
                className="w-full h-60 object-cover rounded-t-md"
              />
              <div className="py-3 w-full  text-black bg-opacity-30 px-4 rounded-b-md flex flex-col gap-y-1">
                <h2 className="text-lg font-semibold leading-snug mb-2 capitalize ">
                  {item.title}
                </h2>
                <Link
                  href={`/trip-advisor/categories/${categoryname}/${item.title.replace(/\s+/g, '-').toLowerCase()}`}
                  className="px-4 py-2 border border-black w-fit  text-sm font-semibold rounded hover:bg-white hover:text-black transition"
                >
                  {item.buttonText}
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

