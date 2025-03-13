import React, { useState } from "react";
import StepsBtn from "../../components/Buttons/StepsBtn";
import { BiSolidChevronDown } from "react-icons/bi";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import GradientBtn from "../../components/Buttons/GradientBtn";
import { useNavigate } from "react-router-dom";

const CreateNewGig3 = () => {
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
        <div className="flex-col w-[80%] mt-7">
          <div className="font-semibold text-xl">Description</div>
          <div className="text-[1rem] font-normal w-[50%] mb-1">
            Briefly Describe your
          </div>
          <div className="relative w-full">
            <textarea
              className="w-full bg-transparent text-white border-white border-[1px] rounded-2xl p-2 h-[30vh] text-[1rem] font-poppins outline-none mt-2 resize-none"
              placeholder="Lorem Ipsum ..."
              minLength={100}
              maxLength={maxLength}
              value={text}
              onChange={handleChange}
            />
            {/* Character counter in the bottom-right corner */}
            <div className="absolute bottom-2 right-2 text-white text-[.7rem]">
              {text.length}/{maxLength}
            </div>
          </div>
        </div>
        <div className="w-[80%] py-8 px-3">
          <div className="w-[300px]">
            <GradientBtn
              title={"Continue"}
              onClick={() => {
                navigate("/seller/create-new-gig/4");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewGig3;
