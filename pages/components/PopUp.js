import React from 'react';
import { useState, useEffect } from 'react';
import Image from 'next/image';
import ldcqr from '../images/ldcqr.png';
const PopUp = (props) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 5000);

        return () => clearTimeout(timer);
    }, []);

    const handleStoreRedirect = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            // Redirect to App Store if iOS
            window.open(
                "https://apps.apple.com/in/app/long-drive-cars/id6466695391",
                "_blank"
            );
        } else if (/android/i.test(userAgent)) {
            // Redirect to Play Store if Android
            window.open(
                "https://play.google.com/store/search?q=long+drive+cars&c=apps",
                "_blank"
            );
        } else {
            // Optional: Provide a message for non-mobile devices
            alert("App is available only on mobile devices.");
        }
    };
    useEffect(() => {
        if (isVisible) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }, [isVisible]);
    return (
        <div>
            {isVisible && (
                <>
                    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-20" />

                    <div
                        className="fixed lg:top-52 top-40 z-30 left-1/2 transform -translate-x-1/2 w-5/6 h-fit  max-w-sm p-4 bg-gradient-to-r from-blue-300 to-cyan-100 rounded-lg shadow-xl text-black transition-opacity duration-500 flex"
                        style={{ opacity: isVisible ? 1 : 0 }}
                    >
                        <div>
                            <div className="flex justify-between items-center">
                                <div className="text-lg font-semibold">
                                    <p className="uppercase text-2xl font-light pb-4 flex flex-col"><span>Download</span><span>our app</span> </p>
                                    <p className="animate-bounce">
                                        <span className="bg-gradient-to-r from-green-700 to-green-700 bg-clip-text text-transparent text-3xl animate-spin">
                                            ₹ 500 off
                                        </span>{' '}
                                    </p>
                                    <p className="capitalize">on your first booking!</p>
                                </div>

                                <Image
                                    className="lg:w-44 w-28 scale-90 mxs:scale-100"
                                    src="/popup.webp"
                                    alt="Long Drive Cars"
                                    width={1000}
                                    height={1000}
                                />
                            </div>
                            <div className="mt-3 text-sm">
                                <p className="font-medium">Hurry, offer ends soon!</p>
                            </div>
                            <div onClick={handleStoreRedirect} className="mt-3 flex lg:hidden justify-center">
                                <a
                                    href="#"
                                    className="py-2 px-4 text-white font-semibold rounded-full shadow-lg border-[1px] border-[#5566ee] relative overflow-hidden bg-gradient-to-r from-green-600 via-[#556ee6] to-indigo-400 animate-gradient p-2"
                                >
                                    Download Now
                                    <style jsx>{`
                                                @keyframes gradientAnimation {
                                                    0% {
                                                        background-position: 0% 50%;
                                                    }
                                                    50% {
                                                        background-position: 100% 50%;
                                                    }
                                                    100% {
                                                        background-position: 0% 50%;
                                                    }
                                                }
                    
                                                .animate-gradient {
                                                    background-size: 300% 300%;
                                                    animation: gradientAnimation 5s linear infinite;
                                                }
                                            `}</style>
                                </a>
                            </div>
                            <div className="mt-3 lg:flex flex-col gap-y-2 items-center hidden justify-center">
                                <p className="capitalize">Scan QR to download the app</p>
                                <Image
                                    className="lg:w-28 w-28"
                                    src={ldcqr}
                                    alt="Long Drive Cars"
                                    width={500}
                                    height={500}
                                />
                            </div>
                        </div>

                        <button
                            onClick={() => setIsVisible(false)}
                            className="absolute top-0 right-0 p-2 text-red-700 bg-transparent  focus:outline-none  flex items-center justify-center z-40  pt-4 pr-4"
                        >
                            <span className="text-white text-lg bg-[#ff605c] hover:text-black w-6 h-6 rounded-full relative bottom-1 flex justify-center items-center">x</span>
                        </button>

                    </div>
                </>
            )}
        </div>
    );
};

export default PopUp;