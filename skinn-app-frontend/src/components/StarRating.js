import React from "react";
import "./StarRatingInput.css";

function StarRating({ rating, maxRating, symbol, color }) {
  console.log("prop rating", rating, maxRating)
  return (
    <div className="ratings">
      <div className="empty-stars">{symbol.repeat(maxRating)}</div>
      <div
        className="full-stars"
        style={{
          width: `${(rating / maxRating) * 100}%`,
          WebkitTextStroke: `8px ${color}`
        }}
      >
        {symbol.repeat(maxRating)}
      </div>
    </div>
  );
}

StarRating.defaultProps = {
  rating: 0,
  maxRating: 5,
  symbol: "🌿",
  color: "transparent"
};

export default StarRating;
