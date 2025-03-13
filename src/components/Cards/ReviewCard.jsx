import React from "react";
import { FaStar } from "react-icons/fa6";

const ReviewCard = () => {
  return (
    <div className="w-[300px] gap-y-4 p-4 flex flex-col font-poppins bg-[#FFFFFF33] border-[#FFFFFF33] border-2 overflow-hidden rounded-3xl">
      <div className="flex justify-between">
        <div className="flex items-center gap-x-2">
          <img src="/customerimg.png" className="w-[70px]" />
          <div className="flex flex-col gap-y-1 font-poppins">
            <div className="font-bold text-[.9rem]">ALI</div>
            <div className="text-[.8rem]">Pakistan</div>
            <div className="flex items-center gap-x-2">
              <FaStar className="text-[#FFE500] text-[.8rem]" />
              <FaStar className="text-[#FFE500] text-[.8rem]" />
              <FaStar className="text-[#FFE500] text-[.8rem]" />
              <FaStar className="text-[#FFE500] text-[.8rem]" />
              <FaStar className="text-[#FFE500] text-[.8rem]" />
            </div>
          </div>
        </div>
        <div className="text-[.7rem] font-poppins">1 week ago</div>
      </div>
      <div className="text-[.8rem] font-poppins font-[400] my-4 px-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum is simply dummy text of the amet printing and
        typesetting industry. Lorem Ipsum.
      </div>
    </div>
  );
};

export default ReviewCard;
