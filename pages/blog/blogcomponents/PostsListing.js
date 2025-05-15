"use client"
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
    if (typeof window !== 'undefined') {
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      const paragraphs = Array.from(doc.querySelectorAll("p"));
      const selectedParagraphs = paragraphs
        .slice(0, 3)
        .map((p) => p.innerText)
        .join(" ");

      return selectedParagraphs;
    }
    return '';
  }

  const replaceText = (str) => {
    if (str?.includes("cdn")) return str;
    else {
      return str?.replace("https://ldcars.blr1.", "https://ldcars.blr1.cdn.");
    }
  };
  const [showall, setShowAll] = useState(false);
  return (
    <div className="lg:pt-6 border-t-2 border-gray-300 pt-8 px-3 lg:px-0">
      <p className="text-left text-3xl text-gray-900 font-semibold py-4">
        Recent stories
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:gap-x-20 lg:gap-x-14 w-full xl:h-[650px] ">
        {data?.length > 0 ? (
          data.slice(0, 2).map((post, i) => (
            <div key={`key-${i}`}>
              <Link

                href={`/blog/posts/${post.slug.toLowerCase().replace(/ /g, "-")}`}
                className="w-full lg:h-[450px]  xl:h-[610px] h-auto flex flex-col gap-y-1 lg:px-0"
              >
                <p

                  className="block hover:text-[#556ee6] font-bold text-lg xl:text-2xl text-left pt-4 tracking-tight "
                >
                  {post?.coverimages && (
                    <Image
                      className="rounded-md w-full xl:h-[350px] lg:h-[260px] h-auto"
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
                </p>
                <section>
                  <h5 className="mb-1">
                    <p
                      className="block hover:text-[#556ee6]  text-lg xl:text-2xl text-left pt-4 helvetica-font"
                    >
                      <span className="h-14 xl:h-16 overflow-hidden font-bold tracking-normal">
                        {post?.title && post?.title.slice(0, 60)}..
                      </span>
                      <span className="text-left text-[#6B6B6B] text-base pt-4 tracking-normal leading-6 lg:block hidden">
                        {(post?.description) &&
                          (post?.description).slice(0, 300)}
                        ...
                      </span>
                      <span className="text-left text-[#6B6B6B] text-sm lowercase tracking-normal font-light leading-5 lg:hidden block">
                        {ParseP(post?.content) &&
                          ParseP(post?.content).slice(0, 140)}

                      </span>
                    </p>
                  </h5>
                </section>

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
                      </p>
                      <p className="flex items-center gap-1">
                        <span className="hover:cursor-pointer">
                          <FaRegComment size={14} className="lg:size-[15px]" />
                        </span>
                        <span>
                          {post?.comments?.length ? post?.comments?.length : "1"}
                        </span>{" "}
                      </p>
                    </div>
                  </li>
                </ul>
              </Link>
            </div>
          ))
        ) : (
          <p>No posts available for this category.</p>
        )}
      </div>

      <div
        className={`${showall ? "" : "hidden"
          } grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-8  xl:mt-2 lg:mt-6 lg:px-0 pt-10`}
      >
        {data?.length > 0 ? (
          data.slice(8, 14).map((post, i) => (
            <div key={`key-${i}`}>
              <Link href={`/blog/posts/${post.slug.toLowerCase().replace(/ /g, "-")}`} className="lg:px-0  w-full">
                <p
                  className="block hover:text-[#556ee6] font-bold text-lg xl:text-2xl text-left tracking-normal"
                >
                  {post?.coverimages && (
                    <Image
                      className="rounded-md lg:h-[160px] xl:h-[220px] h-[80px] mxs:h-[100px] object-cover"
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
                </p>
                <p className=" lg:pb-3 hover:text-[#556ee6] font-bold xl:text-lg lg:text-base text-sm text-left pt-4 h-16 lg:h-20 block lg:hidden">
                  <span

                    className="block hover:text-primary"
                  >
                    {post?.title && post?.title.slice(0, 35)}..
                  </span>
                </p>
                <p className=" lg:pb-3 hover:text-[#556ee6] font-bold xl:text-lg lg:text-base text-xs text-left pt-4 h-10 lg:h-24 lg:block hidden">
                  <span
                    href={`/blog/posts/${post.slug
                      .toLowerCase()
                      .replace(/ /g, "-")}`}
                    className="block hover:text-primary"
                  >
                    {post?.title && post?.title.slice(0, 115)}..
                  </span>
                </p>
                <p className="text-left text-[#6B6B6B] text-xs pt-1 tracking-normal leading-5 lowercase lg:hidden block xl:h-24 lg:h-32">
                  {post?.description.slice(0, 50)}...
                </p>
                <p className="text-left text-[#6B6B6B] text-base pt-1 tracking-normal leading-6  lg:block hidden xl:h-28 lg:h-32">
                  {post?.description.slice(0, 150)}...
                </p>

                <ul className="mb-4 mt-auto flex flex-wrap justify-items-center lg:space-x-4 text-[10px] xl:text-sm lg:text-xs pt-4">
                  <li className="hidden lg:block"><p>{post?.date.slice(0, 12)}</p></li>
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
              </Link>
            </div>
          ))
        ) : (
          <p>No posts available for this category.</p>
        )}
      </div>
      <div className={`${showall ? "hidden" : ""} py-8 lg:pt-20 xl:pt-1`}>
        <button
          onClick={() => {
            setShowAll(true);
          }}
          className={`capitalize text-white bg-[#556ee6] rounded p-1 px-4 lg:text-xl text-base `}
        >
          see more {catg} posts
        </button>
      </div>
      <div className={`${showall ? "" : "hidden"} py-6`}>
        <button
          onClick={() => {
            setShowAll(false);
          }}
          className={`text-white bg-[#556ee6] rounded-md p-1 px-4 text-xl`}
        >
          Show Less Posts
        </button>
      </div>
    </div>
  );
};

export default PostsListing;
