import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import DownArrow from "../assets/profilepage/downarrow.png";
import gigImage from "../../src/assets/populargigs/gigspix.png";

import { faDatabase } from "@fortawesome/free-solid-svg-icons";
import { Link, useLocation } from "react-router-dom";
import Smaller_Card from "../components/Cards/Smaller_Card";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { resetSearchQuery } from "../store/Slices/gigslice";

export default function Giglist() {
  const [filters, setFilters] = useState({
    category: "",
    priceMin: "",
    priceMax: "",
    delivery: "",
  });
  const location = useLocation()
  const { allGigs, error, searchQuery } = useSelector((state) => state?.gig);
  console.log(allGigs,'jj');

  const categories =
    allGigs && allGigs.length
      ? Array.from(new Set(allGigs.map((gig) => gig.category.trim())))
      : [];
  console.log(categories);

  const deadlines =
    allGigs && allGigs.length
      ? Array.from(
          new Set(
            allGigs.flatMap((gig) =>
              Object.values(gig.pricing).map((pkg) => pkg.delivery)
            )
          )
        )
      : [];

      const fromAboutSeller = location.state?.fromAboutSeller || false;

  const filteredGigs = allGigs
    ? allGigs.filter((gig) => {
        if (!gig.title.toLowerCase().includes(searchQuery.toLowerCase()) && ( fromAboutSeller ? !gig?.serviceTags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())): true )
        )
          return false;
        
          
        if (filters.category && gig.category.trim() !== filters.category)
          return false;

        const price = gig?.pricing?.standard?.price;
        if (filters.priceMin !== "" && price < Number(filters.priceMin))
          return false;
        if (filters.priceMax !== "" && price > Number(filters.priceMax))
          return false;

        if (filters.delivery && filters.delivery !== "Any Deadline") {
          const hasDeadline = Object.values(gig.pricing).some(
            (pkg) => pkg.delivery === filters.delivery
          );
          if (!hasDeadline) return false;
        }

        return true;
      })
    : [];

  const resetFilter = () => {
    setFilters({
      category: "",
      priceMin: "",
      priceMax: "",
      delivery: "",
    });
  };

  
  return (
    <div className="bg-gradient-to-r from-black to-purple-900">
      <div className="flex justify-center mx-[4%]">
        <div className="bg-gradient-to-r from-purple-700 to-pink-500 px-12 mt-[5%] rounded-3xl pt-10 pb-10 h-[270px] shadow-lg w-[1200px]">
          <h2 className="text-white text-start text-3xl mb-4">welcome back</h2>
          <div className="flex flex-row justify-around">
            <div className="bg-[#D9D9D980] rounded-xl p-5">
              <h1 className="text-white mb-3">Recommended for you</h1>
              <div className="flex flex-row text-white gap-x-5 justify-around items-center">
                <FontAwesomeIcon
                  icon={faDatabase}
                  size="xl"
                  className="text-gray-500 p-2 border rounded-full border-white"
                />
                <div>
                  <h1 className="text-xl">Get matched with freelancers</h1>
                  <p>create A brief and get custom offers</p>
                </div>
                <button className="border border-white p-2 rounded-lg">
                  create brief
                </button>
              </div>
            </div>
            <div className="bg-[#D9D9D980] rounded-2xl p-5">
              <h1 className="text-white mb-3">Recommended for you</h1>
              <div className="flex flex-row text-white gap-x-5 justify-around items-center">
                <FontAwesomeIcon
                  icon={faDatabase}
                  size="xl"
                  className="text-gray-500 p-2 border rounded-full border-white"
                />
                <div>
                  <h1 className="text-xl">Get matched with freelancers</h1>
                  <p>create A brief and get custom offers</p>
                </div>
                <button className="border border-white p-2 rounded-xl">
                  create brief
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="py-4 px-6 mx-[4%] my-[70px]">
        <div className="py-4 px-4 mx-4 my-10">
          <h2 className="text-white mb-4 font-semibold text-xl sm:text-2xl ml-4">
            Filters
          </h2>
          <div className="flex flex-wrap gap-4 justify-center">
            {/* Category Filter */}
            <div>
              <select
                value={filters.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-5 text-sm sm:text-xl rounded-lg outline-none h-12"
              >
                <option className="text-gray-600 text-sm" value="">
                  Category
                </option>
                {categories.map((category, index) => (
                  <option
                    key={index}
                    className="text-gray-600 text-sm"
                    value={category}
                  >
                    {category}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Inputs */}
            <div className="flex gap-2 items-center bg-gradient-to-r from-pink-500 to-purple-600 px-4 rounded-lg">
              <input
                type="number"
                placeholder="Min Price"
                value={filters.priceMin}
                onChange={(e) => {
                  let input = e.target.value;
                  if (input === "") {
                    setFilters({ ...filters, priceMin: "" });
                    return;
                  }
                  input = input.replace(/^0+(?=\d)/, "");
                  if (Number(input) >= 0) {
                    setFilters({ ...filters, priceMin: input });
                  }
                }}
                className="w-28 bg-transparent text-white placeholder-white/60 text-lg pt-2 px-2 outline-none focus:border-white border-b mb-2 no-spinner"
              />

              <span className="text-white">-</span>

              <input
                type="number"
                placeholder="Max Price"
                value={filters.priceMax}
                onChange={(e) => {
                  let input = e.target.value;
                  if (input === "") {
                    setFilters({ ...filters, priceMax: "" });
                    return;
                  }
                  input = input.replace(/^0+(?=\d)/, "");
                  if (Number(input) >= 0) {
                    setFilters({ ...filters, priceMax: input });
                  }
                }}
                className="w-28 bg-transparent text-white placeholder-white/60 text-lg pt-2 px-2 outline-none focus:border-white mb-2 border-b no-spinner"
              />
            </div>

            {/* Deadline Filter Dropdown */}
            <div>
              <select
                onChange={(e) =>
                  setFilters({ ...filters, delivery: e.target.value })
                }
                value={filters.delivery || "Any Deadline"}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 text-sm sm:text-xl rounded-lg flex items-center outline-none h-12"
              >
                <option className="text-gray-600 text-sm" value="Any Deadline">
                  Deadline
                </option>
                {deadlines.map((deadline, idx) => (
                  <option
                    key={idx}
                    className="text-gray-600 text-sm"
                    value={deadline}
                  >
                    {deadline}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Filters Button */}
            <button
              onClick={resetFilter}
              className="bg-gray-50/10 text-white py-2 px-6 text-sm sm:text-lg rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              Reset Filters
            </button>
          </div>

          {/* Price Validation Error */}
          {filters.priceMin !== "" &&
            filters.priceMax !== "" &&
            Number(filters.priceMin) > Number(filters.priceMax) && (
              <div className="flex justify-center w-full">
                <p className="text-red-500 mt-2 px-4 text-xs text-center mr-[4.5rem]">
                  Min Price cannot be greater than Max Price!
                </p>
              </div>
            )}
        </div>
      </div>

      {/* Gigs List Section */}
      <div className="bg-gradient-to-r from-black to-purple-900">
        <div className="py-4 px-6 mx-[4%]">
          <div className="flex space-x-10 justify-center mb-4">
            {/* Optionally, you can add a search input here */}
          </div>
        </div>

        <div className="mx-[4%]">
          <h2 className="text-4xl font-normal mb-10 text-center text-white">
            All Gigs
          </h2>
          {!error && filteredGigs.length !== 0 ? (
            <div className="flex flex-wrap justify-center gap-x-10 gap-y-6 mb-10">
              {filteredGigs.map((gig) => (
                <Link to={`/aboutseller/${gig._id}`} key={gig._id}>
                  <Smaller_Card
                    title={gig.title}
                    rating={gig.rating}
                    price={gig?.pricing?.standard?.price}
                    image={gig.servicesImages[0]?.imgUrl}
                  />
                </Link>
              ))}
            </div>
          ) : !error && allGigs.length === 0 ? (
            <div className="border border-gray-300 text-white mb-5 px-4 py-3 rounded-md text-center">
              <p className="font-semibold">No Gigs found</p>
              <p className="text-sm">
                It seems like there's nothing here yet. Check back later!
              </p>
            </div>
          ) : !error && filteredGigs.length === 0 ? (
            <div className="border border-gray-300  mb-5  text-white px-4 py-3 rounded-md text-center">
              <p className="font-semibold">No Gigs found</p>
              <p className="text-sm">
                It seems like there's nothing here yet. Check back later!
              </p>
            </div>
          ) : (
            <div
              className="border-1 border-red-800 text-red-700 p-4"
              role="alert"
            >
              <p className="font-bold">Error</p>
              <p>
                Something went wrong while listing gigs! Please try again later.
              </p>
            </div>
          )}
          <div className="flex justify-center">
            {/* <button className="bg-gradient-to-br mb-3 from-[#DE0588] to-[#460BCB] rounded-xl text-white px-5 py-4">
                View More
              </button> */}
          </div>
        </div>
      </div>
    </div>
  );
}