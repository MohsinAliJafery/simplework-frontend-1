import React, { useState } from "react";
import StepsBtn from "../../components/Buttons/StepsBtn";
import { BiSolidChevronDown } from "react-icons/bi";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook, FaFacebookF, FaLinkedin } from "react-icons/fa";
import { RiLinkedinFill } from "react-icons/ri";
import GradientBtn from "../../components/Buttons/GradientBtn";
import { useNavigate } from "react-router-dom";

const CreateNewGig6 = () => {
  const [text, setText] = useState("");
  const maxLength = 100;
  const [checked, setChecked] = useState([]);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setText(e.target.value);
  };

  const handleChangeCheckBox = (event) => {
    if (checked.find((dt) => dt === event.target.value)) {
      setChecked(checked.filter((dt) => dt !== event.target.value));
    } else {
      setChecked([...checked, event.target.value]);
    }
  };
  return (
    <div className="w-full flex justify-center items-center">
      <div className="bg-[#FFFFFF33] text-white w-[100%] flex flex-col justify-center items-center py-4 mx-6 font-poppins rounded-2xl">
        <div className="flex justify-start items-center w-[80%] my-4 mb-8 font-semibold text-xl">
          Create New Gig
        </div>
        <StepsBtn />
        <div className="flex-col w-[80%] mt-7 font-poppins">
          <div className="font-semibold text-xl">Gig Link</div>
          <div className="text-[1rem] font-normal w-[50%] mt-5">
            https:www.fiver.com/user/sdf/ertfdsa/asdftygfds/asdfg
          </div>
          <div className="relative w-full flex gap-x-3 text-3xl my-5">
            <FaXTwitter className="bg-black p-2 rounded-lg" />
            <RiLinkedinFill className="bg-[#6563FF] p-2 rounded-lg" />
            <FaFacebookF className="bg-[#1976D2] p-2 rounded-lg" />
          </div>
        </div>
        <div className="w-[80%] py-8 px-3 flex">
          <div className="w-[300px]">
            <button
              className="px-4 py-3 font-poppins text-white w-[90%] font-normal text-[1rem] rounded-lg bg-transparent border-[1px] border-white"
              onClick={() => {}}
            >
              Previous
            </button>
          </div>
          <div className="w-[300px]">
            <GradientBtn
              title={"Continue"}
              onClick={() => {
                navigate("/seller/products");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewGig6;
