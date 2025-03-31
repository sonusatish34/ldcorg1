
import { fireDb } from '../../public/firebase';
import { getDocs, collection, where, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { GoDotFill } from "react-icons/go";
import Loading from '../components/Loading';
import PostsListing from './blogcomponents/PostsListing';
import BlogLayout from './blogcomponents/BlogLayout';
import RandomPosts from './blogcomponents/RandomPosts';
import Link from 'next/link';
import { MdExpandMore } from "react-icons/md";

const ComponentName = (props) => {

  const router = useRouter();
  const [postlist, setPostlist] = useState([]);
  const [sortedPostlist, setSortedPostlist] = useState([]);
  const [isLoading, setIsLoading] = useState(true); // State for loader

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const postsQuery = query(collection(fireDb, "blogPost"),
          where("blog_state", "==", "active"),
          where("blogfor", "==", "LDC")
        );
        const postsQuerySnapshot = await getDocs(postsQuery);
        const posts = postsQuerySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setPostlist(posts);
        setSortedPostlist(sortedPosts);
      } catch (err) {
        setError('Failed to load data');
        console.error(err); // You can also log errors to an external service like Sentry
      } finally {
        setIsLoading(false); // Hide loader after data is fetched or error occurs
      }


    };

    fetchPosts();
  }, []);


  return (
    <div>
      {isLoading ? (
        <Loading />
      ) :
        <BlogLayout catg={"Blog"}>
          <div className='xl:px-32 lg:px-12 flex flex-col items-center helvetica-font'>
            <div className='lg:py-10 py-5 justify-center sm:justify-items-center px-[6px]'>
              <p className="capitalize text-4xl text-center font-semibold lg:pt-3 pb-3 buch-font">Blogs</p>
              <ul className='flex justify-center items-center pt-2 gap-3'>
                <li>Topic</li>
                <li><GoDotFill /></li>
                <li>{postlist?.length} stories</li>
              </ul>
            </div>
            <div className='text-center flex justify-center lg:pt-10 pt-4'>
              <PostsListing data={sortedPostlist} />
            </div>
            <RandomPosts data={postlist} />
          </div>
          <div className=" py-2 pb-9 lg:py-5 flex flex-row xl:pl-36 lg:pl-20 pl-3 helvetica-font">
            <Link href={`/blog/${'travel'}`} className="flex space-x-2">
              <span className="border-2 text-white rounded-full p-2 bg-[#1859c9] text-sm flex items-center space-x-2">
                <span>See more</span>
                <MdExpandMore className="text-lg" />
              </span>
            </Link>
          </div>
        </BlogLayout>
      }
    </div>
  );
};

export default ComponentName;
