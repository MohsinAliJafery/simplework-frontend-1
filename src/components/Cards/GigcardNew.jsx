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

const GigCardNew = ({ title, rating, price, image }) => {
  return (
    <div className="bg-transparent text-white rounded-lg shadow-lg overflow-hidden w-[400px] mx-4">
      <img src={image} alt="Gig" className="w-full h-[300px] object-cover" />

      <div className="p-4">
        <p className="mb-3 text-sm">{title}</p>
        <div className="flex items-center mb-2">
          <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-2" />
          <span className="text-lg">{rating}</span>
        </div>

        <p className="text-md font-semibold">Price: ${price}</p>
      </div>
    </div>
  );
};

export default GigCardNew;
