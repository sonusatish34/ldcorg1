// components/ReviewPopup.js
'use client';
import { useState } from 'react';
import { fireDb } from '@/public/firebase';
import { doc, query, collection, where, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import { X } from 'lucide-react';

export default function ReviewPopup({ slug, onClose }) {
  const [rating, setRating] = useState(null);
  const [date, setDate] = useState('');
  const [group, setGroup] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const reviewData = {
      rating,
      date,
      group,
      reviewText,
      reviewTitle,
      agreed,
      createdAt: new Date().toISOString(),
    };

    try {
      const q = query(collection(fireDb, "trips"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        alert("Post not found.");
        return;
      }

      const postDocRef = doc(fireDb, "trips", querySnapshot.docs[0].id);
      await updateDoc(postDocRef, {
        reviews: arrayUnion(reviewData)
      });

      alert("Review added!");
      onClose(); // Close modal
    } catch (error) {
      console.error("Error adding review:", error);
      alert("There was an error.");
    }
  };
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg max-w-xl w-full p-6 relative overflow-y-auto max-h-[90vh]">
        <button onClick={onClose} className="absolute right-4 top-4 text-gray-700"><X /></button>
        <form onSubmit={handleSubmit} className="space-y-6">
          <h2 className="text-xl font-bold mb-2">Write a Review</h2>

          <div className="flex gap-2 text-2xl">
            {[1, 2, 3, 4, 5].map(i => (
              <button type="button" key={i} onClick={() => setRating(i)} className={`${rating >= i ? "text-yellow-400" : "text-gray-300"}`}>★</button>
            ))}
          </div>

          <select value={date} onChange={(e) => setDate(e.target.value)} className="w-full border px-3 py-2 rounded">
            <option value="">When did you go?</option>
            <option>June 2025</option>
            <option>May 2025</option>
            <option>April 2025</option>
          </select>

          <div className="flex gap-2 flex-wrap">
            {['Alone', 'Couple', 'Family', 'Friends'].map(opt => (
              <button key={opt} type="button" onClick={() => setGroup(opt)}
                className={`px-4 py-1 border rounded-full ${group === opt ? 'bg-black text-white' : 'text-gray-700'}`}>
                {opt}
              </button>
            ))}
          </div>

          <input value={reviewTitle} onChange={(e) => setReviewTitle(e.target.value)} placeholder="Title" className="w-full border px-3 py-2 rounded" />

          <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} rows={4}
            placeholder="Write your review here..." className="w-full border px-3 py-2 rounded" />
          <div>
            <p className='pb-4'>Add some photos of yours</p>
            <input type='file' className='border rounded w-full text-center p-6'>
            </input>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <input type="checkbox" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />
            <label>I certify that this is my honest experience.</label>
          </div>

          <button type="submit" className="w-full bg-black text-white py-2 rounded">Submit Review</button>
        </form>
      </div>
    </div>
  );
}
