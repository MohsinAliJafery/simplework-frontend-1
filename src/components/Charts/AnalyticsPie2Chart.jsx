import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const AnalyticsPie2Chart = () => {
  const [chartOptions, setChartOptions] = useState({
    series: [44, 55],
    options: {
      chart: {
        width: 250,
        type: "donut",
      },
      plotOptions: {
        pie: {
          startAngle: -90,
          endAngle: 270,
        },
      },
      dataLabels: {
        enabled: false,
      },
      fill: {
        type: "gradient",
      },
      labels: ["Buyer", "Seller"], // Setting custom labels for Buyer and Seller
      legend: {
        position: "top", // Move the legend to the top
        labels: {
          colors: "#ffffff", // Set label color to white
        },
        formatter: function (val, opts) {
          return val + " - " + opts.w.globals.series[opts.seriesIndex];
        },
      },

      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom", // Keep legend on bottom for smaller screens
            },
          },
        },
      ],
    },
  });

  return (
    <div>
      <div id="chart">
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="donut"
          width={250}
        />
      </div>
      {/* <div id="html-dist"></div> */}
    </div>
  );
};

export default AnalyticsPie2Chart;
