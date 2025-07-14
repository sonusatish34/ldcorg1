import { useState } from "react";
import Link from "next/link";
const tabs = ["BY TRAVELLER", "MOST POPULAR", "BY MONTH", "IN THE SPOTLIGHT"];

const data = {
  "BY TRAVELLER": [
    { title: "Travel", link: '/trip-advisor/categories/travel', image: "https://www.tripointholidays.com/images/incentivetour/main/goa-main1.jpg" },
    { title: "heritage and culture", image: "https://media1.thrillophilia.com/filestore/jezkw1hz3yrpmiqlbobdguc5f54m_shutterstock_1938178192.jpg?w=400&dpr=2" },
    { title: "Tourism", image: "https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png" },
  ],
  "MOST POPULAR": [
    { title: "Bali", image: "https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png" },
    { title: "Dubai", image: "https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png" },
  ],
  "BY MONTH": [
    { title: "Summer", image: "https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png" },
    { title: "Winter", image: "https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png" },
  ],
  "IN THE SPOTLIGHT": [
    { title: "Adventure", image: "https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png" },
    { title: "Luxury", image: "https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png" },
  ],
};

export default function JourneySection() {


  const Card = ({ title, image, link }) => {
    return (
      <Link
        href={link ? link : ''}
        className="relative h-64 rounded-lg overflow-hidden shadow-lg"
        style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <h2 className="text-white text-2xl font-semibold">{title}</h2>
        </div>
      </Link>
    );
  }


  const [activeTab, setActiveTab] = useState("BY TRAVELLER");

  return (
    <div className="max-w-4xl lg:max-w-full  px-4 py-10 ">
      <p className="text-3xl uppercase text-center py-4 lg:text-5xl">Start your journey</p>
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

      <div className="grid grid-cols-1 lg:grid-cols-2 items-center  gap-3 lobster-font ">
        {data[activeTab].map((item, idx) => (
          <Card key={idx} title={item.title} image={item.image} link={item.link} />
        ))}
      </div>
    </div>
  );
}
