import React from 'react'
import { BiPhoneCall } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import Link from 'next/link';
import { handleStoreRedirect } from '../../../utils/redirectUtils';
function GetInTouch({ city, phoneno, wspno }) {

  return (
    <div className='flex p-5 justify-around xl:justify-between lg:p-8 flex-wrap bg-[#660066] rounded-md text-white mx-[14px] lg:mx-[58px] xl:mx-[78px] my-3 items-center font-sans'>
      <div className='xl:w-5/12 xl:text-left w-full text-center lg:w-2/5 xl:text-4xl lg:text-2xl text-lg mxs:text-xl  lg:p-4 lg:pl-14 font-semibold'>
        Need Help in Booking
      </div>
      <div onClick={handleStoreRedirect} className="my-3 flex lg:hidden justify-center">
        <p
          href="#"
          className="py-2 px-4 text-white font-semibold rounded-full shadow-lg border-[1px] border-[#5566ee] relative overflow-hidden bg-gradient-to-r from-green-600 via-[#556ee6] to-indigo-400 animate-gradient p-2 text-xs mxs:text-base capitalize"
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
        </p>
      </div>
      <div className='flex flex-col pt-2 lg:pr-16 items-center justify-start gap-2 text-sm lg:p-4 font-semibold cursor-pointer pr-'>
        <p>CONTACT US</p>
        <div className='flex justify-around gap-3 pb-2 text-white'>
          <button className='bg-green-500  rounded-full p-2 '>
            <Link href={`https://api.whatsapp.com/send?phone=+91${wspno}&text=Hi%0AI%20am%20looking%20for%20a%20car%20booking`} target='_blank'>
              <p className=' flex items-center justify-center gap-1 text-sm text-white'><span><FaWhatsapp size={30} /></span> <span>Whatsapp</span></p>
            </Link>
          </button>
          <button className='bg-blue-500 rounded-full p-2'>
            <Link href={`tel:${phoneno}`} target='_blank'>
              <p className='flex items-center justify-center gap-1 text-sm'><span><BiPhoneCall size={30} /></span> <span>Call Us</span></p>
            </Link>
          </button>
        </div>
      </div>
    </div>
  )
}

export default GetInTouch