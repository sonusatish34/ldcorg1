'use client';

import { useState } from 'react';
import Swal from 'sweetalert2';
import { fireDb } from '@/public/firebase';
import { getDocs,addDoc, collection, query, where } from 'firebase/firestore';
export default function WriteReview() {
  const [rating, setRating] = useState(null);
  const [date, setDate] = useState('');
  const [group, setGroup] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [reviewTitle, setReviewTitle] = useState('');
  const [agreed, setAgreed] = useState(false);
   const reviewData = {

      rating,
      date,
      group,
      reviewText,
      reviewTitle,
      agreed,
      createdAt: new Date().toISOString(),
    };


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
      const blogRef = collection(fireDb, "reviews");
      await addDoc(blogRef, {
        ...reviewData,
        
      });

      Swal.fire({
        icon: "success",
        title: "Post Created",
        html: `Title: ${reviewTitle}`,
      });
     
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "There was an issue creating the post. Please try again.",
      });
    }
  

    console.log('Submitted Review:', reviewData);
    // Send to Firebase here later
  };
  console.log(reviewData, 'rdd');

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-6 bg-white">
      {/* Tour Info */}
      <div className="flex items-start gap-4">
        <img
          src="/keralashot.jpg"
          alt="Tour"
          className="w-20 h-20 object-cover rounded"
        />
        <div>
          <h2 className="font-semibold text-sm">Small-group boat tour of the West Coast from Kerala</h2>
          <p className="text-xs text-blue-600 underline mt-1">By Buyourtour</p>
          <p className="text-xs text-gray-600 mt-2">Not the right one? <span className="text-blue-500 underline">Change activity</span></p>
        </div>
      </div>

      {/* Rating */}
      <div>
        <h3 className="text-lg font-bold">How would you rate your experience?</h3>
        <div className="flex gap-3 items-center mt-2">
          {[1, 2, 3, 4, 5].map((i) => (
            <button
              type="button"
              key={i}
              onClick={() => setRating(i)}
              className={`text-3xl transition-colors ${rating && i <= rating ? 'text-yellow-400' : 'text-gray-400'
                }`}
            >
              ★
            </button>
          ))}
          <p>
            {rating==1 && <p>Below Average</p>}
            {rating==2 && <p>Not Bad</p>}
            {rating==3 && <p>Good</p>}
            {rating==4 && <p>Great</p>}
            {rating==5 && <p>Mind Blowing</p>}
        </p>
        </div>

      </div>

      {/* Date Picker */}
      <div>
        <h3 className="text-lg font-bold">When did you go?</h3>
        <select
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="mt-2 w-full border border-gray-300 rounded px-4 py-2"
        >
          <option value="">Select one</option>
          <option>May 2025</option>
          <option>April 2025</option>
          <option>March 2025</option>
        </select>
      </div>

      {/* Group Selection */}
      <div>
        <h3 className="text-lg font-bold">Who did you go with?</h3>
        <div className="flex gap-2 flex-wrap mt-2">
          {['Alone', 'Couple', 'Family', 'Friends'].map((opt) => (
            <button
              type="button"
              key={opt}
              onClick={() => setGroup(opt)}
              className={`px-4 py-2 border rounded-full text-sm ${group === opt ? 'bg-black text-white' : 'border-gray-300'
                }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Review Text */}
      <div>
        <h3 className="text-lg font-bold">Share your experience</h3>
        <textarea
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          placeholder="Tell others about it..."
          minLength={10}
          className="w-full mt-2 h-24 p-2 border rounded resize-none"
        />
        <p className="text-xs text-right text-gray-400">{reviewText.length}/100 min characters</p>
      </div>

      {/* Review Title */}
      <div>
        <h3 className="text-lg font-bold">Title your review</h3>
        <input
          type="text"
          value={reviewTitle}
          onChange={(e) => setReviewTitle(e.target.value)}
          placeholder="Give us the gist of your experience"
          className="w-full mt-2 p-2 border rounded"
          maxLength={120}
        />
        <p className="text-xs text-right text-gray-400">{reviewTitle.length}/120 max characters</p>
      </div>

      {/* Photo Upload Placeholder */}
      <div>
        <h3 className="text-lg font-bold">Add some photos <span className="text-sm text-gray-400">(Optional)</span></h3>
        <div className="mt-2 border border-dashed border-gray-300 p-6 rounded text-center text-sm text-gray-500">
          📷 Add photos
        </div>
      </div>

      {/* Agreement */}
      <div className="flex gap-2 text-sm">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(e) => setAgreed(e.target.checked)}
        />
        <label>
          I certify that this review is based on my own experience...{' '}
          <a href="#" className="text-blue-500 underline">Learn more</a>
        </label>
      </div>

      {/* Submit */}
      <button
        type="submit"
        // disabled={!agreed || !rating || reviewText.length < 100}
        className={`w-full py-3 mt-4 rounded text-white font-semibold ${'bg-black hover:bg-gray-900'
          }`}
      >
        Submit review
      </button>
    </form>
  );
}
