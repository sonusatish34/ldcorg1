import ContactUS from "../components/ContactUs/ContactUs";
import Layout from "../components/Layout/Layout";
import Head from "next/head";
import Map from './Map';
import { useEffect, useState } from "react";

function contact({ canonicalUrl }) {
  const [carList, setCarList] = useState([]);

  useEffect(() => {
    async function fetchCarDetails() {
      try {
        const response = await fetch(`https://dev.longdrivecars.com/site/home-cars?limit=20&offset=0`);
        const items = await response.json();
        const cars = items?.results;
        console.log(cars, 'Fetched car list');
        setCarList(cars);
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
    }

    fetchCarDetails();
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

      <ContactUS />

      <div className="lg:px-16">
        <h1 className="text-2xl md:text-3xl font-bold mb-4 text-black">Available Cars in Hyderabad</h1>

        <div className="flex flex-col md:flex-row h-auto md:h-screen">
          {/* Car List */}
          <div className="w-full md:w-2/5 overflow-y-auto p-4 md:p-6 bg-white max-h-[400px] md:max-h-full">
            {carList.map((car, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
              >
                <h2 className="text-lg md:text-xl font-semibold text-black">{car.maker_model}</h2>
                <p className="text-gray-700 mt-1">{car.location}</p>
                <p className="text-gray-600 mt-1">{car.car_selected_city}</p>
                <div className="flex gap-2 mt-3">
                  <button className="bg-red-600 text-white px-3 py-1 rounded text-sm">Navigate</button>
                  <button className="bg-gray-800 text-white px-3 py-1 rounded text-sm">Website</button>
                </div>
              </div>
            ))}
          </div>

          {/* Map */}
          <div className="w-full md:w-3/5 h-[300px] md:h-full">
            <Map carList={carList} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default contact;

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
