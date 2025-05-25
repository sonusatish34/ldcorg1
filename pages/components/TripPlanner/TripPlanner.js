import React from "react";
import Image from "next/image";
import Link from "next/link";
// import tripplannerbtn from "../../images/tripplannerbtn.png"; // you can design this or replace with button
import tripbg from "../../images/tripbg.webp"; // decorative background
import tripmap from "../../images/tripmap.webp"; // map or planning-related image

function TripPlanner({ city }) {
  return (
    <div className="pt-10 relative overflow-hidden py-10 px-4 sm:px-6 lg:px-16 xl:px-24 bg-gradient-to-br from-purple-900 via-pink-700 to-indigo-900 rounded-lg shadow-lg">
      {/* Background Visual */}
      <div className="absolute inset-0 opacity-20">
        {/* <Image
          src={tripbg}
          layout="fill"
          objectFit="cover"
          alt="Trip background"
        /> */}
      </div>

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
        {/* Text Section */}
        <div className="flex flex-col items-center lg:items-start text-white text-center lg:text-left space-y-5">
          <h1 className="text-4xl lg:text-5xl font-bold leading-tight drop-shadow-md">
            Plan Your Next Trip With Us
          </h1>
          <p className="text-lg lg:text-2xl opacity-90">
            Discover routes, estimated time, and exciting travel options from your location!
          </p>

          <Link
            href={`${city?.length ? city : ""}/plan-your-trip`}
            className="relative group"
          >
            <span className="inline-block px-8 py-3 rounded-full text-white font-semibold text-lg bg-yellow-400 hover:bg-yellow-500 transition-all duration-300 shadow-lg group-hover:scale-105 animate-pulse">
              Start Planning
            </span>
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-600 rounded-full animate-ping" />
          </Link>
        </div>

        {/* Image Section */}
        <div className="hidden lg:flex justify-center items-center relative">
          <Link href={`${city?.length ? city : ""}/plan-your-trip`}>
            {/* <Image
              src={tripmap}
              alt="Trip map"
              width={600}
              height={400}
              className="rounded-lg shadow-2xl hover:scale-105 transition-transform duration-300" */}
            {/* /> */}
          </Link>
        </div>
      </div>

      {/* Bonus Cards or Highlights */}
      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-white">
        <div className="p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-md hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">Smart Route Suggestions</h3>
          <p className="text-sm">Get intelligent route options based on traffic and weather.</p>
        </div>
        <div className="p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-md hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">Multiple Destination Support</h3>
          <p className="text-sm">Plan complex trips with multiple stops with ease.</p>
        </div>
        <div className="p-6 bg-white bg-opacity-10 rounded-lg backdrop-blur-md hover:scale-105 transition">
          <h3 className="text-xl font-semibold mb-2">Budget Estimator</h3>
          <p className="text-sm">Estimate fuel and toll costs before you even start.</p>
        </div>
      </div>
    </div>
  );
}

export default TripPlanner;
