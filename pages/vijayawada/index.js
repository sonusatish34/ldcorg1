import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';

import CarProducts from '../components/CarProducts';
import Header from '../components/Hamburger/HamburgerMenu';
// import { useEffect } from 'react';
const DynCallBackForm = dynamic(() => import('../components/CallBackForm/CallBackForm'));
const DynNearYou = dynamic(() => import('../components/NearYou/NearYou'));
const DynImageChange = dynamic(() => import('../components/ImageChange/ImageChange'));
const DynNearByApi = dynamic(() => import('../components/NearByApi/NearByApi'));
const GetInTouch = dynamic(() => import('../components/GetInTouch/GetInTouch'));
const FeaturedCars = dynamic(() => import('../components/FeaturedCars/FeaturedCars'));
const DynamicFaqComponent = dynamic(() => import('../components/FaqAccordian/FaqAccordian'));
import DynWhyChooseUs from '../components/WhyChooseUs/WhyChooseUs';
import Layout from '../components/Layout/Layout';
import PriceList from '../components/PriceList/PriceList';
import Head from 'next/head';
import PopUp from '../components/PopUp';

export default function Place({cars,canonicalUrl}) {
    const [carData, setCarData] = useState(null);
    const [carData2, setCarData2] = useState(null);

    useEffect(() => {
        async function fetchCarDetails() {
            try {
                const response = await fetch(`https://api.longdrivecarz.in/site/cars-info?location=hyderabad`);
                const items = await response.json();
                const cars = items?.data?.results;
                setCarData2(cars);
            } catch (error) {``
                console.error('Error fetching car details:', error);
            }
        }
        fetchCarDetails();
    }, []);
    return (
        <div>
            <Layout locname={'vijayawada'} phoneno={"96666-99583"}>
                <Head>
                    <title>No Deposit & Unlimited km - Travel with low-cost Self drive car rentals services</title>
                    <meta name="description" content="Explore with Self-drive cars starting at ₹1488/day. With low prices, Book Dzire ₹1680/day,Ertiga ₹2496/day or Install Long Drive Cars app for more options." />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta property="og:title" content="  Unlimited km - Travel with low-cost Self drive car rentals services" />
                    <meta property="og:description" content="Explore with Self-drive cars starting at ₹1488/day. With low prices, Book Dzire ₹1680/day,Ertiga ₹2496/day or Install Long Drive Cars app for more options." />
                    
                    <script
                        async
                        src="https://www.googletagmanager.com/gtag/js?id=AW-16647839094"
                    ></script>
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'AW-16647839094');
                    `,
                        }}
                    ></script>
                    <link rel="canonical" href={canonicalUrl} />
                </Head>
                <div className='pt-32 lg:pt-0'>
                    <CarProducts data={cars} branch={"vijayawada"} phoneno={'9666699583'} count={7}/>
                    <DynImageChange locname={'Vijayawada'}/>
                    <div>
                        <DynNearByApi city={'vijayawada'}/>
                    </div>
                    <div><DynNearYou /></div>
                    <FeaturedCars data={carData2} branch={"vijayawada"} />
                    <DynCallBackForm />
                    <DynWhyChooseUs />
                    <div className='bg-white rounded xl:py-12 lg:px-14 xl:px-14 p-2'>
                        <p className='uppercase p-2 mb-4 text-center text-black font-bold xl:text-2xl font-manrope'>Frequently asked questions</p>
                        <DynamicFaqComponent />
                    </div>
                    <GetInTouch phoneno={'9666699583'} />
                    <PriceList city={'hyd'} />
                    <PopUp />
                </div>
            </Layout>
        </div>
    );
}



// export async function getServerSideProps({req}) {
//     const response = await fetch('https://api.longdrivecarz.in/site/cars-info?location=hyderabad');
//     const items = await response.json();
//     const cars = items?.data?.results;
//     const host = req.headers.host;
//     const canonicalUrl = host.includes('.in')
//       ? 'https://www.longdrivecars.in/vijayawada'
//       : 'https://www.longdrivecars.com/vijayawada';
  
//     return {
//       props: {
//         cars,
//         canonicalUrl,
//       },
//     };
//   }

export async function getServerSideProps({ req }) {
    const response = await fetch('https://api.longdrivecarz.in/site/cars-info?location=hyderabad');
    const items = await response.json();
    const cars = items?.data?.results;

    const filteredCars = cars?.map(car => ({
        maker_model: car.maker_model,
        price_24_hours: car.price_24_hours,
        car_image_front_view: car.car_image_front_view,
        car_image_back_view: car.car_image_back_view,
        car_image_car_left_view:car.car_image_car_left_view,
        car_image_reading_view: car.car_image_reading_view,
        fuel_type: car.fuel_type,
        transmission_type: car.transmission_type,
        seater: car.seater,
    }));

    const host = req.headers.host;
    const canonicalUrl = host.includes('.in')
        ? 'https://www.longdrivecars.in/vijayawada'
        : 'https://www.longdrivecars.com/vijayawada';

    return {
        props: {
            cars: filteredCars,  // Return only the filtered data
            canonicalUrl,
        },
    };
}