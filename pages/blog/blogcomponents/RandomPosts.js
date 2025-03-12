import React from "react";
import { fireDb } from "../../../public/firebase";
import { getDocs, collection, query, where } from "firebase/firestore";
import Link from "next/link";
import Image from "next/image";
import StaticData from "@/pages/images/StaticData";
import { BiCategory } from "react-icons/bi";
import { CgProfile } from "react-icons/cg";
import { FaRegComment } from "react-icons/fa";
import { GrLike } from "react-icons/gr";
const RandomPosts = ({ data }) => {
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
  return (
    <div className="pt-1 border-t-2 border-gray-300  px-3">
      <p className="text-left text-2xl font-semibold pt-4 leading-6 capitalize">
        explore more stories
      </p>

      <div
        className={` grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4 xl:gap-10 lg:mt-2 pt-10`}
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
              <p className=" lg:pb-3 hover:text-orange-400 font-bold lg:text-lg text-sm text-left pt-4 h-16 lg:h-20 block lg:hidden">
                <Link
                  href={`/blog/posts/${post.slug
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  className="block hover:text-primary  helvetica-font"
                >
                  {post?.title && post?.title.slice(0, 35)}..
                </Link>
              </p>
              <p className=" lg:pb-3 hover:text-orange-400 font-bold lg:text-lg text-xs text-left pt-4 h-10 lg:h-20 lg:block hidden">
                <Link
                  href={`/blog/posts/${post.slug
                    .toLowerCase()
                    .replace(/ /g, "-")}`}
                  className="block hover:text-primary"
                >
                  {post?.title && post?.title.slice(0, 80)}..
                </Link>
              </p>
              {/* <p className="text-left lg:text-xs text-xs h-12 lg:h-14 pt-3 lg:hidden block">
                            {ParseP(post?.content) && ParseP(post?.content).slice(0, 40)}...
                        </p> */}
              <p className="text-left text-[#6B6B6B] text-xs pt-4 tracking-wide lowercase leading-5 lg:hidden block h-28">
                {ParseP(post?.content) && ParseP(post?.content).slice(0, 80)}...
              </p>
              <p className="text-left text-[#6B6B6B] text-base pt-4 tracking-wide leading-6 lg:block hidden h-28">
                {ParseP(post?.content) && ParseP(post?.content).slice(0, 160)}
                ...
              </p>

              {/* <p>{ParseP(post?.content)}</p> */}

              <ul className="mb-4 mt-auto flex flex-wrap justify-items-center lg:space-x-4 text-xs pt-4">
                <li className="hidden lg:block">{post?.date.slice(0, 12)}</li>
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
    </div>
  );
};

export default RandomPosts;
