import React, { useState } from "react";
import { MdOutlineShowChart, MdSpaceDashboard } from "react-icons/md";
import { HiMiniShoppingCart, HiUsers } from "react-icons/hi2";
import { AiFillProduct } from "react-icons/ai";
import { IoStatsChartSharp } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import { useLocation, Link, useNavigate } from "react-router-dom";
import { IoIosChatboxes } from "react-icons/io";

const menuItems = [
  { title: "Admin", icon: HiUsers, link: "/admin/adminDashboard" },
  { title: "Dashboard", icon: MdSpaceDashboard, link: "/seller/dashboard" },
  { title: "Orders", icon: HiMiniShoppingCart, link: "/seller/orders" },
  { title: "Products", icon: AiFillProduct, link: "/seller/products" },
  { title: "Analytics", icon: IoStatsChartSharp, link: "/seller/analytics" },
  { title: "Customers", icon: HiUsers, link: "/seller/customers" },
  { title: "Chat", icon: IoIosChatboxes, link: "/seller/chat" },
  { title: "Earnings", icon: IoIosChatboxes, link: "/seller/earnings" },

];

const menuItems2 = [
  { title: "Profile", icon: FaUser, link: "/seller/profile" },
  { title: "Settings", icon: IoMdSettings, link: "/seller/settings" },
];

const SideMenu = () => {
  const location = useLocation(); 
  const navigate = useNavigate();

  return (
    <div className="px-4 flex items-start flex-col h-fit  w-[250px]">
      <div className="flex flex-col gap-y-3 py-5">
        {menuItems.map((dt) => (
          <Link to={dt.link} key={dt.title}>
            <div
              className={`flex items-center gap-x-3 text-xl font-poppins text-white px-4 rounded-lg py-2 border-2 w-[190px]  ${
                location.pathname === dt.link
                  ? "border-[white] bg-[#FFFFFF66]"
                  : "border-transparent"
              }`}
            >
              <dt.icon className="text-2xl" />
              <div>{dt.title}</div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex flex-col gap-y-2 py-4">
        {menuItems2.map((dt) => (
          <Link to={dt.link} key={dt.title}>
            <div
              className={`flex items-center gap-x-3 text-xl font-poppins text-white px-4 rounded-lg py-2 border-2 w-[190px]  ${
                location.pathname === dt.link
                  ? "border-[white] bg-[#FFFFFF66]"
                  : "border-transparent"
              }`}
            >
              <dt.icon className="text-2xl" />
              <div>{dt.title}</div>
            </div>
          </Link>
        ))}
      </div>
      {/* <div className="flex justify-start px-3 items-center w-[230px]">
        <GradientBtn
          title={"Support"}
          onClick={() => {
            navigate("/seller/contact-us");
          }}
        />
      </div> */}
    </div>
  );
};

export default SideMenu;
