import React, { useEffect, useState } from 'react';
import Hamb from '../../../comps/Hamb';
import { FaShareAltSquare } from "react-icons/fa";
import { FaCircle } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import useEmblaCarousel from 'embla-carousel-react';
import { useCallback } from 'react';
import { ChevronLeft, ChevronRight, SunDim } from 'lucide-react';
import { FaCloudSun } from "react-icons/fa";
import StickyTabs from '../../../comps/StickyTabs'; // Assuming StickyTabs is in the same directory
import ImageZoomCarousal from '../../../comps/ImageZoomCarousal';
import { doc, updateDoc, arrayUnion, getDocs, query, collection, where } from "firebase/firestore";
import { fireDb } from '../../../../../public/firebase';
import ReviewPopup from './ReviewPopup';
import ReviewCard from './ReviewCard';
import Link from 'next/link';
import WeatherData from './WeatherData';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const LeafletMap = dynamic(() => import('@/pages/components/TripPlanner/LeafletMap'), {
    ssr: false,
});
const ComponentName = () => {
    const router = useRouter();
    const { blogname } = router.query;
    // console.log(blogname, 'mkk');
    const images = [
        'https://s7ap1.scene7.com/is/image/incredibleindia/birla-temple-hyderabad-secunderabad-telangana-1-attr-hero?qlt=82&ts=1726652871883',
        '/hf.jpg',
        '/5.webp',
    ];

    const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });

    const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);
    const [weather, setWeather] = React.useState(null);
    const [postData, setPostData] = useState([])
    useEffect(() => {
        const requestOptions = {
            method: "GET",
            redirect: "follow"
        };

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${postData.latitude}&lon=${postData.longitude}&appid=86d51960c36a0b664453ee16948001bd`, requestOptions)
            .then((response) => response.json())
            .then((result) => setWeather(result))
            .catch((error) => console.error(error));
    }, [])
    // console.log(weather, 'oo');

    useEffect(() => {
        const fetchPostAndRelated = async () => {
            try {
                // setLoading(true); // Set loading state to true
                const q = query(collection(fireDb, "trips"), where("slug", "==", blogname));
                const querySnapshot = await getDocs(q);
                const postDoc = querySnapshot.docs[0];
                const postData = postDoc.data();
                console.log(postData, 'postData');
                setPostData(postData)
            } catch (error) {
                console.error("Error fetching post or related posts:", error);
            } finally {
                // setLoading(false);  // Stop loader once data is fetched
            }
        };

        if (blogname) {
            fetchPostAndRelated();
        }
    }, [blogname]);
    const [showReviewPopup, setShowReviewPopup] = useState(false);
    const mockBlog = {
        title: "Trip to Egypt",
        slug: "trip-to-egypt",
        reviews: [
            {
                name: "Antonio Manuel S",
                location: "Mortagua, Portugal",
                rating: 5,
                title: "5★ Tour",
                date: "Jun 2025",
                type: "Friends",
                description: `We made a tour with Wonder Travel Egypt, it was a fantastic experience with guides in Portuguese. A special thanks to Lina for all the attention.`,
                likes: 0,
                dislikes: 0,
                images: [],
            },
            {
                name: "Pioneer03216730625",
                location: "",
                rating: 4,
                title: "Luxor...Valley of the Kings",
                date: "Jun 2025",
                type: "Family",
                description: `A busy hot day but Walleed our tour guide made sure we were comfortable and well taken care of...he helped to guide us to three incredible tombs...Nice tours has delivered on an incredible tour at a great price...thank you again to Walleed for a great time...`,
                likes: 1,
                dislikes: 0,
                images: [
                    "https://source.unsplash.com/random/100x100?egypt1",
                    "https://source.unsplash.com/random/100x100?egypt2",
                ],
            },
        ],
    };

    return (
        <div className='helvetica-font lg:px-32'>
            <Hamb />
            <div className='pt-20'>
                <p className=' px-3 lg:text-3xl capitalize'>See more in <span className=''> {postData?.populartags?.map((item)=>(<strong>{item.replaceAll('-',' ')} ,</strong>))}</span> </p>
                <div className='px-3'>
                    <p className='flex gap-x-2 items-center pt-4'>
                        <span>4.4</span>
                        <span className='flex gap-x-[1px]'><FaCircle color='blue' /><FaCircle color='blue' /><FaCircle color='blue' /><FaCircle color='blue' /><FaCircle className='text-white border-2 rounded-full border-black' /></span>
                        (<span className='underline'>4 ratings</span>)
                    </p>
                    <div>
                        
                        <p className=''>
                            <button onClick={() => setShowReviewPopup(true)} className='flex items-center gap-x-2 py-3 text-xl'>
                                <BsPencilSquare className='animate-bounce'/>Write a review
                            </button>
                        </p>

                        {showReviewPopup && (
                            <ReviewPopup
                                slug={blogname}
                                onClose={() => setShowReviewPopup(false)}
                            />
                        )}
                    </div>
                </div>
                <p className='text-2xl py-2 font-bold flex px-3 capitalize'><span>{postData?.title}</span><span><FaShareAltSquare color='blue' size={30} /></span></p>
                <div className="pt-5">
                    <ImageZoomCarousal images={postData?.coverimages} />
                </div>
                <div className='px-3 pb-4 lg:pt-64'> <WeatherData /></div>
                <div className="max-w-3xl lg:max-w-full mx-auto">
                    <StickyTabs />
                    <div id="overview" className="py-6 px-4">
                        <h2 className="text-xl font-semibold mb-2">About</h2>
                        <p dangerouslySetInnerHTML={{ __html: postData?.content }}>

                        </p>
                    </div>
                    <div id="details" className="py-6 px-4">
                        {postData?.latitude && <LeafletMap lat={postData?.latitude} lon={postData?.longitude} area={postData?.title} />}
                        <p dangerouslySetInnerHTML={{ __html: postData?.besttime }}>

                        </p>
                    </div>
                    <div id='reviews' className=" mx-auto p-6">
                        {/* <h1 className="text-3xl font-bold mb-6">{mockBlog.title}</h1> */}

                        <h2 className="text-xl font-semibold mb-4">Traveler Reviews</h2>
                        {mockBlog.reviews.map((review, idx) => (
                            <ReviewCard key={idx} review={review} />
                        ))}
                    </div>

                    <div id="itinerary" className="pt-16 px-4">
                        <h2 className="text-xl font-semibold mb-2">Itinerary</h2>
                        <ul className="list-disc pl-5">
                            <li>    Day 1: Arrival in Munnar</li>
                            <li>    Day 2: Sightseeing Tour</li>
                        </ul>
                    </div>

                    
                </div>

            </div>
        </div>
    );
};

export default ComponentName;