import { BiPhoneCall } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import ldcqr from '../../images/ldcqr.png'
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { TbManualGearbox } from "react-icons/tb";

import { FaAppStore } from "react-icons/fa";
import { BiLogoPlayStore } from "react-icons/bi";
import { handleStoreRedirect } from '../../../utils/redirectUtils';

const CardFragment = ({ item, wspno, phoneno, index }) => {
    const [showDown, setShowDown] = useState(false)

    const replaceText = (str) => {
        if (str?.includes("cdn")) return str;
        else {
            return str?.replace("https://ldcars.blr1.", "https://ldcars.blr1.cdn.");
        }
    };



    return (
        <React.Fragment key={index}>
            {
                <div className=" lg:rounded-md flex flex-col  w-[100%] md:w-72 first-line:h-[555px] ">
                    <div className="relative lg:rounded-md h-[445px]">

                        <div>
                            <Link
                                href={`${("car-rental/" + item?.maker_model)
                                    .toLowerCase()
                                    .replace(/ /g, "-")}`}
                            >
                                <div className="relative w-full h-[440px]">
                                    <Image
                                        src={replaceText(item?.car_image_front_view)}
                                        alt={`${item?.maker_model.toLowerCase()} car rental in long drive cars`}
                                        fill
                                        className="object-cover rounded-md"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                            </Link>
                        </div>


                        <div className="relative h-20 z-20 bg-gradient-to-b from-black opacity-90 lg:rounded-md bottom-[27.5rem] lg:bottom-[27.5rem]">
                            <div className="flex flex-col gap-2 items-end pt-4 pr-1">
                                <p className="relative bottom-3 capitalize p-1  text-white rounded-md  z-50 font-manrope lg:text-sm text-xs mxs:text-base  pt-2 ">
                                    {item?.maker_model.toLowerCase()}
                                </p>
                            </div>
                        </div>
                        <div className="relative z-20 bottom-[12.2rem] lg:bottom-[12rem] lg:rounded-b-md bg-gradient-to-t from-black opacity-90 text-white">
                            <div className="flex gap-x-8 mxs:gap-x-16  items-center justify-center pt-5 pb-2 w-full">
                                <p className="text-[15px] shadow-black">Book Now</p>
                                <p className="capitalize p-1 font-bold text-white  rounded-md  z-50 font-manrope text-base  lg:text-sm pt-2">
                                    ₹ {item?.price_24_hours * 24} / 24hrs
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
            }
        </React.Fragment>
    );
};

export default CardFragment;