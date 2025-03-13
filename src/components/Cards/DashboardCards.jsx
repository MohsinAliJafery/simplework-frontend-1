import React, { useEffect } from "react";
import { FaWallet } from "react-icons/fa";
import { RiComputerFill } from "react-icons/ri";
import DashboadCard from "./DashboadCard";
import { IoBagCheck } from "react-icons/io5";
import { LuCircleDollarSign } from "react-icons/lu";

const dashboardData1 = [
  {
    title: "Total Sales",
    amount: "200000",
    percentage: "20",
    month: "Jan",
    icon: (
      <div className="bg-white w-fit p-2 rounded-lg">
        <IoBagCheck className="text-2xl text-[#460BCB]" />
      </div>
    ),
  },
  {
    title: "Avg. Order Value",
    amount: "200000",
    percentage: "20",
    month: "Jan",
    icon: (
      <div className="bg-white w-fit p-2 rounded-lg">
        <FaWallet className="text-2xl text-[#460BCB]" />
      </div>
    ),
  },
  {
    title: "Online Sessions",
    amount: "200000",
    percentage: "20",
    month: "Jan",
    icon: (
      <div className="bg-white w-fit p-2 rounded-lg">
        <RiComputerFill className="text-2xl text-[#460BCB]" />
      </div>
    ),
  },
  {
    title: "Conversion Rate",
    amount: "200000",
    percentage: "20",
    month: "Jan",
    icon: (
      <div className="bg-white w-fit p-2 rounded-lg">
        <LuCircleDollarSign className="text-2xl text-[#460BCB]" />
      </div>
    ),
  },
];

const dashboardData2 = [
  {
    title: "Total Gigs",
    amount: "200000",
    percentage: "20",
    month: "Jan",
    icon: (
      <div className="bg-white w-fit p-2 rounded-lg">
        <IoBagCheck className="text-2xl text-[#460BCB]" />
      </div>
    ),
  },
  {
    title: "Avg. Order Value",
    amount: "200000",
    percentage: "20",
    month: "Jan",
    icon: (
      <div className="bg-white w-fit p-2 rounded-lg">
        <FaWallet className="text-2xl text-[#460BCB]" />
      </div>
    ),
  },
];

import AOS from "aos";
import "aos/dist/aos.css";

const DashboardCards = ({ type, align }) => {
  useEffect(() => {
    AOS.init({ duration: 1000 }); // You can set a default duration for animations
  }, []);
  const CurrentData =
    type === 1 ? dashboardData1 : type === 2 ? dashboardData2 : [];
  return (
    <div className="flex flex-wrap gap-x-4 px-3 gap-y-4 items-center justify-center">
      {CurrentData.map((card, index) => (
        <DashboadCard
          align={align}
          key={index}
          title={card.title}
          amount={card.amount}
          percentage={card.percentage}
          month={card.month}
          icon={card.icon}
        />
      ))}
    </div>
  );
};

export default DashboardCards;
