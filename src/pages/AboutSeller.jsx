import { useEffect, useState } from "react";
import Profileimg from "../assets/profilepage/profimg.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faComments, faPhone } from "@fortawesome/free-solid-svg-icons";
import Star from "../assets/profilepage/star.png";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Image_Slider from "../components/Sliders/Image_Slider";
import { capitalizeFirstLetter } from "../utils/CapitalizeFirstWord";
import avatar from "../assets/profilepage/profimg.png";
import {
  AddToFavourite,
  GetSingleServiceApi,
  RemoveFromFavourite,
  GetFavouriteGigs,
} from "../Api_Requests/Api_Requests";
import Loader from "../components/Loader/Loader";
import CustomButton from "../components/Buttons/CustomButton";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchGigDetails,
  updateSelectedPlan,
} from "../store/Slices/singlegigslice";
import GradientBtn from "../components/Buttons/GradientBtn";
import { CircularProgress } from "@mui/material";
import { setGigSellerId, setSearchQuery } from "../store/Slices/gigslice";

export default function AboutSeller() {
  let user = JSON.parse(localStorage.getItem("user"));
  // const [currentGig, SetCurrentGig] = useState(null);
  // const [loading, setLoading] = useState(true);
  const [allowFavourite, setAllowFavourite] = useState(true);
  // const [selectedPlan,setSelectedPlan] = useState('basic')
  const { gigId } = useParams();
  const [userFavouriteGigs, setUserFavouriteGigs] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user")) || {
    favouriteGigs: [],
  };

  // Check if the gigId exists in storedUser.favouriteGigs
  const isFavourite = storedUser.favouriteGigs.includes(gigId);

  const handleOrderClick = (e) => {
    dispatch(setGigSellerId(currentGig?.user_id?._id));
    if (!user) {
      e.preventDefault();
      toast.error("Login to create order", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    }
  };

  useEffect(() => {
    const fetchFavourites = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("user")) || {
          favouriteGigs: [],
        };
        setUserFavouriteGigs(
          Array.isArray(storedUser.favouriteGigs)
            ? storedUser.favouriteGigs
            : []
        );

        // Fetch from backend
        const response = await GetFavouriteGigs();
        if (response?.status === 200) {
          setUserFavouriteGigs(
            Array.isArray(response.data.favouriteGigs)
              ? response.data.favouriteGigs
              : []
          );
        }
      } catch (error) {
        console.error("Error fetching favourite gigs:", error);
      }
    };
    fetchFavourites();
  }, []);

  const handleToggleFavourite = async (id) => {
    try {
      let user = JSON.parse(localStorage.getItem("user")) || {
        favouriteGigs: [],
      };
      let updatedFavourites = [...user.favouriteGigs];

      if (updatedFavourites.includes(id)) {
        // ✅ Remove from favourites if it already exists
        await RemoveFromFavourite({ gigId: id });
        toast.success("Removed from favourites!");
        updatedFavourites = updatedFavourites.filter((gigId) => gigId !== id);
      } else {
        // ✅ Add to favourites if not already added
        await AddToFavourite({ gigId: id });
        toast.success("Added to favourites!");
        updatedFavourites.push(id);
      }

      // ✅ Update state and localStorage to reflect the change immediately
      setUserFavouriteGigs([...updatedFavourites]); // Ensures React re-renders
      user.favouriteGigs = updatedFavourites;
      localStorage.setItem("user", JSON.stringify(user));
    } catch (error) {
      toast.error("Error updating favourites!");
    }
  };

  const handlePlanClick = (plan) => {
    dispatch(updateSelectedPlan(plan));
  };

  const {
    gig: currentGig,
    selectedPlan,
    loading,
    error,
  } = useSelector((state) => state.singlegig);
console.log(currentGig?.description,'gig')
  const textFormatting = currentGig?.textFormatting;

  const applyFormatting =
    textFormatting &&
    textFormatting.color &&
    textFormatting.bold &&
    textFormatting.italic &&
    textFormatting.underline;

  useEffect(() => {
    dispatch(fetchGigDetails(gigId));
  }, [dispatch, gigId]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          width: "100vw",
        }}
      >
        <CircularProgress />
      </div>
    );
  }

  const handleTagClick = (tag) => {
    dispatch(setSearchQuery(tag));
    navigate("/gigList", { state: { fromAboutSeller: true}});
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-gradient-to-r from-black to-purple-900">
      {loading ? (
        <div className="flex justify-center items-center h-[100vh] bg-[black] relative">
          <Loader />
        </div>
      ) : !currentGig && !loading ? (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4">
          <div className=" text-center p-6 border-md border-red-900 rounded-lg shadow-xl max-w-md w-full">
            <h1 className="text-4xl text-red-900 mb-4">Error</h1>
            <p className="text-lg mb-4">
              Error fetching Gig Details, Try after some time!{" "}
            </p>
          </div>
        </div>
      ) : (
        <div>
          <div className="flex flex-col lg:flex-row ">
            {/* <h2 className="text-white ml-[10%] text-3xl font-bold ">
        {currentGig.title}
      </h2> */}
            <div className="w-full lg:w-[75%] flex flex-col flex-grow">
              <h2 className="text-white ml-[10%] text-3xl mt-6 font-bold ml-[auto] mr-[auto] ">
                {currentGig?.title}
              </h2>
              <Image_Slider images={currentGig?.servicesImages} />
            </div>
            <div className="flex flex-col gap-y-10 items-center justify-center pb-5 lg:w-[25%]">
              <div className="bg-white w-[80%] mr-5 max-w-sm text-black flex flex-col items-start gap-4 p-6 rounded-2xl shadow-lg">
                <div className="flex flex-start gap-4">
                  <Link to={"/profilepage"}>
                    <img
                      className="w-[60px] h-[60px] rounded-full border object-cover"
                      src={currentGig?.user_id?.profileImage || avatar}
                      alt="Profile"
                    />
                  </Link>
                  <div className="text-center mt-3">
                    <p className="text-lg font-semibold">
                      {capitalizeFirstLetter(currentGig?.user_id?.username)}
                    </p>
                    <p className="text-black text-sm">Online</p>
                  </div>
                </div>

                <div className="flex w-full justify-center gap-x-3 mt-4">
                  <Link
                    to="/seller/chat"
                    className="w-1/2"
                    onClick={handleOrderClick}
                  >
                    <GradientBtn
                      title={"Contact"}
                      className="w-full text-white py-2 rounded-md bg-gradient-to-r from-purple-600 to-pink-500"
                    >
                      Contact
                    </GradientBtn>
                  </Link>
                </div>
              </div>
              <div className="bg-[#FFFFFF4A] mt-5 w-[80%] min-h-[45%] mr-5 rounded-lg pb-4">
                <div className="flex">
                  {["basic", "standard", "premium"].map((plan) => (
                    <button
                      key={plan}
                      className={`w-1/3 hover:bg-white/60 px-4 py-3 
          ${
            selectedPlan === plan
              ? "bg-white/60 border-b-2 border-b-white/60"
              : "bg-slate-200/20"
          } 
          ${plan === "basic" ? "rounded-tl-lg " : ""} 
          ${plan === "premium" ? "rounded-tr-lg" : ""}`}
                      onClick={() => handlePlanClick(plan)}
                    >
                      <span className="text-white text-sm font-bold">
                        {plan.toUpperCase()}
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex flex-col gap-y-3 py-3 px-3 text-white">
                  <h1 className="text-xl font-bold">
                    $ {currentGig?.pricing[selectedPlan]?.price}
                  </h1>
                  <h3 className="text-lg font-semibold">
                    {capitalizeFirstLetter(
                      currentGig?.pricing[selectedPlan]?.packageDetails
                    )}
                  </h3>
                  <ul className="flex flex-col gap-y-3">
                    <li>
                      Delivery time:{" "}
                      {currentGig?.pricing[selectedPlan]?.delivery}
                    </li>
                    <li>
                      Revisions: {currentGig?.pricing[selectedPlan]?.revisions}
                    </li>
                    <li>
                      Screens: {currentGig?.pricing[selectedPlan]?.totalScreen}
                    </li>
                  </ul>
                </div>
                <Link
                  to="/orderdetail"
                  className="w-1/2"
                  onClick={handleOrderClick}
                >
                  <div className="flex justify-center">
                    <button className="w-[80%] mt-7 text-white border border-white py-3 px-1 rounded-lg cursor-pointer hover:bg-gradient-to-l hover:border-none from-[#DE0588] to-[#460BCB] hover:text-white">
                      Order
                    </button>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="mx-[4%] md:pl-10">
            <div className="flex flex-col gap-y-6 text-white">
              <h1 className="text-4xl font-bold">About this gig:</h1>
              <div
                className="text-xl overflow-auto break-words"
                dangerouslySetInnerHTML={{ __html: currentGig?.description }}
                style={{
                  ...(textFormatting?.color
                    ? { color: textFormatting.color }
                    : {}),
                  ...(textFormatting?.bold ? { fontWeight: "bold" } : {}),
                  ...(textFormatting?.italic ? { fontStyle: "italic" } : {}),
                  // ...(textFormatting?.underline
                  //   ? { textDecoration: "underline" }
                  //   : {}),
                }}
              />
            </div>
            <div className="flex flex-col gap-y-6 text-gray-400 mt-6">
              <h1 className="text-2xl text-white font-bold">What's included</h1>
              <ul className="text-xl text-white-400 py-2 list-disc pl-5">
                <li>Graphic Designing</li>
                <li>Web developing</li>
                <li>Designing</li>
              </ul>
            </div>

            <div className="flex flex-col gap-y-6 text-white mt-10">
              {allowFavourite && (
                <div>
                  {isFavourite ? (
                    <CustomButton
                      onClick={() => handleToggleFavourite(currentGig._id)}
                      label="Remove from Favourites"
                      bgColor="bg-[#FF4B4B]"
                      hoverColor="hover:bg-[#D93A3A]"
                      icon={FaRegHeart}
                    />
                  ) : (
                    <CustomButton
                      onClick={() => handleToggleFavourite(currentGig._id)}
                      label="Add To Favourites"
                      bgColor="bg-[#6B4B91]"
                      hoverColor="hover:bg-[#593978]"
                      icon={FaHeart}
                    />
                  )}
                </div>
              )}
              { currentGig?.serviceTags.length >  0 && !currentGig?.serviceTags.includes('') && (
                <>
                  <h1 className="text-4xl font-bold">Tags</h1>
                  <div className="flex flex-wrap gap-2">
                    {currentGig?.serviceTags.map((tag, index) => (
                      <span
                        key={index}
                        onClick={() => handleTagClick(tag)}
                        className="cursor-pointer px-3 py-1 text-sm font-semibold text-white bg-gradient-to-r from-indigo-500 to-purple-500 rounded-md transition-all"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </>
              ) }
            </div>

            {/* <div className="flex flex-col gap-y-6 text-white mt-10">
              <h1 className="text-4xl font-bold">What I Require?</h1>
              <ul className="flex flex-col gap-y-3 text-gray-500">
                {currentGig.questions.length === 0 ? (
                  <p className="text-gray-500">No Questions yet!</p>
                ) : (
                  currentGig.questions.map((q) => <li>{q}</li>)
                )}
              </ul>
            </div> */}
          </div>

          <div>
            <div className="flex flex-row gap-x-5  text-white mx-[4%] mt-12 ">
              <Link to={"/profilepage"} className="">
                <img className="mt-5" src={Profileimg} alt="Profile" />
                <img
                  className="relative -top-60 left-40"
                  src={Star}
                  alt="Star"
                />
              </Link>
              <div className="flex flex-col gap-y-3">
                <h1 className="text-3xl font-bold">UI/UX Designer</h1>
                <p className="text-xl"> @{currentGig?.user_id?.username}</p>

                <div className="flex items-center">
                  <FontAwesomeIcon
                    icon={faStar}
                    size="2x"
                    className="text-yellow-500"
                  />
                  <h1 className="ml-2 font-bold text-xl">
                    4.5 <span className="font-normal text-lg">(23)</span>
                  </h1>
                </div>

                <div className="flex items-center mt-4">
                  <FontAwesomeIcon
                    icon={faComments}
                    size="2x"
                    className="white"
                  />
                  <h1 className="ml-2 font-semibold text-xl">
                    English, German, Spanish
                  </h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
