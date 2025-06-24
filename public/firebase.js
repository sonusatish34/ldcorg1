// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration from environment variables


// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
// };

// apiKey: "AIzaSyAQ-o1pBcVmuC9CRhnj2YvHdcHjMwT39F8",
//   authDomain: "myblog-20a5b.firebaseapp.com",
//   projectId: "myblog-20a5b",
//   storageBucket: "myblog-20a5b.firebasestorage.app",
//   messagingSenderId: "72839760896",
//   appId: "1:72839760896:web:946803b8efd18b83581ce5"

const NEXT_PUBLIC_FIREBASE_API_KEY= "AIzaSyAQ-o1pBcVmuC9CRhnj2YvHdcHjMwT39F8"
const NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN= "myblog-20a5b.firebaseapp.com"
const NEXT_PUBLIC_FIREBASE_PROJECT_ID= "myblog-20a5b"
const NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET= "myblog-20a5b.firebasestorage.app"
const NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID= "72839760896"
const NEXT_PUBLIC_FIREBASE_APP_ID= "1:72839760896:web:946803b8efd18b83581ce5"

const firebaseConfig = {
  
  apiKey: NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: NEXT_PUBLIC_FIREBASE_APP_ID
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDb = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { fireDb, auth, storage };
