import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import gigImage from "../../assets/populargigs/gigspix.png"; // Replace with your actual image path

// Example gig data
const gigs = [
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 4.5,
    price: 30,
    image: gigImage, // You can use the same image or different images for each gig
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 4.5,
    price: 30,
    image: gigImage,
  },
  {
    title:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    rating: 4.5,
    price: 30,
    image: gigImage,
  },
  // Add more gigs as needed
];

const Smaller_Card = ({ title, rating, price, image, className = "" }) => {
  return (
    <div
      className={`bg-transparent text-white rounded-lg shadow-lg overflow-hidden w-full sm:w-[280px] mx-auto sm:mx-4 my-4 ${className}`}
      style={{ maxWidth: "350px" }}
    >
      {/* Image Section */}
      <img
        src={image}
        alt="Gig"
        className="w-full h-[200px] sm:h-[250px] object-cover rounded-t-lg"
      />

      {/* Text and Info Section */}
      <div className="p-4">
        <p
          className="mb-3 text-sm sm:text-base font-semibold"
          style={{
            display: "-webkit-box",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: 2, // Limits the title to 2 lines
            overflow: "hidden",
          }}
        >
          {title}
        </p>
        <div className="flex items-center mb-2">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" />
          <span className="text-sm sm:text-md">{rating}</span>
        </div>

        <p className="text-sm sm:text-md lg:text-lg font-semibold">Price: ${price}</p>
      </div>
    </div>
  );
};

export default Smaller_Card;
