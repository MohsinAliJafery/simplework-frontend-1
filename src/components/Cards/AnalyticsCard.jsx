import React from "react";

const AnalyticsCard = ({ title, amount }) => {
  return (
    <div className="px-8 py-3 border-[2px] border-white flex flex-col gap-y-3 justify-center items-start w-[250px] h-[18vh] font-poppins bg-[#FFFFFF33] rounded-2xl">
      <div className="text-[1.1rem] font-thin">{title}</div>
      <div className="text-2xl font-normal">{amount}</div>
    </div>
  );
};

export default AnalyticsCard;
