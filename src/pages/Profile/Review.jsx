import React from "react";
import ReviewCard from "../../components/Cards/ReviewCard";

const Review = () => {
  return (
    <div className="flex flex-wrap gap-5 justify-between">
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
      <ReviewCard />
    </div>
  );
};

export default Review;
