import { BsFuelPump } from 'react-icons/bs';
import { FaExchangeAlt } from "react-icons/fa";
import { useMemo } from "react";
import img2 from '../../changeimg/baleno.webp'
import img3 from '../../changeimg/polo.webp'
import img4 from '../../changeimg/swift.webp'
import img5 from '../../changeimg/i20.webp'
import Loading from "../Loading";

import { BiPhoneCall } from "react-icons/bi";
import { FaWhatsapp } from "react-icons/fa";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaSearch } from "react-icons/fa";
import { BsFillFuelPumpFill } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { TbManualGearbox } from "react-icons/tb";
import Slider from "react-slick";
import disc from "../../images/discoutn.webp";
import disc1 from "../../images/cashback.webp";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { FaGooglePlay } from "react-icons/fa";
import { FaAppStoreIos } from "react-icons/fa";
import { RxSlash } from "react-icons/rx";
import { RiArrowDownWideLine } from "react-icons/ri";
import ldcqr from '../../images/ldcqr.png'
import dnf from '../../images/datanotfound.webp'
import { FaAppStore } from "react-icons/fa";

import { BiLogoPlayStore } from "react-icons/bi";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { RiArrowRightDoubleLine } from "react-icons/ri";
import { useRouter } from "next/router";

export default function ExploreCars({ loc, phoneno,wspno, branch }) {

    const handleStoreRedirect = () => {
        const userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            // Redirect to App Store if iOS
            window.open('https://apps.apple.com/in/app/long-drive-cars/id6466695391', '_blank');
        } else if (/android/i.test(userAgent)) {
            // Redirect to Play Store if Android
            window.open('https://play.google.com/store/search?q=long+drive+cars&c=apps', '_blank');

        } else {
            // Optional: Provide a message for non-mobile devices
            alert("App is available only on mobile devices.");
        }
    }
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    const [loader, setLoader] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300); // Debounce delay (300ms)

        return () => clearTimeout(timer); // Clean up the timer on unmount or query change
    }, [searchQuery]);
    const [locationG, setLocationG] = useState('')
    const [carData, setCarData] = useState('')

    useEffect(() => {
        setLocationG(loc)
        async function fetchCarDetails() {
            setLoader(true);
            try {
                const response = await fetch(`https://api.longdrivecarz.in/site/cars-info?location=${loc ? loc : 'hyderabad'}`);
                const items = await response.json();
                const cars = items?.data?.results;
                setCarData(cars);
            } catch (error) {
                console.error('Error fetching car details:', error);
            }
            finally {
                setLoader(false);

            }
        }

        fetchCarDetails();

    }, [loc]);

    const [selectedBrand, setSelectedBrand] = useState('');
    const [selectedSeater, setSelectedSeater] = useState('');
    const [selectedFuelType, setSelectedFuelType] = useState('');
    const [selectedTransType, setSelectedTransType] = useState('');
    const [priceRanges, setPriceRanges] = useState({
        '1000-2000': false,
        '2000-3000': false,
    });

    const replaceText = (str) => {
        if (str?.includes("cdn"))
            return str;
        else {
            return str?.replace('https://ldcars.blr1.', 'https://ldcars.blr1.cdn.');
        }
    };

    const handlePriceRangeChange = (e) => {
        const { value, checked } = e.target;
        setPriceRanges(prev => ({ ...prev, [value]: checked }));
    };

    const uniqueBrands = ["maruthi", "kia", "hyundai", "tata", "mahindra", "honda", "mg"]
    const uniqueFuelTypes = ["petrol", "diesel"]
    const uniqueSeaters = ["5", "7"];
    const uniqueTrasmission = ["manual", "automatic"];

    const filteredData = useMemo(() => {
        if (!Array.isArray(carData)) return [];

        return carData.filter(item => {
            if (!item) return false;

            const matchesBrand = selectedBrand ? item.maker_model.toLowerCase().includes(selectedBrand.toLowerCase()) : true;
            const matchesSeater = selectedSeater ? item.seater === selectedSeater : true;
            const matchesFuelType = selectedFuelType ? item.fuel_type.toLowerCase() === selectedFuelType.toLowerCase() : true;
            const matchesTransType = selectedTransType ? item.transmission_type.toLowerCase() === selectedTransType.toLowerCase() : true;
            const matchesSearch = item.maker_model.toLowerCase().includes(debouncedQuery.toLowerCase());

            return matchesBrand && matchesSeater && matchesFuelType && matchesSearch && matchesTransType;
        });
    }, [carData, debouncedQuery, selectedBrand, selectedSeater, selectedFuelType, selectedTransType]);

    const sortedData = filteredData?.sort((a, b) => a.price_24_hours - b.price_24_hours);

    const clearFilters = () => {
        setSelectedBrand('');
        setSelectedSeater('');
        setSelectedFuelType('');
        setSelectedTransType('');
        setSearchQuery('');
    };
    const [currentIndex, setCurrentIndex] = useState(0);
    const images = [
        img2, img3, img4, img5
    ];
    const imgalt = [
        "self drive car rental Innova", "cars for rent polo", "car rentals near me swift", "rent a car for self drive i20"
    ]

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 4000);

        return () => clearInterval(interval);
    }, []);
    const [filter, setFilter] = useState(false);
    function handleFilter() {
        if (filter) {
            setFilter(false);
        }
        else {
            setFilter(true);
        }
    }
    const blockd = "block";
    const hiddend = "hidden";
    const [loading, setLoading] = useState(false); // Tracks button click state
    const router = useRouter(); // Use Next.js router for navigation

    const handleButtonClick = async () => {
        setLoading(true); // Show the loader
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay for loader
        router.push(`${loc?.length ? loc : ""}/explore-self-drive-cars`); // Navigate to the next page
    };



    const [visibleItems, setVisibleItems] = useState(7);

    const handleLoadMore = () => {
        setVisibleItems((prev) => prev + 9);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 300); // Debounce delay (300ms)

        return () => clearTimeout(timer); // Clean up the timer on unmount or query change
    }, [searchQuery]);


    const carModels = ['MAHINDRA XUV 700', 'INNOVA CRYSTA AUTOMATIC', 'MAHINDRA XUV 500', 'MG HECTOR PLUS SUNROOF', 'HYUNDAI VERNA', 'KIA CARENS SUNROOF AUTOMATIC', 'MAHINDRA XUV 700 AX7 AUTOMATIC', 'MAHINDRA THAR ROXX', 'MAHINDRA XUV 700 AX5', 'HYUNDAI CRETA SUNROOF', 'NEXON SUNROOF AUTOMATIC', 'VENUE SUNROOF IMT', 'HYUNDAI I20 SUNROOF', 'MAHINDRA XUV 300 SUNROOF AUTOMATIC', 'MG HECTOR AUTOMATIC', 'KIA SONET SUNROOF IMT'];

    const filteredItems = carModels.flatMap((model) =>
        filteredData?.filter((item) => item?.maker_model === model)
    );
    const [showDown, setShowDown] = useState(false)
    return (
        <div>
            {loader ? <Loading /> : <div className="produvt-page flex flex-col lg:flex-row gap-10 bg-slate-100">
                <div className='lg:pt-12 pt-40 bg-white'>
                    <div className="text-black-400 lg:px-20  text-black pl-10 pt-4">
                        <div>
                            <div className="image-container block lg:h-[140px] w-[180px] aspect-w-1 aspect-h-1  xs:h-[112px]">
                                <Image
                                    // priority
                                    src={images[currentIndex]}
                                    alt="Long Drive Cars app"
                                    title={imgalt[currentIndex]}
                                    height={600}
                                    width={600}
                                    layout='responsive'
                                    loading="lazy" />
                            </div>
                        </div>
                        <div className='lg:flex lg:flex-col capitalize gap-6 mb-6 lg:pt-2 pt-2 w-64 hidden'>
                            <div className="flex gap-6">
                                <p onClick={handleFilter} className="text-black text-2xl font-bold">Filters</p>
                                <button className="text-xs opacity-85" onClick={clearFilters}>Clear all </button>
                            </div>
                            <div>
                                <label className='font-semibold text-lg w-full'>Brand</label>
                                <div className='flex flex-wrap lg:flex-col w-64 overflow-hidden capitalize gap-1'>
                                    {uniqueBrands.map(brand => (
                                        <label key={brand} className='flex items-center flex-wrap lg:w-full'>
                                            <input
                                                type='checkbox'
                                                name='brand'
                                                value={brand}
                                                checked={selectedBrand === brand}
                                                onChange={() => setSelectedBrand(brand)}
                                                className='mr-2'
                                            />
                                            {brand}
                                        </label>
                                    ))}
                                </div>

                                <div className='flex lg:flex-col flex-wrap gap-2'>
                                    <label className='font-semibold text-lg w-full'>Seater</label>
                                    {uniqueSeaters.map(seater => (
                                        <label key={seater} className='flex items-center'>
                                            <input
                                                type='checkbox'
                                                name='seater'
                                                value={seater}
                                                checked={selectedSeater === seater}
                                                onChange={() => setSelectedSeater(seater)}
                                                className='mr-2'
                                            />
                                            {seater}
                                        </label>
                                    ))}
                                </div>
                                <div className='flex lg:flex-col flex-wrap gap-2'>
                                    <label className='font-semibold text-lg w-full'>Fuel Type</label>
                                    {uniqueFuelTypes.map(fuelType => (
                                        <label key={fuelType} className='flex items-center'>
                                            <input
                                                type='checkbox'
                                                name='fuelType'
                                                value={fuelType}
                                                checked={selectedFuelType === fuelType}
                                                onChange={() => setSelectedFuelType(fuelType)}
                                                className='mr-2'
                                            />
                                            {fuelType}
                                        </label>
                                    ))}
                                </div>
                                <div className='flex lg:flex-col flex-wrap gap-2'>
                                    <label className='font-semibold text-lg w-full'>Transmission Type</label>
                                    {uniqueTrasmission.map(TransType => (
                                        <label key={TransType} className='flex items-center'>
                                            <input
                                                type='checkbox'
                                                name='TransType'
                                                value={TransType}
                                                checked={selectedTransType === TransType}
                                                onChange={() => setSelectedTransType(TransType)}
                                                className='mr-2'
                                            />
                                            {TransType}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className={`flex flex-col capitalize gap-6 mb-6 lg:pt-2 pt-2 w-64 lg:hidden`}>
                            <div className="flex gap-6">
                                <p onClick={handleFilter} className="text-black text-lg font-bold flex gap-2 items-center border-2 border-orange-400 p-2 rounded-md"><span><FaExchangeAlt /></span><span>Filters</span> </p>
                                <button className={`${filter ? blockd : hiddend} text-xs opacity-85`} onClick={clearFilters}>Clear all </button>
                            </div>
                            <div className={`${filter ? blockd : hiddend} text-sm flex flex-col gap-2`}>
                                <div className='flex flex-wrap lg:flex-col gap-2 w-64 overflow-hidden capitalize'>
                                    <label className='font-semibold  w-full'>Brand</label>
                                    {uniqueBrands.map(brand => (
                                        <label key={brand} className='flex items-center border-[1px] border-gray-400 text-gray-600 rounded-md p-1'>
                                            <input
                                                type='checkbox'
                                                name='brand'
                                                value={brand}
                                                checked={selectedBrand === brand}
                                                onChange={() => setSelectedBrand(brand)}
                                                className='mr-2'
                                            />
                                            {brand}
                                        </label>
                                    ))}
                                </div>
                                <div className='flex lg:flex-col flex-wrap gap-2'>
                                    <label className='font-semibold  w-full'>Seater</label>
                                    {uniqueSeaters.map(seater => (
                                        <label key={seater} className='flex items-center border-[1px] border-gray-400 text-gray-600 rounded-md p-1'>
                                            <input
                                                type='checkbox'
                                                name='seater'
                                                value={seater}
                                                checked={selectedSeater === seater}
                                                onChange={() => setSelectedSeater(seater)}
                                                className='mr-2'
                                            />
                                            {seater}
                                        </label>
                                    ))}
                                </div>
                                <div className='flex lg:flex-col flex-wrap gap-2'>
                                    <label className='font-semibold  w-full'>Fuel Type</label>
                                    {uniqueFuelTypes.map(fuelType => (
                                        <label key={fuelType} className='flex items-center border-[1px] border-gray-400 text-gray-600 rounded-md p-1'>
                                            <input
                                                type='checkbox'
                                                name='fuelType'
                                                value={fuelType}
                                                checked={selectedFuelType === fuelType}
                                                onChange={() => setSelectedFuelType(fuelType)}
                                                className='mr-2'
                                            />
                                            {fuelType}
                                        </label>
                                    ))}
                                </div>
                                <div className='flex lg:flex-col flex-wrap gap-2'>
                                    <label className='font-semibold w-full'>Transmission Type</label>
                                    {uniqueTrasmission.map(TransType => (
                                        <label key={TransType} className='flex items-center border-[1px] border-gray-400 text-gray-600 rounded-md p-1'>
                                            <input
                                                type='checkbox'
                                                name='TransType'
                                                value={TransType}
                                                checked={selectedTransType === TransType}
                                                onChange={() => setSelectedTransType(TransType)}
                                                className='mr-2'
                                            />
                                            {TransType}
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='w-full'>
                    <p id='explore' className="px-3 font-bold text-2xl lg:text-3xl lg:pt-8 text-blue-950 mb-2 xl:text-5xl lg:mb-9 text-center">Explore Self Drive
                        Car Rentals</p>
                    <div className=' lg:mb-16 pl-3 flex items-center justify-center pt-2 pb-12'>
                        <input
                            placeholder='Find Your Favourite Car'
                            className=' text-black px-4 py-3 rounded-full bg-gray-200 w-full  md:max-w-96 lg:max-w-2xl'
                            type='search'
                            value={searchQuery}
                            onChange={e => setSearchQuery(e.target.value)}
                        />
                        <FaSearch size={25} className='text-blue-500 relative right-14 lg:right-20 md:right-14' />
                    </div>
                    <div className="lg:grid xl:grid-cols-3 lg:grid-cols-2 gap-x-8 gap-y-8 flex flex-col gap-2 items-center justify-center lg:max-w-7xl py-4">
                        {filteredData?.map((item, index) => (
                            <React.Fragment key={index}>
                                {
                                    <div className=" lg:rounded-md flex flex-col  w-[100%] md:w-72 first-line:h-[555px] ">
                                        <div className="relative lg:rounded-md h-[445px]">

                                            <Slider
                                                dots={false}
                                                infinite={true}
                                                speed={500}
                                                slidesToShow={1}
                                                slidesToScroll={1}
                                                centerMode={true}
                                                centerPadding={0}
                                                focusOnSelect={true}
                                                arrows={false}
                                                pauseOnFocus={true}
                                                pauseOnHover={true}
                                                className="relative lg:rounded-md"
                                            >
                                                <div>
                                                    {
                                                        <Link
                                                            href={`${(
                                                                (loc?.length ? `/${loc}` : "") +
                                                                "/car-rental/" +
                                                                item?.maker_model
                                                            )
                                                                .toLowerCase()
                                                                .replace(/ /g, "-")}`}
                                                        >
                                                            <Image
                                                                fetchPriority={index < 3 ? 'high' : 'low'} // Use fetchPriority here, not priority
                                                                className={" rounded-md h-[440px] object-cover"}
                                                                width={1000}
                                                                height={1000}
                                                                alt="Long Drive Cars app"
                                                                src={replaceText(item?.car_image_front_view)}
                                                                srcSet={`${replaceText(item?.car_image_front_view)} 1000w, ${replaceText(item?.car_image_front_view)} 500w`}
                                                                sizes="(max-width: 768px) 500px, 1000px"
                                                            ></Image>
                                                        </Link>
                                                    }
                                                </div>
                                                <div onClick={() => { }}>
                                                    <Link
                                                        href={`${("car-rental/" + item?.maker_model)
                                                            .toLowerCase()
                                                            .replace(/ /g, "-")}`}
                                                    >
                                                        <Image
                                                            alt="Long Drive Cars app"
                                                            className=" rounded-md h-[440px] object-cover"
                                                            width={1000}
                                                            height={1000}
                                                            src={replaceText(item?.car_image_back_inner)}
                                                        ></Image>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link
                                                        href={`${("car-rental/" + item?.maker_model)
                                                            .toLowerCase()
                                                            .replace(/ /g, "-")}`}
                                                    >
                                                        <Image
                                                            alt="Long Drive Cars app"
                                                            className=" rounded-md h-[440px] object-cover"
                                                            width={1000}
                                                            height={1000}
                                                            src={replaceText(item?.car_image_reading_view)}
                                                        ></Image>
                                                    </Link>
                                                </div>
                                                <div>
                                                    <Link
                                                        href={`${("car-rental/" + item?.maker_model)
                                                            .toLowerCase()
                                                            .replace(/ /g, "-")}`}
                                                    >
                                                        <Image
                                                            alt="Long Drive Cars app"
                                                            className=" rounded-md h-[440px] object-cover"
                                                            width={1000}
                                                            height={1000}
                                                            src={replaceText(item?.car_image_back_view)}
                                                        ></Image>
                                                    </Link>
                                                </div>
                                            </Slider>
                                            <div className="relative h-20 z-20 bg-gradient-to-b from-black opacity-90 lg:rounded-md bottom-[28rem] lg:bottom-[28rem]">
                                                <div className="flex flex-col gap-2 items-end pt-4 pr-1">
                                                    <p className="relative bottom-3 capitalize p-1  text-white rounded-md  z-50 font-manrope lg:text-base text-xs mxs:text-base  pt-2 ">
                                                        {item?.maker_model.toLowerCase()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="relative z-20 bottom-[12.6rem] lg:bottom-[12.4rem] lg:rounde bg-gradient-to-t from-black opacity-90 text-white">
                                                <div className="flex gap-x-8 items-center text-white justify-center pt-5 pb-2 w-full">
                                                    <p className="text-sm text-white shadow-black">Book Now</p>
                                                    <p className="capitalize p-1 font-bold   rounded-md  z-50 font-manrope text-base  lg:text-sm pt-2">
                                                        ₹ {item?.price_24_hours * 24}/day
                                                    </p>
                                                </div>
                                                <ul className="flex gap-4 justify-center text-xs lg:text-xs pt-2 pb-6">
                                                    <li className="border-r-2 border-white flex items-center gap-1 pr-2">
                                                        <span>
                                                            <BsFillFuelPumpFill />
                                                        </span>
                                                        <span>{item?.fuel_type}</span>
                                                    </li>
                                                    <li className="border-r-2 border-white flex items-center gap-1 pr-2">
                                                        <span>
                                                            <GrGroup />
                                                        </span>
                                                        <span>{item?.seater} Seater</span>
                                                    </li>
                                                    <li className=" flex items-center gap-1">
                                                        <span>
                                                            <TbManualGearbox size={20} />
                                                        </span>
                                                        <span>{item?.transmission_type}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                        <div className="flex flex-col justify-between  text-white py-4">
                                            <ul className="flex justify-center gap-x-8 w-ful px-3">
                                                <li className="bg-green-500 w-32 py-2  text-center rounded-md ">
                                                    {" "}
                                                    <Link
                                                        href={`https://api.whatsapp.com/send?phone=+91${wspno}&text=Hi%0AI%20am%20looking%20for%20a%20car%20booking.`}
                                                        target="_blank"
                                                    >
                                                        <p className=" flex gap-1 lg:text-sm text-sm justify-center items-center">
                                                            <span>
                                                                <FaWhatsapp size={20} />
                                                            </span>{" "}
                                                            <span>Whatsapp</span>
                                                        </p>
                                                    </Link>
                                                </li>
                                                <li className="bg-blue-500 w-32 py-2 rounded-md ">
                                                    <Link href={`tel:${phoneno}`} target="_blank">
                                                        <p className=" flex gap-1 lg:text-sm text-sm justify-center items-center">
                                                            <span>
                                                                <BiPhoneCall size={20} />
                                                            </span>{" "}
                                                            <span>Call Us</span>
                                                        </p>
                                                    </Link>
                                                </li>
                                            </ul>
                                            <div onClick={handleStoreRedirect} className=" lg:hidden flex justify-center items-center cursor-pointer text-black py-4 text-lg font-semibold">
                                                <p className="bg-gradient-to-r from-green-600 via-[#556ee6] to-indigo-400 inline-block text-transparent bg-clip-text animate-gradient border-[1px] border-[#5566ee] p-2 rounded-md">
                                                    Download LDC App
                                                </p>

                                            </div>

                                            <div onClick={() => { setShowDown(true) }} className="lg:flex hidden  justify-center items-center cursor-pointer text-black py-4 text-lg font-semibold">
                                                <p className="bg-gradient-to-r from-green-600 via-[#556ee6] to-indigo-400 text-transparent bg-clip-text animate-gradient border-[1px] border-[#5566ee] p-2 rounded-md lg:block hidden">
                                                    Download LDC App
                                                </p>
                                            </div>
                                            {showDown && (
                                                <div >
                                                    <div className='text-black fixed inset-0 backdrop-blur-0 bg-white  z-50  h-'>
                                                        <div className='flex justify-center items-center '>
                                                            <div className='bg-white absolute top-20 h-[500px] lg:h-[300px] transition-all duration-300 ease-in-out p-8 rounded-lg shadow-md max-w-lg lg:w-[800px] w-[500px]'>
                                                                <button
                                                                    onClick={() => {
                                                                        setShowDown(false)
                                                                    }}
                                                                    className='relative lg:left-96 rounded-full bg-white lg:bottom-20 text-black py-2 px-4 text-xl border-2 border-gray-300'
                                                                >
                                                                    x
                                                                </button>
                                                                <div className="flex gap-3">
                                                                    <div>
                                                                        <h2 className="text-base font-semibold text-gray-900">
                                                                            Download the Longdrivecarz App and Book Your Favourite Car
                                                                        </h2>
                                                                        <ul className="mt-2 text-gray-600">
                                                                            <li>Scan the QR code to get the app from the Play Store or App Store.</li>
                                                                            <li className="flex gap-x-3 pt-3"><FaAppStore className="text-black" size={30} /> <BiLogoPlayStore className="text-black" size={30} /></li>
                                                                        </ul>

                                                                    </div>

                                                                    <Image
                                                                        src={ldcqr}
                                                                        height={1000}
                                                                        width={1000}
                                                                        alt='long drive cars app'
                                                                        className='w-full h-44 object-contain'
                                                                    />
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                }
                                {(index + 1 === 2 || index + 1 === 6 || index + 1 === 16 || index + 1 === 26 || index + 1 === 30 || index + 1 === 46 || index + 1 === 56) && (
                                    <div className=" items-center ">
                                        <div className=" lg:rounded-md items-center  lg:w-72 flex flex-col relative">
                                            <Image
                                                src={disc1}
                                                height={1000}
                                                width={1000}
                                                alt="Long Drive Cars app"
                                                className=" mxs:scale-[0.6] lg:scale-90 relative lg:w-80 w-full "
                                            />
                                            <div className="w-full lg:px-2 lg:py-2 capitalize text-sm">
                                                <p className="text-black xl:text-xl lg:text-xl py-2 text-2xl font-bold text-center    ">
                                                    On Bookings
                                                </p>
                                                <div className="w-full px-2 py-1 lg:px-2 lg:py-2 tracking-wide ">
                                                    <div className="place-items-center lg:py-1 ">
                                                        <div className="rounded w-full bg-[#660066] text-white border border-white lg:w-[265px] lg:text-[10px] text-xs ">
                                                            <div className="flex justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                                                                <span className=" border-white pl-6 w-36 ">
                                                                    50 Cashback
                                                                </span>
                                                                <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>
                                                                <span className=" border-white px-3 w-36  lg:px-4">
                                                                    1 day & above
                                                                </span>
                                                            </div>
                                                            <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                                                                <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                                                                    <span className="">400 Discount</span>
                                                                    <span className="pl-11">+</span>
                                                                    <span>100 Cashback</span>
                                                                </p>
                                                                <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                                                                <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                                                                    4 days & above
                                                                </span>
                                                            </div>
                                                            <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                                                                <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                                                                    <span className="">2000 Discount</span>
                                                                    <span className="pl-11">+</span>
                                                                    <span>100 Cashback</span>
                                                                </p>
                                                                <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                                                                <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                                                                    7 days & above
                                                                </span>
                                                            </div>
                                                            <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                                                                <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                                                                    <span className="">4000 Discount</span>
                                                                    <span className="pl-11">+</span>
                                                                    <span>200 Cashback</span>
                                                                </p>
                                                                <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                                                                <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                                                                    10 days & above
                                                                </span>
                                                            </div>
                                                            <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                                                                <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                                                                    <span className="">15,000 Discount</span>
                                                                    <span className="pl-11">+</span>
                                                                    <span>500 Cashback</span>
                                                                </p>
                                                                <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                                                                <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                                                                    30 days & above
                                                                </span>
                                                            </div>
                                                            <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                                                                <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                                                                    <span className="">20,000 Discount</span>
                                                                    <span className="pl-11">+</span>
                                                                    <span>1000 Cashback</span>
                                                                </p>
                                                                <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                                                                <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                                                                    45 days & above
                                                                </span>
                                                            </div>
                                                            <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                                                                <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                                                                    <span className="">35,000 Discount</span>
                                                                    <span className="pl-11">+</span>
                                                                    <span>1500 Cashback</span>
                                                                </p>
                                                                <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                                                                <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                                                                    60 days & above
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>


                                                    <div className="place-items-center  pt-1 rounded ">
                                                        <div className="w-full bg-[#660066] text-white border border-black rounded-b-lg p-2 lg:px-1 lg:w-[265px]">
                                                            <div className="flex items-center gap-2 mb-2 text-[10px] font-bold">
                                                                <span>
                                                                    <RiArrowRightDoubleLine size={24} />
                                                                </span>
                                                                <span>Cashback Credited into LDC Wallet</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 mb-2 text-[10px] font-bold">
                                                                <span>
                                                                    <RiArrowRightDoubleLine size={24} />
                                                                </span>
                                                                <span>
                                                                    Cashback Can Be Used Monday To Thursday Pickup
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-[10px] font-bold">
                                                                <span>
                                                                    <RiArrowRightDoubleLine size={24} />
                                                                </span>
                                                                <span>Max 500 can be used for every booking</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {(index + 1 == 2) && (
                                    <div className="lg:block hidden pt-14 lg:pt-12  items-center  ">
                                        <div className=" lg:rounded-md items-center  lg:w-72 flex flex-col relative">
                                            <Image
                                                src={disc1}
                                                height={1000}
                                                width={1000}
                                                alt="Long Drive Cars app"
                                                className=" mxs:scale-[0.6] lg:scale-90 relative lg:w-80 w-full "
                                            />
                                            <div className="w-full lg:px-2 lg:py-2 capitalize text-sm">
                                                <p className="text-black xl:text-xl lg:text-xl py-2 text-2xl font-bold text-center    ">
                                                    On Bookings
                                                </p>
                                                <div className="w-full px-2 py-1 lg:px-2 lg:py-2 tracking-wide ">
                                                    <div className="place-items-center lg:py-1 ">
                                                        <div className="rounded w-full bg-[#660066] text-white border border-white lg:w-[265px] lg:text-[10px] text-xs ">
                                                            <div className="flex justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                                                                <span className=" border-white pl-6 w-36 ">
                                                                    50 Cashback
                                                                </span>
                                                                <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>
                                                                <span className=" border-white px-3 w-36  lg:px-4">
                                                                    1 day & above
                                                                </span>
                                                            </div>
                                                            <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                                                                <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                                                                    <span className="">400 Discount</span>
                                                                    <span className="pl-11">+</span>
                                                                    <span>100 Cashback</span>
                                                                </p>
                                                                <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                                                                <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                                                                    4 days & above
                                                                </span>
                                                            </div>
                                                            <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                                                                <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                                                                    <span className="">2000 Discount</span>
                                                                    <span className="pl-11">+</span>
                                                                    <span>100 Cashback</span>
                                                                </p>
                                                                <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                                                                <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                                                                    7 days & above
                                                                </span>
                                                            </div>
                                                            <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                                                                <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                                                                    <span className="">4000 Discount</span>
                                                                    <span className="pl-11">+</span>
                                                                    <span>200 Cashback</span>
                                                                </p>
                                                                <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                                                                <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                                                                    10 days & above
                                                                </span>
                                                            </div>
                                                            <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                                                                <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                                                                    <span className="">15,000 Discount</span>
                                                                    <span className="pl-11">+</span>
                                                                    <span>500 Cashback</span>
                                                                </p>
                                                                <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                                                                <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                                                                    30 days & above
                                                                </span>
                                                            </div>
                                                            <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                                                                <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                                                                    <span className="">20,000 Discount</span>
                                                                    <span className="pl-11">+</span>
                                                                    <span>1000 Cashback</span>
                                                                </p>
                                                                <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                                                                <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                                                                    45 days & above
                                                                </span>
                                                            </div>
                                                            <div className="flex  justify-between border-b border-white p-[px] lg:p2 py-2  font-bold">
                                                                <p className="pl-6 w-36 flex flex-col border-white leading-4 lg:leading-3">
                                                                    <span className="">20,000 Discount</span>
                                                                    <span className="pl-11">+</span>
                                                                    <span>2000 Cashback</span>
                                                                </p>
                                                                <span className=" border-white px-[4px] lg:px-[10px] border-r-2"></span>

                                                                <span className=" border-white px-3 w-36 lg:px-4 pt-2">
                                                                    60 days & above
                                                                </span>
                                                            </div>

                                                        </div>
                                                    </div>


                                                    <div className="place-items-center  pt-1 rounded ">
                                                        <div className="w-full bg-[#660066] text-white border border-black rounded-b-lg p-2 lg:px-1 lg:w-[265px]">
                                                            <div className="flex items-center gap-2 mb-2 text-[10px] font-bold">
                                                                <span>
                                                                    <RiArrowRightDoubleLine size={24} />
                                                                </span>
                                                                <span>Cashback Credited into LDC Wallet</span>
                                                            </div>
                                                            <div className="flex items-center gap-2 mb-2 text-[10px] font-bold">
                                                                <span>
                                                                    <RiArrowRightDoubleLine size={24} />
                                                                </span>
                                                                <span>
                                                                    Cashback Can Be Used Monday To Thursday Pickup
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-2 text-[10px] font-bold">
                                                                <span>
                                                                    <RiArrowRightDoubleLine size={24} />
                                                                </span>
                                                                <span>Max 500 can be used for every booking</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>}
        </div>

    );
}