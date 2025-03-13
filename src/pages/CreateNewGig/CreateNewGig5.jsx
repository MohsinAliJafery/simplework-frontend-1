import React, { useState } from "react";
import StepsBtn from "../../components/Buttons/StepsBtn";
import { BiSolidChevronDown } from "react-icons/bi";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import DragNDrop from "../../components/Inputs/DragNDrop";
import GradientBtn from "../../components/Buttons/GradientBtn";
import { useNavigate } from "react-router-dom";

const CreateNewGig5 = () => {
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
          <div className="font-semibold text-xl">
            Showcase Your Services In A Gig Gallery
          </div>
          <div className="text-[.7rem] font-thin w-[50%] mb-1">
            Images (up to 02)
          </div>
          <div className="relative w-[90%] py-4 flex gap-x-3 justify-between">
            <DragNDrop />
            <DragNDrop />
            <DragNDrop />
          </div>
        </div>
        <div className="w-[80%] py-8 px-3">
          <div className="w-[300px]">
            <GradientBtn
              title={"Continue"}
              onClick={() => {
                navigate("/seller/create-new-gig/6");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateNewGig5;
