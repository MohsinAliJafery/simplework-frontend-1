import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";

const AnalyticsPieCharts = () => {
  const [chartOptions, setChartOptions] = useState({
    series: [44, 55, 13, 43, 22],
    options: {
      chart: {
        width: 330,
        type: "pie",
      },
      labels: ["Completed", "Cancelled", "Active", "Delivered", "Completed"],
      legend: {
        position: "left", // Shift legend to the right
        horizontalAlign: "center", // Align labels horizontally
        labels: {
          colors: "#fff", // Set the label color to white
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
              position: "bottom", // On small screens, legend goes to the bottom
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
          type="pie"
          width={330}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default AnalyticsPieCharts;
