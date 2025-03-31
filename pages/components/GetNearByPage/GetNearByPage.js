import { useEffect, useState } from "react";
import React from "react";
import Link from "next/link";
import { BiPhoneCall } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { TbManualGearbox } from "react-icons/tb";
import { FaGooglePlay } from "react-icons/fa";
import { FaAppStore  } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";

import ldcqr from '../../images/ldcqr.png'
const LocationFetcher = ({ phoneno,locname,wspno }) => {

  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lon, setLon] = useState("");
  const [lat, setLat] = useState("");

  const replaceText = (str) => {
    return str?.includes("cdn")
      ? str
      : str?.replace("https://ldcars.blr1.", "https://ldcars.blr1.cdn.");
  };

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = today.getDate() + 1;
  const daynum = today.getDate() + 2;

  const compldate = `${year}-${month}-${day}`;
  const compldateend = `${year}-${month}-${daynum}`;
  const [showDown, setShowDown] = useState(false)

  useEffect(() => {
    const fetchLocation = () => {
      if (navigator.geolocation) {
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLat(latitude);
            setLon(longitude);
            setLocation({ latitude, longitude });
            setError(null);
          },
          (err) => {
            setError(err.message);
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    fetchLocation();
  }, []); // Fetch location on mount

  useEffect(() => {
    if (!location) return;

    const fetchData = async () => {
      setLoading(true);
      const myHeaders = new Headers();
      myHeaders.append("accept", "application/json");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch(
          `https://api.longdrivecarz.in/user/updated-home?lat=${lat}&long=${lon}&start_date=${compldate}%2000%3A00%3A00&end_date=${compldateend}%2000%3A00%3A00&no_of_days=1&color=Marron,Blue,Grey,Red,Green,Black,Orange&index=0&limit=20`,
          requestOptions
        );
        const result = await response.json();
        const realdata = result?.data?.results;
        setData(realdata);
      } catch (error) {
        setError(error.message || "An error occurred while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [location, lat, lon]); // Fetch data when location changes

  const getOrderedImages = (attributes) => {
    const imageMap = {};
    attributes.forEach((attr) => {
      imageMap[attr.attribute_name] = attr.car_image_duplicate_copy;
    });

    return [
      imageMap["car_image_front_view"],
      imageMap["car_image_car_right_view"],
      imageMap["car_image_back_inner"],
      imageMap["car_image_back_view"],
    ];
  };
  const handleStoreRedirect = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      // Redirect to App Store if iOS
      window.open('https://apps.apple.com/in/app/long-drive-cars/id6466695391', '_blank');
    } else if (/android/i.test(userAgent)) {
      // Redirect to Play Store if Android
      window.open('https://play.google.com/store/search?q=long+drive+cars&c=apps', '_blank');

    } else {
      // Optional: Provide a message for non-mobile devices
      alert("App is available only on mobile devices.");
    }
  }


  return (
    <div>
      <div className="pt-32 lg:py-8 flex flex-col lg:flex-row gap-12">
        {loading && (
          <div className="text-center py-4">
            <div className="fixed inset-0 bg-white flex items-center justify-center z-50 opacity-90">
              <div className="spinner-border animate-spin border-t-4 border-blue-500 border-solid rounded-full w-16 h-16"></div>
            </div>
          </div>
        )}
        {error && (
          <div className="lg:pl-12">
            <div className="bg-red-500 text-white w-fit py-4 px-2 mt-11 mx-3 rounded-md ">
              <p className="underline">{error}</p>
              <p className="pt-2">
                To enable location services, go to your settings and allow
                location access your browser.
              </p>
            </div>
          </div>
        )}

        <div className="bg-white">
          {!error && (
            <p className="text-center py-5 text-xl font-bold text-black lg:text-3xl lg:pb-8">
              Explore Cars Near You in 20 Kms
            </p>
          )}
          <div className="flex flex-col gap-x-8 gap-y-12 lg:flex-wrap lg:flex-row lg:pl-36">
            {data?.map((item, index) => (
              <React.Fragment key={index}>
                {
                  <div className=" lg:rounded-md flex flex-col  w-[100%] md:w-72 first-line:h-[555px] ">
                    <div className="relative lg:rounded-md h-[445px]">

                      <Slider
                        dots={false}
                        infinite={true}
                        speed={500}
                        slidesToShow={1}
                        slidesToScroll={1}
                        centerMode={true}
                        centerPadding={0}
                        focusOnSelect={true}
                        arrows={false}
                        pauseOnFocus={true}
                        pauseOnHover={true}
                        className="relative lg:rounded-md"
                      >
                        {getOrderedImages(item?.attributes).map(
                          (imageSrc, index) => (
                            <div
                              key={index}
                              className="h-[430px] flex justify-center items-center"
                            >
                              <Link
                                href={`/${(`${locname?`${locname}/`:''}car-rental/` + item.maker_model)
                                  .toLowerCase()
                                  .replace(/ /g, "-")}`}
                              >
                                {/* <Image
                                className="rounded-md h-[430px]"
                                width={1000}
                                height={1000}
                                src={replaceText(imageSrc)}
                                alt="Long Drive Cars app"
                              /> */}
                                <Image
                                  alt="Long Drive Cars app"
                                  className=" rounded-md h-[500px] object-cover"
                                  width={1000}
                                  height={1000}
                                  src={replaceText(imageSrc)}
                                ></Image>
                              </Link>
                            </div>
                          )
                        )}
                      </Slider>
                      <div className="relative h-20 z-20 bg-gradient-to-b from-black opacity-90 lg:rounded-md bottom-[27.3rem] lg:bottom-[27.3rem]">
                        <div className="flex flex-col gap-2 items-end pt-4 pr-1">
                          <p className="relative bottom-3 capitalize p-1  text-white rounded-md  z-50 font-manrope lg:text-base text-xs mxs:text-base  pt-2 ">
                            {item?.maker_model.toLowerCase()}
                          </p>
                        </div>
                      </div>
                      <div className="relative z-20 bottom-[12.2rem] lg:bottom-[12rem] lg:rounde bg-gradient-to-t from-black opacity-90 text-white">
                        <div className="flex gap-x-8 items-center text-white justify-center pt-5 pb-2 w-full">
                          <p className="text-sm text-white shadow-black">Book Now</p>
                          <p className="capitalize p-1 font-bold   rounded-md  z-50 font-manrope text-base  lg:text-sm pt-2">
                            ₹ {item?.price_24_hours * 24}/day
                          </p>
                        </div>
                        <ul className="flex gap-4 justify-center text-xs lg:text-xs pt-2 pb-6">
                          <li className="border-r-2 border-white flex items-center gap-1 pr-2">
                            <span>
                              <BsFillFuelPumpFill />
                            </span>
                            <span>{item?.fuel_type}</span>
                          </li>
                          <li className="border-r-2 border-white flex items-center gap-1 pr-2">
                            <span>
                              <GrGroup />
                            </span>
                            <span>{item?.seater} Seater</span>
                          </li>
                          <li className=" flex items-center gap-1">
                            <span>
                              <TbManualGearbox size={20} />
                            </span>
                            <span>{item?.transmission_type}</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between  text-white py-4">
                      <ul className="flex justify-center gap-x-8 w-ful px-3">
                        <li className="bg-green-500 w-32 py-2  text-center rounded-md ">
                          {" "}
                          <Link
                            href={`https://api.whatsapp.com/send?phone=+91${wspno}&text=Hi%0AI%20am%20looking%20for%20a%20car%20booking.`}
                            target="_blank"
                          >
                            <p className=" flex gap-1 lg:text-sm text-sm justify-center items-center">
                              <span>
                                <FaWhatsapp size={20} />
                              </span>{" "}
                              <span>Whatsapp</span>
                            </p>
                          </Link>
                        </li>
                        <li className="bg-blue-500 w-32 py-2 rounded-md ">
                          <Link href={`tel:${phoneno}`} target="_blank">
                            <p className=" flex gap-1 lg:text-sm text-sm justify-center items-center">
                              <span>
                                <BiPhoneCall size={20} />
                              </span>{" "}
                              <span>Call Us</span>
                            </p>
                          </Link>
                        </li>
                      </ul>
                      <div onClick={handleStoreRedirect} className=" lg:hidden flex justify-center items-center cursor-pointer text-black py-4 text-lg font-semibold">
                        <p className="bg-gradient-to-r from-green-600 via-[#556ee6] to-indigo-400 inline-block text-transparent bg-clip-text animate-gradient border-[1px] border-[#5566ee] p-2 rounded-md">
                          Download LDC App
                        </p>

                      </div>

                      <div onClick={() => { setShowDown(true) }} className="lg:flex hidden  justify-center items-center cursor-pointer text-black py-4 text-lg font-semibold">
                        <p className="bg-gradient-to-r from-green-600 via-[#556ee6] to-indigo-400 text-transparent bg-clip-text animate-gradient border-[1px] border-[#5566ee] p-2 rounded-md lg:block hidden">
                          Download LDC App
                        </p>
                      </div>
                      {showDown && (
                        <div >
                          <div className='text-black fixed inset-0 backdrop-blur-0 bg-white bg-opacity-5 z-50  h-'>
                            <div className='flex justify-center items-center '>
                              <div className='bg-white absolute top-20 h-[500px] lg:h-[300px] transition-all duration-300 ease-in-out p-8 rounded-lg shadow-md max-w-lg lg:w-[800px] w-[500px]'>
                                <button
                                  onClick={() => {
                                    setShowDown(false)
                                  }}
                                  className='relative lg:left-96 rounded-full bg-white lg:bottom-20 text-black py-2 px-4 text-xl border-2 border-gray-300'
                                >
                                  x
                                </button>
                                <div className="flex gap-3">
                                  <div>
                                    <h2 className="text-base font-semibold text-gray-900">
                                      Download the Longdrivecarz App and Book Your Favourite Car
                                    </h2>
                                    <ul className="mt-2 text-gray-600">
                                      <li>Scan the QR code to get the app from the Play Store or App Store.</li>
                                      <li className="flex gap-x-3 pt-3"><FaAppStore className="text-black" size={30} /> <BiLogoPlayStore className="text-black" size={30} /></li>
                                    </ul>

                                  </div>

                                  <Image
                                    src={ldcqr}
                                    height={1000}
                                    width={1000}
                                    alt='long drive cars app'
                                    className='w-full h-44 object-contain'
                                  />
                                </div>

                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                }

              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationFetcher;
