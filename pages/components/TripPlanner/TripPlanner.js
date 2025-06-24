'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import TripPlannerPopup from '../TripPlannerPopup';
import { Search } from 'lucide-react';

export default function TripPlannerHero() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');

  return (
    <div className="relative py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900 overflow-hidden">
      <div className="relative z-10 max-w-4xl mx-auto px-4 mxs:px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-3xl overflow-hidden shadow-2xl relative"
        >
          {/* Background Video */}
          <video
            className="absolute inset-0 w-full h-full object-cover"
            src="/kl.mp4"
            autoPlay
            loop
            muted
          />
          <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />

          {/* Content */}
          <div className="relative z-10 py-12 px-6 text-white text-center space-y-6">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl font-extrabold tracking-wide text-[#F3F3E0]"
            >
              ✈️ Let Us Plan Your Perfect Trip!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-[#F3F3E0] opacity-90"
            >
              Share your dates & preferences — we’ll handle the rest.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="py-4 px-2 bg-white/10  rounded-xl border  shadow-xl"
            >
              <div className="flex items-center border-b border-white/30 pb-2 px-2">
                <Search className="w-5 h-5 text-white/80" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Places to go, things to do, hotels..."
                  className="ml-3 w-full bg-transparent outline-none text-white placeholder:text-white/60 focus:ring-0"
                />
              </div>

              <ul className="grid grid-cols-2 gap-2 text-xs text-white px-1 pt-4">
                {['Hyderabad to Goa', 'Hyderabad to Coorg', 'Weekend Getaways', 'Beach Vibes'].map((item, i) => (
                  <motion.li
                    key={i}
                    whileHover={{ scale: 1.05 }}
                    className="py-2 px-2 rounded-md bg-black/30 hover:bg-white/20 transition-colors"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>

              <button
                onClick={() => alert(`Searching for: ${query}`)}
                className="w-full mt-4 py-2 bg-gradient-to-r from-green-400 to-lime-400 hover:brightness-110 text-black font-semibold rounded-full transition-all duration-200"
              >
                Search
              </button>
            </motion.div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="bg-orange-500 hover:bg-orange-600 px-6 w-full py-3 rounded-full text-lg font-semibold shadow-lg"
              onClick={() => setIsOpen(!isOpen)}
            >
              Plan a Trip for Me
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Popup */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>
          <div className="relative z-10 w-full">
            <TripPlannerPopup onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
