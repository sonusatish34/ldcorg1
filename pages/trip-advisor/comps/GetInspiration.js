import React from 'react';
import { fireDb } from '@/public/firebase';
import { useState, useEffect } from 'react';
import { getDocs, collection, query, where } from 'firebase/firestore';
import Link from 'next/link';
const GetInspiration = (props) => {
    const [sortedPostsList, setSortedPostlist] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const postsQuery = query(collection(fireDb, "blogPost"),
                    where("blog_state", "==", "active"),
                    where("blogfor", "==", "LDC")
                );
                const postsQuerySnapshot = await getDocs(postsQuery);
                const posts = postsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                const sortedPosts = posts.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
                const q = query(collection(fireDb, "blogPost"), where("subcat", "array-contains", 'city sightseeing'));
                const querySnapshot = await getDocs(q);
                const postgot = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
                setSortedPostlist(postgot);
                if ((Array.isArray())) {
                    console.log('hurray');

                }



            } catch (err) {
                // setError('Failed to load data');
                console.error(err); // You can also log errors to an external service like Sentry
            } finally {
                // setIsLoading(false); // Hide loader after data is fetched or error occurs
            }


        };

        fetchPosts();
    }, []);

    return (
        <div className='py-4 px-4 lg:py-10'>
            <p className='text-center font-semibold text-2xl lg:text-4xl'>Get Inspiration for your next trip</p>
            <p className='text-center text-lg text-gray-500 pt-2'>Travel Articles</p>
            <div className='flex flex-col lg:flex-row gap-4 pt-10'>
                <div className='flex flex-col gap-y-6 lg:flex-row gap-6'>
                    {sortedPostsList.slice(0, 3)?.map((item,index) => (
                        <Link key={index} target='_blank' href={`https://www.longdrivecars.com/blog/posts/${item?.slug}`} className='flex flex-col gap-2'>
                            <img src={item?.coverimages} alt="Travel Article" className=" h-60 w-full object-cover object-bottom rounded-lg" />
                            <p className='text-lg font-semibold'>{item?.title}</p>
                            <p>{item?.date.slice(0,12)}</p>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default GetInspiration;