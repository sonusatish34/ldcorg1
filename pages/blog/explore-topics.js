import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";
// import React, { useEffect, useState } from 'react';
import BlogLayout from './blogcomponents/BlogLayout';
import { getDocs, collection } from 'firebase/firestore';
import { fireDb } from '../../public/firebase';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from 'next/link';
import Head from "next/head";

import { MdExplore } from "react-icons/md";
const ComponentName = ({canonicalUrl}) => {
    useEffect(() => {
        const link = document.querySelector('link[rel="canonical"]');
        if (link) {
          link.href = canonicalUrl;
        }
      }, [canonicalUrl]);
    const [cList, setCList] = useState();
   
    useEffect(() => {
        const fetchCat = async () => {
            const querySnapshot = await getDocs(collection(fireDb, "catgforldc"));
            const cs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCList(cs);
            
        };
        fetchCat();
    }, [])

    return (
        <BlogLayout>
             <Head>
                <title>  No Deposit & Unlimited km - Self-Drive Car Rentalss In vizag</title>
                <meta name="description" content="Self-drive cars start at 62/hr, We offer Long Drive Cars for the best prices with unlimited km , Book clDzire @ ₹83/hr, Baleno @ ₹91/hr, Ertiga @ ₹124/hr, Swift @ ₹83/hr, Thar @ ₹208/hr." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="  No Deposit & Unlimited km - Self-Drive Car Rentalss In vizag" />
                <meta property="og:description" content="Self-drive cars start at 62/hr, We offer Long Drive Cars for the best prices with unlimited km , Book Dzire @ ₹83/hr, Baleno @ ₹91/hr, Ertiga @ ₹124/hr, Swift @ ₹83/hr, Thar @ ₹208/hr." />

                <link rel="canonical" href={canonicalUrl} />
                </Head>
            <div className="flex flex-col gap-5  items-center  lg:px-64 lg:py-10">
                <div className="flex  lg:gap-10 gap-5  py-4 lg:py-4  ">
                   
                    
                        <div className='flex  items-center space-x-1 '>
                            <span className='w-fit '><MdExplore size={[32]} /></span>
                            <span className=" lg:inline text-2xl lg:text-4xl font-bold lg:rounded-lg w-fit  ">Explore Topics</span>

                        </div>
                 

                    {/* <div className="lg:w-[600px] w-44 mxs:w-60 lg:text-base mxs:text-sm text-sm   py-4 lg:py-2">
                        <Slider  {...settings} className="blog-carousal  ">
                            {cList?.length && cList.map((category, i) => (
                                <p className=' text-center capitalize font-medium text-black text-sm lg:text-base rounded-3xl p-[2px] lg:p-[1px] bg-gray-200 lg:rounded-3xl   '>{category.name}</p>
                            ))}
                        </Slider>
                    </div> */}
                </div>
                <div className="justify-items-center  ">

                    {/* <p className="lg:text-3xl text-base font-bold pb-2 lg:pb-6">Explore Topics</p> */}
                    <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
                        {cList?.length &&
                       cList.map((cat, i) => (
                    <Link

                                key={`category-${i}`}  
                                href={`/blog/${cat.name.toLowerCase()}`}
                               
                                 className="capitalize font-medium text-black text-sm lg:text-base rounded-xl p-3 lg:p-4 text-center bg-gray-200 lg:rounded-xl hover:scale-110 ">
                                   {cat.name.toLowerCase()}
                                            </Link>
                                 ))}



                    </ul>
                </div>

              




            </div>
        </BlogLayout>
    );
};
export async function getServerSideProps({ req }) {
    const host = req.headers.host || "localhost";
    const canonicalUrl = host.includes(".in")
      ? "https://www.longdrivecars.in/blog/explore-topics"
      : "https://www.longdrivecars.com/blog/explore-topics";
  
    return {
      props: {
        canonicalUrl,
      },
    };
  }

export default ComponentName;
