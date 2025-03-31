import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fireDb } from "../../../public/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import { MdExplore } from "react-icons/md";
import Footer from "../../components/Footer/Footer";
import Head from "next/head";

const BlogLayout = ({
    canonicalUrl,
    recommended,
    children,
    catg,
    onSearch = () => { },
}) => {
    const [cList, setCList] = useState();
    useEffect(() => {
        const fetchCatAndPosts = async () => {
            try {
                // Fetch categories
                const catQuerySnapshot = await getDocs(
                    collection(fireDb, "catgforldc")
                );
                const categoriesData = catQuerySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                if (0) {
                    const sortedCategories = categoriesData.sort((a, b) => {
                        if (a.name.toLowerCase() === category.toLowerCase()) return -1;
                        if (b.name.toLowerCase() === category.toLowerCase()) return 1;
                        return 0;
                    });

                    setCList(sortedCategories);
                } else {
                    setCList(categoriesData);
                }

                // Fetch posts for the selected category
            } catch (err) {
                // setError('Failed to load data');
                console.error(err); // You can also log errors to an external service like Sentry
            } finally {
                // setLoading(false); // Hide loader after data is fetched or error occurs
            }
        };

        fetchCatAndPosts();
    }, []);

    const [search, setSearch] = useState("");

    const handleSearch = (e) => {
        setSearch(e?.target?.value);
        onSearch(e?.target?.value); // Pass the search query to CategoryPage
    };
    const settings = {
        className: "center",
        infinite: true,
        speed: 500,
        arrows: true,
        responsive: [
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 1120,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 770,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 425,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
            {
                breakpoint: 370,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                },
            },
        ],
    };

    return (
        <div>
            <div className="xl:px-14  py-1 lg:border-8 lg:border-blue-100">
                <div className="flex flex-col lg:flex-row lg:items-center xl:gap-14 lg:gap-6 gap-2">
                    <div className="flex gap-x-1 mxs:gap-x-4 px-4 mxs:px-6 lg:items-center border-8 border-blue-100 lg:border-none">
                        <Link href={`/`} className="py-4">

                            <p className='font-bold text-[#0456e8] text-base xl:text-4xl lg:text-3xl lg:w-full w-36 popins-text'>Long Drive Cars</p>
                        </Link>
                        <div className="flex items-center">
                            <p className="relative left-8">
                                <CiSearch className="size-5" />
                            </p>
                            <input
                                value={search}
                                type="text"
                                placeholder="Search"
                                onChange={handleSearch}
                                maxLength={10}
                                className="lg:rounded-full xl:w-56 w-28 border-none bg-gray-100   rounded-full lg:py-2 pl-10"
                            />
                        </div>
                    </div>
                    <div className="flex xl:gap-20 gap-10 items-center px-2 pt-1 border-t-[1p] ">
                        <Link
                            href={`/blog/explore-topics`}
                            className={`text-base py-1 lg:bg-[#1859c9] lg:rounded-3xl `}
                        >
                            <div className=" lg:flex  items-center space-x-2 ">
                                <span className="w-fit rounded-full lg:pl-1">
                                    <MdExplore className="size-6 text-black lg:text-white" />
                                </span>
                                <span className=" hidden lg:block text-sm text-white lg:pr-2 ">
                                    Explore Topics
                                </span>
                            </div>
                        </Link>
                        <div className="xl:w-[400px] lg:w-[305px] w-48 mxs:w-60 text-center">
                            <Slider
                                key={JSON.stringify(cList)}
                                {...settings}
                                className="blog-carousal"
                            >
                                {cList?.length > 0 &&
                                    cList.map((cat, i) => (
                                        <Link
                                            key={`category-${i}`}
                                            href={`/blog/${cat.name.toLowerCase()}${recommended ? "/recommended" : ""
                                                }`}
                                            className={`p-[5px] capitalize font-medium bg-[#1859c9]  text-[14px] lg:text-sm  rounded-3xl lg:rounded-3xl ${cat.name.toLowerCase() === catg?.toLowerCase()
                                                ? "border-2 border-yellow-500 text-yellow-500"
                                                : "text-white"
                                                }`}
                                        >
                                            {cat.name.toLowerCase()}
                                        </Link>
                                    ))}
                            </Slider>
                        </div>
                    </div>
                </div>
            </div>
            <main>{children}</main>
            <div>
                <Footer forblog={true} />
            </div>
        </div>
    );
};

export default BlogLayout;
