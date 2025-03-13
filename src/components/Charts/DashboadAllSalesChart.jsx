import React, { useState } from "react";
import { Popover, Typography } from "@mui/material";
import { BiSolidChevronDown } from "react-icons/bi";
import { MdOutlineShowChart } from "react-icons/md";
import ApexLineChart from "./LineChart";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DashboadAllSalesChart = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const currentDate = new Date();

  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [CurrentMonth, setCurrentMonth] = useState(
    months[currentDate.getMonth()]
  );
  const [CurrentMonthIndex, setCurrentMonthIndex] = useState("");
  return (
    <div className="bg-[#353435] h-fit w-[90%] rounded-2xl px-3 fade-in">
      <div className="flex justify-between w-full items-center">
        <div className="flex flex-col text-white font-poppins px-3 py-4">
          <div className="text-sm">Overall Sales</div>
          <div className="flex gap-x-8">
            <div className="">$348,253.65</div>
            <div className="flex gap-x-1 items-center">
              <MdOutlineShowChart />
              13.02%
            </div>
          </div>
        </div>
        <div
          className={`relative text-center text-lg tracking-[1px] no-underline text-[#333] cursor-pointer transition-all ease-in-out duration-500 border-2 border-solid border-[#f7f7f7] hover:text-[white] shadow-[inset_0_0_0_0_#465462] hover:shadow-[inset_0_-100px_0_0_#333] active:scale-90 px-4 py-[5px] rounded-full font-[Quicksand] font-[700] text-[1rem] bg-[#fff] flex gap-x-6 items-center maxWeb1:text-[1.5rem] maxWeb2:text-[2rem] maxWeb3:text-[2.5rem] maxWeb4:text-[3rem]`}
          onClick={handleClick}
        >
          <div className="flex items-center">
            <div className="w-[100px] outline-none font-[700] text-[1.1rem] text-center placeholder:text-white bg-transparent">
              {CurrentMonth === "" ? "Month" : CurrentMonth}
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
              backgroundColor: "#fff",
              // width: "400px",
              overflow: "hidden",
              borderRadius: "20px",
            }}
          >
            <div className="bg-[#fff] text-black font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
              <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                {months.map((month, i) => {
                  return (
                    <div
                      className="flex gap-x-3 items-center cursor-pointer"
                      onClick={() => {
                        handleClose();
                        setCurrentMonth(month);
                        setCurrentMonthIndex(i);
                      }}
                    >
                      <input
                        type="checkbox"
                        className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-[#333333] rounded-full"
                        checked={CurrentMonth === month}
                      />
                      <span>{month}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </Typography>
        </Popover>
      </div>
      <ApexLineChart />
    </div>
  );
};

export default DashboadAllSalesChart;
