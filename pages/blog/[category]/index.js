import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fireDb } from '../../../public/firebase';
import { getDocs, collection, query, where } from 'firebase/firestore';
import PostsListing from '../blogcomponents/PostsListing';
import BlogLayout from '../blogcomponents/BlogLayout';
import { MdOutlineExplore } from "react-icons/md";
import { GoDotFill } from "react-icons/go";
import Link from 'next/link';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Loading from '@/pages/components/Loading';
import { MdExpandMore } from "react-icons/md";
import { MdExplore } from "react-icons/md";
import Head from 'next/head';
import RandomPosts from '../blogcomponents/RandomPosts';

const CategoryPage = ({ canonicalUrl }) => {
    const [categories, setCategories] = useState([]);
    const [postlist, setPostlist] = useState([]);
    const [randomPostlist, setRandomPostlist] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredPosts, setFilteredPosts] = useState([]);
    const [cList, setCList] = useState();
    const [loading, setLoading] = useState(true); // State to manage loading
    const [error, setError] = useState(null); // State to manage errors
    const router = useRouter();
    const { category } = router.query;

    const settings = {
        className: "center",
        infinite: true,
        speed: 500,
        arrows: true,
        responsive: [
            {
                breakpoint: 2000,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4,
                },
            },
            {
                breakpoint: 1120,
                settings: {
                    slidesToShow: 2,
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
                    slidesToShow: 3,
                    slidesToScroll: 3,
                },
            },
            {
                breakpoint: 320,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                },
            },
        ],
    };

    // Fetch categories and posts with try-catch and loader management
    useEffect(() => {
        setLoading(true);
        const fetchCatAndPosts = async () => {
            setLoading(true); // Show loader before fetching

            try {
                // Fetch categories
                const catQuerySnapshot = await getDocs(collection(fireDb, "catgforldc"));
                const categoriesData = catQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

                if (category) {
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
                if (category) {
                    const postsQuery = query(collection(fireDb, "blogPost"),
                        where("categoryname", "array-contains", category),
                        where("blog_state", "==", "active"),
                        where("blogfor", "==", "LDC")
                    );
                    const postsQuerySnapshot = await getDocs(postsQuery);
                    const posts = postsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
                    setPostlist(sortedPosts);

                    // -----------------
                    const postsQuery2 = query(collection(fireDb, "blogPost"),
                        where("blog_state", "==", "active"),
                        where("blogfor", "==", "LDC")
                    );
                    const postsQuerySnapshot2 = await getDocs(postsQuery2);
                    const posts2 = postsQuerySnapshot2.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                    setRandomPostlist(posts2);

                }
            } catch (err) {
                setError('Failed to load data');
                console.error(err); // You can also log errors to an external service like Sentry
            } finally {
                setLoading(false); // Hide loader after data is fetched or error occurs
            }
        };

        fetchCatAndPosts();
    }, [category]);

    useEffect(() => {
        if (searchQuery) {
            const filtered = postlist.filter(post =>
                post.title.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredPosts(filtered);
        } else {
            setFilteredPosts(postlist);
        }
    }, [searchQuery, postlist]);

    if (loading) {
        return <Loading />; // Show loading component while data is being fetched
    }

    if (error) {
        return <div>Error: {error}</div>; // Show error message if data fetch fails
    }

    return (
        <div>
            <Head>
                <title> No Deposit | Unlimited Kms - Cheapest Self Drive Cars Near U</title>
                <meta name="description" content="Self-drive cars start at 62/hr, We offer Long Drive Cars for the best prices with unlimited km , Book clDzire @ ₹83/hr, Baleno @ ₹91/hr, Ertiga @ ₹124/hr, Swift @ ₹83/hr, Thar @ ₹208/hr." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <meta property="og:title" content="  No Deposit & Unlimited km - Self-Drive Car Rentalss" />
                <meta property="og:description" content="1 day Free Car @ New User - Self Drive Cars @ 1488/Day - Check Real Photos & Book - Home Delivery" />
                <link rel="canonical" href={canonicalUrl} />
            </Head>
            <div >
                <BlogLayout onSearch={setSearchQuery} catg={category}>
                    <div className='xl:px-32 lg:px-12 flex items-center helvetica-font'>
                        <div className='lg:py-10 py-5 justify-center sm:justify-items-center px-[6px]'>
                            <p className="capitalize text-4xl text-center font-semibold lg:pt-3 pb-3 buch-font">{category}</p>
                            <ul className='flex justify-center items-center pt-2 gap-3'>
                                <li>Topic</li>
                                <li><GoDotFill /></li>
                                <li>{postlist?.length} stories</li>
                            </ul>
                            <div className='text-center flex justify-center lg:pt-10 pt-4'>
                                <PostsListing catg={category} data={filteredPosts} />
                            </div>
                            <RandomPosts data={randomPostlist} />
                        </div>
                    </div>
                    <div className=" py-2 pb-9 lg:py-5 flex flex-row xl:pl-36 lg:pl-20 pl-3 helvetica-font">
                        <Link href={`/blog/${category ? category + '/' : ''}recommended`} className="flex space-x-2">
                            <span className="border-2 text-white rounded-full p-2 bg-[#1859c9] text-sm flex items-center space-x-2">
                                <span>See more</span>
                                <MdExpandMore className="text-lg" />
                            </span>
                        </Link>
                    </div>
                </BlogLayout>
            </div>

        </div>
    );
};

export default CategoryPage;
export async function getServerSideProps(context) {
    const { req, params } = context; // Extract `params` if using dynamic routes

    const host = req.headers.host || 'localhost';
    const category = params?.category || 'default-category'; // Example fallback for category
     const catQuerySnapshot = await getDocs(collection(fireDb, "catgforldc"));
    const categoriesData = catQuerySnapshot.docs.map(doc => doc.data().name.toLowerCase());

    if (!categoriesData.includes(category.toLowerCase())) {
        return {
            notFound: true, // This will render the 404 page
        };
    }
    // Ensure that the category is lowercase, as it's used in the URL
    const canonicalUrl = host.includes('.in')
        ? `https://www.longdrivecars.in/blog/${category}`
        : `https://www.longdrivecars.com/blog/${category}`;

    return {
        props: {
            canonicalUrl,
        },
    };
}

