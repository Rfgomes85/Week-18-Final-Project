import React, { useState, useEffect } from "react";
import { FaStar } from "react-icons/fa";

const loadReviewsFromLocalStorage = (movieId) => {
  const storedReviews = localStorage.getItem(`reviews-${movieId}`);
  if (storedReviews) {
    return JSON.parse(storedReviews);
  }
  return [];
};

const StarRating = ({ rating, onRatingChange }) => {
  const [hover, setHover] = useState(null);

  return (
    <div>
      {[...Array(5)].map((_, i) => {
        const ratingValue = i + 1;
        return (
          <label key={i}>
            <input
              type="radio"
              value={ratingValue}
              onClick={() => onRatingChange(ratingValue)}
              required
            />
            <FaStar
              className="star"
              color={ratingValue <= (hover || rating) ? "#ffc107" : "#DCDCDC"}
              size={25}
              onMouseEnter={() => setHover(ratingValue)}
              onMouseLeave={() => setHover(null)}
            />
          </label>
        );
      })}
      <p>The rating is {rating}.</p>
    </div>
  );
};

const ReviewForm = ({ movieId }) => {
  const [reviews, setReviews] = useState(loadReviewsFromLocalStorage(movieId));
  const [name, setName] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem(`reviews-${movieId}`, JSON.stringify(reviews));
  }, [movieId, reviews]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newReview = { name, review, rating };
    if (editingIndex !== null) {
      const updatedReviews = reviews.map((review, index) =>
        index === editingIndex ? newReview : review
      );
      setReviews(updatedReviews);
      setEditingIndex(null);
    } else {
      setReviews([...reviews, newReview]);
    }
    setName("");
    setReview("");
    setRating(null);
  };

  const handleEdit = (index) => {
    const review = reviews[index];
    setName(review.name);
    setReview(review.review);
    setRating(review.rating);
    setEditingIndex(index);
  };

  const handleDelete = (index) => {
    const updatedReviews = reviews.filter((_, i) => i !== index);
    setReviews(updatedReviews);
  };

  return (
    <div>
      <form className="form" onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Review:
          <textarea
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
          />
        </label>
        <br />
        <label>
          Rating:
          <StarRating rating={rating} onRatingChange={setRating} />
        </label>
        <br />
        <button className="button" type="submit">
          {editingIndex !== null ? "Save Review" : "Submit Review"}
        </button>
      </form>
      <ReviewList
        reviews={reviews}
        onDelete={handleDelete}
        onEdit={handleEdit}
      />
    </div>
  );
};

const ReviewList = ({ reviews, onDelete, onEdit }) => {
  return (
    <ul>
      {reviews.map((review, index) => (
        <li key={index}>
          <div>
            <strong>{review.name}</strong>: {review.review}
          </div>
          <div>
            {[...Array(review.rating)].map((_, i) => (
              <FaStar key={i} color="#ffc107" size={20} />
            ))}
          </div>
          <div>
            <button className="button" onClick={() => onEdit(index)}>
              Edit
            </button>
            <button className="button" onClick={() => onDelete(index)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ReviewForm;
