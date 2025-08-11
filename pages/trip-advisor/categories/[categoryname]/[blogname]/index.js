import React, { useState, useCallback } from 'react';
import Hamb from '../../../comps/Hamb';
import { FaShareAltSquare, FaCircle } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import StickyTabs from '../../../comps/StickyTabs';
import ImageZoomCarousal from '../../../comps/ImageZoomCarousal';
import ReviewPopup from './ReviewPopup';
import ReviewCard from './ReviewCard';
import LeafletMap from '@/pages/components/TripPlanner/LeafletMap';
import WeatherData from './WeatherData';
import Image from 'next/image';
import staticPostData from './trips.json';
import { useRouter } from 'next/router';
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const mockBlog = {
  reviews: [
    {
      name: 'John Doe',
      comment: 'An amazing trip with fantastic views!',
      rating: 5
    },
    {
      name: 'Priya Sharma',
      comment: 'Loved the Araku Valley excursion. Very scenic!',
      rating: 4
    }
  ]
};

function ItineraryComponent({ data }) {
  // const uniqueTypes = [...new Set(data.itineraryData.plans.map(plan => plan.type))];
  // const [selectedType, setSelectedType] = useState(uniqueTypes[0]);
  const uniqueTypes = [...new Set(data.itineraryData.plans.map(plan => plan.type))];
  const [selectedType, setSelectedType] = useState(uniqueTypes[0]);
  const [expandedDays, setExpandedDays] = useState({});

  const toggleDay = (dayKey) => {
    setExpandedDays((prev) => ({ ...prev, [dayKey]: !prev[dayKey] }));
  };
  const [expandedItem, setExpandedItem] = useState(null);

const toggleItem = (indexKey) => {
  setExpandedItem(prev => (prev === indexKey ? null : indexKey));
};

const renderScheduleItem = (item, index, countOffset = 1) => {
  const key = `${item.title}-${index}`;
  const isExpanded = expandedItem === key;

  return (
    <div
      key={index}
      className="relative border-l-2 border-dotted border-blue-500 pl-6 pb-4 cursor-pointer"
      onClick={() => toggleItem(key)}
    >
      <div className="absolute -left-3 top-1 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
        {(index + countOffset) === 1 ? '📍' : index + countOffset}
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h4 className="flex flex-col">
            <span className="font-semibold text-lg text-blue-700">{item.title}</span>
            <span>Start at {item.time}</span>
          </h4>
          {isExpanded ? <FaChevronUp size={16} /> : <FaChevronDown size={16} />}
        </div>
        {isExpanded && (
          <div>
            <p className="text-sm text-gray-600">{item.description}</p>
            <p className="text-xs text-gray-500 italic">{item.cost}</p>
          </div>
        )}
      </div>
    </div>
  );
};


  return data.itineraryData && (
    <>
      <div id='itinerary' className="px-4 py-6">
        <h1 className="text-3xl font-bold mb-2 text-blue-700">{data.itineraryData.title}</h1>
        <p className="mb-4 text-gray-600">{data.itineraryData.summary}</p>
        {/* <div className="grid grid-cols-2 gap-2 mb-6">
          {data.coverimages.map((src, idx) => (
            <Image
              key={idx}
              src={src}
              alt={`Cover ${idx}`}
              width={600}
              height={400}
              className="rounded-xl object-cover w-full lg:h-[400px] h-[150px]"
            />
          ))}
        </div> */}


        <div className="flex overflow-x-auto no-scrollbar space-x-4 py-6">
          {uniqueTypes.map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition
              ${selectedType === type
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-black border-gray-300 hover:bg-blue-600 hover:text-white'}`}
            >
              {type}
            </button>
          ))}
        </div>

        {data.itineraryData.plans
          .filter(plan => plan.type === selectedType)
          .map((plan, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-md p-6 mb-8">
              <h2 className="text-2xl font-bold text-blue-700 mb-2">{plan.type}</h2>
              <p className="text-lg text-blue-600 font-semibold mb-1">{plan.price}</p>
              <p className="text-sm text-gray-500 mb-4">Duration: {plan.duration}</p>

              {plan.schedule && (
                <div className="space-y-6">
                  {plan.schedule.map((item, i) => renderScheduleItem(item, i))}
                </div>
              )}

              {plan.days && plan.days.map((day, dIdx) => {
                const key = `${idx}-${dIdx}`;
                return (
                  <div key={key} className="mb-6">
                    <div
                      className="flex items-center justify-between cursor-pointer text-blue-700 font-bold text-lg mb-2"
                      onClick={() => toggleDay(key)}
                    >
                      <span>{day.title}</span>
                      {expandedDays[key] ? <FaChevronUp size={20} /> : <FaChevronDown size={20} />}
                    </div>
                    {expandedDays[key] && (
                      <div className="space-y-6">
                        {day.schedule.map((item, i) => renderScheduleItem(item, i))}
                      </div>
                    )}
                  </div>
                );
              })}

              <p className="text-xs text-gray-500 italic mt-4">{plan.note}</p>
            </div>
          ))}
      </div>

    </>
  );
}


const VizagTrip = () => {
  const router = useRouter();
  const [showReviewPopup, setShowReviewPopup] = useState(false);

  const blogname = router.query.blogname;
  const data = staticPostData[blogname]?.[0] || {};

  if (!router.isReady || !data.title) {
    return <div className="p-10 text-xl">Loading trip details...</div>;
  }

  return (
    <div className="helvetica-font lg:px-32">
      <Hamb />
      <div className="pt-20">
        <p className="px-3 pt-4 lg:text-3xl capitalize">
          See more in{' '}
          {data.populartags?.map((item, idx) => (
            <strong key={idx}>
              {item.replaceAll('-', ' ')}
              {idx < data.populartags.length - 1 ? ', ' : ''}
            </strong>
          ))}
        </p>

        <div className="px-3">
          <p className="flex gap-x-2 items-center pt-4">
            <span>4.4</span>
            <span className="flex gap-x-[1px]">
              <FaCircle color="blue" />
              <FaCircle color="blue" />
              <FaCircle color="blue" />
              <FaCircle color="blue" />
              <FaCircle className="text-white border-2 rounded-full border-black" />
            </span>
            (<span className="underline">4 ratings</span>)
          </p>

          <div>
            <button
              onClick={() => setShowReviewPopup(true)}
              className="flex items-center gap-x-2 py-3 text-xl"
            >
              <BsPencilSquare className="animate-bounce" />
              Write a review
            </button>

            {showReviewPopup && (
              <ReviewPopup slug={'vizag-coastal-tour'} onClose={() => setShowReviewPopup(false)} />
            )}
          </div>
        </div>

        <p className="text-2xl lg:text-5xl py-2 font-bold flex px-3 lg:py-6 capitalize items-center gap-2">
          <span>{data?.title || 'Untitled Trip'}</span>
          <FaShareAltSquare color="blue" size={30} />
        </p>

        <div className="pt-5">
          <ImageZoomCarousal images={data.coverimages} />
        </div>

        <div className="p-3 pb-4 lg:py-10">
          <WeatherData />
        </div>

        <div className="max-w-3xl lg:max-w-full mx-auto">
          <StickyTabs />

          <div id="overview" className="py-6 px-4">
            <h2 className="text-3xl font-semibold mb-2">About</h2>
            <p>{data.content}</p>
          </div>

          <div id="details" className="py-6 px-4">
            {data.latitude && (
              <LeafletMap lat={data.latitude} lon={data.longitude} area={data.title} />
            )}
            <p className="pt-4">{data.besttime}</p>
          </div>

          <ItineraryComponent data={data} />

          <div id="reviews" className="px-4">
            <h2 className="text-xl font-semibold mb-4">Traveler Reviews</h2>
            {mockBlog.reviews.map((review, idx) => (
              <ReviewCard key={idx} review={review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VizagTrip;
