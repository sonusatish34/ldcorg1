"use client"
import config from "@config/config.json";
import dateFormat from "@lib/utils/dateFormat";
import { humanize, slugify } from "@lib/utils/textConverter";
import Image from "next/image";
import Link from "next/link";
import { fireDb } from '../../firebase';
import { Timestamp, addDoc, collection, setDoc, getDocs, query, where, } from 'firebase/firestore';
import { useEffect, useState } from "react";
const Posts = ({ posts, className, authors }) => {
  const [postlist,setPostlist] = useState('')
  useEffect(() => {
    const fetchPosts = async () => {
      // setLoading(true);
      const querySnapshot = await getDocs(collection(fireDb, "blogPost"));
      const posts = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // setPostsData(posts);
      setPostlist(posts);
      console.log(posts, "----------11111111------");
      // setPostauthor(sessionStorage.getItem('AdminName'))
      // console.log(formData, "fd---000");
      // setLoading(false);
    };

    fetchPosts();
  }, []);
  const { summary_length } = config.settings;
  return (
    <div className={`row space-y-16 ${className}`}>
      {postlist?.length? postlist?.map((post, i) => (
        <div
          key={`key-${i}`}
          className={i === 0 ? "col-12" : "col-12 sm:col-6"}
        >
          {post?.coverimages && (
            <Image
              className="rounded-lg"
              src={post?.coverimages}
              alt={''}
              width={i === 0 ? "425" : "245"}
              height={i === 0 ? "375" : "130"}
              priority={i === 0 ? true : false}
            />
          )}
          <ul className="mb-4 mt-4 flex flex-wrap items-center space-x-3 text-text">
            <li>{post?.postauthor}</li>
            <li className="text-red-600">{postlist?.time}</li>
            <li>
              <ul>
                {/* {post.frontmatter.categories.map((category, i) => (
                  <li className="inline-block" key={`category-${i}`}>
                    <Link
                      href={`/categories/${slugify(category)}`}
                      className="mr-3 hover:text-primary"
                    >
                      &#9635; {humanize(category)}
                    </Link>
                  </li>
                ))} */}
              </ul>
            </li>
          </ul>
          <h3 className="mb-2">
            <Link href={`/${post?.title}`} className="block hover:text-primary">
              {postlist?.title}
            </Link>
          </h3>
          <p className="text-text">
            {/* {postlist?.content && postlist?.content.slice(0, Number(summary_length))}... */}
            
            <div dangerouslySetInnerHTML={{__html:post?.content}}></div>

          </p>
        </div>
      )):''}
    </div>
  );
};

export default Posts;
