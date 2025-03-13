import React from "react";
import { FaStar } from "react-icons/fa6";

const GigCard = () => {
  return (
    <div className="w-[250px] gap-y-4 flex flex-col font-poppins bg-[#FFFFFF33] border-[#FFFFFF33] border-2 overflow-hidden rounded-3xl">
      <img src="/gigimg.png" className="w-[250px]" />
      <div className="text-[.8rem] font-poppins px-5">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry.
      </div>
      <div className="flex gap-x-2 px-5 text-sm items-center">
        <FaStar className="text-[#FFE500] text-[1rem]" /> 4.5
      </div>
      <div className="px-5 mb-4 font-poppins text-sm">Price : 30$</div>
    </div>
  );
};

export default GigCard;
