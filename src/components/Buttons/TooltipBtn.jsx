import React, { useState } from "react";
import { MdOutlineNoteAdd } from "react-icons/md";
import { BiInfoCircle, BiSolidChevronDown } from "react-icons/bi";
import { Popover, Typography } from "@mui/material";
import { IoMdArrowDropup } from "react-icons/io";
import { PiNotepad } from "react-icons/pi";

const TooltipBtn = ({ notes }) => {
  const [Desc, setDesc] = useState(notes || "");

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <div
        className={`relative text-center text-lg tracking-[1px] no-underline text-[#fff] cursor-pointer transition-all ease-in-out duration-500  hover:text-[black] shadow-[inset_0_0_0_0_#fff] hover:shadow-[inset_0_-100px_0_0_#fff] active:scale-90 px-1 py-1 rounded-full font-[Quicksand] font-[700] text-[1rem] bg-transparent flex gap-x-6 items-center maxWeb1:text-[1.5rem] maxWeb2:text-[2rem] maxWeb3:text-[2.5rem] maxWeb4:text-[3rem] w-fit`}
        onClick={handleClick}
      >
        {Desc === "" ? (
          <MdOutlineNoteAdd
            className="text-[1.5rem] cursor-pointer"
            aria-describedby={id}
            variant="contained"
          />
        ) : (
          <PiNotepad
            className="text-[1.5rem] cursor-pointer"
            aria-describedby={id}
            variant="contained"
          />
        )}
      </div>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        PaperProps={{
          sx: {
            borderRadius: "10px", // Add rounded corners
            backgroundColor: "white", // Set background color to white
            width: "fit", // Set the width as needed
            // overflow: "hidden", // Hide overflowing content
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
            p: 2,

            borderColor: "#465462",
            backgroundColor: "#fff",
            // width: "400px",
            // overflow: "hidden",
            borderRadius: "10px",
            position: "relative",
          }}
        >
          <div className="bg-[#fff] text-black font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
            <textarea
              className="text-black !w-[250px] h-[10vh] text-sm border-[1px] border-black outline-none px-2 py-2 rounded-lg"
              type="text"
              value={Desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Type a note to yourself here ...."
            />
          </div>
        </Typography>
      </Popover>
    </div>
  );
};

export default TooltipBtn;
