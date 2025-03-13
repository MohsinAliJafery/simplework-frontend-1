import React, { useEffect, useState } from "react";
import Loader from "../components/Loader/Loader";
import { GetFavouriteGigs, RemoveFromFavourite } from "../Api_Requests/Api_Requests";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


export default function FavouriteGigs() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [favouriteGigs, setFavouriteGigs] = useState(false);

  const handleRemoveFavourite = async (id) => {
    try {
      await RemoveFromFavourite({ gigId: id })
      toast.success("Removed From favourite!")
      setFavouriteGigs((prev) => prev.filter((x) => x._id !== id))
      let user = JSON.parse(localStorage.getItem('user'))
      user.favouriteGigs = user.favouriteGigs.filter((gig) => gig !== id)
      localStorage.setItem('user', JSON.stringify(user))

    } catch (error) {
      toast.error("Error Removing From Favourite!")
    }
  }

  const fetchAllFavourite = async () => {
    try {
      setError(false);
      setLoading(true);
      const response = await GetFavouriteGigs();
      setLoading(false);
      if (response.status === 200) {
        const favouriteGigs = response.data.favouriteGigs.favouriteGigs;
        setFavouriteGigs(favouriteGigs);
      } else {
        throw new Error("Error fetching jobs!");
      }
    } catch (error) {
      setError(true);
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchAllFavourite();
  }, []);
  return loading ? (
    <div className="flex justify-center items-center h-[100vh] bg-[black] relative">
      <Loader />
    </div>
  ) : error ? (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
      <div className=" text-center p-6 border-md border-red-900 rounded-lg shadow-xl max-w-md w-full">
        <h1 className="text-4xl text-red-900 mb-4">Error</h1>
        <p className="text-lg mb-4">
          Error fetching Favourite Gigs, Try after some time!{" "}
        </p>
      </div>
    </div>
  ) : (
    <div className="min-h-screen text-white">
      {favouriteGigs.length > 0 ? (
        <div>
          {/* Header Section */}
          <div className="text-center py-6">
            <div className="flex items-center justify-center gap-2 text-xl font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-red-500"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
              <span>{favouriteGigs.length} Favourite Gigs</span>
            </div>
          </div>

          {/* Cards Section */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "20px",
              flexWrap: "wrap",
            }}
            className="mt-4 px-4"
          >
            {favouriteGigs.map((item) => (

                <div
                  key={item._id}
                  className="relative bg-gradient-to-r from-[#2B193F] to-[#41275C] text-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300 w-[20rem] md:w-[25%]"
                >
                  {/* Image Section */}
                  <Link to={`/aboutseller/${item._id}`} >

                  <div className="relative w-full h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={item?.servicesImages[0]?.imgUrl}
                      alt={`${item.name}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  </Link>


                  {/* Content Section */}
                  <div className="p-4">
                    <h2 className="text-lg font-bold mb-1 truncate">
                      {item.title}
                    </h2>

                    {/* Rating Section */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center">
                        {Array.from({ length: 1 }).map((_, i) => (
                          <svg
                            key={i}
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-yellow-400"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                          </svg>
                        ))}
                      </div>
                      <span className="text-gray-300 text-sm">
                        ({item.rating}.0)
                      </span>
                      <span className="text-gray-300 text-sm ml-auto">
                        Price: ${item?.pricing?.standard?.price}
                      </span>
                    </div>
                    {/* Remove Button */}
                    <button
                      onClick={() => handleRemoveFavourite(item._id)}
                      className="mt-4 w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition-transform transform hover:scale-105"
                    >
                      Remove from Favourite
                    </button>
                  </div>
                </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-20 w-20 text-gray-400 mb-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm-8 4c0 4.42 3.58 8 8 8s8-3.58 8-8"
            />
          </svg>
          <p className="text-lg text-gray-400">No favourite gigs yet!</p>
        </div>
      )}
    </div>
  );
}
