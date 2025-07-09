'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function TripPlannerHero() {
  const [showTourism, setShowTourism] = useState(false);
  const [showTemples, setShowTemples] = useState(false);

  const regionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <div className="relative py-20 bg-gradient-to-r from-indigo-300 via-purple-500 to-pink-900 overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        src="/kl.mp4"
        autoPlay
        loop
        muted
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm z-0" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-[1px] border border-white/10 py-8 px-3"
        >
          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-3xl lg:text-4xl font-extrabold tracking-wide text-[#F3F3E0] text-center mb-6"
          >
            ✈️ Let's Plan Your Perfect Trip!
          </motion.h1>

          {/* Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex justify-center gap-4 mb-6"
          >
            <button
              onClick={() => {
                setShowTourism(true);
                setShowTemples(false);
              }}
              className={`py-2 px-4 font-semibold rounded-lg transition-all duration-300 ${
                showTourism
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Tourism
            </button>
            <button
              onClick={() => {
                setShowTemples(true);
                setShowTourism(false);
              }}
              className={`py-2 px-4 font-semibold rounded-lg transition-all duration-300 ${
                showTemples
                  ? 'bg-white text-black shadow-lg'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              Temples
            </button>
          </motion.div>

          {/* Destination Lists */}
          {showTourism && (
            <motion.ul
              initial="hidden"
              animate="visible"
              className="grid grid-cols-3 gap-4 text-sm text-white mb-8"
            >
              {['Karnataka', 'Kerala', 'Goa'].map((place, i) => (
                <motion.li
                  key={place}
                  custom={i}
                  variants={regionVariants}
                  className="py-2 px-4 text-center rounded-lg bg-black/30 hover:bg-white/30 hover:text-black font-semibold cursor-pointer transition-all"
                >
                  {place === 'Karnataka' ? (
                    <Link href="/trip-advisor">{place}</Link>
                  ) : (
                    place
                  )}
                </motion.li>
              ))}
            </motion.ul>
          )}

          {showTemples && (
            <motion.ul
              initial="hidden"
              animate="visible"
              className="grid grid-cols-2 gap-4 text-sm text-white mb-8"
            >
              {[
                {
                  name: 'Sri Durga Malleswara Swamy',
                  href: '/trip-advisor/temples/sri-durga-malleswara-swamy',
                },
                {
                  name: 'Kanipakam Vinayaka Temple',
                  href: '',
                },
              ].map((temple, i) => (
                <motion.li
                  key={temple.name}
                  custom={i}
                  variants={regionVariants}
                  className="py-2 px-4 text-center rounded-lg bg-black/30 hover:bg-white/30 hover:text-black font-semibold cursor-pointer transition-all"
                >
                  {temple.href ? <Link href={temple.href}>{temple.name}</Link> : temple.name}
                </motion.li>
              ))}
            </motion.ul>
          )}

          {/* CTA Button */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <Link href="/trip-advisor">
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full shadow-lg transition-all">
                Plan a Trip for Me
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
