import Search from "../../assets/search-normal.png";
import Heroimg from "../../assets/heroimg.png";
import Giglistbox from "../../assets/profilepage/gigbox.png";
import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetSearchQuery, setSearchQuery } from "../../store/Slices/gigslice";

export default function Hero() {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  useEffect(() => {
    if (location.pathname !== "/gigList") {
      console.log(location.pathname, "---------");
      setSearch("");
      dispatch(resetSearchQuery());
    }
  }, [location, dispatch]);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    dispatch(setSearchQuery(value));
  };

  const handelChangeLocation = () => {
    if (location.pathname == "/") {
      navigate("/gigList");
    }
  };
  const navigate = useNavigate();
  return (
    <div className="bg-[#1c081c] h-auto md:h-[90vh] flex flex-col md:flex-row justify-center items-center gap-y-5 md:gap-x-5">
      {/* Left content */}
      <div className="w-full md:w-3/5 lg:w-2/5 flex flex-col items-start gap-y-3 p-5">
        <h1 className="text-white text-4xl md:text-5xl font-bold leading-tight">
          Call <span className="text-[#fe5284]">Simplework</span>
          <span className="text-[#ffe35c]">work's</span> communication <br />{" "}
          <span className="text-[#a0e4f7]">experts.</span>
        </h1>
        <p className="text-[#FFFFFF] text-sm md:text-base">
          Every conversation is a business opportunity. Make the most of it with
          simplework’s human-powered virtual receptionist and live chat
          solutions.
        </p>
        {/* Search input */}
        <div className="flex items-center justify-between border w-full md:w-3/4 border-gray-500 rounded-2xl px-3">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            value={search}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handelChangeLocation();
              }
            }}
            className="p-2 bg-transparent text-white border-white outline-none placeholder-gray-300 md:w-[12vw] xl:w-full md:text-[12px] xl:text-lg"
          />
          <img
            src={Search}
            alt="Search Icon"
            className="w-5 h-5 cursor-pointer"
            onClick={handelChangeLocation}
          />
        </div>
        {/* Buttons */}
        <div className="flex flex-col md:flex-row gap-y-3 md:gap-x-5 mt-2">
          <button className="bg-pink-500 flex flex-row items-center text-white gap-x-2 px-6 md:px-12 py-4 md:py-5 rounded-lg">
            <img src={Giglistbox} alt="Gig Icon" className="w-6 h-6" />
            <h1
              className="text-lg md:text-2xl font-bold whitespace-nowrap"
              onClick={() => {
                navigate("/gigList");
              }}
            >
              Gig Listing
            </h1>
          </button>
          <Link
            to="seller/findjob"
            className="bg-[#460bcb] flex flex-row items-center w-fit text-white gap-x-2 px-6 md:px-8 py-4 md:py-5 rounded-lg"
          >
            <img src={Giglistbox} alt="Seller Job Icon" className="w-6 h-6" />
            <h1 className="text-lg md:text-2xl font-bold whitespace-nowrap">
              Seller Job Listing
            </h1>
          </Link>
        </div>
      </div>

      {/* Right image */}
      <div className="w-full md:w-3/5 lg:w-2/5 flex justify-center">
        <img className="w-[80%] h-auto md:h-[70vh]" src={Heroimg} alt="Hero" />
      </div>
    </div>
  );
}
