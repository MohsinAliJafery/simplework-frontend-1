import Profileimg from "../assets/profilepage/profimg.png";
import WebDesign from "../assets/profilepage/websitedesign.png";
import Badge from "../assets/profilepage/badge.png";
import Star from "../assets/profilepage/star.png";
import Part from "../assets/profilepage/part.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faComments, faPhone } from "@fortawesome/free-solid-svg-icons"; // Import chat and phone icons
import gigImage from "../../src/assets/populargigs/gigspix.png";
import GigCardNew from "../components/Cards/GigcardNew";

const reviews = [
  {
    name: "ALI",
    profileImg: Profileimg, // Assuming you have an image for the profile
    rating: 4,
    timeAgo: "1 Week",
    reviewText:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "John Doe",
    profileImg: Profileimg, // Placeholder image for another review
    rating: 5,
    timeAgo: "2 Days",
    reviewText: "This is a fantastic product! Highly recommend it.",
  },
  {
    name: "ALI",
    profileImg: Profileimg, // Assuming you have an image for the profile
    rating: 4,
    timeAgo: "1 Week",
    reviewText:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
  },
  {
    name: "John Doe",
    profileImg: Profileimg, // Placeholder image for another review
    rating: 5,
    timeAgo: "2 Days",
    reviewText: "This is a fantastic product! Highly recommend it.",
  },
];

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
];

const projects = [
  {
    image: WebDesign,
  },
  {
    image: WebDesign,
  },
  {
    image: WebDesign,
  },
  {
    image: WebDesign,
  },
];
const achievements = [
  {
    image: Badge,
    title: "Design",
    subtitle: "acheivement",
    date: "20-01-2024",
  },
  {
    image: Badge,
    title: "Design",
    subtitle: "acheivement",
    date: "20-01-2024",
  },
  {
    image: Badge,
    title: "Design",
    subtitle: "acheivement",
    date: "20-01-2024",
  },
  {
    image: Badge,
    title: "Design",
    subtitle: "acheivement",
    date: "20-01-2024",
  },
  {
    image: Badge,
    title: "Design",
    subtitle: "acheivement",
    date: "20-01-2024",
  },
  {
    image: Badge,
    title: "Design",
    subtitle: "acheivement",
    date: "20-01-2024",
  },
];

export default function Profilepage() {
  return (
    <div className="bg-gradient-to-br min-h-screen from-[#DE0588B2] via-black to-[#460BCB]  text-white">
      <div className="flex flex-col md:flex-row gay-y-3 justify-between items-center border-white border-b mx-[6%] py-[50px]">
        <div className="flex flex-row gap-x-5  ">
          <div className="">
            <img className="mt-5" src={Profileimg} alt="Profile" />
            <img className="relative -top-60 left-40" src={Star} alt="Star" />
          </div>
          <div className="flex flex-col gap-y-3">
            <h1 className="text-3xl font-bold">UI/UX Designer</h1>
            <p className="text-xl"> @jahangiral2424</p>

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
              <FontAwesomeIcon icon={faComments} size="2x" className="white" />
              <h1 className="ml-2 font-semibold text-xl">
                English, German, Spanish
              </h1>
            </div>

            <div className="flex items-center mt-4">
              <FontAwesomeIcon
                icon={faPhone}
                size="2x"
                className="text-white"
              />
              <h1 className="ml-2 text-xl font-semibold">Contact Info</h1>
            </div>
          </div>
        </div>
        <div>
          <div className="flex flex-col gap-3">
            <div className="bg-white text-black flex flex-row px-7 py-4 gap-x-5 rounded-lg ">
              <div className="">
                <img
                  className="w-[50px] h-auto bg-cover"
                  src={Profileimg}
                  alt=""
                />
              </div>
              <div className="flex flex-col gap-y-4 ">
                <p className="text-xl">
                  UI UX Designer{" "}
                  <p className="text-lg">
                    Online <span className="">.</span>
                  </p>
                </p>

                <button className="text-white bg-gradient-to-br from-[#DE0588]  to-[#460BCB] px-4 p-3 rounded-xl">
                  Contact Us
                </button>
              </div>
            </div>
            <div className="flex flex-row gap-x-4">
              <img src={Part} alt="" />
              <div>
                <h1 className="text-xl font-bold ">Markita Designs</h1>
                <p>Senior Desinger</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-8 mt-5 border-b border-white mx-[4%]  text-white">
        {/* About Me Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-gray-300">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged. It was popularised in the 1960s
            with the release of Letraset sheets containing Lorem Ipsum passages,
            and more recently with desktop publishing software like Aldus
            PageMaker including versions of Lorem Ipsum.
          </p>
        </div>

        <div>
          <div className="flex flex-row justify-between items-center">
            <h2 className="text-2xl font-bold mb-4">23 Reviews</h2>
            <div className="flex items-center mt-4">
              <div className="flex space-x-1 text-yellow-400 text-2xl">
                <FontAwesomeIcon
                  icon={faStar}
                  size="x"
                  className="text-yellow-500"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  size="x"
                  className="text-yellow-500"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  size="x"
                  className="text-yellow-500"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  size="x"
                  className="text-yellow-500"
                />
                <FontAwesomeIcon
                  icon={faStar}
                  size="x"
                  className="text-white"
                />
              </div>
              <span className="ml-2 text-2xl font-bold text-gray-100">4.5</span>
            </div>
          </div>

          {/* Rating Progress Bars */}
          <div className="flex items-center mb-2 font-bold mt-7">
            <span className="w-16">5 Stars</span>
            <div className="w-64 h-3 bg-gray-400 rounded-lg mr-4">
              <div
                className="bg-pink-500 h-3 rounded-lg"
                style={{ width: "90%" }}
              ></div>
            </div>
            <span>(1)</span>
          </div>
          <div className="flex items-center mb-2 font-bold">
            <span className="w-16">4 Stars</span>
            <div className="w-64 h-3 bg-gray-400 rounded-lg mr-4">
              <div
                className="bg-pink-500 h-3 rounded-lg"
                style={{ width: "50%" }}
              ></div>
            </div>
            <span>(1)</span>
          </div>
          <div className="flex items-center mb-2 font-bold">
            <span className="w-16">3 Stars</span>
            <div className="w-64 h-3 bg-gray-400 rounded-lg mr-4">
              <div
                className="bg-pink-500 h-3 rounded-lg"
                style={{ width: "0%" }}
              ></div>
            </div>
            <span>(0)</span>
          </div>
          <div className="flex items-center mb-2 font-bold">
            <span className="w-16">2 Stars</span>
            <div className="w-64 h-3 bg-gray-400 rounded-lg mr-4">
              <div
                className="bg-pink-500 h-3 rounded-lg"
                style={{ width: "0%" }}
              ></div>
            </div>
            <span>(0)</span>
          </div>
          <div className="flex items-center mb-2 font-bold">
            <span className="w-16">1 Stars</span>
            <div className="w-64 h-3 bg-gray-400 rounded-lg mr-4">
              <div
                className="bg-pink-500 h-3 rounded-lg"
                style={{ width: "0%" }}
              ></div>
            </div>
            <span>(0)</span>
          </div>
        </div>
      </div>
      <div className="mx-[4%] my-[7%] flex flex-col gap-y-10">
        <div className="flex flex-wrap gap-y-12 justify-around">
          {reviews.map((review, index) => (
            <div
              key={index}
              className="flex flex-row gap-x-4 mb-6 w-full md:w-[45%]" // Full width on mobile, 45% on medium screens
            >
              {/* Profile Image */}
              <div>
                <img
                  className="w-[70px] h-[70px] object-cover rounded-full"
                  src={review.profileImg}
                  alt={review.name}
                />
              </div>

              {/* Review Content */}
              <div className="flex flex-col gap-y-3 items-start">
                <h1 className="text-xl font-semibold">{review.name}</h1>
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
                  <h1 className="text-sm text-gray-300">{review.timeAgo}</h1>
                </div>
                <p>{review.reviewText}</p>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <button className="bg-gradient-to-br from-[#DE0588] to-[#460BCB] rounded-xl self-center text-white px-5 py-4">
          View More
        </button>
      </div>

      <div className="mx-[4%]">
        <h2 className="text-2xl font-bold mb-6">Popular Gigs</h2>
        <div className="flex flex-wrap justify-start gap-x-10">
          {gigs.map((gig, index) => (
            <GigCardNew
              key={index}
              title={gig.title}
              rating={gig.rating}
              price={gig.price}
              image={gig.image}
            />
          ))}
        </div>
        <button className="bg-gradient-to-br from-[#DE0588]  to-[#460BCB] rounded-xl mx-[46%]  text-white px-5 py-4   ">
          View More
        </button>
      </div>
      <div className="mx-[4%] my-5">
        <h2 className="text-2xl font-bold mb-6">Popular Gigs</h2>
        <div className="flex flex-wrap justify-around gap-x-10  py-10">
          {projects.map((i, index) => (
            <div key={index}>
              <div>
                <img src={i.image} alt="" />
              </div>
              <h1 className="text-lg font-semibold mt-2">Website Design</h1>
            </div>
          ))}
        </div>
        <button className="bg-gradient-to-br from-[#DE0588]  to-[#460BCB] rounded-xl mx-[46%]  text-white px-5 py-4   ">
          View More
        </button>
      </div>
      <div className="mx-[4%] py-10">
        <h2 className="text-2xl font-bold mb-6">Achievements</h2>
        <div className="flex flex-wrap justify-around gap-x-10 gap-y-10 py-5 my-10 ">
          {achievements.map((i, index) => (
            <div key={index} className="flex flex-row gap-x-5 w-[30%] ">
              <div>
                <img src={i.image} alt="" />
              </div>
              <div>
                <h1 className="text-lg font-semibold mt-2">
                  {i.title}
                  <br />
                  <span>{i.subtitle}</span>
                </h1>
                <p className="text-md font-semibold mt-2">{i.date}</p>
              </div>
            </div>
          ))}
        </div>
        <button className="bg-gradient-to-br from-[#DE0588]  to-[#460BCB] rounded-xl mx-[46%]  text-white px-5 py-4   ">
          View More
        </button>
      </div>
    </div>
  );
}
