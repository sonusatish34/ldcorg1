import React, { useState } from 'react';

const FaqAccordion = ({ city }) => {
  const faqData = [
    {
      question: 'Documents required?',
      answer: "<p><p>Age 18+</p></p><p>After Booking Successful you can Upload your selfie photo & Aadhar card & Driving License in App one time only from next booking documents not required.</p><p>Our team will verify & Approve your documents.</p><p>You must upload your documents before your pickup time otherwise your booking will be Auto cancelled no refund.</p>"
    },
    
    {
      question: 'Late Or Extension Rules ?',
      answer: "<div><p>200/hr for 5 Seater</p><p>400/hr for 6,7,8 Seater</p><p>If You Extend More than 24hr before Return Time Same Price</p><p>If You Extend After Return Time, Then Double Amount will be charged</p></div>"
    },
    {
      question: 'Pickup Car Location',
      answer: "<p>In My Trips You Will Get Exact Car Location After booking Successfully After Uploading Documents</p>",
    },
    {
      question: 'Refund & Cancellation Policy',
      answer: "<p>There is No Refund  If you cancel the booking </p><p>As you are our Precious Customer </p><p>We Will Add same amount of LDC points into LDC Wallet if you Cancel the Booking before pickup Time only. </p>",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="xl:mx-28 lg:mx-16 ">
      {faqData.map((item, index) => (
        (city) ?
          item?.question !== 'Damage protection' &&
          <div key={index} className="border-b-[2px] border-gray-300 rounded mb-2 text-black">
            <div
              className="flex justify-between items-center px-4 py-3 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <span className="lg:w-full lg:text-lg font-semibold capitalize text-base w-64">{item.question}</span>
              <svg
                className={`lg:w-6 lg:h-6 w-4 h-4 rounded bg-[#660066] text-white transition-transform ${activeIndex === index ? 'transform rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div
              className={`transition-all duration-300 ${activeIndex === index ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}
            >
              <div className=' px-4 text-xs lg:text-base leading-6 lg:leading-9' dangerouslySetInnerHTML={{ __html: item.answer }} />
            </div>
          </div>
          : <div key={index} className="border-b-[2px] border-gray-300 rounded mb-2 text-black">
            <div
              className="flex justify-between items-center px-4 py-3 cursor-pointer"
              onClick={() => toggleAccordion(index)}
            >
              <span className="lg:w-full lg:text-lg font-semibold capitalize text-base w-64">{item.question}</span>
              <svg
                className={`lg:w-6 lg:h-6 w-4 h-4 rounded bg-[#660066] text-white transition-transform ${activeIndex === index ? 'transform rotate-180' : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div
              className={`transition-all duration-300 ${activeIndex === index ? 'max-h-screen' : 'max-h-0'} overflow-hidden`}
            >
              <div className=' px-4 text-xs lg:text-base leading-6 lg:leading-9' dangerouslySetInnerHTML={{ __html: item.answer }} />
            </div>
          </div>
      ))}
    </div>
  );
};

export default FaqAccordion;
