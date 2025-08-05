'use client';
import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays, differenceInDays } from 'date-fns';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';
import 'swiper/css/pagination';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import Image from 'next/image';
export default function TripPlannerHero() {
  const [showTourism, setShowTourism] = useState(false);
  const [showTemples, setShowTemples] = useState(false);
  const [tripDays, setTripDays] = useState(null);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 0),
      key: 'selection',
    },
  ]);

  const carRates = [
    { name: 'Swift', rate: 2500, image: 'https://ldcars.blr1.cdn.digitaloceanspaces.com/ldcars_nextjs_images/cars/20000/Swift.webp', color: 'Red' },
    { name: 'Breeza', rate: 3500, image: 'https://ldcars.blr1.cdn.digitaloceanspaces.com/ldcars_nextjs_images/cars/20000/breeaza.webp', color: 'White' },
    { name: 'Innova', rate: 4500, image: 'https://ldcars.blr1.cdn.digitaloceanspaces.com/ldcars_nextjs_images/cars/60000/InnovaCrysta.webp', description: 'Innova-Hycross', color: 'Silver' },
    { name: 'Ertiga', rate: 2800, image: 'https://ldcars.blr1.cdn.digitaloceanspaces.com/ldcars_nextjs_images/cars/30000/ERTIGA_RED.webp', color: 'Blue' },
  ];

  const totalDays = dateRange[0].startDate && dateRange[0].endDate
    ? Math.max(differenceInDays(dateRange[0].endDate, dateRange[0].startDate) + 1, 1)
    : 0;

  return (
    <div className="relative py-20 bg-gradient-to-r from-indigo-300 via-purple-500 to-pink-900 overflow-hidden">
      <video className="absolute inset-0 w-full h-full object-cover z-0" src="/green.mp4" autoPlay loop muted />
      <div className="absolute inset-0 bg-black/40 backdrop-blur-[0px] z-0" />

      <div className="relative z-10 max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl overflow-hidden shadow-2xl bg-white/10 backdrop-blur-[1px] border border-white/10 py-8 px-3"
        >
          <h1 className="text-3xl lg:text-4xl font-extrabold text-[#F3F3E0] text-center mb-6">
            ✈️ Let's Plan Your Perfect Trip!
          </h1>

          {/* Day Selector */}
          <div className="text-center text-white mb-4 font-semibold text-lg">
            How many days do you want to plan?
          </div>
          <div className="overflow-x-auto no-scrollbar mb-4 flex lg:items-center lg:justify-center">
            <div className="flex lg:items-center lg:justify-center gap-3 w-max px-2">
              {[1, 2, 3, 4].map((day) => (
                <button
                  key={day}
                  onClick={() => {
                    setTripDays(day);
                    setDateRange([{ startDate: new Date(), endDate: addDays(new Date(), day - 1), key: 'selection' }]);
                    setCalendarVisible(false);
                  }}
                  className={`min-w-[80px] px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap ${tripDays === day
                    ? 'bg-white text-black shadow-lg'
                    : 'bg-white/20 text-white hover:bg-white/30'
                    }`}
                >
                  {day} Day{day > 1 ? 's' : ''}
                </button>
              ))}
            </div>
          </div>

          {/* Calendar Toggle */}
          {tripDays && (
            <div className="text-center mb-6">
              <button
                onClick={() => setCalendarVisible(true)}
                className="text-white bg-blue-500 hover:bg-blue-600 px-5 py-2 rounded-full font-semibold"
              >
                Select Dates in Calendar
              </button>
            </div>
          )}

          {/* Calendar UI */}
          {calendarVisible && (
            <div className="flex justify-center mb-6">
              <DateRange
                editableDateInputs={true}
                onChange={(item) => {
                  setDateRange([item.selection]);
                  const days = Math.max(
                    differenceInDays(item.selection.endDate, item.selection.startDate) + 1,
                    1
                  );
                  setTripDays(days);
                }}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                minDate={new Date()}
                rangeColors={['#3b82f6']}
              />
            </div>
          )}

          {totalDays > 0 && tripDays && (
            <div className="bg-white/20 rounded-xl p-4 mb-6 text-white">
              <h3 className="text-lg font-semibold mb-4 text-center">
                Available Cars for {totalDays} Day{totalDays > 1 ? 's' : ''}
              </h3>

              <Swiper
                spaceBetween={16}
                slidesPerView={1.2}
                breakpoints={{
                  640: { slidesPerView: 2.2 },
                  768: { slidesPerView: 3 },
                  1024: { slidesPerView: 4 },
                }}
                className="px-1"
              >
                {carRates.map(({ name, rate, image, color }) => (
                  <SwiperSlide key={name}>
                    <div className="bg-black/30 rounded-xl overflow-hidden shadow-md text-center flex flex-col items-center">
                      <Image height={500} width={500} src={image} alt={name} className=" h-28 w-40" />
                      <div className="p-3">
                        <div className="text-lg font-bold">{name}</div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}

          {/* Category Tabs */}
          <div className="flex justify-center gap-4 mb-6">
            <Link
              href={'/trip-advisor'}
              className={`py-2 px-4 font-semibold rounded-lg transition-all ${showTourism ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
            >
              Tourism
            </Link>
            <Link 
            href={'/trip-advisor/temples'}
              className={`py-2 px-4 font-semibold rounded-lg transition-all ${showTemples ? 'bg-white text-black' : 'bg-white/10 text-white hover:bg-white/20'
                }`}
            >
              Temples
            </Link>
          </div>



          {/* CTA Button */}
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/trip-advisor">
              <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-full shadow-lg">
                Plan a Trip for Me
              </button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
