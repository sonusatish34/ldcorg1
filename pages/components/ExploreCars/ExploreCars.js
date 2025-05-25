import { FaExchangeAlt } from "react-icons/fa";
import { useMemo } from "react";
import img2 from '../../changeimg/baleno.webp'
import img3 from '../../changeimg/polo.webp'
import img4 from '../../changeimg/swift.webp'
import img5 from '../../changeimg/i20.webp'
import Loading from "../Loading";
import CardFragment from '../CardFragment/CardFragment';
import React, { useState } from "react";
import Image from "next/image";
import { FaSearch } from "react-icons/fa";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useEffect } from "react";
import { useRouter } from "next/router";
export default function ExploreCars({ loc, phoneno, wspno, branch }) {


    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

    const [loader, setLoader] = useState(true);


    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedQuery(searchQuery);
        }, 200); // Debounce delay (300ms)

        return () => clearTimeout(timer); // Clean up the timer on unmount or query change
    }, [searchQuery]);
    const [locationG, setLocationG] = useState('')
    const [carData, setCarData] = useState('')

    useEffect(() => {
        setLocationG(loc)
        async function fetchCarDetails() {
            setLoader(true);
            try {
                const response = await fetch(`https://api.longdrivecars.in/site/cars-info?location=${loc ? loc : 'hyderabad'}`);
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
        }, 200); // Debounce delay (300ms)

        return () => clearTimeout(timer); // Clean up the timer on unmount or query change
    }, [searchQuery]);



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
                            <CardFragment index={index} item={item} wspno={wspno} phoneno={phoneno} />

                        ))}
                    </div>
                </div>
            </div>}
        </div>

    );
}