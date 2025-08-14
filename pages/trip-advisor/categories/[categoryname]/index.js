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
  const { title, subtitle, description, trips, imagelink } = categoryData;

  return (
    <div>
      <div className="relative h-screen w-full overflow-hidden">
        {/* <img
          src={imagelink}
          alt="Beach"
          className="absolute inset-0 h-full w-full object-cover z-0"
        /> */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src={imagelink}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
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
        <div className="absolute inset-0 bg-black opacity-5 z-0" />
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
                src={item.imagelink}
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

