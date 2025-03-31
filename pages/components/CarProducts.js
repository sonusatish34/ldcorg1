import { BiPhoneCall } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { TbManualGearbox } from "react-icons/tb";
import Slider from "react-slick";
import disc from "../images/discoutn.webp";
import disc1 from "../images/cashback.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { FaGooglePlay } from "react-icons/fa";
import { FaAppStoreIos } from "react-icons/fa";
import { RxSlash } from "react-icons/rx";
import { RiArrowDownWideLine } from "react-icons/ri";
import ldcqr from '../images/ldcqr.png'
import dnf from '../images/datanotfound.webp'
import { FaAppStore } from "react-icons/fa";

import { BiLogoPlayStore } from "react-icons/bi";g
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { useRouter } from "next/router";

function CarProducts({ data, branch, phoneno, count,wspno }) {

  const handleStoreRedirect = () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      // Redirect to App Store if iOS
      window.open(
        "https://apps.apple.com/in/app/long-drive-cars/id6466695391",
        "_blank"
      );
    } else if (/android/i.test(userAgent)) {
      // Redirect to Play Store if Android
      window.open(
        "https://play.google.com/store/search?q=long+drive+cars&c=apps",
        "_blank"
      );
    } else {
      // Optional: Provide a message for non-mobile devices
      alert("App is available only on mobile devices.");
    }
  };

  const [visibleItems, setVisibleItems] = useState(7);
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  const replaceText = (str) => {
    if (str?.includes("cdn")) return str;
    else {
      return str?.replace("https://ldcars.blr1.", "https://ldcars.blr1.cdn.");
    }
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);
  const filteredData = data?.filter((item) =>
    item?.maker_model.toLowerCase().includes(debouncedQuery.toLowerCase())
  );
  const sortedData = filteredData?.sort(
    (a, b) => a.price_24_hours - b.price_24_hours
  );
  const carModels = ['MAHINDRA XUV 700', 'INNOVA CRYSTA AUTOMATIC', 'MAHINDRA XUV 500', 'MG HECTOR PLUS SUNROOF', 'HYUNDAI VERNA', 'KIA CARENS SUNROOF AUTOMATIC', 'MAHINDRA XUV 700 AX7 AUTOMATIC', 'MAHINDRA THAR ROXX', 'MAHINDRA XUV 700 AX5', 'HYUNDAI CRETA SUNROOF', 'NEXON SUNROOF AUTOMATIC', 'VENUE SUNROOF IMT', 'HYUNDAI I20 SUNROOF', 'MAHINDRA XUV 300 SUNROOF AUTOMATIC', 'MG HECTOR AUTOMATIC', 'KIA SONET SUNROOF IMT'];

  const filteredItems = carModels.flatMap((model) =>
    filteredData?.filter((item) => item?.maker_model === model)
  );
  const [showDown, setShowDown] = useState(false)

  return (
    <div className=" bg-white">
      <h2 className="text-black xl:text-5xl lg:text-4xl text-lg font-bold text-center py-7 capitalize">
        Explore Car Rentals Near You
      </h2>
      <div className=" lg:mb-8 pl-3 flex items-center justify-center pt-2 lg:pb-2">
        <input
          placeholder="Find Your Favourite Car"
          className="placeholder-black text-black px-4 py-3 rounded-full bg-gray-200 w-full  md:max-w-96 lg:max-w-2xl"
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <FaSearch
          size={25}
          className="text-blue-500 relative right-9 lg:right-20 md:right-14"
        />
      </div>
      <div className="flex flex-wrap gap-x-8 gap-y-8  lg:items-start justify-center lg:pl-12 items-center text-white lg:pb-10 pt-10">
        {!(searchQuery.length >= 1) && filteredItems?.map((item, index) => (
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
                    <div>
                      {
                        <Link
                          href={`${("/car-rental/" + item?.maker_model).toLowerCase().replace(/ /g, "-")}`}
                        >
                          <Image
                            alt={`${item?.maker_model.toLowerCase()} car rental in long drive cars`}
                            className="rounded-md h-[440px] object-cover"
                            width={1000}
                            height={1000}
                            src={replaceText(item?.car_image_front_view)}
                            fetchPriority="high" // 
                            loading="eager" // Only use eager 
                            sizes="(max-width: 200px) 100vw, 50vw"
                          />
                        </Link>
                      }
                    </div>
                    <div onClick={() => { }}>
                      <Link
                        href={`${("car-rental/" + item?.maker_model)
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                      >
                        <Image
                          alt={`${item?.maker_model.toLowerCase()} car rental in long drive cars`}
                          className=" rounded-md h-[440px] object-cover"
                          width={1000}
                          height={1000}
                          src={replaceText(item?.car_image_car_left_view)}
                          loading="lazy"
                        ></Image>
                      </Link>
                    </div>
                    
                    <div>
                      <Link
                        href={`${("car-rental/" + item?.maker_model)
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                      >
                        <Image
                          alt={`${item?.maker_model.toLowerCase()} car rental in long drive cars`}
                          className=" rounded-md h-[440px] object-cover"
                          width={1000}
                          height={1000}
                          src={replaceText(item?.car_image_reading_view)}
                          loading="lazy"
                        ></Image>
                      </Link>
                    </div>
                    <div>
                      <Link
                        href={`${("car-rental/" + item?.maker_model)
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                      >
                        <Image
                          alt={`${item?.maker_model.toLowerCase()} car rental in long drive cars`}
                          className=" rounded-md h-[440px] object-cover"
                          width={1000}
                          height={1000}
                          src={replaceText(item?.car_image_back_view)}
                          loading="lazy"
                        ></Image>
                      </Link>
                    </div>
                    <div onClick={() => { }}>
                      <Link
                        href={`${("car-rental/" + item?.maker_model)
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                      >
                        <Image
                          alt={`  null`}
                          className=" rounded-md h-[440px] object-cover"
                          width={1000}
                          height={1000}
                          src={replaceText(item?.car_image_back_inner)}
                          loading="lazy"
                        ></Image>
                      </Link>
                    </div>
                  </Slider>
                  <div className="relative h-20 z-20 bg-gradient-to-b from-black opacity-90 lg:rounded-md bottom-[28rem] lg:bottom-[28rem]">
                    <div className="flex flex-col gap-2 items-end pt-4 pr-1">
                      <p className="relative bottom-3 capitalize p-1  text-white rounded-md  z-50 font-manrope lg:text-sm text-xs mxs:text-base  pt-2 ">
                        {item?.maker_model.toLowerCase()}
                      </p>
                    </div>
                  </div>
                  <div className="relative z-20 bottom-[12.6rem] lg:bottom-[12.4rem] lg:rounde bg-gradient-to-t from-black opacity-90">
                    <div className="flex gap-x-8 mxs:gap-x-16  items-center justify-center pt-5 pb-2 w-full">
                      <p className="text-[15px] shadow-black">Book Now</p>
                      <p className="capitalize p-1 font-bold text-white  rounded-md  z-50 font-manrope text-base  lg:text-sm pt-2">
                        ₹ {item?.price_24_hours * 24}/day
                      </p>
                    </div>
                    <ul className="flex gap-4 justify-center text-xs mxs:text-sm lg:text-xs pt-2 pb-6">
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
            {(index + 1 == 2 || index + 1 == 6 || index + 1 == 16) && (
              <div className=" items-center block lg:hidden ">
                <div className=" lg:rounded-md items-center  lg:w-72 flex flex-col relative">
                  <Image
                    src={disc1}
                    height={1000}
                    width={1000}
                    alt="Long Drive Cars app"
                    className=" mxs:scale-[0.6] lg:scale-90 relative lg:w-80 w-full "
                  />
                  <div className="w-full lg:px-2 lg:py-2 capitalize text-sm">
                    <p className="text-black xl:text-xl lg:text-xl py-2 text-2xl font-bold text-center    ">
                      On Bookings
                    </p>
                    <div className="w-full px-2 py-1 lg:px-2 lg:py-2 tracking-wide ">
                      <div className="place-items-center lg:py-1 ">
                        <div className="rounded w-full bg-[#660066] text-white border border-white lg:w-[265px] lg:text-[10px] text-xs ">
                          <div className="flex justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <span className=" border-white pl-6 w-36 ">
                              50 Cashback
                            </span>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>
                            <span className=" border-white px-3 w-36  lg:px-4">
                              1 day & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">400 Discount</span>
                              <span className="pl-11">+</span>
                              <span>100 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              4 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">2000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>100 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              7 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">4000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>200 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              10 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">15,000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>500 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              30 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">20,000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>1000 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              45 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">35,000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>1500 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              60 days & above
                            </span>
                          </div>

                        </div>
                      </div>


                      <div className="place-items-center  pt-1 rounded ">
                        <div className="w-full bg-[#660066] text-white border border-black rounded-b-lg p-2 lg:px-1 lg:w-[265px]">
                          <div className="flex items-center gap-2 mb-2 text-[10px] font-bold">
                            <span>
                              <RiArrowRightDoubleLine size={24} />
                            </span>
                            <span>Cashback Credited into LDC Wallet</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2 text-[10px] font-bold">
                            <span>
                              <RiArrowRightDoubleLine size={24} />
                            </span>
                            <span>
                              Cashback Can Be Used Monday To Thursday Pickup
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-bold">
                            <span>
                              <RiArrowRightDoubleLine size={24} />
                            </span>
                            <span>Max 500 can be used for every booking</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {(index + 1 == 2) && (
              <div className="lg:block hidden pt-14 lg:pt-0 items-center  ">
                <div className=" lg:rounded-md items-center  lg:w-72 flex flex-col relative">
                  <Image
                    src={disc1}
                    height={1000}
                    width={1000}
                    alt="Long Drive Cars app"
                    className=" mxs:scale-[0.6] lg:scale-90 relative lg:w-80 w-full "
                  />
                  <div className="w-full lg:px-2 lg:py-2 capitalize text-sm">
                    <p className="text-black xl:text-xl lg:text-xl py-2 text-2xl font-bold text-center    ">
                      On Bookings
                    </p>
                    <div className="w-full px-2 py-1 lg:px-2 lg:py-2 tracking-wide ">
                      <div className="place-items-center lg:py-1 ">
                        <div className="rounded w-full bg-[#660066] text-white border border-white lg:w-[265px] lg:text-[10px] text-xs ">
                          <div className="flex justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <span className=" border-white pl-6 w-36 ">
                              50 Cashback
                            </span>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>
                            <span className=" border-white px-3 w-36  lg:px-4">
                              1 day & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">400 Discount</span>
                              <span className="pl-11">+</span>
                              <span>100 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              4 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">2000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>100 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              7 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">4000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>200 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              10 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">15,000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>500 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              30 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">20,000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>1000 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              45 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">35,000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>1500 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              60 days & above
                            </span>
                          </div>

                        </div>
                      </div>


                      <div className="place-items-center  pt-1 rounded ">
                        <div className="w-full bg-[#660066] text-white border border-black rounded-b-lg p-2 lg:px-1 lg:w-[265px]">
                          <div className="flex items-center gap-2 mb-2 text-[10px] font-bold">
                            <span>
                              <RiArrowRightDoubleLine size={24} />
                            </span>
                            <span>Cashback Credited into LDC Wallet</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2 text-[10px] font-bold">
                            <span>
                              <RiArrowRightDoubleLine size={24} />
                            </span>
                            <span>
                              Cashback Can Be Used Monday To Thursday Pickup
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-bold">
                            <span>
                              <RiArrowRightDoubleLine size={24} />
                            </span>
                            <span>Max 500 can be used for every booking</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
        {searchQuery.length >= 1 && filteredData?.map((item, index) => (
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
                    <div>
                      {
                        <Link
                          href={`${("/car-rental/" + item?.maker_model).toLowerCase().replace(/ /g, "-")}`}
                        >
                          <Image
                            alt={`${item?.maker_model.toLowerCase()} car rental in long drive cars`}
                            className="rounded-md h-[440px] object-cover"
                            width={1000}
                            height={1000}
                            src={replaceText(item?.car_image_front_view)}
                            priority
                            sizes="(max-width: 200px) 100vw, 50vw"
                          />
                        </Link>
                      }
                    </div>
                    <div onClick={() => { }}>
                      <Link
                        href={`${("car-rental/" + item?.maker_model)
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                      >
                        <Image
                          alt={`${item?.maker_model.toLowerCase()} car rental in long drive cars`}
                          className=" rounded-md h-[440px] object-cover"
                          width={1000}
                          height={1000}
                          src={replaceText(item?.car_image_back_inner)}
                          loading="lazy"
                        ></Image>
                      </Link>
                    </div>
                    <div>
                      <Link
                        href={`${("car-rental/" + item?.maker_model)
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                      >
                        <Image
                          alt={`${item?.maker_model.toLowerCase()} car rental in long drive cars`}
                          className=" rounded-md h-[440px] object-cover"
                          width={1000}
                          height={1000}
                          src={replaceText(item?.car_image_reading_view)}
                          loading="lazy"
                        ></Image>
                      </Link>
                    </div>
                    <div>
                      <Link
                        href={`${("car-rental/" + item?.maker_model)
                          .toLowerCase()
                          .replace(/ /g, "-")}`}
                      >
                        <Image
                          alt={`${item?.maker_model.toLowerCase()} car rental in long drive cars`}
                          className=" rounded-md h-[440px] object-cover"
                          width={1000}
                          height={1000}
                          src={replaceText(item?.car_image_back_view)}
                          loading="lazy"
                        ></Image>
                      </Link>
                    </div>
                  </Slider>
                  <div className="relative h-20 z-20 bg-gradient-to-b from-black opacity-90 lg:rounded-md bottom-[28rem] lg:bottom-[28rem]">
                    <div className="flex flex-col gap-2 items-end pt-4 pr-1">
                      <p className="relative bottom-3 capitalize p-1  text-white rounded-md  z-50 font-manrope lg:text-sm text-xs mxs:text-base  pt-2 ">
                        {item?.maker_model.toLowerCase()}
                      </p>
                    </div>
                  </div>
                  <div className="relative z-20 bottom-[12.6rem] lg:bottom-[12.4rem] lg:rounde bg-gradient-to-t from-black opacity-90">
                    <div className="flex gap-x-8 mxs:gap-x-16  items-center justify-center pt-5 pb-2 w-full">
                      <p className="text-[15px] shadow-black">Book Now</p>
                      <p className="capitalize p-1 font-bold text-white  rounded-md  z-50 font-manrope text-base  lg:text-sm pt-2">
                        ₹ {item?.price_24_hours * 24}/day
                      </p>
                    </div>
                    <ul className="flex gap-4 justify-center text-xs mxs:text-sm lg:text-xs pt-2 pb-6">
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
            {(index + 1 == 2 || index + 1 == 6 || index + 1 == 16) && (
              <div className=" items-center block lg:hidden ">
                <div className=" lg:rounded-md items-center  lg:w-72 flex flex-col relative">
                  <Image
                    src={disc1}
                    height={1000}
                    width={1000}
                    alt="Long Drive Cars app"
                    className=" mxs:scale-[0.6] lg:scale-90 relative lg:w-80 w-full "
                  />
                  <div className="w-full lg:px-2 lg:py-2 capitalize text-sm">
                    <p className="text-black xl:text-xl lg:text-xl py-2 text-2xl font-bold text-center    ">
                      On Bookings
                    </p>
                    <div className="w-full px-2 py-1 lg:px-2 lg:py-2 tracking-wide ">
                      <div className="place-items-center lg:py-1 ">
                        <div className="rounded w-full bg-[#660066] text-white border border-white lg:w-[265px] lg:text-[10px] text-xs ">
                          <div className="flex justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <span className=" border-white pl-6 w-36 ">
                              50 Cashback
                            </span>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>
                            <span className=" border-white px-3 w-36  lg:px-4">
                              1 day & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">400 Discount</span>
                              <span className="pl-11">+</span>
                              <span>100 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              4 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">2000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>100 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              7 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">4000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>200 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              10 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">15,000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>500 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              30 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">20,000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>1000 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              45 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">35,000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>1500 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              60 days & above
                            </span>
                          </div>

                        </div>
                      </div>


                      <div className="place-items-center  pt-1 rounded ">
                        <div className="w-full bg-[#660066] text-white border border-black rounded-b-lg p-2 lg:px-1 lg:w-[265px]">
                          <div className="flex items-center gap-2 mb-2 text-[10px] font-bold">
                            <span>
                              <RiArrowRightDoubleLine size={24} />
                            </span>
                            <span>Cashback Credited into LDC Wallet</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2 text-[10px] font-bold">
                            <span>
                              <RiArrowRightDoubleLine size={24} />
                            </span>
                            <span>
                              Cashback Can Be Used Monday To Thursday Pickup
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-bold">
                            <span>
                              <RiArrowRightDoubleLine size={24} />
                            </span>
                            <span>Max 500 can be used for every booking</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {(index + 1 == 2) && (
              <div className="lg:block hidden pt-14 lg:pt-12  items-center  ">
                <div className=" lg:rounded-md items-center  lg:w-72 flex flex-col relative">
                  <Image
                    src={disc1}
                    height={1000}
                    width={1000}
                    alt="Long Drive Cars app"
                    className=" mxs:scale-[0.6] lg:scale-90 relative lg:w-80 w-full "
                  />
                  <div className="w-full lg:px-2 lg:py-2 capitalize text-sm">
                    <p className="text-black xl:text-xl lg:text-xl py-2 text-2xl font-bold text-center    ">
                      On Bookings
                    </p>
                    <div className="w-full px-2 py-1 lg:px-2 lg:py-2 tracking-wide ">
                      <div className="place-items-center lg:py-1 ">
                        <div className="rounded w-full bg-[#660066] text-white border border-white lg:w-[265px] lg:text-[10px] text-xs ">
                          <div className="flex justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <span className=" border-white pl-6 w-36 ">
                              50 Cashback
                            </span>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>
                            <span className=" border-white px-3 w-36  lg:px-4">
                              1 day & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">400 Discount</span>
                              <span className="pl-11">+</span>
                              <span>100 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              4 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">2000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>100 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              7 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">4000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>200 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              10 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">15,000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>500 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              30 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">20,000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>1000 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              45 days & above
                            </span>
                          </div>
                          <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                            <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                              <span className="">20,000 Discount</span>
                              <span className="pl-11">+</span>
                              <span>2000 Cashback</span>
                            </p>
                            <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                            <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                              60 days & above
                            </span>
                          </div>

                        </div>
                      </div>


                      <div className="place-items-center  pt-1 rounded ">
                        <div className="w-full bg-[#660066] text-white border border-black rounded-b-lg p-2 lg:px-1 lg:w-[265px]">
                          <div className="flex items-center gap-2 mb-2 text-[10px] font-bold">
                            <span>
                              <RiArrowRightDoubleLine size={24} />
                            </span>
                            <span>Cashback Credited into LDC Wallet</span>
                          </div>
                          <div className="flex items-center gap-2 mb-2 text-[10px] font-bold">
                            <span>
                              <RiArrowRightDoubleLine size={24} />
                            </span>
                            <span>
                              Cashback Can Be Used Monday To Thursday Pickup
                            </span>
                          </div>
                          <div className="flex items-center gap-2 text-[10px] font-bold">
                            <span>
                              <RiArrowRightDoubleLine size={24} />
                            </span>
                            <span>Max 500 can be used for every booking</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
      {filteredData?.length == 0 && <p className="flex  flex-col items-center justify-center"><Image src={dnf} width={500} height={500} className="w-20 h-20" /><span className="text-orange-500 py-1">No Results found</span>
        <span className="text-blue-400">Please try something else</span></p>}

      {visibleItems < filteredData?.length && (

        <Link href={`${branch ? `/${branch}` : ''}/explore-self-drive-cars`} className={`${count?.length ? 'hidden' : 'block'} text-center py-4 lg:px-2 px-10 flex justify-center items-center`}>
          <button className="flex flex-col items-center spinner-border text-xl lg:text-2xl font-bold text-[#556ee6] w-full lg:w-96 pt-4 rounded-full capitalize">
            View All Cars
            <RiArrowDownWideLine className="animate-pulse text-[#660066]" size={40} />
          </button>
        </Link>
      )}

    </div>
  );
}

export default CarProducts;
