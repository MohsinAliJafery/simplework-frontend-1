import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const AnalyticsBarChart = () => {
  const [chartOptions, setChartOptions] = useState({
    series: [
      {
        name: "Sales",
        data: [44, 55, 41, 67, 22, 43, 21, 33, 45, 31, 87, 66],
      },
    ],
    options: {
      annotations: {},
      chart: {
        height: 350,
        type: "bar",
      },
      plotOptions: {
        bar: {
          borderRadius: 10,
          columnWidth: "25px",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 0,
      },
      grid: {},
      xaxis: {
        labels: {
          rotate: -45,
          style: {
            colors: "#fff", // White labels on x-axis
          },
        },
        categories: [
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
        ],
        tickPlacement: "on",
      },
      yaxis: {
        labels: {
          style: {
            colors: "#fff", // White labels on y-axis
          },
          formatter: (value) => {
            return `$ ${value.toFixed(1)} K`; // Format Y-axis as "$ X.X K"
          },
        },
      },
      fill: {
        type: "gradient",
        colors: ["#DE0588"], // Change bar fill color to #DE0588
      },
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="bar"
          height={350}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default AnalyticsBarChart;
