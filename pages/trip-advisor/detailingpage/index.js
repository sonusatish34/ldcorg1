import React, { useEffect } from 'react';
import Hamb from '../comps/Hamb';
import { FaShareAltSquare } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { ChevronLeft, ChevronRight, SunDim } from 'lucide-react';
import { FaCloudSun } from "react-icons/fa";
import StickyTabs from '../comps/StickyTabs';
import ImageZoomCarousal from '../comps/ImageZoomCarousal';
import Link from 'next/link';
import WeatherData from '../categories/[categoryname]/[blogname]/WeatherData';
import dynamic from 'next/dynamic';
const LeafletMap = dynamic(() => import('@/pages/components/TripPlanner/LeafletMap'), {
    ssr: false, 
});
const ComponentName = (props) => {

    const images = [
        'https://s7ap1.scene7.com/is/image/incredibleindia/birla-temple-hyderabad-secunderabad-telangana-1-attr-hero?qlt=82&ts=1726652871883',
        '/hf.jpg',
        '/5.webp',
    ];

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const [weather, setWeather] = React.useState(null);

    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch("https://api.openweathermap.org/data/2.5/weather?lat=10.0889&lon=77.0595&appid=86d51960c36a0b664453ee16948001bd", requestOptions)
            .then((response) => response.json())
            .then((result) => setWeather(result))
            .catch((error) => console.error(error));
    }, [])
    console.log(weather, 'oo');

    return (
        <div className='helvetica-font'>
            <Hamb />

            <div className='pt-20'>
                <p className='underline px-3'>See all things to do in Munnar </p>
                <div className='px-3'>
                    <p className='flex gap-x-2 items-center pt-4'>
                        <span>4.4</span>
                        <span className='flex gap-x-[1px]'><FaCircle color='blue' /><FaCircle color='blue' /><FaCircle color='blue' /><FaCircle color='blue' /><FaCircle className='text-white border-2 rounded-full border-black' /></span>
                        (<span className='underline'>4 ratings</span>)</p>
                    <p className=''><Link href={'/trip-advisor/test'} className='flex items-center gap-x-2 py-3'><BsPencilSquare />Write a review</Link></p>
                </div>
                <p className='text-2xl py-2 font-bold flex px-3'><span>Munnar Amazing site seeing covering all famous places</span><span><FaShareAltSquare color='blue' size={30} /></span></p>

                <div className="pt-5">
                    <ImageZoomCarousal images={images} />
                </div>

                <div className='px-3 pb-4'> <WeatherData /></div>

                <div className="max-w-3xl mx-auto">
                    <StickyTabs />
                    {/* Content Sections */}
                    <div id="overview" className="py-6 px-4">
                        <h2 className="text-xl font-semibold mb-2">About</h2>
                        <p>
                            Birla Mandir is a beautiful and peaceful Temple located in the Naubath Pahad hill. It was built in 1976 which is made up of entirely white marble and is dedicated to Lord Venkateswara. And the temple is a mix of South Indian, Rajasthani and it is looking like a unique And attractive.From the temple visitors can enjoy the stunning Views of the City and it is located nearby the Hussain Sagar, prasad imax lake there are also shrines for other deities like Shiva, Ganesh, and Hanuman. The temple is a quiet place, perfect for prayer and meditation.
                        </p>
                    </div>
                    <LeafletMap lon={78} lat={17} />
                    <div id="details" className="py-6 px-4">
                        <h2 className="text-xl font-semibold mb-2">Details</h2>
                        <p>Includes transportation, lunch, entry tickets...</p>
                        <ul>
                            <li><span>Timings : </span> <span> day from 7:00 AM to 12:00 PM and again from 3:00 PM to 9:00 PM </span></li>
                        </ul>
                    </div>

                    <div id="itinerary" className="pt-16 px-4">
                        <h2 className="text-xl font-semibold mb-2">Itinerary</h2>
                        <ul className="list-disc pl-5">
                            <li>    Day 1: Arrival in Munnar</li>
                            <li>    Day 2: Sightseeing Tour</li>
                        </ul>
                    </div>
                    <div id="reviews" className="py-6 px-4">
                        <h2 className="text-xl font-semibold mb-2">Reviews</h2>
                        <p>⭐⭐⭐⭐⭐ - Great tour!</p>

                        <p>⭐⭐⭐ - Great tour!</p>

                        <p>⭐⭐⭐⭐⭐ - Great tour!</p>

                        <p>⭐⭐⭐⭐ - Great tour!</p>

                        <p>⭐⭐⭐⭐⭐ - Great tour!</p>

                        <p>⭐⭐⭐⭐ - Great tour!</p>

                    </div>
                </div>

            </div>
        </div>
    );
};

export default ComponentName;