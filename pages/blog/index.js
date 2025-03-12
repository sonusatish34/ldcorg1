
import { fireDb } from '../../public/firebase';
import { getDocs, collection, where, query } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Loading from '../components/Loading';

const ComponentName = (props) => {

  const router = useRouter();
  const [postlist, setPostlist] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // State for loader

  useEffect(() => {
    const fetchPosts = async () => {
      const q2 = query(collection(fireDb, "blogPost"), where("blogfor", "==", "LDC"), where("blog_state", "==", "active"));
      const querySnapshot2 = await getDocs(q2);
      const posts2 = querySnapshot2.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setPostlist(posts2);  // Store the fetched data in the state
      posts2.sort(function (a, b) {
        return a.time.seconds - b.time.seconds;
      });

      const ValidCat = posts2[posts2?.length - 1]?.categoryname[0];
      if (ValidCat) {
        router.push(`/blog/${ValidCat}`);
      } else {
        router.push('/blog/travel');
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    setIsLoading(true)
  }, []);

  return (
    <div>
      {isLoading && (
        <Loading/>
      )}
    </div>
  );
};

export default ComponentName;
