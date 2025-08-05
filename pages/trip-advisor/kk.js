// components/DetailedItinerary.js
import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const DetailedItinerary = () => {
  const [expandedDay, setExpandedDay] = useState(null);
  const [showFullDay1, setShowFullDay1] = useState(false);

  const toggleDay = (index) => {
    setExpandedDay(expandedDay === index ? null : index);
  };

  const renderItem = (time, title, description, cost) => (
    <div className="mb-4 p-4 border rounded-xl bg-gray-50">
      <div className="text-sm text-gray-500 mb-1">{time}</div>
      <div className="text-lg font-semibold">{title}</div>
      <p className="text-sm text-gray-700 mt-1">{description}</p>
      {cost && <p className="text-sm text-green-600 mt-1">Cost: {cost}</p>}
    </div>
  );

  const plans = [
    {
      type: "1-Day Plan",
      price: "₹5,500 – ₹7,500",
      duration: "1 Day",
      schedule: [
        { time: "07:00 AM", title: "Breakfast", description: "Idli, dosa, vada at local South Indian restaurant", cost: "₹600–₹700 (for 5)" },
        { time: "08:30 AM", title: "Kanaka Durga Temple", description: "Famous temple on Indrakeeladri Hill", cost: "Free" },
        { time: "10:00 AM", title: "Prakasam Barrage & Bhavani Island", description: "Barrage visit + boat to Bhavani Island", cost: "₹300–₹500 (boat), ₹1,000–₹1,500 (optional activities)" },
        { time: "12:00 PM", title: "Undavalli Caves", description: "Ancient rock-cut caves", cost: "₹5–₹10 per person" },
        { time: "01:00 PM", title: "Lunch", description: "Traditional Andhra thali or biryani", cost: "₹1,000–₹1,500 (for 5)" },
        { time: "02:00 PM", title: "Victoria Jubilee Museum", description: "Historic artefacts and sculptures", cost: "₹10–₹20 per person" },
        { time: "03:00 PM", title: "Gandhi Hill", description: "Viewpoint with stupas and planetarium", cost: "₹10–₹20 per person" },
        { time: "04:00 PM", title: "Kondapalli Fort", description: "Hill fort with city view", cost: "₹5 per adult" },
        { time: "06:00 PM", title: "Shopping at Besant Road", description: "Vibrant area with food and shopping", cost: "₹200–₹300 (group)" },
        { time: "07:30 PM", title: "Dinner", description: "Dinner at local restaurant", cost: "₹1,500–₹2,000 (for 5)" }
      ],
      note: "Perfect for a quick spiritual and cultural dive into the city."
    },
    {
      type: "3-Day Plan",
      price: "₹27,500 – ₹30,000 (for 5 people)",
      duration: "3 Days",
      days: [
        {
          title: "Temple & Island",
          schedule: [
            { time: "08:30 AM", title: "Kanaka Durga Temple", description: "Hilltop temple with Krishna River view", cost: "Free / ₹2,500 for special darshan" },
            { time: "11:00 AM", title: "Bhavani Island", description: "Boat ride and water activities", cost: "₹250 (entry) + ₹500 (boating) + ₹1200 (lunch)" },
            { time: "03:00 PM", title: "Victoria Museum", description: "Historic exhibits", cost: "₹20 per person" },
            { time: "05:00 PM", title: "Undavalli Caves", description: "Rock-cut caves with sculpture", cost: "₹25 per person" },
            { time: "07:30 PM", title: "Dinner @ Babai Hotel", description: "Andhra meals & Gongura chicken", cost: "₹1000 (for 5)" },
            { time: "Night", title: "Stay @ Gateway Hotel", description: "2 Rooms for 1 night", cost: "₹4000" }
          ]
        },
        {
          title: "History & Fun",
          schedule: [
            { time: "08:00 AM", title: "Breakfast @ Idli Dosa & Co", description: "Ghee karam dosa & tea", cost: "₹500" },
            { time: "09:30 AM", title: "Prakasam Barrage", description: "Iconic bridge view", cost: "Free" },
            { time: "11:00 AM", title: "Kondapalli Fort", description: "Panoramic view + toy shops", cost: "₹20 per person" },
            { time: "01:00 PM", title: "Lunch @ Sweet Magic", description: "Biryani combo", cost: "₹1500" },
            { time: "03:00 PM", title: "Haailand Theme Park", description: "Rides, rain dance, slides", cost: "₹750 per person" },
            { time: "07:30 PM", title: "Dinner @ R.R. Durbar", description: "Andhra curry & jeera rice", cost: "₹1000" },
            { time: "Night", title: "Stay @ Treebo Trend Empire", description: "2 Rooms", cost: "₹3000" }
          ]
        },
        {
          title: "Culture & Leisure",
          schedule: [
            { time: "08:00 AM", title: "Breakfast @ Sri Ramayya Mess", description: "Mini tiffin & coffee", cost: "₹450" },
            { time: "09:00 AM", title: "Mangalagiri Temple & Handloom", description: "Cotton sarees & temple", cost: "Free" },
            { time: "12:00 PM", title: "Rajiv Gandhi Park", description: "Mini Zoo & gardens", cost: "₹10 per person" },
            { time: "01:30 PM", title: "Lunch @ Minerva Grand", description: "Veg thali / buffet", cost: "₹1500" },
            { time: "02:30 PM", title: "INOX @ PVP Mall", description: "Movie + snacks", cost: "₹1750 (5 pax)" },
            { time: "05:30 PM", title: "Barista Café", description: "Evening coffee break", cost: "₹700" },
            { time: "07:30 PM", title: "Dinner @ TFL Rooftop", description: "Chinese & Indian fusion", cost: "₹1300" }
          ]
        }
      ],
      note: "Ideal for families and groups seeking a mix of heritage, fun, and leisure."
    }
  ];

  return (
    <div className="space-y-10">
      {plans.map((plan, idx) => (
        <div key={idx} className="max-w-4xl mx-auto">
          <div className="text-2xl font-bold mb-4">{plan.type} Itinerary</div>
          <div>
            <div className="border rounded-2xl p-6 bg-white shadow-md">
              <h3 className="text-xl font-semibold mb-1">{plan.type}</h3>
              <p className="text-2xl font-bold text-green-600 mb-1">{plan.price}</p>
              <p className="text-sm text-gray-500 mb-3">{plan.duration}</p>
              {plan.days ? (
                <div>
                  {plan.days.map((day, index) => (
                    <div key={index} className="mb-4">
                      <button
                        onClick={() => toggleDay(index)}
                        className="w-full flex justify-between items-center text-left px-4 py-2 border rounded-xl hover:bg-green-50"
                      >
                        <span className="text-lg font-semibold">Day {index + 1}: {day.title}</span>
                        {expandedDay === index ? <FaChevronUp /> : <FaChevronDown />}
                      </button>
                      {expandedDay === index && (
                        <div className="mt-2 space-y-2">
                          {day.schedule.map((item, idx) => (
                            <div key={idx}>{renderItem(item.time, item.title, item.description, item.cost)}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-2">
                  {(showFullDay1 ? plan.schedule : plan.schedule.slice(0, 3)).map((item, idx) => (
                    <div key={idx}>{renderItem(item.time, item.title, item.description, item.cost)}</div>
                  ))}
                  {!showFullDay1 && plan.schedule.length > 3 && (
                    <button
                      onClick={() => setShowFullDay1(true)}
                      className="text-green-600 underline mt-2 text-sm"
                    >
                      Click to view full itinerary
                    </button>
                  )}
                </div>
              )}
              <p className="text-xs text-gray-500 italic mt-4">{plan.note}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DetailedItinerary;
