import React, { useState, useEffect, useRef } from "react";
import { BsThreeDots } from "react-icons/bs";
import { MdOutlineShowChart } from "react-icons/md";

const DashboadCard = ({ title, icon, amount, percentage, month, align }) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const dropdownRef = useRef(null);
  const cardRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cardRef.current &&
        !cardRef.current.contains(event.target) &&
        !dropdownRef.current.contains(event.target)
      ) {
        setIsDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  return (
    <div
      ref={cardRef}
      className="bg-[#353435] text-white h-fit w-[250px] font-poppins p-5 rounded-2xl"
      data-aos={align === "l" ? "fade-left" : "fade-right"}
    >
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-y-2">
          <div>{icon}</div>
          <div className="mt-2">{title}</div>
          <div className="font-alegreya text-2xl font-bold">$ {amount} /-</div>
        </div>
        <div
          className="bg-[#E8E8E8] text-black w-fit px-1 py-1 rounded-lg"
          onClick={toggleDropdown}
        >
          <BsThreeDots className="text-xl cursor-pointer" />
        </div>
        {isDropdownVisible && (
          <div
            ref={dropdownRef}
            className="absolute top-11 right-6 bg-white text-[#444444] w-auto p-[8px] rounded-lg shadow-md"
          >
            <div className="py-1 text-sm cursor-pointer hover:bg-[#444444] hover:text-white px-1 rounded-lg">
              Add graph
            </div>
            <div className="py-1 whitespace-nowrap text-sm cursor-pointer hover:bg-[#444444] hover:text-white px-1 rounded-lg">
              Remove graph
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between items-center pt-2">
        <div className="flex items-center gap-x-1">
          <MdOutlineShowChart /> {percentage} %
        </div>
        <div>From {month}</div>
      </div>
    </div>
  );
};

export default DashboadCard;
