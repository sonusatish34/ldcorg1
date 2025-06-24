import React from 'react';

const PopularTrips = (props) => {

  const Slice = ({id,content }) => (
    <div
      key={id}
      className="flex items-center gap-2 border border-yellow-300 bg-yellow-100 text-gray-800 px-3 py-1.5 rounded-md text-sm font-medium shadow-sm"
    >
      <span className="bg-yellow-200 border border-yellow-300 rounded px-1.5 py-0.5 text-xs font-semibold">
        {id}
      </span>
      <span>{content}</span>
    </div>
  );
  return (
    <div className='py-4 px-4'>
      <p className='text-xl font-bold'>Top attractions in India</p>
      <ul className='flex  flex-wrap gap-4 pt-4'>
        <li><Slice id={'1'} content={'Hyderabad to Mumbai'} /></li>
        <li><Slice id={'2'} content={'Hyderabad to Goa'} /></li>
        <li><Slice id={'3'} content={'Bangalore to Chikmanglapur'} /></li>
        <li><Slice id={'4'} content={'Hyderabad to kerala'} /></li>
        <li><Slice id={'5'} content={'Hyderabad to Coimbatore'} /></li>
        <li><Slice id={'6'} content={'Hyderabad to Chennai'} /></li>
        <li><Slice id={'6'} content={'Hyderabad to '} /></li>
        <li><Slice id={'6'} content={'Hyderabad to Indore'} /></li>
        
      </ul>
    </div>
  );
};

export default PopularTrips;