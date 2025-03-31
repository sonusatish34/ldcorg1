import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import CarProducts from './components/CarProducts';
const DynCallBackForm = dynamic(() => import('./components/CallBackForm/CallBackForm'), { ssr: false });
const DynNearYou = dynamic(() => import('./components/NearYou/NearYou'), { ssr: false });
const DynImageChange = dynamic(() => import('./components/ImageChange/ImageChange'), { ssr: false });
const DynNearByApi = dynamic(() => import('./components/NearByApi/NearByApi'), { ssr: false });
const GetInTouch = dynamic(() => import('./components/GetInTouch/GetInTouch'), { ssr: false });
const FeaturedCars = dynamic(() => import('./components/FeaturedCars/FeaturedCars'), { ssr: false });
const DynamicFaqComponent = dynamic(() => import('./components/FaqAccordian/FaqAccordian'), { ssr: false });
const DynWhyChooseUs = dynamic(() => import('./components/WhyChooseUs/WhyChooseUs'), { ssr: false });

import Layout from './components/Layout/Layout';    
import PriceList from './components/PriceList/PriceList';
import Head from 'next/head';
import PopUp from './components/PopUp';


export default function Place({ cars, canonicalUrl }) {
    const [carData2, setCarData2] = useState(null);


    useEffect(() => {
        async function fetchCarDetails() {
            try {
                const response = await fetch(`https://api.longdrivecarz.in/site/cars-info?location=hyderabad`);
                const items = await response.json();
                const cars = items?.data?.results;
                setCarData2(cars);
            } catch (error) {
                ``
                console.error('Error fetching car details:', error);
            }
        }
        fetchCarDetails();
    }, []);
    // console.log(cars, "ooo");

    return (
        <div>
            <Layout phoneno={"9000-478-478"}>
                <Head>
                    <title>Self-Drive Cars: No Deposit, Unlimited KMs</title>
                    <meta name="description" content="Cars Starting From ₹1488/day, Swift ₹1680/day, Ertiga ₹2496/day. Get 1 day free car for new users. Home delivery available & Check real car images." />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta property="og:title" content="Self-Drive Cars: No Deposit, Unlimited KMs" />
                    <meta property="og:description" content="Cars Starting From ₹1488/day, Swift ₹1680/day, Ertiga ₹2496/day. Get 1 day free car for new users. Home delivery available & Check real car images." />
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=AW-16731119855"
                    ></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'AW-16731119855');
                    `,
                        }}
                    ></script>
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=G-8RGJTJSJCW">
                    </script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-8RGJTJSJCW');
                    `,
                        }}
                    ></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                                new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                                j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                                'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                                })(window,document,'script','dataLayer','GTM-KBCJDV6F');`,
                        }}
                    />
                    <link rel="canonical" href={canonicalUrl} />
                </Head>
                <div className='pt-32 lg:pt-0'>
                    <CarProducts data={cars} phoneno={'9000478478'} wspno={'9666677405'} count={7} />
                    <DynImageChange locname={'hyderabad'} />
                    <div>
                        <DynNearByApi />
                    </div>
                    <div><DynNearYou /></div>
                    <FeaturedCars data={cars} branch={"hyderabad"} />
                    <DynCallBackForm />
                    <DynWhyChooseUs />
                    <div className='bg-white rounded xl:py-12 lg:px-14 xl:px-14 p-2'>
                        <p className='uppercase p-2 mb-4 text-center text-black font-bold xl:text-2xl font-manrope'>Frequently asked questions</p>
                        <DynamicFaqComponent />
                    </div>
                    <GetInTouch phoneno={'9000478478'} wspno={'9666677405'} />
                    <PriceList city={'hyd'} />
                    <PopUp />
                </div>
            </Layout>
        </div>
    );
}

export async function getServerSideProps({ req }) {
    const response = await fetch('https://api.longdrivecarz.in/site/cars-info?location=hyderabad');
    const items = await response.json();
    const cars = items?.data?.results;

    const filteredCars = cars?.map(car => ({
        maker_model: car.maker_model,
        price_24_hours: car.price_24_hours,
        car_image_front_view: car.car_image_front_view,
        car_image_back_view: car.car_image_back_view,
        car_image_back_inner: car.car_image_back_inner,
        car_image_car_left_view: car.car_image_car_left_view,
        car_image_reading_view: car.car_image_reading_view,
        fuel_type: car.fuel_type,
        transmission_type: car.transmission_type,
        seater: car.seater,
    }));

    const host = req.headers.host;
    const canonicalUrl = host.includes('.in')
        ? 'https://www.longdrivecars.in'
        : 'https://www.longdrivecars.com';

    return {
        props: {
            cars: filteredCars,  // Return only the filtered data
            canonicalUrl,
        },
    };
}
