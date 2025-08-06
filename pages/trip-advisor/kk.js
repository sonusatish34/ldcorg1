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
    <div className="mb-4 p-4 border rounded-xl bg-gray-50 w-">
      <div className="text-sm text-gray-500 mb-1">{time}</div>
      <div className="text-lg font-semibold">{title}</div>
      <p className="text-sm text-gray-700 mt-1">{description}</p>
      {cost && <p className="text-sm text-green-600 mt-1">Cost: {cost}</p>}
    </div>
  );

  const plans = [
  {
    type: "1-Day Plan",
    price: "₹5,500 – ₹7,500 (for 5 people)",
    duration: "1 Day",
    schedule: [
      {
        time: "07:00 AM",
        title: "Drive to Simhachalam Temple",
        description:
          "Start from Jagadamba Centre (~20 km, ~45 min by car). Visit Simhachalam Temple (Varaha Lakshmi Narasimha). Special darshan available for ₹100/person. Reach by 7:45 AM for less queue.",
        cost: "₹100/person (special darshan)"
      },
      {
        time: "09:15 AM",
        title: "Breakfast near Simhachalam",
        description:
          "South Indian tiffin: idli, dosa, sambhar, filter coffee.",
        cost: "₹300–₹400 (for 5)"
      },
      {
        time: "10:00 AM",
        title: "Drive to Sri Kanaka Mahalakshmi Temple",
        description:
          "Backtrack ~20 km (~45 min by car). Seva options available (Ksheerabhishekam, Samuhika Ashtothara). Minimal queues if early.",
        cost: "₹20–₹200/person"
      },
      {
        time: "11:00 AM",
        title: "Snacks in Jagadamba area",
        description:
          "Try South Indian snacks or mini biryani near Jagadamba Centre.",
        cost: "₹300–₹400 (for 5)"
      },
      {
        time: "12:00 PM",
        title: "Drive to Kailasagiri Park & Ropeway",
        description:
          "~8–10 km from Jagadamba Centre (~30 min by car). Enjoy ropeway ride, views, and Shiva-Parvati statue.",
        cost: "₹90–₹120 (ropeway), ₹30–₹100 (rides)"
      },
      {
        time: "01:30 PM",
        title: "Lunch at hilltop café",
        description:
          "Food stalls at Kailasagiri hilltop with panoramic views.",
        cost: "₹1,000–₹1,500 (for 5)"
      },
      {
        time: "02:30 PM",
        title: "Drive to INS Submarine Museum & RK Beach",
        description:
          "Drive ~10–12 km via Beach Road (~25 min). Visit India’s only submarine museum followed by a beach walk.",
        cost: "₹80–₹120 (museum), Free (beach)"
      },
      {
        time: "04:30 PM",
        title: "Visit Sampath Vinayagar or Venkateswara Temple",
        description:
          "~2–3 km from Jagadamba. Short queue. Peaceful evening darshan.",
        cost: "Free or ₹30–₹50 (special entry)"
      },
      {
        time: "06:00 PM",
        title: "Dinner at Jagadamba / Suryabagh",
        description:
          "Andhra meals / seafood at popular restaurants.",
        cost: "₹1,500–₹2,000 (for 5)"
      }
    ],
    note:
      "Ideal for a car-based day trip from Jagadamba Centre covering iconic temples, beach, and city views."
  },
  {
    type: "3-Day Plan",
    price: "₹27,500 – ₹30,000 (for 5 people)",
    duration: "3 Days",
    days: [
      {
        title: "Day 1: Temples, Parks & Beach",
        schedule: [
          {
            time: "07:00 AM",
            title: "Simhachalam Temple",
            description:
              "Start from Jagadamba (~20 km, ~45 min drive). Reach by 7:45 AM. ₹100 special darshan. Less crowd early morning.",
            cost: "₹100/person"
          },
          {
            time: "09:15 AM",
            title: "Breakfast at Simhachalam",
            description: "Idli, dosa, sambhar, coffee near temple area.",
            cost: "₹400"
          },
          {
            time: "10:00 AM",
            title: "Sri Kanaka Mahalakshmi Temple",
            description:
              "Backtrack ~20 km (~45 min). Minimal queues. Optional sevas ₹20–₹200.",
            cost: "₹20–₹200/person"
          },
          {
            time: "11:15 AM",
            title: "Snack Break in Jagadamba",
            description: "Light snack near city center.",
            cost: "₹300"
          },
          {
            time: "12:00 PM",
            title: "Kailasagiri Ropeway & Park",
            description:
              "Drive ~10 km (~30 min). Ropeway ride, Shiva-Parvati statue, hilltop park. Enjoy lunch with views.",
            cost: "₹120 ropeway + ₹200 lunch"
          },
          {
            time: "02:00 PM",
            title: "INS Submarine Museum + RK Beach",
            description:
              "From Kailasagiri, ~12 km (~25 min). Explore museum & stroll on beach.",
            cost: "₹100 museum, Free beach"
          },
          {
            time: "04:30 PM",
            title: "Evening Temple (Sampath Vinayagar / Venkateswara)",
            description:
              "Nearby temples in Waltair (~2–3 km). Quick visit (~30 min).",
            cost: "Free or ₹30–₹50"
          },
          {
            time: "06:00 PM",
            title: "Dinner",
            description:
              "Try Andhra thali / seafood at Jagadamba or Suryabagh area.",
            cost: "₹1,500"
          }
        ]
      },
      {
        title: "Day 2: Culture & Coastal Vibes",
        schedule: [
          {
            time: "09:00 AM",
            title: "Visakha Museum",
            description:
              "Located on RK Beach Road (~4 km from Jagadamba). Maritime heritage exhibits.",
            cost: "₹20–₹50"
          },
          {
            time: "10:30 AM",
            title: "Tenneti Park",
            description:
              "Green open space with sea view (~3.5 km from museum). Great for photos.",
            cost: "Free"
          },
          {
            time: "01:00 PM",
            title: "Lunch @ RK Beach",
            description:
              "Seaside restaurants or cafes offering meals & snacks.",
            cost: "₹1,500"
          },
          {
            time: "02:30 PM",
            title: "Matsyadarshini Aquarium",
            description:
              "~4 km from Jagadamba. Marine species display, AC. Visit lasts ~30–45 mins.",
            cost: "₹30–₹50"
          },
          {
            time: "06:00 PM",
            title: "Dinner at Jagadamba",
            description: "Andhra meals or North Indian options.",
            cost: "₹1,000"
          }
        ]
      },
      {
        title: "Day 3: Nature & Wildlife",
        schedule: [
          {
            time: "07:00 AM",
            title: "Drive to Kambalakonda Wildlife Sanctuary",
            description:
              "~16 km (~30–35 min) drive. Birdwatching, nature walk.",
            cost: "₹100–₹200"
          },
          {
            time: "11:00 AM",
            title: "Lunch Stop",
            description:
              "Snack or meals en route or near Kambalakonda.",
            cost: "₹1,000"
          },
          {
            time: "01:00 PM",
            title: "Visit Biodiversity Park",
            description:
              "~5 km inland from Jagadamba (~15 min). Botanical gardens, butterfly zone.",
            cost: "Free or minimal entry"
          },
          {
            time: "04:00 PM",
            title: "Return to City",
            description: "Drive back to Jagadamba, rest and relax.",
            cost: "–"
          },
          {
            time: "06:30 PM",
            title: "Dinner @ Beach Road",
            description: "Seafood or Andhra cuisine with sea breeze.",
            cost: "₹1,500"
          }
        ]
      }
    ],
    note:
      "Designed for car rental users to explore Vizag with comfort and flexibility across temples, beaches, and nature spots."
  }
];


  return (
    <div className="py-20 grid grid-cols-2 gap-x-10">
      {plans.map((plan, idx) => (
        <div key={idx} className=" py-3 px-2">
          <div className="text-2xl font-bold mb-4">{plan.type} itinerary for Vizag</div>
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
