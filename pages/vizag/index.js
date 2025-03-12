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
            <Layout locname={'vizag'} phoneno={"96666-99583"}>
                <Head>
                    <title>No Deposit & Unlimited km - Lowest priced Self-drive car rental for Sedans in Vizag</title>
                    <meta name="description" content="Rent a 5 Seater- Dzire for ₹1680/day with No Deposit & Unlimited Kms for a stress-free travel. With prices starting at ₹1488/day, Choose Your Own Hours with self-drive car rentals." />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta property="og:title" content="No Deposit & Unlimited km - Lowest priced Self-drive car rental for Sedans in Vizag" />
                    <meta property="og:description"  content="Rent a 5 Seater- Dzire for ₹1680/day with No Deposit & Unlimited Kms for a stress-free travel. With prices starting at ₹1488/day, Choose Your Own Hours with self-drive car rentals." />
              
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
                    <CarProducts data={cars} branch={"vizag"} phoneno={'9666699583'} count={7}/>
                    <DynImageChange locname={'Vizag'}/>
                    <div>
                        <DynNearByApi city={'vizag'}/>
                    </div>
                    <div><DynNearYou /></div>
                    <FeaturedCars data={carData2} branch={"vizag"} />
                    <DynCallBackForm />
                    <DynWhyChooseUs />
                    <div className='bg-white rounded xl:py-12 lg:px-14 xl:px-14 p-2'>
                        <p className='uppercase p-2 mb-4 text-center text-black font-bold xl:text-2xl font-manrope'>Frequently asked questions</p>
                        <DynamicFaqComponent />
                    </div>
                    <GetInTouch phoneno={'9666699583'} />
                    <PriceList city={'hyd'} />
                </div>
            </Layout>
        </div>
    );
}



export async function getServerSideProps({req}) {
    const response = await fetch('https://api.longdrivecarz.in/site/cars-info?location=hyderabad');
    const items = await response.json();
    const cars = items?.data?.results;
    const host = req.headers.host;
    const canonicalUrl = host.includes('.in')
      ? 'https://www.longdrivecars.in/vizag'
      : 'https://www.longdrivecars.com/vizag';
  
    return {
      props: {
        cars,
        canonicalUrl,
      },
    };
  }