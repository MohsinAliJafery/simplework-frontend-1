import {
  faMapMarked,
  faMapMarkedAlt,
  faSearch,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllJobs, getCategories } from "../Api_Requests/Api_Requests";
import { PuffLoader } from "react-spinners";
import avatar from "../assets/profilepage/profimg.png";
import "react-toastify/dist/ReactToastify.css";
import { truncateText } from "../utils/TruncateText";

export default function FindJob() {
  const [allJobs, setAllJobs] = useState([]);

  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [filters, setFilters] = useState({
    category: "",
    priceMin: "",
    priceMax: "",
    level: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const fetchAllJobs = async () => {
    try {
      setLoading(true);
      const response = await getAllJobs(filters);
      setLoading(false);
      if (response?.data?.jobs) {
        setAllJobs(response?.data?.jobs || []);
      }
    } catch (error) {
      if (error) setAllJobs([]);
      setLoading(false);
    }
  };

  const resetFilter = () => {
    setFilters({
      category: "",
      priceMin: "",
      priceMax: "",
      level: "",
    });
  };

  useEffect(() => {
    fetchAllJobs();
  }, [filters]);

  const fetchCategories = async () => {
    const response = await getCategories();
    if (response.status === 200) {
      const data = await response.data;
      setCategories(data.categories);
    } else {
      console.log("Error fetching categories!");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const filteredJobs = allJobs.filter((job) =>
    JSON.stringify(job).toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-gradient-to-r from-black to-purple-900">
      <div className="flex justify-center mx-4">
        <div className="bg-gradient-to-r from-purple-700 to-pink-500 px-6 sm:px-12 mt-8 rounded-3xl pt-6 pb-8 shadow-lg w-full max-w-4xl">
          <h2 className="text-white text-start text-lg sm:text-2xl mb-4">
            Find Your Job Here
          </h2>
          <div className="bg-white rounded-full flex flex-col sm:flex-row items-center p-2 shadow-md justify-between">
            <div className="flex flex-col sm:flex-row w-full">
              <div className="flex items-center px-4 border-gray-300 w-full">
                <FontAwesomeIcon
                  icon={faSearch}
                  size="x"
                  className="text-black"
                />
                <input
                  type="text"
                  placeholder="Job Title Or Experience"
                  className="ml-2 p-2 text-gray-700 focus:outline-none w-full"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            {/* <button className="bg-purple-700 text-white px-6 py-2 rounded-full hover:bg-purple-800 mt-4 sm:mt-0 sm:ml-4 w-auto sm:w-auto">
              Search
            </button> */}
          </div>
        </div>
      </div>

      {/* Filters Section */}

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
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-5 text-sm sm:text-xl rounded-lg outline-none h-12 cursor-pointer"
            >
              <option className="text-gray-600 text-sm" value={""}>
                Category
              </option>
              {categories.map((category, index) => (
                <option
                  key={index}
                  className="text-gray-600 text-sm"
                  value={category?.category}
                >
                  {category?.category}
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

          {/* Experience Level Filter */}
          <div>
            <select
              onChange={(e) =>
                setFilters({ ...filters, level: e.target.value })
              }
              value={filters.level || "Any Level"}
              className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-2 px-4 text-sm sm:text-xl rounded-lg flex items-center outline-none h-12 cursor-pointer"
            >
              <option className="text-gray-600 text-sm" value="Any Level">
                Any Level
              </option>
              {["Junior Level", "Mid Level", "Senior Level"].map(
                (level, idx) => (
                  <option
                    key={idx}
                    className="text-gray-600 text-sm"
                    value={level}
                  >
                    {level}
                  </option>
                )
              )}
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
        {filters.priceMin !== "" && filters.priceMax !== "" && (
          <>
            {Number(filters.priceMin) > Number(filters.priceMax) && (
              <div className="flex justify-center w-full">
                <p className="text-red-500 mt-2 px-4 text-xs text-center mr-[4.5rem]">
                  Min Price cannot be greater than Max Price!
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Job Listings */}
      <div className="min-h-[100vh] p-6 mt-10 mx-4 sm:mx-8">
        {loading ? (
          <div className="flex justify-center">
            <PuffLoader color="#fa4697" height={100} width={100} />
          </div>
        ) : allJobs.length === 0 ? (
          <div className="border border-gray-300 text-white px-4 py-3 rounded-md text-center">
            <p className="font-semibold">No Jobs found!</p>
          </div>
        ) : (
          <div className="fade-in">
            <div className="hidden sm:grid sm:grid-cols-3 ml-1 text-white mb-6 text-lg sm:text-xl font-semibold">
              <div className="text-left">Jobs</div>
              <div className="text-left">Experience</div>
              <div className="text-left">Price</div>
            </div>
            {filteredJobs.map((job) => (
              <Link to={`/seller/jobdetails/${job._id}`} key={job._id}>
                <div className="bg-gray-100/10 grid grid-cols-1 sm:grid-cols-3 text-white font-bold text-lg sm:text-xl gap-4 items-center p-4 bg-opacity-50 mb-4 rounded-lg">
                  <div className="flex items-center gap-4">
                    <img
                      src={job.profileImage || avatar}
                      alt={job.title}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover"
                    />
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold">
                        {job.title}
                      </h2>
                      <p className="text-sm text-gray-400">
                        {job?.category?.category_name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {truncateText(job.description, 40)}
                      </p>
                    </div>
                  </div>
                  <div>{job.experience_level}</div>
                  <div>{`$${job.salary.min}-$${job.salary.max}`}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
