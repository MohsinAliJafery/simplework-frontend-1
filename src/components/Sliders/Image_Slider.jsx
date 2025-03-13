import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { faL } from "@fortawesome/free-solid-svg-icons";

const Image_Slider = ({ images }) => {

  
  const settingsMain = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
  };

  const thumbnails = images.slice(1);

const settingsThumbs = {
  infinite: thumbnails.length > 1, // Only enable infinite scrolling if there’s more than one thumbnail
  slidesToShow: Math.min(thumbnails.length, 3), // Use thumbnails.length instead of images.length - 1 for clarity
  slidesToScroll: 1,
  dots: false,
  focusOnSelect: true,
  centerMode: false,
  centerPadding: "0",
  arrows: thumbnails.length > 1, // only show arrows if more than one image

};

  

  const mainImage =  images[0].imgUrl

  console.log(thumbnails)

  return (
    <div className="py-10">
      <div className="container mx-auto">
        {/* If only one image, display it as a static image */}
        {/* {images.length === 1 ? (
          <div className="relative w-[60%] h-[60%] mx-auto">
            <img
              src={images[0].imgUrl}
              alt={`Main Slide ${images[0].publicId}`}
              className="w-full h-[500px] object-cover rounded-lg"
              style={{ maxHeight: "500px" }}
            />
          </div>
        ) : ( */}
          <>
            {/* Main Slider */}
            <Slider {...settingsMain} className="relative w-[60%] h-[60%] mx-auto container">
              {images.map((image) => (
                <div>
                  <img
                    src={image.imgUrl}
                    // src={images[0].imgUrl}
                    alt={`Main Slide ${images[0].imgUrl}`}
                    className="w-full h-[500px] object-cover rounded-lg"
                    style={{ maxHeight: "500px" }}
                  />
                </div>
               ))} 
            </Slider>

            {/* Thumbnail Slider - Only show if more than one image */}
            {images.length >= 1 && (
              <div className="mt-4 w-[60%] mx-auto">
                <Slider {...settingsThumbs} className="relative w-[80%] mx-auto custom-slider">
                  {thumbnails.map((image) => (
                    <div key={image.publicId}  
                    
                    className={`${
                      images.length === 2 ? "px-12" : "px-4"
                    }`} >
                      <img
                        src={image.imgUrl}
                        alt={`Thumbnail ${image.publicId}`}
                        className="w-40 h-40 object-cover rounded-lg"
                        style={{ width: "160px", height: "160px" }}
                      />
                    </div>
                  ))}
                </Slider>
              </div>
            )}
          </>
        
      </div>
    </div>
  );
};

export default Image_Slider;