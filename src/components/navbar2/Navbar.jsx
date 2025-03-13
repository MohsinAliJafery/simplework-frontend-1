import { useEffect, useState } from "react";
import Search from "../../assets/search-normal.png";
import { MdOutlineMailOutline } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoNotificationsOutline } from "react-icons/io5";
import Logo from "../../assets/logo2.png";
import NavItem from "./NavItem";
import { Popover, Typography } from "@mui/material";
import { logout } from "../../Api_Requests/Api_Requests";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { resetSearchQuery, setSearchQuery } from "../../store/Slices/gigslice";
import { clearUser } from "../../store/Slices/userSlice";
const NavData = [
  {
    title: "Post a Job",
    Link: "/postajob",
  },
  {
    title: "How we are",
    Link: "/how-we-are",
    SubLinks: [
      { title: "Blogs", Link: "/blogs" },
      { title: "Guides", Link: "/guides" },
      { title: "Productivity Hacks", Link: "/productivityhacks" },
      // { title: "Careers", Link: "/careers" },
    ],
  },
  {
    title: "Favorites",
    Link: "/favourite",
  },
  {
    title: "Switch to Selling",
    Link: "/seller/dashboard",
  },
];

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const userData = useSelector((state) => state.user.userData);
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [anchorElCm, setAnchorElCm] = useState(null);
  const [search, setSearch] = useState("");
  const [Token, setToken] = useState(localStorage.getItem("token"));
  const dispatch = useDispatch();
  const location = useLocation();

  const handleClickCm = (event) => {
    setAnchorElCm(event.currentTarget);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseCm = () => {
    setAnchorElCm(null);
  };

  const openCm = Boolean(anchorElCm);
  const idCm = openCm ? "simple-popover" : undefined;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    const response = await logout();
    console.log("responseresponse", response);
    if (response.status === 200) {
      dispatch(clearUser());
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      setToken(false);
      handleCloseCm();
      toast.success("User has been Logged out");
      navigate("/");
    } else {
      handleCloseCm();
      alert("Failed to log out");
    }
  };

  useEffect(() => {
    if (location.pathname !== "/gigList") {
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
    // if (location.pathname == '/') {
    navigate("/gigList");

    // }
  };
  console.log(location.pathname, "hjkj");

  return (
    <div
      className="bg-[#381138] w-full px-4 md:px-6 lg:px-8 h-[100px]"
      style={{ fontFamily: "poppins" }}
    >
      <div className="flex justify-between items-center h-full">
        {/* Logo */}
        <div className="flex items-center">
          <img className="h-10 w-auto sm:h-12 md:h-14" src={Logo} alt="Logo" />
          <Link
            to="/"
            className="text-sm sm:text-base md:text-lg font-bold text-white ml-2"
          >
            SIMPLEWORK
          </Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden lg:flex lg:flex-wrap gap-x-6 md:gap-x-4 sm:gap-x-2 justify-center md:text-[12px] xl:text-lg">
          {NavData.map((item, index) => (
            <NavItem
              key={index}
              nav={item}
              className="lg:text-lg md:text-base sm:text-sm"
            />
          ))}
        </div>
        {/* Search & Buttons */}
        <div className="hidden lg:flex items-center gap-x-4">
          <div className="relative lg:w-2/2">
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
              className="p-2 bg-transparent text-white border-b border-white outline-none placeholder-gray-300 md:w-[12vw] xl:w-full md:text-[12px] xl:text-lg"
            />

            <img
              src={Search}
              alt="Search Icon"
              className="absolute right-2 top-2 w-5 h-5 md:w-4 md:h-4 xl:w-5 xl:h-5 cursor-pointer"
              onClick={handelChangeLocation}
            />
          </div>
          <MdOutlineMailOutline className="text-2xl cursor-pointer text-white" />
          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            PaperProps={{
              sx: {
                borderRadius: "20px", // Add rounded corners
                backgroundColor: "white", // Set background color to white
                width: "fit", // Set the width as needed
                overflow: "hidden", // Hide overflowing content
                marginTop: "10px",
                boxShadow: "none",
              },
            }}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <Typography
              sx={{
                // pt: 2,
                // pl: 4,
                // pr: 5,
                // pb: 5,
                // borderColor: "#465462",
                backgroundColor: "#5c5c5c",
                // width: "400px",
                overflow: "hidden",
                borderRadius: "20px",
              }}
            >
              <div className="bg-[#5c5c5c] text-black font-[Quicksand]  flex flex-col justify-center items-center rounded-[10px]">
                <div className=" flex flex-col justify-between gap-y-3 items-start w-[350px]">
                  <div className="text-xl font-bold font-poppins text-white px-5 py-3 pt-5">
                    Notification
                  </div>
                  <div className="flex flex-col gap-y-3 py-3">
                    <div className="flex items-center gap-x-2 text-white p-2">
                      <img
                        src="/customerimg.png"
                        className="w-[50px] h-[50px]"
                        alt=""
                      />
                      <div className="flex flex-col font-poppins gap-y-2">
                        <div className="font-semibold text-[.8rem]">
                          Anees has sent you a new message.
                        </div>
                        <div className="text-[.7rem] font-thin">
                          02 hour ago
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2 text-white p-2">
                      <img
                        src="/customerimg.png"
                        className="w-[50px] h-[50px]"
                        alt=""
                      />
                      <div className="flex flex-col font-poppins gap-y-2">
                        <div className="font-semibold text-[.8rem]">
                          Anees has sent you a new message.
                        </div>
                        <div className="text-[.7rem] font-thin">
                          02 hour ago
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-x-2 text-white p-2">
                      <img
                        src="/customerimg.png"
                        className="w-[50px] h-[50px]"
                        alt=""
                      />
                      <div className="flex flex-col font-poppins gap-y-2">
                        <div className="font-semibold text-[.8rem]">
                          Anees has sent you a new message.
                        </div>
                        <div className="text-[.7rem] font-thin">
                          02 hour ago
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Typography>
          </Popover>
          <IoNotificationsOutline
            className="text-2xl cursor-pointer text-white"
            onClick={handleClick}
          />
          {Token ? (
            <>
              <img
                src={userData?.profileImage || "/navimg.png"}
                alt="User"
                className="w-12 h-12 rounded-full cursor-pointer"
                onClick={handleClickCm}
              />
              <Popover
                id={idCm}
                open={openCm}
                anchorEl={anchorElCm}
                onClose={handleCloseCm}
                PaperProps={{
                  sx: {
                    borderRadius: "20px",
                    backgroundColor: "white",
                    width: "200px",
                    overflow: "hidden",
                    marginTop: "10px",
                    boxShadow: "none",
                  },
                }}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
              >
                <Typography
                  sx={{
                    backgroundColor: "#413555",
                    width: "100%",
                    overflow: "hidden",
                    borderRadius: "20px",
                  }}
                >
                  <div className="bg-[#413555] text-black font-[Quicksand]  flex flex-col justify-center items-center rounded-[10px] w-full">
                    <div className="flex flex-col justify-between gap-y-3 items-start w-full font-poppins text-white text-[.8rem] py-3">
                      <div className="hover:bg-[#2f273b] cursor-pointer p-2 px-6 w-full">
                        Profile
                      </div>
                      <div
                        className="hover:bg-[#2f273b] cursor-pointer p-2 px-6 w-full"
                        onClick={(e) => {
                          navigate("/postajob");
                          handleCloseCm();
                        }}
                      >
                        Post a Job
                      </div>
                      <div className="hover:bg-[#2f273b] cursor-pointer p-2 px-6 w-full">
                        Messages
                      </div>
                      <Link
                        to="seller/settings"
                        className="hover:bg-[#2f273b] cursor-pointer p-2 px-6 w-full"
                      >
                        Setting
                      </Link>
                      <div className="flex w-full justify-center items-center">
                        <div className="w-[90%] h-[1px] rounded-full bg-white"></div>
                      </div>

                      <div
                        onClick={handleLogout}
                        className="hover:bg-[#2f273b] cursor-pointer p-2 px-6 w-full"
                      >
                        Logout
                      </div>
                    </div>
                  </div>
                </Typography>
              </Popover>
            </>
          ) : (
            <Link to="/login" className="p-2  text-white border rounded-[4px]">
              Login
            </Link>
          )}
          <Link
            to="/signup"
            className={`${
              Token ? "hidden" : ""
            } p-2 rounded-[4px] bg-gradient-to-br from-[#DE0588] to-[#460BCB] text-white`}
          >
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={toggleMenu} className="text-white text-2xl">
            {isMenuOpen ? "✕" : "☰"}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-[#381138] p-3 w-full absolute left-0">
          <ul className="flex flex-col gap-y-3 text-white">
            {NavData.map((item, index) => (
              <li
                key={index}
                className="hover:text-gray-300"
                onClick={toggleMenu}
              >
                <Link to={item.Link}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex flex-col gap-y-2">
            {Token ? (
              <button
                className="p-2 rounded-[4px] bg-gradient-to-br from-[#DE0588] to-[#460BCB] text-white"
                onClick={handleLogout}
              >
                Logout
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  className="p-2 text-white bg-gradient-to-br from-[#DE0588] to-[#460BCB] text-center"
                >
                  Login
                </Link>
                <button className="p-2 text-white border border-white">
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
