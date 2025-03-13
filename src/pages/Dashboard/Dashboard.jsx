import React, { useState } from "react";
import { MdOutlineShowChart, MdSpaceDashboard } from "react-icons/md";
import { HiMiniShoppingCart, HiUsers } from "react-icons/hi2";
import { AiFillProduct } from "react-icons/ai";
import { IoBagCheck, IoStatsChartSharp } from "react-icons/io5";
import { FaUser, FaWallet } from "react-icons/fa";
import { IoMdSettings } from "react-icons/io";
import ApexLineChart from "../../components/Charts/LineChart";
import DashboadCard from "../../components/Cards/DashboadCard";
import { RiComputerFill } from "react-icons/ri";
import { FaSackDollar } from "react-icons/fa6";
import { Popover, Typography } from "@mui/material";
import { BiSolidChevronDown } from "react-icons/bi";
import SideMenu from "../../components/SideMenu/SideMenu";
import DashboadAllSalesChart from "../../components/Charts/DashboadAllSalesChart";
import DashboardCards from "../../components/Cards/DashboardCards";

const Dashboard = () => {
  return (
    <div className="px-5 flex w-full">
      <SideMenu />
      <div className="w-full flex flex-col items-start text-white fade-in">
        <div className="flex pt-4 px-4">
          <DashboadAllSalesChart />
          <DashboardCards align={"l"} type={1} />
        </div>
        <div className="px-2 py-8">
          <DashboardCards align={"r"} type={2} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
