import React from 'react'
import Image from 'next/image';
import ds from '../../../pages/images/icon-navigator.svg'
import clock from '../../../pages/images/icon-clock.svg'
import deposit from '../../../pages/images/deposit.svg'
import ggle from '../../../pages/images/ggle.webp'
import apple from '../../../pages/images/apple.webp'
import { BiPhoneCall } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import Link from 'next/link';
import lady from '../../../pages/images/tboo_lady_image.svg'
import Layout from '../Layout/Layout';
import app from '../../../pages/images/appcontact.webp'
const ContactUS = () => {

    return (

        <div className='text-black bg-white'>
            <div className='pl-6 lg:px-24'>
                <div className='px-2 py-2 lg:py-8 pt-36 border-b-2 border-gray-100 flex'>
                    <div className='lg:pt-8 flex flex-col gap-4'>
                        <p className="lg:text-xl text-xl text-[#660066] font-bold pb-8 lg:pb-2 uppercase"><span className="font-bold text-lg text-[#dbbeed]">/</span><span className="font-bold text-lg text-[#c97ef7]">/</span><span className="font-bold text-lg text-[#660066]">/ </span>ONLINE BOOKING</p>
                        <p className='text-xl lg:text-3xl font-semibold pb-4'>Get the Long Drive Cars Mobile app and Start Your Journey!</p>
                        <ul className='flex flex-wrap gap-3 lg:gap-5 font-semibold'>
                            <li className='flex flex-col'>
                                <Image
                                    src={ds}
                                    height={1000}
                                    width={1000}
                                    alt='Long Drive Cars app'
                                    className='w-16 h-16 pb'
                                ></Image>
                                <p>Easy to search</p>
                                <p>Long Drive Cars</p>
                            </li>
                            <li className='flex flex-col'>
                                <Image
                                    src={clock}
                                    height={1000}
                                    width={1000}
                                    alt='Long Drive Cars app'
                                    className='w-16 h-16'
                                ></Image>
                                <p>Unlimited</p>
                                <p>Kilometers</p>
                            </li>
                            <li className='flex flex-col'>
                                <Image
                                    src={deposit}
                                    height={1000}
                                    width={1000}
                                    alt='Long Drive Cars app'
                                    className='w-16 h-16'
                                ></Image>
                                <p>Zero </p>
                                <p>Deposit</p>
                            </li>
                        </ul>
                        <ul className='flex gap-2 items-center lg:justify-normal pt-2'>
                            <li>
                                <Link href={'https://play.google.com/store/search?q=long+drive+cars&c=apps'}>
                                    <Image
                                        src={ggle}
                                        height={1000}
                                        width={1000}
                                        alt='Long Drive Cars app'
                                        className='w-32 h-[5.2rem] lg:w-44'
                                    >
                                    </Image>
                                </Link>
                            </li>
                            <li>
                                <Link href={'https://apps.apple.com/in/app/long-drive-cars/id6466695391'}>
                                    <Image
                                        src={apple}
                                        height={1000}
                                        width={1000}
                                        alt='Long Drive Cars app'
                                        className='w-28 h-14 lg:w-40'

                                    >
                                    </Image>
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div
                        style={{
                            backgroundImage: 'url(/taxi-background.webp)',
                            backgroundSize: 'contain',
                            backgroundPosition: 'center',
                        }}
                        className="w-full h-screen lg:flex hidden items-center justify-center bg-no-repeat"
                    >
                        <Image
                            src={app}
                            height={1000}
                            width={1000}
                            alt='Long Drive Cars app'
                            className='w-[500px] relative bottom-28'
                        >
                        </Image>
                    </div>
                </div>
                <div className='border-b-2 border-gray-100 pt-4'>
                    <p className='text-2xl lg:text-3xl py-2 pb-4 font-bold'>Contact Information</p>
                    <div>
                        <ul className='grid grid-cols-1  lg:grid-cols-3 gap-4 lg:gap-x-40 lg:gap-y-10 lg:py-8'>
                            <li >
                                <p className='bg-[#0556e8] p-2 w-32 text-white'>Telangana</p>
                                <p className='flex flex-col gap-2 pt-3'><span>For Attachments Call us on</span><span><Link href="tel:9888988828" target="_blank">9888-9888-28</Link></span></p>
                                <p className='flex flex-col gap-2 pt-3'><span>For Bookings Call us on</span><span><Link href="tel:9000478478" target="_blank">9666-677-405</Link></span></p>
                            </li>
                            <li>
                                <p className='bg-[#0556e8] p-2 w-32 text-white'>Vizag</p>
                                <p className='flex flex-col gap-2 pt-3'><span>Call us on for Attachments & Bookings</span><span><Link href="tel:9666699583" target="_blank">96666-99583</Link></span></p>
                            </li>
                            <li>
                                <p className='bg-[#0556e8] p-2 w-32 text-white'>Warangal</p>
                                <p className='flex flex-col gap-2 pt-3'><span>Call us on for Attachments</span><span><Link href="tel:9000777665" target="_blank">9000-777-665</Link></span></p>
                            </li>
                            <li>
                                <p className='bg-[#0556e8] p-2 w-32 text-white'>Vijayawada</p>
                                <p className='flex flex-col gap-2 pt-3'><span>Call us on for Attachments & Bookings</span><span><Link href="tel:9666699583" target="_blank">96666-99583</Link></span></p>
                            </li>
                            <li>
                                <p className='bg-[#0556e8] p-2 w-52 text-white'>Helpline Numbers</p>
                                <p className='flex flex-col gap-2 pt-3'><span>Call us on for Attachments & Bookings</span><span><Link href="tel:9888988828" target="_blank">9888-9888-28</Link></span></p>
                            </li>
                        </ul>

                    </div>
                </div>
            </div>
        </div>

    )
}

export default ContactUS;