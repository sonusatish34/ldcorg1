import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import Router from 'next/router';
import CarProducts from './components/CarProducts';
const DynCallBackForm = dynamic(() => import('./components/CallBackForm/CallBackForm'));
const DynNearYou = dynamic(() => import('./components/NearYou/NearYou'));
const DynImageChange = dynamic(() => import('./components/ImageChange/ImageChange'));
const DynNearByApi = dynamic(() => import('./components/NearByApi/NearByApi'));
const GetInTouch = dynamic(() => import('./components/GetInTouch/GetInTouch'));
const FeaturedCars = dynamic(() => import('./components/FeaturedCars/FeaturedCars'));
const DynamicFaqComponent = dynamic(() => import('./components/FaqAccordian/FaqAccordian'));
import DynWhyChooseUs from './components/WhyChooseUs/WhyChooseUs';
import Layout from './components/Layout/Layout';
import PriceList from './components/PriceList/PriceList';
import Head from 'next/head';
import PopUp from './components/PopUp';

const metaData = [
    {
        title: "Choose your own hours - Book Self Drive car @ LongDriveCars App",
        description: "Book your Self-drive car rental starting at ₹1488/day. Install the Long Drive Cars app to book Dzire ₹1680/day, Ertiga ₹2496/day or explore other options for your next trip",
    },
    {
        title: "Check Real Car Images and Book Self-drive cars with No deposit ",
        description: "Starting at just ₹1488/day, rent a Self-drive car like the Dzire ₹1680/day or Ertiga ₹2496/day. You can also check Real Car Images on the Long Drive Cars App.",
    },
    {
        title: "Self Drive Rental Under 5 kms - Unlimited Kms",
        description: "All Cars @ lowest prices, rent your Self-drive car at just ₹1488/day. From Dzire ₹1680/day Ertiga ₹2496/day, check the real car images on Long Drive Cars appDrive through Hyderabad with comfort. Best prices on Dzire, Baleno, Ertiga, Swift, and Thar.",
    },
];
export default function Place({ cars, canonicalUrl }) {
    const [carData, setCarData] = useState(null);
    const [carData2, setCarData2] = useState(null);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [currentMeta, setCurrentMeta] = useState(metaData[0]);

    useEffect(() => {
        // Get the current index from localStorage (default to 0)
        const lastIndex = localStorage.getItem('metaIndex') || 0;
        const newIndex = (parseInt(lastIndex) + 1) % metaData.length;

        setCurrentMeta(metaData[newIndex]);

        // Save the updated index to localStorage
        localStorage.setItem('metaIndex', newIndex);
    }, []);
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

    return (
        <div>
            <Layout phoneno={"9666-677-405"}>
                <Head>
                    <title>{currentMeta.title}</title>
                    <meta name="description" content={currentMeta.description} />
                    <meta name="viewport" content="width=device-width, initial-scale=1" />
                    <meta property="og:title" content={currentMeta.title} />
                    <meta property="og:description" content={currentMeta.description} />
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
                    <CarProducts data={cars} phoneno={'9666677405'} count={7} />
                    <DynImageChange locname={'hyderabad'} />
                    <div>
                        <DynNearByApi />
                    </div>
                    <div><DynNearYou /></div>
                    <FeaturedCars data={carData2} branch={"hyderabad"} />
                    <DynCallBackForm />
                    <DynWhyChooseUs />
                    <div className='bg-white rounded xl:py-12 lg:px-14 xl:px-14 p-2'>
                        <p className='uppercase p-2 mb-4 text-center text-black font-bold xl:text-2xl font-manrope'>Frequently asked questions</p>
                        <DynamicFaqComponent />
                    </div>
                    <GetInTouch phoneno={'9666677405'} />
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
    const host = req.headers.host;
    const canonicalUrl = host.includes('.in')
        ? 'https://www.longdrivecars.in'
        : 'https://www.longdrivecars.com';

    return {
        props: {
            cars,
            canonicalUrl,
        },
    };
}