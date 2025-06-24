import { useState } from "react";

const tabs = ["BY TRAVELLER", "MOST POPULAR", "BY MONTH", "IN THE SPOTLIGHT"];

const data = {
  "BY TRAVELLER": [
    { title: "FAMILY", image: "https://www.tripointholidays.com/images/incentivetour/main/goa-main1.jpg"},
    { title: "GROUPS", image: "https://media1.thrillophilia.com/filestore/jezkw1hz3yrpmiqlbobdguc5f54m_shutterstock_1938178192.jpg?w=400&dpr=2" },
    { title: "COUPLES", image: "https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png" },
  ],
  "MOST POPULAR": [
    { title: "BALI", image: "https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png" },
    { title: "DUBAI", image: "https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png" },
  ],
  "BY MONTH": [
    { title: "SUMMER", image: "https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png" },
    { title: "WINTER", image: "https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png" },
  ],
  "IN THE SPOTLIGHT": [
    { title: "ADVENTURE", image: "https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png" },
    { title: "LUXURY", image: "https://tripoventure.com/wp-content/uploads/2022/08/Untitled-design-76.png" },
  ],
};

export default function JourneySection() {


  const Card = ({ title, image }) => {
  return (
    <div
      className="relative h-64 rounded-lg overflow-hidden shadow-lg"
      style={{ backgroundImage: `url(${image})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
        <h2 className="text-white text-2xl font-semibold">{title}</h2>
      </div>
    </div>
  );
}


  const [activeTab, setActiveTab] = useState("BY TRAVELLER");

  return (
    <div className="max-w-4xl mx-auto px-4">
      <p className="text-3xl uppercase text-center py-4">Start your journey</p>
      <div className="flex justify-center gap-6 text-sm font-medium mb-8">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-1 ${
              activeTab === tab
                ? "text-black border-b-2 border-pink-500"
                : "text-gray-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="grid lg:grid-col-3 gap-6 ">
        {data[activeTab].map((item, idx) => (
          <Card key={idx} title={item.title} image={item.image} />
        ))}
      </div>
    </div>
  );
}
