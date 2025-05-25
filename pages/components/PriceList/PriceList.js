import { useState, useEffect } from "react";
import Image from "next/image";
import compareldc from '../../images/comparecars.webp'
import srt from '../../images/500rscash.webp'
import orgcal from '../../images/originalcars.webp'
import { FaRegClock } from "react-icons/fa";
import { RiMoneyRupeeCircleFill } from "react-icons/ri";
import { SlSpeedometer } from "react-icons/sl";
import { GiTowTruck } from "react-icons/gi";
import { FaCar } from "react-icons/fa";
import { IoMdArrowDropdownCircle } from "react-icons/io";
import { SiContactlesspayment } from "react-icons/si";
import { FaCarSide } from "react-icons/fa";
import { IoCarSportSharp } from "react-icons/io5";
import apple from '../../images/apple.webp'
import google from '../../images/ggle.webp'
import Link from "next/link";
export default function PriceList({ city }) {
    const [listP, setListP] = useState('')
    useEffect(() => {
        async function fetchCarDetails() {
            try {
                const response = await fetch(`https://api.longdrivecars.com/site/${city}-prices`);
                const items = await response.json();
                const listprice = items?.results;
                setListP(listprice);
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
        }
        fetchCarDetails();
    }, []);

    return (
        <div className="xl:px-20 lg:px-16 px-4 lg:py-20 py-8  ">
            <p className="lg:text-xl text-xl text-[#660066] font-bold text-center pb-8 lg:pb-2 uppercase"><span className="font-bold text-lg text-[#dbbeed]">/</span><span className="font-bold text-lg text-[#c97ef7]">/</span><span className="font-bold text-lg text-[#660066]">/ </span>price list</p>
            <p className="lg:text-4xl text-xl font-bold text-center text-black pb-8 lg:pb-12 capitalize">Check out our comprehensive price list</p>
            <div className=" flex flex-wrap gap-14">
                <div className=" rounded- overflow-hidden">

                    <table className="lg:w-96 divide-y  text-xs text-black rounded-t-md  overflow-hidden" >
                        <thead className="bg-[#660066] text-white rounded-md">
                            <tr>
                                <th className="px-2 py-3 text-left  font-medium uppercase tracking-wider border border-gray-300 whitespace-nowrap"> 5 Seater Basic Cars </th>
                                <th className="px-2 py-3 text-left  font-medium uppercase tracking-wider border border-gray-300 whitespace-nowrap"> 24 hrs Price</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            <tr>
                                <td className="px-2 py-2  border border-gray-300 font-semibold text-wrap">
                                    {listP['seater_5_basic_cat_1']?.show_text}
                                </td>
                                <td className="px-2 py-2  border border-gray-300 font-semibold">
                                    {listP['seater_5_basic_cat_1']?.price} </td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2  border border-gray-300 font-semibold text-wrap">
                                    {listP['seater_5_basic_cat_2']?.show_text}
                                </td>
                                <td className="px-2 py-2  border border-gray-300 font-semibold">
                                    {listP['seater_5_basic_cat_2']?.price} </td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2  border border-gray-300 font-semibold text-wrap">
                                    {listP['seater_5_basic_cat_3']?.show_text}
                                </td>
                                <td className="px-2 py-2  border border-gray-300 font-semibold">
                                    {listP['seater_5_basic_cat_3']?.price} </td>
                            </tr>
                            <tr>
                                <td className="px-2 py-2  border border-gray-300 font-semibold text-wrap">
                                    {listP['seater_5_basic_cat_4']?.show_text}
                                </td>
                                <td className="px-2 py-2  border border-gray-300 font-semibold">
                                    {listP['seater_5_basic_cat_4']?.price} </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <table className="lg:w-96 w-80 divide-y  text-xs text-black rounded-t-md   overflow-hidden" >
                    <thead className="bg-[#660066] text-white">
                        <tr>
                            <th className="px-2 py-3 text-left  font-medium uppercase tracking-wider border border-gray-300 whitespace-nowrap"> 5 seater luxury </th>
                            <th className="px-2 py-3 text-left  font-medium uppercase tracking-wider border border-gray-300 whitespace-nowrap"> 24 hrs Price</th>

                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-2 py-2  border border-gray-300 font-semibold text-wrap">{listP['seater_5_luxury_cat_1']?.show_text}
                            </td>
                            <td className="px-2 py-2  border border-gray-300 font-semibold">
                                {listP['seater_5_luxury_cat_1']?.price}  </td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2  border border-gray-300 font-semibold text-wrap">{listP['seater_5_luxury_cat_2']?.show_text}
                            </td>
                            <td className="px-2 py-2  border border-gray-300 font-semibold">
                                {listP['seater_5_luxury_cat_2']?.price}  </td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2  border border-gray-300 font-semibold text-wrap">{listP['seater_5_luxury_cat_3']?.show_text}
                            </td>
                            <td className="px-2 py-2  border border-gray-300 font-semibold">
                                {listP['seater_5_luxury_cat_3']?.price}  </td>
                        </tr>
                    </tbody>
                </table>
                <table className="lg:w-96 w-80 divide-y  text-xs text-black rounded-t-md   overflow-hidden" >
                    <thead className="bg-[#660066] text-white">
                        <tr>
                            <th className="px-2 py-3 text-left  font-medium uppercase tracking-wider border border-gray-300 whitespace-nowrap"> 5 Seater Sunroof Cars </th>
                            <th className="px-2 py-3 text-left  font-medium uppercase tracking-wider border border-gray-300 whitespace-nowrap"> 24 hrs Price</th>

                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-2 py-2  border border-gray-300 font-semibold text-wrap">i20 Sunroof / Ecosport Sunroof
                            </td>
                            <td className="px-2 py-2  border border-gray-300 font-semibold">
                                {listP['seater_5_sunroof_cat_1']?.price}  </td>

                        </tr>
                        <tr>
                            <td className="px-2 py-2  border border-gray-300 font-semibold">{listP['seater_5_sunroof_cat_2']?.show_text}
                            </td>
                            <td className="px-2 py-2  border border-gray-300 font-semibold">{listP['seater_5_sunroof_cat_2']?.price} </td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2  border border-gray-300 font-semibold">{listP['seater_5_sunroof_cat_3']?.show_text}
                            </td>
                            <td className="px-2 py-2  border border-gray-300 font-semibold">{listP['seater_5_sunroof_cat_3']?.price} </td>
                        </tr>

                    </tbody>
                </table>
                <table className="lg:w-96 w-80 divide-y  text-xs text-black rounded-t-md   overflow-hidden" >
                    <thead className="bg-[#660066] text-white">
                        <tr>
                            <th className="px-2 py-3 text-left  font-medium uppercase tracking-wider border border-gray-300 whitespace-nowrap"> 7 seater cars </th>
                            <th className="px-2 py-3 text-left  font-medium uppercase tracking-wider border border-gray-300 whitespace-nowrap"> 24 hrs Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-2 py-2  border border-gray-300 font-semibold text-wrap">{listP['seater_7_basic_cat_1']?.show_text}
                            </td>
                            <td className="px-2 py-2  border border-gray-300 font-semibold">
                                {listP['seater_7_basic_cat_1']?.price} </td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2  border border-gray-300 font-semibold text-wrap">{listP['seater_7_basic_cat_2']?.show_text}
                            </td>
                            <td className="px-2 py-2  border border-gray-300 font-semibold">
                                {listP['seater_7_basic_cat_2']?.price} </td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2  border border-gray-300 font-semibold text-wrap">{listP['seater_7_basic_cat_3']?.show_text}
                            </td>
                            <td className="px-2 py-2  border border-gray-300 font-semibold">
                                {listP['seater_7_basic_cat_3']?.price} </td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2  border border-gray-300 font-semibold text-wrap">{listP['seater_7_basic_cat_4']?.show_text}
                            </td>
                            <td className="px-2 py-2  border border-gray-300 font-semibold">
                                {listP['seater_7_basic_cat_4']?.price} </td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2  border border-gray-300 font-semibold text-wrap">{listP['seater_7_basic_cat_5']?.show_text}
                            </td>
                            <td className="px-2 py-2  border border-gray-300 font-semibold">
                                {listP['seater_7_basic_cat_5']?.price} </td>
                        </tr>
                    </tbody>
                </table>
                <table className="lg:w-96 w-80 divide-y  text-xs text-black rounded-t-md   overflow-hidden" >
                    <thead className="bg-[#660066] text-white">
                        <tr>
                            <th className="px-2 py-3 text-left  font-medium uppercase tracking-wider border border-gray-300 whitespace-nowrap"> 7 Seater Sunroof Cars </th>
                            <th className="px-2 py-3 text-left  font-medium uppercase tracking-wider border border-gray-300 whitespace-nowrap"> 24 hrs Price</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                            <td className="px-2 py-2  border border-gray-300 font-semibold text-wrap">{listP['seater_7_sunroof_cat_1']?.show_text}
                            </td>
                            <td className="px-2 py-2  border border-gray-300 font-semibold">
                                {listP['seater_7_sunroof_cat_1']?.price} </td>
                        </tr>
                        <tr>
                            <td className="px-2 py-2  border border-gray-300 font-semibold text-wrap">{listP['seater_7_sunroof_cat_2']?.show_text}
                            </td>
                            <td className="px-2 py-2  border border-gray-300 font-semibold">
                                {listP['seater_7_sunroof_cat_2']?.price} </td>
                        </tr>
                    </tbody>
                </table>


            </div>
            <div className="pt-5 lg:hidden">
                {/* <div className="text-white font-bold xl:px-28 lg:px-12 rounded-md py-4 ">
                    <Image
                        src={compareldc}
                        width={1000}
                        height={1000}
                        className="rounded-md"
                    />
                </div> */}
                {/* <div className="text-white font-bold xl:px-28 lg:px-12 rounded-md py-4 ">
                    <Image
                        src={orgcal}
                        width={1000}
                        height={1000}
                        className="rounded-md"
                    />
                </div> */}
                {/* <div className="text-white font-bold xl:px-28 lg:px-12 rounded-md py-4 ">
                    <Image
                        src={srt}
                        width={1000}
                        height={1000}
                        className="rounded-md"
                    />
                </div> */}

                <div className="lg:text-left xl:pl-0 lg:pl-4 text-black font-[500] xl:text-base text-xl lg:pt-10 pt-3">
                    <h1 className='xl:text-3xl lg:text-2xl text-xl text-center lg:text-left  font-bold  lg:w-2/3 capitalize'>Self Drive Car Rentals</h1>
                    <h2 className='xl:text-2xl lg:text-xl text-lg text-center lg:text-left font-semibold lg:w-2/3 lg:pt-7 pt-3'>1 Lakh + Cars Near You</h2>
                    <h3 className='pt-2 xl:text-2xl lg:text-xl text-lg text-center lg:text-left font-semibold lg:w-3/5'>Download Long Drive Cars App to Check Available Cars & Book</h3>
                    <div className='flex flex-wrap justify-center lg:justify-normal lg:gap-8 pt-2 gap-2 lg:w-full text-sm md:text-xs xl:text-base'>
                        <div className="flex gap-2 py-2 justify-center lg:justify-normal items-center">
                            <Link href={'https://apps.apple.com/in/app/long-drive-cars/id6466695391'}>
                                <Image
                                    height={500}
                                    width={500}
                                    alt="apple"
                                    className="lg:w-40 lg:h-14 w-28 h-11 lg:hover:scale-105"
                                    src={apple}
                                    fetchpriority="high"
                                />
                            </Link>
                            <Link href="https://play.google.com/store/search?q=long+drive+cars&c=apps">
                                <Image
                                    height={500}
                                    width={500}
                                    alt="google"
                                    className="lg:w-48 lg:h-20 w-32 h-16 lg:hover:scale-105"
                                    src={google}
                                    fetchpriority="high"
                                />
                            </Link>
                        </div>
                        <div className=''>
                            <div className="flex gap-4  pt-4 pr-4  text-xs font-medium lg:text-sm  flex-wrap text-white">
                                <div className="flex items-center gap-1 p-2 bg-[#660066] xl:text-base lg:text-xs text-sm  border-[1px] border-black lg:rounded-full rounded-md lg:hover:scale-105 xl:w-[330px] lg:w-[250px]  w-full">
                                    <FaRegClock className="bg-white text-black lg:rounded-full rounded-md p-1" size={40} />
                                    <p className="">Choose Your Own Hours</p>
                                </div>
                                <div className="flex items-center gap-1 p-2 bg-[#660066] xl:text-base lg:text-xs text-sm  border-[1px] border-black lg:rounded-full rounded-md lg:hover:scale-105 xl:w-[330px] lg:w-[250px]  w-full">
                                    <GiTowTruck className="bg-white text-black lg:rounded-full rounded-md p-1" size={40} />
                                    <p className=" ml-2">24/7 Breakdown Service</p>
                                </div>
                                <div className="flex items-center gap-1 p-2 bg-[#660066] xl:text-base lg:text-xs text-sm  border-[1px] border-black lg:rounded-full rounded-md lg:hover:scale-105 xl:w-[330px] lg:w-[250px]  w-full">
                                    <SlSpeedometer className="bg-white text-black lg:rounded-full rounded-md p-1" size={40} />
                                    <p className=" ml-2">Unlimited Kilometers</p>
                                </div>
                                {<div className="flex items-center gap-1 p-2 bg-[#660066] xl:text-base lg:text-xs text-sm  border-[1px] border-black lg:rounded-full rounded-md lg:hover:scale-105 xl:w-[330px] lg:w-[250px]  w-full">
                                    <RiMoneyRupeeCircleFill className="bg-white text-black lg:rounded-full rounded-md p-1" size={40} />
                                    <p className="ml-2 ">No Deposit</p>
                                </div>}

                                <div className="flex items-center gap-1 p-2 bg-[#660066] xl:text-base lg:text-xs text-sm  border-[1px] border-black lg:rounded-full rounded-md lg:hover:scale-105 xl:w-[330px] lg:w-[250px]  w-full">
                                    <FaCar className="bg-white text-black lg:rounded-full rounded-md p-1" size={40} />
                                    <p className="ml-2">Check Original Car Photos & Book</p>
                                </div>
                                <div className="flex items-center gap-1 p-2 bg-[#660066] xl:text-base lg:text-xs text-sm  border-[1px] border-black lg:rounded-full rounded-md lg:hover:scale-105 xl:w-[330px] lg:w-[250px]  w-full">
                                    <FaCarSide className="bg-white text-black lg:rounded-full rounded-md p-1" size={40} />
                                    <p className="ml-2">Car Starts at {'₹1448/Day'}</p>
                                </div>
                                <div className="flex items-center gap-1 p-2 bg-[#660066] xl:text-base lg:text-xs text-sm  border-[1px] border-black lg:rounded-full rounded-md lg:hover:scale-105 xl:w-[330px] lg:w-[250px]  w-full">
                                    <IoMdArrowDropdownCircle className="bg-white text-black lg:rounded-full rounded-md p-1" size={40} />
                                    <p className="ml-2">Lowest Price Challenge</p>
                                </div>
                                {/* <div className="flex items-center gap-1 p-2 bg-[#660066] xl:text-base lg:text-xs text-sm  border-[1px] border-black lg:rounded-full rounded-md lg:hover:scale-105 xl:w-[330px] lg:w-[250px]  w-full">
                                    <IoCarSportSharp className="bg-white text-black lg:rounded-full rounded-md p-1" size={40} />
                                    <p className="ml-2">Swift Dzire { '₹1992'} per Day</p>
                                </div> */}
                                <div className="flex items-center gap-1 p-2 bg-[#660066] xl:text-base lg:text-xs text-sm  border-[1px] border-black lg:rounded-full rounded-md lg:hover:scale-105 xl:w-[330px] lg:w-[250px]  w-full">
                                    <SiContactlesspayment className="bg-white text-black lg:rounded-full rounded-md p-1" size={40} />
                                    <p className="ml-2">Just pay 10% Advance & book</p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
