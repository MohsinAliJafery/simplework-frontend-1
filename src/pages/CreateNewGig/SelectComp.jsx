import { Popover, Typography } from "@mui/material";
import React from "react";
import { BiSolidChevronDown } from "react-icons/bi";

const SelectComp = ({ Value, placeholder }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <div className="w-full border-[1px] border-white">
      <div
        //   main: "#DE0588",
        //   sec: "#460BCB"
        // className="px-4 py-[6px] border-2 border-white rounded-full cursor-pointer bg-[#465462] text-white"
        className={`relative text-center text-lg tracking-[1px] no-underline text-[#fff] cursor-pointer transition-all ease-in-out duration-500 border-[#465462] hover:text-black shadow-[inset_0_0_0_0_#fff] hover:shadow-[inset_0_-100px_0_0_#fff] active:scale-90 px-4 py-[5px] h-[88px] font-poppins font-[700] text-[1rem] bg-transparent flex gap-x-6 items-center maxWeb1:text-[1.5rem] maxWeb2:text-[2rem] maxWeb3:text-[2.5rem] maxWeb4:text-[3rem]`}
        onClick={handleClick}
      >
        <div className="flex items-center w-full">
          <div className="flex flex-1 outline-none font-[700] text-[1.1rem] text-center placeholder:text-white bg-transparent">
            {Value === "" && placeholder
              ? placeholder
              : Value === "" && !placeholder
              ? "Select"
              : Value}
          </div>
          <BiSolidChevronDown
            className="text-[1.5rem] cursor-pointer"
            aria-describedby={id}
            variant="contained"
          />
        </div>
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "25px", // Add rounded corners
            backgroundColor: "white", // Set background color to white
            width: "fit", // Set the width as needed
            overflow: "hidden", // Hide overflowing content
            marginTop: "10px",
            boxShadow: "none",
          },
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Typography
          sx={{
            pt: 2,
            pl: 4,
            pr: 5,
            pb: 5,
            borderColor: "#465462",
            backgroundColor: "#465462",
            // width: "400px",
            overflow: "hidden",
            borderRadius: "20px",
          }}
        >
          <div className="bg-[#465462] text-white font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
            <div className="w-full flex flex-col justify-between gap-y-3 items-start"></div>
          </div>
        </Typography>
      </Popover>
      {/* <div className="text-[1rem] font-normal flex-wrap flex p-2 border-[1px] border-white h-[10vh] justify-start items-center">
        Select
      </div> */}
    </div>
  );
};

export default SelectComp;
