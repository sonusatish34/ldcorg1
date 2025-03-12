
"use client"
import Image from "next/image";
import Link from "next/link";
import { fireDb } from '../../../public/firebase';
import { getDocs, collection } from 'firebase/firestore';
import { useEffect, useState } from "react";
import Layout from "@/pages/components/Layout/Layout";
import HamburgerMenu from "@/pages/components/Hamburger/HamburgerMenu";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { MdOutlineExplore } from "react-icons/md";
import StaticData from "@/pages/images/StaticData";
import Head from "next/head";

const Posts = ({ clickedcat },{canonicalUrl}) => {
    const [postDisplay, setpostDisplay]=useState([]);
    const [postlist, setPostlist] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Fetch posts from Firestore
    useEffect(() => {
        const fetchPosts = async () => {
            const querySnapshot = await getDocs(collection(fireDb, "blogPost"));
            const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

            // Set the posts to the state
            setPostlist(posts);

            // Extract unique categories
            // const uniqueCategories = Array.from(new Set(posts.map(post => post.categoryname)));
            // setCategories(uniqueCategories);
        };

        fetchPosts();
    }, []);
   

    useEffect(() => {
        const fetchCat = async () => {
            const querySnapshot = await getDocs(collection(fireDb, "categories"));
            const cs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setCategories(cs);
            // Set the posts to the state
            // setPostlist(posts);

            // Extract unique categories
            // const uniqueCategories = Array.from(new Set(posts.map(post => post.categoryname)));
            // setCategories(uniqueCategories);
        };

        fetchCat();
    }, []);

    
    // Filter posts based on selected category
    const filteredPosts = selectedCategory
        ? postlist.filter(post => post.categoryname === selectedCategory)
        : postlist;

    return (
        <div className="mb-20 ">
         <Head>
            <title> {postDisplay?.title}</title>
            <meta name="description" content={postDisplay?.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:title" content= {postDisplay?.description} />
            <meta property="og:description" content={postDisplay?.description} />

            <link rel="canonical" href={canonicalUrl} />
          </Head>
            {/* Navigation Bar for Categories */}
            <div className="flex space-x-4 px-40 py-4  ">
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={'text-black text-base px-2 py-2 bg-gray-300 rounded-3xl flex items-center gap-2'}
                >
                    {/* <span><MdOutlineExplore size={20} /></span><span></span> */}
                    <Link href={'/blog/explore-topics'} className="lg:text-xs"> Explore Topics</Link>
                </button>
                <button
                    onClick={() => setSelectedCategory(null)}
                    className={`text-black text-sm px-2 bg-gray-300 rounded-3xl ${!selectedCategory ? ' border-2 border-black rounded-3xl' : 'text-black'}`}
                >
                    All Posts
                </button>
                {categories.map((category, i) => (
                    <Link
                        key={`category-${i}`}
                        // onClick={() => setSelectedCategory(category)}
                        href={`/blog/${category?.name.toLowerCase()}`}
                        className={`text-black text-base py-1 px-4 bg-gray-300 rounded-3xl ${category === clickedcat} ? ' border-2 border-black rounded-3xl' : 'text-black'}`}
                    >
                        {category?.name.toLowerCase()}
                    </Link>
                ))}
            </div>
            <div className="py-6">
                <p className="text-5xl capitalize font-semibold">{selectedCategory}</p>
                <p className="py-2 gap-4 text-sm"><span className="pr-6">Topic</span><span>{filteredPosts?.length} Stories</span></p>
            </div>
            {/* Display Filtered Posts */}
            
        </div>
    );
};

export default Posts;
