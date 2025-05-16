
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { useEffect } from "react";
import { RiArrowDownWideLine } from "react-icons/ri";
import dnf from '../images/datanotfound.webp'
import CardFragment from "./CardFragment/CardFragment";
import disc1 from "../images/offersimages/onerupee.webp";
import { BiPhoneCall } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import ldcqr from '../images/ldcqr.png'

import { handleStoreRedirect } from '../../utils/redirectUtils';

function CarProducts({ data, branch, phoneno, count, wspno }) {

    const [visibleItems, setVisibleItems] = useState(7);
    const [searchQuery, setSearchQuery] = useState("");
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 100);

        return () => clearTimeout(timer);
    }, [searchQuery]);
    const filteredData = data?.filter((item) =>
        item?.maker_model.toLowerCase().includes(debouncedQuery.toLowerCase())
    );
    const sortedData = filteredData?.sort(
        (a, b) => a.price_24_hours - b.price_24_hours
    );
    const carModels = ['MARUTHI WAGON R', 'MARUTHI SWIFT', 'MARUTHI DZIRE', 'GRAND NIOS', 'MARUTHI BALENO', 'HYUNDAI I20', 'HYUNDAI VENUE', 'KIA SONET', 'KIA SELTOS', 'KIA SONET SUNROOF', 'SELTOS SUNROOF', 'MARUTHI ERTIGA', 'MAHINDRA THAR 2024 Diesel', 'INNOVA CRYSTA Diesel', 'MAHINDRA XUV 700 Diesel'];
    // const carModels = ['MAHINDRA XUV 700', 'INNOVA CRYSTA AUTOMATIC', 'MAHINDRA XUV 500', 'MG HECTOR PLUS SUNROOF', 'HYUNDAI VERNA', 'KIA CARENS SUNROOF AUTOMATIC 2024', 'MAHINDRA XUV 700 AX7 AUTOMATIC', 'MAHINDRA XUV 700 AX5', 'HYUNDAI CRETA SUNROOF', 'NEXON SUNROOF AUTOMATIC', 'VENUE SUNROOF IMT', 'HYUNDAI I20 SUNROOF', 'MAHINDRA XUV 300 SUNROOF AUTOMATIC', 'MAHINDRA THAR AUTOMATIC', 'KIA SONET SUNROOF IMT 2024'];

    const filteredItems = carModels.flatMap((model) =>
        filteredData?.filter((item) => item?.maker_model === model)
    );
    const [showDown, setShowDown] = useState(false)

    return (
        <div className=" bg-white">
            <h2 className="text-black xl:text-5xl lg:text-4xl text-lg mxs:text-xl font-bold text-center py-7 capitalize">
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
                    <>
                        <CardFragment key={index} item={item} wspno={wspno} phoneno={phoneno} />
                        {(index + 1 == 3 || index + 1 == 6 || index + 1 == 8) && (
                            <div className=" items-center block lg:hidden pb-5">
                                <div className=" lg:rounded-md items-center lg:w-72 flex flex-col relative">
                                    {!(index + 1 == 8) ?
                                        <Image
                                            src={disc1}
                                            height={1000}
                                            width={1000}
                                            alt="Long Drive Cars app"
                                            className=" lg:w-80 w-full "
                                        /> :
                                        <div className="px-2">
                                            <div className="text-black border-2 border-[#0456e8] rounded-md p-2">
                                                <div className="flex justify-between items-center">
                                                    <div className="text-lg font-semibold">
                                                        <p className="uppercase text-2xl font-light pb-4 flex flex-col">
                                                            <span>Download</span><span>our app</span>
                                                        </p>
                                                        <p className="animate-bounce">
                                                            <span className="bg-gradient-to-r from-green-700 to-green-700 bg-clip-text text-transparent text-3xl animate-spin">
                                                                ₹ 250 off
                                                            </span>{' '}
                                                        </p>
                                                        <p className="capitalize">on your first booking!</p>
                                                    </div>

                                                    <Image
                                                        className="lg:w-44 w-28 scale-90 mxs:scale-100"
                                                        src="/popup.webp"
                                                        alt="Long Drive Cars"
                                                        width={1000}
                                                        height={1000}
                                                        fetchPriority="high"
                                                        onError={() => console.error("Image failed to load!")}
                                                    />

                                                </div>
                                                <div className="mt-3 text-sm">
                                                    <p className="font-medium">Hurry, offer ends soon!</p>
                                                </div>
                                                <div onClick={handleStoreRedirect} className="my-3 flex lg:hidden justify-center">
                                                    <a
                                                        href="#"
                                                        className="py-2 px-4 text-white font-semibold rounded-full shadow-lg border-[1px] border-[#5566ee] relative overflow-hidden bg-gradient-to-r from-green-600 via-[#556ee6] to-indigo-400 animate-gradient p-2 text-xs mxs:text-sm capitalize"
                                                    >
                                                        download long drive cars app
                                                        <style jsx>{`
                                                                    @keyframes gradientAnimation {
                                                                        0% {
                                                                            background-position: 0% 50%;
                                                                        }
                                                                        50% {
                                                                            background-position: 100% 50%;
                                                                        }
                                                                        100% {
                                                                            background-position: 0% 50%;
                                                                        }
                                                                    }
                            
                                                                    .animate-gradient {
                                                                        background-size: 300% 300%;
                                                                        animation: gradientAnimation 5s linear infinite;
                                                                    }
                                                                `}</style>
                                                    </a>
                                                </div>
                                                <div className="mt-3 lg:flex flex-col gap-y-2 items-center hidden justify-center">
                                                    <p className="capitalize">Scan QR to download the app</p>
                                                    <Image
                                                        className="lg:w-28 w-28"
                                                        src={ldcqr}
                                                        alt="Long Drive Cars"
                                                        width={500}
                                                        height={500}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    }

                                    <div className="flex flex-col justify-between  text-white pt-4">
                                        <p className="text-black text-base font-semibold flex flex-col gap-y-1 pb-3 capitalize justify-center items-center">{(index + 1 == 8) ? <span>You Want More information</span> : <span>Need more details on 1 Rupee Car</span>}<span>contacts us</span></p>
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
                                        <div onClick={handleStoreRedirect} className=" lg:hidden flex justify-center items-center cursor-pointer text-black pt-4 text-lg font-semibold">
                                            <p className="bg-gradient-to-r from-green-600 via-[#556ee6] to-indigo-400 inline-block text-transparent bg-clip-text animate-gradient border-[1px] border-[#5566ee] p-2 rounded-md">
                                                Download Long Drive Cars App
                                            </p>
                                        </div>

                                        <div onClick={() => { setShowDown(true) }} className="lg:flex hidden  justify-center items-center cursor-pointer text-black py-4 text-lg lg:text-base font-semibold">
                                            <p className="bg-gradient-to-r from-green-600 via-[#556ee6] to-indigo-400 text-transparent bg-clip-text animate-gradient border-[1px] border-[#5566ee] p-2 rounded-md lg:block hidden">
                                                Download Long Drive Cars App
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
                            </div>
                        )}
                        {(index + 1 === 2) && (
                            <div className="lg:block hidden pt-14 lg:pt-0 items-center md:w-72  ">
                                <div className=" ">
                                    <Image
                                        src={disc1}
                                        height={1000}
                                        width={1000}
                                        alt="Long Drive Cars app"
                                        priority={true}
                                        className=" mxs:scale-[0.6] rounded-md lg:scale-100 relative lg:w-80 w-full "
                                    />
                                </div>
                            </div>
                        )}
                    </>

                ))}
                {searchQuery.length >= 1 && filteredData?.map((item, index) => (
                    <>

                        <CardFragment key={index} item={item} wspno={wspno} phoneno={phoneno} />

                    </>
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
