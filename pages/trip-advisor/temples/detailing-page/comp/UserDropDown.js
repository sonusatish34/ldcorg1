import { useState } from 'react';
import { FaUserCircle, FaHistory, FaSignOutAlt } from 'react-icons/fa';

export default function UserDropdown() {
    const [showOrders, setShowOrders] = useState(false);
    const [orderHistory, setOrderHistory] = useState([]);

    const handleOrdersClick = () => {
        const stored = JSON.parse(sessionStorage.getItem('sevaOrders') || '[]');
        setOrderHistory(stored);
        setShowOrders(!showOrders);
    };

    return (
        <div className="relative flex items-center gap-2">
            <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-[#A94A4A] text-white rounded-md hover:bg-pink-700 transition shadow-sm">
                    <FaUserCircle className="text-lg" />
                    <span className="font-medium">Satish</span>
                </button>

                <button
                    onClick={handleOrdersClick}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-[#A94A4A] border border-pink-600 rounded-md hover:bg-pink-50 transition shadow-sm"
                >
                    <FaHistory className="text-base" />
                    <span className="font-medium">Bookings</span>
                </button>
            </div>


            {/* Orders Dropdown Panel */}
            {showOrders && (
                <div className="absolute -top-8 right-0 mt-20 w-[360px] max-h-[400px] overflow-y-auto bg-white rounded-xl border shadow-2xl p-4 z-50 animate-fade-in">
                    <h3 className="text-lg font-semibold text-pink-700 text-center mb-3">🪔 Your Bookings</h3>

                    {orderHistory.length === 0 ? (
                        <p className="text-sm text-gray-500 text-center">No bookings found</p>
                    ) : (
                        <ul className="space-y-3">
                            {orderHistory.map((order, idx) => (
                                <li
                                    key={idx}
                                    className="bg-pink-50 border border-pink-200 rounded-lg p-3 shadow-sm hover:shadow-md transition duration-200"
                                >
                                    <div className="font-semibold text-pink-800 capitalize">{order.templename}</div>
                                    {<div className="font-semibold text--80">({order.seva})</div>}
                                    <div className="text-sm text-gray-700">
                                        👤 Adults: {order.adults} | 👶 Children: {order.children}
                                    </div>
                                    <div className="text-sm text-gray-700">💸 Total: ₹{order.total}</div>
                                    <div className="text-xs text-gray-500 mt-1">{order.date}</div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </div>
    );
}
