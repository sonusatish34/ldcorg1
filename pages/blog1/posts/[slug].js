import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fireDb } from '../../../public/firebase';
import { doc, updateDoc, arrayUnion, getDocs, query, collection, where } from "firebase/firestore";
import StaticData from '@/pages/images/StaticData';
import { GrLike } from "react-icons/gr";
import { FaRegComment } from "react-icons/fa";
import Image from 'next/image';
import Link from "next/link";
import { BiCategory } from "react-icons/bi";
import { IoTimeOutline } from "react-icons/io5";
import BlogLayout from '../blogcomponents/BlogLayout';
import { MdExpandMore } from "react-icons/md";
import Loading from '@/pages/components/Loading';
import Head from 'next/head';
import { IoMdVolumeHigh, IoMdVolumeOff } from "react-icons/io";
function SinglePost({ canonicalUrl, postDisplay }) {
  const router = useRouter();
  const { slug } = router.query;
  const [postlist, setPostlist] = useState([]);
  const [cat, setCat] = useState('');
  const [commentShow, setCommentShow] = useState(false);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [utterance, setUtterance] = useState(null);
  const [voice, setVoice] = useState(null);

  useEffect(() => {
    const getVoices = () => {
      const voices = window.speechSynthesis.getVoices();

      let selectedVoice = voices.find(v =>
        v.name.toLowerCase().includes('google') || // Common on Android
        v.name.toLowerCase().includes('microsoft') || // Common on Windows
        v.name.toLowerCase().includes('english us') ||
        v.name.toLowerCase().includes('en-us')
      );

      if (!selectedVoice) {
        // Priority 2: Match language code (for iOS and other cases)
        selectedVoice = voices.find(v => v.lang === 'en-US' || v.lang.startsWith('en'));
      }

      setVoice(selectedVoice || null);
    };

    getVoices(); // Call it once on mount
    window.speechSynthesis.onvoiceschanged = getVoices; // And when voices change

    return () => {
      if (utterance) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  const cleanText = (text) => {
    if (!text) return '';
    let cleanedText = text.replace(/<[^>]*>/g, '');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = cleanedText;
    cleanedText = tempDiv.textContent || tempDiv.innerText || '';
    cleanedText = cleanedText.replace(/\s+/g, ' ').trim();
    return cleanedText;
  };
  const speakText = () => {
    if (!postDisplay || !postDisplay.content) {
      console.warn("No content available to read.");
      return;
    }

    const title = cleanText(postDisplay.title);
    const description = cleanText(postDisplay.description);
    const content = cleanText(postDisplay.content);

    // ***THIS LINE WAS MOVED***
    const textToSpeak = `${title}. ${description}. ${content}`;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    const newUtterance = new SpeechSynthesisUtterance(textToSpeak); //textToSpeak is now defined
    newUtterance.onstart = () => setIsSpeaking(true);
    newUtterance.onend = () => setIsSpeaking(false);
    newUtterance.onerror = (event) => {
      console.error("Speech synthesis error:", event);
      setIsSpeaking(false);
    };
    newUtterance.rate = 0.8;

    if (voice) {
      newUtterance.voice = voice;
    } else {
      console.log("No suitable voice found on this device.");
    }

    window.speechSynthesis.speak(newUtterance);
    setUtterance(newUtterance);
  };

  // States for likes and comments
  const [likesCount, setLikesCount] = useState(0);
  const [comments, setComments] = useState([]);

  // States for the comment form
  const [userName, setUserName] = useState("");
  const [commentText, setCommentText] = useState("");

  // Loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPostAndRelated = async () => {
      try {
        setLoading(true); // Set loading state to true
        const q = query(collection(fireDb, "blogPost"), where("slug", "==", slug));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const postDoc = querySnapshot.docs[0];
          const postData = postDoc.data();
          setLikesCount(postData.likes || 0); // Set the likes count
          setComments(postData.comments || []); // Set the comments array
          setCat(postData?.categoryname); // Set the category

          // Fetch posts related to the same category if available
          if (postData?.categoryname) {
            const qCategory = query(collection(fireDb, "blogPost"),
              where("categoryname", "==", postData.categoryname),
              where("blog_state", "==", "active"));
            const categorySnapshot = await getDocs(qCategory);
            const posts = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            const removeslug = posts.filter(post => post.slug !== slug);
            setPostlist(removeslug);
          }
        }
      } catch (error) {
        console.error("Error fetching post or related posts:", error);
      } finally {
        setLoading(false);  // Stop loader once data is fetched
      }
    };

    if (slug) {
      fetchPostAndRelated();
    }
  }, [slug]);


  // Handle like button click
  const handleLike = async () => {
    try {
      const q = query(collection(fireDb, "blogPost"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Post not found.");
        return;
      }

      const postDocRef = doc(fireDb, "blogPost", querySnapshot.docs[0].id);
      const postDoc = querySnapshot.docs[0].data();
      // Check if the likes field exists
      const currentLikes = postDoc.likes || 0; // If likes doesn't exist, initialize to 0
      const newLikesCount = currentLikes + 1;

      // Increment the likes count in the local state
      setLikesCount(newLikesCount); // Update the local state immediately

      // Update the likes count in Firestore
      await updateDoc(postDocRef, {
        likes: newLikesCount
      });

      // alert("Like added!");
    } catch (error) {
      console.error("Error updating like:", error);
      alert("There was an error updating the like.");
    }
  };

  // Handle comment form submission
  const handleCommentSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    if (!userName || !commentText) {
      alert("Please provide both name and comment.");
      return;
    }

    const date = new Date().toISOString(); // Current date in ISO format

    try {
      const q = query(collection(fireDb, "blogPost"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Post not found.");
        return;
      }

      const postDocRef = doc(fireDb, "blogPost", querySnapshot.docs[0].id);

      const newComment = { userName, commentText, date, };

      // Update the comments in the local state
      setComments(prevComments => [...prevComments, newComment]);

      // Use `arrayUnion` to add the new comment to the Firestore `comments` array
      await updateDoc(postDocRef, {
        comments: arrayUnion(newComment)
      });

      alert("Comment added successfully!");

      // Reset form fields
      setUserName("");
      setCommentText("");
    } catch (error) {
      console.error("Error adding comment:", error);
      alert("There was an error adding the comment.");
    }
  };

  return (
    <div>

      {<BlogLayout>
        <section className="section">
          <Head>
            <title>{String(postDisplay?.title || 'LDC Blog')}</title>
            <meta name="description" content={postDisplay?.description} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <meta property="og:title" content={postDisplay?.description} />
            <meta property="og:description" content={postDisplay?.description} />
            <link rel="canonical" href={canonicalUrl} />
          </Head>
          <div className='flex flex-col lg:px-0 py-2 lg:py-2 text-black'>
            <div className='xl:mx-96 lg:mx-56 mx-6 lg:px-0'>
              <p className='lg:text-[40px] lg:leading-normal text-2xl font-bold lg:py-4 py-2 helvetica-font tracking-tight'>{postDisplay?.title}</p>
              <p className='helvetica-font text-[#6B6B6B] text-base lg:text-xl lg:pb-6 py-2 lg:py-4'>{postDisplay?.description}</p>
            </div>
            <div className='xl:mx-24 lg:mx-16 px-1 lg:px-0 py-3 lg:py-6'>
              <Image
                className="w-full rounded-sm"
                src={postDisplay?.coverimages}
                alt={postDisplay?.cialt}
                width={2000}
                height={2000}
              />
            </div>
            <div className=''>
              <div className="flex items-center flex-wrap lg:gap-6 gap-4 py-3 text-sm lg:text-lg xl:mx-96 lg:mx-56 mxs: mx-6 ">
                <p>{postDisplay?.timetake} min read</p>
                {/* <p>{StaticData(postDisplay?.time.seconds)}</p> */}
                <p className="flex items-center gap-1">
                  <BiCategory className="text-blue-400" />
                  <span>
                    {Array.isArray(postDisplay?.categoryname)
                      ? postDisplay.categoryname.join(", ")
                      : postDisplay?.categoryname}
                  </span>
                </p>
                <button
                  onClick={speakText}
                  disabled={!postDisplay || !postDisplay.content}
                  className="text-blue-600 flex items-center justify-center border-2 rounded-md"
                >
                  <span className="p-1">{isSpeaking ? 'Stop Reading' : 'Play As Audio'}</span>
                  {isSpeaking ? (
                    <IoMdVolumeHigh size={20} className="lg:size-6" />
                  ) : (
                    <IoMdVolumeOff size={20} className="lg:size-6" />
                  )}
                </button>
              </div>
              <ul className="py-2 flex  items-center justify-start gap-x-8 text-xs lg:text-base xl:mx-96 lg:mx-56 mx-6 ">
                <li className="flex items-center gap-5"><span>{<p>{StaticData(Math.floor(new Date(postDisplay?.time).getTime() / 1000))}</p>}</span>
                  <p>{postDisplay?.date.slice(0, 12)}</p>
                </li>
              </ul>
            </div>
            <div
              className="text-[#242424] lg:text-justify text-base lg:text-[20px] leading-8 lg:leading-9 lg:tracking-wide pt-4 pb-4 px-1 lg:px-0  rounded-lg georgia-font xl:mx-96 lg:mx-56 mx-6"
              dangerouslySetInnerHTML={{ __html: postDisplay?.content }}
            />
            <div className='flex gap-8 py-4 border-t-2 border-b-2 xl:mx-96 lg:mx-56 mx-6 px-4 lg:px-0' >
              <p className='flex gap-2'>
                <span className='hover:cursor-pointer'>
                  <GrLike size={20} onClick={handleLike} />
                </span>
                <span>{likesCount}</span>
              </p>
              <p className='flex gap-2'>
                <span className='hover:cursor-pointer'>
                  <FaRegComment size={20} onClick={() => setCommentShow(true)} />
                </span>
                <span>{comments.length}</span>
              </p>
            </div>
            {commentShow && (
              <div className='rounded-sm w-[400px] xl:mx-96 lg:mx-56 mx-6 px-4 lg:px-0'>
                <span>Please Leave A Reply here</span>
                <form className="flex flex-col gap-4 bg-gray-100 border-2 p-4" onSubmit={handleCommentSubmit}>
                  <textarea
                    id="commentText"
                    placeholder="Comment Here!"
                    required
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    className='w-full h-28 rounded-md p-2'
                  ></textarea>
                  <div className='flex gap-2'>
                    <input
                      type="text"
                      id="userName"
                      placeholder="Your Name"
                      required
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      className='w-fit rounded-md p-2'
                    />
                    <button className='bg-blue-400 p-1 rounded-md text-white' type="submit">Post Comment</button>
                  </div>
                </form>
                <div>
                  <p className='text-xl font-semibold py-4'>Comments</p>
                  <ul>
                    {comments.map((comment, index) => (
                      <li key={index} className="mb-4">
                        <p><strong>{comment.userName}</strong> <span className="text-sm text-gray-500">{comment.date}</span></p>
                        <p>{comment.commentText}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            <div className="pt-4 xl:mx-96 lg:mx-56 mx-6 lg:px-0">
              <p className="text-xl font-semibold">Related Posts</p>
              <div className=" lg:grid-cols-2 grid grid-cols-2 lg:gap-x-8 lg:gap-y-20 gap-6 pt-6  lg:pt-6">
                {postlist?.length > 0 ? postlist.slice(0, 4).map((post, i) => (
                  <div key={`key-${i}`} className={"xl:w-[315 px] lg:h-[350px] w-full h-30  "}>
                    <Link href={`/blog/posts/${post.slug.toLowerCase().replace(/ /g, "-")}`} className="block hover:text-orange-500 font-extrabold text-lg xl:text-2xl text-left tracking-tight">
                      {post?.coverimages && (
                        <Image
                          className="rounded-md lg:w-[400px] lg:h-[200px] w-32 h-20 "
                          src={post?.coverimages?.length ? post?.coverimages : tempimg}
                          alt={post?.cialt}
                          width={2000}
                          height={2000}
                          priority={i === 0 ? true : false}
                        />
                      )}
                    </Link>
                    <p className="mb-2 hover:text-[#556ee6] font-bold lg:text-lg text-[10px] mxs:text-xs text-left pt-4 h-16 lg:h-20">
                      <Link href={`/blog/posts/${post.slug.toLowerCase().replace(/ /g, "-")}`} className="block hover:text-primary">
                        {post?.title && post?.title.slice(0, 50)}
                      </Link>
                    </p>

                    <p className="text-left text-xs h-16 lg:block hidden  text-[#6B6B6B]">
                      {post?.description && post?.description.slice(0, 150)}...
                    </p>
                    <p className="text-left text-[10px] mxs:text-xs  h-14 block lg:hidden text-[#6B6B6B]">
                      {post?.description && post?.description.slice(0, 50)}...
                    </p>

                    <ul className=" pt-2 lg:pt-4 flex flex-wrap items-center space-x-4 text-xs">
                      <li className="flex items-center gap-1">
                        <BiCategory className="text-blue-400" />
                        <span>
                          {Array.isArray(postDisplay?.categoryname)
                            ? postDisplay.categoryname.join(", ")
                            : postDisplay?.categoryname}
                        </span>
                      </li>

                      <li className="hidden lg:flex items-center gap-1">
                        <span><IoTimeOutline className="text-blue-400" /></span>
                        <span>{<p>{postDisplay?.date.slice(0, 12)}</p>}</span>
                      </li>
                    </ul>

                  </div>
                )) : <p>No related posts found</p>}
              </div>

            </div>
            <div className=" py-6 lg:mt-12 flex flex-row xl:mx-96 lg:mx-56 mx-1.5 px-4 lg:px-0 text-white">
              <Link href={`/blog/${cat ? cat[0] + '/' : ''}recommended`} className="flex  space-x-2">
                <span className="border-2 bg-[#556ee6] rounded-full p-2 text-sm flex items-center space-x-2">
                  <span>See more</span>
                  <MdExpandMore size={20} className="text-lg" />
                </span>
              </Link>
            </div>
          </div>
        </section>
      </BlogLayout>}
    </div>
  );
}

export default SinglePost;


export async function getServerSideProps({ req, params }) {
  const host = req.headers.host;
  const { slug } = params;

  try {

    const q = query(collection(fireDb, "blogPost"), where("slug", "==", slug));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      return {
        notFound: true,
      };
    }

    const postData = querySnapshot.docs[0].data();

    const postDisplay = {
      ...postData,
      time: postData.time?.toDate().toISOString(),
    };

    if (postDisplay?.blogfor !== 'LDC') {
      return {
        notFound: true, // This will render the 404 page
      };
    }

    const canonicalUrl = host.includes('.in')
      ? `https://www.longdrivecars.in/blog/posts/${(postDisplay.slug)}`
      : `https://www.longdrivecars.com/blog/posts/${(postDisplay.slug)}`;

    return {
      props: {
        canonicalUrl,
        postDisplay,
      },
    };
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return {
      notFound: true,
    };
  }
}



