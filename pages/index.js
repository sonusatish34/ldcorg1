import React from 'react';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import CarProducts from './components/CarProducts';
import { useInView } from 'react-intersection-observer';
import TripPlanner from './components/TripPlanner/TripPlanner';
import SearchFilter from './components/TripPlanner/SearchFilter';
const DynCallBackForm = dynamic(() => import('./components/CallBackForm/CallBackForm'));
const DynNearYou = dynamic(() => import('./components/NearYou/NearYou'));
const DynImageChange = dynamic(() => import('./components/ImageChange/ImageChange'), { ssr: false });
const DynNearByApi = dynamic(() => import('./components/NearByApi/NearByApi'), { ssr: false });
const GetInTouch = dynamic(() => import('./components/GetInTouch/GetInTouch'), { ssr: false });
const FeaturedCars = dynamic(() => import('./components/FeaturedCars/FeaturedCars'));
const DynamicFaqComponent = dynamic(() => import('./components/FaqAccordian/FaqAccordian'), { ssr: false });
const DynWhyChooseUs = dynamic(() => import('./components/WhyChooseUs/WhyChooseUs'), { ssr: false });

import Layout from './components/Layout/Layout';
import PriceList from './components/PriceList/PriceList';
import Head from 'next/head';
import PopUp from './components/PopUp';

export default function Place({ cars, canonicalUrl }) {
    const { ref: ref1, inView: inView1 } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: ref2, inView: inView2 } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: ref3, inView: inView3 } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: ref4, inView: inView4 } = useInView({ triggerOnce: true, threshold: 0.1 });
    const { ref: tripRef, inView: tripInView } = useInView({ triggerOnce: true, threshold: 0. });
    const [animateTrip, setAnimateTrip] = useState(false);

    useEffect(() => {

        if (tripInView) {
            console.log('TripPlanner is now in view');

            setAnimateTrip(true);
        }
    }, [tripInView]);
    console.log(animateTrip, '0000-888211222');

    return (
        <div>
            <Layout phoneno={"9000-478-478"}>
                <Head>
                    <title>No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U</title>
                    <meta id="meta-desc" name="description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta property="og:title" content="No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U" />
                    <meta property="og:description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content={`${canonicalUrl}`} />
                    <meta property="og:image" content="https://www.longdrivecars.com/logos/logo3.webp" />
                    <meta name="robots" content="index, follow" />
                    <link rel="canonical" href={canonicalUrl} />
                </Head>
                <div className='pt-32 lg:pt-0'>
                    {/* <CarProducts data={cars} phoneno={'9000478478'} wspno={'9666677405'} count={7} /> */}
                    <div ref={ref1}>
                        {inView1 && <DynImageChange locname={'hyderabad'} />}
                    </div>
                    <div ref={tripRef} className={''}>
                        <TripPlanner />
                        <p></p>
                    </div>
                    <DynNearByApi />
                    <DynNearYou />
                    {/* <FeaturedCars data=
                    {cars} branch={"hyderabad"} /> */}
                    <DynCallBackForm />
                    <div ref={ref2}>
                        {inView2 && <DynWhyChooseUs />}
                    </div>
                    <div className='bg-white rounded xl:py-12 lg:px-14 xl:px-14 p-2'>
                        <p className='uppercase p-2 mb-4 text-center text-black font-bold xl:text-2xl font-manrope'>Frequently asked questions</p>

                        <div ref={ref3}>
                            {inView3 && <DynamicFaqComponent />}
                        </div>
                    </div>
                    <div ref={ref3}>
                        {inView3 && <GetInTouch phoneno={'9000478478'} wspno={'9666677405'} />}
                    </div>

                    <PriceList city={'hyd'} />
                    <div ref={ref4}>
                        {inView4 && <PopUp />}
                    </div>

                </div>
            </Layout>
        </div>
    );
}



