import React from 'react';

const ComponentName = (props) => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const [showResults, setShowResults] = React.useState(false);
    return (
        <div>
            <div className='px-2 w-full  pt-20 '>
                <div className="border-2 p-6 rounded-xl shadow-lg w-full max-w-6xl mx-auto grid grid-cols-1 lg:flex items-center gap-4">
                    <div className="py-5 px-2 text-center">
                        <p className="capitalize text-3xl font-semibold pb-3">Miles, Smiles, Stories</p>
                    </div>
                    {/* Destination */}
                    <div className="w-full md:w-1/4">
                        <label className="text-sm font-bold text-gray-600 mb-1 block">Destination</label>

                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search destinations..."
                                className="w-full bg-white border border-gray-200 rounded-xl py-3 pl-10 pr-4 shadow-sm focus:ring-2 focus:ring-blue-500"
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setShowResults(true);
                                }}
                                onFocus={() => setShowResults(true)}
                            />
                            {/* <MapPinIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-blue-400 pointer-events-none" /> */}

                            {/* Dropdown search results */}
                            {showResults && searchTerm && (
                                <ul className="absolute z-10 bg-white border border-gray-200 mt-1 w-full rounded-xl shadow-lg max-h-40 overflow-y-auto">
                                    {filteredDestinations.length > 0 ? (
                                        filteredDestinations.map((dest, idx) => (
                                            <li
                                                key={idx}
                                                onClick={() => {
                                                    setSelectedDestination(dest);
                                                    setSearchTerm(dest);
                                                    setShowResults(false);
                                                }}
                                                className="px-4 py-2 hover:bg-blue-100 cursor-pointer">
                                                {dest}
                                            </li>
                                        ))
                                    ) : (
                                        <li className="px-4 py-2 text-gray-500">No results found</li>
                                    )}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ComponentName;