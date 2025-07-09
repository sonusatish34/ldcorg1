'use client';
import React, { useState } from 'react';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';

function SevaDarshanam() {
    const sevaList = [
        { name: 'Athi Seeghra Darshanam', price: 200 },
        { name: 'Suprabhata Seva', price: 300 },
    ];

    const [activeIndex, setActiveIndex] = useState(null);
    const [quantities, setQuantities] = useState(
        sevaList.map(() => ({ adults: 1, children: 0 }))
    );
    const [checkoutData, setCheckoutData] = useState(null);

    const handleQuantityChange = (index, type, value) => {
        const newQuantities = [...quantities];
        newQuantities[index][type] = Number(value);
        setQuantities(newQuantities);
    };

    const handleBookClick = (index) => {
        setActiveIndex(index === activeIndex ? null : index);
    };

    const handleSubmit = (index) => {
        const seva = sevaList[index];
        const { adults, children } = quantities[index];
        const total = seva.price * (adults + children);

        const order = {
            seva: seva.name,
            adults,
            children,
            price: seva.price,
            total,
            date: new Date().toLocaleString(),
        };

        // Save to sessionStorage (add multiple orders)
        const existing = JSON.parse(sessionStorage.getItem('sevaOrders') || '[]');
        sessionStorage.setItem('sevaOrders', JSON.stringify([...existing, order]));

        setCheckoutData(order); // Open popup
        setActiveIndex(null); // Close form
    };

    const closePopup = () => setCheckoutData(null);

    return (
        <div className="space-y-3 relative">
            <h3 className="text-lg font-semibold text-pink-700">Daily Sevas</h3>
            <ul className='flex flex-col gap-y-6'>
                {sevaList.map((seva, index) => (
                    <li key={index} className='border-2 border-gray-100 shadow-md rounded-lg p-4'>
                        <div className='flex flex-col gap-y-4'>
                            <span className="text-md font-medium">{seva.name}</span>
                            <span>₹ {seva.price.toFixed(2)}</span>
                            <button
                                className='text-white border-2 border-gray-100 rounded-md w-fit px-3 py-1 flex items-center gap-x-2 bg-pink-500'
                                onClick={() => handleBookClick(index)}
                            >
                                Book Now <IoArrowForwardCircleOutline />
                            </button>

                            {activeIndex === index && (
                                <div className="mt-3 space-y-2 animate-fade-in">
                                    <div className='flex items-center gap-3'>
                                        <label className='w-20'>Adults:</label>
                                        <input
                                            type="number"
                                            min={0}
                                            value={quantities[index].adults}
                                            onChange={(e) => handleQuantityChange(index, 'adults', e.target.value)}
                                            className='border rounded px-2 py-1 w-20'
                                        />
                                    </div>
                                    <div className='flex items-center gap-3'>
                                        <label className='w-20'>Children:</label>
                                        <input
                                            type="number"
                                            min={0}
                                            value={quantities[index].children}
                                            onChange={(e) => handleQuantityChange(index, 'children', e.target.value)}
                                            className='border rounded px-2 py-1 w-20'
                                        />
                                    </div>
                                    <button
                                        onClick={() => handleSubmit(index)}
                                        className='mt-2 bg-green-600 text-white px-4 py-1 rounded-md'
                                    >
                                        Proceed to Checkout
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                ))}
            </ul>

            {/* Checkout Popup */}
            {checkoutData && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-xl w-[90%] max-w-md shadow-xl relative">
                        <button onClick={closePopup} className="absolute top-2 right-3 text-red-600 text-xl">✕</button>
                        <h2 className="text-xl font-semibold text-center text-pink-700 mb-4">Order Summary</h2>
                        <div className="space-y-2 text-gray-800">
                            <p><strong>Seva:</strong> {checkoutData.seva}</p>
                            <p><strong>Adults:</strong> {checkoutData.adults}</p>
                            <p><strong>Children:</strong> {checkoutData.children}</p>
                            <p><strong>Price per ticket:</strong> ₹{checkoutData.price}</p>
                            <p><strong>Total:</strong> ₹{checkoutData.total}</p>
                            <p><strong>Date:</strong> {checkoutData.date}</p>
                        </div>
                        <div className="mt-5 flex justify-center">
                            <button onClick={closePopup} className="bg-pink-600 text-white px-4 py-2 rounded-md">Confirm</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SevaDarshanam;
