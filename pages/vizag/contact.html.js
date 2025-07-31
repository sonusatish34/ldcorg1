import ContactUS from "../components/ContactUs/ContactUs";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import { ImLocation2 } from "react-icons/im";

// Dynamically import Map component to avoid SSR issues
const Map = dynamic(() => import('./Map'), { ssr: false });

function Contact({ canonicalUrl }) {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    async function fetchCarDetails() {
      try {
        const response = await fetch(`https://dev.longdrivecars.com/site/home-cars?limit=2000&offset=0`);
        const items = await response.json();
        const cars = items?.results;
        setCarList(cars);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    }

    fetchCarDetails();

    // Disable right-click
    const disableContextMenu = (e) => e.preventDefault();
    document.addEventListener('contextmenu', disableContextMenu);

    // Disable text copy
    const disableCopy = (e) => e.preventDefault();
    document.addEventListener('copy', disableCopy);

    // Disable inspect via keys
    const disableInspectKeys = (e) => {
      if (
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C'].includes(e.key)) ||
        (e.ctrlKey && e.key === 'U') ||
        e.key === 'F12'
      ) {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', disableInspectKeys);

    return () => {
      document.removeEventListener('contextmenu', disableContextMenu);
      document.removeEventListener('copy', disableCopy);
      document.removeEventListener('keydown', disableInspectKeys);
    };
  }, []);


  return (
    <Layout locname={'vizag'} phoneno={"9666699583"}>
      <Head>
        <title>No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U</title>
        <meta name="description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U" />
        <meta property="og:description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />
        <link rel="canonical" href={canonicalUrl} />
      </Head>

      {/* Disable select/copy globally */}
      <div className="select-none" style={{ userSelect: 'none' }}>

        <ContactUS />

        <div className="lg:px-24">
          <h1 className="text-2xl md:text-3xl font-bold my-4 text-black">Available Cars in Hyderabad</h1>

          <div className="flex flex-col md:flex-row h-auto md:h-screen">
            {/* Car List */}
            <div className='py-10 overflow-y-auto'>
              {carList.map((fh, ind) => (
                <ul key={ind} className='flex flex-col border-b-2 py-3 gap-y-2 text-xl'>
                  <li className='font-semibold'>
                    <span className="capitalize">{fh.maker_model?.toLowerCase()}</span>
                  </li>
                  <li className='flex gap-x-2'>
                    <span><ImLocation2 color='#FF894F' /></span>
                    <span>{fh.location}</span>
                  </li>
                  <li className='flex gap-x-2'><span>City: {fh.car_selected_city}</span></li>
                </ul>
              ))}
            </div>

            {/* Map */}
            {/* <div className="w-full md:w-3/5 h-[300px] md:h-full">
              <Map carList={carList} />
            </div> */}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Contact;

export async function getServerSideProps(context) {
  const { req } = context;
  const host = req.headers.host;
  const canonicalUrl = host.includes('.in')
    ? `https://www.longdrivecars.in/vizag/contact.html`
    : `https://www.longdrivecars.com/vizag/contact.html`;

  return {
    props: {
      canonicalUrl,
    },
  };
}
