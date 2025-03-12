import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
import StaticData from "@/pages/images/StaticData";

const PostsListing = ({ data, catg }) => {
  function ParseP(htmlContent) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Select all <p> elements
    const paragraphs = Array.from(doc.querySelectorAll("p"));

    // Join the content of the first three paragraphs
    const selectedParagraphs = paragraphs
      .slice(0, 3)
      .map((p) => p.innerText)
      .join(" ");

    return selectedParagraphs;
  }
  const replaceText = (str) => {
    if (str?.includes("cdn")) return str;
    else {
      return str?.replace("https://ldcars.blr1.", "https://ldcars.blr1.cdn.");
    }
  };
  const [showall, setShowAll] = useState(false);
  return (
    <div className="lg:pt-6 border-t-2 border-gray-300 pt-8 px-3">
      {/* <p className="text-xs lg:text-2xl pb-6 font-semibold">Recommended Stories</p> */}

      {/* First Section: Two Main Posts */}
      <p className="text-left text-3xl text-gray-900 font-semibold py-4">
        Recent stories
      </p>
      <div className="grid lg:grid-cols-2 grid-cols-1 gap-x-8 gap-y-10 xl:h-[700px]">
        {data?.length > 0 ? (
          data.slice(0, 2).map((post, i) => (
            <div
              key={`key-${i}`}
              className="w-full lg:w-[400px] xl:w-full lg:h-[600px]  xl:h-[610px] h-auto flex flex-col gap-y-6  lg:px-0"
            >
              {/* Image */}
              <Link
                href={`/blog/posts/${post.slug
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
                className="block hover:text-orange-500 font-extrabold text-lg xl:text-2xl text-left pt-4 tracking-tight "
              >
                {post?.coverimages && (
                  <Image
                    className="rounded-md w-full lg:h-[350px] h-auto"
                    src={
                      post?.coverimages?.length
                        ? replaceText(post?.coverimages)
                        : tempimg
                    }
                    alt={post?.cialt}
                    width={2000}
                    height={2000}
                    priority={i === 0 ? true : false}
                  />
                )}
              </Link>
              {/* Content Section */}
              <div className="flex-1">
                <h5 className="mb-2">
                  <Link
                    href={`/blog/posts/${post.slug
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                    className="block hover:text-orange-500  text-lg xl:text-2xl text-left pt-4 tracking-wide helvetica-font"
                  >
                    <p className="h-20 overflow-hidden font-[900] ">
                      {post?.title && post?.title.slice(0, 80)}
                    </p>
                    <p className="text-left text-[#6B6B6B]   text-base pt-4 leading-6 lg:block hidden">
                      {ParseP(post?.content) &&
                        ParseP(post?.content).slice(0, 300)}
                      ...
                    </p>
                    <p className="text-left text-[#6B6B6B] text-base pt-4 tracking- font-light leading-5 lg:hidden block">
                      {ParseP(post?.content) &&
                        ParseP(post?.content).slice(0, 150)}
                      ...
                    </p>
                  </Link>
                </h5>
              </div>

              {/* Bottom details (Likes, Time, Comments) */}

              <ul className=" pt-1 flex flex-wrap items-center space-x-2 lg:gap-3 gap-x-2 text-xs">
                <li className="lg:text-sm text-xs">
                  {StaticData(post?.time?.seconds)}
                </li>
                <li className="flex items-center gap-1 ">
                  <span>
                    <BiCategory className="text-blue-400 lg:size-4" />
                  </span>
                  <span className="lg:text-sm">{post?.categoryname}</span>
                </li>
                <li>
                  <div className="flex gap-4 items-center lg:gap-8 py-2">
                    <p className="flex items-center gap-1">
                      <span className="hover:cursor-pointer">
                        <GrLike size={14} className="lg:size-[15px]" />
                      </span>
                      <span>{post?.likes ? post?.likes : "1"}</span>{" "}
                      {/* Display likes count from state */}
                    </p>
                    <p className="flex items-center gap-1">
                      <span className="hover:cursor-pointer">
                        <FaRegComment size={14} className="lg:size-[15px]" />
                      </span>
                      <span>
                        {post?.comments?.length ? post?.comments?.length : "1"}
                      </span>{" "}
                      {/* Display comments count from state */}
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          ))
        ) : (
          <p>No posts available for this category.</p>
        )}
      </div>
      {/* Second Section: Remaining Posts */}

      <div
        className={`${
          showall ? "" : "hidden"
        } grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4 xl:gap-10 lg:mt-2 lg:px-0 pt-10`}
      >
        {data?.length > 0 ? (
          data.slice(2, 8).map((post, i) => (
            <div key={`key-${i}`} className="lg:px-0  w-full">
              <Link
                href={`/blog/posts/${post.slug
                  .toLowerCase()
                  .replace(/ /g, "-")}`}
                className="block hover:text-orange-500 font-extrabold text-lg xl:text-2xl text-left tracking-tight"
              >
                {post?.coverimages && (
                  <Image
                    className="rounded-md  lg:h-[200px] h-[100px] object-cover"
                    src={
                      post?.coverimages?.length
                        ? post?.coverimages
                        : "/tempimg.jpg"
                    }
                    alt={post?.cialt || "Post Image"}
                    width={2000}
                    height={2000}
                    priority={i === 0 ? true : false}
                  />
                )}
              </Link>
              <p className=" lg:pb-3 hover:text-orange-400 font-[900]  lg:text-lg text-sm text-left pt-4 h-16 lg:h-20 block lg:hidden">
                <Link
                  href={`/blog/posts/${post.slug
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  className="block hover:text-primary"
                >
                  {post?.title && post?.title.slice(0, 35)}..
                </Link>
              </p>
              <p className=" lg:pb-3 hover:text-orange-400 font-[900] tracking-wide lg:text-lg text-xs text-left pt-4 h-10 lg:h-20 lg:block hidden">
                <Link
                  href={`/blog/posts/${post.slug
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  className="block hover:text-primary"
                >
                  {post?.title && post?.title.slice(0, 135)}..
                </Link>
              </p>
              {/* <p className="text-left lg:text-xs text-xs h-12 lg:h-14 pt-3 lg:hidden block">
                            {ParseP(post?.content) && ParseP(post?.content).slice(0, 40)}...
                        </p> */}
              <p className="text-left text-[#6B6B6B] text-xs pt-4 tracking-wide leading-5 lowercase lg:hidden block  h-28">
                {ParseP(post?.content) && ParseP(post?.content).slice(0, 70)}...
              </p>
              <p className="text-left text-[#6B6B6B] text-base pt-4 tracking-wide leading-6  lg:block hidden h-28">
                {ParseP(post?.content) && ParseP(post?.content).slice(0, 160)}
                ...
              </p>

              {/* <p>{ParseP(post?.content)}</p> */}

              <ul className="mb-4 mt-auto flex flex-wrap justify-items-center lg:space-x-4 text-[10px] lg:text-sm pt-4">
              <li className="hidden lg:block">{StaticData(post?.time?.seconds)}</li>
              <li className="flex items-center gap-1">
                  <span>
                    <BiCategory className="text-blue-400" />
                  </span>
                  <span>{post?.categoryname[0]}</span>
                </li>
                <li>
                  <div className="lg:flex hidden gap-8 ">
                    <p className="flex items-center gap-2">
                      <span className="hover:cursor-pointer">
                        <GrLike size={10} />
                      </span>
                      <span>{post?.likes ? post?.likes : "1"}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="hover:cursor-pointer">
                        <FaRegComment size={10} />
                      </span>
                      <span>
                        {post?.comments?.length ? post?.comments?.length : "1"}
                      </span>
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          ))
        ) : (
          <p>No posts available for this category.</p>
        )}
      </div>
      <div className={`${showall ? "hidden" : ""} py-8`}>
        <button
          onClick={() => {
            setShowAll(true);
          }}
          className={`capitalize text-white bg-[#1859c9] rounded-md p-1 px-4 text-xl `}
        >
          see more {catg} posts
        </button>
      </div>
      <div className={`${showall ? "" : "hidden"} py-6`}>
        <button
          onClick={() => {
            setShowAll(false);
          }}
          className={`text-white bg-[#1859c9] rounded-md p-1 px-4 text-xl`}
        >
          Show Less Posts
        </button>
      </div>
    </div>
  );
};

export default PostsListing;
