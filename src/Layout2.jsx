import React, { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar2 from "./components/navbar2/Navbar";
import Loader from "./components/Loader/Loader";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { fetchGigs } from "./store/Slices/gigslice";
import Footer from "./components/Footer";

const Layout2 = () => {
  const location=useLocation()
  const dispatch=useDispatch()
  const [loading, setLoading] = useState(true);
  let isMount = false;

  useEffect(() => {
    dispatch(fetchGigs())
    
    if (!isMount) {
      setInterval(() => {
        isMount = true;
        setLoading(false);
      }, 1000);
    }
  }, [dispatch]);

  useEffect(() => {
    console.log("Current pathname:", location.pathname);
  }, [location]);

  return loading ? (
    <div className="flex justify-center items-center w-screen h-screen bg-[black] relative">
      <Loader />
    </div>
  ) : (
    <div className="w-[100%] min-h-screen overflow-hidden bg-black relative">
      {/* Ellipses with lower z-index */}
      <img
        src="Ellipse1.png"
        alt=""
        className="absolute left-0 top-0 w-[400px] z-0"
      />
      <img
        src="Ellipse2.png"
        alt=""
        className="absolute right-0 top-0 w-[150px] z-0"
      />
      <img
        src="Ellipse3.png"
        alt=""
        className="absolute right-0 bottom-0 w-[500px] z-0"
      />

      {/* Conditionally render Navbar based on pathname */}
      {location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname!=='/forgot-password' && location.pathname!=='/otp-verify' && location.pathname!=='/confirm-password' &&(
        <div className="relative z-20">
          <Navbar2 />
          
          
        </div>
      )}

      <div className="relative z-10 w-full items-center justify-center">
        
        {/* Outlet content */}
        <Outlet />
      </div>
      {location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname!=='/forgot-password' && location.pathname!=='/otp-verify' && location.pathname!=='/confirm-password' &&(
        <div className="relative z-20">
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Layout2;
