import Profileimg from "../assets/profilepage/profimg.png";
import WebDesign from "../assets/profilepage/websitedesign.png";
import Badge from "../assets/profilepage/badge.png";
import Star from "../assets/profilepage/star.png";
import Part from "../assets/profilepage/part.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faComments, faPhone } from "@fortawesome/free-solid-svg-icons";
import gigImage from "../../src/assets/populargigs/gigspix.png";
import GigCardNew from "../components/Cards/GigcardNew";
import { useParams } from "react-router-dom";
import { getProfileData } from "../Api_Requests/Api_Requests";
import { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

export default function Profilepage() {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await getProfileData(id);
        console.log("Fetched profile:", response.data);
        setProfile(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setLoading(false);
      }
    };

    if (id) {
      fetchProfile();
    }
  }, [id]);

  // Function to format date to "time ago" format
  const getTimeAgo = (dateString) => {
    try {
      const date = new Date(dateString);
      return formatDistanceToNow(date, { addSuffix: true });
    } catch (error) {
      return "Unknown time";
    }
  };

  // Calculate star ratings breakdown for progress bars
  const calculateStarBreakdown = (reviews) => {
    if (!reviews || reviews.length === 0) return [0, 0, 0, 0, 0];

    const counts = [0, 0, 0, 0, 0]; // For 5,4,3,2,1 stars

    reviews.forEach((review) => {
      if (review.rating >= 1 && review.rating <= 5) {
        counts[5 - review.rating]++;
      }
    });

    return counts;
  };

  // Calculate average rating
  const calculateAverageRating = (reviews) => {
    if (!reviews || reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  };

  // Calculate profile reviews rating
  const calculateProfileReviewsRating = (profileReviews) => {
    if (!profileReviews || profileReviews.length === 0) return 0;
    const total = profileReviews.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return (total / profileReviews.length).toFixed(1);
  };

  if (loading) {
    return (
      <div className="bg-gradient-to-br min-h-screen from-[#DE0588B2] via-black to-[#460BCB] text-white flex items-center justify-center">
        <p className="text-2xl">Loading profile data...</p>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-gradient-to-br min-h-screen from-[#DE0588B2] via-black to-[#460BCB] text-white flex items-center justify-center">
        <p className="text-2xl">Profile not found</p>
      </div>
    );
  }

  const userData = profile.data;
  const starCounts = calculateStarBreakdown(userData.profileReviews || []);
  const averageRating = calculateAverageRating(userData.profileReviews || []);
  const profileReviewsRating = calculateProfileReviewsRating(
    userData.profileReviews || []
  );

  // Use dynamic data from API if available, fallback to static data
  const projects =
    userData.profileProjects && userData.profileProjects.length > 0
      ? userData.profileProjects
      : [{ title: "Website Design", image: WebDesign }];
  const achievements =
    userData.achievements && userData.achievements.length > 0
      ? userData.achievements
      : [
          {
            image: Badge,
            title: "Design",
            subtitle: "achievement",
            date: "20-01-2024",
          },
        ];

  return (
    <div className="bg-gradient-to-br min-h-screen from-[#DE0588B2] via-black to-[#460BCB] text-white">
      <div className="flex flex-col md:flex-row gay-y-3 justify-between items-center border-white border-b mx-[6%] py-[50px]">
        <div className="flex flex-row gap-x-5">
          <div className="">
            <img
              className="mt-5"
              src={userData.profileImage || Profileimg}
              alt="Profile"
              onError={(e) => {
                e.target.src = Profileimg;
              }}
            />
            <img className="relative -top-60 left-40" src={Star} alt="Star" />
          </div>
          <div className="flex flex-col gap-y-3">
            <h1 className="text-3xl font-bold">
              {userData.servicesExperties || "UI/UX Designer"}
            </h1>
            <p className="text-xl">@{userData.username}</p>

            <div className="flex items-center">
              <FontAwesomeIcon
                icon={faStar}
                size="2x"
                className="text-yellow-500"
              />
              <h1 className="ml-2 font-bold text-xl">
                {userData.profileReviews?.length > 0
                  ? profileReviewsRating
                  : averageRating}
                <span className="font-normal text-lg">
                  (
                  {userData.profileReviews?.length ||
                    userData.reviews?.length ||
                    0}
                  )
                </span>
              </h1>
            </div>

            <div className="flex items-center mt-4">
              <FontAwesomeIcon icon={faComments} size="2x" className="white" />
              <h1 className="ml-2 font-semibold text-xl">
                {userData.languages || "English"}
              </h1>
            </div>

            <div className="flex items-center mt-4">
              <FontAwesomeIcon
                icon={faPhone}
                size="2x"
                className="text-white"
              />
              <h1 className="ml-2 text-xl font-semibold">
                {userData.contactInfo || "Contact Info"}
              </h1>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-3">
            <div className="bg-white text-black flex flex-row px-7 py-4 gap-x-5 rounded-lg">
              <div className="">
                <img
                  className="w-[50px] h-auto bg-cover"
                  src={userData.profileImage || Profileimg}
                  alt=""
                  onError={(e) => {
                    e.target.src = Profileimg;
                  }}
                />
              </div>
              <div className="flex flex-col gap-y-4">
                <p className="text-xl">
                  {userData.servicesExperties || "UI UX Designer"}{" "}
                  <p className="text-lg">
                    {userData.onlineStatus ? "Online" : "Offline"}{" "}
                    <span className="">.</span>
                  </p>
                </p>

                <button className="text-white bg-gradient-to-br from-[#DE0588] to-[#460BCB] px-4 p-3 rounded-xl">
                  Contact Us
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-x-4">
              <img src={Part} alt="" />
              <div>
                <h1 className="text-xl font-bold">
                  {userData.company || "Markita Designs"}
                </h1>
                <p>{userData.position || "Senior Designer"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 mt-5 border-b border-white mx-[4%] text-white">
        {/* About Me Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-gray-300">
            {userData.aboutme || "No information provided."}
          </p>
        </div>

        <div>
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-bold mb-4">
              {userData.profileReviews?.length > 0
                ? `${userData.profileReviews.length} Profile Reviews`
                : `${userData.reviews?.length || 0} Reviews`}
            </h2>
            <div className="flex items-center mt-4">
              <div className="flex space-x-1 text-yellow-400 text-2xl">
                {[...Array(5)].map((_, i) => (
                  <FontAwesomeIcon
                    key={i}
                    icon={faStar}
                    size="x"
                    className={
                      i <
                      Math.round(
                        userData.profileReviews?.length > 0
                          ? profileReviewsRating
                          : averageRating
                      )
                        ? "text-yellow-500"
                        : "text-white"
                    }
                  />
                ))}
              </div>
              <span className="ml-2 text-2xl font-bold text-gray-100">
                {userData.profileReviews?.length > 0
                  ? profileReviewsRating
                  : averageRating}
              </span>
            </div>
          </div>

          {/* Rating Progress Bars - Use profileReviews if available, otherwise use reviews */}
          <div className="flex items-center mb-2 font-bold mt-7">
            <span className="w-16">5 Stars</span>
            <div className="w-64 h-3 bg-gray-400 rounded-lg mr-4">
              <div
                className="bg-pink-500 h-3 rounded-lg"
                style={{
                  width: `${
                    userData.reviews?.length
                      ? (starCounts[0] / userData.reviews.length) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <span>({starCounts[0]})</span>
          </div>
          <div className="flex items-center mb-2 font-bold">
            <span className="w-16">4 Stars</span>
            <div className="w-64 h-3 bg-gray-400 rounded-lg mr-4">
              <div
                className="bg-pink-500 h-3 rounded-lg"
                style={{
                  width: `${
                    userData.reviews?.length
                      ? (starCounts[1] / userData.reviews.length) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <span>({starCounts[1]})</span>
          </div>
          <div className="flex items-center mb-2 font-bold">
            <span className="w-16">3 Stars</span>
            <div className="w-64 h-3 bg-gray-400 rounded-lg mr-4">
              <div
                className="bg-pink-500 h-3 rounded-lg"
                style={{
                  width: `${
                    userData.reviews?.length
                      ? (starCounts[2] / userData.reviews.length) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <span>({starCounts[2]})</span>
          </div>
          <div className="flex items-center mb-2 font-bold">
            <span className="w-16">2 Stars</span>
            <div className="w-64 h-3 bg-gray-400 rounded-lg mr-4">
              <div
                className="bg-pink-500 h-3 rounded-lg"
                style={{
                  width: `${
                    userData.reviews?.length
                      ? (starCounts[3] / userData.reviews.length) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <span>({starCounts[3]})</span>
          </div>
          <div className="flex items-center mb-2 font-bold">
            <span className="w-16">1 Stars</span>
            <div className="w-64 h-3 bg-gray-400 rounded-lg mr-4">
              <div
                className="bg-pink-500 h-3 rounded-lg"
                style={{
                  width: `${
                    userData.reviews?.length
                      ? (starCounts[4] / userData.reviews.length) * 100
                      : 0
                  }%`,
                }}
              ></div>
            </div>
            <span>({starCounts[4]})</span>
          </div>
        </div>
      </div>
      <div className="mx-[4%] my-[7%] flex flex-col gap-y-10">
        <div className="flex flex-wrap gap-y-12 justify-around">
          {/* Show profileReviews if available, otherwise use the old reviews */}
          {(userData.profileReviews?.length > 0
            ? userData.profileReviews
            : userData.reviews || []
          ).map((review, index) => (
            <div
              key={index}
              className="flex flex-row gap-x-4 mb-6 w-full md:w-[45%]"
            >
              {/* Profile Image */}
              <div>
                <img
                  className="w-[70px] h-[70px] object-cover rounded-full"
                  src={review.reviewerProfileImage || Profileimg}
                  alt={review.reviewerName}
                  onError={(e) => {
                    e.target.src = Profileimg;
                  }}
                />
              </div>

              {/* Review Content */}
              <div className="flex flex-col gap-y-3 items-start">
                <h1 className="text-xl font-semibold">
                  {review.given_by?.username || userData.username}
                </h1>
                <div className="flex flex-row gap-x-3 items-center">
                  {/* Star Ratings */}
                  <div className="flex space-x-1 text-yellow-400 text-2xl pr-3 border-r border-white">
                    {[...Array(5)].map((_, i) => (
                      <FontAwesomeIcon
                        key={i}
                        icon={faStar}
                        size="x"
                        className={
                          i < review.rating ? "text-yellow-500" : "text-white"
                        }
                      />
                    ))}
                  </div>
                  <h1 className="text-sm text-gray-300">
                    {getTimeAgo(
                      review.timeAgo ||
                        review.createdAt /* For profileReviews */
                    )}
                  </h1>
                </div>
                <p>
                  {review.reviewText || review.comment /* For profileReviews */}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        {(userData.profileReviews?.length > 0 ||
          userData.reviews?.length > 0) && (
          <button className="bg-gradient-to-br from-[#DE0588] to-[#460BCB] rounded-xl self-center text-white px-5 py-4">
            View More
          </button>
        )}
      </div>

      <div className="mx-[4%]">
        <h2 className="text-2xl font-bold mb-6">Popular Gigs</h2>
        <div className="flex flex-wrap justify-start gap-x-10">
          {(userData.createdGigs || []).map((gig, index) => (
            <GigCardNew
              key={index}
              title={gig.title}
              rating={gig.rating}
              price={gig.price}
              image={gig.image || gigImage}
            />
          ))}
        </div>
        {userData.createdGigs?.length > 0 && (
          <button className="bg-gradient-to-br from-[#DE0588] to-[#460BCB] rounded-xl mx-[46%] text-white px-5 py-4">
            View More
          </button>
        )}
      </div>
      <div className="mx-[4%] my-5">
        <h2 className="text-2xl font-bold mb-6">Projects</h2>
        <div className="flex flex-wrap justify-around gap-x-10 py-10">
          {projects
            ? projects.map((project, index) => (
                <div key={index}>
                  <div>
                    <img
                      src={project.image || WebDesign}
                      alt="Project"
                      onError={(e) => {
                        e.target.src = WebDesign;
                      }}
                    />
                  </div>
                  <h1 className="text-lg font-semibold mt-2">
                    {project.title || "Website Design"}
                  </h1>
                </div>
              ))
            : null}
        </div>
        <button className="bg-gradient-to-br from-[#DE0588] to-[#460BCB] rounded-xl mx-[46%] text-white px-5 py-4">
          View More
        </button>
      </div>
      <div className="mx-[4%] py-10">
        <h2 className="text-2xl font-bold mb-6">Achievements</h2>
        <div className="flex flex-wrap justify-around gap-x-10 gap-y-10 py-5 my-10">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex flex-row gap-x-5 w-[30%]">
              <div>
                <img
                  src={achievement.image || Badge}
                  alt="Achievement"
                  onError={(e) => {
                    e.target.src = Badge;
                  }}
                />
              </div>
              <div>
                <h1 className="text-lg font-semibold mt-2">
                  {achievement.title}
                  <br />
                  <span>{achievement.subtitle}</span>
                </h1>
                <p className="text-md font-semibold mt-2">
                  {achievement.date &&
                    new Date(achievement.date).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className="bg-gradient-to-br from-[#DE0588] to-[#460BCB] rounded-xl mx-[46%] text-white px-5 py-4">
          View More
        </button>
      </div>
    </div>
  );
}
