import React from 'react'
import Image from 'next/image'
import tiago from '../../images/branchimages/1.webp'
import Link from 'next/link'

function ameerpet() {
    return (
        <div className='text-black pt-40 lg:py-12 text-xs lg:text-base leading-7 lg:leading-9 '>
            <h1 className='font-bold text-base lg:text-3xl xl:mx-72 lg:mx-80 mx-6'>Convenient Availability of Self-Driving Cars in Ameerpet</h1>
            <Image
                src={tiago}
                height={2000}
                width={2000}
                className='py-3 object-cover w-full'
                alt="Long Drive Cars app"
            />
            <div className='xl:mx-72 lg:mx-80 mx-6'>
                <p className='pb-2'>
                    Self Drive Cars Hyderabad is a market-leading provider of <strong>
                        <Link href="https://www.longdrivecars.in/hyderabad" target="_blank">self drive cars hyderabad</Link>
                    </strong> in Ameerpet, offering a diverse fleet to meet any individual's needs. Our car rental services are designed 
                    to provide the quality and professionalism you expect from a top-tier <strong>
                        <Link href="https://www.longdrivecars.in/hyderabad" target="_blank">self drive cars hyderabad</Link>
                    </strong> service.
                </p>
                {/* Section Headings and Paragraphs */}
                <p className='font-bold lg:text-xl py-2 pt-8'>Evolution of Self-Drive Car Rentals in India</p>
                <p className='pb-2'>
                    The car rental segment in India in 2019 was quite different from today. Self-driving enthusiasts were 
                    beginning to explore the benefits of <strong>
                        <Link href="https://www.longdrivecars.in/hyderabad" target="_blank">self drive cars hyderabad</Link>
                    </strong>, aided by widespread internet access, modern smartphones, and increasing disposable income...
                </p>
                {/* Repeat for remaining sections */}
                <p className='font-bold lg:text-xl py-2 pt-8'>Benefits of Self-Drive Car Rentals</p>
                <p className='pb-2'>
                    For professionals who frequently move cities, relocating a personal car incurs additional costs for NOC, 
                    re-registration, and other expenses...
                </p>
            </div>
        </div>
    )
}

export default ameerpet
