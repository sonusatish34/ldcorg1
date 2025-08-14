import { useState } from "react";
import Link from "next/link";

const tabs = ["BY TRAVELLER", "MOST POPULAR", "BY STATE", "IN THE SPOTLIGHT"];

export default function JourneySection() {
  const [activeTab, setActiveTab] = useState("BY TRAVELLER");

  return (
    <div className="max-w-4xl lg:max-w-full px-4 py-10">
      <p className="text-3xl uppercase text-center py-4 lg:text-5xl">Start your journey</p>

      {/* Tab Selector */}
      <div className="flex justify-center gap-6 lg:gap-x-10 text-sm font-medium mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`lg:text-3xl lg:pt-5 pb-1 ${activeTab === tab
              ? "text-black border-b-2 lg:border-b-4 border-pink-500"
              : "text-gray-600"
              }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* BY TRAVELLER */}
      {activeTab === "BY TRAVELLER" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 ">
          {/* Travel */}
          <Link
            href="/trip-advisor/categories/travel"
            className="relative h-64 rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(https://www.tripointholidays.com/images/incentivetour/main/goa-main1.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >

            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl font-semibold lobster-font">Travel</h2>
              <div className="absolute bottom-4 left-5">
                <div>
                  <p className="py-1 capitalize text-white">packages from </p>
                  <ul className=" lg:text-lg text-sm flex gap-x-3 text-white">
                    {['₹2000/day', '₹3000/day', '₹4000/day'].map((item) => (
                      <li className="py-1 px-2 font-semibold rounded-lg transition-all bg-white/20 text-white hover:bg-white/20">{item}</li>
                    ))}
                  </ul>

                </div>
              </div>

            </div>
            {/* <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl font-semibold lobster-font">Travel</h2>
              <div className="absolute bottom-10 left-20">
                <p>kooooo</p>
                <ul className=" text-lg flex gap-x-3 text-white">
                  {['solo', 'family', 'Friends', 'Group'].map((item) => (
                    <li className="py-1 px-4 font-semibold rounded-lg transition-all bg-white/50 text-black hover:bg-white/20">{item}</li>
                  ))}
                </ul>
              </div>
            </div> */}
          </Link>

          {/* Cities */}
          <Link
            href="/trip-advisor/categories/cities"
            className="relative h-64 rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(https://d1di04ifehjy6m.cloudfront.net/media/filer_public/6a/ca/6aca5ab2-5d4c-4be2-aa41-7d707ec98c50/5_fastest_growing_cities_in_india.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl font-semibold">Cities</h2>
              <div className="absolute bottom-4 left-5">
                <div>
                  <p className="py-1 capitalize text-white">packages from </p>
                  <ul className=" lg:text-lg text-sm flex gap-x-3 text-white">
                    {['₹2000/day', '₹3000/day', '₹4000/day'].map((item) => (
                      <li className="py-1 px-2 font-semibold rounded-lg transition-all bg-white/20 text-white hover:bg-white/20">{item}</li>
                    ))}
                  </ul>

                </div>
              </div>
            </div>
          </Link>
          <Link
            href="/trip-advisor/temples"
            target="_blank"
            className="relative h-64 rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(https://www.tourmyindia.com/blog//wp-content/uploads/2024/02/Must-Visit-Temples-in-South-India.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl font-semibold">Temples</h2>
              <div className="absolute bottom-4 left-5">
                <div>
                  <p className="py-1 capitalize text-white">packages from </p>
                  <ul className=" lg:text-lg text-sm flex gap-x-3 text-white">
                    {['₹2000/day', '₹3000/day', '₹4000/day'].map((item) => (
                      <li className="py-1 px-2 font-semibold rounded-lg transition-all bg-white/20 text-white hover:bg-white/20">{item}</li>
                    ))}
                  </ul>

                </div>
              </div>
            </div>
          </Link>

          {/* Tourism */}
          <div
            className="relative h-64 rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl font-semibold">Tourism</h2>
              <div className="absolute bottom-4 left-5">
                <div>
                  <p className="py-1 capitalize text-white">packages from </p>
                  <ul className=" lg:text-lg text-sm flex gap-x-3 text-white">
                    {['₹2000/day', '₹3000/day', '₹4000/day'].map((item) => (
                      <li className="py-1 px-2 font-semibold rounded-lg transition-all bg-white/20 text-white hover:bg-white/20">{item}</li>
                    ))}
                  </ul>

                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MOST POPULAR */}
      {activeTab === "MOST POPULAR" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lobster-font">
          <div
            className="relative h-64 rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl font-semibold">Bali</h2>
            </div>
          </div>

          <div
            className="relative h-64 rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl font-semibold">Dubai</h2>
            </div>
          </div>
        </div>
      )}

      {/* BY STATE */}
      {activeTab === "BY STATE" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lobster-font">
          <div
            className="relative h-64 rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(https://www.ibef.org/assets/images/states/Telangana-2.jpg)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl font-semibold">Telangana</h2>
            </div>
          </div>

          <div
            className="relative h-64 rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(https://i0.wp.com/www.tusktravel.com/blog/wp-content/uploads/2023/06/Hampi-in-karnataka-min.jpg?fit=1024%2C668&ssl=1)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl font-semibold">Karnataka</h2>
            </div>
          </div>

          <div
            className="relative h-64 rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(https://5.imimg.com/data5/ZK/IB/RI/GLADMIN-11915225/selection-762-500x500.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl font-semibold">Tamilnadu</h2>
            </div>
          </div>

          <div
            className="relative h-64 rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(https://media.istockphoto.com/id/1285898933/photo/tall-buddha-statue-in-andhra-pradesh-state-amaravathi-india.jpg?s=1024x1024&w=is&k=20&c=srotmG6Bw9Fpv7hQSY_SM-7EJF5OBVFtVeGC9EMG9GQ=)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl font-semibold">Andhra Pradesh</h2>
            </div>
          </div>
        </div>
      )}

      {/* IN THE SPOTLIGHT */}
      {activeTab === "IN THE SPOTLIGHT" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lobster-font">
          <div
            className="relative h-64 rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl font-semibold">Adventure</h2>
            </div>
          </div>

          <div
            className="relative h-64 rounded-lg overflow-hidden shadow-lg"
            style={{
              backgroundImage: `url(https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <h2 className="text-white text-2xl font-semibold">Luxury</h2>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
