'use client';

import Hamb from "../comps/Hamb";

export default function Home() {
  return (
    <div>
      <div className="relative h-screen w-full overflow-hidden">
        <img
          src="https://en-media.thebetterindia.com/uploads/2015/05/Screenshot-from-2015-05-28-142833.png"
          alt="Beach"
          className="absolute inset-0 h-full w-full object-cover z-0"
        />

        <div className="relative z-10">
          <Hamb />
          <div className="flex items-center justify-between h-screen px-4 text-center">
            <div className="text-white flex flex-col items-center ">
              <h1 className="text-4xl md:text-5xl font-extrabold tracking-wider capitalize leading-snug">
                Culture and Heritage<br />
                <br />
              </h1>
              <p className="mt-6 text-white font-medium tracking-widest text-sm">SCROLL</p>
            </div>
          </div>
        </div>
        <div className="absolute inset-0 bg-black opacity-30 z-0" />
      </div>
      <div className="px-2">
        <p className="uppercase text-center py-4 font-semibold text-xl">Culture isn’t just found in museums. Booking your own culture trip is.
        </p>
        <p className="italic text-center py-2">Sure, you’ve travelled before. But this time, it’s not just about ticking off sights.</p>
        <p className="py-2 text-center leading-6">
          This journey is about something deeper—a full immersion into stories, traditions, and legacies that have shaped the world and might just shape you too. Culture and heritage travel isn’t one-size-fits-all. Whether you’re tracing family roots through Europe, walking the ancient paths of forgotten empires, or simply looking to understand a place beyond the surface, your trip should reflect your curiosity and connection—not a brochure’s checklist
        </p>
      </div>
      <div className="flex flex-col justify-center items-center gap-y-4 py-5">
        <div className="relative w-full max-w-sm h-96">
          {/* Full-size image */}
          <div className="h-52">

            <img
              src="/comingsoon.webp" // replace with your actual image path
              alt="Hawaii & French Polynesia"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg object-cover"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg" />

          <div className="absolute top-4 right-4 z-20 text-white text-sm font-semibold tracking-wider">
            15 NIGHTS
          </div>

          {/* Bottom text content */}
          <div className="absolute bottom-2 left-3 right-6 z-20 text-white">
            <h2 className="text-lg font-semibold leading-snug mb-4">
              HAWAII & FRENCH POLYNESIA: A LUXURY HONEYMOON OF PACIFIC ISLAND HOPPING
            </h2>
            <button className="px-5 py-2 border border-white text-white text-sm font-semibold rounded-md hover:bg-white hover:text-black transition">
              EXPLORE TRIP
            </button>
          </div>
        </div>
        <div className="relative w-full max-w-sm h-96">
          {/* Full-size image */}
          <div className="h-52">

            <img
              src="/comingsoon.webp" // replace with your actual image path
              alt="Hawaii & French Polynesia"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg object-cover"
              priority
            />
          </div>

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent rounded-lg" />

          <div className="absolute top-4 right-4 z-20 text-white text-sm font-semibold tracking-wider">
            15 NIGHTS
          </div>

          {/* Bottom text content */}
          <div className="absolute bottom-2 left-3 right-6 z-20 text-white">
            <h2 className="text-lg font-semibold leading-snug mb-4">
              HAWAII & FRENCH POLYNESIA: A LUXURY HONEYMOON OF PACIFIC ISLAND HOPPING
            </h2>
            <button className="px-5 py-2 border border-white text-white text-sm font-semibold rounded-md hover:bg-white hover:text-black transition">
              EXPLORE TRIP
            </button>
          </div>
        </div>
      </div>
    </div>

  );
}
