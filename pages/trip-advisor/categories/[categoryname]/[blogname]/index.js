import React, { useState, useCallback } from 'react';
import Hamb from '../../../comps/Hamb';
import { FaShareAltSquare, FaCircle } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import useEmblaCarousel from 'embla-carousel-react';
import StickyTabs from '../../../comps/StickyTabs';
import ImageZoomCarousal from '../../../comps/ImageZoomCarousal';
import ReviewPopup from './ReviewPopup';
import ReviewCard from './ReviewCard';
import LeafletMap from '@/pages/components/TripPlanner/LeafletMap';
import WeatherData from './WeatherData';
import Image from 'next/image';
import staticPostData from './trips.json';
import { useRouter } from 'next/router';

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
  const uniqueTypes = [...new Set(data.itineraryData.plans.map(plan => plan.type))];
  const [selectedType, setSelectedType] = useState(uniqueTypes[0]);


  return data.itineraryData && (
    <>
      {/* Buttons to select itinerary type */}


      {/* Itinerary Section */}
      <div id="itinerary" className="lg:pt-6">
        <div className="px-4 lg:hidden">
          <h1 className="text-3xl font-bold mb-4">{data.itineraryData.title}</h1>
          <p className="mb-4 text-gray-600">{data.itineraryData.summary}</p>
          <Image
            src={data.itineraryData.coverImage}
            alt="Itinerary Cover"
            width={1200}
            height={600}
            className="rounded-xl mb-6"
          />
          <div className="flex overflow-x-auto space-x-4 px-4 py-4">
            {uniqueTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`whitespace-nowrap px-4 py-2 rounded-full border transition
              ${selectedType === type
                    ? 'bg-green-600 text-white border-green-600'
                    : 'bg-white text-black border-gray-300 hover:bg-green-600 hover:text-white'}`}
              >
                {type}
              </button>
            ))}
          </div>
          {/* Show selected itinerary only */}
          {selectedType && (
            <div id={selectedType.replace(/\s+/g, '').toLowerCase()} className="mb-10">
              <h2 className="text-2xl font-semibold mb-4">{selectedType} Itinerary</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {data.itineraryData.plans
                  .filter(plan => plan.type === selectedType)
                  .map((plan, idx) => (
                    <div key={idx} className="border p-4 rounded-2xl shadow-md bg-white">
                      <p></p>
                      <h2 className="text-xl font-semibold mb-2">{plan.type}</h2>
                      <p className="text-2xl font-bold text-green-600 mb-1">{plan.price}</p>
                      <p className="text-sm text-gray-500 mb-3">{plan.duration}</p>
                      <ul className="list-disc pl-5 text-sm mb-3">
                        {plan.highlights.map((item, i) => (
                          <li key={i}>{item}</li>

                        ))}
                      </ul>
                      <p className="text-xs text-gray-500 italic">{plan.note}</p>
                    </div>
                  ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <p>kjioj</p>
      <div className='hidden lg:grid grid-cols-3 gap-10 '>
        {uniqueTypes.map((selectedType, index) => (
          <div id={selectedType.replace(/\s+/g, '').toLowerCase()} className="mb-10">
            <h2 className="text-2xl font-semibold mb-4">{selectedType} Itinerary</h2>
            <div className="">
              {data.itineraryData.plans
                .filter(plan => plan.type === selectedType)
                .map((plan, idx) => (
                  <div key={idx} className="border p-4 rounded-2xl shadow-md bg-white">
                    <p></p>
                    <h2 className="text-xl font-semibold mb-2">{plan.type}</h2>
                    <p className="text-2xl font-bold text-green-600 mb-1">{plan.price}</p>
                    <p className="text-sm text-gray-500 mb-3">{plan.duration}</p>
                    <ul className="list-disc pl-5 text-sm mb-3">
                      {plan.highlights.map((item, i) => (
                        <li key={i}>{item}</li>

                      ))}
                    </ul>
                    <p className="text-xs text-gray-500 italic">{plan.note}</p>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}


const VizagTrip = () => {
  const router = useRouter();
  const [showReviewPopup, setShowReviewPopup] = useState(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  const blogname = router.query.blogname;
  const data = staticPostData[blogname]?.[0] || {};

  if (!router.isReady || !data.title) {
    return <div className="p-10 text-xl">Loading trip details...</div>;
  }

  return (
    <div className="helvetica-font lg:px-32">
      <Hamb />
      <div className="pt-20">
        <p className="px-3 lg:text-3xl capitalize">
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

        <p className="text-2xl py-2 font-bold flex px-3 capitalize items-center gap-2">
          <span>{data?.title || 'Untitled Trip'}</span>
          <FaShareAltSquare color="blue" size={30} />
        </p>

        <div className="pt-5">
          <ImageZoomCarousal images={data.coverimages} />
        </div>

        <div className="px-3 pb-4 lg:pt-64">
          <WeatherData />
        </div>

        <div className="max-w-3xl lg:max-w-full mx-auto">
          <StickyTabs />

          <div id="overview" className="py-6 px-4">
            <h2 className="text-xl font-semibold mb-2">About</h2>
            <p>{data.content}</p>
          </div>

          <div id="details" className="py-6 px-4">
            {data.latitude && (
              <LeafletMap lat={data.latitude} lon={data.longitude} area={data.title} />
            )}
            <p className="pt-4">{data.besttime}</p>
          </div>

          {/* Safe rendering of itineraryData */}
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
