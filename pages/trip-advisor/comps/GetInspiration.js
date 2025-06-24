import React from 'react';

const GetInspiration = (props) => {
    return (
        <div className='py-4 px-4'>
            <p className='text-center font-semibold text-2xl'>Get Inspiration for your next trip</p>
            <p className='text-center text-lg text-gray-500 pt-2'>Travel Articles</p>
            <div className='flex flex-col gap-4 pt-10'>
                <div className='flex flex-col gap-2'>
                    <img src="https://templearchitectvkt.com/images/Side%20View__cam_04_01.jpg" alt="Travel Article" className="w-full h-60 object-cover object-bottom rounded-lg" />
                    <p className='text-lg font-semibold'>Top 10 temples in india</p>
                    <p>Jan, 11 2023</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <img src="/keralashot.jpg" alt="Travel Article" className="w-full h-60 object-cover object-bottom rounded-lg" />
                    <p className='text-lg font-semibold'>Top 5 tourist palces in india</p>
                    <p>Jan, 11 2023</p>
                </div>

            </div>
        </div>
    );
};

export default GetInspiration;