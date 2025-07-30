import ContactUS from "../components/ContactUs/ContactUs"
import Layout from "../components/Layout/Layout"
import Head from "next/head"
import Map from './Map'
import Image from "next/image"
import { useEffect, useState } from "react"
function contact({ canonicalUrl }) {
  const [carList,setCarList] = useState([]);
  useEffect(() => {
    async function fetchCarDetails() {
      
      try {
        const response = await fetch(`https://dev.longdrivecars.com/site/home-cars?limit=2000&offset=0`);
        const items = await response.json();
        const cars = items?.results;
        console.log(cars,'ioooooooooo');
        setCarList(cars)
        
      } catch (error) {
        console.error('Error fetching car details:', error);
      }
      finally {
      }
    }

    fetchCarDetails();

  }, []);
  // const cars = [
  //   {
  //     id: 1,
  //     name: 'Swift Dzire',
  //     address: 'H No 12/3, Green Hills, Kukatpally, Hyderabad - 500072',
  //     phone: '+91 9876543210',
  //   },
  //   {
  //     id: 2,
  //     name: 'Hyundai Creta',
  //     address: 'Plot No 55, Madhapur, Near Inorbit Mall, Hyderabad - 500081',
  //     phone: '+91 9876543211',
  //   },
  //   {
  //     id: 3,
  //     name: 'Tata Nexon',
  //     address: 'Lane 2, Banjara Hills, Hyderabad - 500034',
  //     phone: '+91 9876543212',
  //   },
  //   {
  //     id: 4,
  //     name: 'Toyota Innova',
  //     address: 'Road No 3, Jubilee Hills, Hyderabad - 500033',
  //     phone: '+91 9876543213',
  //   },
  // ];
  return (
    <Layout locname={'vizag'} phoneno={"9666699583"}>
      <Head>
        <title>No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U</title>
        <meta id="meta-desc" name="description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U" />
        <meta property="og:description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />

        <link rel="canonical" href={canonicalUrl} />
      </Head>
      <ContactUS />
      <div className="lg:px-16">
        <h1 className="text-3xl font-bold mb-6 text-black">Available Cars in Hyderabad</h1>
        <div className="flex flex-col md:flex-row h-screen">
          {/* Left List */}
          <div className="w-full md:w-2/5 overflow-y-auto p-6 bg-white">
            {carList.map((car,index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
              >
                <h2 className="text-xl font-semibold text-black">{car.maker_model}</h2>
                <p className="text-gray-700 mt-1">{car.location}</p>
                <p className="text-gray-600 mt-1">{car.car_selected_city}</p>
                <div className="flex gap-2 mt-3">
                  <button className="bg-red-600 text-white px-3 py-1 rounded">Navigate</button>
                  <button className="bg-gray-800 text-white px-3 py-1 rounded">Website</button>
                </div>
              </div>
            ))}
          </div>

          {/* Right Static Map */}
          <div className="w-full md:w-3/ h-[400px] md:h-full relative">
            <Image
              src="/map-placeholder.png"
              alt="Map"
              layout="fill"
              objectFit="cover"
            />
            <Map carList={carList} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default contact
export async function getServerSideProps(context) {
  const { req, params } = context; // Extract `params` if using dynamic routes

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