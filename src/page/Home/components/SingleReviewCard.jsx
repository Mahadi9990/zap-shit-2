import React from "react";

const SingleReviewCard = ({ reviewsData }) => {
  const {
    userName,
    user_photoURL,
    ratings,
    review: comment,
    date,
  } = reviewsData;
  return (
    <div className="card bg-base-200 shadow-md">
      <div className="card-body">
        {/* Header */}
        <div className="flex items-center gap-4">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={user_photoURL} alt={userName} />
            </div>
          </div>

          <div>
            <h2 className="font-semibold">{userName}</h2>
            <p className="text-sm opacity-60">
              {new Date(date).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Review text */}
        <p className="mt-3">{comment}</p>

        {/* Rating */}
        <div className="flex items-center gap-2 mt-4">
          <div className="rating rating-sm">
            {[1, 2, 3, 4, 5].map((star) => (
              <input
                key={star}
                type="radio"
                className="mask mask-star-2 bg-orange-400"
                checked={star <= Math.round(ratings)}
                readOnly
              />
            ))}
          </div>
          <span className="text-sm font-medium">{ratings}</span>
        </div>
      </div>
    </div>
  );
};

export default SingleReviewCard;
