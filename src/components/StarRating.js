import React, { useState } from "react";
import { FaStar } from "react-icons/fa";

const StarRating = () => {
  const [rating, setRating] = useState(null); // State for storing the selected rating
  const [hover, setHover] = useState(null); // State for tracking the hovered rating

  return (
    <div>
      {/* Rendering star ratings */}
      {[...Array(5)].map((star, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              name="rating"
              value={ratingValue}
              onClick={() => setRating(ratingValue)} // Set the selected rating
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#DCDCDC"} // Color the star based on hover and selected rating
              size={25}
              onMouseEnter={() => setHover(ratingValue)} // Track the hovered rating
              onMouseLeave={() => setHover(null)} // Reset the hovered rating
            />
          </label>
        );
      })}
      <p className="badge badge-light">The rating is {rating}.</p> {/* Display the selected rating */}
    </div>
  );
};

export default StarRating;
