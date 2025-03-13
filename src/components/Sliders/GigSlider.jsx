import React, { useState, useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";
import Smaller_Card from "../Cards/Smaller_Card";
import { useSelector } from "react-redux";

const NextArrow = ({ className, style, onClick, onManualClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={() => {
        onManualClick();
        onClick();
      }}
    />
  );
};

const PrevArrow = ({ className, style, onClick, onManualClick }) => {
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={() => {
        onManualClick();
        onClick();
      }}
    />
  );
};

const GigSlider = () => {
  const { allGigs, error, searchQuery } = useSelector((state) => state?.gig);
  const navigate = useNavigate();
  const sliderRef = useRef(null);
  const manualTimeoutRef = useRef(null);

  // State for controlling the slider transition speed.
  const [transitionSpeed, setTransitionSpeed] = useState(1500);

  // State for manual mode.
  const [manualMode, setManualMode] = useState(false);

  // State to track the current slide index.
  const [currentSlide, setCurrentSlide] = useState(0);

  const filteredGigs = allGigs.filter((gig) =>
    gig.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleManualClickToggle = () => {
    if (manualTimeoutRef.current) {
      clearTimeout(manualTimeoutRef.current);
    }
    setTransitionSpeed(0);
    sliderRef.current.slickPause();
    setManualMode(true);

    manualTimeoutRef.current = setTimeout(() => {
      setTransitionSpeed(1500);
      sliderRef.current.slickPlay();
      setManualMode(false);
    }, 3000);
  };

  useEffect(() => {
    return () => {
      if (manualTimeoutRef.current) {
        clearTimeout(manualTimeoutRef.current);
      }
    };
  }, []);

  const settingsThumbs = {
    slidesToShow: 4,
    slidesToScroll: 1,
    speed: transitionSpeed,
    infinite: allGigs.length > 2,
    dots: false,
    focusOnSelect: true,
    centerMode: true,
    centerPadding: "5",
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    // Set the initial slide dynamically based on currentSlide
    initialSlide: currentSlide,
    // Track current slide index
    afterChange: (index) => setCurrentSlide(index),
    nextArrow: (
      <NextArrow onManualClick={handleManualClickToggle} />
    ),
    prevArrow: (
      <PrevArrow onManualClick={handleManualClickToggle} />
    ),
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  };

  return (
    <div className="py-8 lg:px-12 bg-[#222]">
      <div className="container mx-auto">
        <div className="mt-4 w-[80vw] lg:w-full mx-auto">
          {!error && allGigs.length !== 0 ? (
            <>
              <h2
                className="text-white text-xl sm:text-4xl mb-1 md:text-4xl mb-4"
                style={{ fontFamily: "poppins" }}
              >
                Gigs
              </h2>
              {/* 
                Use a key that combines both transitionSpeed and currentSlide.
                This ensures the slider re-mounts with the correct initial slide.
              */}
              <Slider
                key={`${transitionSpeed}-${currentSlide}`}
                ref={sliderRef}
                {...settingsThumbs}
              >
                {allGigs.map((gig) => (
                  <div key={gig._id} className="px-2 w-full">
                    <Link to={`/aboutseller/${gig._id}`}>
                      <Smaller_Card
                        title={gig.title}
                        rating={gig.rating}
                        price={gig.pricing?.standard?.price}
                        image={gig.servicesImages[0]?.imgUrl}
                      />
                    </Link>
                  </div>
                ))}
              </Slider>
            </>
          ) : !error && allGigs.length === 0 ? (
            <div className="border border-gray-300 text-white px-4 py-3 rounded-md text-center">
              <p className="font-semibold">No Gigs found</p>
              <p className="text-sm">
                It seems like there’s nothing here yet. Check back later!
              </p>
            </div>
          ) : (
            <div
              className="bg-black border border-red-700 text-red-700 px-4 py-3 rounded-lg relative"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline">
                {" "}
                Something went wrong while listing gigs.
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center">
        <button
          className="py-3 px-8 sm:px-10 rounded-md mt-10 bg-gradient-to-br from-[#DE0588] to-[#460BCB] text-lg sm:text-xl text-white"
          onClick={() => {
            navigate("/gigList");
          }}
        >
          View More
        </button>
      </div>
    </div>
  );
};
export default GigSlider;