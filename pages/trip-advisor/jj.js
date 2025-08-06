"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

const itineraryData = [
  {
    date: "1-Day Plan",
    price: "₹5,500 – ₹7,500 (for 5 people)",
    duration: "1 Day",
    note: "Ideal for a car-based day trip from Jagadamba Centre covering iconic temples, beach, and city views.",
    schedule: [
      {
        time: "07:00 AM",
        title: "Simhachalam Temple",
        description:
          "Start from Jagadamba (~20 km, ~45 min drive). Reach by 7:45 AM. ₹100 special darshan. Less crowd early morning.",
        cost: "₹100/person",
      },
      {
        time: "09:15 AM",
        title: "Breakfast near Simhachalam",
        description:
          "South Indian tiffin: idli, dosa, sambhar, filter coffee.",
        cost: "₹300–₹400 (for 5)",
      },
      {
        time: "10:00 AM",
        title: "Sri Kanaka Mahalakshmi Temple",
        description:
          "Backtrack ~20 km (~45 min). Sevas like Ksheerabhishekam (Fri only), Panchamruthabhishekam, Samuhika Ashtothara.",
        cost: "₹20–₹516/person",
      },
      {
        time: "11:00 AM",
        title: "Snacks at Jagadamba",
        description:
          "Try vada, upma, or mini biryani in Jagadamba Centre.",
        cost: "₹300–₹400 (for 5)",
      },
      {
        time: "12:00 PM",
        title: "Kailasagiri Park & Ropeway",
        description:
          "Hilltop ropeway ride, views, Shiva-Parvati statue. Toy train optional.",
        cost: "₹90–₹120 (ropeway) + ₹30–₹100 (rides)",
      },
      {
        time: "01:30 PM",
        title: "Lunch @ Kailasagiri",
        description: "Eat at hilltop cafe with sea view.",
        cost: "₹1,000–₹1,500 (for 5)",
      },
      {
        time: "02:30 PM",
        title: "INS Submarine Museum + RK Beach",
        description:
          "Visit India’s only submarine museum and walk on RK Beach.",
        cost: "₹80–₹120 (museum), Free (beach)",
      },
      {
        time: "04:30 PM",
        title: "Evening Temple Visit",
        description:
          "Choose Sampath Vinayagar or Venkateswara Temple (near Waltair/Asilmetta).",
        cost: "Free or ₹30–₹50",
      },
      {
        time: "06:00 PM",
        title: "Dinner at Jagadamba / Suryabagh",
        description: "Andhra meals or seafood at popular restaurants.",
        cost: "₹1,500–₹2,000 (for 5)",
      },
    ],
  },
];

export default function TripPlanner() {
  const [activeDay, setActiveDay] = useState(null);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Your Trip Planner</h2>

      {itineraryData.map((plan, i) => (
        <div
          key={i}
          className="bg-white shadow-md rounded-2xl border border-gray-200 mb-4"
        >
          <button
            className="w-full text-left p-4 flex items-center justify-between hover:bg-gray-50"
            onClick={() => setActiveDay(activeDay === i ? null : i)}
          >
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{plan.date}</h3>
              <p className="text-sm text-gray-500">{plan.price}</p>
            </div>
            {activeDay === i ? <ChevronUp /> : <ChevronDown />}
          </button>

          <AnimatePresence initial={false}>
            {activeDay === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4">
                  {plan.schedule.map((item, j) => (
                    <div
                      key={j}
                      className="mt-3 p-3 rounded-xl border border-gray-100 bg-gray-50"
                    >
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500 font-medium">
                          {item.time}
                        </span>
                        <span className="text-xs text-gray-600 font-medium">
                          {item.cost}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold mt-1 text-gray-800">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {item.description}
                      </p>
                    </div>
                  ))}
                  <p className="text-xs text-gray-400 mt-3 italic">
                    {plan.note}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}