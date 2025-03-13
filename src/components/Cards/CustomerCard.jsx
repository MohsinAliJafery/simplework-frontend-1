import React from "react";
import { FaStar } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

const CustomerCard = () => {
  const navigate = useNavigate();
  return (
    <div
      className="px-5 py-5 bg-[#FFFFFF33] w-[350px] rounded-[1.3rem]"
      onClick={() => {
        navigate("/seller/customers/detail");
      }}
    >
      <div className="flex items-center gap-x-4 pb-4">
        <div className="">
          <img src="/customerimg.png" className="w-[70px]" alt="" />
        </div>
        <div className="flex flex-col font-poppins">
          <div className="text-[1rem]">Ali khan</div>
          <div className="text-[1rem] font-semibold flex justify-center items-center gap-x-2">
            <FaStar className="text-[#FFE500] text-xl" /> 4.5{" "}
            <span className="text-sm font-thin"> (23)</span>
          </div>
        </div>
      </div>
      <div className="font-poppins text-[.7rem] font-normal ">
        Lorem ipsum dolor sit amet consectetur. Eget ipsum ut tellus vel eu
        volutpat molestie tempus at. Diam lectus eget scelerisque sed. Praesent
        laoreet maecenas pellentesque nec fermentum sit laoreet. Auctor pulvinar
        at non diam tempus orci dignissim magnis tortor.
      </div>
    </div>
  );
};

export default CustomerCard;
