import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const ApexLineChart = () => {
  const [chartState] = useState({
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 848],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false,
        },
        foreColor: "#fff", // Changes the default text color to white
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "straight",
      },
      grid: {
        row: {
          colors: ["#353435"], // takes an array which will be repeated on rows
          opacity: 0.5,
        },
        borderColor: "#fff", // White grid lines
      },
      xaxis: {
        categories: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13],
        labels: {
          style: {
            colors: "#fff", // White labels on x-axis
          },
        },
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff", // White labels on y-axis
          },
        },
      },
    },
  });

  return (
    <div id="chart" className="w-[100%]">
      <ReactApexChart
        options={chartState.options}
        series={chartState.series}
        type="line"
        height={350}
      />
    </div>
  );
};

export default ApexLineChart;
