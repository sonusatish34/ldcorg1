import React from 'react'
import Image from 'next/image'
import thar from '../../images/branchimages/5.webp'
import Link from 'next/link'
function kukatpally() {

    return (
        <div className='text-black pt-40 lg:py-12 text-xs lg:text-base leading-7 lg:leading-9 '>
            <h1 className='font-bold text-base lg:text-3xl xl:mx-72 lg:mx-80 mx-6'>Experience the convenience of self-drive cars in Kukatpally  </h1>
            <Image
                src={thar}
                height={1000}
                width={1000}
                className='py-3 object-cover w-full'
                alt='Long Drive Cars app'
            />
           <div className="xl:mx-72 lg:mx-80 mx-6">
                <p className="pb-2">
                    <Link href="https://www.longdrivecars.in/hyderabad" target="_blank"><strong>Self Drive Cars Hyderabad</strong></Link> is a market-leading provider of
                    <strong> self-drive car rentals</strong> in Kukatpally, offering a modern fleet to meet individual needs.
                </p>
                <p className="pb-2">
                    As self-driving enthusiasts in India began to embrace the possibilities and advantages of
                    <strong> self-drive car rentals</strong>, the growing access to the Internet, widespread smartphone
                    ownership, and rising disposable income made it easier and more enjoyable to search for and rent
                    <strong> self-drive cars</strong>.
                </p>

                    <p className="font-bold">Charminar</p>
                <p className="pb-2">
                    Charminar, a historic monument and mosque, stands as an iconic symbol of Hyderabad. Built in 1591 by
                    Sultan Muhammad Quli Qutb Shah, it is renowned for its stunning Indo-Islamic architecture.
                </p>
                <p className="font-bold">Nehru Zoological Park</p>
                <p className="pb-2">
                    Nehru Zoological Park, one of the largest zoos in India, is a paradise for animal lovers and nature
                    enthusiasts. Spread over 380 acres, the zoo is home to a wide variety of species, including tigers, elephants,
                    and exotic birds.
                </p>

                <p className="pb-2">
                    Renting a car from <strong>Self Drive Cars Kukatpally</strong> allows you to enjoy privacy and comfort.
                    Whether you choose a luxurious vehicle like an Innova, XUV 500, or Fortuner, you can travel around Hyderabad
                    in style.
                </p>
                <p className="font-bold">Car Rental Services Available in Hyderabad</p>
                <p className="pb-2">
                    <Link href="https://www.longdrivecars.in/hyderabad" target="_blank"><strong>Self Drive Cars Hyderabad</strong></Link> offers various services, including flexible monthly car rental options.
                </p>
            </div>
        </div>
    )
}

export default kukatpally;