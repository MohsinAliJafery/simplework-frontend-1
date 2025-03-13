import React, { useEffect, useState } from "react";
import { Outlet, useNavigate,useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Loader from "./components/Loader/Loader";
import { useDispatch } from "react-redux";
import { fetchCurrentUserGigs } from "./store/Slices/gigslice";
import Footer from "../src/components/Footer"

const Layout = () => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location=useLocation()
  let isMount = false;

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"));
    if (!currentUser) {
      navigate("/login",{replace:true});
    } else {
      dispatch(fetchCurrentUserGigs());
    }
    if (!isMount) {
      setInterval(() => {
        isMount = true;
        setLoading(false);
      }, 1000);
    }
  }, [dispatch]);
  return loading ? (
    <div className="flex justify-center items-center w-screen h-screen bg-[black] relative">
      <Loader />
    </div>
  ) : (
    <div className="w-[100vw] overflow-hidden  bg-black min-h-screen relative">
      {/* Ellipses with lower z-index */}
      <img
        src="/Ellipse1.png"
        alt=""
        className="absolute left-0 top-0 w-[400px] z-10"
      />
      <img
        src="/Ellipse2.png"
        alt=""
        className="absolute right-0 top-0 w-[150px] z-10"
      />
      <img
        src="/Ellipse3.png"
        alt=""
        className="absolute right-0 bottom-0 w-[500px] z-10"
      />

      {/* Navbar with higher z-index */}
      <div className="relative z-10 w-[100%]">
        <Navbar />
      </div>

      <div className="relative z-10 w-full items-center justify-center fade-in">
        {/* Outlet content */}
        <Outlet />
      </div>
      {location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname!=='/forgot-password' && location.pathname!=='/otp-verify' && location.pathname!=='/confirm-password' &&  location.pathname!=='/seller/chat' &&(
        <div className="relative z-20">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout;
