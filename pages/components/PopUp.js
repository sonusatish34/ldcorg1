import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import ldcqr from '../images/ldcqr.png'
import { MdOutlineCancel } from 'react-icons/md'
import disc1 from '../images/offersimages/onerupee.webp'
import { handleStoreRedirect } from '../../utils/redirectUtils'

const PopUp = props => {
  const [isVisible, setIsVisible] = useState(false)
  const [isVisible1ruppe, setIsVisible1ruppe] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 65000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible1ruppe(true)
    }, 3000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isVisible])

  useEffect(() => {
    if (isVisible1ruppe) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [isVisible1ruppe])

  return (
    <div>
      {isVisible && (
        <>
          <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20' />
          <div
            className='fixed lg:top-52 top-40 z-30 left-1/2 transform -translate-x-1/2 w-5/6 h-fit max-w-sm p-4 bg-white border-2 border-[#0456e8] rounded-lg shadow-xl text-black transition-opacity duration-500 flex'
            style={{ opacity: isVisible ? 1 : 0 }}
          >
            <div>
              <div className='flex justify-between items-center'>
                <div className='text-lg font-semibold'>
                  <p className='uppercase text-2xl font-light pb-4 flex flex-col'>
                    <span>Download</span>
                    <span>our app</span>
                  </p>
                  <p className='animate-bounce'>
                    <span className='bg-gradient-to-r from-green-700 to-green-700 bg-clip-text text-transparent text-3xl animate-spin'>
                      ₹ 250 off
                    </span>{' '}
                  </p>
                  <p className='capitalize'>on your first booking!</p>
                </div>

                <Image
                  className='lg:w-44 w-28 scale-90 mxs:scale-100'
                  src='/popup.webp'
                  alt='Long Drive Cars'
                  width={1000}
                  height={1000}
                  priority
                  onError={() => console.error('Image failed to load!')}
                />
              </div>
              <div className='mt-3 text-sm'>
                <p className='font-medium'>Hurry, offer ends soon!</p>
              </div>
              <div
                onClick={handleStoreRedirect}
                className='my-3 flex lg:hidden justify-center'
              >
                <a
                  href='#'
                  className='py-2 px-4 text-white font-semibold rounded-full shadow-lg border-[1px] border-[#5566ee] relative overflow-hidden bg-gradient-to-r from-green-600 via-[#556ee6] to-indigo-400 animate-gradient p-2 text-xs mxs:text-sm capitalize'
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
              <div className='mt-3 lg:flex flex-col gap-y-2 items-center hidden justify-center'>
                <p className='capitalize'>Scan QR to download the app</p>
                <Image
                  className='lg:w-28 w-28'
                  src={ldcqr}
                  alt='Long Drive Cars'
                  width={500}
                  height={500}
                  priority
                />
              </div>
            </div>

            <button
              onClick={() => setIsVisible(false)}
              className='absolute top-0 right-0 p-2 bg-transparent focus:outline-none flex items-center justify-center z-40 pt-4 pr-4'
            >
              <span className='text-lg w-6 h-6 rounded-full relative hover:scale-105 bottom-1 flex justify-center items-center'>
                <MdOutlineCancel size={30} />
              </span>
            </button>
          </div>
        </>
      )}
      {isVisible1ruppe && (
        <>
          <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20' />
          <div
            className='fixed lg:top-5 mxs:top-10 top-20 z-50 left-1/2 transform -translate-x-1/2 w-5/6 h-fit max-w-sm p-3 lg:p-8 bg-white pt-10 rounded-lg shadow-xl text-black transition-opacity duration-500 flex'
            style={{ opacity: isVisible1ruppe ? 1 : 0 }}
          >
            <Image
              src={disc1}
              alt={` for rent`}
              width={1025}
              height={1034}
              className='h-[400px] mxs:h-[500px] lg:h-fit'
              priority
            />

            <button
              onClick={() => setIsVisible1ruppe(false)}
              className='absolute top-0 right-0 p-2 bg-transparent focus:outline-none flex items-center justify-center z-40 pt-4 pr-4'
            >
              <span className='text-lg w-6 h-6 rounded-full relative hover:scale-105 bottom-1 flex justify-center items-center'>
                <MdOutlineCancel size={30} />
              </span>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default PopUp
