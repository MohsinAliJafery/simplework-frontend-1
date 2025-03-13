import React, { useEffect, useState } from "react";
import SideMenu from "../../components/SideMenu/SideMenu";
import AnalyticsCard from "../../components/Cards/AnalyticsCard";
import AnalyticsBarChart from "../../components/Charts/AnalyticsBarChart";
import { BiSolidChevronDown } from "react-icons/bi";
import { Popover, Typography } from "@mui/material";
import AnalyticsPieCharts from "../../components/Charts/AnalyticsPieCharts";
import AnalyticsPie2Chart from "../../components/Charts/AnalyticsPie2Chart";

function generateYears(startYear, endYear) {
  const years = [];
  for (let year = startYear; year <= endYear; year++) {
    years.push(year);
  }
  return years;
}

const AppAnalytics = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [Years, setYears] = useState([]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  useEffect(() => {
    const currentYear = new Date().getFullYear();
    setYears(generateYears(currentYear - 10, currentYear));
  }, []);

  return (
    <div className="px-5 flex w-full">
    <SideMenu />
    <div
      className="flex flex-col fade-in"
      style={{ width: "calc(100% - 250px)" }}
    >
      <div className="">Analytics</div>
      <div className="flex gap-x-3 gap-y-3 justify-center text-white px-4 flex-wrap w-[100%]">
        <AnalyticsCard title={"Overall Selling"} amount={"$ 200.33K"} />
        <AnalyticsCard title={"Earning in August"} amount={"$ 200.33K"} />
        <AnalyticsCard title={"Orders Completed"} amount={"29"} />
        <AnalyticsCard title={"On Time delivery"} amount={"80%"} />
      </div>
      <div className="flex items-stretch justify-between px-3 py-3 gap-x-4 w-[100%]">
        {/* Overview and Bar Chart */}
        <div className="flex justify-center overflow-auto items-center bg-[#FFFFFF33] px-4 rounded-2xl w-[75%]">
          <div className="w-[100%]">
            <div className="flex justify-between w-full items-center">
              <div className="flex items-center justify-between w-full text-white font-poppins px-3 py-4 -mt-10">
                <div className="text-xl font-poppins font-semibold px-4">
                  Overview
                </div>
                <div
                  className={`relative text-center text-lg tracking-[1px] no-underline text-[#333] cursor-pointer transition-all ease-in-out duration-500 border-2 border-solid border-[#f7f7f7] hover:text-[white] shadow-[inset_0_0_0_0_#465462] hover:shadow-[inset_0_-100px_0_0_#333] active:scale-90 px-4 py-[5px] rounded-full font-[Quicksand] font-[700] text-[1rem] bg-[#fff] flex gap-x-6 items-center`}
                  onClick={handleClick}
                >
                  <div className="flex items-center">
                    <div className="w-[100px] outline-none font-[700] text-[1.1rem] text-center placeholder:text-white bg-transparent">
                      Yearly
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
                      borderRadius: "25px",
                      backgroundColor: "white",
                      width: "fit",
                      overflow: "hidden",
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
                      overflow: "hidden",
                      borderRadius: "20px",
                    }}
                  >
                    <div className="bg-[#fff] text-black font-[Quicksand]  flex flex-col justify-center items-center rounded-[50px]">
                      <div className="w-full flex flex-col justify-between gap-y-3 items-start">
                        {Years.map((year, i) => {
                          return (
                            <div
                              key={i}
                              className="flex gap-x-3 items-center cursor-pointer"
                              onClick={() => {
                                handleClose();
                              }}
                            >
                              <input
                                type="checkbox"
                                className="mr-1 appearance-none h-5 w-5 border border-gray-300 checked:bg-white rounded-full"
                              />
                              <span>{year}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </Typography>
                </Popover>
              </div>
            </div>
            <AnalyticsBarChart />
          </div>
        </div>
  
        {/* Pie Charts Section */}
        <div className="font-poppins text-white flex flex-col justify-center gap-y-4 w-[25%]">
          <div className="bg-[#FFFFFF33] py-2 pt-5 w-full flex flex-col justify-between items-center rounded-3xl h-[34vh]">
            <div className="px-5 text-xl font-poppins flex w-full justify-start">
              Orders
            </div>
            <AnalyticsPieCharts />
          </div>
          <div className="bg-[#FFFFFF33] py-2 pt-5 w-full flex flex-col justify-between items-center rounded-3xl h-[34vh]">
            <div className="px-5 text-xl font-poppins flex w-full justify-start mb-4">
              Cancellation
            </div>
            <AnalyticsPie2Chart />
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default AppAnalytics;
