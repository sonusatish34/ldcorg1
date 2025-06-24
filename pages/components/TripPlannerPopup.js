'use client';

import { useState } from 'react';
import { DateRange } from 'react-date-range';
import { addDays } from 'date-fns';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export default function TripPlannerPopup() {
    const [destination, setDestination] = useState('');
    const [showCalendar, setShowCalendar] = useState(false);
    const [range, setRange] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 3),
            key: 'selection',
        },
    ]);

    const handleSubmit = () => {
        const { startDate, endDate } = range[0];
        const tripDetails = {
            destination,
            startDate,
            endDate,
        };
        console.log(tripDetails);
    };


    return (
        <div className='px-3'>
            <div className="border border-gray-300 rounded-xl p-6 w-full bg-white">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-bold text-purple-800">Plan Your Trip 🚘</h2>
                    {/* <button onClick={() => setIsOpen(false)} className="text-sm text-gray-500 hover:text-red-600">
                    Cancel ✖️
                </button> */}
                </div>

                <div className="space-y-5">
                    {/* Destination Input */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            placeholder="Enter city or place"
                            value={destination}
                            onChange={(e) => setDestination(e.target.value)}
                        />
                    </div>

                    {/* Trip Dates Input */}
                    <div className="relative">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Trip Dates</label>
                        <input
                            readOnly
                            onClick={() => setShowCalendar(!showCalendar)}
                            value={`${range[0].startDate.toDateString()} → ${range[0].endDate.toDateString()}`}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 cursor-pointer bg-white focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        {showCalendar && (
                            <div className="mt-2">
                                <DateRange
                                    editableDateInputs={true}
                                    onChange={(item) => setRange([item.selection])}
                                    moveRangeOnFirstSelection={false}
                                    ranges={range}
                                    minDate={new Date()}
                                />
                                <div className="text-right mt-2">
                                    <button
                                        onClick={() => setShowCalendar(false)}
                                        className="px-4 py-1 text-sm bg-purple-700 text-white rounded hover:bg-purple-800 transition"
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-purple-700 text-white font-semibold py-2 rounded-xl hover:bg-purple-800 transition"
                    >
                        Plan My Trip ✈️
                    </button>
                </div>
            </div>
        </div>

    );
}
