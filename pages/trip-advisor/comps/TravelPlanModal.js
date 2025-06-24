// components/TravelPlanModal.tsx
export default function TravelPlanModal({
    isOpen,
    onClose,
}) {
    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 text-black">
            <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md relative shadow-xl">
                <button
                    onClick={onClose}
                    className="absolute top-3 right-4 text-2xl font-semibold text-gray-600 hover:text-black"
                >
                    &times;
                </button>

                <h2 className="text-xl font-bold mb-4 border-b pb-2">Get Your Free Travel Plan Now!</h2>

                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">What do you want to explore?</label>
                        <input
                            type="text"
                            value="Hyderabad, IN"
                            readOnly
                            className="w-full border px-4 py-2 rounded-md bg-gray-100 mb-2"
                        />
                        <input
                            type="text"
                            placeholder="Search destination"
                            className="w-full border px-4 py-2 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="track block text-sm font-medium mb-1">When are you planning to travel?</label>
                        <div className="flex gap-2">
                            <input
                                type="date"
                                className="w-1/2 border px-3 py-2 rounded-md"
                            />
                            <input
                                type="date"
                                className="w-1/2 border px-3 py-2 rounded-md"
                            />
                        </div>
                        <div className="mt-2 flex items-center gap-2">
                            <input type="checkbox" id="flexible" />
                            <label htmlFor="flexible" className="text-sm">Not sure? Let us decide best time for your trip.</label>
                        </div>
                    </div>

                    <button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg shadow-lg">
                        Continue
                    </button>
                </div>
            </div>
        </div>
    )
}
