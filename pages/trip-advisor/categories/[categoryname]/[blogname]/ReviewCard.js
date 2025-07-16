// components/ReviewCard.tsx
import { FaThumbsUp, FaThumbsDown } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { CgProfile } from "react-icons/cg";

export default function ReviewCard({ review }) {
  return (
    <div className="bg-white rounded-xl shadow p-4 space-y-2 border mb-6">
      <div className="flex items-center gap-3">
        <div className=""><CgProfile size={30}/></div>
        <div className="flex-1">
          <h3 className="font-semibold">{review?.name}</h3>
          <p className="text-sm text-gray-500">{review?.location}</p>
        </div>
        <HiDotsHorizontal className="text-gray-500" />
      </div>

      <div className="text-yellow-500 flex gap-1 text-lg">
        {'★'.repeat(review?.rating)}{'☆'.repeat(5 - review?.rating)}
      </div>

      <p className="text-gray-700 text-sm whitespace-pre-line">
        {review?.comment}
      </p>

      {review?.images?.length > 0 && (
        <div className="flex gap-2 mt-2">
          {review?.images.map((img, idx) => (
            <img
              key={idx}
              src={img}
              alt="review image"
              className="h-20 w-24 object-cover rounded"
            />
          ))}
        </div>
      )}

      <div className="flex gap-4 mt-2 text-sm text-gray-500">
        <button className="flex items-center gap-1 hover:text-green-600">
          <FaThumbsUp /> {review?.likes}
        </button>
        <button className="flex items-center gap-1 hover:text-red-600">
          <FaThumbsDown /> {review?.dislikes}
        </button>
      </div>
    </div>
  );
}
