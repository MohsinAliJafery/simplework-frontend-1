import React, { useEffect, useState } from "react";
import SearchBoxNav from "../SearchBox/SearchBoxNav";
import { MdOutlineMailOutline } from "react-icons/md";
import { IoNotificationsOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { Popover, Typography } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { logout } from "../../Api_Requests/Api_Requests";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../store/Slices/userSlice";
import Search from "../../assets/search-normal.png";

const Navbar = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);
  const [anchorEl, setAnchorEl] = useState(null);
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.userData);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const [anchorElCm, setAnchorElCm] = useState(null);
  const handleClickCm = (event) => {
    setAnchorElCm(event.currentTarget);
  };
  const handleCloseCm = () => {
    setAnchorElCm(null);
  };
  const openCm = Boolean(anchorElCm);
  const idCm = openCm ? "simple-popover" : undefined;

  const navigate = useNavigate();
  const handleLogout = async () => {
    const response = await logout(userData._id);
    if (response.status === 200) {
      dispatch(clearUser());
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      handleCloseCm();
      navigate("/");
    } else {
      handleCloseCm();
      toast.error("Failed to log out");
    }
  };

  return (
    <div className="w-screen px-5 py-3 z-10">
      <div
        className="bg-bgnav flex justify-between items-center text-white px-4 py-3 rounded-2xl"
        data-aos="fade-down"
      >
        <div
          className="flex items-center text-2xl font-poppins font-semibold cursor-pointer"
          onClick={() => {
            navigate("/seller/dashboard");
          }}
        >
          <img src="/logo.png" className="w-[100px]" />
          <div className="">SIMPLEWORK</div>
        </div>
        <div className="flex items-center gap-x-3 font-poppins">
          {[
            { title: "Dashboard", link: "/seller/dashboard" },
            {
              title: "Find Job",
              link: "/seller/findjob",
            },
            // { title: "Favorites", link: "" },
            // { title: "Membership", link: "" },
            // { title: "More", link: "" },
            { title: "Publish Gig", link: "/seller/publish-gig" },
            { title: "Switch to Buying", link: "/" },
          ].map((dt) => (
            <div
              className="flex items-center gap-x-1 cursor-pointer"
              onClick={() => {
                navigate(dt.link);
              }}
            >
              {dt.title}
              <IoIosArrowDown />
            </div>
          ))}
        </div>
        <div className="flex items-center gap-x-4">
          {/* <SearchBoxNav /> */}
          <div className="relative lg:w-2/2">
            <input
              type="text"
              placeholder="Search..."
              // onChange={handleSearchChange}
              // value={search}
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
              className="absolute right-0 top-3 w-5 h-5 md:w-4 md:h-4 xl:w-5 xl:h-5 cursor-pointer"
              // onClick={handelChangeLocation}
            />
          </div>
          <MdOutlineMailOutline className="text-2xl cursor-pointer" />
          {/* Notifications */}
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
            className="text-2xl cursor-pointer"
            onClick={handleClick}
          />
          <img
            src={userData?.profileImage || "/navimg.png"}
            className="w-[50px] h-[50px] rounded-full cursor-pointer"
            onClick={handleClickCm}
          />
          {/* Context Menu */}
          <Popover
            id={idCm}
            open={openCm}
            anchorEl={anchorElCm}
            onClose={handleCloseCm}
            PaperProps={{
              sx: {
                borderRadius: "20px", // Add rounded corners
                backgroundColor: "white", // Set background color to white
                width: "200px", // Set the width as needed
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
                      navigate("/seller/earnings");
                      handleCloseCm();
                    }}
                  >
                    Earnings
                  </div>
                  <div className="hover:bg-[#2f273b] cursor-pointer p-2 px-6 w-full">
                    Messages
                  </div>
                  <Link
                    to="settings"
                    className="hover:bg-[#2f273b] cursor-pointer p-2 px-6 w-full"
                  >
                    Settings
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
        </div>
      </div>
    </div>
  );
};

export default Navbar;
